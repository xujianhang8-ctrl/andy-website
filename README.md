# Andy Ea — PropNex Property Advisor website

The website for Andy Ea (CEA R066640H), PropNex Property Advisor in Singapore, specialising in Executive Condos. It's a single page with a track record of awards and transactions by project, an asset progression case study, press coverage, listings with filters and share links, services, a mortgage calculator, an About section, Google reviews, a contact form, a map, and a call/WhatsApp bar on phones. It's plain HTML, CSS and JavaScript. There's no build step and nothing to install, and it runs on any static host (GitHub Pages, Netlify, Cloudflare Pages).

```
index.html          the page
css/styles.css      all styling (colours and sizes are the tokens at the top)
js/config.js        ← details: name, CEA numbers, phone, awards, transactions, Google links
js/listings.js      ← your properties
js/main.js          page behaviour (no need to edit)
fonts/              Newsreader + Figtree, self-hosted (SIL Open Font License)
images/             favicon, Andy's portraits (andy-seated.webp, andy-full.webp), listing photos
```

## 1. Keep it up to date

Andy's details from his "About Me" deck and the EdgeProp Singapore feature (November 2026) are already in **`js/config.js`**. The asset progression case study is written directly in `index.html`, in the `#asset-progression` section.

| Setting | What it holds |
| --- | --- |
| `agent.name`, `title`, `agency`, `agencyLicence`, `licence` | Name, PropNex, the agency's CEA licence and Andy's CEA registration. They appear in the hero, on the contact card and in the footer, as CEA's advertising guidelines require |
| `agent.photo`, `agent.aboutPhoto` | Portraits for the contact card and About. These are cut-outs taken from the deck; higher-resolution originals will look sharper |
| `agent.bio`, `motto`, `vision`, `quote`, `specialties` | The About section |
| `agent.since`, `agent.team` | The year Andy joined PropNex and his team, shown in About |
| `press` | The In the press section: outlet, headline, link, date, author and quotes. Add new coverage at the top |
| `trackRecord.awards`, `trackRecord.transactions` | The Track record section. Add a project as `['Name', count]` under its year, and the totals (43 transactions, 7 projects) update themselves |
| `contact.phone` / `phoneDisplay` / `whatsapp` / `email` | Every Call, WhatsApp and Email button uses these |
| `contact.hours` | Empty, so it's hidden. Add opening hours if you want them shown |
| `locale`, `currency`, `areaUnit` | `en-SG`, `SGD`, `sq ft` |

Then open **`js/listings.js`**, replace the six sample homes with real ones, and remove `sample: true` from each. Types are `HDB`, `EC`, `Condo` and `Landed`. Put photos in `images/listings/` and list them in each home's `images: [...]`.

## 2. Link the website and your Google Business Profile

The link has to go both ways: the website points to your profile, and the profile points to the website.

**Website → Google profile** (in `js/config.js`, under `google`):

1. **`profileUrl`**: search for your business on Google Maps, open it, click **Share**, then **Copy link** (looks like `https://maps.app.goo.gl/…`). Every "View on Google", "Read reviews" and "Directions" button uses it, and it's added to the page's structured data (`sameAs`) so Google knows the site and the profile are the same business.
2. **`reviewUrl`**: in your Business Profile (search "my business" on Google while signed in), click **Ask for reviews** and copy the link (`https://g.page/r/…/review`). The "Leave a review" buttons use it.
3. **`mapsQuery`**: your business name and city exactly as they appear on Google. It drives the map embed.

Until `profileUrl` is set, the Google buttons fall back to a Google Maps search for `mapsQuery`, so nothing on the page is a dead link.

**Google profile → website:** once the site is live, open your Business Profile, choose **Edit profile**, then **Contact**, then **Website**, paste the site address and save. Also set `siteUrl` in `config.js` to the same address.

**Optional: live star rating and latest reviews on the page.** Set `placeId` (find it with Google's [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)) and `mapsApiKey`, a Google Maps Platform key with the *Maps JavaScript API*, *Places API (New)* and *Maps Embed API* enabled. Restrict the key to your website's address under *Application restrictions → Websites*. The reviews section then shows your rating and three recent reviews, with Google attribution. Without a key, the section shows buttons to your profile instead.

**Optional: Google Search Console.** Add the site at [search.google.com/search-console](https://search.google.com/search-console), choose the *HTML tag* method, and paste the tag where `index.html` has the commented-out `google-site-verification` line.

## 3. Receive enquiries

Enquiries go to Andy's WhatsApp. When a visitor submits the contact form, WhatsApp opens (the app on phones, WhatsApp Web or desktop on computers) with a chat to `contact.whatsapp` and the enquiry already written: their name, what they're interested in, their message and, if given, their email. They tap send, and it arrives in Andy's WhatsApp from their own number, so he can reply straight away. Nothing goes by email, and there's no form service to set up.

## 4. Put it online

Andy already owns **aerealtor.com** (set as `siteUrl`). Point that domain at whichever host you use below.

**GitHub Pages (free):** in this repository, go to **Settings → Pages**, then under *Build and deployment* choose **Deploy from a branch**, pick the branch and `/ (root)`, and save. The site appears at `https://<your-username>.github.io/andy-website/` within a minute or two. To use aerealtor.com, enter `www.aerealtor.com` under **Custom domain** and follow GitHub's DNS instructions.

**Netlify / Cloudflare Pages:** connect this repository. There's no build command, and the publish directory is the root.

To preview on your computer, run this inside the folder and open `http://localhost:8000`:

```bash
python3 -m http.server 8000
```

## Notes

- Share a listing with `yoursite.com/#home-<listing id>`. The link opens that home directly, and each listing has a **Copy link** button.
- The site follows the visitor's light or dark mode setting.
- Colours, type and spacing are tokens at the top of `css/styles.css`. Change them there and the whole site follows.
