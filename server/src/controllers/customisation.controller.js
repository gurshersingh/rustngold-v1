const customisationService = require('../services/customisation.service');

async function getAll(req, res, next) {
  try {
    const customisations = await customisationService.getAllCustomisations();
    res.json({ customisations });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const customisation = await customisationService.getCustomisationById(req.params.id);
    res.json({ customisation });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const customisation = await customisationService.createCustomisation(req.body);
    res.status(201).json({ customisation });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const customisation = await customisationService.updateCustomisation(req.params.id, req.body);
    res.json({ customisation });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await customisationService.deleteCustomisation(req.params.id);
    res.json({ message: 'Customisation deleted' });
  } catch (err) {
    next(err);
  }
}

async function linkToItem(req, res, next) {
  try {
    const link = await customisationService.linkToMenuItem(
      req.params.itemId,
      req.body.customisationId,
      req.body.sortOrder
    );
    res.status(201).json({ link });
  } catch (err) {
    next(err);
  }
}

async function unlinkFromItem(req, res, next) {
  try {
    await customisationService.unlinkFromMenuItem(
      req.params.itemId,
      req.params.customisationId
    );
    res.json({ message: 'Customisation unlinked from item' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, remove, linkToItem, unlinkFromItem };
