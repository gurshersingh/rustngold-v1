const authService = require('../services/auth.service');

async function getAll(req, res, next) {
  try {
    const staff = await authService.getAllStaff();
    res.json({ staff });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const user = await authService.createStaffUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const user = await authService.updateStaffUser(req.params.id, req.body);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await authService.deleteStaffUser(req.params.id);
    res.json({ message: 'Staff member deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, create, update, remove };
