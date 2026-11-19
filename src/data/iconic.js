import { photo, skyline, waterfront } from './places.js';

const oldCity = 'https://whc.unesco.org/en/list/958/';
const fireSites = 'https://azerbaijan.travel/sites-of-ancient-fire-leave-a-burning-legacy';
const crescent = 'https://president.az/en/articles/view/66037';
const coastal = 'https://azerbaijan.travel/xezerin-sahilinde-yay-istiraheti';
const heritage = 'https://azerbaijan.travel/tourist-info-points';
const sports = 'https://azerbaijan.az/en/related-information/167';
const buildings = 'https://www.skyscrapercenter.com/city/baku';
const archive = 'https://azerbaijan.travel/';
const transport = {
  office:'View the exterior from public pavement. Office floors and lobbies require the tenant’s permission. Use a signed crossing on the arterial roads.',
  coast:'Look up current bus options from Koroğlu station or arrange a Bolt pickup and return. Check wind, water safety and beach access before traveling.',
  castle:'Go in daylight, wear shoes with good grip and allow for stairs and uneven stone. Confirm access with the site and arrange a return ride.',
  mall:'Weekday mornings are usually quieter. Check the operator’s store directory and any cinema or activity fees before leaving.',
  event:'Check the venue’s calendar, bag rules and designated gate. Book event tickets and allow extra time for security and exit crowds.',
  heritage:'Bring water and footwear for uneven surfaces. Check current ticket prices, opening hours and any photography restrictions before your visit.'
};

function story(overview,history,facts,experiences,tips,source,extra = {}) {
  return { isFamous:true, overview:[overview,history], facts, experiences, tips, source, ...extra };
}

