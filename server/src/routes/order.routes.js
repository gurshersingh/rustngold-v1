const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { validate } = require('../middleware/validate');
const { checkoutLimiter } = require('../middleware/rateLimiter');
const { checkoutSchema } = require('../validators/order.schema');

// POST /api/orders/checkout — public: create order + Stripe session
router.post(
  '/checkout',
  checkoutLimiter,
  validate(checkoutSchema),
  orderController.checkout
);

// GET /api/orders/:id/status — public: check order status
router.get('/:id/status', orderController.getStatus);

module.exports = router;
