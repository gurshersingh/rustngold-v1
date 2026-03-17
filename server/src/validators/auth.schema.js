const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

const createStaffSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100).trim(),
  role: z.enum(['admin', 'manager', 'kitchen'], {
    errorMap: () => ({ message: 'Role must be admin, manager, or kitchen' }),
  }),
});

const updateStaffSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  name: z.string().min(1).max(100).trim().optional(),
  role: z.enum(['admin', 'manager', 'kitchen']).optional(),
  isActive: z.boolean().optional(),
});

module.exports = { loginSchema, createStaffSchema, updateStaffSchema };
