/* ─── Nav: scroll state ─────────────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');

  const updateNav = () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

/* ─── Mobile hamburger ──────────────────────────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  if (!hamburger || !navMobile) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  // Close on link click
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });
})();

/* ─── Intersection Observer: fade-in ────────────────────────────────────── */
(function () {
  const elements = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ─── Staggered card animations ─────────────────────────────────────────── */
(function () {
  const grids = document.querySelectorAll('.projects-grid, .certs-grid, .awards-list');

  grids.forEach(grid => {
    const cards = grid.querySelectorAll('.fade-in');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.07}s`;
    });
  });
})();

/* ─── Smooth active nav link highlight ──────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.blog-link)');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    let current = '';

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--accent)';
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ─── Terminal cursor blink in hero ─────────────────────────────────────── */
(function () {
  // Hero greeting already has CSS blink via ::before pseudo
  // Add a subtle typing effect to the tagline
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;

  const text = tagline.textContent.trim();
  tagline.textContent = '';
  tagline.style.borderRight = '2px solid var(--accent)';

  let i = 0;
  const type = () => {
    if (i < text.length) {
      tagline.textContent += text[i++];
      setTimeout(type, 38);
    } else {
      // Remove cursor after typing
      setTimeout(() => {
        tagline.style.borderRight = 'none';
      }, 800);
    }
  };

  // Delay start until hero is visible
  setTimeout(type, 600);
})();
