const paymentService = require('../services/payment.service');
const orderService = require('../services/order.service');
const { logger } = require('../utils/logger');

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events.
 * IMPORTANT: This route uses raw body (not JSON parsed) for signature verification.
 */
async function handleStripeWebhook(req, res) {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = paymentService.constructWebhookEvent(req.body, signature);
  } catch (err) {
    logger.error({ err }, 'Stripe webhook signature verification failed');
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const orderId = session.metadata?.order_id;

        if (!orderId) {
          logger.warn('Webhook: checkout.session.completed without order_id metadata');
          break;
        }

        // Check if order is already paid (idempotency)
        const existingOrder = await orderService.getOrderById(orderId);
        if (existingOrder.status !== 'pending_payment') {
          logger.info({ orderId }, 'Order already processed, skipping');
          break;
        }

        await orderService.markOrderPaid(
          orderId,
          session.id,
          session.payment_intent,
          session.amount_total
        );

        logger.info(
          { orderId, orderNumber: session.metadata.order_number },
          'Order marked as paid via webhook'
        );
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object;
        const orderId = session.metadata?.order_id;

        if (orderId) {
          const order = await orderService.getOrderById(orderId);
          if (order.status === 'pending_payment') {
            await orderService.updateOrderStatus(orderId, 'cancelled');
            logger.info({ orderId }, 'Expired unpaid order cancelled');
          }
        }
        break;
      }

      default:
        logger.debug({ type: event.type }, 'Unhandled webhook event type');
    }
  } catch (err) {
    logger.error({ err, eventType: event.type }, 'Error processing webhook event');
    // Still return 200 to prevent Stripe from retrying
    // The error is logged and can be investigated
  }

  res.json({ received: true });
}

module.exports = { handleStripeWebhook };
