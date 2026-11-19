import { places, photo, skyline, waterfront } from './places.js';
import { restaurants } from './restaurants.js';
import { iconicLocations, featuredStories } from './iconic.js';
import geography from './catalogGeography.js';
import venuePhotos from './venuePhotos.js';
import landmarks from './landmarks.js';
import parks from './parksAndPublic.js';
import food from './restaurantsAndCafes.js';
import shops from './shopsAndLifestyle.js';
import additions from './venueAdditions.js';

const categoryInfo = {
  landmark: ['Sightseeing', 8, photo('1622314621630-0d24bcb5aa67'), ['Sightseeing']],
  tower: ['Architecture', 0, skyline, ['Exterior viewpoint']],
  park: ['Parks & walks', 0, photo('1519331379826-f10be5486c6b'), ['Outdoors']],
  resort: ['Resorts & leisure', 35, waterfront, ['Seasonal access']],
  mall: ['Shopping', 0, photo('1519567241046-7f570eee3ce6'), ['Indoor shopping']],
  shop: ['Retail', 25, photo('1441986300917-64674bd600d8'), ['Shopping']],
  cafe: ['Café & bakery', 12, photo('1501339847302-ac426a4a7cbb'), ['Coffee break']],
  restaurant: ['Dining', 19, photo('1517248135467-4c7edcad34c4'), ['Meal stop']]
};
const cafeMenu = [
  ['Coffee','Espresso',4],['Coffee','Americano',5],['Coffee','Cappuccino',7],['Coffee','Latte',8],
  ['Pastry','Croissant',5],['Sweet options','Cake slice',8.5],['Cold drinks','Iced coffee',8]
];
const restaurantMenu = [
  ['Starters','Soup or salad',7],['Mains','Chicken or vegetable main',15],['Sides','Side dish',5],['Drinks','Soft drink',3],['Dessert','Dessert',7]
];
const quickMenu = [
  ['Main','Chicken sandwich',8],['Combo','Sandwich, fries and drink',14],['Sides','Fries',4],['Drinks','Soft drink',3]
];
const kfcMenu = restaurants.find(venue => venue.id === 'kfc-28').menu;
const mcdMenu = restaurants.find(venue => venue.id === 'mcd').menu;

const malls = {
  'Metropark Shopping & Entertainment Center': [
    'A multilevel shopping center at the Nariman Narimanov metro interchange, with services, dining and entertainment close to the station.',
    'Its transit-adjacent layout makes it an easy indoor break on a route along the Heydar Aliyev Avenue corridor. Plan around the businesses you want to visit and leave time for the metro interchange.',
    ['Fashion and specialty retailers','Dining','Family entertainment'],'https://www.metropark.az/'
  ],
  'Shuvelan Park Shopping Center': [
    'A neighborhood shopping center in Shuvelan, serving the eastern Absheron settlements and coastal visitors.',
    'It works as a supplies or lunch stop on a day in Mardakan and Shuvelan. Unlike the larger downtown malls, its value is in its proximity to beaches, local shops and the connecting roads.',
    ['Dining and cafés','Neighborhood stores'],'https://pashamalls.az/'
  ],
  'Sadarak Trade Center': [
    'Sadarak is a large Lökbatan trade center with market rows and wholesale-oriented retail. Vendors are distributed across separate buildings and passages, so a shop address within the complex matters.',
    'It is a useful stop for comparing prices on everyday clothing and household goods. Selection, return terms and payment methods vary by seller. Keep receipts and confirm the total before paying.',
    ['Clothing and textiles','Household goods','Wholesale and retail market rows'],null
  ],
  'Bina Trade Center': [
    'Bina’s large commercial compound in Lökbatan brings together local clothing sellers, wholesalers and small retailers. The site is separate from the Binə settlement by the airport.',
    'The market is more practical than scenic. Visit with a shopping list and allow time to find the correct block, compare prices and return to the pickup point.',
    ['Clothing','Textiles','Local retailers and wholesalers'],null
  ],
  'Baku Mall': [
    'This Yasamal shopping center is a neighborhood retail stop around the Qələbə circle. It serves the western side of Baku rather than the Caspian waterfront.',
    'Use it for day-to-day shopping or a meal between Yasamal stops. For a large fashion itinerary, check the current store listings before making a special trip.',
    ['Neighborhood retail','Fashion and services'],null
  ],
  'Aygun Mall': [
    'Aygun Mall is a major indoor shopping point in Bakikhanov, in the Sabunchu district. It brings retail, dining and services together away from the tourist waterfront.',
    'The mall can anchor a trip around the eastern city, with other errands or lunch arranged around it. Allow extra time if arriving at a busy hour.',
    ['Neighborhood retail','Dining and services'],null
  ],
};

