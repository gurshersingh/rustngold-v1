const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { AppError } = require('../utils/AppError');

router.use(authenticate, requireRole('admin', 'manager'));

// GET /api/admin/promotions
router.get('/', async (req, res, next) => {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ promotions });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/promotions
router.post('/', async (req, res, next) => {
  try {
    const promotion = await prisma.promotion.create({ data: req.body });
    res.status(201).json({ promotion });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/promotions/:id
router.put('/:id', async (req, res, next) => {
  try {
    const promotion = await prisma.promotion.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ promotion });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/promotions/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.promotion.delete({ where: { id: req.params.id } });
    res.json({ message: 'Promotion deleted' });
  } catch (err) {
    next(err);
  }
});

// Public route for active promotions
router.get('/public', async (req, res, next) => {
  try {
    const now = new Date();
    const promotions = await prisma.promotion.findMany({
      where: {
        isActive: true,
        OR: [
          { startDate: null, endDate: null },
          { startDate: { lte: now }, endDate: { gte: now } },
          { startDate: { lte: now }, endDate: null },
          { startDate: null, endDate: { gte: now } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ promotions });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
