import { normalize as catalogText } from './catalog.js';
import { cents, fromCurrency, money, recommend, groupSizes } from './segmentLogic.js';

export const interests = [
  ['shopping','Shopping & Malls',['mall','shop']],
  ['food','Cafes & Food',['cafe','restaurant']],
  ['parks','Parks & Views',['park']],
  ['culture','Culture & History',['landmark','tower']]
];

export const groups = [['solo','Solo'],['couple','Couple'],['family','Family with Kids'],['friends','Friends']];

export function planRecommendations(venues, trip, entries) {
  const daily = Math.floor(trip.budget / trip.days);
  const dailyRemaining = Array.from({length:trip.days}, () => Math.max(0,daily));
  const counts = Array(trip.days).fill(0);
  for (const entry of entries) {
    if (entry.day < trip.days) dailyRemaining[entry.day] -= entry.cost;
  }
  let remaining = Math.max(0,trip.budget - entries.reduce((sum,entry) => sum + entry.cost,0));
  const selectedKinds = interests.filter(([id]) => trip.interests.includes(id)).flatMap(([, , kinds]) => kinds);
  const ranked = recommend(venues,daily,trip.party)
    .filter(venue => (trip.party !== 'family' || venue.family) && !entries.some(entry => entry.venueId === venue.id))
    .sort((a,b) => Number(selectedKinds.includes(b.kind)) - Number(selectedKinds.includes(a.kind)));
  const picks = [];
  for (const venue of ranked) {
    if (picks.length === Math.min(12,trip.days * 2)) break;
    const cost = cents(venue.cost) * groupSizes[trip.party];
    if (cost > remaining) continue;
    const eligible = counts.map((count,index) => ({ count,index })).filter(({ count,index }) => count < 2 && cost <= Math.max(0,dailyRemaining[index]));
    eligible.sort((a,b) => a.count - b.count || dailyRemaining[b.index] - dailyRemaining[a.index]);
    if (!eligible.length) continue;
    const day = eligible[0].index;
    dailyRemaining[day] -= cost;
    remaining -= cost;
    counts[day]++;
    const people = groupSizes[trip.party];
    picks.push({ venue,day,cost,summary: people + (venue.menu ? ' estimated meal(s)' : venue.kind === 'shop' ? ' estimated purchase(s)' : ' visitor(s)') });
  }
  return picks;
}

const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/’/g,"'");
const cash = /(?:([$₼])\s*(\d+(?:[.,]\d+)?)|(\d+(?:[.,]\d+)?)\s*(usd|azn|manat|dollars?|[$₼]))/i;
const currencyOf = token => /\$|usd|dollar/i.test(token) ? 'USD' : 'AZN';
const readNumber = value => Number(value.replace(',','.'));

export function parseBudget(input, defaultCurrency) {
  const value = input.trim();
  const matched = value.match(cash);
  const numeric = matched ? matched[2] || matched[3] : value;
  const currency = matched ? currencyOf(matched[1] || matched[4]) : defaultCurrency;
  if ((matched && matched[0] !== value) || !/^\d+(?:[.,]\d{1,2})?$/.test(numeric)) return null;
  const amount = readNumber(numeric);
  return amount <= 1000000 ? fromCurrency(amount,currency) : null;
}

export const starterPrompts = [
  'Where should I eat near Fountain Square under 20 AZN?',
  'Best places to take kids in Baku?',
  'How do I use the Baku Metro?',
  'Plan a 1-day shopping & cafe route'
];

const reply = (text, venues = [], link) => ({ text, venues, link });
const mapDistance = (a,b) => Math.hypot((a[0] - b[0]) * 111,(a[1] - b[1]) * 84);
const foodType = venue => Boolean(venue.menu);
const tokens = text => catalogText(text).split(' ').filter(word => word.length > 2 && !['about','baku','what','where','which','can','for','the','some','tell','show'].includes(word));
const containsPhrase = (text,phrase) => phrase.length > 2 && (' ' + text + ' ').includes(' ' + phrase + ' ');

function venueMatches(venues, text) {
  return venues.flatMap(venue => {
    const full = [venue.name,...(venue.aliases ?? [])].map(catalogText);
    const exact = Math.max(0,...full.filter(phrase => containsPhrase(text,phrase)).map(phrase => 100 + phrase.length));
    const prefix = catalogText(venue.name.split(' — ')[0]);
    const part = containsPhrase(text,prefix) ? prefix.length : 0;
    const branch = venue.name.includes(' — ') ? catalogText(venue.name.split(' — ')[1]) : '';
    const score = Math.max(exact,part + (part && containsPhrase(text,branch) ? 100 + branch.length : 0));
    return score ? [{ venue,score }] : [];
  }).sort((a,b) => b.score-a.score);
}

