(() => {
  const LISTINGS = [
    { id: 1, name: 'Alakazam ex', set: 'Scarlet & Violet · 151', img: 'assets/cards/alakazam-ex-hero-right.webp', kind: 'single', auction: true, price: 610, bids: 3, timeLeft: '1d 4h', lang: 'EN', cond: 'NM', seller: 'pokechachaa', verified: true, added: 1 },
    { id: 2, name: 'Mew ex', set: 'Scarlet & Violet · 151', img: 'assets/cards/mew-ex-hero-left.webp', kind: 'single', auction: true, price: 590, bids: 1, timeLeft: '2d 11h', lang: 'EN', cond: 'LP', seller: 'dexversecardngames', verified: true, added: 2 },
    { id: 3, name: 'Mega Charizard X ex', set: 'Mega Evolution', img: 'assets/cards/charizard-ex-hero-center.webp', kind: 'single', auction: true, price: 1450, bids: 5, timeLeft: '6h 20m', lang: 'EN', cond: 'M', seller: 'pokechachaa', verified: true, added: 3 },
    { id: 4, name: 'Ditto #51', set: 'Skyridge', img: 'assets/cards/ditto.png', kind: 'single', price: 9000, lang: 'EN', cond: 'NM', seller: 'pocketfinity', verified: false, added: 4 },
    { id: 5, name: 'Flareon #10', set: 'Legendary Collection', img: 'assets/cards/flareon.png', kind: 'single', price: 6000, lang: 'EN', cond: 'LP', seller: 'pokechachaa', verified: true, added: 5 },
    { id: 6, name: 'Light Jolteon #48', set: 'Neo Destiny', img: 'assets/cards/jolteon.png', kind: 'single', price: 12000, lang: 'EN', cond: 'LP', seller: 'pokechachaa', verified: true, added: 6 },
    { id: 7, name: 'Magneton #11', set: 'Fossil', img: 'assets/cards/magneton.png', kind: 'single', price: 2600, lang: 'EN', cond: 'NM', seller: 'dexversecardngames', verified: true, added: 7 },
    { id: 8, name: 'Poliwrath #13', set: 'Base Set', img: 'assets/cards/poliwrath.png', kind: 'single', price: 2750, lang: 'EN', cond: 'LP', seller: 'pokechachaa', verified: true, added: 8 },
    { id: 9, name: 'Psyduck #79', set: 'Neo Destiny', img: 'assets/cards/psyduck.png', kind: 'single', price: 7500, lang: 'EN', cond: 'NM', seller: 'pocketfinity', verified: false, added: 9 },
    { id: 10, name: 'Mew ex', set: 'Scarlet & Violet · 151', img: 'assets/cards/mew-ex-hero-left.webp', kind: 'single', price: 21000, lang: 'JA', cond: 'M', seller: 'dexversecardngames', verified: true, added: 10 },
    { id: 11, name: 'Mega Charizard X ex', set: 'Mega Evolution', img: 'assets/cards/charizard-ex-hero-center.webp', kind: 'slab', price: 42500, lang: 'EN', grade: 'CGC 9.5', seller: 'pokechachaa', verified: true, added: 11 },
    { id: 12, name: 'Alakazam ex', set: 'Scarlet & Violet · 151', img: 'assets/cards/alakazam-ex-hero-right.webp', kind: 'single', price: 3200, lang: 'JA', cond: 'LP', seller: 'pocketfinity', verified: false, added: 12 },
    { id: 13, name: 'Magneton #11', set: 'Fossil', img: 'assets/cards/magneton.png', kind: 'slab', price: 4800, lang: 'EN', grade: 'PSA 9', seller: 'dexversecardngames', verified: true, added: 13 },
    { id: 14, name: 'Ditto #51', set: 'Skyridge', img: 'assets/cards/ditto.png', kind: 'single', auction: true, price: 60, bids: 0, timeLeft: '4d 22h', lang: 'EN', cond: 'NM', seller: 'pocketfinity', verified: false, added: 14 },
  ];

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
      <article class="mp-card" data-id="${item.id}">
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

  function renderStats() {
    const sellers = new Set(LISTINGS.map((l) => l.seller)).size;
    const slabs = LISTINGS.filter((l) => l.kind === 'slab').length;
    const auctionsLive = LISTINGS.filter((l) => l.auction).length;
    const prices = LISTINGS.map((l) => l.price);
    const min = Math.min(...prices), max = Math.max(...prices);
    document.getElementById('mpStats').innerHTML = `
      <span><strong>${LISTINGS.length}</strong> listed</span>
      <span><strong>${sellers}</strong> sellers</span>
      <span><strong>${slabs}</strong> slabs</span>
      <span>${rupee(min)}–${rupee(max)} range</span>
      <span class="mp-stat-live"><span class="mp-stat-dot"></span>${auctionsLive} auctions live</span>
    `;
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
    grid.innerHTML = filtered.map(cardHTML).join('');
  }

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

  const langRow = document.getElementById('langFilters');
  langRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.mp-pill');
    if (!btn) return;
    state.lang = btn.dataset.lang;
    setActivePill(langRow, btn);
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
  document.getElementById('mpGrid').addEventListener('click', (e) => {
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

  renderStats();
  render();
})();
