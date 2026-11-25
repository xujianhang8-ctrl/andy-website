/*
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS — edit this file to update the website.
 *  Everything on the page (name, phone, Google links, awards…)
 *  is filled in from here. Leave a value as '' to hide it.
 * ─────────────────────────────────────────────────────────────
 */
window.SITE_CONFIG = {
  // The public web address of the site. Used for search engines and share links.
  siteUrl: 'https://www.aerealtor.com',

  agent: {
    name: 'Andy Ea',                       // Used in the logo and headings
    fullName: 'Andy Ea',
    title: 'Property Advisor',
    agency: 'PropNex Realty Pte Ltd',
    agencyShort: 'PropNex',
    agencyLicence: 'CEA Licence L3008022J',  // The agency's estate agent licence number
    licence: 'CEA Reg. No. R066640H',        // Your salesperson registration number
    photo: 'images/andy-seated.webp',        // Contact card portrait
    aboutPhoto: 'images/andy-full.webp',     // About section portrait
    photoCutout: true,                       // true for photos with a transparent background
    languages: ['English'],
    specialties: ['Executive Condos', 'HDB flats', 'Private property', 'Commercial', 'Industrial'],
    motto: 'Maximising Value, Exceeding Expectations.',
    vision: 'Creating Lifelong Connections, One Home at a Time.',
    quote: 'A great property agent doesn’t just sell houses — they help people find homes. It’s about trust, understanding and turning dreams into reality.',
    bio: [
      'I’m a property advisor with PropNex, Singapore’s largest real estate agency, and I’m ranked in the top 0.1% of its 14,000 agents. I help clients buy and sell HDB flats, private homes, Executive Condos, and commercial and industrial property.',
      'My own story started with an EC: it was the first home my wife and I bought. Since then I’ve invested in three commercial and industrial units and three residential properties overseas, and bought our landed home at 35. I know how it feels to be on your side of the table.',
      'For sellers, I’ve achieved record prices. For buyers, I’ve secured homes below valuation. In every meeting I present live on my iPad with PropNex’s Investment Suite, so you can see the data, not just hear me talk about it.',
      'At home I have three boys and a dedicated wife, so I value work-life balance and do my best for every client. Outside work, you’ll often find me training for HYROX.'
    ]
  },

  // Awards and transactions, shown in the Track record section
  trackRecord: {
    headline: 'Ranked in the top 0.1% of 14,000 PropNex agents',
    awards: [
      { title: 'PropNex Millionaire 2025', detail: 'Over $1 million in sales commission within 10 months' },
      { title: 'PropNex Rising Millionaire 2025', detail: '' },
      { title: 'PropNex Top Transactor', detail: '' },
      { title: 'Featured in PropNex Agency Magazine 2026', detail: '“Rising with resilience, reinvention and the power of the right environment”' }
    ],
    // Transactions by year: [project, number of transactions]
    transactions: [
      { year: 2026, projects: [['Coastal Cabana', 7], ['Rivelle', 5]] },
      { year: 2025, projects: [['Aurelle', 7], ['Otto Place', 6], ['The Orie', 4], ['Lumina Grand', 3]] },
      { year: 2024, projects: [['Lumina Grand', 7], ['Novo Place', 4]] }
    ]
  },

  contact: {
    phone: '+6597317111',               // Digits with country code, used for the Call buttons
    phoneDisplay: '+65 9731 7111',      // How the number is written on the page
    whatsapp: '6597317111',             // Country code + number, digits only. '' hides WhatsApp
    email: 'andyeabiz@gmail.com',
    hours: '',                          // e.g. 'Daily, 9am–9pm'. '' hides it
    address: {
      street: '',
      locality: 'Singapore',
      region: '',
      postalCode: '',
      country: 'SG'
    }
  },

  area: {
    name: 'Singapore'
  },

  /*
   * GOOGLE BUSINESS PROFILE
   * profileUrl : Google Maps → your business → Share → Copy link  (e.g. https://maps.app.goo.gl/AbCd123)
   * reviewUrl  : Business Profile → "Ask for reviews" → copy link   (e.g. https://g.page/r/XXXXXXXX/review)
   * mapsQuery  : what the map shows if there is no exact link — your business name as it appears on Google
   * placeId    : optional, turns on your live star rating + latest reviews on the page (needs mapsApiKey)
   * mapsApiKey : optional, a Google Maps Platform browser key restricted to your website's address
   */
  google: {
    profileUrl: '',
    reviewUrl: '',
    mapsQuery: 'Andy Ea PropNex Singapore',
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
  locale: 'en-SG',
  currency: 'SGD',
  areaUnit: 'sq ft'
};
