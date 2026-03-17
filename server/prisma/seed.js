/**
 * Seed script: Migrates existing menu data from the client's data.js
 * into the database, and creates an initial admin user.
 *
 * Usage: npm run db:seed
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// ============================================
// Menu data from the existing Rust n Gold website
// (sourced from client/src/data.js)
// ============================================

const MENU = [
  {
    name: 'Starters & Share Plates',
    slug: 'starters',
    description: null,
    items: [
      { name: 'Truffle Arancini', price: '$14', desc: 'Crispy risotto balls with truffle oil, served with aioli' },
      { name: 'Lemon Pepper Calamari', price: '$15', desc: 'Tender calamari with lemon pepper seasoning, served with tartare sauce' },
      { name: 'Crispy Potato Wedges', price: '$10', desc: 'Golden potato wedges served with sour cream and sweet chilli sauce' },
      { name: 'Haloumi Fries', price: '$13', desc: 'Crispy golden haloumi sticks served with sweet chilli dip' },
    ],
  },
  {
    name: 'Breakfast',
    slug: 'breakfast',
    description: 'Served Saturday & Sunday until 2pm',
    items: [
      { name: 'Toast', price: '$6.50', desc: 'Sourdough or multigrain with butter and your choice of spread' },
      { name: 'Bacon & Egg Roll', price: '$10', desc: 'Crispy bacon and fried egg on a toasted milk bun with BBQ sauce' },
      { name: 'Classic Omelette', price: '$16', desc: 'Three-egg omelette with cheese, mushrooms, and herbs' },
      { name: 'Ham & Cheese Omelette', price: '$17.50', desc: 'Fluffy omelette filled with leg ham and melted cheese' },
      { name: 'Bircher Muesli', price: '$14', desc: 'Overnight oats with yoghurt, honey, and seasonal fruits' },
      { name: 'Porridge', price: '$12', desc: 'Creamy rolled oats with brown sugar, cinnamon, and banana' },
      { name: 'French Toast', price: '$18', desc: 'Thick-cut brioche with maple syrup, fresh berries, and cream' },
      { name: 'The Big Aussie Breakfast', price: '$21.50', desc: 'Eggs, bacon, sausage, mushroom, tomato, hash brown, and sourdough toast' },
      { name: 'Smashed Avo', price: '$16', desc: 'Smashed avocado on sourdough with feta, cherry tomatoes, and dukkah' },
      { name: 'Eggs Benedict', price: '$18', desc: 'Poached eggs with hollandaise on English muffin (choice of ham or smoked salmon)' },
      { name: 'Veggie Stack', price: '$17', desc: 'Grilled haloumi, avocado, roast tomato, mushroom, spinach, and poached egg' },
    ],
  },
  {
    name: 'Mains',
    slug: 'mains',
    description: null,
    items: [
      { name: 'Pan-Seared Salmon', price: '$28', desc: 'Atlantic salmon with lemon butter sauce, served with seasonal vegetables and mash' },
      { name: 'Angus Scotch Fillet', price: '$32', desc: '250g scotch fillet cooked to your liking with chips, salad, and pepper sauce' },
      { name: 'Slow-Cooked Lamb Shank', price: '$28', desc: 'Tender lamb shank braised in red wine, served with creamy mash and greens' },
      { name: 'Roast Pork Belly', price: '$26', desc: 'Crispy pork belly with apple compote, roast vegetables, and gravy' },
      { name: 'Chicken Skewers', price: '$24', desc: 'Marinated chicken skewers with tzatziki, Greek salad, and warm pita' },
    ],
  },
  {
    name: 'Pasta',
    slug: 'pasta',
    description: null,
    items: [
      { name: 'Spaghetti Bolognese', price: '$22', desc: 'Classic beef bolognese with parmesan and garlic bread' },
      { name: 'Fettuccine Carbonara', price: '$23', desc: 'Creamy carbonara with pancetta, egg, and parmesan' },
      { name: 'Creamy Pesto Spaghetti', price: '$25', desc: 'Spaghetti in basil pesto cream sauce with sun-dried tomatoes and pine nuts' },
    ],
  },
  {
    name: 'Famous Chicken Parmas',
    slug: 'parmas',
    description: 'Our chicken is freshly crumbed daily and topped with our house-made Napoli sauce',
    items: [
      { name: 'Classic Parma', price: '$22', desc: 'Napoli sauce, melted mozzarella, served with chips and salad' },
      { name: 'Hawaiian Parma', price: '$24', desc: 'Ham, pineapple, Napoli sauce, and melted cheese' },
      { name: 'Meat Lovers Parma', price: '$26', desc: 'Bacon, pepperoni, ham, Napoli sauce, and melted cheese' },
      { name: 'Seafood Sensation Parma', price: '$26', desc: 'Prawns, calamari, garlic cream sauce, and melted cheese' },
      { name: 'Vegetarian Parma', price: '$22', desc: 'Grilled vegetables, Napoli sauce, and melted cheese' },
    ],
  },
  {
    name: 'Burgers, Wraps & Sandwiches',
    slug: 'burgers-sandwiches',
    description: 'All served with crispy chips',
    items: [
      { name: 'House Beef Burger', price: '$20', desc: 'Angus beef patty, lettuce, tomato, cheese, pickles, and house sauce' },
      { name: 'Southern Fried Chicken Burger', price: '$19', desc: 'Crispy fried chicken, slaw, pickles, and chipotle mayo' },
      { name: 'Steak Sandwich', price: '$22', desc: 'Scotch fillet, caramelised onion, lettuce, tomato, cheese, and BBQ sauce on Turkish bread' },
      { name: 'Reuben Sandwich', price: '$20', desc: 'Corned beef, sauerkraut, Swiss cheese, and Russian dressing on toasted rye' },
      { name: 'Prosciutto & Brie Sandwich', price: '$24', desc: 'Prosciutto, brie, rocket, and fig jam on ciabatta' },
      { name: 'Grilled Chicken Wrap', price: '$18', desc: 'Grilled chicken, avocado, lettuce, tomato, and garlic aioli in a tortilla wrap' },
      { name: 'Haloumi & Roast Veggie Wrap', price: '$18', desc: 'Grilled haloumi, roast vegetables, hummus, and rocket in a tortilla wrap' },
    ],
  },
  {
    name: 'Kids Menu',
    slug: 'kids-menu',
    description: null,
    items: [
      { name: 'Chicken Nuggets & Chips', price: '$10', desc: null },
      { name: 'Fish Bites & Chips', price: '$12', desc: null },
      { name: 'Kids Spaghetti Bolognese', price: '$12', desc: null },
    ],
  },
  {
    name: 'Sides',
    slug: 'sides',
    description: null,
    items: [
      { name: 'Chips', price: '$8', desc: 'Crispy golden chips with aioli' },
      { name: 'Creamy Mash', price: '$8', desc: 'Buttery mashed potato' },
      { name: 'Garden Salad', price: '$8', desc: 'Mixed greens with house dressing' },
      { name: 'Steamed Vegetables', price: '$8', desc: 'Seasonal steamed vegetables' },
    ],
  },
  {
    name: "Today's Specials",
    slug: 'todays-special',
    description: null,
    items: [
      { name: 'Butter Chicken with Saffron Rice & Drink', price: '$15.99', desc: 'Creamy butter chicken served with fragrant saffron rice and a drink of your choice' },
    ],
  },
];

/**
 * Parse price string like "$15.99" or "$15" to cents (1599 or 1500).
 */
