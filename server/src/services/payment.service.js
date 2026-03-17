const { stripe } = require('../config/stripe');
const { formatPrice } = require('../utils/priceCalc');

/**
 * Create a Stripe Checkout Session for an order.
 */
async function createCheckoutSession(order) {
  const lineItems = order.items.map((item) => {
    // Build description from customisations
    const customisationSummary = item.customisations
      .map((c) => `${c.optionName}${c.optionPriceCents > 0 ? ` (+${formatPrice(c.optionPriceCents)})` : ''}`)
      .join(', ');

    return {
      price_data: {
        currency: 'aud',
        product_data: {
          name: `${item.itemName}${item.quantity > 1 ? ` x${item.quantity}` : ''}`,
          ...(customisationSummary
            ? { description: customisationSummary }
            : {}),
        },
        unit_amount: item.subtotalCents / item.quantity, // unit price including customisations
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    currency: 'aud',
    customer_email: order.customerEmail || undefined,
    line_items: lineItems,
    metadata: {
      order_id: order.id,
      order_number: String(order.orderNumber),
    },
    success_url: `${process.env.FRONTEND_URL}/order/confirmation?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
    cancel_url: `${process.env.FRONTEND_URL}/order/cancelled?order_id=${order.id}`,
    expires_after_completion: {
      type: 'at',
      at: Math.floor(Date.now() / 1000) + 300, // redirect 5 min after completion
    },
  });

  return session;
}

/**
 * Verify Stripe webhook signature and parse event.
 */
function constructWebhookEvent(rawBody, signature) {
  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

/**
 * Create a refund for a payment.
 */
async function refundPayment(paymentIntentId) {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
  });
}

module.exports = {
  createCheckoutSession,
  constructWebhookEvent,
  refundPayment,
};
