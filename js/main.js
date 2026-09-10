document.addEventListener('DOMContentLoaded', () => {

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

});
