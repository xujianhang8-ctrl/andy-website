/* Andy — Property Agent. Page behaviour. Settings live in config.js, listings in listings.js. */
(function () {
  'use strict';

  const C = window.SITE_CONFIG || {};
  const LISTINGS = Array.isArray(window.LISTINGS) ? window.LISTINGS : [];
  const agent = C.agent || {};
  const contact = C.contact || {};
  const google = C.google || {};
  const area = C.area || {};

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const get = (path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), C);
  const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const firstName = () => String(agent.name || agent.fullName || '').split(' ')[0];
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  const locale = C.locale || 'en-US';
  const currency = C.currency || 'USD';
  let moneyFmt;
  try {
    moneyFmt = new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 });
  } catch (e) {
    moneyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  }
  const money = (n) => moneyFmt.format(Math.round(Number(n) || 0));
  const num = (n) => new Intl.NumberFormat(locale).format(n);

  /* ---------- Addresses and links ---------- */
  const addr = contact.address || {};
  const addressText = [addr.street, addr.locality, [addr.region, addr.postalCode].filter(Boolean).join(' '), addr.country]
    .filter(Boolean).join(', ');
  const mapsQuery = google.mapsQuery || addressText || [agent.fullName, agent.title, area.name].filter(Boolean).join(' ');
  const mapsSearch = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);

  // If no Business Profile link is set yet, fall back to a Google Maps search so links still work.
  let googleProfileUrl = google.profileUrl || mapsSearch(mapsQuery);
  const reviewUrl = () => google.reviewUrl || googleProfileUrl;
  const digits = (s) => String(s || '').replace(/[^\d+]/g, '');

  const LINKS = {
    phone: () => (contact.phone ? 'tel:' + digits(contact.phone) : null),
    whatsapp: () => (contact.whatsapp
      ? 'https://wa.me/' + String(contact.whatsapp).replace(/\D/g, '') + '?text=' +
        encodeURIComponent(`Hi ${firstName()}, I found you through your website.`)
      : null),
    email: () => (contact.email ? 'mailto:' + contact.email : null),
    google: () => googleProfileUrl,
    'google-review': () => reviewUrl(),
    directions: () => google.profileUrl || ('https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mapsQuery)),
    facebook: () => (C.social && C.social.facebook) || null,
    instagram: () => (C.social && C.social.instagram) || null,
    linkedin: () => (C.social && C.social.linkedin) || null
  };

  function applyLinks(root = document) {
    $$('[data-link]', root).forEach((a) => {
      const make = LINKS[a.dataset.link];
      const url = make ? make() : null;
      if (url) {
        a.href = url;
        a.hidden = false;
      } else {
        const host = a.parentElement && a.parentElement.tagName === 'LI' && a.parentElement.children.length === 1 ? a.parentElement : a;
        host.hidden = true;
      }
    });
  }

  /* ---------- Fill the page from config ---------- */
  function applyConfig() {
    $$('[data-cfg]').forEach((el) => {
      const v = get(el.dataset.cfg);
      if (isEmpty(v)) { el.hidden = true; return; }
      el.textContent = Array.isArray(v) ? v.join(', ') : v;
      el.hidden = false;
    });
    $$('[data-cfg-sep]').forEach((el) => { el.hidden = isEmpty(get(el.dataset.cfgSep)); });
    $$('[data-cfg-group]').forEach((el) => { el.hidden = isEmpty(get(el.dataset.cfgGroup)); });
    $$('[data-address]').forEach((el) => { el.textContent = addressText; el.hidden = !addressText; });

    // Photo or initials
    const initials = (agent.fullName || agent.name || 'A').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
    $$('[data-agent-initials]').forEach((el) => { el.textContent = initials; });
    $$('[data-agent-photo]').forEach((el) => {
      const where = el.dataset.agentPhoto;
      const src = where === 'about' ? (agent.aboutPhoto || agent.photo) : agent.photo;
      if (!src) return;
      const cls = agent.photoCutout ? ` class="cutout cutout-${esc(where)}"` : '';
      el.innerHTML = `<img${cls} src="${esc(src)}" alt="${esc(agent.fullName || agent.name)}, ${esc(agent.title || '')}"${where === 'card' ? '' : ' loading="lazy"'}>`;
    });

    // Bio, languages, areas
    const bio = $('#about-bio');
    if (bio) bio.innerHTML = (agent.bio || []).map((p) => `<p>${esc(p)}</p>`).join('');
    const langs = $('#about-languages');
    if (langs) langs.textContent = (agent.languages || []).join(', ');
    const areas = $('#about-areas');
    if (areas) areas.innerHTML = (agent.specialties || area.neighbourhoods || []).map((n) => `<li class="chip">${esc(n)}</li>`).join('');

    $$('[data-currency-code]').forEach((el) => { el.textContent = currency; });
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    // Title and description follow the config
    const role = [agent.agencyShort, agent.title].filter(Boolean).join(' ');
    const who = [agent.fullName || agent.name, role].filter(Boolean).join(' — ');
    document.title = area.name ? `${who} in ${area.name}` : who;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.content = `${agent.fullName || agent.name}${agent.licence ? ' (' + agent.licence + ')' : ''}, ${role || 'property agent'}${area.name ? ' in ' + area.name : ''}. ` +
        (C.trackRecord && C.trackRecord.headline ? C.trackRecord.headline + '. ' : '') +
        ((agent.specialties || []).length ? agent.specialties.join(', ') + '.' : '');
    }

    renderTrackRecord();
    renderPress();

    // Map: the Embed API with a Place ID when a key is set, otherwise the keyless embed
    const frame = $('#map-frame');
    if (frame) {
      frame.src = google.placeId && google.mapsApiKey
        ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(google.mapsApiKey)}&q=place_id:${encodeURIComponent(google.placeId)}`
        : `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;
    }

    applyLinks();
    injectStructuredData();
  }

  /* ---------- Track record ---------- */
  function trackTotals() {
    const tr = C.trackRecord || {};
    const rows = (tr.transactions || []).flatMap((y) => y.projects || []);
    return {
      total: rows.reduce((n, r) => n + (Number(r[1]) || 0), 0),
      projects: new Set(rows.map((r) => r[0])).size,
      since: Math.min(...(tr.transactions || []).map((y) => y.year))
    };
  }

  function renderTrackRecord() {
    const tr = C.trackRecord || {};
    const section = $('#track-record');
    const hasTx = (tr.transactions || []).length > 0;
    const hasAwards = (tr.awards || []).length > 0;
    if (!hasTx && !hasAwards) {
      if (section) section.hidden = true;
      $$('a[href="#track-record"]').forEach((a) => { (a.closest('li') || a).hidden = true; });
      return;
    }
    const t = trackTotals();
    $$('[data-tx-total]').forEach((el) => { el.textContent = t.total; });
    $$('[data-tx-projects]').forEach((el) => { el.textContent = t.projects; });

    const stats = $('#track-stats');
    if (stats) {
      const top = /top ([\d.]+%)/i.exec(tr.headline || '');
      const of = /of ([\d,]+ [^,.]+)/i.exec(tr.headline || '');
      stats.innerHTML = [
        hasTx ? [t.total, `transactions since ${t.since}`] : null,
        hasTx ? [t.projects, t.projects === 1 ? 'project' : 'projects'] : null,
        top ? ['Top ' + top[1], of ? `of ${of[1]}` : 'ranking'] : null
      ].filter(Boolean).map(([n, label]) => `<div class="stat"><dt>${esc(label)}</dt><dd>${esc(n)}</dd></div>`).join('');
    }

    const awards = $('#award-list');
    if (awards) {
      awards.innerHTML = (tr.awards || []).map((a) => `<li>${icon('star')}<div><p class="award-title">${esc(a.title)}</p>${a.detail ? `<p class="small muted">${esc(a.detail)}</p>` : ''}</div></li>`).join('');
      awards.closest('.track-card').hidden = !hasAwards;
    }

    const years = $('#tx-years');
    if (years) {
      years.innerHTML = (tr.transactions || []).slice().sort((a, b) => b.year - a.year).map((y) => {
        const sum = (y.projects || []).reduce((n, r) => n + (Number(r[1]) || 0), 0);
        return `<div class="tx-year">
          <h4><span>${esc(y.year)}</span><span class="small muted">${sum} ${sum === 1 ? 'transaction' : 'transactions'}</span></h4>
          <ul>${(y.projects || []).map(([name, n]) => `<li><span>${esc(name)}</span><span class="tx-count" aria-label="${esc(n)} transactions">${esc(n)}</span></li>`).join('')}</ul>
        </div>`;
      }).join('');
      years.closest('.track-card').hidden = !hasTx;
    }
  }

  /* ---------- In the press ---------- */
  function renderPress() {
    const list = $('#press-list');
    const items = C.press || [];
    if (!items.length) {
      const section = $('#press');
      if (section) section.hidden = true;
      $$('a[href="#press"]').forEach((a) => { (a.closest('li') || a).hidden = true; });
      return;
    }
    if (!list) return;
    const fmtDate = (d) => { try { return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(d + 'T00:00:00')); } catch (e) { return d; } };
    list.innerHTML = items.map((a) => `
      <article class="card press-card">
        <p class="press-meta"><span class="press-outlet">${esc(a.outlet)}</span><span class="small muted">${[a.date ? fmtDate(a.date) : '', a.author ? 'by ' + esc(a.author) : ''].filter(Boolean).join(' · ')}</span></p>
        <h3 class="press-title"><a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.title)}</a></h3>
        ${(a.quotes || []).length ? `<div class="press-quotes">${a.quotes.map((q) => `<blockquote>${esc(q)}</blockquote>`).join('')}</div>` : ''}
        <a class="btn btn-secondary" href="${esc(a.url)}" target="_blank" rel="noopener"><span>Read the article on ${esc(a.outlet)}</span>${icon('external')}</a>
      </article>`).join('');
  }

  /* ---------- Structured data: tells Google this site and the Business Profile are the same agent ---------- */
  function injectStructuredData() {
    const base = C.siteUrl || location.href.split('#')[0];
    const abs = (p) => { try { return new URL(p, base).href; } catch (e) { return p; } };
    const data = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: [agent.fullName || agent.name, agent.title].filter(Boolean).join(' — '),
      url: base,
      telephone: contact.phone || undefined,
      email: contact.email || undefined,
      image: agent.photo ? abs(agent.photo) : undefined,
      description: (agent.bio || [])[0],
      areaServed: (area.neighbourhoods && area.neighbourhoods.length ? area.neighbourhoods : [area.name]).filter(Boolean)
        .map((n) => ({ '@type': 'Place', name: n })),
      address: addressText ? {
        '@type': 'PostalAddress',
        streetAddress: addr.street || undefined,
        addressLocality: addr.locality || undefined,
        addressRegion: addr.region || undefined,
        postalCode: addr.postalCode || undefined,
        addressCountry: addr.country || undefined
      } : undefined,
      parentOrganization: agent.agency ? { '@type': 'RealEstateAgent', name: agent.agency, identifier: agent.agencyLicence || undefined } : undefined,
      identifier: agent.licence || undefined,
      slogan: agent.motto || undefined,
      knowsAbout: (agent.specialties || []).length ? agent.specialties : undefined,
      award: C.trackRecord && (C.trackRecord.awards || []).length ? C.trackRecord.awards.map((a) => a.title) : undefined,
      subjectOf: (C.press || []).length ? C.press.map((a) => ({
        '@type': 'NewsArticle', headline: a.title, url: a.url, datePublished: a.date || undefined,
        author: a.author ? { '@type': 'Person', name: a.author } : undefined,
        publisher: { '@type': 'Organization', name: a.outlet }
      })) : undefined,
      hasMap: google.profileUrl || undefined,
      sameAs: [google.profileUrl, C.social && C.social.facebook, C.social && C.social.instagram, C.social && C.social.linkedin].filter(Boolean)
    };
    if (!data.sameAs.length) delete data.sameAs;
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- Illustrations for listings without photos ---------- */
  const ILLUSTRATION = {
    House: `
      <rect class="ill-sky" width="400" height="300"/>
      <circle class="ill-sun" cx="318" cy="72" r="30"/>
      <rect class="ill-ground" y="246" width="400" height="54"/>
      <rect class="ill-trunk" x="74" y="196" width="8" height="52" rx="3"/>
      <circle class="ill-tree" cx="78" cy="180" r="30"/>
      <rect class="ill-wall-2" x="252" y="94" width="18" height="40"/>
      <rect class="ill-wall" x="132" y="142" width="160" height="106"/>
      <path class="ill-roof" d="M116 148 212 80l96 68z"/>
      <rect class="ill-door" x="196" y="188" width="32" height="60" rx="3"/>
      <rect class="ill-window" x="150" y="166" width="32" height="30" rx="2"/>
      <rect class="ill-window" x="242" y="166" width="32" height="30" rx="2"/>`,
    Apartment: `
      <rect class="ill-sky" width="400" height="300"/>
      <circle class="ill-sun" cx="76" cy="70" r="26"/>
      <rect class="ill-ground" y="246" width="400" height="54"/>
      <rect class="ill-wall-2" x="276" y="128" width="72" height="120"/>
      <rect class="ill-window" x="290" y="146" width="18" height="16" rx="2"/>
      <rect class="ill-window" x="318" y="146" width="18" height="16" rx="2"/>
      <rect class="ill-window" x="290" y="176" width="18" height="16" rx="2"/>
      <rect class="ill-window" x="318" y="176" width="18" height="16" rx="2"/>
      <rect class="ill-window" x="290" y="206" width="18" height="16" rx="2"/>
      <rect class="ill-window" x="318" y="206" width="18" height="16" rx="2"/>
      <rect class="ill-wall" x="150" y="56" width="120" height="192"/>
      <rect class="ill-roof-2" x="144" y="48" width="132" height="12" rx="2"/>
      ${[76, 108, 140, 172].map((y) => [166, 199, 232].map((x) => `<rect class="ill-window" x="${x}" y="${y}" width="22" height="20" rx="2"/>`).join('')).join('')}
      <rect class="ill-door" x="198" y="210" width="24" height="38" rx="3"/>
      <rect class="ill-trunk" x="102" y="206" width="8" height="42" rx="3"/>
      <circle class="ill-tree" cx="106" cy="194" r="24"/>`,
    Townhouse: `
      <rect class="ill-sky" width="400" height="300"/>
      <circle class="ill-sun" cx="330" cy="64" r="24"/>
      <rect class="ill-ground" y="246" width="400" height="54"/>
      ${[0, 1, 2].map((i) => {
        const x = 106 + i * 62;
        return `<rect class="ill-wall" x="${x}" y="128" width="60" height="120"/>
          <path class="${i === 1 ? 'ill-roof-2' : 'ill-roof'}" d="M${x - 3} 132 ${x + 30} 94l33 38z"/>
          <rect class="ill-window" x="${x + 16}" y="146" width="28" height="24" rx="2"/>
          <rect class="ill-door" x="${x + 18}" y="194" width="24" height="54" rx="3"/>`;
      }).join('')}
      <rect class="ill-trunk" x="334" y="204" width="8" height="44" rx="3"/>
      <circle class="ill-tree" cx="338" cy="190" r="26"/>`
  };
  const DRAWING_FOR = { HDB: 'Apartment', EC: 'Apartment', Condo: 'Apartment', Landed: 'Townhouse' };
  const TYPE_LABEL = { EC: 'Executive Condo', HDB: 'HDB flat' };
  const illustration = (type) =>
    `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${ILLUSTRATION[DRAWING_FOR[type] || type] || ILLUSTRATION.House}</svg>`;

  /* ---------- Listings ---------- */
  const isClosed = (l) => l.status === 'sold' || l.status === 'let';
  const STATUS = {
    available: (l) => (l.mode === 'rent' ? ['badge-rent', 'For rent'] : ['badge-sale', 'For sale']),
    'under-offer': () => ['badge-offer', 'Under offer'],
    sold: () => ['badge-sold', 'Sold'],
    let: () => ['badge-sold', 'Let agreed']
  };
  const badgeFor = (l) => {
    const [cls, label] = (STATUS[l.status] || STATUS.available)(l);
    return `<span class="badge ${cls}">${label}</span>`;
  };
  const tagsFor = (l) => badgeFor(l) + (l.sample ? '<span class="badge badge-sample">Sample</span>' : '');
  const priceFor = (l) => money(l.price) + (l.mode === 'rent' ? ' <small>/ month</small>' : '');
  const factsFor = (l, withType) => [
    withType ? `<li>${icon('home')}${esc(TYPE_LABEL[l.type] || l.type)}</li>` : '',
    l.beds ? `<li>${icon('bed')}${l.beds} bed</li>` : '',
    l.baths ? `<li>${icon('bath')}${l.baths} bath</li>` : '',
    l.size ? `<li>${icon('area')}${num(l.size)} ${esc(C.areaUnit || 'sq ft')}</li>` : ''
  ].join('');
  const mediaFor = (l, i = 0) => {
    const src = (l.images || [])[i];
    return src ? `<img src="${esc(src)}" alt="${esc(l.title)}${i ? ' — photo ' + (i + 1) : ''}" loading="lazy">` : illustration(l.type);
  };

  const state = { mode: 'all', type: '', beds: 0, sort: 'newest' };
  const grid = $('#listing-grid');
  const empty = $('#listing-empty');
  const count = $('#listing-count');
  const filtersForm = $('#filters');

  function currentList() {
    const list = LISTINGS.filter((l) =>
      (state.mode === 'all' || l.mode === state.mode) &&
      (!state.type || l.type === state.type) &&
      (Number(l.beds) || 0) >= state.beds);
    const byPrice = (a, b) => (a.mode === b.mode ? a.price - b.price : a.mode === 'sale' ? -1 : 1);
    const order = {
      newest: (a, b) => String(b.added || '').localeCompare(String(a.added || '')),
      'price-asc': byPrice,
      'price-desc': (a, b) => (a.mode === b.mode ? b.price - a.price : byPrice(a, b))
    }[state.sort] || (() => 0);
    return list.sort((a, b) => (isClosed(a) - isClosed(b)) || order(a, b));
  }

  function renderListings() {
    if (!grid) return;
    const list = currentList();
    grid.innerHTML = list.map((l) => `
      <article class="card listing-card${isClosed(l) ? ' is-closed' : ''}">
        <div class="listing-media">${mediaFor(l)}</div>
        <div class="listing-body">
          <div class="listing-tags">${tagsFor(l)}</div>
          <p class="listing-price">${priceFor(l)}</p>
          <h3 class="listing-title"><a href="#home-${esc(l.id)}">${esc(l.title)}</a></h3>
          <p class="listing-location">${icon('pin')}${esc(l.location)}</p>
          <ul class="facts">${factsFor(l)}</ul>
        </div>
      </article>`).join('');
    empty.hidden = list.length > 0;
    const what = state.mode === 'sale' ? ' for sale' : state.mode === 'rent' ? ' to rent' : '';
    count.textContent = `${list.length} ${list.length === 1 ? 'home' : 'homes'}${what}`;
  }

  function readFilters() {
    const fd = new FormData(filtersForm);
    state.mode = fd.get('mode') || 'all';
    state.type = fd.get('type') || '';
    state.beds = Number(fd.get('beds')) || 0;
    state.sort = fd.get('sort') || 'newest';
  }

  function setFilters({ mode, type, beds }) {
    if (mode) { const r = filtersForm.querySelector(`input[name="mode"][value="${mode}"]`); if (r) r.checked = true; }
    if (type !== undefined) filtersForm.elements.type.value = type;
    if (beds !== undefined) filtersForm.elements.beds.value = String(beds);
    readFilters();
    renderListings();
  }

  if (filtersForm) {
    filtersForm.addEventListener('change', () => { readFilters(); renderListings(); });
    filtersForm.addEventListener('submit', (e) => e.preventDefault());
  }
  const clear = $('#clear-filters');
  if (clear) clear.addEventListener('click', () => { filtersForm.reset(); readFilters(); renderListings(); });

  const heroSearch = $('#hero-search');
  if (heroSearch) {
    heroSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(heroSearch);
      setFilters({ mode: fd.get('mode'), type: fd.get('type') || '', beds: Number(fd.get('beds')) || 0 });
      $('#listings').scrollIntoView({ block: 'start' });
    });
  }

  /* ---------- Listing dialog ---------- */
  const dialog = $('#listing-dialog');
  const dialogContent = $('#dialog-content');
  let lastFocus = null;

  function openListing(id) {
    const l = LISTINGS.find((x) => String(x.id) === id);
    if (!l || !dialog) return;
    const images = l.images || [];
    const closed = isClosed(l);
    dialogContent.innerHTML = `
      <div class="dialog-media" id="dlg-media">${mediaFor(l)}</div>
      ${images.length > 1 ? `<div class="dialog-thumbs">${images.map((src, i) =>
        `<button type="button" data-thumb="${i}" aria-label="Photo ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}><img src="${esc(src)}" alt=""></button>`).join('')}</div>` : ''}
      <div class="dialog-body">
        <div class="listing-tags">${tagsFor(l)}</div>
        <div>
          <p class="listing-price">${priceFor(l)}</p>
          <h2 class="display-md" id="dlg-title">${esc(l.title)}</h2>
          <p class="listing-location">${icon('pin')}${esc(l.location)} · <a href="${mapsSearch([l.location, area.name].filter(Boolean).join(', '))}" target="_blank" rel="noopener">See the area on Google Maps</a></p>
        </div>
        <ul class="facts">${factsFor(l, true)}</ul>
        ${l.summary ? `<p>${esc(l.summary)}</p>` : ''}
        ${(l.features || []).length ? `<ul class="feature-list">${l.features.map((f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul>` : ''}
        <div class="dialog-actions">
          <a class="btn btn-primary" href="#contact" data-enquire="${esc(l.id)}">${closed ? 'Ask about similar homes' : l.mode === 'rent' ? 'Arrange a viewing' : 'Enquire about this home'}</a>
          <a class="btn btn-secondary" data-link="phone">${icon('phone')}<span>Call</span></a>
          <button class="btn btn-quiet" type="button" data-share>${icon('link')}<span>Copy link</span></button>
        </div>
      </div>`;
    applyLinks(dialogContent);
    lastFocus = document.activeElement;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;

    $$('[data-thumb]', dialogContent).forEach((b) => b.addEventListener('click', () => {
      $('#dlg-media', dialogContent).innerHTML = mediaFor(l, Number(b.dataset.thumb));
      $$('[data-thumb]', dialogContent).forEach((x) => x.setAttribute('aria-current', String(x === b)));
    }));

    const share = $('[data-share]', dialogContent);
    share.addEventListener('click', async () => {
      const url = (C.siteUrl || location.href.split('#')[0]).replace(/#.*$/, '') + '#home-' + l.id;
      try {
        if (navigator.share) await navigator.share({ title: l.title, url });
        else { await navigator.clipboard.writeText(url); share.querySelector('span').textContent = 'Link copied'; }
      } catch (e) { /* cancelled */ }
    });

    $('[data-enquire]', dialogContent).addEventListener('click', (e) => {
      e.preventDefault();
      prefillEnquiry(l);
      closeDialog();
      $('#contact').scrollIntoView({ block: 'start' });
      setTimeout(() => $('#cf-name').focus({ preventScroll: true }), 400);
    });
  }

  function closeDialog() {
    if (dialog && dialog.open) dialog.close();
  }

  if (dialog) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog || e.target.closest('[data-close]')) closeDialog();
    });
    dialog.addEventListener('close', () => {
      if (location.hash.startsWith('#home-')) history.replaceState(null, '', location.pathname + location.search);
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    });
  }

  function routeFromHash() {
    const m = /^#home-(.+)$/.exec(decodeURIComponent(location.hash));
    if (m) openListing(m[1]);
  }
  window.addEventListener('hashchange', routeFromHash);

  /* ---------- Contact form ---------- */
  const form = $('#contact-form');
  const statusEl = $('#form-status');

  function setInterest(value) {
    const sel = $('#cf-interest');
    if (!sel) return;
    const opt = Array.from(sel.options).find((o) => o.value === value || o.text === value);
    if (opt) sel.value = opt.value;
  }

  function prefillEnquiry(l) {
    setInterest(l.mode === 'rent' ? 'Renting' : l.type === 'EC' ? 'Executive Condo' : 'Buying');
    const msg = $('#cf-message');
    msg.value = isClosed(l)
      ? `I saw "${l.title}" in ${l.location}. Do you have anything similar coming up?`
      : `I'm interested in "${l.title}" in ${l.location} (${money(l.price)}${l.mode === 'rent' ? ' / month' : ''}). Could we arrange a viewing?`;
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-interest]');
    if (a) setInterest(a.dataset.interest);
  });

  function say(text, tone) {
    statusEl.textContent = text;
    if (tone) statusEl.dataset.tone = tone; else delete statusEl.dataset.tone;
  }

  // Enquiries go to Andy's WhatsApp: the form opens a chat with the message already written.
  const waNumber = () => String(contact.whatsapp || contact.phone || '').replace(/\D/g, '');
  const siteName = () => (C.siteUrl || location.host || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');

  function enquiryText(data) {
    const lines = [`Hi ${firstName()}, this is ${data.name.trim()}.`, `I'm interested in: ${data.interest}`, '', data.message.trim()];
    if (data.email && data.email.trim()) lines.push('', `Email: ${data.email.trim()}`);
    lines.push('', `(Sent from ${siteName() || 'your website'})`);
    return lines.join('\n');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        const firstBad = form.querySelector(':invalid');
        if (firstBad) firstBad.focus();
        return;
      }
      const data = Object.fromEntries(new FormData(form));
      const url = `https://wa.me/${waNumber()}?text=${encodeURIComponent(enquiryText(data))}`;
      // A new tab keeps the site open on desktop; on phones wa.me hands over to the WhatsApp app.
      const win = window.open(url, '_blank');
      if (win) win.opener = null; else window.location.href = url;
      say(`WhatsApp should now be open with your message ready. Tap send and it comes straight to me. If nothing opened, message me on ${contact.phoneDisplay || '+' + waNumber()}.`, 'ok');
    });
  }

  /* ---------- Mortgage calculator ---------- */
  const calcForm = $('#calc-form');
  function calc() {
    const f = calcForm.elements;
    const price = Math.max(Number(f.price.value) || 0, 0);
    const pct = Math.min(Math.max(Number(f.deposit.value) || 0, 0), 100);
    const rate = Math.max(Number(f.rate.value) || 0, 0);
    const years = Number(f.years.value) || 25;
    const deposit = price * pct / 100;
    const loan = price - deposit;
    const n = years * 12;
    const r = rate / 100 / 12;
    const monthly = loan <= 0 ? 0 : r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    $('#c-monthly').textContent = money(monthly);
    $('#c-out-deposit').textContent = money(deposit);
    $('#c-out-loan').textContent = money(loan);
    $('#c-out-interest').textContent = money(Math.max(monthly * n - loan, 0));
  }
  if (calcForm) {
    calcForm.addEventListener('input', calc);
    calcForm.addEventListener('change', calc);
    calcForm.addEventListener('submit', (e) => e.preventDefault());
  }

  /* ---------- Header and menu ---------- */
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });

  const nav = $('#site-nav');
  const toggle = $('.nav-toggle');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });

  /* ---------- Live Google rating and reviews (optional: needs placeId + mapsApiKey) ---------- */
  function starsHtml(rating) {
    const full = Math.round(Number(rating) || 0);
    return `<span class="stars" role="img" aria-label="Rated ${Number(rating).toFixed(1)} out of 5">${
      [0, 1, 2, 3, 4].map((i) => `<svg class="icon${i < full ? '' : ' is-empty'}" aria-hidden="true"><use href="#i-star"/></svg>`).join('')}</span>`;
  }

  function loadMapsScript(key) {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps && window.google.maps.importLibrary) return resolve();
      window.__andyMapsReady = () => resolve();
      const s = document.createElement('script');
      s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&loading=async&callback=__andyMapsReady`;
      s.async = true;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function loadGoogleReviews() {
    if (!google.placeId || !google.mapsApiKey) return;
    try {
      await loadMapsScript(google.mapsApiKey);
      const { Place } = await window.google.maps.importLibrary('places');
      const place = new Place({ id: google.placeId });
      await place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews', 'googleMapsURI'] });

      if (!google.profileUrl && place.googleMapsURI) {
        googleProfileUrl = place.googleMapsURI;
        applyLinks();
      }
      if (!place.rating) return;

      const countText = `${num(place.userRatingCount || 0)} Google ${place.userRatingCount === 1 ? 'review' : 'reviews'}`;
      $('#reviews-summary').innerHTML = `
        <div class="rating-summary">
          <span class="rating-number">${Number(place.rating).toFixed(1)}</span>
          <div>${starsHtml(place.rating)}<p class="muted">${countText}</p></div>
        </div>`;
      const chip = $('[data-google-chip]');
      if (chip) chip.innerHTML = `<strong>${Number(place.rating).toFixed(1)}</strong> ${starsHtml(place.rating)} <span>${countText}</span>`;

      const reviews = (place.reviews || []).filter((r) => r.text).slice(0, 3);
      if (reviews.length) {
        const gridEl = $('#review-grid');
        gridEl.innerHTML = reviews.map((r) => {
          const who = (r.authorAttribution && r.authorAttribution.displayName) || 'Google user';
          const link = r.authorAttribution && r.authorAttribution.uri;
          const text = String(r.text);
          const short = text.length > 320 ? text.slice(0, 317).trimEnd() + '…' : text;
          return `<figure class="card review-card">
            ${starsHtml(r.rating)}
            <blockquote>${esc(short)}</blockquote>
            <footer>
              ${link ? `<a href="${esc(link)}" target="_blank" rel="noopener">${esc(who)}</a>` : `<span>${esc(who)}</span>`}
              <span>${esc(r.relativePublishTimeDescription || '')}</span>
            </footer>
          </figure>`;
        }).join('');
        gridEl.hidden = false;
        $('#review-attribution').hidden = false;
      }
    } catch (err) {
      console.warn('Google reviews could not be loaded:', err);
    }
  }

  /* ---------- Start ---------- */
  applyConfig();
  if (filtersForm) readFilters();
  renderListings();
  if (calcForm) calc();
  onScroll();
  routeFromHash();
  loadGoogleReviews();
})();
