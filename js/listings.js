/*
 * ─────────────────────────────────────────────────────────────
 *  LISTINGS — one entry per property.
 *
 *  These six are SAMPLES (they show a "Sample" tag on the page).
 *  Replace them with your real listings and delete `sample: true`.
 *
 *  id        unique, lowercase, no spaces (used in share links: yoursite.com/#home-<id>)
 *  mode      'sale' or 'rent'
 *  status    'available' | 'under-offer' | 'sold' | 'let'
 *  type      'House' | 'Apartment' | 'Townhouse'
 *  price     a number. For rentals, the monthly rent.
 *  size      floor area, in the unit set in config.js (areaUnit)
 *  added     date listed, 'YYYY-MM-DD' (newest show first)
 *  images    photo paths, e.g. ['images/listings/riverside-1.jpg', 'images/listings/riverside-2.jpg']
 *            Leave [] to show a drawing of the property type instead.
 * ─────────────────────────────────────────────────────────────
 */
window.LISTINGS = [
  {
    id: 'riverside-family-home',
    sample: true,
    mode: 'sale',
    status: 'available',
    type: 'House',
    title: 'Three-bed family home with a south-facing garden',
    location: 'Riverside',
    price: 685000,
    beds: 3,
    baths: 2,
    size: 1650,
    added: '2026-11-18',
    images: [],
    summary: 'A well-kept semi-detached house on a quiet, tree-lined road, a short walk from the river path and two primary schools. The kitchen was refitted in 2024 and opens onto a lawned garden that gets sun all afternoon.',
    features: ['South-facing garden', 'Off-street parking for two cars', 'Kitchen refitted in 2024', 'Walk to two primary schools']
  },
  {
    id: 'station-quarter-two-bed',
    sample: true,
    mode: 'rent',
    status: 'available',
    type: 'Apartment',
    title: 'Bright two-bed apartment by the station',
    location: 'Station Quarter',
    price: 2400,
    beds: 2,
    baths: 1,
    size: 820,
    added: '2026-11-14',
    images: [],
    summary: 'Fourth-floor apartment with a lift, big windows on two sides and a small balcony. Four minutes on foot to the station. Available from the start of next month, unfurnished.',
    features: ['Four-minute walk to the station', 'Lift and secure entry', 'Balcony', 'Available unfurnished']
  },
  {
    id: 'old-town-townhouse',
    sample: true,
    mode: 'sale',
    status: 'under-offer',
    type: 'Townhouse',
    title: 'Renovated corner townhouse in the old town',
    location: 'Old Town',
    price: 540000,
    beds: 3,
    baths: 2,
    size: 1380,
    added: '2026-11-02',
    images: [],
    summary: 'A three-storey corner townhouse with original features kept and the services brought up to date: new wiring, boiler and windows. Cafés and the weekend market are at the end of the street.',
    features: ['New wiring, boiler and windows', 'Original fireplaces', 'Roof terrace', 'Corner plot with extra light']
  },
  {
    id: 'hillcrest-studio',
    sample: true,
    mode: 'rent',
    status: 'available',
    type: 'Apartment',
    title: 'Studio with long views over the city',
    location: 'Hillcrest',
    price: 1450,
    beds: 1,
    baths: 1,
    size: 430,
    added: '2026-10-28',
    images: [],
    summary: 'A compact, well-planned studio on the ninth floor with a separate kitchen area and plenty of built-in storage. Bills for water and building maintenance are included in the rent.',
    features: ['Ninth floor with city views', 'Water and maintenance included', 'Gym in the building', 'Built-in storage']
  },
  {
    id: 'parkview-detached',
    sample: true,
    mode: 'sale',
    status: 'available',
    type: 'House',
    title: 'Four-bed detached house facing the park',
    location: 'Parkview',
    price: 920000,
    beds: 4,
    baths: 3,
    size: 2300,
    added: '2026-10-20',
    images: [],
    summary: 'A spacious detached house directly opposite the park, with a double garage, a home office and a large kitchen-diner. The main bedroom has its own bathroom and dressing area.',
    features: ['Opposite the park', 'Double garage', 'Separate home office', 'Main bedroom with en-suite']
  },
  {
    id: 'riverside-garden-flat',
    sample: true,
    mode: 'sale',
    status: 'sold',
    type: 'Apartment',
    title: 'Two-bed garden apartment near the river',
    location: 'Riverside',
    price: 410000,
    beds: 2,
    baths: 1,
    size: 760,
    added: '2026-09-30',
    images: [],
    summary: 'Ground-floor apartment with its own front door and a private garden. Sold within three weeks of listing.',
    features: ['Private garden', 'Own front door', 'Two double bedrooms', 'Residents’ parking']
  }
];
