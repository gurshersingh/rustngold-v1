const { prisma } = require('../config/database');

/**
 * Get active orders for kitchen display.
 * Only shows orders that have been paid — pending_payment orders are excluded.
 */
async function getActiveOrders() {
  return prisma.order.findMany({
    where: {
      status: { in: ['paid', 'preparing', 'ready'] },
    },
    orderBy: [
      { status: 'asc' }, // paid first, then preparing, then ready
      { paidAt: 'asc' }, // oldest paid orders first
    ],
    include: {
      items: {
        include: { customisations: true },
      },
    },
  });
}

/**
 * Get count of new (paid) orders — used for sound alert logic.
 */
async function getNewOrderCount() {
  return prisma.order.count({
    where: { status: 'paid' },
  });
}

module.exports = {
  getActiveOrders,
  getNewOrderCount,
};
