const orderService = require('../services/order.service');
const paymentService = require('../services/payment.service');

/**
 * POST /api/orders/checkout
 * Validates cart, creates order, creates Stripe Checkout Session.
 */
async function checkout(req, res, next) {
  try {
    const { items, ...customerData } = req.body;

    // 1. Validate items and calculate server-side prices
    const { validatedItems, subtotalCents, totalCents } =
      await orderService.validateAndCalculateCart(items);

    // 2. Create order with pending_payment status
    const order = await orderService.createOrder(
      customerData,
      validatedItems,
      { subtotalCents, totalCents }
    );

    // 3. Create Stripe Checkout Session
    const session = await paymentService.createCheckoutSession(order);

    // 4. Save stripe session ID to order
    const { prisma } = require('../config/database');
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    res.json({
      sessionUrl: session.url,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/orders/:id/status
 * Public endpoint for customer to check order status after payment.
 */
async function getStatus(req, res, next) {
  try {
    const order = await orderService.getOrderStatus(req.params.id);
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/orders
 * Admin: list all orders with optional filters.
 */
async function getAllOrders(req, res, next) {
  try {
    const filters = {
      status: req.query.status || undefined,
      date: req.query.date || undefined,
    };
    const orders = await orderService.getAllOrders(filters);
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/orders/:id
 * Admin: get single order detail.
 */
async function getOrderById(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/admin/orders/:id/status
 * Admin: update order status.
 */
async function updateStatus(req, res, next) {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/orders/:id/refund
 * Admin: refund an order via Stripe.
 */
async function refundOrder(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order.stripePaymentIntent) {
      return res.status(400).json({ error: 'No payment found for this order' });
    }

    await paymentService.refundPayment(order.stripePaymentIntent);
    const updated = await orderService.updateOrderStatus(order.id, 'refunded');

    res.json({ order: updated, message: 'Refund initiated' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkout,
  getStatus,
  getAllOrders,
  getOrderById,
  updateStatus,
  refundOrder,
};
