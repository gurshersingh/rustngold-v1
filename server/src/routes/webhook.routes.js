const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');

// POST /api/webhooks/stripe
// IMPORTANT: This route uses express.raw() — mounted BEFORE express.json() in index.js
router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  webhookController.handleStripeWebhook
);

module.exports = router;
