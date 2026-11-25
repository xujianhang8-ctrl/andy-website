/*
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS — edit this file to make the website yours.
 *  Everything on the page (name, phone, Google links, map…)
 *  is filled in from here. Leave a value as '' to hide it.
 * ─────────────────────────────────────────────────────────────
 */
window.SITE_CONFIG = {
  // The public web address once the site is live, e.g. 'https://andyproperty.com'.
  // Used for search engines and for share links. Leave '' until you have one.
  siteUrl: '',

  agent: {
    name: 'Andy',                    // Short name, used in the logo and headings
    fullName: 'Andy',                // Full name, e.g. 'Andy Tan'
    title: 'Property Agent',
    agency: 'Your Agency Name',      // e.g. 'Harbour Realty'
    licence: 'Licence no. 000000',   // Your registration / licence number
    photo: '',                       // e.g. 'images/andy.jpg' (portrait, at least 800px tall)
    languages: ['English'],
    bio: [
      "I'm a local property agent who believes moving home should feel straightforward. I live where I work, so I know which streets are quiet, which schools fill up first, and what homes have actually sold for — not just what they were listed at.",
      "Every client gets my direct number. I'll tell you what I honestly think a home is worth, keep you updated without you having to chase, and handle the details so you can get on with life."
    ]
  },

  contact: {
    phone: '+10000000000',           // Digits with country code, used for the Call buttons
    phoneDisplay: '+1 000 000 0000', // How the number is written on the page
    whatsapp: '10000000000',         // Country code + number, digits only. '' hides WhatsApp
    email: 'andy@example.com',
    hours: 'Mon–Sat, 9am–7pm',
    address: {
      street: '',                    // e.g. '12 Market Street, Suite 3'
      locality: 'Your City',
      region: '',
      postalCode: '',
      country: ''
    }
  },

  area: {
    name: 'Your City',               // Shown in the headline: "a property agent in …"
    neighbourhoods: ['Riverside', 'Old Town', 'Hillcrest', 'Station Quarter', 'Parkview']
  },

  /*
   * GOOGLE BUSINESS PROFILE
   * profileUrl : Google Maps → your business → Share → Copy link  (e.g. https://maps.app.goo.gl/AbCd123)
   * reviewUrl  : Business Profile → "Ask for reviews" → copy link   (e.g. https://g.page/r/XXXXXXXX/review)
   * mapsQuery  : what to show on the map if you have no exact link — your business name + city works well
   * placeId    : optional, turns on your live star rating + latest reviews on the page (needs mapsApiKey)
   * mapsApiKey : optional, a Google Maps Platform browser key restricted to your website's address
   */
  google: {
    profileUrl: '',
    reviewUrl: '',
    mapsQuery: 'Andy Property Agent, Your City',
    placeId: '',
    mapsApiKey: ''
  },

  // Optional: paste a form endpoint (Formspree, Basin, Getform…) to receive enquiries by email
  // without the visitor's email app opening. e.g. 'https://formspree.io/f/abcdwxyz'
  form: {
    endpoint: ''
  },

  social: {
    facebook: '',
    instagram: '',
    linkedin: ''
  },

  // Money and measurements
  locale: 'en-US',                   // e.g. 'en-GB', 'en-SG', 'en-AU'
  currency: 'USD',                   // e.g. 'GBP', 'SGD', 'AUD', 'MYR'
  areaUnit: 'sq ft'                  // or 'm²'
};