const mallStory = venue => {
  const [intro, context, directory, source] = malls[venue.name];
  return {
    isFamous:true,overview:[intro,context],
    facts:{'Type':venue.name.includes('Trade Center') ? 'Market and trade complex' : 'Neighborhood shopping center','Status':'Public retail; individual store hours vary'},
    experiences:['Browse the retail areas and compare prices.','Check the directory before making a trip for one store.','Choose a clear meeting or pickup point at the entrance.'],
    tips:['Go earlier in the day for an easier visit. Check store hours and use the signed crossings or taxi drop-off.','Entry to retail areas is generally free. Keep a separate budget for shopping and meals.'],
    tier:venue.name.includes('Trade Center') ? 'Budget and wholesale' : 'Budget to mid-range',
    amenities:['Retail','Dining nearby'],directory,source
  };
};

const extraNames = {
  sea:['Sea Breez','Nardaran Resort','Halfmoon','Caspian Dream Liner','Sea Breeze Crescent'],
  'crescent-bay':['Crescent Development','Caspian Plus'],
  'crescent-hotel':['Crescent Hotel','La Luna'],
  ritz:['Trump Tower','Trump International Hotel'],
  'mardakan-square':['Quadrangular Castle','Mərdəkan Dördbucaq Qalası'],
  'mardakan-round':['Round Fortress','Mərdəkan Dairəvi Qalası'],
  mud:['Mud volcanoes','Gilinj','Palçıq vulkanları'],
  'white-office':['White City Office'],
  gobustan:['Qobustan','Petroglyphs'],
  nardaran:['Nardaran Castle'],
  botanical:['Badamdar Botanical Garden'],
  heydar:['Heydar Aliyev Centre','Heydər Əliyev Mərkəzi'],
  'old-city':['Icheri Sheher','İçərişəhər'],
  venice:['Little Venice','Mini Venice'],
  fountain:['Fountains Square','Fəvvarələr meydanı'],
  yanar:['Yanardag','Yanar Dağ','Burning Mountain']
};

function normalizeCurated(venue) {
  const verified = geography[venue.id];
  const photos = venuePhotos[venue.id];
  const details = { ...venue,...featuredStories[venue.id],...verified,aliases:[...new Set([...(venue.aliases ?? []),...(verified?.aliases ?? []),...(extraNames[venue.id] ?? [])])] };
  return {
    ...details,
    exterior: venue.kind === 'tower' || ['hyatt','ritz'].includes(venue.id),
    directory: venue.id === 'amburan-mall' ? ['Dining and cafés','Family entertainment','Retail stores'] : details.directory,
    ...(photos?.length ? { image:photos[0].src,gallery:[...photos.slice(1).map(item => item.src),...venue.gallery],illustrative:false,contextGallery:true,photoCredits:photos } : {})
  };
}

function formatHours(hours) {
  if (!hours) return 'Hours not listed; confirm before visiting';
  return hours.replace('Mo-Su ','Daily ').replace('Mo-Fr ','Mon–Fri ').replace('Sa-Su ','Sat–Sun ');
}

