const { prisma } = require('../config/database');
const { AppError } = require('../utils/AppError');

// ============================================
// PUBLIC
// ============================================

async function getPublicMenu() {
  const categories = await prisma.menuCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      items: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
          customisations: {
            orderBy: { sortOrder: 'asc' },
            include: {
              customisation: {
                include: {
                  options: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  // Transform to cleaner structure for frontend
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    items: cat.items.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description,
      priceCents: item.priceCents,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
      customisations: item.customisations
        .filter((mic) => mic.customisation.isActive)
        .map((mic) => ({
          id: mic.customisation.id,
          name: mic.customisation.name,
          description: mic.customisation.description,
          minSelect: mic.customisation.minSelect,
          maxSelect: mic.customisation.maxSelect,
          isRequired: mic.customisation.isRequired,
          options: mic.customisation.options.map((opt) => ({
            id: opt.id,
            name: opt.name,
            priceCents: opt.priceCents,
          })),
        })),
    })),
  }));
}

async function getPublicMenuItem(slug) {
  const item = await prisma.menuITem.findFirst({
    where: { slug, isActive: true },
    include: {
      category: { select: { name: true, slug: true } },
      customisations: {
        orderBy: { sortOrder: 'asc' },
        include: {
          customisation: {
            include: {
              options: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
              },
            },
          },
        },
      },
    },
  });

  if (!item) {
    throw AppError.notFound('Menu item not found');
  }

  return item;
}

// ============================================
// ADMIN - Categories
// ============================================

async function getAllCategories() {
  return prisma.menuCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { items: true } } },
  });
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function createCategory(data) {
  const slug = slugify(data.name);
  return prisma.menuCategory.create({
    data: { ...data, slug },
  });
}

async function updateCategory(id, data) {
  const updateData = { ...data };
  if (data.name) {
    updateData.slug = slugify(data.name);
  }
  return prisma.menuCategory.update({
    where: { id },
    data: updateData,
  });
}

async function deleteCategory(id) {
  const category = await prisma.menuCategory.findUnique({
    where: { id },
    include: { _count: { select: { items: true } } },
  });

  if (!category) throw AppError.notFound('Category not found');
  if (category._count.items > 0) {
    throw AppError.badRequest(
      'Cannot delete category with existing items. Remove or move items first.'
    );
  }

  await prisma.menuCategory.delete({ where: { id } });
}

// ============================================
// ADMIN - Menu Items
// ============================================

async function getAllItems() {
  return prisma.menuITem.findMany({
    orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
    include: {
      category: { select: { id: true, name: true } },
      customisations: {
        include: { customisation: { select: { id: true, name: true } } },
      },
    },
  });
}

async function createItem(data) {
  const slug = slugify(data.name);

  // Check category exists
  const category = await prisma.menuCategory.findUnique({ where: { id: data.categoryId } });
  if (!category) throw AppError.notFound('Category not found');

  return prisma.menuITem.create({
    data: { ...data, slug },
    include: { category: { select: { id: true, name: true } } },
  });
}

async function updateItem(id, data) {
  const updateData = { ...data };
  if (data.name) {
    updateData.slug = slugify(data.name);
  }
  return prisma.menuITem.update({
    where: { id },
    data: updateData,
    include: { category: { select: { id: true, name: true } } },
  });
}

async function updateItemAvailability(id, isAvailable) {
  return prisma.menuITem.update({
    where: { id },
    data: { isAvailable },
    select: { id: true, name: true, isAvailable: true },
  });
}

async function deleteItem(id) {
  await prisma.menuITem.delete({ where: { id } });
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
