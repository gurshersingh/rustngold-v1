const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { updateOrderStatusSchema } = require('../validators/order.schema');

// All routes require admin or manager role
router.use(authenticate, requireRole('admin', 'manager'));

// GET /api/admin/orders — list all orders (with optional ?status= and ?date= filters)
router.get('/', orderController.getAllOrders);

// GET /api/admin/orders/:id — order detail
router.get('/:id', orderController.getOrderById);

// PATCH /api/admin/orders/:id/status — update order status
router.patch('/:id/status', validate(updateOrderStatusSchema), orderController.updateStatus);

// POST /api/admin/orders/:id/refund — refund via Stripe
router.post('/:id/refund', orderController.refundOrder);

module.exports = router;
