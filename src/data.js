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
      { name: 'Homemade Truffle & Mushroom Arancini', price: '13.00', desc: 'Golden-fried risotto balls with truffle and sautéed mushrooms, topped with shaved Parmesan and served with a zesty herb aioli.' },
      { name: 'Lemon Pepper Calamari', price: '14.00', desc: 'Lightly fried calamari tossed in lemon and cracked pepper, served with a side of aioli.' },
      { name: 'Crispy Potato Wedges', price: '9.00', desc: 'Classic potato wedges seasoned and fried to perfection, served with sour cream and sweet chili sauce.' },
      { name: 'Haloumi Fries', price: '13.00', desc: 'Sticks of crispy, fried haloumi cheese drizzled with honey.' }
    ]
  },
  {
    id: 'mains',
    title: 'Mains',
    items: [
      { name: 'Grilled Salmon Fillet', price: '26.00', desc: 'A succulent grilled salmon fillet served with tender asparagus and a delicate lemon dill butter sauce.' },
      { name: 'Angus Scotch Fillet (300g)', price: '30.00', desc: 'Grilled to your liking and served with your choice of chips or creamy mash, seasonal vegetables, and your choice of sauce: mushroom, peppercorn, red wine gravy, or garlic.' },
      { name: 'Slow-Braised Lamb Shank', price: '24.00', desc: 'Tender, slow-cooked lamb shank falling off the bone, served on a bed of creamy mash with rich gravy and seasonal vegetables.' },
      { name: 'Roast Pork', price: '22.00', desc: 'A hearty plate of tender roast pork with crispy crackling, roasted vegetables, warm apple sauce, and rich pork gravy.' },
      { name: 'Chicken Skewers', price: '24.00', desc: 'Two grilled chicken skewers served on warm pita bread with a fresh garden salad and our house-made white garlic sauce.' }
    ]
  },
  {
    id: 'pasta',
    title: 'Pasta',
    items: [
      { name: 'Spaghetti Bolognese', price: '21.00', desc: 'A classic rich beef and tomato ragu tossed with spaghetti and finished with fresh Parmesan.' },
      { name: 'Fettuccine Carbonara', price: '23.00', desc: 'Traditional creamy carbonara with smoky bacon, sautéed mushrooms, and fresh herbs.' },
      { name: 'Creamy Pesto Spaghetti', price: '21.00', desc: 'Spaghetti tossed in a rich and creamy basil pesto sauce, finished with fresh herbs and Parmesan.' }
    ]
  },
  {
    id: 'parmas',
    title: 'Famous Chicken Parmas',
    description: 'All our chicken is freshly crumbed in-house daily and topped with our signature house-made Napoli sauce.',
    items: [
      { name: 'The Classic Parma', price: '22.00', desc: 'Our signature parma topped with premium ham, melted mozzarella, and fresh Parmesan. Served with chips & salad.' },
      { name: 'Hawaiian Parma', price: '22.00', desc: 'Topped with leg ham, melted mozzarella, and sweet pineapple. Served with chips & salad.' },
      { name: 'Meat Lovers Parma', price: '24.00', desc: 'Loaded with smoky bacon, spicy salami, and ham, all topped with melted mozzarella and a drizzle of barbecue sauce. Served with chips & salad.' },
      { name: 'Seafood Sensation Parma', price: '24.00', desc: 'Topped with fresh prawns, melted mozzarella, and a creamy garlic sauce. Served with chips & salad.' },
      { name: 'Vegetarian Parma', price: '24.00', desc: 'Crumbed eggplant topped with fresh tomatoes, red onions, crumbled feta, and melted mozzarella. Served with chips & salad.' }
    ]
  },
  {
    id: 'burgers_sandwiches',
    title: 'Burgers, Wraps & Sandwiches',
    description: 'All burgers and sandwiches are served with a side of crispy chips.',
    items: [
      { name: 'House Beef Burger', price: '20.00', desc: 'A juicy house-made beef patty, melted cheddar, crispy bacon, fresh lettuce, tomato, and pickle, finished with our signature house sauce.' },
      { name: 'Southern Fried Chicken Burger', price: '22.00', desc: 'A crispy southern fried chicken fillet with creamy slaw, melted cheese, and garlic aioli.' },
      { name: 'Steak Sandwich', price: '22.00', desc: 'Tender grilled steak with caramelized onion, melted cheese, crispy bacon, and a savory relish.' },
      { name: 'The Reuben', price: '18.00', desc: 'Thinly sliced pastrami with Swiss cheese, tangy sauerkraut, and Russian dressing on toasted rye bread.' },
      { name: 'Spicy Prosciutto Sandwich', price: '18.00', desc: 'Prosciutto and fresh mozzarella with a zesty kick of red pepper chili jam and rocket on toasted sourdough.' },
      { name: 'Grilled Chicken Wrap', price: '20.00', desc: 'Marinated grilled chicken with fresh salad and garlic aioli, wrapped in a warm tortilla.' },
      { name: 'Vegetarian Haloumi Wrap', price: '16.00', desc: 'Grilled haloumi, fresh tomatoes, onion, and mixed greens with our creamy garlic sauce, wrapped in a warm tortilla.' }
    ]
  },
  {
    id: 'kids_menu',
    title: 'Kids Menu',
    items: [
      { name: 'Chicken Nuggets & Chips', price: '9.00', desc: null },
      { name: 'Fish Bites & Chips', price: '10.00', desc: null },
      { name: 'Kids Spaghetti Bolognese', price: '10.00', desc: null }
    ]
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'Chips', price: '7.00', desc: null },
      { name: 'Creamy Mash', price: '7.00', desc: null },
      { name: 'Garden Salad', price: '7.00', desc: null },
      { name: 'Steamed Vegetables', price: '7.00', desc: null }
    ]
  }
];