export const featuredStories = {
  flame:story(
    'Three glass towers rise on the ridge above Baku Bay. HOK arranged the towers as separate hotel, residential and office buildings, with different curves that align into a flame when viewed from across the city.',
    'The flame motif draws on Azerbaijan’s historic relationship with natural fire, still visible at sites such as Yanar Dag. The towers also show how Baku’s modern skyline was built in layers: sandstone heritage below, glass towers above, and the Caspian horizon beyond.',
    {'Project era':'Early 2010s','Architect':'HOK','Tallest tower':'About 182 m','Style':'Curving glazed high-rise trio','Status':'Baku skyline landmark'},
    ['Frame all three towers above the bay from the Boulevard.','Walk up to Highland Park to compare the three silhouettes at street level.','Check the Fairmont’s dining options for a booked visit.'],
    ['Arrive before dusk to see the glass change color and watch façade lighting after dark when active.','Take the funicular from the waterfront when running, or use a taxi uphill. The ridge can be windy.','Viewpoints are free. Hotels and offices control interior access.'],
    'https://www.archdaily.com/538883/baku-flame-towers-hok',{directory:['Fairmont Baku','Hotel dining by reservation','Nearby Highland Park & funicular']}),
  heydar:story(
    'Designed by Zaha Hadid Architects, the Heydar Aliyev Center rolls from the plaza into its roof in a continuous sweep. The engineered shell conceals the structure required to make the exterior read as one flowing surface.',
    'Completed in 2012, the project created space for exhibitions, performance and civic events. Its landscape is part of the architecture: approaching from several directions changes where the plaza appears to end and the building begins.',
    {'Completed':'2012','Architect':'Zaha Hadid Architects','Building complex':'About 57,500 m²','Style':'Continuous free-form shell','Status':'Design Museum Design of the Year, 2014'},
    ['Walk the plaza before entering; the side elevations are worth seeing.','Check temporary exhibitions and gallery opening hours.','Use the lawn and broad ramps for wide architectural photos.'],
    ['Morning light and weekdays are good for uncluttered photographs.','Use Nariman Narimanov metro and walk, or take a short taxi ride.','Plaza access is generally free; exhibitions and events may require a ticket.'],
    'https://tyrensakt.com/projects/heydar-aliyev-centre/'),
  'old-city':story(
    'Icherisheher is Baku’s walled inner city. Stone lanes, caravanserais, mosques and houses sit inside the defensive circuit, with the Maiden Tower at the lower end and the Shirvanshahs’ Palace uphill.',
    'The settlement brings together Shirvani, Persian, Ottoman, Russian and other influences over centuries of trade and political change. It remains a lived-in neighborhood. The UNESCO inscription covers an urban ensemble, including street patterns and individual monuments.',
    {'UNESCO inscription':'2000','Inscribed area':'21.5 hectares','Architecture':'Medieval stone city with later residential layers','Status':'World Heritage Site'},
    ['Enter at the Double Gates and follow the walls to the palace.','See the Maiden Tower, then take a break at a courtyard tea house.','Browse locally made ceramics and textiles in the lanes.'],
    ['Start at Icherisheher metro. Allow time for cobbles, slopes and pedestrian restrictions.','Public streets are free. Book or pay separately for museums and monuments.','Visit in the morning for quieter streets and softer light.'],oldCity),
  maiden:story(
    'The Maiden Tower is a cylindrical stone monument with a prominent buttress, set near the historic shoreline. UNESCO identifies the standing tower with the medieval city and notes evidence of much earlier structures on the site.',
    'Several explanations have been proposed for its original purpose. The interior displays are a better starting point than any single legend. Its prominent position links the old waterfront to the city’s defenses and trading history.',
    {'Standing tower':'Commonly dated to the 12th century','Height':'About 29 m','Style':'Cylindrical medieval masonry','Status':'Part of the UNESCO Walled City'},
    ['Read the exhibits as you ascend the interior levels.','Compare the tower’s shape from the square and the old street above.','Continue to the palace through the walled city.'],
    ['The stairway is narrow and the roof can be windy.','Visit early. The rooftop may close in poor conditions.','Use Icherisheher metro and check admission at the entrance.'],oldCity),
  palace:story(
    'The Shirvanshahs placed their palace complex on the high ground of the Old City. It grew around courtyards, a mosque, family tombs and the Divankhana, a pavilion whose precise historical function remains debated.',
    'The complex reflects the court’s move to Baku and the craftsmanship of the Shirvan region. Look closely at the carved entrances, inscriptions and changes in scale between ceremonial and domestic spaces.',
    {'Main construction':'15th century','Patrons':'Shirvanshah rulers','Style':'Shirvan stone architecture','Status':'UNESCO World Heritage ensemble'},
    ['See the carved portal of the Divankhana.','Walk the palace courtyards and lower bathhouse remains.','Leave time for the archaeology and decorative objects inside.'],
    ['Start early and pair the site with Philharmonic Garden.','Icherisheher metro is nearby. The grounds include steps and uneven paving.','Buy the appropriate palace ticket and check which rooms are open.'],oldCity),
  carpet:story(
    'The national collection began as a museum of carpet and applied arts. Its current waterfront home is shaped like a carpet rolled around itself, drawing attention to the collection before visitors enter.',
    'The galleries make it possible to compare regional weaving traditions side by side. Patterns and materials change with geography, available dyes and the functions of the textiles, from domestic furnishing to ceremonial objects.',
    {'Current building opened':'2014','Designer':'Franz Janz','Style':'Sculptural rolled-carpet form','Status':'National museum'},
    ['Compare the regional weaving schools in the main galleries.','Look for weaving demonstrations and temporary exhibitions.','Pair the visit with Little Venice and the waterfront promenade.'],
    ['Check museum and ticket hours before traveling.','A short ride or waterfront walk from Icherisheher or Sahil metro avoids parking.','Visit the exterior at dusk; allow at least an hour for the galleries.'], 'https://azcarpetmuseum.az/'),
  ateshgah:story(
    'A walled courtyard surrounds the fire altar at Surakhani. The surviving complex developed principally in the 17th and 18th centuries and is closely associated with merchants and pilgrims from the Indian subcontinent.',
    'Natural gas once fed flames at the site. The living quarters and inscriptions show how trade and religious practice shared the same space. Today the reserve interprets the building and its place in the histories of Hindu, Sikh and Zoroastrian traditions.',
    {'Surviving complex':'17th–18th centuries','Style':'Walled courtyard, cells and central altar','Status':'State reserve; UNESCO Tentative List'},
    ['Walk the rooms around the courtyard to see exhibits on pilgrims and trade.','Read the inscriptions and look at the roofline of the altar.','Consider a combined ticket with Yanar Dag when offered.'],
    [transport.heritage,'Allow extra travel time out of central Baku; use a Surakhani-bound connection or book a ride.'],fireSites),
  yanar:story(
    'At Yanar Dag, natural gas seeps through the ground and feeds an exposed band of fire along a low slope. The scale is easier to appreciate up close than from a landscape photograph.',
    'The state reserve includes interpretive exhibits and visitor facilities, with the flames as its central feature. Pairing it with Ateshgah shows the difference between a geological phenomenon and a place of historical worship.',
    {'Reserve redevelopment':'Reopened in 2019','Feature':'Naturally fed gas flames','Setting':'Open hillside and visitor center','Status':'State historical, cultural and natural reserve'},
    ['Watch the flames from the designated viewing area.','See the small museum for geology and local history.','Combine with Ateshgah for an Absheron half-day.'],
    ['Dusk makes the fire more visible. Bring a layer for wind.','Use a bus connection from Koroğlu or arrange a round trip.','Check opening hours, admission and combined-ticket availability.'],fireSites),
  bibi:story(
    'Bibi-Heybat overlooks the Caspian on Baku’s southern approach. The current mosque reconstructs a historical shrine associated with a descendant of the Prophet’s family and has become a prominent landmark along the coastal road.',
    'The medieval mosque was destroyed in the Soviet period. The reconstructed complex revived the site’s religious role, using stone forms, minarets and interior ornament that refer back to the Shirvan architectural tradition.',
    {'Original shrine':'Medieval','Reconstruction':'Late 1990s and later expansion','Style':'Revival of Shirvan mosque architecture','Status':'Active mosque and pilgrimage site'},
    ['Look toward the coast from the approach.','Observe the reconstructed stonework from the exterior.','Visit the interior only when permitted, with respect for worshippers.'],
    ['Cover shoulders and legs and follow posted head-covering and photography rules.','Arrive outside prayer times. Use a southbound bus or Bolt rather than walking along the coastal arterial.'],archive),
  crescent:story(
    'Crescent Mall opened in May 2024 as the public shopping component of Crescent Bay. The shopping center spans six levels of retail, dining and leisure alongside Baku’s waterfront promenade.',
    'Crescent Bay combines the mall with offices, residences and a crescent-shaped hotel structure offshore. For visitors, the mall links the scale of the bay development to a practical indoor stop on a Boulevard walk.',
    {'Opened':'May 2024','Levels':'6','Style':'Contemporary waterfront retail podium','Status':'Public retail within the Crescent Bay development'},
    ['Browse Zara Home, Furla and other shops in the operator directory.','Take a dining break on an upper level or continue along the shore.','Walk the public waterfront for the clearest hotel profile.'],
    [transport.mall,'Sahil or 28 May metro can be paired with a waterfront walk. Use official pedestrian access on Neftchilar Avenue.'],crescent),
  port:story(
    'Port Baku Mall is the retail anchor of a waterfront cluster that includes offices and luxury residences. Its storefronts and dining points serve both the nearby business district and the Boulevard.',
    'The cluster marks Baku’s eastward extension from its historic port and illustrates the newer mix of designer shopping, office space and tower living along Neftchilar Avenue.',
    {'Opened':'2014','Type':'Multi-level luxury shopping center','Style':'Contemporary mixed-use waterfront retail','Status':'Public shopping and dining'},
    ['Browse Emporium and the designer storefronts.','Book lunch or coffee and compare the adjacent tower profiles.','Walk east or west on the Boulevard to see the wider development.'],
    [transport.mall,'A Bolt drop-off is useful with shopping bags. Treat surrounding residential and office lobbies as private.'],'https://portbakumall.az/'),
  deniz:story(
    'Deniz Mall projects from the Boulevard beside the harbor. The radiating roof gives the large enclosed shopping center a recognizable silhouette when seen from the waterfront.',
    'Its mix of leisure, dining and retail makes it useful as a sheltered break between the Carpet Museum and the southern waterfront. Views back to the hills show how the mall fits into the bay rather than standing apart from it.',
    {'Opened':'2020','Type':'Waterfront retail and entertainment center','Style':'Radial roof and glazed concourses','Status':'Public mall'},
    ['Find a waterfront-facing viewpoint outside.','Use the cinema, food court or family entertainment floors.','Combine it with Little Venice and the Carpet Museum.'],
    [transport.mall,'Wind can be strong on the exposed approach. Indoor access is free; entertainment is charged separately.'],'https://pashamalls.az/'),
  ganjlik:story(
    'Ganjlik Mall opened beside the metro station and Tofig Bahramov Stadium. Its enclosed levels concentrate international high-street fashion and everyday shopping around an accessible transit interchange.',
    'Compared with the premium waterfront malls, Ganjlik is especially useful for mixing budget apparel, a film and a quick meal. The location makes it a convenient indoor anchor for a north-central Baku day.',
    {'Opened':'2016','Type':'Multi-level regional shopping mall','Style':'Contemporary enclosed retail','Status':'Public mall at Ganjlik metro'},
    ['Browse Zara, Mango, New Yorker and other fashion stores.','Plan a cinema or food-court break.','Pair the mall with Dede Gorgud Park if the weather is good.'],
    [transport.mall,'Use Ganjlik metro. Check the stadium schedule for match-day crowding.'],'https://www.mallganjlik.az/en/'),
  mall28:story(
    '28 Mall stands beside one of the city’s most useful transport nodes. Its shopping levels sit within a short walk of 28 May metro and the railway station, making it a useful stop between trips.',
    'The mall mixes fast food, entertainment, international brands and services. It gives visitors a more everyday view of central Baku than the luxury shops on the waterfront.',
    {'Type':'Multi-level shopping and entertainment center','Style':'Contemporary transit-adjacent retail','Status':'Public mall near 28 May metro'},
    ['Browse the clothing and sportswear floors.','Use the cinema or food court, including KFC on the fourth floor.','Combine a visit with the pedestrian center or a rail departure.'],
    [transport.mall,'Leave extra time around commuter peaks. The station is nearby, but check the correct exit and mall entrance.'],'https://www.mall28.az/'),
  bulvar:story(
    'Park Bulvar is a compact shopping and entertainment stop on the Caspian promenade, close to Freedom Square. It breaks up a long walk with a cinema, food options and a sheltered indoor route.',
    'Its setting matters more than its height: the public promenade and shoreline remain the focus, with the mall offering a practical change of pace during wind or rain.',
    {'Type':'Waterfront mall','Style':'Glazed contemporary shopping complex','Status':'Public indoor stop on the Boulevard'},
    ['Stop for a meal or cinema break.','Walk outside to Freedom Square and the shoreline.','Connect west toward Sahil or east toward Crescent Bay.'],
    [transport.mall,'Use the Boulevard footpaths and signalized crossings. Shop visits are free; entertainment is billed separately.'],archive),
  boulevard:story(
    'Baku’s seaside park follows the sheltered curve of the Caspian bay. The historic promenade began in the oil-boom era and later extensions connected the central waterfront to newer leisure, cultural and shopping areas.',
    'It is the easiest place to see several generations of Baku at once. The waterfront path looks back toward the Old City and Flame Towers while linking boat rides, museums and public squares.',
    {'Established':'1909','Type':'Linear waterfront park','Status':'National Seaside Park'},
    ['Walk a short section between Sahil and the Carpet Museum.','Visit Little Venice or the Baku Eye when running.','Find an open stretch for a skyline photo at dusk.'],
    ['Bring a light jacket for wind. Finish close to Sahil or Icherisheher metro for an easy return.','Walking is free. Rides and museum entry are separate.'],archive),
  highland:story(
    'Highland Park sits on the ridge above the harbor and provides a broad view of the crescent-shaped bay. It shares the hilltop with Martyrs’ Lane and the Eternal Flame memorial.',
    'The visit has two distinct parts: a civic memorial landscape and a panorama over the modern city. Keep voices low near memorial areas and save relaxed group photos for the public terraces.',
    {'Type':'Hilltop park and memorial landscape','Views':'Caspian Bay, old city and modern waterfront','Status':'Public viewpoint and memorial'},
    ['Look down across the whole bay from the main terraces.','Walk respectfully along Martyrs’ Lane.','Use the funicular if operating or take a car to the upper entrance.'],
    ['Late afternoon and dusk give the best combination of visibility and skyline lighting.','The stairs and terraces can be windy; use a taxi if mobility is a concern.'],archive),
  'white-city':story(
    'White City Boulevard extends the public waterfront east of the historic center. The former Black City industrial landscape is changing into residential blocks, offices and new public space.',
    'The seafront shows the physical results of that redevelopment: broad paths, new parks and the skyline of Khatai. It is also a useful way to explore at walking pace between stops rather than following the arterial roads.',
    {'Type':'Public waterfront promenade','Style':'Contemporary linear public realm','Status':'Part of Baku White City redevelopment'},
    ['Walk the broad seafront path.','See how the new streets meet the bay.','Stop for coffee in a nearby White City branch.'],
    ['Sunset can be windy. Use Khatai metro plus a walk, or choose a direct Bolt drop-off.','Public paths are free; check any event closures.'],'https://bakuwhitecity.com/en/')
};

