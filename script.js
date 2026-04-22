(function () {
  /* ── theme toggle ─────────────────────── */
  const root = document.documentElement;
  root.setAttribute('data-theme', 'dark');

  /* ── smooth-scroll nav + scroll-spy ──── */
  const tabs = document.querySelectorAll('.tab-link');
  const sections = ['profile', 'project', 'contact'].map(id => document.getElementById(id)).filter(Boolean);

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(tab.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  function onScroll() {
    let current = sections[0].id;
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── sidebar nav active state ─────────── */
  document.querySelectorAll('.sidebar-nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.querySelectorAll('.sidebar-nav a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });

  /* ── animated grid canvas ────────────── */
  const canvas = document.getElementById('grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
  }

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(61,155,255,0.09)';
    ctx.lineWidth = 1;
    const step = 64;
    for (let x = 0; x <= canvas.width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(0,0,0,0.015)';
    for (let y = 0; y < canvas.height; y += 4) {
      ctx.fillRect(0, y, canvas.width, 2);
    }
  }

  resize();
  window.addEventListener('resize', resize);

  /* ── contact form ────────────────────── */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function () {
      status.textContent = 'Opening your email app…';
    });
  }
}());