function parsePriceToCents(priceStr) {
  const cleaned = priceStr.replace(/[^0-9.]/g, '');
  return Math.round(parseFloat(cleaned) * 100);
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  console.log('Seeding database...\n');

  // 1. Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rustngold.com.au' },
    update: {},
    create: {
      email: 'admin@rustngold.com.au',
      passwordHash: adminPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // 2. Create kitchen user
  const kitchenPassword = await bcrypt.hash('kitchen123', 12);
  const kitchen = await prisma.user.upsert({
    where: { email: 'kitchen@rustngold.com.au' },
    update: {},
    create: {
      email: 'kitchen@rustngold.com.au',
      passwordHash: kitchenPassword,
      name: 'Kitchen',
      role: 'kitchen',
    },
  });
  console.log(`Kitchen user created: ${kitchen.email}`);

  // 3. Seed menu categories and items
  for (let catIndex = 0; catIndex < MENU.length; catIndex++) {
    const catData = MENU[catIndex];

    const category = await prisma.menuCategory.upsert({
      where: { slug: catData.slug },
      update: { name: catData.name, description: catData.description, sortOrder: catIndex },
      create: {
        name: catData.name,
        slug: catData.slug,
        description: catData.description,
        sortOrder: catIndex,
      },
    });

    console.log(`Category: ${category.name}`);

    for (let itemIndex = 0; itemIndex < catData.items.length; itemIndex++) {
      const itemData = catData.items[itemIndex];
      const itemSlug = slugify(itemData.name);

      await prisma.menuITem.upsert({
        where: {
          categoryId_slug: {
            categoryId: category.id,
            slug: itemSlug,
          },
        },
        update: {
          name: itemData.name,
          description: itemData.desc,
          priceCents: parsePriceToCents(itemData.price),
          sortOrder: itemIndex,
        },
        create: {
          categoryId: category.id,
          name: itemData.name,
          slug: itemSlug,
          description: itemData.desc,
          priceCents: parsePriceToCents(itemData.price),
          sortOrder: itemIndex,
        },
      });

      console.log(`  - ${itemData.name} (${itemData.price})`);
    }
  }

  // 4. Seed example customisations
  console.log('\nCreating example customisations...');

  const sauceCustomisation = await prisma.customisation.create({
    data: {
      name: 'Choose your sauce',
      minSelect: 0,
      maxSelect: 1,
      isRequired: false,
      sortOrder: 0,
      options: {
        create: [
          { name: 'Gravy', priceCents: 0, sortOrder: 0 },
          { name: 'Pepper Sauce', priceCents: 0, sortOrder: 1 },
          { name: 'Mushroom Sauce', priceCents: 0, sortOrder: 2 },
          { name: 'Garlic Cream Sauce', priceCents: 200, sortOrder: 3 },
        ],
      },
    },
  });
  console.log(`  Created: ${sauceCustomisation.name}`);

  const extrasCustomisation = await prisma.customisation.create({
    data: {
      name: 'Add extras',
      minSelect: 0,
      maxSelect: 5,
      isRequired: false,
      sortOrder: 1,
      options: {
        create: [
          { name: 'Extra cheese', priceCents: 150, sortOrder: 0 },
          { name: 'Bacon', priceCents: 300, sortOrder: 1 },
          { name: 'Avocado', priceCents: 300, sortOrder: 2 },
          { name: 'Fried egg', priceCents: 200, sortOrder: 3 },
          { name: 'Jalapenos', priceCents: 100, sortOrder: 4 },
        ],
      },
    },
  });
  console.log(`  Created: ${extrasCustomisation.name}`);

  const cookCustomisation = await prisma.customisation.create({
    data: {
      name: 'How would you like it cooked?',
      minSelect: 1,
      maxSelect: 1,
      isRequired: true,
      sortOrder: 0,
      options: {
        create: [
          { name: 'Rare', priceCents: 0, sortOrder: 0 },
          { name: 'Medium Rare', priceCents: 0, sortOrder: 1 },
          { name: 'Medium', priceCents: 0, sortOrder: 2 },
          { name: 'Medium Well', priceCents: 0, sortOrder: 3 },
          { name: 'Well Done', priceCents: 0, sortOrder: 4 },
        ],
      },
    },
  });
  console.log(`  Created: ${cookCustomisation.name}`);

  // Link customisations to menu items
  // Find the scotch fillet and burgers to link customisations
  const scotchFillet = await prisma.menuITem.findFirst({
    where: { slug: 'angus-scotch-fillet' },
  });
  if (scotchFillet) {
    await prisma.menuItemCustomisation.createMany({
      data: [
        { menuItemId: scotchFillet.id, customisationId: cookCustomisation.id, sortOrder: 0 },
        { menuItemId: scotchFillet.id, customisationId: sauceCustomisation.id, sortOrder: 1 },
      ],
    });
    console.log(`  Linked customisations to Angus Scotch Fillet`);
  }

  const burgers = await prisma.menuITem.findMany({
    where: { slug: { in: ['house-beef-burger', 'southern-fried-chicken-burger'] } },
  });
  for (const burger of burgers) {
    await prisma.menuItemCustomisation.create({
      data: { menuItemId: burger.id, customisationId: extrasCustomisation.id, sortOrder: 0 },
    });
    console.log(`  Linked extras to ${burger.name}`);
  }

  console.log('\nSeed completed successfully!');
  console.log('\n--- Default Login Credentials ---');
  console.log('Admin:   admin@rustngold.com.au / admin123');
  console.log('Kitchen: kitchen@rustngold.com.au / kitchen123');
  console.log('IMPORTANT: Change these passwords in production!\n');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