export function guideAnswer(prompt, context, previousVenueIds = []) {
  const { venues, entries, budget, days, day, party, currency } = context;
  const query = normalize(prompt);
  const search = catalogText(prompt);
  const namedMatches = venueMatches(venues,search);
  const named = namedMatches.filter(item => item.score >= (namedMatches[0]?.score >= 100 ? 100 : 1)).map(item => item.venue);
  const spent = entries.reduce((sum,entry) => sum + entry.cost,0);
  const remaining = Math.max(0,budget - spent);
  const chargedDay = entries.filter(entry => entry.day === day).reduce((sum,entry) => sum + entry.cost,0);
  const dailyRemaining = Math.max(0,Math.floor(budget / days) - chargedDay);
  const group = groupSizes[party];
  const format = value => money(value,currency);
  const amount = query.match(cash);
  const amountValue = amount ? fromCurrency(readNumber(amount[2] || amount[3]),currencyOf(amount[1] || amount[4])) : null;

  if (/\b(metro|bakikart|bus|buses|transport|bolt|taxi)\b/.test(query) && !named.length) {
    return reply('Use a BakıKart physical card or an eligible QR ticket at metro turnstiles. For buses, check the route’s posted payment method and have BakıKart ready. A Bolt ride is door-to-door: check the app’s quote and pickup location before booking. Metro is useful for Icherisheher, Sahil, 28 May and Ganjlik. Check the official guide for fares and service updates.',[],['Baku Metro payment guide','https://metro.gov.az/en/guide-subway/1']);
  }
  if (/\b(convert|conversion|exchange|how much is)\b/.test(query) && (amount || /\b(azn|usd|manat)\b/.test(query))) {
    if (amountValue === null) return reply('The app uses 1 USD = 1.70 AZN. Try “Convert 25 USD to AZN.”');
    return reply(money(amountValue,'USD') + ' = ' + money(amountValue,'AZN') + ' at the planner rate of 1 USD = 1.70 AZN.');
  }
  if (/\b(my budget|left|remaining|how much have i spent|my schedule|my itinerary|what.*planned)\b/.test(query) && !/\b(route|recommend|where|suggest)\b/.test(query)) {
    const daysList = entries.map(entry => 'Day ' + (entry.day+1) + ' · ' + entry.name + ' (' + format(entry.cost) + ')');
    return reply('Trip budget: ' + format(budget) + '. Planned: ' + format(spent) + '. ' + (spent > budget ? format(spent-budget) + ' over budget.' : format(remaining) + ' left.') + '\n' + (daysList.length ? daysList.join('\n') : 'Your schedule is empty.'));
  }
  const byId = id => venues.find(venue => venue.id === id);
  const previous = previousVenueIds.map(byId).filter(Boolean);
  const kfcQuery = /\bkfc\b/.test(query);
  const kfc = named.filter(venue => /^kfc\b/i.test(venue.name));
  const specificKfc = kfc.filter(venue => /\bnizami\b/.test(query) ? venue.id === 'kfc-nizami' : /\b28\b/.test(query) ? venue.id === 'kfc-28' : true);
  const namedTargets = kfcQuery && specificKfc.length ? specificKfc : named;
  const target = namedTargets.length ? namedTargets : /\b(it|there|those|their|the menu)\b/.test(query) ? previous : [];
  const routeRequested = /\b(route|one.day|1.day|day trip)\b/.test(query);
  const families = /\b(kids|children|family|stroller)\b/.test(query) || party === 'family';
  const district = [...new Set(venues.map(venue => venue.district))].find(name => containsPhrase(search,catalogText(name)));
  const locationPhrase = search.match(/\b(?:in|near|around) ([^?]+)$/)?.[1];
  const namedArea = !district && locationPhrase ? venues.map(venue => venue.area.split(' · ')[0]).filter(area => containsPhrase(locationPhrase,catalogText(area))).sort((a,b) => b.length-a.length)[0] : '';
  const cap = amountValue ?? Math.min(remaining,dailyRemaining);
  if (routeRequested && !district && !namedArea && /\b(shop\w*|mall\w*|caf[eé]\w*|coffee)\b/.test(query)) {
    let available = cap;
    const route = ['ucb','fountain','nizami','bulvar','boulevard'].map(byId).filter(venue => {
      const cost = cents(venue.cost) * group;
      if (cost > available) return false;
      available -= cost;
      return true;
    });
    return reply('Start by Fountain Square, walk Nizami Street, browse Park Bulvar and finish on the Boulevard. ' + (route.some(venue => venue.id === 'ucb') ? 'Begin with coffee at United Coffee Beans. ' : 'Keep the café stop optional for this budget. ') + 'Estimated group total: ' + format(cap-available) + ', excluding shopping and transport.',route);
  }
  if (target.length && !/\b(near|around|route|under|kid|kids|family)\b/.test(query)) {
    const shortlist = target.slice(0,3);
    return reply(shortlist.map(venue => {
      const header = [venue.name,venue.address,venue.hours].filter(Boolean).join(' · ');
      if (venue.menu && /\b(menu|prices?|eat|order|cost|meal|coffee|how much)\b/.test(query)) {
        return header + '\nEstimated menu: ' + venue.menu.map(([,name,price]) => name + ' ' + format(cents(price))).join(', ');
      }
      const tips = venue.tips ?? [];
      const travel = /\b(metro|bus|bolt|taxi|transport|how do i get)\b/.test(query);
      const facts = venue.isFamous ? Object.values(venue.facts).slice(0,3).join(' · ') : '';
      const guidance = travel ? tips.join(' ') : (venue.experiences?.[0] ?? '');
      return [header,venue.description,facts,guidance].filter(Boolean).join('\n');
    }).join('\n\n'),shortlist);
  }
  const wantsCafe = /\b(cafe|cafes|coffee|pastr\w*|dessert\w*)\b/.test(query);
  const wantsFood = /\b(eat|meal\w*|food|dinner|lunch|cheap|menu|restaurant\w*)\b/.test(query);
  const wantsShopping = /\b(shop\w*|mall\w*|fashion|brand\w*)\b/.test(query);
  const wantsPark = /\b(park\w*|walk\w*|sunset|view\w*)\b/.test(query);
  const wantsCulture = /\b(culture|history|museum\w*|landmark\w*)\b/.test(query);
  const nearFountain = /\bfountains? square\b/.test(query);
  const anchor = nearFountain ? byId('fountain') : target[0];
  const nearby = anchor && /\b(near|around|close)\b/.test(query);
  let candidates = venues.filter(venue => {
    if (wantsCafe && venue.kind !== 'cafe') return false;
    if (!wantsCafe && wantsFood && !foodType(venue)) return false;
    if (wantsShopping && !['mall','shop'].includes(venue.kind)) return false;
    if (wantsPark && venue.kind !== 'park') return false;
    if (wantsCulture && !['landmark','tower'].includes(venue.kind)) return false;
    if (district && venue.district !== district) return false;
    if (namedArea && !containsPhrase(catalogText(venue.area + ' ' + venue.address),catalogText(namedArea))) return false;
    if (/\b(tower|towers|skyscraper|offices)\b/.test(query) && venue.kind !== 'tower') return false;
    if (/\b(resorts?|beach clubs?)\b/.test(query) && venue.kind !== 'resort') return false;
    return !nearby || mapDistance(venue.coords,anchor.coords) <= 1;
  });
  const priceFor = venue => cents(venue.cost) * (amountValue === null ? group : 1);
  candidates = candidates.filter(venue => (amount && /\bunder\b/.test(query) ? priceFor(venue) < cap : priceFor(venue) <= cap) && (!families || venue.family));
  if (!wantsCafe && !wantsFood && !wantsShopping && !wantsPark && !wantsCulture && !families && !nearby && !district && !namedArea) {
    const words = tokens(query);
    candidates = candidates.filter(venue => tokens(venue.name + ' ' + venue.area + ' ' + venue.vibes.join(' ')).some(word => words.includes(word)));
  }
  if (families && !wantsCafe && !wantsFood && !wantsShopping) {
    const priorities = ['boulevard','highland','deniz','venice','dede'];
    const priority = venue => priorities.includes(venue.id) ? priorities.indexOf(venue.id) : priorities.length;
    candidates.sort((a,b) => priority(a)-priority(b));
  } else {
    candidates.sort((a,b) => nearby ? mapDistance(a.coords,anchor.coords) - mapDistance(b.coords,anchor.coords) : (b.rating ?? 4.45) - (a.rating ?? 4.45));
  }
  const picks = candidates.slice(0,4);
  if (!picks.length) return reply('I couldn’t find a catalog match within those limits. Try a venue name, a different budget, or ask about the metro, your schedule or a shopping route.');
  return reply((nearby ? 'Within about 1 km of ' + anchor.name + '. ' : district || namedArea ? 'In ' + (district || namedArea) + '. ' : '') + 'Estimated ' + (amountValue === null ? 'group' : 'per-person') + ' costs within ' + format(cap) + ':\n' + picks.map(venue => venue.name + ' · ' + (venue.cost ? format(priceFor(venue)) : 'Free') + (venue.menu ? ' · Try ' + venue.menu.find(([, , price]) => cents(price) * (amountValue === null ? group : 1) <= cap)?.[1] : '')).join('\n').replaceAll(' · Try undefined',''),picks);
}
