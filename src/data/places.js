import { existingDetails, sights, malls, fashion } from './directory.js';

export const photo = id => 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=1100&q=83';
export const skyline = photo('1721071641979-9259530d2ed6');
export const waterfront = photo('1599031857823-dbd85f9976a9');
const make = (id, name, area, coords, cost, rating, image, vibes, description, family = false, features = [], gallery = []) =>
  ({ id, name, area, coords, cost, rating, image, vibes, description, family, features, gallery, kind: 'landmark' });

const originalPlaces = [
  make('flame', 'Flame Towers', 'Sabail · Architecture', [40.3599,49.8276], 0, 4.9, skyline, ['ModernBaku','SunsetSpot'], 'Baku’s three flame-shaped towers rise above the Caspian coast. Watch their light show from the waterfront or walk up to Highland Park. Public viewpoints are free.', false, ['Outdoor viewpoint'], [waterfront]),
  make('heydar', 'Heydar Aliyev Center', 'Narimanov · Culture', [40.3958,49.8671], 15, 4.9, photo('1539707437856-00c96b325eab'), ['ModernBaku','Architecture'], 'Zaha Hadid’s flowing white landmark hosts art and culture exhibitions. Walk the landscaped grounds or plan time to see the galleries inside.', true, ['Family friendly','Open grounds','Metro nearby'], [photo('1704997983693-5b41300cf124')]),
  make('boulevard', 'Baku Boulevard (Seaside Park)', 'Caspian Waterfront · Outdoors', [40.3706,49.8497], 0, 4.8, photo('1704955568697-bbf753ec344b'), ['FamilyFriendly','CaspianViews'], 'Follow the Caspian promenade past gardens, cafés and open plazas. The broad waterfront paths are convenient for strollers and evening walks.', true, ['Family friendly','Stroller friendly','Open space'], [waterfront]),
  make('old-city', 'Icherisheher (Old City)', 'Old City · Heritage', [40.366,49.8352], 0, 4.9, photo('1622314621630-0d24bcb5aa67'), ['OldBaku','CityWalk'], 'Step inside the walls to find sandstone lanes, caravanserais and the Maiden Tower. Walking through the neighborhood is free. Individual museums and monuments charge admission.', false, ['Metro nearby','Walkable'], [skyline]),
  make('highland', 'Highland Park & Eternal Flame', 'Sabail · Viewpoint', [40.3579,49.8300], 0, 4.9, waterfront, ['SunsetSpot','FamilyFriendly'], 'Look across Baku Bay from the hilltop terraces. The memorial and park are free to visit. The lower funicular station is near the Carpet Museum and the ride is charged separately.', true, ['Funicular nearby','Outdoor viewpoint','Family friendly'], [skyline]),
  make('nizami', 'Nizami Street', 'City Center · Shopping', [40.3723,49.8417], 0, 4.7, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/The_fully_pedestrianized_Nizami_Street_in_Baku_%2836234400014%29.jpg/960px-The_fully_pedestrianized_Nizami_Street_in_Baku_%2836234400014%29.jpg', ['CityWalk','NightOut'], 'Join the evening paseo on the pedestrian stretch of Nizami Street. Stop for sweets, shop along the boulevard or detour to Fountains Square.', true, ['Pedestrian zone','Metro nearby'], [photo('1622314621630-0d24bcb5aa67')]),
  make('deniz', 'Deniz Mall', 'Caspian Waterfront · Shopping', [40.3564,49.8373], 0, 4.7, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Deniz_Mall.jpg/960px-Deniz_Mall.jpg', ['ModernBaku','FamilyFriendly'], 'The waterfront mall has a food court, cinema and indoor entertainment. Entry is free. Budget separately for meals and attractions.', true, ['Family friendly','Indoor','Elevators'], [waterfront]),
  make('carpet', 'Azerbaijan Carpet Museum', 'Caspian Waterfront · Museum', [40.3593,49.8355], 10, 4.7, 'https://azerbaijan.travel/fit752x624/center/pages/318/b6008e5c-94ff-4f65-ada1-ec68cb6e2087.jpg', ['Culture','ModernBaku'], 'Inside the rolled-carpet-shaped museum, explore the patterns, materials and weaving traditions of Azerbaijani carpets.', true, ['Family friendly','Indoor'], [waterfront]),
  make('venice', 'Little Venice (Mini Venice)', 'Caspian Waterfront · Outdoors', [40.3601,49.8372], 5, 4.6, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Baku_Boulevard%2C_Little_Venice.jpg/960px-Baku_Boulevard%2C_Little_Venice.jpg', ['FamilyFriendly','CaspianViews'], 'Cross little bridges and watch boats pass through the canals beside the Boulevard. The estimate covers a short boat ride.', true, ['Family friendly','Open space'], [waterfront]),
  make('funicular', 'Baku Funicular', 'Sabail · Scenic ride', [40.3589,49.8341], 2, 4.6, waterfront, ['FamilyFriendly','SunsetSpot'], 'Ride from the waterfront hillside up toward Highland Park. Check operating times before walking to the station.', true, ['Family friendly','Scenic ride'], [skyline])
];

const oldCityPhoto = originalPlaces.find(venue => venue.id === 'old-city').image;
const mallPhoto = photo('1519567241046-7f570eee3ce6');
const shopPhoto = photo('1441986300917-64674bd600d8');
const parkPhoto = photo('1519331379826-f10be5486c6b');
const categories = { landmark:'Culture', park:'Parks & walks', mall:'Shopping mall', shop:'Fashion & gifts' };

const originals = originalPlaces.map(venue => {
  const [address, hours, kind] = existingDetails[venue.id];
  const updated = { ...venue, address, hours, kind };
  if (kind === 'mall') Object.assign(updated, { brands:['Nike','Fashion and gift shops'], tier:'Budget to mid-range', amenities:['Elevators','Cinema','Food court'] });
  return updated;
});

const sightPhotos = {
  maiden: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Old_City%2C_Baku-_Part_II_-_OldCityBaku8347.jpg/960px-Old_City%2C_Baku-_Part_II_-_OldCityBaku8347.jpg',
  ateshgah: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ateshgah_Fire_Temple.jpg/960px-Ateshgah_Fire_Temple.jpg',
  yanar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Yanar_Dag_-_Flaming_Hillside.jpg/960px-Yanar_Dag_-_Flaming_Hillside.jpg',
};

const moreSights = sights.map(([id,name,area,address,coords,cost,hours,kind,description,family,features]) => {
  const image = sightPhotos[id] ?? (kind === 'park' ? parkPhoto : oldCityPhoto);
  return { ...make(id,name,area + ' · ' + categories[kind],coords,cost,4.7,image,kind === 'park' ? ['CityWalk','OpenAir'] : ['Culture','History'],description,family,features,[kind === 'park' ? waterfront : skyline]), address,hours,kind,illustrative:!sightPhotos[id] };
});

const mallVenues = malls.map(([id,name,area,address,coords,tier,brands,amenities]) => ({
  ...make(id,name,area + ' · Shopping mall',coords,0,4.6,mallPhoto,['Shopping','Indoor'],name + ' is a shopping and dining destination in ' + area + '. Start with the featured stores and allow extra time for food or entertainment.',true,['Indoor','Family friendly',...amenities],[shopPhoto]),
  address,hours:'Generally 10:00–22:00',kind:'mall',tier,brands,amenities,illustrative:true
}));

const shops = fashion.map(([id,name,parentId,cost,tier,description],index) => {
  const parent = [...mallVenues,...originals].find(venue => venue.id === parentId);
  const inMall = parent.kind === 'mall';
  return {
    ...make(id,name,parent.name + ' · Fashion & gifts',parent.coords,cost,4.5,shopPhoto,['Shopping','Fashion'],description, id === 'lc',['Shopping',...(inMall ? ['Indoor',...parent.amenities.slice(0,2)] : ['Old City'])],[mallPhoto]),
    address: inMall ? parent.name + ', ' + parent.address : (index % 2 ? 'Kichik Gala Street, ' : 'Qasr Street, ') + 'Icherisheher, Sabail',
    hours: inMall ? parent.hours : 'Individual shop hours vary',
    kind:'shop', tier, brands:[inMall ? name : 'Azerbaijani makers'], amenities:inMall ? parent.amenities : ['Walkable area'], illustrative:true
  };
});

export const places = [...originals,...moreSights,...mallVenues,...shops];
