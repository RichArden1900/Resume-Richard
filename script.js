(function () {
  /* ── THEME TOGGLE ───────────────────────── */
  const root = document.documentElement;
  const btn  = document.querySelector('[data-theme-toggle]');
  const moon = btn && btn.querySelector('.icon-moon');
  const sun  = btn && btn.querySelector('.icon-sun');
  let theme  = 'dark';
  root.setAttribute('data-theme', theme);

  function applyTheme(t) {
    theme = t;
    root.setAttribute('data-theme', t);
    if (moon) moon.style.display = t === 'dark'  ? '' : 'none';
    if (sun)  sun.style.display  = t === 'light' ? '' : 'none';
    if (btn)  btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  applyTheme('dark');
  if (btn) btn.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));

  /* ── SCROLL REVEAL ──────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(el => io.observe(el));

  /* ── SCROLL-SPY NAV ─────────────────────── */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  function spyScroll() {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
    });
  }
  window.addEventListener('scroll', spyScroll, { passive: true });
  spyScroll();

  /* ── CONTACT FORM ───────────────────────── */
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', () => {
      status.textContent = 'Opening your email app…';
    });
  }
}());
