const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

// GET /api/menu — full public menu with categories, items, and customisations
router.get('/', menuController.getPublicMenu);

// GET /api/menu/items/:slug — single menu item detail
router.get('/items/:slug', menuController.getPublicMenuItem);

module.exports = router;