const trips = {
  sea:story(
    'Sea Breeze grew into a resort town on the northern Caspian coast around Nardaran. The operator describes more than seven kilometers of shoreline, with a mix of beach clubs, pools, restaurants, accommodation and events spread across a large site.',
    'The master plan also includes community facilities such as Landau School and architecture marketed under names such as the crescent-shaped Halfmoon development and the ship-shaped Caspian Dream Liner. These are different projects within the development. Future properties shown on the master plan may be under construction.',
    {'Setting':'Nardaran · northern Caspian coast','Shoreline':'7+ km, per resort operator','Building program':'Resort, residences, education, leisure','Status':'Operating resort with phased development'},
    ['Choose a specific beach club or pool before departure.','Compare the Halfmoon and Caspian Dream Liner projects on the master plan.','Check dates for performances and summer events; browse Lighthouse Mall and waterfront restaurants.'],
    [transport.coast,'Allow time to transfer between zones. Ask about day passes, children’s access and towel or lounger fees.'],'https://seabreeze.az/en/',
    {directory:['Lighthouse Mall','Landau School (private campus)','Beach clubs and pools','DREAM Arena','Restaurants and cafés'],links:[['Resort master plan','https://seabreeze.az/en/map'],['Halfmoon and Caspian Dream Liner','https://seabreeze.az/en/news/sea-breeze-resort-town-wins-two-titles-at-the-asia-pacific-property-awards-2025-2026']]}),
  amburan:story(
    'Amburan Beach Club is a seasonal waterfront destination at Bilgah on the northern Absheron shore. Its pools, sandy beach and dining make it a full-day alternative to a city-center outing.',
    'Bilgah is one of the peninsula’s traditional summer areas. The club and nearby Amburan Mall serve different purposes: choose the beachfront for swimming and the open-air retail complex for meals and shopping.',
    {'Setting':'Bilgah beach','Type':'Seasonal beach club and pool complex','Status':'Admission and services set by operator'},
    ['Swim in designated areas and check lifeguard conditions.','Book a pool or beach pass and compare shaded seating.','Combine with Amburan Mall for a meal.'],
    [transport.coast,'Check the dress code, age rules and current club opening before traveling.'],'https://amburan.com/restaurant/amburan-beach-club'),
  dalga:story(
    'Dalga Beach Aquapark combines a sandy Mardakan shoreline with pools and water slides. It is designed as a seasonal leisure complex, so access and activities vary with weather and resort schedules.',
    'Mardakan offers two sides of the peninsula on the same day: fortified medieval villages inland and modern summer recreation on the Caspian coast. Choose your water park hours first, then work an inland visit around them.',
    {'Type':'Aquapark and private beach','Setting':'Mardakan shoreline','Status':'Seasonal operating hours and admission'},
    ['Check slide heights and pool restrictions for children.','Choose shaded seating and a safe swimming area.','Add the Mardakan castles if you have ground transport.'],
    [transport.coast,'Book or verify admission before departure. Pack sunscreen, water shoes and a change of clothes.'],coastal),
  gobustan:story(
    'The Gobustan reserve protects thousands of rock engravings in a landscape of boulders, shelters and archaeological deposits southwest of Baku. UNESCO recognizes the record it preserves of human life from prehistory onward.',
    'Start in the museum before visiting the rock art. The displays make it easier to notice carved boats, animals and human figures on the guided paths, where the engraved forms can be faint in strong light.',
    {'UNESCO inscription':'2007','Inscribed area':'537 ha','Type':'Rock art and archaeological cultural landscape','Status':'World Heritage Site'},
    ['See the museum and the designated routes at Boyukdash.','Look for boat and animal motifs with a guide if available.','Pair with a separately planned mud volcano visit.'],
    ['Drive or book a tour with return transport. The reserve is a separate stop from the mud fields.','Choose morning for cooler conditions. Bring water and closed shoes; stay on marked routes.'],'https://whc.unesco.org/en/list/1076/'),
  mud:story(
    'Mud volcanoes form when pressurized gases and fluids carry fine sediment to the surface. The Absheron and Gobustan region has many such features, and this catalog pin refers to the public Mud Volcanoes Tourism Complex near Gobustan.',
    'The complex gives visitors a managed view of mud cones and the dry terrain around them. Conditions at other mud fields vary, so make sure a driver knows which entrance you are visiting and whether it is open.',
    {'Type':'Mud-volcano visitor complex','Setting':'Gobustan area, outside central Baku','Status':'Separate visit from the UNESCO rock-art reserve'},
    ['Follow signed paths and viewing platforms.','Compare different cone shapes and recent mud flows from designated areas.','Combine with the Gobustan museum and rock art if time allows.'],
    ['Do not walk onto active mud crust or approach bubbling vents.','Arrange a round trip and check road conditions after rain. Bring water, sun protection and washable shoes.'],archive),
  gala:story(
    'The Gala reserve uses the village landscape to show how houses, workshops and rural infrastructure developed on the Absheron Peninsula. Its open-air museum displays archaeological finds and reconstructed elements of everyday life.',
    'The complex also includes a separate exhibit of artworks made from discarded objects. Visiting both provides a contrast between older crafts and a contemporary interpretation of reuse.',
    {'Area':'More than 81 hectares','Type':'Open-air archaeological and ethnographic reserve','Status':'State historical and ethnographic reserve'},
    ['See historic dwellings and workshop exhibits.','Look for From Waste to Art and seasonal hands-on demonstrations.','Allow enough time to move between indoor and outdoor areas.'],
    [transport.heritage,'Arrange transport to Qala. Check current tickets, age discounts and workshop availability.'],'https://azerbaijan.travel/gala-state-historical-and-ethnographic-reserve'),
  zoo:story(
    'Baku Zoo traces its history to a small zoological park opened in 1928. The present Narimanov site reopened after major reconstruction in 2021 with updated enclosures, visitor paths and educational facilities.',
    'The redesign shifted attention toward animal care, native species and public education. Its position near Dede Gorgud Park allows families to split a longer outing between an admission attraction and a free outdoor break.',
    {'Origins':'1928','Reopened':'October 2021','Type':'Urban zoo and conservation education site','Status':'Public ticketed attraction'},
    ['Use the enclosure signs to look for species native to Azerbaijan.','Check the aqua-terrarium and outdoor routes.','Add a lakeside walk in nearby Dede Gorgud Park.'],
    ['Go earlier in the day to avoid heat and weekend crowds.','Use a taxi or bus connection from central Baku. Check feeding and ticket rules; do not feed animals.'],'https://bakuzoo.az/en/news/2'),
  botanical:story(
    'Baku’s Central Botanical Garden is both a garden for visitors and a site for the study of Azerbaijan’s plant life. The restored grounds on Badamdar Highway include greenhouses, ponds, bridges, playgrounds and shaded paths.',
    'The renewed greenhouses contrast with the older crescent-shaped administrative building and established tree avenues. The hillside setting makes the garden a quieter alternative to the exposed waterfront.',
    {'Setting':'40 Badamdar Highway','Type':'Botanical garden and research site','Status':'Public garden with controlled hours'},
    ['See the greenhouses and lake area.','Follow the shaded paths and photo viewpoints.','Use the play areas for a slower family visit.'],
    ['Visit in the morning in summer. Expect slopes and check greenhouse access.','Use the Badamdar bus corridor or Bolt. Consult the garden’s hours and admission before traveling.'],'https://azerbaijan.travel/central-botanical-garden'),
};

