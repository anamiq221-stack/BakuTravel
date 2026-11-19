import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function groupVisible(map,venues) {
  const zoom = map.getZoom();
  const bounds = map.getBounds().pad(0.2);
  const groups = new Map();
  for (const venue of venues) {
    if (!bounds.contains(venue.coords)) continue;
    const point = map.project(venue.coords,zoom);
    const key = zoom >= 17 ? venue.coords.map(value => value.toFixed(5)).join(',') : [Math.floor(point.x/56),Math.floor(point.y/56)].join(',');
    const group = groups.get(key) ?? [];
    group.push(venue);
    groups.set(key,group);
  }
  return groups.values();
}

function drawMarkers(map,layer,venues,onOpen) {
  layer.clearLayers();
  for (const group of groupVisible(map,venues)) {
    const [venue] = group;
    const shared = group.length > 1;
    const coordinates = L.latLngBounds(group.map(place => place.coords));
    const title = shared ? group.length + ' places near ' + venue.name : venue.name;
    const icon = L.divIcon({
      className: 'map-pin' + (shared ? ' map-cluster' : ''),
      html: shared ? String(group.length) : ['cafe','restaurant'].includes(venue.kind) ? '●' : '◆',
      iconSize: [32,32], iconAnchor: [16,16]
    });
    const marker = L.marker(shared ? coordinates.getCenter() : venue.coords,{ icon,title,alt:title }).addTo(layer).bindTooltip(title);
    if (!shared) {
      marker.on('click',() => onOpen(venue));
    } else if (!coordinates.getNorthEast().equals(coordinates.getSouthWest()) && map.getZoom() < 17) {
      marker.on('click',() => map.fitBounds(coordinates,{ maxZoom:17,padding:[44,44],animate:false }));
    } else {
      const list = L.DomUtil.create('div','map-directory-popup');
      for (const location of group) {
        const button = L.DomUtil.create('button','text-button',list);
        button.type = 'button';
        button.textContent = location.name;
        button.addEventListener('click',() => { marker.closePopup(); onOpen(location); });
      }
      marker.bindPopup(list);
    }
  }
}

export default function BakuMap({ venues, focus, onOpen }) {
  const host = useRef(null);
  const map = useRef(null);
  const markers = useRef(null);
  const [tilesUnavailable, setTilesUnavailable] = useState(false);

  useEffect(() => {
    const instance = L.map(host.current,{ scrollWheelZoom:false,zoomAnimation:false }).setView([40.4093,49.8671],12);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(instance);
    tiles.on('tileerror',() => setTilesUnavailable(true));
    tiles.on('tileload',() => setTilesUnavailable(false));
    map.current = instance;
    markers.current = L.layerGroup().addTo(instance);
    const resize = new ResizeObserver(() => instance.invalidateSize());
    resize.observe(host.current);
    return () => { resize.disconnect(); instance.remove(); };
  }, []);

  useEffect(() => {
    const instance = map.current;
    const update = () => drawMarkers(instance,markers.current,venues,onOpen);
    instance.on('moveend',update);
    update();
    return () => instance.off('moveend',update);
  }, [venues,onOpen]);

  useEffect(() => {
    if (focus) map.current.setView(focus.coords,17,{ animate:false });
    else if (venues.length) map.current.fitBounds(venues.map(venue => venue.coords),{ padding:[32,32],maxZoom:15,animate:false });
  }, [focus,venues]);

  return <div className="map-frame">
    <div className="map-canvas" ref={host} aria-label="Interactive map of Baku" />
    {tilesUnavailable && <p className="map-error">Some map tiles are unavailable. You can still use the pins and place list.</p>}
  </div>;
}