function normalizeMapped(venue) {
  const [label,cost,image,features] = categoryInfo[venue.kind];
  const isKfc = /^KFC\b/i.test(venue.name);
  const isMcDonalds = /^McDonald/i.test(venue.name);
  const quick = /burger|popeyes|pizza|fast food/i.test(venue.name);
  const knownMenu = isKfc ? kfcMenu : isMcDonalds ? mcdMenu : null;
  const sample = venue.kind === 'cafe' ? cafeMenu : venue.kind === 'restaurant' ? quick ? quickMenu : restaurantMenu : null;
  const story = malls[venue.name] ? mallStory(venue) : undefined;
  const cuisine = venue.cuisine?.split(';').map(item => item.replaceAll('_',' ')).join(', ');
  const area = venue.area === venue.district ? venue.district + ' · ' + label : venue.area + ' · ' + venue.district;
  const publicPark = venue.kind === 'park' && !/ferris|aquapark/i.test(venue.name);
  const exterior = venue.kind === 'tower';
  const descriptions = {
    landmark: 'A sightseeing stop in ' + venue.area + '. Check site access and admission before traveling.',
    tower: 'A modern office or commercial building in ' + venue.area + '. View it from public streets; interior access is controlled.',
    park: 'An outdoor stop in ' + venue.area + '. Use the map for the nearest access point and check any local opening rules.',
    resort: 'A leisure destination in ' + venue.area + '. Confirm current facilities, access and seasonal prices with the operator.',
    mall: 'A shopping destination in ' + venue.area + '. Check the hours of individual shops, services and dining before visiting.',
    shop: 'A retail location in ' + venue.area + '. Check current stock and the branch’s opening hours before a dedicated visit.',
    cafe: 'A café or bakery in ' + venue.area + '. The sample menu gives planning estimates for a typical visit.',
    restaurant: 'A dining stop in ' + venue.area + '.' + (cuisine ? ' Cuisine mapped as ' + cuisine + '.' : '') + ' Check the venue for today’s menu.'
  };
  return {
    ...venue,...story,area,
    hours:formatHours(venue.hours),address:venue.address ? venue.address + ' · ' + venue.district : area,
    rating:null,cost:venue.cost ?? (knownMenu ? isKfc ? 9 : 12 : /ferris/i.test(venue.name) ? 10 : quick ? 14 : cost),
    image,gallery:[venue.kind === 'park' || exterior ? waterfront : photo('1543353071-873f17a7a088')],illustrative:true,
    vibes:[label.replaceAll(/[^a-zA-Z]/g,''),venue.district],
    features:[...features,...(venue.features ?? []),...(venue.outdoor ? ['Outdoor seating'] : [])],family:venue.family ?? (publicPark || venue.kind === 'mall' || isKfc || isMcDonalds),
    description:venue.description ?? descriptions[venue.kind], exterior,
    ...(sample ? {menu:venue.menu ?? knownMenu ?? sample, menuStatus:venue.menuStatus ?? (knownMenu ? 'Illustrative chain menu with estimated prices. Branch availability may vary.' : 'Example planning menu. Check the venue for its actual items and prices.')} : {})
  };
}

const curated = [...places,...restaurants,...iconicLocations].map(normalizeCurated);
const mapped = [...landmarks,...parks,...food,...shops,...additions].map(normalizeMapped);
const directory = [...curated,...mapped];
const byId = new Map(directory.map(venue => [venue.id,venue]));

const mallLinks = {
  sea:['amburan','amburan-mall'],
  'amburan-mall':['amburan'],
  'crescent-bay':['crescent','crescent-hotel'],
  'crescent-hotel':['crescent'],
  'port-towers':['port','port-residence'],
  'port-residence':['port'],
  flame:['highland','funicular']
};
const originalTenants = {
  ganjlik:['zara','massimo','pull','bershka','lc','mango','new-yorker'],
  port:['emporium'],
  mall28:['kfc-28']
};
export const allPlaces = directory.map(venue => {
  const linked = [...(mallLinks[venue.id] ?? []),...(originalTenants[venue.id] ?? [])].map(id => byId.get(id)).filter(Boolean);
  const tenants = [...linked,...mapped.filter(place => place.mall === venue.name)];
  return tenants.length ? { ...venue, tenants } : venue;
});