function office(year,scale,style,description,context,source = buildings,directory = []) {
  const facts = { Era:year, 'Height or scale':scale, Form:style, Status:'Working building; public exterior views' };
  return story(description,context,facts,['Photograph the building from public pavement and cross only at designated crossings.','Compare the silhouette with neighboring towers or plan a nearby public stop.'],
    [transport.office,'Shoot from farther away in daylight for a full-height photograph. For a closer view, use a nearby transit stop or ride-hail.'],source,{directory});
}

const towers = {
  'baku-tower':office('Completed in the early 2020s','276.3 m; floor totals differ by counting convention','Tapering glass office skyscraper',
    'Baku Tower at 109 Heydar Aliyev Avenue rises approximately 276 meters. The contractor describes it as the tallest skyscraper in the South Caucasus, supported by engineered bracing and a tuned mass damper.',
    'Its height changes how the Heydar Aliyev Avenue office corridor looks from a distance. Published counts differ: 52 levels are reported in local coverage, while tall-building listings may count fewer above-ground floors. Treat it as a skyline stop; the offices are controlled.',
    'https://www.smts.az/en/projects/baku-tower/'),
  socar:office('Mid-2010s','About 209 m per project consultant','Twisting flame-inspired profiles',
    'The state oil company’s headquarters uses rising curves and reflective glass to suggest a pair of flames. Heerim’s design uses that symbol for a single corporate tower, distinct from HOK’s trio above the Old City.',
    'The taller tower sits on Heydar Aliyev Avenue alongside other corporate buildings. View it from across the road or as part of a route comparing the offices and the Heydar Aliyev Center.',
    'https://aidea.co/socar'),
  azersu:office('2018','124 m · 22 floors','Water-drop profile',
    'The Azersu Office Tower uses a rounded glass profile commonly compared to a drop of water. The form connects the building to its original role as headquarters for the water utility.',
    'Its outline is most legible from a distance. Along the same avenue, compare the drop silhouette with SOCAR’s rising flame forms to see how the two organizations used their work as a design theme.',
    'https://www.skyscrapercenter.com/building/id/27126'),
  property:office('Modern office corridor','Approx. 126 m','Slender glass office tower',
    'Property Tower is associated with Azerbaijan’s property administration. Its slender glass form sits within the high-rise corridor along Heydar Aliyev Avenue.',
    'Use it as part of a streetscape comparison with Chinar Plaza and other nearby towers. Most of the interest for a visitor is in the proportions and the street-level view.'),
  chinar:office('2010s development','Approx. 131 m','Contemporary glass office building',
    'Chinar Plaza is a tall commercial building on the Heydar Aliyev Avenue corridor. Its vertical lines and closely spaced glazing distinguish it from the rounded utility and energy towers.',
    'The tower is one of the landmarks created as corporate offices moved eastward out of the historic center. A roadside photograph makes more sense than planning time inside.'),
  demirchi:office('2010s development','Approx. 107 m','High-rise office building',
    'Demirchi Tower is a business address in Khatai, set among housing, offices and major traffic corridors east of central Baku.',
    'It is best understood as part of the changing Khatai office skyline. Pair an exterior visit with a nearby café or the eastern waterfront, where there is more room to stop and walk.'),
  'white-office':office('Mid-2010s','Office building and public forecourt','Contemporary office architecture',
    'The White City Office Building helped establish a new business address on land redeveloped from the industrial Black City area. It sits within a larger project that adds public space, housing and commercial buildings.',
    'Its surroundings explain the change more clearly than the tower alone. Walk toward the Boulevard to compare the planted streets and new blocks with surviving traces of the industrial city.',
    'https://bakuwhitecity.com/en/xeberler/baku-white-city-office-building-celebrates-its-10th-anniversary'),
  'port-towers':office('Early 2010s','Two office towers','Sail-like glazed tower paired with rectilinear block',
    'Port Baku Towers combine a curved taller office tower with a more rectilinear companion near the old seaport. Their relationship is easiest to read from the Boulevard, where both volumes and the low podium are visible.',
    'The office pair anchors a larger concentration of homes, shopping and dining along Neftchilar Avenue. It is a convenient exterior stop on a waterfront walk.',
    'https://www.amcham.az/uploads/publication/6512bd43d9caa6e02c990b0a82652dca.pdf?v=1579162546',['Port Baku Mall','PAUL and other nearby dining','Port Baku Residence (private)']),
  'port-residence':office('2010s waterfront expansion','Multi-tower residential development','High-rise residential podium and towers',
    'Port Baku Residence forms the residential component of the Neftchilar Avenue waterfront cluster. The towers bring homes into a district with a major office complex, mall and seafront.',
    'The project shows a different use of the tower-and-podium model from the office pair next door. Public sightlines are available on adjacent streets and the promenade.',
    'https://portbakumall.az/',['Port Baku Mall','Public waterfront promenade']),
  'crescent-bay':office('Crescent Mall opened in 2024','Mixed-use development','Office and residential towers beside an offshore crescent',
    'Crescent Bay pairs high-rise offices and homes, a six-level mall and a crescent-shaped offshore hotel design. The overall composition is visible from the public waterfront around the mall.',
    'The project brings working, residential and retail uses together along a previously separate stretch of seafront. The public mall is the easiest place to start without an appointment.',
    crescent,['Crescent Mall','Crescent Place residences (private)','Crescent Hotel development']),
  'crescent-hotel':office('Phased waterfront development','Crescent-shaped hotel structure','Large crescent arch on the Caspian',
    'The offshore building is the curved centerpiece of Crescent Bay. Its silhouette is designed to read clearly when viewed from the seafront promenade and across the bay.',
    'Treat the building itself as an exterior architecture stop unless the operator confirms bookable access. The adjacent mall and walkways offer a straightforward visit while hotel operations are checked separately.',
    crescent,['Crescent Mall','Public Boulevard viewing areas']),
  ritz:office('Hotel opened in 2022','33-floor tower','Curving glazed hotel tower',
    'The former Trump Tower project became The Ritz-Carlton, Baku at 3 Babek Avenue. The completed building now operates as a luxury hotel with rooms, residences and hospitality spaces.',
    'Its hotel opening made a long-visible unfinished skyline fixture into an operating venue. Check official reservations for dining or hotel access; the public exterior is visible without a booking.',
    'https://www.theritzcarltonbaku.az/',['Hotel restaurants and lounges by reservation','Spa and guest facilities']),
  'tv-tower':office('Opened in the 1990s','About 310 m including the mast','Telecommunications tower',
    'Baku TV Tower stands on the hill southwest of central Baku. The structure is taller than the city’s occupied skyscrapers, but its main function is telecommunications.',
    'The thin mast is a useful way to orient yourself from Highland Park and the Boulevard. It reads as part of the ridge skyline, particularly beside the bulk of the Flame Towers.'),
};

