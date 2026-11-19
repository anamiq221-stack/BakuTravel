import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, CalendarDays, ChevronDown, Compass, Heart, House, Landmark, Map as MapIcon, MapPin, Minus, Plus, ShoppingBag, ShoppingCart, Trees, Coffee, Sparkles, Star, Trash2, Users, Utensils, Wallet, X } from 'lucide-react';
import TripInterview from './TripInterview';
import GuideChat from './GuideChat';
import { skyline } from './data/places';
import { allPlaces as venues } from './data/allPlaces';
import { filterCatalog, makeCatalog } from './utils/catalog';
import { CatalogSearch, LoadMore } from './CatalogControls';
import PlaceStory from './PlaceStory';
import { cents, dateFor, groupSizes, localDate, money, recommend } from './utils/segmentLogic';
import './style.css';

const BakuMap = lazy(() => import('./BakuMap'));
const catalog = makeCatalog(venues);
const venueById = new Map(venues.map(venue => [venue.id,venue]));
const districts = Array.from(new Set(venues.map(venue => venue.district))).sort();
const PAGE_SIZE = 24;
const MAP_PAGE_SIZE = 20;
const categories = [['all','All',Compass],['landmark','Landmarks & Culture',Landmark],['park','Parks & Walks',Trees],['tower','Towers & Offices',Landmark],['resort','Resorts & Hotels',MapPin],['mall','Malls',ShoppingBag],['shop','Fashion & Shops',ShoppingCart],['cafe','Cafes',Coffee],['restaurant','Restaurants & Fast Food',Utensils],['family','Family Spots',Users]];
const tabs = [['home','Home',House],['ai','AI Search',Sparkles],['explore','Explore',Compass],['map','Map',MapIcon],['schedule','Schedule',CalendarDays]];
const total = entries => entries.reduce((sum, entry) => sum + entry.cost, 0);

function useStored(key, initial) {
  const name = 'bakutravel-v1-' + key;
  const [value,setValue] = useState(() => {
    try {
      const legacy = ['baku','pulse-v1-',key].join('');
      return JSON.parse(localStorage.getItem(name) ?? localStorage.getItem(legacy)) ?? initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(name, JSON.stringify(value)); } catch { /* The app still works in memory. */ }
  }, [name,value]);
  return [value,setValue];
}

function useCatalogSearch(pageSize) {
  const [query,updateQuery] = useState('');
  const [district,updateDistrict] = useState('all');
  const [limit,setLimit] = useState(pageSize);
  return {
    query,district,limit,
    setQuery: next => { updateQuery(next); setLimit(pageSize); },
    setDistrict: next => { updateDistrict(next); setLimit(pageSize); },
    more: () => setLimit(previous => previous + pageSize),
    resetLimit: () => setLimit(pageSize),
    reset: () => { updateQuery(''); updateDistrict('all'); setLimit(pageSize); }
  };
}

function Photo({ src, alt = '', className = '', eager = false }) {
  return <div className={'photo ' + className}>
    <img key={src} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={event => { event.currentTarget.hidden = true; }} />
  </div>;
}

function Rating({ value }) {
  if (!Number.isFinite(value)) return null;
  return <span className="rating" aria-label={'Rating ' + value + ' out of 5'}><Star size={14} fill="currentColor" /> <b>{value.toFixed(1)}</b></span>;
}

function Save({ venue, saved, toggle }) {
  return <button type="button" className={'heart ' + (saved ? 'saved' : '')} aria-pressed={saved} aria-label={(saved ? 'Unsave ' : 'Save ') + venue.name} onClick={() => toggle(venue.id)}>
    <Heart size={19} fill={saved ? 'currentColor' : 'none'} />
  </button>;
}

function Filters({ value, setValue }) {
  return <div className="pills filters" aria-label="Filter places">
    {categories.map(([id,label,Icon]) => <button key={id} type="button" className={'pill ' + (value === id ? 'active' : '')} aria-pressed={value === id} onClick={() => setValue(id)}><Icon size={16}/>{label}</button>)}
  </div>;
}

