(() => {
  'use strict';
  const html = document.documentElement;
  const themeButton = document.querySelector('#themeToggle');
  const menuButton = document.querySelector('#menuToggle');
  const menu = document.querySelector('#mobileNav');
  const progress = document.querySelector('#scrollProgress');
  const toast = document.querySelector('#toast');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // A user-selected theme takes precedence over system preference.
  let preferred = null;
  try { preferred = localStorage.getItem('portfolio-theme'); } catch (_) {}
  if (!['light', 'dark'].includes(preferred)) {
    preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  function setTheme(theme) {
    html.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#0b0f16' : '#f3f5f2');
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
  }
  setTheme(preferred);
  themeButton.addEventListener('click', () => setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark'));

  function closeMenu() {
    menu.hidden = true;
    menuButton.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (!menu.hidden && !menu.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  // Minimal scroll progress; no animation loop or expensive layout work.
  let scheduled = false;
  function syncScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(syncScroll); }
  }, {passive: true});
  window.addEventListener('resize', syncScroll, {passive: true});
  syncScroll();

  // Progressive enhancement: content never disappears when observers are unavailable.
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold: 0.09, rootMargin: '0px 0px -24px 0px'});
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('will-reveal');
      revealObserver.observe(el);
    });
  }

  const filters = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.project-card')];
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(b => {
      const selected = b === button;
      b.classList.toggle('active', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.categories.split(' ').includes(filter);
      card.hidden = !match;
    });
  }));

  let toastTimeout;
  function announce(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove('show'), 2800);
  }
  document.querySelector('#copyEmail').addEventListener('click', async event => {
    const email = event.currentTarget.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      announce('Email address copied');
    } catch (_) {
      window.location.href = `mailto:${email}`;
    }
  });
  document.querySelector('#footerYear').textContent = String(new Date().getFullYear());

  const sectionIds = ['work', 'experience', 'expertise', 'about'];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.desktop-nav a').forEach(a => {
            if (a.dataset.nav === entry.target.id) a.setAttribute('aria-current', 'location');
            else a.removeAttribute('aria-current');
          });
        }
      });
    }, {rootMargin: '-30% 0px -55% 0px'});
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) navObserver.observe(el); });
  }
})();