function eventStory(year,scale,description,history,source) {
  return story(description,history,{'Opened':year,'Scale':scale,'Use':'Sports and public events','Status':'Event-controlled indoor access'},
    ['Check upcoming events with the operator.','See the exterior and surrounding public paths when open.','Use the identified entrance for your ticket section.'],
    [transport.event,'Use the transit or shuttle directions announced for your event. Exterior access is easier on non-event days.'],source);
}

const extraStories = {
  ...trips, ...towers,
  crystal:eventStory('2012','Up to about 25,000 depending on configuration',
    'Built on the waterfront by National Flag Square for Eurovision 2012, Baku Crystal Hall is a multi-purpose indoor arena with an angular envelope designed to read like a faceted object.',
    'It has since hosted concerts and sports. Its location at the end of the waterfront gives a long view of Baku Bay and makes the exterior a separate stop from the event itself.',
    'https://crystalhall.az/en/about/our-history'),
  olympic:eventStory('2015','About 68,000 seats',
    'Baku Olympic Stadium opened for the 2015 European Games. The elliptical stadium on the Boyukshor side of the city was built for athletics, football and large ceremonies.',
    'The arena has hosted major international football fixtures as well as domestic events. Its translucent outer ring is easiest to appreciate around dusk when event lighting is active.',sports),
  gymnastics:eventStory('April 2014','Main arena plus training halls',
    'Milli Gimnastika Arenası was designed as a dedicated gymnastics competition and training venue. Broadway Malyan’s design provides flexible arena space with separate support facilities and an additional training dome.',
    'The complex lets Baku host international disciplines from rhythmic and artistic gymnastics to trampoline. Most behind-the-scenes spaces serve athletes; spectators should plan around scheduled events.',
    'https://agf.az/en/about/national-gymnastics-arena/'),
  'amburan-mall':story(
    'Amburan Mall gives Bilgah an open-air shopping and dining hub. Its outdoor circulation distinguishes it from the enclosed multi-level malls in central Baku.',
    'The center is useful as a service stop during a north-coast excursion. It pairs naturally with Amburan Beach Club, but the two properties have separate schedules and admission arrangements.',
    {'Type':'Open-air mall','Setting':'Bilgah','Status':'Public retail and dining'},
    ['Browse the shops and restaurants.','Check family entertainment hours.','Plan shopping around a reserved beach-club visit.'],
    [transport.mall,transport.coast],'https://pashamalls.az/'),
  'mardakan-square':story(
    'Mardakan’s quadrangular castle is one of the fortified towers of Absheron. Its square masonry keep and enclosing walls give a sense of how small fortified sites watched over settlements on the peninsula.',
    'Traditionally associated with the Shirvanshah period, the tower is part of a defensive landscape that includes the village’s separate round fortress and the nearby Tuba Shahi Mosque.',
    {'Period':'Medieval Shirvanshah era','Form':'Square defensive keep','Status':'Historic monument'},
    ['Examine the square keep and wall openings from the courtyard.','Compare it with the separate Round Fortress.','Look for the nearby historic mosque from public paths.'],[transport.castle],archive),
  'mardakan-round':story(
    'Mardakan’s Round Fortress has a cylindrical stone keep within a small courtyard. Its compact plan makes a useful comparison with the larger square tower nearby.',
    'The round tower is commonly dated to the 13th century and belongs to the network of medieval defensive structures across Absheron. Thick stone walls and narrow openings show the practical demands of that role.',
    {'Period':'Early 13th century','Form':'Round medieval keep','Status':'Historic monument'},
    ['Compare the openings and masonry with the Square Fortress.','Visit both towers in daylight if access allows.','Walk the surrounding streets to see their village setting.'],[transport.castle],archive),
  dendro:story(
    'The Mardakan Arboretum grew from landscaped grounds associated with oil industrialist Murtuza Mukhtarov. The planted paths offer shade and a look at species adapted to the dry peninsula.',
    'The former estate is now associated with dendrological research and public visits. It works as a quieter counterpoint to the coast and the medieval towers on a Mardakan trip.',
    {'Origins':'Early 20th-century estate garden','Type':'Arboretum and former estate','Status':'Research and visitor grounds; access varies'},
    ['Follow the planted walks and check which grounds are open.','Look for seasonal flowers and the historic estate architecture.','Combine with a castle visit nearby.'],[transport.castle],archive),
  zira:story(
    'Zira Eco Park is associated with the cultural and environmental center in the eastern Absheron settlement of Zirə. Its garden setting draws attention to planting and environmental education in a dry peninsula landscape.',
    'Zirə makes sense as a stop during a wider east-Absheron outing. It offers a different experience from the monumental city center: a local settlement, open-air facilities and gardens whose accessibility can vary.',
    {'Type':'Environmental and cultural park','Setting':'Zirə settlement','Status':'Visitor access and programs vary'},
    ['Check current access to gardens and educational areas.','Walk the accessible outdoor paths.','Pair with Gala if the itinerary allows.'],
    ['Confirm opening with the center in advance. Arrange local bus or return ride rather than relying on a metropolitan walk.'],archive),
  nardaran:story(
    'Nardaran Fortress is a medieval stone keep above the village streets. Its block-like outline is characteristic of the fortified towers built across the Absheron Peninsula.',
    'The surviving masonry and village setting give a sense of the tower’s watch and defense function. Seeing it before or after the nearby resort highlights the difference between inland settlement history and recent coastal development.',
    {'Period':'14th century','Form':'Square medieval defensive tower','Status':'Historic monument'},
    ['Circle the exterior from public paths.','Look for defensive openings and surviving wall details.','Combine with Bilgah or the Nardaran coast by car.'],[transport.castle],archive),
  ramana:story(
    'Ramana Castle stands above its settlement on a rocky rise. The tower and surviving enclosure make use of the site’s height for views across the surrounding oilfield landscape.',
    'The fortress belongs to the network of medieval defensive sites on Absheron. Its position is as important as its masonry: seeing the approach makes the choice of terrain easy to understand.',
    {'Period':'Medieval','Form':'Stone tower and enclosure','Status':'Historic monument'},
    ['Photograph the keep from below and from permitted viewpoints.','Compare its raised position with the flatter settings of Mardakan’s castles.','Combine with Ateshgah on a peninsula outing.'],[transport.castle],archive),
  hyatt:story(
    'Hyatt Regency Baku is a major hotel in Yasamal near the Izmir Street corridor. The landscaped grounds and hospitality facilities make it a useful meeting point outside the waterfront tourist strip.',
    'The position works well for exploring Yasamal’s gardens and residential streets. Treat the hotel as a booked dining or accommodation stop, with the surrounding neighborhood providing the public walking route.',
    {'Type':'Full-service hotel','Location':'Izmir Street, Yasamal','Status':'Guest and reservation access'},
    ['Check hotel dining and facilities by reservation.','Walk to nearby Izmir Park.','Use it as a meeting point for a Yasamal outing.'],
    ['Check guest policies and booking rates. Use a direct ride or local bus for the approach.'],'https://www.hyatt.com/hyatt-regency/en-US/bakph-hyatt-regency-baku'),
  badamdar:story(
    'Badamdar’s elevated streets and public edges offer glimpses down toward Baku Bay and the surrounding hillside. This pin marks a general viewpoint area rather than a staffed observation deck.',
    'The elevation offers a different view from Highland Park across the urban slopes and the route toward the Central Botanical Garden. Visit in daylight and favor signed pedestrian paths.',
    {'Type':'Hillside viewpoint area','District':'Sabail · Badamdar','Status':'Public street views where pedestrian access permits'},
    ['Look for views on safe public paths.','Pair with the Central Botanical Garden.','Use Highland Park for a more formal overlook.'],
    ['No ticket is expected for street views. Avoid stopping on the highway and confirm a safe drop-off point.'],archive)
};

