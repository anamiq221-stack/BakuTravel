# BakuTravel — Modern Baku Travel Guide

A responsive, browser-based travel planner for Baku and the Absheron Peninsula. The catalog contains 255 distinct places across 13 districts and nearby administrative areas. React and Vite run the app, modular CSS provides the visual system, and Leaflet renders the map.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. Run `npm install` in this directory.
3. Run `npm run dev` and open the URL printed by Vite, usually http://localhost:5173.
4. Run `npm run build` to create a production bundle, or `npm run preview` to preview it.

The interview, catalog, menus, schedule and guide replies run locally in the browser. Photos, web fonts and OpenStreetMap tiles use the internet. Gradient placeholders and the map’s place list cover failed image or tile loads.

## Architecture for the presentation

| File | Role |
| --- | --- |
| `src/main.jsx` | Navigation, shared trip state, venue cards, detail dialog and schedule. Cards use an accessible full-surface button with independent map, save and schedule actions. |
| `src/TripInterview.jsx` | Four questions covering budget, duration, group and optional interests. The finished interview updates the shared trip settings and displays suggested stops with assigned days. |
| `src/GuideChat.jsx` | Floating guide drawer, starter prompts, conversation history and links into the same detail dialog. |
| `src/utils/guideLogic.js` | Budget input parsing, recommendation placement, and local query matching for venue names, menus, distance from landmarks, transport, conversions and schedule spending. |
| `src/utils/segmentLogic.js` | Money conversion and traveler segmentation. Group estimates assume one solo traveler, two as a couple, four for a family and three for friends. |
| `src/data/places.js`, `src/data/directory.js` | Attractions, parks, malls and fashion retailers, with addresses and shopping information. |
| `src/data/restaurants.js`, `src/data/foodDirectory.js` | Restaurants and cafés with interactive sample menus in AZN and USD. |
| `src/BakuMap.jsx` | Lazy-loaded Leaflet map. Groups nearby places into numbered clusters, zooms into a cluster on selection, and lists venues that share a coordinate. |
| `src/CatalogControls.jsx`, `src/utils/catalog.js` | Shared indexed name, alternative spelling, district and category search, with incremental card and map-list pages. |
| `src/PlaceStory.jsx`, `src/data/iconic.js` | Sections for history, architectural facts, activities and practical tips. Mall and tower directories open linked venues using the same detail dialog. |
| `src/data/allPlaces.js` | Combines curated venues with modular records from landmarks, parks, food, and shops and lifestyle. Applies the coordinate corrections and photo metadata. |
| `src/style.css` | Shared card styling, responsive navigation and desktop/mobile modal layouts. |

The planner stores integer AZN qəpik so switching currencies changes the display without rounding away the original costs. Suggestions account for trip and daily limits, subtract scheduled costs, require family-friendly venues for family trips, and prefer the selected categories. The Schedule tab groups entries by relative day and sums costs. Trip settings, favorites and scheduled stops persist in `localStorage`. Previous settings are carried forward automatically when you first open the renamed app at the same URL. If a trip is shortened, stops from removed days move to the last remaining day.

The guide uses deterministic rules and the bundled data. The four starter prompts demonstrate location-based food search, family picks, transit and a shopping route. The same drawer answers follow-up questions such as “show their menu” or “what is left in my budget?”. It requires no account, key or external AI service.

## Demo in five steps

1. In AI Search, enter `250 USD`, choose three days and Family with Kids, and pick Parks & Views.
2. Add a recommended place to the schedule. Open Schedule to see its date and effect on the trip budget.
3. Search Crescent Mall in Explore, open its history and architecture sections, then open a restaurant from its store directory.
4. Switch to Map, zoom into a cluster, then filter Khazar and search for a Mardakan fortress. Add a stop to Day 2 and switch between AZN and USD.
5. Ask the guide what is left in your budget, how to use the metro or where to eat near Fountain Square.

