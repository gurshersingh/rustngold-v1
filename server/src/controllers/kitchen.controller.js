const kitchenService = require('../services/kitchen.service');
const orderService = require('../services/order.service');

/**
 * GET /api/kitchen/orders
 * Returns active orders for kitchen display (paid, preparing, ready).
 */
async function getActiveOrders(req, res, next) {
  try {
    const orders = await kitchenService.getActiveOrders();
    const newOrderCount = await kitchenService.getNewOrderCount();

    res.json({
      orders,
      newOrderCount, // frontend uses this to trigger sound alert
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/kitchen/orders/:id/status
 * Kitchen staff updates order status: paid → preparing → ready → completed.
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

module.exports = { getActiveOrders, updateStatus };
