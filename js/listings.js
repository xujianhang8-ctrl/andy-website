/*
 * ─────────────────────────────────────────────────────────────
 *  LISTINGS — one entry per property.
 *
 *  These six are SAMPLES (they show a "Sample" tag on the page).
 *  Replace them with real listings and delete `sample: true`.
 *
 *  id        unique, lowercase, no spaces (used in share links: aerealtor.com/#home-<id>)
 *  mode      'sale' or 'rent'
 *  status    'available' | 'under-offer' | 'sold' | 'let'
 *  type      'HDB' | 'EC' | 'Condo' | 'Landed'
 *  price     a number in SGD. For rentals, the monthly rent.
 *  size      floor area in sq ft
 *  added     date listed, 'YYYY-MM-DD' (newest show first)
 *  images    photo paths, e.g. ['images/listings/tampines-1.jpg', 'images/listings/tampines-2.jpg']
 *            Leave [] to show a drawing of the property type instead.
 * ─────────────────────────────────────────────────────────────
 */
window.LISTINGS = [
  {
    id: 'tampines-ec-four-bed',
    sample: true,
    mode: 'sale',
    status: 'available',
    type: 'EC',
    title: 'Four-bedroom EC with an unblocked pool view',
    location: 'Tampines',
    price: 1580000,
    beds: 4,
    baths: 3,
    size: 1281,
    added: '2026-11-18',
    images: [],
    summary: 'A high-floor four-bedroom unit facing the pool, past its five-year minimum occupation period. Full condo facilities, a short walk to the MRT and within 1km of two primary schools.',
    features: ['Past the 5-year MOP', 'High floor, pool facing', 'Walk to MRT', 'Within 1km of two primary schools']
  },
  {
    id: 'punggol-hdb-five-room',
    sample: true,
    mode: 'sale',
    status: 'available',
    type: 'HDB',
    title: 'Five-room flat by Punggol Waterway',
    location: 'Punggol',
    price: 728000,
    beds: 3,
    baths: 2,
    size: 1184,
    added: '2026-11-12',
    images: [],
    summary: 'A well-kept five-room flat a few minutes from the waterway park and the LRT. Corridor-facing kitchen, windy living room and a balcony overlooking the park connector.',
    features: ['Near Punggol Waterway Park', 'Four minutes to LRT', 'Balcony', 'Mid floor']
  },
  {
    id: 'sengkang-condo-two-bed',
    sample: true,
    mode: 'rent',
    status: 'available',
    type: 'Condo',
    title: 'Two-bedroom condo near Sengkang MRT',
    location: 'Sengkang',
    price: 3900,
    beds: 2,
    baths: 2,
    size: 700,
    added: '2026-11-06',
    images: [],
    summary: 'Fully furnished two-bedroom unit with a balcony, five minutes on foot to Sengkang MRT and Compass One. Available from next month for a two-year lease.',
    features: ['Fully furnished', 'Five minutes to MRT', 'Pool and gym', 'Two-year lease']
  },
  {
    id: 'bukit-panjang-terrace',
    sample: true,
    mode: 'sale',
    status: 'under-offer',
    type: 'Landed',
    title: 'Intermediate terrace with a renovated kitchen',
    location: 'Bukit Panjang',
    price: 3650000,
    beds: 5,
    baths: 4,
    size: 2800,
    added: '2026-10-30',
    images: [],
    summary: 'A two-and-a-half storey intermediate terrace on a quiet street, renovated in 2023 with a new kitchen and an attic room. Parking for two cars.',
    features: ['Renovated in 2023', 'Attic room', 'Parking for two cars', 'Freehold']
  },
  {
    id: 'jurong-west-hdb-rent',
    sample: true,
    mode: 'rent',
    status: 'available',
    type: 'HDB',
    title: 'Four-room flat, whole unit',
    location: 'Jurong West',
    price: 3300,
    beds: 3,
    baths: 2,
    size: 990,
    added: '2026-10-24',
    images: [],
    summary: 'Whole-unit rental of a bright four-room flat near Boon Lay MRT and Jurong Point. Partially furnished with air-conditioning in all bedrooms.',
    features: ['Whole unit', 'Near Boon Lay MRT', 'Air-con in all bedrooms', 'Partially furnished']
  },
  {
    id: 'sembawang-ec-three-bed',
    sample: true,
    mode: 'sale',
    status: 'sold',
    type: 'EC',
    title: 'Three-bedroom EC near Canberra MRT',
    location: 'Sembawang',
    price: 1250000,
    beds: 3,
    baths: 2,
    size: 1001,
    added: '2026-09-28',
    images: [],
    summary: 'A three-bedroom EC unit with a dual-key layout option, close to Canberra MRT and the Sembawang Park connector.',
    features: ['Near Canberra MRT', 'Dual-key option', 'Full condo facilities', 'Park connector nearby']
  }
];