export const iconicLocations = [
  ['sea','Sea Breeze Resort','resort','Sabunchu','Nardaran · 31 Dalan',[40.6044,49.9747],55,true],
  ['amburan','Amburan Beach Club','resort','Sabunchu','Bilgah coastline',[40.5954,50.0425],45,true],
  ['amburan-mall','Amburan Mall','mall','Sabunchu','Bilgah, Amburan retail complex',[40.5876,50.0379],0,true],
  ['dalga','Dalga Beach Aquapark Resort','resort','Khazar','Mardakan seafront',[40.5173,50.1854],45,true],
  ['crescent-bay','Crescent Bay Development','tower','Nasimi','Neftchilar Avenue waterfront',[40.3721,49.8575],0,true],
  ['crescent-hotel','Crescent Hotel (La Luna)','tower','Nasimi','Crescent Bay offshore site',[40.3705,49.8583],0,false],
  ['port-towers','Port Baku Towers','tower','Nasimi','153 Neftchilar Avenue',[40.3753,49.8639],0,false],
  ['port-residence','Port Baku Residence','tower','Nasimi','151 Neftchilar Avenue waterfront',[40.3746,49.8621],0,false],
  ['baku-tower','Baku Tower','tower','Narimanov','109 Heydar Aliyev Avenue',[40.4153,49.8951],0,false],
  ['socar','SOCAR Tower','tower','Narimanov','121 Heydar Aliyev Avenue',[40.4198,49.9045],0,false],
  ['azersu','Azersu Office Tower','tower','Narimanov','Heydar Aliyev Avenue',[40.4144,49.8938],0,false],
  ['property','Property Tower','tower','Narimanov','Heydar Aliyev Avenue',[40.4100,49.8848],0,false],
  ['chinar','Chinar Plaza','tower','Narimanov','152 Heydar Aliyev Avenue',[40.4169,49.8961],0,false],
  ['demirchi','Demirchi Tower','tower','Khatai','37 Khojaly Avenue',[40.3824,49.8740],0,false],
  ['white-office','Baku White City Office Building','tower','Khatai','White City, Nobel Avenue corridor',[40.3816,49.8870],0,false],
  ['ritz','The Ritz-Carlton Baku (former Trump Tower)','resort','Nasimi','3 Babek Avenue',[40.4092,49.8669],0,false],
  ['tv-tower','Baku TV Tower','tower','Sabail','Bayil hillside',[40.3517,49.8238],0,false],
  ['crystal','Baku Crystal Hall','landmark','Sabail','National Flag Square',[40.3443,49.8510],0,true],
  ['olympic','Baku Olympic Stadium','landmark','Sabunchu','Boyukshor, near Koroğlu interchange',[40.4299,49.9196],0,true],
  ['gymnastics','National Gymnastics Arena','landmark','Nizami','Heydar Aliyev Avenue, Koroğlu interchange',[40.4225,49.9199],0,true],
  ['mardakan-square','Mardakan Quadrangular Fortress','landmark','Khazar','Mardakan historic center',[40.4921,50.1422],4,true],
  ['mardakan-round','Mardakan Round Fortress','landmark','Khazar','Mardakan historic center',[40.4952,50.1446],4,true],
  ['dendro','Mardakan Arboretum (Dendropark)','park','Khazar','Murtuza Mukhtarov estate, Mardakan',[40.4921,50.1340],5,true],
  ['gobustan','Gobustan Rock Art Cultural Landscape','landmark','Garadagh','Boyukdash, Gobustan State Reserve',[40.1159,49.3787],10,true],
  ['mud','Mud Volcanoes Tourism Complex','landmark','Garadagh','Gobustan / Absheron visitor complex',[40.0872,49.4006],15,true],
  ['gala','Gala Archaeological and Ethnographic Museum Complex','landmark','Khazar','Gala village',[40.4448,50.1654],15,true],
  ['zira','Zira Eco Park','park','Khazar','Zirə settlement',[40.3643,50.2983],0,true],
  ['zoo','Baku Zoo','park','Narimanov','A. Bakikhanov Street, beside Dede Gorgud Park',[40.3910,49.8481],10,true],
  ['botanical','Baku Central Botanical Garden','park','Sabail','40 Badamdar Highway',[40.3595,49.8121],5,true],
  ['hyatt','Hyatt Regency Baku','resort','Yasamal','1033 Izmir Street',[40.3899,49.8200],0,false],
  ['badamdar','Badamdar hillside viewpoints','park','Sabail','Upper Badamdar hillside',[40.3447,49.8082],0,true],
  ['nardaran','Nardaran Fortress','landmark','Sabunchu','Historic center of Nardaran',[40.5562,50.0051],0,true],
  ['ramana','Ramana Castle','landmark','Sabunchu','Ramana village',[40.4524,49.9825],0,true]
].map(([id,name,kind,district,address,coords,cost,family]) => {
  const content = extraStories[id];
  const photoByType = {resort:waterfront,tower:skyline,park:photo('1519331379826-f10be5486c6b'),landmark:photo('1622314621630-0d24bcb5aa67'),mall:photo('1519567241046-7f570eee3ce6')};
  return {
    ...content,id,name,kind,district,address,coords,cost,family,rating:null,
    area:district + ' · ' + {resort:'Resort & hospitality',tower:'Architecture',park:'Outdoors',landmark:'Landmark',mall:'Shopping'}[kind],
    description:content.overview[0],image:photoByType[kind],gallery:[kind === 'tower' ? waterfront : skyline],
    features:[...(family ? ['Family friendly'] : []),kind === 'tower' ? 'Exterior viewpoint' : kind === 'landmark' ? 'Sightseeing' : 'Visitor destination'],
    vibes:['Baku',kind],hours:kind === 'tower' ? 'Exterior only; tenant access by appointment' : 'Check official hours and access',
    illustrative:true,approximatePin:true
  };
});
