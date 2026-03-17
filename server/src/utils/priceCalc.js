/**
 * Calculate the subtotal for a single order item (in cents).
 * itemPriceCents + sum of selected option prices, multiplied by quantity.
 */
function calculateItemSubtotal(itemPriceCents, selectedOptions, quantity) {
  const optionsTotal = selectedOptions.reduce(
    (sum, opt) => sum + (opt.priceCents || 0),
    0
  );
  return (itemPriceCents + optionsTotal) * quantity;
}

/**
 * Calculate order totals from an array of cart items.
 * Each cart item should have: { priceCents, quantity, selectedOptions: [{ priceCents }] }
 */
function calculateOrderTotal(cartItems) {
  const subtotalCents = cartItems.reduce((sum, item) => {
    return sum + calculateItemSubtotal(
      item.priceCents,
      item.selectedOptions || [],
      item.quantity
    );
  }, 0);

  // For now, total = subtotal (no delivery fee or discounts in MVP)
  return {
    subtotalCents,
    totalCents: subtotalCents,
  };
}

/**
 * Format cents to display string: 1599 → "$15.99"
 */
function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

module.exports = { calculateItemSubtotal, calculateOrderTotal, formatPrice };
