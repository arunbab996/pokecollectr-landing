(() => {
  const LISTINGS = [
    { id: 1, name: 'Alakazam ex', set: 'Scarlet & Violet · 151', img: 'assets/cards/alakazam-ex-hero-right.webp', kind: 'single', auction: true, price: 610, bids: 3, timeLeft: '1d 4h', lang: 'EN', cond: 'NM', seller: 'pokechachaa', verified: true, added: 1, shipping: 120, reserveMet: true,
      bidHistory: [{ user: 'ishan021090', amount: 610, minutesAgo: 4 }, { user: 'cardhunter_in', amount: 550, minutesAgo: 95 }, { user: 'myst_pokefan', amount: 500, minutesAgo: 260 }] },
    { id: 2, name: 'Mew ex', set: 'Scarlet & Violet · 151', img: 'assets/cards/mew-ex-hero-left.webp', kind: 'single', auction: true, price: 590, bids: 1, timeLeft: '2d 11h', lang: 'EN', cond: 'LP', seller: 'dexversecardngames', verified: true, added: 2, shipping: 120, reserveMet: false,
      bidHistory: [{ user: 'growlithe_gains', amount: 590, minutesAgo: 40 }] },
    { id: 3, name: 'Mega Charizard X ex', set: 'Mega Evolution', img: 'assets/cards/charizard-ex-hero-center.webp', kind: 'single', auction: true, price: 1450, bids: 5, timeLeft: '6h 20m', lang: 'EN', cond: 'M', seller: 'pokechachaa', verified: true, added: 3, shipping: 150, reserveMet: true,
      bidHistory: [{ user: 'pikafan_blr', amount: 1450, minutesAgo: 8 }, { user: 'ishan021090', amount: 1350, minutesAgo: 55 }, { user: 'cardhunter_in', amount: 1200, minutesAgo: 130 }, { user: 'myst_pokefan', amount: 1100, minutesAgo: 240 }, { user: 'growlithe_gains', amount: 1000, minutesAgo: 400 }] },
    { id: 4, name: 'Ditto #51', set: 'Skyridge', img: 'assets/cards/ditto.png', kind: 'single', price: 9000, lang: 'EN', cond: 'NM', seller: 'pocketfinity', verified: false, added: 4, shipping: 100 },
    { id: 5, name: 'Flareon #10', set: 'Legendary Collection', img: 'assets/cards/flareon.png', kind: 'single', price: 6000, lang: 'EN', cond: 'LP', seller: 'pokechachaa', verified: true, added: 5, shipping: 100 },
    { id: 6, name: 'Light Jolteon #48', set: 'Neo Destiny', img: 'assets/cards/jolteon.png', kind: 'single', price: 12000, lang: 'EN', cond: 'LP', seller: 'pokechachaa', verified: true, added: 6, shipping: 120 },
    { id: 7, name: 'Magneton #11', set: 'Fossil', img: 'assets/cards/magneton.png', kind: 'single', price: 2600, lang: 'EN', cond: 'NM', seller: 'dexversecardngames', verified: true, added: 7, shipping: 80 },
    { id: 8, name: 'Poliwrath #13', set: 'Base Set', img: 'assets/cards/poliwrath.png', kind: 'single', price: 2750, lang: 'EN', cond: 'LP', seller: 'pokechachaa', verified: true, added: 8, shipping: 80 },
    { id: 9, name: 'Psyduck #79', set: 'Neo Destiny', img: 'assets/cards/psyduck.png', kind: 'single', price: 7500, lang: 'EN', cond: 'NM', seller: 'pocketfinity', verified: false, added: 9, shipping: 100 },
    { id: 10, name: 'Mew ex', set: 'Scarlet & Violet · 151', img: 'assets/cards/mew-ex-hero-left.webp', kind: 'single', price: 21000, lang: 'JA', cond: 'M', seller: 'dexversecardngames', verified: true, added: 10, shipping: 150 },
    { id: 11, name: 'Mega Charizard X ex', set: 'Mega Evolution', img: 'assets/cards/charizard-ex-hero-center.webp', kind: 'slab', price: 42500, lang: 'EN', grade: 'CGC 9.5', seller: 'pokechachaa', verified: true, added: 11, shipping: 200 },
    { id: 12, name: 'Alakazam ex', set: 'Scarlet & Violet · 151', img: 'assets/cards/alakazam-ex-hero-right.webp', kind: 'single', price: 3200, lang: 'JA', cond: 'LP', seller: 'pocketfinity', verified: false, added: 12, shipping: 100 },
    { id: 13, name: 'Magneton #11', set: 'Fossil', img: 'assets/cards/magneton.png', kind: 'slab', price: 4800, lang: 'EN', grade: 'PSA 9', seller: 'dexversecardngames', verified: true, added: 13, shipping: 120 },
    { id: 14, name: 'Ditto #51', set: 'Skyridge', img: 'assets/cards/ditto.png', kind: 'single', auction: true, price: 60, bids: 0, timeLeft: '4d 22h', lang: 'EN', cond: 'NM', seller: 'pocketfinity', verified: false, added: 14, shipping: 100, reserveMet: false, bidHistory: [] },
  ];

  const SELLERS = {
    pokechachaa: { rating: 5.0, reviews: 14 },
    dexversecardngames: { rating: 4.8, reviews: 9 },
    pocketfinity: { rating: 4.6, reviews: 3 },
  };

  function parseDuration(str) {
    const d = /(\d+)\s*d/.exec(str);
    const h = /(\d+)\s*h/.exec(str);
    const m = /(\d+)\s*m/.exec(str);
    return ((d ? +d[1] : 0) * 86400 + (h ? +h[1] : 0) * 3600 + (m ? +m[1] : 0) * 60) * 1000;
  }

  LISTINGS.forEach((item) => {
    if (item.auction) item.endsAt = Date.now() + parseDuration(item.timeLeft);
  });

  const state = { type: 'everything', lang: 'all', sort: 'newest', query: '', view: 'grid' };
  let cartCount = 0;

  let favorites = new Set();
  try { favorites = new Set(JSON.parse(localStorage.getItem('pc-favorites') || '[]')); } catch (e) { /* ignore */ }
  const saveFavorites = () => {
    try { localStorage.setItem('pc-favorites', JSON.stringify([...favorites])); } catch (e) { /* ignore */ }
  };

  const rupee = (n) => '₹' + n.toLocaleString('en-IN');

  const svgHeart = (filled) =>
    `<svg viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>`;
  const svgCheck = () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  const svgCart = () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
  const svgShare = () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.5" x2="15.4" y2="6.5"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/></svg>`;
  const svgChevron = (dir) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="${dir === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}"/></svg>`;
  const svgStar = () => `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2.5 15.1 8.9 22.1 9.9 17.1 14.8 18.3 21.8 12 18.5 5.7 21.8 6.9 14.8 1.9 9.9 8.9 8.9"/></svg>`;

  function formatBidTime(minutesAgo) {
    const d = new Date(Date.now() - minutesAgo * 60000);
    const datePart = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const timePart = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
    return `${datePart}, ${timePart}`;
  }

  function matchesFilters(item) {
    if (state.type === 'single' && item.kind !== 'single') return false;
    if (state.type === 'slab' && item.kind !== 'slab') return false;
    if (state.type === 'bundle' && item.kind !== 'bundle') return false;
    if (state.type === 'auction' && !item.auction) return false;
    if (state.lang !== 'all' && item.lang !== state.lang) return false;
    if (state.query) {
      const q = state.query.toLowerCase();
      const hay = `${item.name} ${item.set} ${item.seller}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function sortItems(items) {
    const sorted = items.slice();
    switch (state.sort) {
      case 'price-asc': sorted.sort((a, b) => a.price - b.price); break;
      case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
      case 'bids': sorted.sort((a, b) => (b.bids || 0) - (a.bids || 0)); break;
      default: sorted.sort((a, b) => b.added - a.added);
    }
    return sorted;
  }

  function cardHTML(item) {
    const fav = favorites.has(item.id);
    const badge = item.auction
      ? `<span class="mp-badge mp-badge-live"><span class="mp-stat-dot"></span>LIVE</span>`
      : item.kind === 'slab'
        ? `<span class="mp-badge mp-badge-slab">${item.grade}</span>`
        : `<span class="mp-badge mp-badge-chip">${item.lang} · ${item.cond}</span>`;

    const priceRow = item.auction
      ? `<div><span class="mp-card-price">${rupee(item.price)}</span><span class="mp-card-bids">${item.bids} bid${item.bids === 1 ? '' : 's'}</span></div>
         <button class="mp-action-btn mp-action-bid" data-bid="${item.id}" type="button">Bid</button>`
      : `<span class="mp-card-price">${rupee(item.price)}</span>
         <button class="mp-action-btn mp-action-cart" data-cart="${item.id}" type="button" aria-label="Add to cart">${svgCart()}</button>`;

    return `
      <article class="mp-card" data-id="${item.id}" role="button" tabindex="0" aria-label="View ${item.name} listing">
        <div class="mp-card-top">
          ${badge}
          <button class="mp-fav ${fav ? 'mp-fav-active' : ''}" data-fav="${item.id}" type="button" aria-label="Favorite">${svgHeart(fav)}</button>
        </div>
        <div class="mp-card-art-wrap">
          <img class="mp-card-art" src="${item.img}" alt="${item.name}" loading="lazy">
          ${item.auction ? `<span class="mp-card-time">${item.timeLeft}</span>` : ''}
        </div>
        <div class="mp-card-body">
          <div class="mp-card-price-row">${priceRow}</div>
          <div class="mp-card-name">${item.name}</div>
          <div class="mp-card-set">${item.set}</div>
        </div>
        <div class="mp-card-seller">
          <strong>@${item.seller}</strong>
          ${item.verified ? `<span class="mp-verified">${svgCheck()} Verified</span>` : ''}
        </div>
      </article>`;
  }

  function listRowHTML(item) {
    const fav = favorites.has(item.id);
    const badge = item.auction
      ? `<span class="mp-badge mp-badge-live"><span class="mp-stat-dot"></span>LIVE</span>`
      : item.kind === 'slab'
        ? `<span class="mp-badge mp-badge-slab">${item.grade}</span>`
        : `<span class="mp-badge mp-badge-chip">${item.lang} · ${item.cond}</span>`;

    const action = item.auction
      ? `<button class="mp-action-btn mp-action-bid" data-bid="${item.id}" type="button">Bid</button>`
      : `<button class="mp-action-btn mp-action-cart" data-cart="${item.id}" type="button" aria-label="Add to cart">${svgCart()}</button>`;

    return `
      <article class="mp-card mp-list-row" data-id="${item.id}" role="button" tabindex="0" aria-label="View ${item.name} listing">
        <div class="mp-list-thumb">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
          ${item.auction ? `<span class="mp-card-time mp-list-thumb-time">${item.timeLeft}</span>` : ''}
        </div>
        <div class="mp-list-main">
          <div class="mp-list-info">
            <div class="mp-list-name-row">${badge}<span class="mp-list-name">${item.name}</span></div>
            <div class="mp-list-set">${item.set}</div>
            <div class="mp-list-seller-row">
              <strong>@${item.seller}</strong>
              ${item.verified ? `<span class="mp-verified">${svgCheck()} Verified</span>` : ''}
            </div>
          </div>
          <div class="mp-list-right">
            <div class="mp-list-price-col">
              <span class="mp-card-price">${rupee(item.price)}</span>
              ${item.auction ? `<span class="mp-card-bids">${item.bids} bid${item.bids === 1 ? '' : 's'}</span>` : ''}
            </div>
            ${action}
            <button class="mp-fav ${fav ? 'mp-fav-active' : ''}" data-fav="${item.id}" type="button" aria-label="Favorite">${svgHeart(fav)}</button>
          </div>
        </div>
      </article>`;
  }

  function render() {
    const grid = document.getElementById('mpGrid');
    const empty = document.getElementById('mpEmpty');
    const count = document.getElementById('resultCount');

    const filtered = sortItems(LISTINGS.filter(matchesFilters));

    count.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'} found`;
    grid.classList.toggle('mp-grid-list', state.view === 'list');

    if (!filtered.length) {
      grid.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    const renderItem = state.view === 'list' ? listRowHTML : cardHTML;
    grid.innerHTML = filtered.map(renderItem).join('');
  }

  const langNames = { EN: 'English', JA: 'Japanese', KO: 'Korean', CN: 'Chinese' };

  function galleryHTML(item) {
    const images = item.images || [item.img];
    const multi = images.length > 1;
    return `
      <div class="mp-detail-gallery">
        <div class="mp-detail-main-img-wrap">
          ${multi ? `<button class="mp-detail-nav-btn mp-detail-nav-prev" data-gallery-prev type="button" aria-label="Previous image">${svgChevron('left')}</button>` : ''}
          <img class="mp-detail-main-img" id="mpDetailMainImg" src="${images[0]}" alt="${item.name}">
          ${multi ? `<button class="mp-detail-nav-btn mp-detail-nav-next" data-gallery-next type="button" aria-label="Next image">${svgChevron('right')}</button>` : ''}
          ${multi ? `<span class="mp-detail-counter" id="mpDetailCounter">1 / ${images.length}</span>` : ''}
        </div>
        ${multi ? `<div class="mp-detail-thumbs">${images.map((src, i) => `<button class="mp-detail-thumb ${i === 0 ? 'mp-detail-thumb-active' : ''}" data-gallery-thumb="${i}" type="button"><img src="${src}" alt=""></button>`).join('')}</div>` : ''}
      </div>`;
  }

  function auctionPanelHTML(item) {
    const remaining = Math.max(0, item.endsAt - Date.now());
    const ended = remaining <= 0;
    const hrs = Math.floor(remaining / 3600000);
    const min = Math.floor((remaining % 3600000) / 60000);
    const sec = Math.floor((remaining % 60000) / 1000);
    const pad = (n) => String(n).padStart(2, '0');
    const minBid = item.price + (item.price >= 10000 ? 500 : item.price >= 1000 ? 50 : 10);

    return `
      <div class="mp-detail-panel">
        <div class="mp-detail-auction-top">
          <div>
            <div class="mp-detail-panel-label">Current bid</div>
            <div class="mp-detail-price">${rupee(item.price)}</div>
          </div>
          ${!ended ? `
          <div class="mp-countdown-wrap">
            <div class="mp-detail-panel-label mp-countdown-label">Ends in</div>
            <div class="mp-countdown" id="mpCountdown">
              <div class="mp-countdown-box"><span id="mpCdHrs">${pad(hrs)}</span><small>HRS</small></div>
              <span class="mp-countdown-colon">:</span>
              <div class="mp-countdown-box"><span id="mpCdMin">${pad(min)}</span><small>MIN</small></div>
              <span class="mp-countdown-colon">:</span>
              <div class="mp-countdown-box"><span id="mpCdSec">${pad(sec)}</span><small>SEC</small></div>
            </div>
          </div>` : `<div class="mp-detail-ended">Auction ended</div>`}
        </div>
        <div class="mp-detail-bid-status">${item.bids} bid${item.bids === 1 ? '' : 's'} · ${item.reserveMet ? 'Reserve met' : 'Reserve not met'}</div>

        ${!ended ? `
        <div class="mp-detail-bid-form">
          <input type="number" id="mpBidInput" class="mp-detail-bid-input" value="${minBid}" min="${minBid}" step="1">
          <button class="mp-modal-action mp-modal-action-bid" id="mpPlaceBidBtn" type="button">Place bid</button>
        </div>
        <div class="mp-detail-min-bid">Minimum bid: ${rupee(minBid)}</div>` : ''}
      </div>`;
  }

  function buyNowPanelHTML(item) {
    return `
      <div class="mp-detail-panel">
        <div class="mp-detail-panel-label">Price</div>
        <div class="mp-detail-price">${rupee(item.price)}</div>
        <button class="mp-modal-action mp-modal-action-cart" data-modal-cart="${item.id}" type="button">Add to cart</button>
      </div>`;
  }

  function bidHistoryHTML(item) {
    const rows = (item.bidHistory || []).slice().sort((a, b) => a.minutesAgo - b.minutesAgo);
    return `
      <div class="mp-detail-panel">
        <div class="mp-detail-panel-label">Bid history</div>
        ${rows.length ? rows.map((b) => `
          <div class="mp-bid-row">
            <div>
              <a href="#" class="mp-bid-user" onclick="return false">@${b.user}</a>
              <div class="mp-bid-time">${formatBidTime(b.minutesAgo)}</div>
            </div>
            <div class="mp-bid-amount">${rupee(b.amount)}</div>
          </div>`).join('') : `<p class="mp-bid-empty">No bids yet — be the first.</p>`}
      </div>`;
  }

  function detailHTML(item) {
    const fav = favorites.has(item.id);
    const badge = item.auction
      ? `<span class="mp-badge mp-badge-live"><span class="mp-stat-dot"></span>LIVE</span>`
      : item.kind === 'slab'
        ? `<span class="mp-badge mp-badge-slab">${item.grade}</span>`
        : `<span class="mp-badge mp-badge-chip">${item.lang} · ${item.cond}</span>`;

    const conditionLabel = item.kind === 'slab' ? 'Grade' : 'Condition';
    const conditionValue = item.kind === 'slab' ? item.grade : item.cond;
    const seller = SELLERS[item.seller] || { rating: 5.0, reviews: 0 };

    return `
      ${galleryHTML(item)}
      <div class="mp-detail-info">
        <div class="mp-detail-top">
          ${badge}
          <div class="mp-detail-icons">
            <button class="mp-fav" id="mpShareBtn" type="button" aria-label="Share">${svgShare()}</button>
            <button class="mp-fav ${fav ? 'mp-fav-active' : ''}" data-fav="${item.id}" type="button" aria-label="Favorite">${svgHeart(fav)}</button>
          </div>
        </div>
        <h2 class="mp-detail-name">${item.name}</h2>
        <div class="mp-detail-subtitle">${item.set} · ${langNames[item.lang] || item.lang} · ${conditionValue}</div>

        ${item.auction ? auctionPanelHTML(item) : buyNowPanelHTML(item)}
        ${item.auction ? bidHistoryHTML(item) : ''}

        <div class="mp-detail-panel">
          <div class="mp-detail-panel-label">${conditionLabel}</div>
          <div class="mp-detail-condition-value">${conditionValue}</div>
        </div>

        <div class="mp-detail-panel">
          <div class="mp-detail-seller-row">
            <a href="#" class="mp-bid-user" onclick="return false">@${item.seller}</a>
            ${item.verified ? `<span class="mp-verified">${svgCheck()} Verified</span>` : `<span class="mp-unverified">Unverified seller</span>`}
            <span class="mp-detail-rating">${svgStar()} ${seller.rating.toFixed(1)} (${seller.reviews} rating${seller.reviews === 1 ? '' : 's'})</span>
          </div>
          <div class="mp-detail-shipping">+ ${rupee(item.shipping)} shipping</div>
          <p class="mp-detail-policy">Please keep all payment and shipping arrangements on PokéCollectr — no off-platform deals${item.auction ? ' during an active auction' : ''}.</p>
        </div>
      </div>`;
  }

  const modalBackdrop = document.getElementById('mpModalBackdrop');
  const modalBody = document.getElementById('mpModalBody');
  let activeItem = null;
  let countdownTimer = null;
  let galleryIndex = 0;

  function refreshCountdown() {
    if (!activeItem || !activeItem.auction) return;
    const remaining = Math.max(0, activeItem.endsAt - Date.now());
    if (remaining <= 0) {
      clearInterval(countdownTimer);
      renderDetail();
      return;
    }
    const hrs = Math.floor(remaining / 3600000);
    const min = Math.floor((remaining % 3600000) / 60000);
    const sec = Math.floor((remaining % 60000) / 1000);
    const pad = (n) => String(n).padStart(2, '0');
    const hrsEl = document.getElementById('mpCdHrs');
    if (hrsEl) {
      hrsEl.textContent = pad(hrs);
      document.getElementById('mpCdMin').textContent = pad(min);
      document.getElementById('mpCdSec').textContent = pad(sec);
    }
  }

  function renderDetail() {
    galleryIndex = 0;
    modalBody.innerHTML = detailHTML(activeItem);
    if (activeItem.auction) {
      clearInterval(countdownTimer);
      countdownTimer = setInterval(refreshCountdown, 1000);
    }
  }

  function openModal(item) {
    activeItem = item;
    renderDetail();
    modalBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.hidden = true;
    activeItem = null;
    clearInterval(countdownTimer);
    document.body.style.overflow = '';
  }

  document.getElementById('mpModalClose').addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalBackdrop.hidden) closeModal();
  });

  modalBody.addEventListener('click', (e) => {
    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
      const id = Number(favBtn.dataset.fav);
      if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
      saveFavorites();
      if (activeItem) renderDetail();
      render();
      return;
    }
    if (e.target.closest('#mpShareBtn')) {
      showToast('Link copied to clipboard');
      return;
    }
    if (e.target.closest('[data-gallery-prev]') || e.target.closest('[data-gallery-next]') || e.target.closest('[data-gallery-thumb]')) {
      const images = activeItem.images || [activeItem.img];
      const thumbBtn = e.target.closest('[data-gallery-thumb]');
      if (thumbBtn) galleryIndex = Number(thumbBtn.dataset.galleryThumb);
      else if (e.target.closest('[data-gallery-next]')) galleryIndex = (galleryIndex + 1) % images.length;
      else galleryIndex = (galleryIndex - 1 + images.length) % images.length;
      document.getElementById('mpDetailMainImg').src = images[galleryIndex];
      document.getElementById('mpDetailCounter').textContent = `${galleryIndex + 1} / ${images.length}`;
      modalBody.querySelectorAll('.mp-detail-thumb').forEach((t, i) => t.classList.toggle('mp-detail-thumb-active', i === galleryIndex));
      return;
    }
    if (e.target.closest('#mpPlaceBidBtn')) {
      const input = document.getElementById('mpBidInput');
      const amount = Number(input.value);
      const minBid = Number(input.min);
      if (!amount || amount < minBid) {
        showToast(`Enter at least ${rupee(minBid)}`);
        return;
      }
      activeItem.price = amount;
      activeItem.bids += 1;
      activeItem.bidHistory = activeItem.bidHistory || [];
      activeItem.bidHistory.unshift({ user: 'abcthestar', amount, minutesAgo: 0 });
      renderDetail();
      render();
      showToast(`Bid placed on ${activeItem.name}`);
      return;
    }
    const cartBtn = e.target.closest('[data-modal-cart]');
    if (cartBtn) {
      cartCount += 1;
      const badge = document.getElementById('cartBadge');
      badge.hidden = false;
      badge.textContent = String(cartCount);
      showToast(`${activeItem.name} added to cart`);
      return;
    }
  });

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.hidden = true; }, 1800);
  }

  function setActivePill(row, btn) {
    row.querySelectorAll('.mp-pill').forEach((p) => p.classList.remove('mp-pill-active'));
    btn.classList.add('mp-pill-active');
  }

  // filters
  const typeRow = document.getElementById('typeFilters');
  typeRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.mp-pill');
    if (!btn) return;
    state.type = btn.dataset.type;
    setActivePill(typeRow, btn);
    render();
  });

  document.getElementById('langSelect').addEventListener('change', (e) => {
    state.lang = e.target.value;
    render();
  });

  // sort
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sort = e.target.value;
    render();
  });

  // view toggle
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');
  gridBtn.addEventListener('click', () => {
    state.view = 'grid';
    gridBtn.classList.add('mp-view-active');
    listBtn.classList.remove('mp-view-active');
    render();
  });
  listBtn.addEventListener('click', () => {
    state.view = 'list';
    listBtn.classList.add('mp-view-active');
    gridBtn.classList.remove('mp-view-active');
    render();
  });

  // search
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  searchInput.addEventListener('input', () => {
    state.query = searchInput.value.trim();
    searchClear.hidden = !state.query;
    render();
  });
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.query = '';
    searchClear.hidden = true;
    searchInput.focus();
    render();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // card actions (event delegation)
  const mpGrid = document.getElementById('mpGrid');
  mpGrid.addEventListener('click', (e) => {
    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
      const id = Number(favBtn.dataset.fav);
      if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
      saveFavorites();
      render();
      return;
    }
    const bidBtn = e.target.closest('[data-bid]');
    if (bidBtn) {
      const item = LISTINGS.find((l) => l.id === Number(bidBtn.dataset.bid));
      showToast(`Bid placed on ${item.name}`);
      return;
    }
    const cartBtn = e.target.closest('[data-cart]');
    if (cartBtn) {
      const item = LISTINGS.find((l) => l.id === Number(cartBtn.dataset.cart));
      cartCount += 1;
      const badge = document.getElementById('cartBadge');
      badge.hidden = false;
      badge.textContent = String(cartCount);
      showToast(`${item.name} added to cart`);
      return;
    }
    const card = e.target.closest('.mp-card');
    if (card) {
      const item = LISTINGS.find((l) => l.id === Number(card.dataset.id));
      if (item) openModal(item);
    }
  });
  mpGrid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.mp-card');
    if (!card) return;
    e.preventDefault();
    const item = LISTINGS.find((l) => l.id === Number(card.dataset.id));
    if (item) openModal(item);
  });

  // sell CTA
  document.querySelector('.mp-sell-cta').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Sell flow coming soon');
  });

  // avatar dropdown
  const avatarBtn = document.getElementById('avatarBtn');
  const avatarDropdown = document.getElementById('avatarDropdown');
  avatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !avatarDropdown.hidden;
    avatarDropdown.hidden = open;
    avatarBtn.setAttribute('aria-expanded', String(!open));
  });
  document.addEventListener('click', (e) => {
    if (!avatarDropdown.hidden && !e.target.closest('.avatar-menu')) {
      avatarDropdown.hidden = true;
      avatarBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // notification / chat buttons — light toast, no backend
  document.getElementById('notifBtn').addEventListener('click', () => showToast('1 new notification: your Alakazam ex auction has a new bid'));
  document.getElementById('chatBtn').addEventListener('click', () => showToast('1 new message from @pokechachaa'));
  document.getElementById('cartBtn').addEventListener('click', () => {
    showToast(cartCount ? `${cartCount} item${cartCount === 1 ? '' : 's'} in cart` : 'Your cart is empty');
  });

  render();
})();
