export const RATE = 1.7;
export const groupSizes = { solo: 1, couple: 2, family: 4, friends: 3 };
export const cents = value => Math.round(value * 100);
export const fromCurrency = (value, currency) => cents(value * (currency === 'USD' ? RATE : 1));
export const toCurrency = (value, currency) => value / 100 / (currency === 'USD' ? RATE : 1);
export function money(value, currency) {
  return (currency === 'USD' ? '$' : '₼') + toCurrency(value, currency).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: value % 100 === 0 && currency === 'AZN' ? 0 : 2 });
}

export function segmentFor(daily, party) {
  if (daily >= 22000) return 'Baku Luxury';
  if (party === 'family') return 'Family Comfort';
  return daily < 7000 ? 'Budget Backpacker' : 'Smart Explorer';
}

export function recommend(venues, daily, party) {
  const groupSize = groupSizes[party];
  const tripCost = venue => cents(venue.cost * groupSize);
  return venues.filter(venue => tripCost(venue) <= daily).sort((a,b) => {
    if (party === 'family') {
      const score = venue => Number(venue.family) * 3 + venue.features.filter(feature => /stroller|elevator|open space|open grounds|funicular/i.test(feature)).length;
      const familyOrder = score(b) - score(a);
      if (familyOrder) return familyOrder;
    }
    const weight = daily < 7000 ? 0.55 : 0.12;
    const score = venue => (venue.rating ?? 4.45) + (venue.isFamous ? 0.08 : 0) - (tripCost(venue) / Math.max(daily, 1)) * weight;
    return score(b) - score(a);
  });
}

export function localDate(date = new Date()) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
}

export function dateFor(start, offset) {
  const date = new Date(start + 'T12:00:00');
  date.setDate(date.getDate() + offset);
  return date;
}
