// Photo URLs are royalty-free Unsplash images. Replace with your own or local images in /public.
export const SITE = {
  name: 'Rust n Gold',
  tagline: 'Brewed Mornings. Golden Evenings.',
  address: '202 Albert St, Ballarat, VIC 3356',
  logo: '/logo.png',
  phone: '0478 177 222'
}

export const GALLERY = [
  "/images/pic1.jpg",
  "/images/pic2.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
  "/images/pic6.jpg",
  "/images/pic7.jpg",
  "/images/pic8.jpg",
  "/images/pic9.jpg",
  "/images/pic10.jpg",
  "/images/pic11.jpg",
  "/images/pic12.jpg",

]
export const MENU = [
  {
    id: 'starters',
    title: 'Starters & Share Plates',
    items: [
      { name: 'Homemade Truffle & Mushroom Arancini', price: '14.00', desc: 'Golden-fried risotto balls with truffle and sautéed mushrooms, topped with shaved Parmesan and served with a zesty herb aioli.' },
      { name: 'Lemon Pepper Calamari', price: '15.00', desc: 'Lightly fried calamari tossed in lemon and cracked pepper, served with a side of aioli.' },
      { name: 'Crispy Potato Wedges', price: '10.00', desc: 'Classic potato wedges seasoned and fried to perfection, served with sour cream and sweet chili sauce.' },
      { name: 'Haloumi Fries', price: '14.00', desc: 'Sticks of crispy, fried haloumi cheese drizzled with honey.' }
    ]
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    description: 'Served Saturday & Sunday until 2pm.',
    items: [
      { name: 'Toast with Spreads', price: '6.50', desc: 'Two slices of toasted sourdough with butter and your choice of Vegemite, jam, peanut butter, or honey.' },
      { name: 'Bacon, Egg & Hash Brown Roll', price: '10.90', desc: 'Crispy bacon, fried egg, golden hash brown, and our Signature House Sauce on a toasted milk bun.' },
      { name: 'Two Eggs on Toast', price: '10.90', desc: 'Eggs cooked your way—fried, scrambled, or poached—served on toasted sourdough.' },
      { name: 'Classic Porridge', price: '12.90', desc: 'Creamy rolled oats topped with seasonal berries, a drizzle of honey, a spoon of nut butter, and a sprinkle of cinnamon.' },
      { name: 'Croissant French Toast', price: '11.90', desc: 'Fluffy, buttery croissants soaked in vanilla-cinnamon custard, griddled to golden perfection, and served with berries, maple syrup, and icing sugar.' },
      { name: 'Meat Lovers Omelette', price: '16.90', desc: 'Fluffy three-egg omelette loaded with crispy bacon, shaved leg ham, spicy salami, and melted cheese, served with toasted sourdough.' },
      { name: 'Veggie Omelette', price: '15.90', desc: 'Light and flavourful three-egg omelette filled with baby spinach, cherry tomatoes, and sautéed mushrooms, served with toasted sourdough.' },
      { name: 'The Big Aussie', price: '21.50', desc: 'Two eggs your way, crispy bacon, juicy chipolata sausages, grilled tomato, sautéed mushrooms, golden hash browns, and toasted sourdough.' },
      { name: 'The Veggie Brekkie', price: '19.90', desc: 'Two eggs your way, grilled halloumi, smashed avocado, grilled tomato, sautéed mushrooms, wilted spinach, baked beans, golden hash browns, and toasted sourdough.' },
      { name: 'Chilli Scramble', price: '15.90', desc: 'Creamy scrambled eggs infused with house-made chilli oil, topped with crumbled feta and crispy fried shallots, served on toasted sourdough.' },
      { name: 'Classic Eggs Benny', price: '16.90', desc: 'Two poached eggs with wilted spinach on a toasted English muffin, topped with rich hollandaise sauce and your choice of leg ham or bacon.' },
    ]
  },
  {
    id: 'mains',
    title: 'Mains',
    items: [
      { name: 'Grilled Salmon Fillet', price: '28.00', desc: 'A succulent grilled salmon fillet served with tender asparagus and a delicate lemon dill butter sauce.' },
      { name: 'Angus Scotch Fillet (300g)', price: '32.00', desc: 'Grilled to your liking and served with your choice of chips or creamy mash, seasonal vegetables, and your choice of sauce: mushroom, peppercorn, red wine gravy, or garlic.' },
      { name: 'Slow-Braised Lamb Shank', price: '26.00', desc: 'Tender, slow-cooked lamb shank falling off the bone, served on a bed of creamy mash with rich gravy and seasonal vegetables.' },
      { name: 'Roast Pork', price: '24.00', desc: 'A hearty plate of tender roast pork with crispy crackling, roasted vegetables, warm apple sauce, and rich pork gravy.' },
      { name: 'Chicken Skewers', price: '26.00', desc: 'Two grilled chicken skewers served on warm pita bread with a fresh garden salad and our house-made white garlic sauce.' }
    ]
  },
  {
    id: 'pasta',
    title: 'Pasta',
    items: [
      { name: 'Spaghetti Bolognese', price: '23.00', desc: 'A classic rich beef and tomato ragu tossed with spaghetti and finished with fresh Parmesan.' },
      { name: 'Fettuccine Carbonara', price: '25.00', desc: 'Traditional creamy carbonara with smoky bacon, sautéed mushrooms, and fresh herbs.' },
      { name: 'Creamy Pesto Spaghetti', price: '22.00', desc: 'Spaghetti tossed in a rich and creamy basil pesto sauce, finished with fresh herbs and Parmesan.' }
    ]
  },
  {
    id: 'parmas',
    title: 'Famous Chicken Parmas',
    description: 'All our chicken is freshly crumbed in-house daily and topped with our signature house-made Napoli sauce.',
    items: [
      { name: 'The Classic Parma', price: '22.00', desc: 'Our signature parma topped with premium ham, melted mozzarella, and fresh Parmesan. Served with chips & salad.' },
      { name: 'Hawaiian Parma', price: '24.00', desc: 'Topped with leg ham, melted mozzarella, and sweet pineapple. Served with chips & salad.' },
      { name: 'Meat Lovers Parma', price: '26.00', desc: 'Loaded with smoky bacon, spicy salami, and ham, all topped with melted mozzarella and a drizzle of barbecue sauce. Served with chips & salad.' },
      { name: 'Seafood Sensation Parma', price: '26.00', desc: 'Topped with fresh prawns, melted mozzarella, and a creamy garlic sauce. Served with chips & salad.' },
      { name: 'Vegetarian Parma', price: '26.00', desc: 'Crumbed eggplant topped with fresh tomatoes, red onions, crumbled feta, and melted mozzarella. Served with chips & salad.' }
    ]
  },
  {
    id: 'burgers_sandwiches',
    title: 'Burgers, Wraps & Sandwiches',
    description: 'All burgers and sandwiches are served with a side of crispy chips.',
    items: [
      { name: 'House Beef Burger', price: '22.00', desc: 'A juicy house-made beef patty, melted cheddar, crispy bacon, fresh lettuce, tomato, and pickle, finished with our signature house sauce.' },
      { name: 'Southern Fried Chicken Burger', price: '24.00', desc: 'A crispy southern fried chicken fillet with creamy slaw, melted cheese, and garlic aioli.' },
      { name: 'Steak Sandwich', price: '24.00', desc: 'Tender grilled steak with caramelized onion, melted cheese, crispy bacon, and a savory relish.' },
      { name: 'The Reuben', price: '20.00', desc: 'Thinly sliced pastrami with Swiss cheese, tangy sauerkraut, and Russian dressing on toasted rye bread.' },
      { name: 'Spicy Prosciutto Sandwich', price: '20.00', desc: 'Prosciutto and fresh mozzarella with a zesty kick of red pepper chili jam and rocket on toasted sourdough.' },
      { name: 'Grilled Chicken Wrap', price: '22.00', desc: 'Marinated grilled chicken with fresh salad and garlic aioli, wrapped in a warm tortilla.' },
      { name: 'Vegetarian Haloumi Wrap', price: '18.00', desc: 'Grilled haloumi, fresh tomatoes, onion, and mixed greens with our creamy garlic sauce, wrapped in a warm tortilla.' }
    ]
  },
  {
    id: 'kids_menu',
    title: 'Kids Menu',
    items: [
      { name: 'Chicken Nuggets & Chips', price: '10.00', desc: null },
      { name: 'Fish Bites & Chips', price: '12.00', desc: null },
      { name: 'Kids Spaghetti Bolognese', price: '12.00', desc: null }
    ]
  },
  {
    id: 'todays_special',
    title: "Today's Specials",
    description: 'Available for a limited time only. Perfect for a quick, hearty lunch!',
    items: [
      {
        name: 'Butter Chicken with Saffron Rice & Drink',
        price: '15.99',
        desc: 'Rich, creamy butter chicken simmered in a spiced tomato sauce, served with aromatic saffron rice and your choice of canned soft drink. A comforting classic with a touch of elegance.'
      }
    ]
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'Chips', price: '8.00', desc: null },
      { name: 'Creamy Mash', price: '8.00', desc: null },
      { name: 'Garden Salad', price: '8.00', desc: null },
      { name: 'Steamed Vegetables', price: '8.00', desc: null }
    ]
  }
];
