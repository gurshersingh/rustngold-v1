const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/kitchen.controller');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { updateOrderStatusSchema } = require('../validators/order.schema');

// All kitchen routes require kitchen, manager, or admin role
router.use(authenticate, requireRole('kitchen', 'manager', 'admin'));

// GET /api/kitchen/orders — active orders for kitchen display
router.get('/orders', kitchenController.getActiveOrders);

// PATCH /api/kitchen/orders/:id/status — update order status
router.patch(
  '/orders/:id/status',
  validate(updateOrderStatusSchema),
  kitchenController.updateStatus
);

module.exports = router;
