// Operator-listed venues with pins at their buildings or mall entrances.
export default [
  {
    id:'fuzzy', name:'Fuzzy Coffee & Wine', kind:'cafe', district:'Yasamal', area:'Caspian Plaza',
    coords:[40.385445,49.828748], address:'44 Jafar Jabbarli Street, Caspian Plaza, floor 17',
    hours:'Daily 08:00–00:00', source:'https://fuzzy.az/', mapRef:'way/282645647', cost:12, family:true,
    description:'A seventeenth-floor café with city views, coffee and light meals. Weekday lunch and weekend wine-zone reservations have separate hours.',
    features:['Panoramic terrace','Wi-Fi','Work tables'], mall:'Caspian Plaza',
    menu:[['Sandwiches','Chicken panuozzo',8.5],['Sandwiches','Caesar panuozzo',9.5],['Sides','Chicken nuggets',10.5]],
    menuStatus:'Selected prices from the operator’s menu. Check the full current menu before visiting.'
  },
  {
    id:'caspian-plaza', name:'Caspian Plaza', kind:'tower', district:'Yasamal', area:'Jafar Jabbarli Street',
    coords:[40.385445,49.828748], address:'44 Jafar Jabbarli Street',
    hours:'Tenant access and hours vary', mapRef:'way/282645647',
    description:'A Yasamal office and business center. The café on floor 17 offers a public dining stop with elevated city views during operating hours.'
  },
  {
    id:'sahil-dining', name:'SAHiL Bar & Restaurant', kind:'restaurant', district:'Sabail', area:'Baku Boulevard',
    coords:[40.3697,49.8449], address:'34 Neftchilar Avenue, Seaside Boulevard',
    hours:'Check current lunch and dinner hours', source:'https://sahilbaku.az/', cost:35, family:true,
    description:'A waterfront restaurant serving contemporary Caspian and Azerbaijani dishes. The upper-level dining room looks over the Boulevard.',
    features:['Waterfront dining','Reservations'],
    menu:[['Starters','Herb qutab',7],['Mains','Grilled kebab',26],['Mains','Plov',23],['Drinks','Azerbaijani tea',6]]
  },
  {
    id:'etiler-28', name:'ETiler Meat House — 28 Mall', kind:'restaurant', district:'Nasimi', area:'28 Mall',
    coords:[40.378893,49.847228], address:'28 Mall, fourth floor, Azadliq Avenue', mall:'28 Mall',
    hours:'Check 28 Mall dining hours', source:'https://monyo.az/v4/?r=etiler_meat_house_28_mall', cost:26,
    description:'Turkish grill and steak restaurant with a branch on the fourth floor of 28 Mall near 28 May metro.',
    features:['Dine-in','Metro nearby'],
    menu:[['Starters','Lentil soup',6],['Grill','Lamb kebab',24],['Grill','Grilled beef',29],['Drinks','Tea',4]]
  },
  {
    id:'kfc-abu', name:'KFC — Abu Arena', kind:'restaurant', district:'Narimanov', area:'Koroğlu Rahimov Street',
    coords:[40.399053,49.858379], address:'20D Koroğlu Rahimov Street, Abu Arena',
    hours:'Confirm current dine-in hours', source:'https://wolt.com/en/aze/baku/brand/kfc', mapRef:'way/290818689',
    aliases:['KFC Narimanov','KFC Koroglu Rahimov']
  }
];