Some venues use an example planning menu or an estimated price. Missing ratings are left blank, and missing hours are marked for confirmation. Map pins can indicate the center of a building or complex. Approximate area pins, private exterior-only stops and illustrative photos are labeled in venue details. Check operators for current admission, store directories, facilities and hours.

## Catalog sources and attribution

The mapped venue selection and most district assignments are derived from the [Geofabrik Azerbaijan OpenStreetMap extract](https://download.geofabrik.de/asia/azerbaijan.html). © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). The OpenStreetMap-derived catalog records in the data modules are available under the [Open Database License](https://opendatacommons.org/licenses/odbl/1-0/). Detail pages link to the individual map record when available.

The app uses stored coordinates and catalog data for search, clusters, recommendations and chat. It downloads map tiles and images as needed. No external services are required to query the directory.

- [UNESCO Walled City of Baku](https://whc.unesco.org/en/list/958/) and [Gobustan Rock Art Cultural Landscape](https://whc.unesco.org/en/list/1076/).
- [Sea Breeze resort and master plan](https://seabreeze.az/en/map), [Crescent Bay development and mall opening](https://president.az/en/articles/view/66037), and [Baku White City](https://bakuwhitecity.com/en/).
- [Baku Tower contractor](https://www.smts.az/en/projects/baku-tower/), [SOCAR Tower project](https://aidea.co/socar), and [Azersu Office Tower specifications](https://www.skyscrapercenter.com/building/id/27126).
- [Baku Crystal Hall history](https://crystalhall.az/en/about/our-history), [National Gymnastics Arena](https://agf.az/en/about/national-gymnastics-arena/), and [Baku Zoo reopening](https://bakuzoo.az/en/news/2).
- [Gala State Reserve](https://azerbaijan.travel/gala-state-historical-and-ethnographic-reserve), [Central Botanical Garden](https://azerbaijan.travel/central-botanical-garden), and [Mud Volcanoes Tourism Complex](https://mud-volcanoes.heritage.org.az/en/).

Additional Wikimedia Commons photo credits are displayed in the relevant venue details.

## Reference links

- [Azerbaijan Tourism Board visitor information](https://azerbaijan.travel/tourist-info-points) and [Ateshgah and Yanar Dag](https://azerbaijan.travel/sites-of-ancient-fire-leave-a-burning-legacy).
- [Ganjlik Mall directory](https://www.mallganjlik.az/en/), [28 Mall directory](https://mall28.az/stores/) and [Crescent Mall directory](https://crescentmall.az/en/shop).
- [KFC delivery listings](https://wolt.com/en/aze/baku/brand/kfc), [28 Mall KFC](https://www.mall28.az/brands/kfc), [United Coffee Beans locations](https://www.ucb.az/en/locations) and [Cafecity locations](https://cafecity.az/page/contacts).
- [Baku Metro payment guide](https://metro.gov.az/en/guide-subway/1).

## Photo credits

- [Nizami Street](https://commons.wikimedia.org/wiki/File:The_fully_pedestrianized_Nizami_Street_in_Baku_(36234400014).jpg) by shankar s., [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- [Deniz Mall](https://commons.wikimedia.org/wiki/File:Deniz_Mall.jpg) by Nemoralis and [Little Venice](https://commons.wikimedia.org/wiki/File:Baku_Boulevard,_Little_Venice.jpg) by Nigar2nigarnigar, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Maiden Tower](https://commons.wikimedia.org/wiki/File:Old_City,_Baku-_Part_II_-_OldCityBaku8347.jpg) by lumoplank, [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- [Ateshgah](https://commons.wikimedia.org/wiki/File:Ateshgah_Fire_Temple.jpg) by Nick Taylor and [Yanar Dag](https://commons.wikimedia.org/wiki/File:Yanar_Dag_-_Flaming_Hillside.jpg) by indigoprime, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- Other photos use Unsplash or Azerbaijan Travel. Images are resized and cropped to fit the layout.
