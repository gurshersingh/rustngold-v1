const menuService = require('../services/menu.service');

// ============================================
// PUBLIC
// ============================================

async function getPublicMenu(req, res, next) {
  try {
    const menu = await menuService.getPublicMenu();
    res.json({ menu });
  } catch (err) {
    next(err);
  }
}

async function getPublicMenuItem(req, res, next) {
  try {
    const item = await menuService.getPublicMenuItem(req.params.slug);
    res.json({ item });
  } catch (err) {
    next(err);
  }
}

// ============================================
// ADMIN - Categories
// ============================================

async function getAllCategories(req, res, next) {
  try {
    const categories = await menuService.getAllCategories();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const category = await menuService.createCategory(req.body);
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const category = await menuService.updateCategory(req.params.id, req.body);
    res.json({ category });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await menuService.deleteCategory(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
}

// ============================================
// ADMIN - Items
// ============================================

async function getAllItems(req, res, next) {
  try {
    const items = await menuService.getAllItems();
    res.json({ items });
  } catch (err) {
    next(err);
  }
}

async function createItem(req, res, next) {
  try {
    const item = await menuService.createItem(req.body);
    res.status(201).json({ item });
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const item = await menuService.updateItem(req.params.id, req.body);
    res.json({ item });
  } catch (err) {
    next(err);
  }
}

async function updateItemAvailability(req, res, next) {
  try {
    const item = await menuService.updateItemAvailability(
      req.params.id,
      req.body.isAvailable
    );
    res.json({ item });
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    await menuService.deleteItem(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublicMenu,
  getPublicMenuItem,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllItems,
  createItem,
  updateItem,
  updateItemAvailability,
  deleteItem,
};
