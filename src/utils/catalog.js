const letters = { ə:'e', ı:'i', ł:'l' };
export const normalize = value => String(value ?? '').toLocaleLowerCase('en').normalize('NFD')
  .replace(/\p{Diacritic}/gu,'').replace(/[əıł]/g,letter => letters[letter]).replace(/[^\p{L}\p{N}]+/gu,' ').trim();

export const categoryMatches = (venue, category) => category === 'all' ||
  (category === 'family' ? venue.family :
    category === 'landmark' ? ['landmark','tower'].includes(venue.kind) : venue.kind === category);

export function makeCatalog(venues) {
  return venues.map(venue => ({
    venue,
    terms: normalize([venue.name,venue.area,venue.district,venue.address,venue.kind,...(venue.aliases ?? []),...(venue.brands ?? []),...(venue.vibes ?? [])].join(' '))
  }));
}

export const areas = ['Badamdar','Bilgah','Fountain Square','Gobustan','Khirdalan','Mardakan','Nardaran','Old City','Shuvelan','White City'];
const areaAliases = {
  Bilgah:['bilgeh'],
  'Fountain Square':['fountains square','fevvareler'],
  Gobustan:['qobustan'],
  Khirdalan:['xirdalan'],
  Mardakan:['merdekan'],
  'Old City':['icherisheher','iceriseher'],
  Shuvelan:['suvelan'],
  'White City':['ag seher']
};

export function filterCatalog(catalog,{ query='', district='all', category='all', savedIds } = {}) {
  const tokens = normalize(query).split(' ').filter(Boolean);
  const selectedArea = district.startsWith('area:') ? district.slice(5) : '';
  const areaTerms = selectedArea ? [normalize(selectedArea),...(areaAliases[selectedArea] ?? [])] : [];
  return catalog.flatMap(({venue,terms}) => (
    categoryMatches(venue,category) && (selectedArea ? areaTerms.some(area => terms.includes(area)) : district === 'all' || venue.district === district) &&
    (!savedIds || savedIds.has(venue.id)) && tokens.every(token => terms.includes(token))
  ) ? [venue] : []);
}
