const { z } = require('zod');

const customisationOptionSchema = z.object({
  name: z.string().min(1, 'Option name is required').max(100).trim(),
  priceCents: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

const createCustomisationSchema = z.object({
  name: z.string().min(1, 'Customisation name is required').max(100).trim(),
  description: z.string().max(500).trim().optional(),
  minSelect: z.number().int().min(0).default(0),
  maxSelect: z.number().int().min(1).default(1),
  isRequired: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  options: z.array(customisationOptionSchema).min(1, 'At least one option is required'),
});

const updateCustomisationSchema = z.object({
  name: z.string().min(1).max(100).trim().optional(),
  description: z.string().max(500).trim().optional(),
  minSelect: z.number().int().min(0).optional(),
  maxSelect: z.number().int().min(1).optional(),
  isRequired: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  options: z.array(customisationOptionSchema).min(1).optional(),
});

const linkCustomisationSchema = z.object({
  customisationId: z.string().uuid('Invalid customisation ID'),
  sortOrder: z.number().int().min(0).default(0),
});

module.exports = {
  createCustomisationSchema,
  updateCustomisationSchema,
  linkCustomisationSchema,
};