function Card({ venue, currency, saved, toggle, onOpen, onMap, action }) {
  return <article className={'place-card ' + (onMap ? 'poster' : '')}>
    <div className="card-media">
      <div className="image-button"><Photo src={venue.image}/></div>
      {onMap && <div className="photo-tags">{venue.vibes.map(tag => <span key={tag}>#{tag}</span>)}</div>}
      <Save venue={venue} saved={saved} toggle={toggle}/>
    </div>
    <div className="card-body">
      <div className="title-rating"><button className="text-button place-title card-open" aria-label={'View ' + venue.name} onClick={() => onOpen(venue)}>{venue.name}</button><Rating value={venue.rating}/></div>
      <p className="metadata"><MapPin size={13}/>{venue.area}</p>
      <div className="card-foot"><strong className="price">{venue.cost ? money(cents(venue.cost),currency) : 'Free'} {venue.cost > 0 && <small>{venue.menu ? '/ order' : venue.kind === 'shop' ? '/ purchase' : '/ visit'}</small>}</strong>
        {onMap && <button className="text-button link" onClick={() => onMap(venue)}><MapPin size={15}/> See on Map</button>}</div>
      {action}
    </div>
  </article>;
}

function VenueRow({ venue,currency,onOpen, selected }) {
  return <button className={'venue-row ' + (selected ? 'selected-row' : '')} onClick={() => onOpen(venue)}>
    <Photo src={venue.image}/><span className="row-main"><b>{venue.name}</b><small>{venue.area}</small><strong className="price">{venue.cost ? money(cents(venue.cost),currency) : 'Free'}</strong></span>
    <Rating value={venue.rating}/>
  </button>;
}

function Tracker({ spent, budget, currency }) {
  const percentage = budget ? Math.round(spent / budget * 100) : spent ? 100 : 0;
  const over = spent > budget;
  return <div className="tracker">
    <div className="spread"><b>Budget Tracker</b><b className={over ? 'over' : 'price'}>{percentage}%</b></div>
    <progress aria-label="Trip budget used" className={over ? 'over' : ''} max={100} value={Math.min(100,percentage)}/>
    <div className="spread muted"><span>{money(spent,currency)} planned</span><span>{money(Math.abs(budget-spent),currency)} {over ? 'over budget' : 'left'}</span></div>
  </div>;
}

function Schedule({ days, start, day, setDay, entries, currency, daily, remove, compact = false, go }) {
  const list = entries.filter(entry => entry.day === day);
  return <section className={'panel schedule ' + (compact ? 'compact-schedule' : '')}>
    <div className="panel-heading"><span className="icon-tile"><CalendarDays size={20}/></span><div><h2>My Baku Schedule</h2><p>{days} {days === 1 ? 'day' : 'days'} · {entries.length} planned {entries.length === 1 ? 'stop' : 'stops'}</p></div></div>
    <div className="calendar" aria-label="Choose a trip day">
      {Array.from({length:days},(_,index) => {
        const date = dateFor(start,index);
        return <button key={index} className={'date ' + (day === index ? 'current' : '')} aria-pressed={day === index} aria-label={'Day ' + (index+1) + ', ' + date.toLocaleDateString()} onClick={() => setDay(index)}>
          <span>{date.toLocaleDateString('en',{weekday:'short'})}</span><b>{date.getDate()}</b>
        </button>;
      })}
    </div>
    <div className="spread day-heading"><b>Day {day+1}</b><span>{dateFor(start,day).toLocaleDateString('en',{month:'short',day:'numeric'})}</span></div>
    {list.length ? <ul className="agenda">{list.map(entry => <li key={entry.id}>
      <span className="icon-tile">{entry.meal ? <Utensils size={17}/> : <MapPin size={17}/>}</span>
      <div><b>{entry.name}</b><small>{entry.summary}</small></div>
      <strong className="price">{entry.cost ? money(entry.cost,currency) : 'Free'}</strong>
      <button className="icon-button delete" aria-label={'Remove ' + entry.name} onClick={() => remove(entry.id)}><Trash2 size={17}/></button>
    </li>)}</ul> : <div className="empty"><p>No stops planned for this day.</p><button className="text-button link" onClick={() => go('explore')}>Explore places</button></div>}
    <div className="spread schedule-total"><b>Daily spend</b><strong className={total(list) > daily ? 'over' : 'price'}>{money(total(list),currency)} <small>/ {money(daily,currency)}</small></strong></div>
  </section>;
}

function Detail({ venue, party, currency, days, day, start, onClose, onAdd, onMap, onOpen, saved, toggle }) {
  const dialog = useRef(null);
  const [image,setImage] = useState(venue.image);
  const [targetDay,setTargetDay] = useState(day);
  const [order,setOrder] = useState({});
  const [tickets,setTickets] = useState(groupSizes[party]);
  const quantity = Object.values(order).reduce((sum,n) => sum + n,0);
  const mealCost = venue.menu?.reduce((sum,item,index) => sum + cents(item[2]) * (order[index] ?? 0),0);
  const cost = venue.menu && quantity ? mealCost : cents(venue.cost) * tickets;
  const summary = venue.menu && quantity ? venue.menu.flatMap((item,index) => order[index] ? [order[index] + ' × ' + item[1]] : []).join(', ') : tickets + (venue.menu ? ' estimated meal(s)' : venue.kind === 'shop' ? ' estimated purchase(s)' : ' visitor(s)');
  const gallery = [...new Set([venue.image,...venue.gallery])];
  useEffect(() => {
    dialog.current.showModal();
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);

  return <dialog className="detail" ref={dialog} aria-labelledby="detail-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === dialog.current) onClose(); }}>
    <div className="detail-inner">
      <div className="detail-scroll">
        <div className="detail-hero card-media"><Photo src={image} eager/><Save venue={venue} saved={saved} toggle={toggle}/><button className="icon-button close" aria-label="Close details" onClick={onClose}><X size={21}/></button></div>
        <div className="detail-content">
          <div className="chips">{venue.features.map(feature => <span key={feature}>{feature}</span>)}</div>
          <div className="title-rating"><h2 id="detail-title">{venue.name}</h2><Rating value={venue.rating}/></div>
          <div className="spread detail-meta"><span className="metadata"><MapPin size={15}/>{venue.area}</span><strong className="price">{venue.cost ? money(cents(venue.cost),currency) + (venue.menu ? ' / order estimate' : venue.kind === 'shop' ? ' / purchase estimate' : ' / visit') : 'Free'}</strong></div>
          <dl className="venue-facts"><div><dt>Address</dt><dd>{venue.address}</dd></div><div><dt>Opening hours</dt><dd>{venue.hours}</dd></div><div><dt>Estimated cost</dt><dd>{venue.cost ? money(cents(venue.cost),'AZN') + ' · ' + money(cents(venue.cost),'USD') : venue.exterior ? 'Free exterior view' : 'Free entry or public area'}</dd></div></dl>
          {venue.approximatePin && <p className="note">This pin marks the approximate area. Confirm the entrance or branch before visiting.</p>}
          <PlaceStory venue={venue} onOpen={onOpen}/>
          <h3>Preview</h3>
          {(venue.menu || venue.illustrative || venue.contextGallery) && <p className="note">{venue.contextGallery ? 'The gallery includes photographs of the surrounding area.' : 'Illustrative photography.'}</p>}
          <div className="gallery">{gallery.map((src,index) => <button key={src} aria-label={'Preview photo ' + (index+1)} aria-pressed={image === src} onClick={() => setImage(src)}><Photo src={src}/></button>)}</div>
          {venue.menu && <div className="menu"><h3>Menu &amp; Prices</h3><p className="note">{venue.menuStatus ?? 'Sample planning prices in AZN and USD. Confirm prices and hours with the venue.'}</p>
            {venue.menu.map(([group,name,price],index) => <React.Fragment key={name}>
              {group !== venue.menu[index-1]?.[0] && <h4>{group}</h4>}
              <div className="menu-row"><div><b>{name}</b><small>{money(cents(price),'AZN')} · {money(cents(price),'USD')}</small></div>
                <div className="quantity"><button className="icon-button" aria-label={'Remove one ' + name} disabled={!order[index]} onClick={() => setOrder(previous => ({ ...previous,[index]: (previous[index] ?? 0) - 1 }))}><Minus size={16}/></button><span>{order[index] ?? 0}</span><button className="icon-button" aria-label={'Add one ' + name} onClick={() => setOrder(previous => ({ ...previous,[index]: (previous[index] ?? 0) + 1 }))}><Plus size={16}/></button></div>
              </div>
            </React.Fragment>)}
          </div>}
        </div>
      </div>
      <div className="detail-actions">
        <div className="fields">
          <label>Schedule day<select value={targetDay} onChange={event => setTargetDay(Number(event.target.value))}>{Array.from({length:days},(_,i) => <option key={i} value={i}>Day {i+1} · {dateFor(start,i).toLocaleDateString('en',{month:'short',day:'numeric'})}</option>)}</select></label>
          {(!venue.menu || !quantity) && <label>{venue.menu ? 'Orders' : venue.kind === 'shop' ? 'Purchases' : 'Visitors'}<select value={tickets} onChange={event => setTickets(Number(event.target.value))}>{Array.from({length:12},(_,i) => <option key={i} value={i+1}>{i+1}</option>)}</select></label>}
        </div>
        <div className="detail-buttons">
          <button className="primary" onClick={() => onAdd({ venue, day: targetDay, cost, summary })}><Plus size={19}/> Add to Schedule <span>{cost ? money(cost,currency) : 'Free'}</span></button>
          <button className="pill" onClick={() => onMap(venue)}><MapPin size={16}/> Show on Map</button>
        </div>
      </div>
    </div>
  </dialog>;
}

function App() {
  const [tab,setTab] = useState('home');
  const [currency,setCurrency] = useStored('currency','AZN');
  const [budget,setBudget] = useStored('budget',42500);
  const [days,setDays] = useStored('days',3);
  const [party,setParty] = useStored('party','couple');
  const [interests,setInterests] = useStored('interests',[]);
  const [complete,setComplete] = useStored('interviewDone',false);
  const [start,setStart] = useStored('start',localDate());
  const [saved,setSaved] = useStored('saved',[]);
  const [entries,setEntries] = useStored('schedule',[]);
  const [day,setDay] = useState(0);
  const [filter,setFilter] = useState('all');
  const [homeFilter,setHomeFilter] = useState('all');
  const [mapFilter,setMapFilter] = useState('all');
  const [savedOnly,setSavedOnly] = useState(false);
  const homeSearch = useCatalogSearch(PAGE_SIZE);
  const exploreSearch = useCatalogSearch(PAGE_SIZE);
  const mapSearch = useCatalogSearch(MAP_PAGE_SIZE);
  const [focus,setFocus] = useState(null);
  const [detail,setDetail] = useState(null);
  const [toast,setToast] = useState('');
  const [destination,setDestination] = useState(false);
  const daily = Math.round(budget / days);
  const spent = total(entries);
  const ranked = useMemo(() => recommend(venues,daily,party),[daily,party]);
  const mapVenues = useMemo(() => filterCatalog(catalog,{ category:mapFilter,query:mapSearch.query,district:mapSearch.district }),[mapFilter,mapSearch.query,mapSearch.district]);
  const openVenue = useCallback(venue => {
    setDetail(venueById.get(venue.id) ?? venue);
  }, []);
  const openMapVenue = useCallback(venue => {
    setFocus({ ...venue });
    setDetail(venueById.get(venue.id) ?? venue);
  }, []);
  const go = next => { setTab(next); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const toggle = id => setSaved(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous,id]);
  const seeMap = venue => {
    setDetail(null);
    setMapFilter('all');
    mapSearch.reset();
    setFocus({ ...venue });
    go('map');
  };
  const changeDays = next => {
    if (next === days) return;
    setDays(next);
    setDay(previous => Math.min(previous,next-1));
    if (entries.some(entry => entry.day >= next)) {
      setEntries(previous => previous.map(entry => ({ ...entry, day: Math.min(entry.day,next-1) })));
      setToast('Stops from shortened days moved to Day ' + next + '.');
    }
  };
  const applyInterview = trip => {
    changeDays(trip.days);
    setBudget(trip.budget);
    setParty(trip.party);
    setInterests(trip.interests);
    setComplete(true);
  };
  const add = ({ venue,day: target,cost,summary }) => {
    const entry = { id: globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2), venueId: venue.id, day: target, cost, name: venue.name, summary, meal: Boolean(venue.menu) };
    setEntries(previous => [...previous,entry]);
    setDay(target);
    setDetail(null);
    setToast('Added to Day ' + (target+1) + ' of your schedule.');
  };
  const remove = id => setEntries(previous => previous.filter(entry => entry.id !== id));
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''),4200);
    return () => clearTimeout(timer);
  }, [toast,entries.length]);

  const nav = label => <nav className={label} aria-label={label === 'desktop-nav' ? 'Main navigation' : 'Mobile navigation'}>{tabs.map(([id,name,Icon]) => <button key={id} className={tab === id ? 'nav-active' : ''} aria-current={tab === id ? 'page' : undefined} onClick={() => { if (id === 'map') setFocus(null); go(id); }}><Icon size={19}/><span>{name}</span></button>)}</nav>;
  const scheduleProps = { days,start,day,setDay,entries,currency,daily,remove,go };
  const cardProps = { currency, toggle, onOpen: openVenue };
  const homeBrowsing = Boolean(homeSearch.query || homeSearch.district !== 'all' || homeFilter !== 'all');
  const tailored = homeBrowsing ? filterCatalog(catalog,{ ...homeSearch,category:homeFilter }) : ranked.slice(0,8);
  const renderCard = (venue,action = null) => <Card key={venue.id} venue={venue} saved={saved.includes(venue.id)} action={action} {...cardProps}/>;
  const explore = filterCatalog(catalog,{ ...exploreSearch,category:filter,savedIds:savedOnly ? new Set(saved) : null });
  const filterMap = next => { setMapFilter(next); mapSearch.resetLimit(); setFocus(null); };

  return <>
    <header className="header"><div className="header-inner">
      <button className="wordmark text-button" onClick={() => go('home')} aria-label="BakuTravel home"><span className="brand-icon"><Compass size={23}/></span><span>Baku<span>Travel</span></span></button>
      {nav('desktop-nav')}
      <div className="header-actions">
        <div className="destination"><button className="text-button" aria-expanded={destination} onClick={() => setDestination(!destination)}><MapPin size={17}/><span>Baku<span className="country">, Azerbaijan</span></span><ChevronDown size={14}/></button>
          {destination && <div className="destination-menu"><button className="text-button" onClick={() => setDestination(false)}><MapPin size={16}/> Baku, Azerbaijan</button></div>}</div>
        <label className="currency" title="1 USD = 1.70 AZN"><select aria-label="Currency, 1 USD equals 1.70 AZN" value={currency} onChange={event => setCurrency(event.target.value)}><option value="AZN">AZN ₼</option><option value="USD">USD $</option></select></label>
        <button className="icon-button trip-button" aria-label={'Schedule, ' + entries.length + ' planned stops'} onClick={() => go('schedule')}><CalendarDays size={20}/>{entries.length > 0 && <span>{entries.length}</span>}</button>
      </div>
    </div></header>

    <main className="shell" id="main">
      {tab === 'home' && <>
        <section className="hero">
          <Photo src={skyline} eager/>
          <div className="hero-text"><span><MapPin size={16}/> BAKU, AZERBAIJAN</span><h1>Explore Baku with BakuTravel</h1><p>Find places to visit and eat, then build a daily itinerary around your budget.</p><button className="primary" onClick={() => go('ai')}><Sparkles size={17}/> Plan with AI Search</button></div>
        </section>
        <div className="home-content">
          <div className="spread section-heading"><div><h2>{homeBrowsing ? 'Places in Baku' : 'Recommended for You'}</h2><p>{homeBrowsing ? 'Browse the matching places.' : 'Places and meals within your daily budget.'}</p></div><button className="text-button link" onClick={() => { setFilter(homeFilter); exploreSearch.setQuery(homeSearch.query); exploreSearch.setDistrict(homeSearch.district); setSavedOnly(false); go('explore'); }}>Explore all <ArrowUpRight size={16}/></button></div>
          <CatalogSearch {...homeSearch} districts={districts}/>
          <Filters value={homeFilter} setValue={next => { setHomeFilter(next); homeSearch.resetLimit(); }}/>
          {tailored.length ? <div className={homeBrowsing ? 'posters' : 'featured'}>{tailored.slice(0,homeSearch.limit).map(venue => renderCard(venue))}</div> : <p className="panel empty">No places match these filters.</p>}
          {homeBrowsing && <LoadMore shown={homeSearch.limit} total={tailored.length} onMore={homeSearch.more}/>}
          <div className="spread section-heading"><div><h2>Nearby &amp; Budget Picks</h2><p>Affordable stops around central Baku.</p></div></div>
          <div className="rows home-picks">{ranked.filter(venue => venue.cost * groupSizes[party] <= 25).slice(0,4).map(venue => <VenueRow key={venue.id} venue={venue} currency={currency} onOpen={openVenue}/>)}</div>
          <Schedule {...scheduleProps} compact/>
        </div>
      </>}
      <div hidden={tab !== 'ai'}>
        <TripInterview trip={{budget,days,party,interests}} {...{complete,currency,venues,entries,renderCard,catalog,districts}} onComplete={applyInterview} onAdd={add}/>
      </div>
      {tab === 'explore' && <>
        <div className="page-heading"><h1>Explore Baku</h1><p>Modern landmarks, Caspian views and local favorites.</p></div>
        <CatalogSearch {...exploreSearch} districts={districts}/>
        <div className="filter-bar"><Filters value={filter} setValue={next => { setFilter(next); exploreSearch.resetLimit(); }}/><button className={'pill ' + (savedOnly ? 'active' : '')} aria-pressed={savedOnly} onClick={() => { setSavedOnly(!savedOnly); exploreSearch.resetLimit(); }}><Heart size={17}/> Saved ({saved.length})</button></div>
        {explore.length ? <div className="posters">{explore.slice(0,exploreSearch.limit).map(venue => <Card key={venue.id} venue={venue} saved={saved.includes(venue.id)} onMap={seeMap} {...cardProps}/>)}</div> : <div className="panel empty">No places match these filters.</div>}
        <LoadMore shown={exploreSearch.limit} total={explore.length} onMore={exploreSearch.more}/>
      </>}
      {tab === 'map' && <>
        <div className="page-heading"><h1>Baku Map</h1><p>Choose a pin or a place from the list to see details.</p></div>
        <CatalogSearch {...mapSearch} districts={districts} setQuery={next => { mapSearch.setQuery(next); setFocus(null); }} setDistrict={next => { mapSearch.setDistrict(next); setFocus(null); }}/>
        <Filters value={mapFilter} setValue={filterMap}/>
        <div className="map-layout"><Suspense fallback={<div className="panel map-canvas">Loading map…</div>}><BakuMap venues={mapVenues} focus={focus} onOpen={openMapVenue}/></Suspense><aside className="panel map-list"><h2>{mapVenues.length} {mapVenues.length === 1 ? 'place' : 'places'}</h2><div className="rows">{mapVenues.slice(0,mapSearch.limit).map(venue => <VenueRow key={venue.id} venue={venue} currency={currency} onOpen={openMapVenue} selected={focus?.id === venue.id}/>)}</div><LoadMore shown={mapSearch.limit} total={mapVenues.length} onMore={mapSearch.more}/></aside></div>
      </>}
      {tab === 'schedule' && <>
        <div className="page-heading"><h1>Your Baku itinerary</h1><p>Review your stops and meal costs day by day.</p></div>
        <div className="schedule-layout"><Schedule {...scheduleProps}/><aside className="panel trip-budget"><div className="panel-heading"><span className="icon-tile"><Wallet size={20}/></span><div><h2>Trip budget</h2><p>{money(budget,currency)} total · {money(daily,currency)} per day</p></div></div><Tracker spent={spent} budget={budget} currency={currency}/><p className="note">1 USD = 1.70 AZN</p><label className="schedule-start">Trip start date<input type="date" value={start} onChange={event => { if (event.target.value) setStart(event.target.value); }}/></label><button className="text-button link" onClick={() => go('ai')}>Edit trip in AI Search</button></aside></div>
      </>}
      <footer>BakuTravel <span>·</span> Modern Baku Travel Guide <span>·</span> Prices and ratings are planning estimates. <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a></footer>
    </main>
    {nav('mobile-nav')}
    <GuideChat context={{ venues, entries, budget, days, day, party, currency }} onOpenVenue={openVenue}/>
    {detail && <Detail key={detail.id} venue={detail} {...{party,currency,days,day,start,toggle}} onClose={() => setDetail(null)} onAdd={add} onMap={seeMap} onOpen={openVenue} saved={saved.includes(detail.id)}/>}
    <div className={toast ? 'toast visible' : 'toast'} role="status">{toast}</div>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
