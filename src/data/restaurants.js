import { photo } from './places.js';
import { addedRestaurants, cafes } from './foodDirectory.js';

const kfc = [
  ['Buckets','Sanders Bucket',24.9],['Buckets','6-piece Chicken Bucket',21.9],['Buckets','Twister Family Box',29.9],
  ['Wraps & burgers','Twister Wrap',7.2],['Wraps & burgers','Zinger Burger',7.9],['Wraps & burgers','Boxmaster',9.6],['Wraps & burgers','I-Twister',2.6],
  ['Sides & drinks','Crispy Strips (3 pcs)',5.9],['Sides & drinks','Fries & Drink Combo',5.5],['Sides & drinks','Corn on the cob',2.9],['Sides & drinks','Soft drink',2.2]
];
const local = [
  ['Starters','Qutab with herbs',4],['Starters','Dovga yogurt soup',6],['Starters','Eggplant rolls',8],
  ['Mains','Dolma',14],['Mains','Chicken kebab',15],['Mains','Lamb kebab',19],['Mains','Azerbaijani plov',18],
  ['Desserts & drinks','Pakhlava',6],['Desserts & drinks','Azerbaijani tea',5]
];

function restaurant(id, name, area, coords, address, hours, rating, cost, menu, source, fast = false) {
  return {
    id, name, area, coords, address, hours, rating, cost, menu, source, family: true, kind: 'restaurant',
    image: fast ? photo('1562967916-eb82221dfb92') : photo('1517248135467-4c7edcad34c4'),
    gallery: [photo('1543353071-873f17a7a088')],
    features: fast ? ['Dine-in','Delivery','Family friendly'] : ['Dine-in','Family friendly','Local cuisine'],
    vibes: fast ? ['QuickBite','FamilyFriendly'] : ['AzerbaijaniFood','CityCenter'],
    description: fast ? 'A quick stop for fried chicken, wraps and shareable buckets. Select menu items and quantities to plan a meal for your group.' : 'Try Azerbaijani staples near Fountains Square, from stuffed vine leaves to grilled kebabs. Use the menu to estimate your meal cost.'
  };
}

const originals = [
  restaurant('kfc-nizami','KFC Baku — Nizami Street area','City Center · Fast food',[40.3709,49.8357],'2 Azerbaijan Avenue, near Fountains Square','Approx. 10:00–23:00',4.3,9,kfc,'https://wolt.com/en/aze/baku/brand/kfc',true),
  restaurant('kfc-28','KFC Baku — 28 Mall','28 May · Fast food',[40.3796,49.8481],'28 Mall, fourth floor, Azadliq Avenue','10:00–22:00',4.3,9,kfc,'https://www.mall28.az/brands/kfc',true),
  restaurant('firuze','Firuze','Fountains Square · Azerbaijani',[40.3706,49.8376],'14 Tarlan Aliyarbayov Street','Approx. 11:00–23:00',4.7,18,local,null),
  restaurant('nergiz','Nergiz','Fountains Square · Azerbaijani',[40.3704,49.8372],'9 Tarlan Aliyarbayov Street','Approx. 11:00–23:00',4.6,20,local.map(([group,name,cost]) => [group,name,cost + 1]),null)
];

const coffee = [
  ['Coffee','Espresso',4],['Coffee','Americano',5],['Coffee','Cappuccino',6.5],['Coffee','Flat White',7],['Coffee','Latte',7.5],
  ['Cold drinks','Iced latte',8],['Cold drinks','Lemonade',7],
  ['Pastries & desserts','Butter croissant',5],['Pastries & desserts','Chocolate cake',8.5]
];
const menus = {
  mcd:[['Burgers','Big Mac',7.5],['Burgers','Cheeseburger',3.7],['Combos','Big Mac Meal',12],['Combos','Chicken Meal',11.5],['Sides','Chicken Nuggets',6],['Sides','Fries',4],['Desserts','Sundae',4]],
  museum:[['Starters','Qutab with greens',6],['Starters','Azerbaijani cheese plate',15],['Mains','Shah plov',32],['Mains','Lamb saj',34],['Mains','Dolma',19],['Desserts & drinks','Pakhlava and tea',11]],
  dolma:[['Starters','Lentil soup',6],['Starters','Herb qutab',4],['Mains','Vine-leaf dolma',14],['Mains','Three-sisters dolma',16],['Mains','Chicken levengi',18],['Desserts & drinks','Black tea',4]],
  sumakh:[['Starters','Mangal salad',12],['Starters','Dushbara',10],['Mains','Lamb kebab',28],['Mains','Pomegranate chicken',26],['Mains','Shah plov',34],['Desserts & drinks','Pakhlava',10]],
  steak:[['Starters','Grilled vegetable salad',14],['Steaks','Ribeye',54],['Steaks','Striploin',45],['Grill','Steakhouse burger',21],['Sides','Grilled vegetables',9],['Sides','Fries',7]],
  specialty:[...coffee,['Coffee','Filter coffee',7.5]],
  bakery:[...coffee,['Bakery','Pain au chocolat',6],['Bakery','Chicken baguette',10],['Bakery','Fruit tart',8]],
  brunch:[...coffee,['Brunch','Eggs Benedict',15],['Brunch','Avocado toast',13],['Brunch','Pancakes',11]]
};

const descriptions = {
  mcd:'A quick stop on Nizami Street beside Fountain Square. The pedestrian location makes it easy to pair with an Old City walk.',
  museum:'Traditional Azerbaijani dining in an interior furnished with carpets, copperware and historical objects. Check availability if you want to dine in one of the themed rooms.',
  dolma:'A central stop for stuffed vine leaves and other Azerbaijani dishes. It is a short walk from the Old City walls and Fountain Square.',
  sumakh:'Azerbaijani dishes, fragrant spices and local tableware shape the experience at this Khatai restaurant. It is a useful dinner stop east of the city center.',
  steak:'A steakhouse option for a higher-budget dinner in central Baku. Check cuts, portions and the current address before heading out.',
  specialty:'A coffee stop for espresso, milk drinks and a pastry. Check the café’s current selection for filter coffee and seasonal drinks.',
  bakery:'A bakery café suitable for a short breakfast or an afternoon pastry. Sandwiches make it a useful stop between walks.',
  brunch:'A café for a longer coffee or brunch stop. The menu below provides a planning estimate for drinks, pastries and light meals.'
};

export const restaurants = [...originals,...[...addedRestaurants,...cafes].map(entry => {
  const [id,name,area,address,coords,hours,cost,style,source] = entry;
  const isCafe = cafes.includes(entry);
  return {
    ...restaurant(id,name,area + (isCafe ? ' · Café' : ' · Dining'),coords,address,hours,4.5,cost,menus[style],source,style === 'mcd'),
    kind: isCafe ? 'cafe' : 'restaurant',
    description: descriptions[style],
    image: isCafe ? photo('1501339847302-ac426a4a7cbb') : style === 'mcd' ? photo('1568901346375-23c9450c58cd') : photo('1517248135467-4c7edcad34c4'),
    gallery: isCafe ? [photo('1447933601403-0c6688de566e'),photo('1555507036-ab1f4038808a')] : [photo('1543353071-873f17a7a088')],
    features: isCafe ? ['Dine-in','Coffee & pastries'] : style === 'mcd' ? ['Dine-in','Delivery','Family friendly'] : ['Dine-in','Group dining'],
    vibes: isCafe ? ['Coffee','CafeStop'] : style === 'mcd' ? ['QuickBite','FamilyFriendly'] : ['Dining','BakuFood'],
    approximatePin: id === 'hillside-cafe' || /confirm/i.test(address)
  };
})];
