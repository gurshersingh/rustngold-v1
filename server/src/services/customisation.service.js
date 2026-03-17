const { prisma } = require('../config/database');
const { AppError } = require('../utils/AppError');

async function getAllCustomisations() {
  return prisma.customisation.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      options: { orderBy: { sortOrder: 'asc' } },
      menuItems: {
        include: {
          menuItem: { select: { id: true, name: true } },
        },
      },
    },
  });
}

async function getCustomisationById(id) {
  const customisation = await prisma.customisation.findUnique({
    where: { id },
    include: {
      options: { orderBy: { sortOrder: 'asc' } },
      menuItems: {
        include: {
          menuItem: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!customisation) throw AppError.notFound('Customisation not found');
  return customisation;
}

async function createCustomisation(data) {
  const { options, ...customisationData } = data;

  return prisma.customisation.create({
    data: {
      ...customisationData,
      options: {
        create: options,
      },
    },
    include: {
      options: { orderBy: { sortOrder: 'asc' } },
    },
  });
}

async function updateCustomisation(id, data) {
  const { options, ...customisationData } = data;

  // If options are provided, replace all options (delete existing + create new)
  if (options) {
    return prisma.$transaction(async (tx) => {
      // Delete existing options
      await tx.customisationOption.deleteMany({
        where: { customisationId: id },
      });

      // Update customisation and create new options
      return tx.customisation.update({
        where: { id },
        data: {
          ...customisationData,
          options: {
            create: options,
          },
        },
        include: {
          options: { orderBy: { sortOrder: 'asc' } },
        },
      });
    });
  }

  return prisma.customisation.update({
    where: { id },
    data: customisationData,
    include: {
      options: { orderBy: { sortOrder: 'asc' } },
    },
  });
}

async function deleteCustomisation(id) {
  await prisma.customisation.delete({ where: { id } });
}

// ============================================
// Link / Unlink customisations to menu items
// ============================================

async function linkToMenuItem(menuItemId, customisationId, sortOrder = 0) {
  // Verify both exist
  const [item, customisation] = await Promise.all([
    prisma.menuITem.findUnique({ where: { id: menuItemId } }),
    prisma.customisation.findUnique({ where: { id: customisationId } }),
  ]);

  if (!item) throw AppError.notFound('Menu item not found');
  if (!customisation) throw AppError.notFound('Customisation not found');

  return prisma.menuItemCustomisation.create({
    data: { menuItemId, customisationId, sortOrder },
    include: {
      customisation: { select: { id: true, name: true } },
      menuItem: { select: { id: true, name: true } },
    },
  });
}

async function unlinkFromMenuItem(menuItemId, customisationId) {
  const link = await prisma.menuItemCustomisation.findFirst({
    where: { menuItemId, customisationId },
  });

  if (!link) throw AppError.notFound('This customisation is not linked to this item');

  await prisma.menuItemCustomisation.delete({ where: { id: link.id } });
}

module.exports = {
  getAllCustomisations,
  getCustomisationById,
  createCustomisation,
  updateCustomisation,
  deleteCustomisation,
  linkToMenuItem,
  unlinkFromMenuItem,
};
