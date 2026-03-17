const { prisma } = require('../config/database');
const { AppError } = require('../utils/AppError');
const { calculateItemSubtotal } = require('../utils/priceCalc');

/**
 * Validate cart items against the database and calculate server-side prices.
 * NEVER trust frontend prices — always recalculate from DB.
 */
async function validateAndCalculateCart(items) {
  const menuItemIds = items.map((i) => i.menuItemId);
  const allOptionIds = items.flatMap((i) =>
    i.selectedOptions.map((o) => o.optionId)
  );

  // Fetch all menu items
  const menuItems = await prisma.menuITem.findMany({
    where: { id: { in: menuItemIds }, isActive: true, isAvailable: true },
    include: {
      customisations: {
        include: {
          customisation: {
            include: {
              options: { where: { isActive: true } },
            },
          },
        },
      },
    },
  });

  // Fetch all selected options
  const options = allOptionIds.length > 0
    ? await prisma.customisationOption.findMany({
        where: { id: { in: allOptionIds }, isActive: true },
        include: { customisation: true },
      })
    : [];

  const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));
  const optionMap = new Map(options.map((opt) => [opt.id, opt]));

  const validatedItems = [];
  let subtotalCents = 0;

  for (const cartItem of items) {
    const menuItem = menuItemMap.get(cartItem.menuItemId);
    if (!menuItem) {
      throw AppError.badRequest(
        `Menu item is no longer available: ${cartItem.menuItemId}`
      );
    }

    // Validate selected options belong to this item's customisations
    const itemCustomisationIds = new Set(
      menuItem.customisations.map((mic) => mic.customisation.id)
    );

    const resolvedOptions = [];
    for (const selectedOpt of cartItem.selectedOptions) {
      const option = optionMap.get(selectedOpt.optionId);
      if (!option) {
        throw AppError.badRequest(`Option not found: ${selectedOpt.optionId}`);
      }
      if (!itemCustomisationIds.has(option.customisationId)) {
        throw AppError.badRequest(
          `Option "${option.name}" does not belong to this menu item`
        );
      }
      resolvedOptions.push(option);
    }

    // Validate required customisations are satisfied
    for (const mic of menuItem.customisations) {
      const cust = mic.customisation;
      if (!cust.isRequired) continue;

      const selectedForThisGroup = resolvedOptions.filter(
        (o) => o.customisationId === cust.id
      );

      if (selectedForThisGroup.length < cust.minSelect) {
        throw AppError.badRequest(
          `"${cust.name}" requires at least ${cust.minSelect} selection(s)`
        );
      }
      if (selectedForThisGroup.length > cust.maxSelect) {
        throw AppError.badRequest(
          `"${cust.name}" allows at most ${cust.maxSelect} selection(s)`
        );
      }
    }

    const itemSubtotal = calculateItemSubtotal(
      menuItem.priceCents,
      resolvedOptions.map((o) => ({ priceCents: o.priceCents })),
      cartItem.quantity
    );

    validatedItems.push({
      menuItemId: menuItem.id,
      itemName: menuItem.name,
      itemPriceCents: menuItem.priceCents,
      quantity: cartItem.quantity,
      subtotalCents: itemSubtotal,
      options: resolvedOptions.map((o) => ({
        customisationName: o.customisation.name,
        optionName: o.name,
        optionPriceCents: o.priceCents,
      })),
    });

    subtotalCents += itemSubtotal;
  }

  return { validatedItems, subtotalCents, totalCents: subtotalCents };
}

/**
 * Create an order with status pending_payment.
 */
async function createOrder(customerData, validatedItems, totals) {
  return prisma.order.create({
    data: {
      customerName: customerData.customerName,
      customerPhone: customerData.customerPhone,
      customerEmail: customerData.customerEmail,
      orderType: customerData.orderType,
      deliveryAddress: customerData.deliveryAddress,
      notes: customerData.notes,
      subtotalCents: totals.subtotalCents,
      totalCents: totals.totalCents,
      status: 'pending_payment',
      items: {
        create: validatedItems.map((item) => ({
          menuItemId: item.menuItemId,
          itemName: item.itemName,
          itemPriceCents: item.itemPriceCents,
          quantity: item.quantity,
          subtotalCents: item.subtotalCents,
          customisations: {
            create: item.options.map((opt) => ({
              customisationName: opt.customisationName,
              optionName: opt.optionName,
              optionPriceCents: opt.optionPriceCents,
            })),
          },
        })),
      },
    },
    include: {
      items: { include: { customisations: true } },
    },
  });
}

/**
 * Mark order as paid (called from Stripe webhook).
 */
async function markOrderPaid(orderId, stripeSessionId, stripePaymentIntent, amountCents) {
  return prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'paid',
        stripeSessionId,
        stripePaymentIntent,
        paidAt: new Date(),
      },
    }),
    prisma.payment.create({
      data: {
        orderId,
        stripePaymentIntent,
        stripeSessionId,
        amountCents,
        currency: 'aud',
        status: 'succeeded',
      },
    }),
  ]);
}

async function getOrderById(id) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { customisations: true },
      },
      payments: true,
    },
  });

  if (!order) throw AppError.notFound('Order not found');
  return order;
}

async function getOrderStatus(id) {
  const order = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      orderNumber: true,
      status: true,
      orderType: true,
      estimatedReady: true,
    },
  });

  if (!order) throw AppError.notFound('Order not found');
  return order;
}

async function getAllOrders(filters = {}) {
  const where = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.date) {
    const start = new Date(filters.date);
    const end = new Date(filters.date);
    end.setDate(end.getDate() + 1);
    where.createdAt = { gte: start, lt: end };
  }

  return prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { customisations: true },
      },
      payments: true,
    },
  });
}

async function updateOrderStatus(id, status) {
  return prisma.order.update({
    where: { id },
    data: { status },
    include: {
      items: { include: { customisations: true } },
    },
  });
}

module.exports = {
  validateAndCalculateCart,
  createOrder,
  markOrderPaid,
  getOrderById,
  getOrderStatus,
  getAllOrders,
  updateOrderStatus,
};
