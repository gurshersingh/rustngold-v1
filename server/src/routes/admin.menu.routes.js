const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const {
  createCategorySchema,
  updateCategorySchema,
  createMenuItemSchema,
  updateMenuItemSchema,
  availabilitySchema,
} = require('../validators/menu.schema');

// All admin menu routes require admin or manager role
router.use(authenticate, requireRole('admin', 'manager'));

// ---- Categories ----
router.get('/categories', menuController.getAllCategories);
router.post('/categories', validate(createCategorySchema), menuController.createCategory);
router.put('/categories/:id', validate(updateCategorySchema), menuController.updateCategory);
router.delete('/categories/:id', menuController.deleteCategory);

// ---- Items ----
router.get('/items', menuController.getAllItems);
router.post('/items', validate(createMenuItemSchema), menuController.createItem);
router.put('/items/:id', validate(updateMenuItemSchema), menuController.updateItem);
router.patch('/items/:id/availability', validate(availabilitySchema), menuController.updateItemAvailability);
router.delete('/items/:id', menuController.deleteItem);

module.exports = router;
