const express = require('express');
const router = express.Router();
const staffController = require('../controllers/admin.staff.controller');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { createStaffSchema, updateStaffSchema } = require('../validators/auth.schema');

// All staff management routes require admin role only
router.use(authenticate, requireRole('admin'));

// GET /api/admin/staff
router.get('/', staffController.getAll);

// POST /api/admin/staff
router.post('/', validate(createStaffSchema), staffController.create);

// PUT /api/admin/staff/:id
router.put('/:id', validate(updateStaffSchema), staffController.update);

// DELETE /api/admin/staff/:id
router.delete('/:id', staffController.remove);

module.exports = router;
