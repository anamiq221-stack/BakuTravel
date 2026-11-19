import React from 'react';

export default function PlaceStory({ venue, onOpen }) {
  return <>
    {venue.isFamous ? <>
      <section className="place-story"><h3>Overview, history &amp; architecture</h3>{venue.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>
      <section className="place-story"><h3>Key facts &amp; architectural specs</h3>
        <dl className="venue-facts">{Object.entries({ District:venue.district,...venue.facts }).map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
      <section className="place-story"><h3>What to do &amp; experience</h3><ul>{venue.experiences.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="place-story"><h3>Visitor tips</h3><ul>{venue.tips.map(item => <li key={item}>{item}</li>)}</ul></section>
    </> : <p>{venue.description}</p>}
    {(venue.tenants?.length || venue.directory?.length || venue.brands?.length) ? <section className="place-story shopping-detail">
      <h3>{venue.kind === 'shop' ? 'Brands & makers' : 'Store & visitor directory'}</h3>
      <div className="chips">
        {venue.tenants?.map(place => <button className="pill" key={place.id} onClick={() => onOpen(place)}>{place.name}</button>)}
        {Array.from(new Set([...(venue.directory ?? []),...(venue.brands ?? [])])).filter(name => !venue.tenants?.some(place => place.name === name)).map(name => <span key={name}>{name}</span>)}
      </div>
      {venue.tier && <p><b>Price tier</b> · {venue.tier}</p>}
      {venue.amenities?.length > 0 && <p><b>Amenities</b> · {venue.amenities.join(', ')}</p>}
    </section> : null}
    {(venue.source || venue.links?.length || venue.mapRef) && <p className="place-sources">
      {[...(venue.source ? [['Venue or reference information',venue.source]] : []),...(venue.links ?? []),...(venue.mapRef ? [['OpenStreetMap map record','https://www.openstreetmap.org/' + venue.mapRef]] : [])].map(([label,url]) => <a key={url} href={url} target="_blank" rel="noreferrer">{label}</a>)}
    </p>}
    {venue.photoCredits?.length > 0 && <p className="place-sources">Photo credits {venue.photoCredits.map(photo => <React.Fragment key={photo.file}><a href={photo.file} target="_blank" rel="noreferrer">{photo.artist}</a><a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></React.Fragment>)}</p>}
  </>;
}
