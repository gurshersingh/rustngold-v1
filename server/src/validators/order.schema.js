const { z } = require('zod');

const selectedOptionSchema = z.object({
  optionId: z.string().uuid('Invalid option ID'),
});

const cartItemSchema = z.object({
  menuItemId: z.string().uuid('Invalid menu item ID'),
  quantity: z.number().int().min(1).max(50),
  selectedOptions: z.array(selectedOptionSchema).default([]),
});

const checkoutSchema = z.object({
  customerName: z.string().min(1, 'Name is required').max(100).trim(),
  customerPhone: z.string()
    .min(8, 'Phone number is required')
    .max(20)
    .trim()
    .regex(/^[\d\s+()-]+$/, 'Invalid phone number format'),
  customerEmail: z.string().email('Invalid email').trim().toLowerCase().optional(),
  orderType: z.enum(['pickup', 'delivery'], {
    errorMap: () => ({ message: 'Order type must be pickup or delivery' }),
  }),
  deliveryAddress: z.string().max(500).trim().optional(),
  notes: z.string().max(1000).trim().optional(),
  items: z.array(cartItemSchema).min(1, 'Cart cannot be empty'),
});

// Refine: delivery address required for delivery orders
const checkoutSchemaRefined = checkoutSchema.refine(
  (data) => {
    if (data.orderType === 'delivery') {
      return data.deliveryAddress && data.deliveryAddress.length > 0;
    }
    return true;
  },
  {
    message: 'Delivery address is required for delivery orders',
    path: ['deliveryAddress'],
  }
);

const updateOrderStatusSchema = z.object({
  status: z.enum(
    ['paid', 'preparing', 'ready', 'completed', 'cancelled'],
    { errorMap: () => ({ message: 'Invalid order status' }) }
  ),
});

module.exports = {
  checkoutSchema: checkoutSchemaRefined,
  updateOrderStatusSchema,
};
