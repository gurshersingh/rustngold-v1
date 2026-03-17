const express = require('express');
const router = express.Router();
const custController = require('../controllers/customisation.controller');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const {
  createCustomisationSchema,
  updateCustomisationSchema,
  linkCustomisationSchema,
} = require('../validators/customisation.schema');

// All routes require admin or manager role
router.use(authenticate, requireRole('admin', 'manager'));

// ---- Customisations CRUD ----
router.get('/', custController.getAll);
router.get('/:id', custController.getById);
router.post('/', validate(createCustomisationSchema), custController.create);
router.put('/:id', validate(updateCustomisationSchema), custController.update);
router.delete('/:id', custController.remove);

// ---- Link/Unlink customisations to menu items ----
router.post('/items/:itemId/link', validate(linkCustomisationSchema), custController.linkToItem);
router.delete('/items/:itemId/link/:customisationId', custController.unlinkFromItem);

module.exports = router;
