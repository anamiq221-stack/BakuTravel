// Admission and purchase prices are planning estimates in AZN.
export const existingDetails = {
  flame: ['1A Mehdi Huseyn Street, Sabail','Public viewpoints at any time','landmark'],
  heydar: ['1 Heydar Aliyev Avenue, Narimanov','Exhibition hours vary by day','landmark'],
  boulevard: ['Neftchilar Avenue waterfront, Sabail','Open daily, 24 hours','park'],
  'old-city': ['Walled Old City, Sabail','Public streets open 24 hours','landmark'],
  highland: ['Martyrs’ Lane, Mehdi Huseyn Street, Sabail','Public terraces open daily','park'],
  nizami: ['Pedestrian section between Fountain Square and Bulbul Avenue, Sabail','Public street open 24 hours','park'],
  deniz: ['26A Neftchilar Avenue, Sabail','Approx. 10:00–22:00','mall'],
  carpet: ['28 Mikayil Huseynov Avenue, Sabail','Generally Tue–Sun, daytime','landmark'],
  venice: ['Mikayil Huseynov Avenue, next to the Carpet Museum, Sabail','Boat hours vary by weather and season','landmark'],
  funicular: ['Lower station, Mikayil Huseynov Avenue, Sabail','Approx. 10:00–22:00, service varies','park']
};

export const sights = [
  ['maiden','Maiden Tower','Old City','1 Qasr Street, Sabail',[40.36636,49.83729],15,'Generally 10:00–18:00','landmark','The round stone tower is part of the UNESCO-listed walled city. Climb the narrow interior stairs for a view over Baku Bay.',false,['UNESCO heritage','Stairs']],
  ['palace','Palace of the Shirvanshahs','Old City','76 Gala Street, Sabail',[40.36608,49.83384],15,'Generally 10:00–18:00','landmark','The Shirvanshah rulers built this complex around a palace, mausoleum and mosque. Allow time for the carved stonework and courtyards.',true,['UNESCO heritage','Metro nearby']],
  ['bibi','Bibi-Heybat Mosque','Bibi-Heybat','Bibi-Heybat Road, Sabail',[40.3085,49.8201],0,'Visitor access around prayers','landmark','The modern mosque reconstructs a medieval shrine on Baku’s southern coast. Dress modestly and respect prayer times and visitor restrictions.',true,['Religious site','Coastal views']],
  ['ateshgah','Ateshgah Fire Temple','Surakhani','Ateshgah State Reserve, Surakhani settlement',[40.4155,50.0080],4,'Generally 10:00–18:00','landmark','This courtyard complex grew around naturally venting gas and hosted pilgrims and merchants. The museum explains the site’s history on the Absheron Peninsula.',true,['Outdoor courtyard','Museum']],
  ['yanar','Yanar Dag','Absheron','Digah–Mahammadi Road, Mahammadi village',[40.5016,49.8912],9,'Generally 10:00–19:00','landmark','Natural gas feeds a continuous flame along the hillside. Pair the reserve with Ateshgah if you have several hours for the return trip.',true,['Outdoor viewpoint','Wind exposure']],
  ['fountain','Fountain Square','City Center','Fountain Square, off Nizami Street, Sabail',[40.3710,49.8379],0,'Open daily, 24 hours','park','A pedestrian meeting point with fountains, terraces and easy access to Nizami Street. It works well as a lunch stop between the Old City and the shopping streets.',true,['Pedestrian zone','Dining nearby']],
  ['garden','Philharmonic Garden','Old City edge','Istiglaliyyat Street, beside the State Philharmonic, Sabail',[40.3642,49.8332],0,'Public garden, best in daylight','park','Shaded paths and a fountain sit beside the old city walls. Combine it with the palace or a walk to Icherisheher Metro.',true,['Shade','Metro nearby']],
  ['central','Central Park (Mərkəzi Park)','Yasamal','Abdulla Shaig Street entrance, Yasamal',[40.3739,49.8236],0,'Public park, best in daylight','park','Landscaped paths cross the slopes west of downtown. The terrain rises and falls, so families can choose a shorter section.',true,['Open space','Sloping paths']],
  ['dede','Dede Gorgud Park','Narimanov','Dede Gorgud Park, near 4 Sattar Bahlulzade Street, Narimanov',[40.3924,49.8483],0,'Public park, best in daylight','park','Take a quiet loop around the lake near Baku Zoo. The park is a free break between indoor attractions.',true,['Lakeside paths','Open space']],
  ['white-city','White City Boulevard','White City','White City seafront, Nobel Avenue side, Khatai',[40.3832,49.8922],0,'Open daily, 24 hours','park','Explore the eastern extension of the Caspian promenade for skyline views and cafés. The broad paths make it an easy untimed stop.',true,['Waterfront','Open space']]
];

export const malls = [
  ['port','Port Baku Mall','Port Baku','151 Neftchilar Avenue, Nasimi',[40.3757,49.8599],'Premium',['Massimo Dutti','Emporium','Designer boutiques'],['Elevators','Dining','Parking']],
  ['mall28','28 Mall','28 May','Azadliq Avenue at Fuzuli Street, Nasimi',[40.3796,49.8481],'Mid-range',['Pull&Bear','Massimo Dutti','Decathlon','Oysho'],['Metro nearby','Cinema','Food court','Elevators']],
  ['ganjlik','Ganjlik Mall','Ganjlik','14 Fatali Khan Khoyski Avenue, Narimanov',[40.4000,49.8510],'Budget to mid-range',['Zara','Massimo Dutti','Pull&Bear','Bershka','LC Waikiki','Mango','New Yorker'],['Metro nearby','Elevators','Cinema','Food court']],
  ['crescent','Crescent Mall','Caspian Waterfront','Crescent Bay development, Neftchilar Avenue, Sabail',[40.3681,49.8559],'Mid-range to premium',['Zara','Zara Home','Furla','Gant','Superstep'],['Elevators','Family entertainment','Dining']],
  ['bulvar','Park Bulvar','Caspian Waterfront','Neftchilar Avenue, Baku Boulevard, Sabail',[40.3707,49.8491],'Budget to mid-range',['Fashion boutiques','Independent gift shops'],['Cinema','Food court','Elevators']]
];

export const fashion = [
  ['zara','Zara','ganjlik',55,'Mid-range','Contemporary basics, seasonal collections and accessories.'],
  ['massimo','Massimo Dutti','ganjlik',110,'Premium','Tailored separates and understated wardrobe staples.'],
  ['pull','Pull&Bear','ganjlik',45,'Mid-range','Casual streetwear, denim and everyday footwear.'],
  ['bershka','Bershka','ganjlik',50,'Mid-range','Youth fashion and trend-led casualwear.'],
  ['lc','LC Waikiki','ganjlik',30,'Budget','Everyday apparel and value-oriented kids’ clothing.'],
  ['mango','Mango','ganjlik',65,'Mid-range','Tailoring, seasonal dresses and accessories.'],
  ['new-yorker','New Yorker','ganjlik',35,'Budget','Affordable streetwear, denim and casual basics.'],
  ['emporium','Emporium','port',180,'Luxury','A multi-brand destination for designer fashion and accessories.'],
  ['old-boutiques','Old City craft & souvenir boutiques','old-city',15,'Budget to premium','Browse locally made ceramics, textiles and gifts around Maiden Tower. Ask about makers and materials before buying.'],
  ['artisan','Icherisheher artisan concept shops','old-city',35,'Mid-range','Look for contemporary local design and small gift shops along the Old City lanes. Individual shops set their own hours.']
];
