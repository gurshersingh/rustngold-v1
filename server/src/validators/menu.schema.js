const { z } = require('zod');

const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100).trim(),
  description: z.string().max(1000).trim().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

const updateCategorySchema = createCategorySchema.partial();

const createMenuItemSchema = z.object({
  categoryId: z.string().uuid('Invalid category ID'),
  name: z.string().min(1, 'Item name is required').max(200).trim(),
  description: z.string().max(2000).trim().optional(),
  priceCents: z.number().int().min(0, 'Price must be positive'),
  isActive: z.boolean().default(true),
  isAvailable: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

const updateMenuItemSchema = createMenuItemSchema.partial();

const availabilitySchema = z.object({
  isAvailable: z.boolean(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  createMenuItemSchema,
  updateMenuItemSchema,
  availabilitySchema,
};
