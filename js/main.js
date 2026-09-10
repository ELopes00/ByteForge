/* ============================================================
   Fake account system — DEMO ONLY.
   Everything lives in this browser's localStorage. There is no
   server, so this must never be used with a real password, and
   it offers no real security (anyone with devtools access to
   this browser profile can read or edit the data).
   ============================================================ */
const BF_USERS_KEY = 'byteforge_users';
const BF_SESSION_KEY = 'byteforge_session';
const BF_ORDERS_KEY = 'byteforge_orders';
const BF_PENDING_KEY = 'byteforge_pending_item';

async function bfHash(text) {
  if (window.crypto?.subtle) {
    try {
      const bytes = new TextEncoder().encode(text);
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
    } catch { /* fall through to the fallback below */ }
  }
  /* Fallback for contexts where the Web Crypto API isn't available
     (some browsers restrict it outside http/https). Still just
     obfuscation, not real security — see the on-page disclaimer. */
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
  return 'fallback-' + h.toString(16);
}
function bfGetUsers() {
  try { return JSON.parse(localStorage.getItem(BF_USERS_KEY)) || []; } catch { return []; }
}
function bfSaveUsers(users) { localStorage.setItem(BF_USERS_KEY, JSON.stringify(users)); }
function bfGetSession() { return localStorage.getItem(BF_SESSION_KEY); }
function bfSetSession(email) {
  if (email) localStorage.setItem(BF_SESSION_KEY, email);
  else localStorage.removeItem(BF_SESSION_KEY);
}
function bfCurrentUser() {
  const email = bfGetSession();
  if (!email) return null;
  return bfGetUsers().find(u => u.email === email) || null;
}
function bfGetOrders() {
  try { return JSON.parse(localStorage.getItem(BF_ORDERS_KEY)) || []; } catch { return []; }
}
function bfSaveOrders(orders) { localStorage.setItem(BF_ORDERS_KEY, JSON.stringify(orders)); }
function bfAddOrder(email, item) {
  const orders = bfGetOrders();
  orders.push({
    id: 'BF' + Date.now().toString(36).toUpperCase(),
    userEmail: email,
    date: Date.now(),
    item: item.name,
    price: item.price,
  });
  bfSaveOrders(orders);
}
function bfShippingStatus(order) {
  const steps = ['Pedido confirmado', 'Em preparação', 'Enviado', 'Em trânsito', 'Entregue'];
  const thresholds = [0, 1, 2, 4, 6]; // days elapsed since purchase
  const days = (Date.now() - order.date) / 86400000;
  let current = 0;
  thresholds.forEach((t, i) => { if (days >= t) current = i; });
  return { steps, current };
}
function bfFormatBRL(value) {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function bfUpdateNavAccount() {
  const link = document.getElementById('navAccountLink');
  if (!link) return;
  const label = link.querySelector('span');
  const user = bfCurrentUser();
  if (user) {
    if (label) label.textContent = user.name.split(' ')[0];
    link.setAttribute('aria-label', `Minha conta (${user.name})`);
  } else {
    if (label) label.textContent = 'Account';
    link.setAttribute('aria-label', 'Minha conta');
  }
}

document.addEventListener('DOMContentLoaded', () => {

  bfUpdateNavAccount();

  /* "Buy now" buttons on product cards */
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const name = card?.querySelector('h3')?.textContent.trim() || 'Product';
      const priceText = card?.querySelector('.price')?.textContent.trim() || '';
      const price = parseFloat(priceText.replace('R$', '').trim().replace(/\./g, '').replace(',', '.')) || 0;
      const user = bfCurrentUser();
      if (user) {
        bfAddOrder(user.email, { name, price });
        const original = btn.textContent;
        btn.textContent = 'Added ✓';
        btn.classList.add('added');
        setTimeout(() => { btn.textContent = original; btn.classList.remove('added'); }, 2200);
      } else {
        sessionStorage.setItem(BF_PENDING_KEY, JSON.stringify({ name, price }));
        location.href = 'account.html?next=buy';
      }
    });
  });

  /* Mobile nav toggle */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* FAQ accordion (keyboard-accessible) */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const q = item.querySelector('.accordion-q');
    if (!q) return;
    q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    const toggle = () => {
      const wasOpen = item.classList.contains('open');
      const group = item.closest('.faq-group');
      group?.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      group?.querySelectorAll('.accordion-q').forEach(otherQ => otherQ.setAttribute('aria-expanded', 'false'));
      if (!wasOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    };
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* FAQ search filter */
  const searchInput = document.getElementById('faqSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('.accordion-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = term === '' || text.includes(term) ? '' : 'none';
      });
      document.querySelectorAll('.faq-group').forEach(group => {
        const visible = [...group.querySelectorAll('.accordion-item')].some(i => i.style.display !== 'none');
        group.style.display = visible ? '' : 'none';
      });
    });
  }

  /* FAQ category chip / side-nav scroll */
  document.querySelectorAll('.faq-categories .chip, .faq-nav a').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const targetSel = chip.getAttribute('href') || chip.dataset.target;
      if (targetSel && targetSel.startsWith('#')) {
        const el = document.querySelector(targetSel);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* Product filter chips */
  const chips = document.querySelectorAll('.filter-bar .chip');
  const products = document.querySelectorAll('.product-card');
  if (chips.length && products.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        const filter = chip.dataset.filter;
        products.forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
        });
      });
    });
  }

  /* Contact form (front-end only demo) */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('formSuccess');
      if (success) success.classList.add('show');
      form.reset();
    });
  }

  /* Newsletter form (front-end only demo) */
  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletter.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      newsletter.querySelector('input').value = '';
      setTimeout(() => (btn.textContent = original), 2500);
    });
  }

  /* Active nav link based on current page */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* Account page: login, register, order history */
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const authGate = document.getElementById('authGate');
  const dashboard = document.getElementById('accountDashboard');

  if (loginForm && registerForm && authGate && dashboard) {

    const pendingNote = document.getElementById('pendingNote');
    if (new URLSearchParams(location.search).get('next') === 'buy' && pendingNote) {
      pendingNote.classList.add('show');
    }

    function bfRenderOrders(email) {
      const list = document.getElementById('ordersList');
      const empty = document.getElementById('ordersEmpty');
      if (!list) return;
      const orders = bfGetOrders().filter(o => o.userEmail === email).sort((a, b) => b.date - a.date);
      list.innerHTML = '';
      if (!orders.length) { empty?.classList.remove('hide'); return; }
      empty?.classList.add('hide');

      orders.forEach(order => {
        const { steps, current } = bfShippingStatus(order);
        const fillPct = (current / (steps.length - 1)) * 100;

        const card = document.createElement('div');
        card.className = 'order-card';

        const top = document.createElement('div');
        top.className = 'order-top';

        const left = document.createElement('div');
        const idEl = document.createElement('div');
        idEl.className = 'order-id';
        idEl.textContent = `Pedido ${order.id}`;
        const nameEl = document.createElement('h3');
        nameEl.style.cssText = 'margin:2px 0 0;font-size:1.05rem;';
        nameEl.textContent = order.item;
        left.append(idEl, nameEl);

        const right = document.createElement('div');
        right.style.textAlign = 'right';
        const priceEl = document.createElement('div');
        priceEl.className = 'price';
        priceEl.textContent = bfFormatBRL(order.price);
        const dateEl = document.createElement('div');
        dateEl.style.cssText = 'font-size:.78rem;color:var(--text-70);';
        dateEl.textContent = new Date(order.date).toLocaleDateString('pt-BR');
        right.append(priceEl, dateEl);

        top.append(left, right);

        const stepsWrap = document.createElement('div');
        const track = document.createElement('div');
        track.className = 'order-steps-track';
        const fill = document.createElement('div');
        fill.className = 'order-steps-fill';
        fill.style.width = fillPct + '%';
        track.appendChild(fill);
        const labels = document.createElement('div');
        labels.className = 'order-steps-labels';
        steps.forEach((s, i) => {
          const span = document.createElement('span');
          span.textContent = s;
          if (i < current) span.className = 'done';
          else if (i === current) span.className = 'current';
          labels.appendChild(span);
        });
        stepsWrap.append(track, labels);

        card.append(top, stepsWrap);
        list.appendChild(card);
      });
    }

    function bfShowDashboard(user) {
      authGate.classList.add('hide');
      dashboard.classList.add('show');
      const nameEl = document.getElementById('accountUserName');
      if (nameEl) nameEl.textContent = user.name;
      bfRenderOrders(user.email);
      bfUpdateNavAccount();
    }

    function bfShowAuthGate() {
      dashboard.classList.remove('show');
      authGate.classList.remove('hide');
    }

    function bfConsumePendingPurchase(email) {
      const raw = sessionStorage.getItem(BF_PENDING_KEY);
      if (!raw) return;
      sessionStorage.removeItem(BF_PENDING_KEY);
      try {
        const item = JSON.parse(raw);
        if (item && item.name) bfAddOrder(email, item);
      } catch { /* ignore malformed pending item */ }
    }

    const existingUser = bfCurrentUser();
    if (existingUser) bfShowDashboard(existingUser);

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;
      const error = document.getElementById('loginError');
      const hash = await bfHash(password);
      const user = bfGetUsers().find(u => u.email === email && u.passwordHash === hash);
      if (!user) { error?.classList.add('show'); return; }
      error?.classList.remove('show');
      bfSetSession(email);
      bfConsumePendingPurchase(email);
      bfShowDashboard(user);
    });

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('registerName').value.trim();
      const email = document.getElementById('registerEmail').value.trim().toLowerCase();
      const password = document.getElementById('registerPassword').value;
      const error = document.getElementById('registerError');
      const users = bfGetUsers();
      if (users.some(u => u.email === email)) {
        if (error) { error.textContent = 'Já existe uma conta com este e-mail.'; error.classList.add('show'); }
        return;
      }
      error?.classList.remove('show');
      const passwordHash = await bfHash(password);
      users.push({ name, email, passwordHash });
      bfSaveUsers(users);
      bfSetSession(email);
      bfConsumePendingPurchase(email);
      bfShowDashboard({ name, email });
    });

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      bfSetSession(null);
      bfShowAuthGate();
      bfUpdateNavAccount();
    });
  }

});
