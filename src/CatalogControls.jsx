import React from 'react';
import { Search } from 'lucide-react';
import { areas } from './utils/catalog';

export function CatalogSearch({ query, setQuery, district, setDistrict, districts }) {
  return <div className="catalog-search">
    <label><span>Search places</span><div><Search size={17}/><input type="search" placeholder="Name, neighborhood or brand" value={query} onChange={event => setQuery(event.target.value)}/></div></label>
    <label><span>District / area</span><select value={district} onChange={event => setDistrict(event.target.value)}>
      <option value="all">All districts</option>
      <optgroup label="Districts">{districts.map(name => <option key={name}>{name}</option>)}</optgroup>
      <optgroup label="Popular areas">{areas.map(name => <option key={name} value={'area:' + name}>{name}</option>)}</optgroup>
    </select></label>
  </div>;
}

export function LoadMore({ shown, total, onMore }) {
  return <div className="catalog-page" aria-live="polite">
    <span>Showing {Math.min(shown,total)} of {total} places</span>
    {shown < total && <button className="pill" onClick={onMore}>Load more</button>}
  </div>;
}
