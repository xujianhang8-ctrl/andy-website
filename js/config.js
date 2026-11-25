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
    title: 'Associate Group Director',
    agency: 'PropNex Realty Pte Ltd',
    agencyShort: 'PropNex',
    agencyLicence: 'CEA Licence L3008022J',  // The agency's estate agent licence number
    licence: 'CEA Reg. No. R066640H',        // Your salesperson registration number
    photo: 'images/andy-seated.webp',        // Contact card portrait
    aboutPhoto: 'images/andy-full.webp',     // About section portrait
    photoCutout: true,                       // true for photos with a transparent background
    languages: ['English'],
    specialties: ['Asset progression', 'Executive Condos', 'HDB upgrading', 'Private property', 'Commercial', 'Industrial'],
    since: '2023',                           // Year joined the agency
    team: 'Leads a team of six agents',
    motto: 'Maximising Value, Exceeding Expectations.',
    vision: 'Creating Lifelong Connections, One Home at a Time.',
    quote: 'A great property agent doesn’t just sell houses — they help people find homes. It’s about trust, understanding and turning dreams into reality.',
    bio: [
      'I’m an Associate Group Director at PropNex, Singapore’s largest real estate agency. Before real estate I worked in sales and business development. I joined PropNex in 2023, reached the firm’s Millionaire recognition in 2025, and I’m now ranked in the top 0.1% of its 14,000 agents.',
      'Property was my own wealth-building strategy first. Years before I became an agent, my then-girlfriend, now my wife, and I put almost all our savings into an Executive Condo. When we sold it, we made close to $1 million in gains, which let us upgrade to a landed home, bought when I was 35. I’ve since invested in three commercial and industrial units and three residential properties overseas.',
      'That’s why I specialise in asset progression: helping HDB upgraders and EC owners use the home they already own to fund their next purchase or investment. I start by understanding your finances and long-term goals before recommending anything, and I only advise what I’m convinced of myself. For sellers, I’ve achieved record prices. For buyers, I’ve secured homes below valuation.',
      'Earlier this year I started my own team, now six agents who share the same values. And as a father of three boys, I keep 6pm to 8pm for family dinners every day, avoid viewings on weekend evenings, and make time for an hour of exercise, including training for HYROX.'
    ]
  },

  // Press coverage, shown in the "In the press" section (newest first)
  press: [
    {
      outlet: 'EdgeProp Singapore',
      title: 'From property investor to Millionaire realtor: How Andy Ea helps clients build wealth through real estate',
      url: 'https://www.edgeprop.sg/property-news/property-investor-millionaire-realtor-how-andy-ea-helps-clients-build-wealth-through-real-estate',
      date: '2026-11-13',
      author: 'Deepa Chevi',
      quotes: [
        'Everyone has access to the same tools and data. Everyone can say the same thing. What matters is how you bring the message across.',
        'When my wife and I bought our EC, we put almost all our savings into it. It was a big decision, but I had the conviction that Singapore property would appreciate over time.',
        'I think it’s about being genuine in what you want to offer your clients. Ultimately, you want to show them that you have their best interests at heart.'
      ]
    }
  ],

  // Awards and transactions, shown in the Track record section
  trackRecord: {
    headline: 'Ranked in the top 0.1% of 14,000 PropNex agents',
    awards: [
      { title: 'PropNex Millionaire 2025', detail: 'Over $1 million in sales commission within 10 months' },
      { title: 'PropNex Rising Millionaire 2025', detail: '' },
      { title: 'PropNex Top Transactor', detail: '' },
      { title: 'Featured in EdgeProp Singapore, November 2026', detail: '“From property investor to Millionaire realtor”' },
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
    whatsapp: '6597317111',             // Country code + number, digits only. The contact form sends enquiries here
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
