// ─── Scroll Progress Bar ────────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
}, { passive: true });

// ─── Hero Parallax ──────────────────────────────────────────────
const heroName = document.querySelector('.hero-name');
window.addEventListener('scroll', () => {
  if (!heroName) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight * 1.2) {
    heroName.style.transform = `translateY(${scrollY * 0.12}px)`;
  }
}, { passive: true });

// ─── Counter Animation ───────────────────────────────────────────
function animateCounter(el) {
  const text = el.textContent.trim();
  const match = text.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return;
  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr);
  const duration = 1600;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stat-value').forEach(el => statObserver.observe(el));

// ─── Active Nav Link ─────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-inner a[href^="#"]');
const navSections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' });

navSections.forEach(s => navObserver.observe(s));

// ─── Swipe Helper ────────────────────────────────────────────────
function addSwipe(el, onLeft, onRight) {
  let startX = 0;
  el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? onLeft() : onRight();
  }, { passive: true });
}

// ─── Recommendations Slider ──────────────────────────────────────
(function () {
  const wrapper = document.querySelector('.rec-track-wrapper');
  const track = document.querySelector('.rec-track');
  const dotsContainer = document.querySelector('.rec-dots');
  const cards = document.querySelectorAll('.rec-card');
  const prev = document.querySelector('.rec-arrow-prev');
  const next = document.querySelector('.rec-arrow-next');
  if (!track || !cards.length) return;

  let current = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'rec-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.rec-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  addSwipe(wrapper, () => goTo(current + 1), () => goTo(current - 1));

  // Auto-advance
  let autoPlay = setInterval(() => goTo(current + 1), 5000);
  wrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
  wrapper.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goTo(current + 1), 5000);
  });

  // Keyboard
  wrapper.setAttribute('tabindex', '0');
  wrapper.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });
})();

// ─── Case Studies Slider ─────────────────────────────────────────
(function () {
  const wrapper = document.querySelector('.case-track-wrapper');
  const track = document.querySelector('.case-track');
  const dotsContainer = document.querySelector('.case-dots');
  const cards = document.querySelectorAll('.case-card');
  const prev = document.querySelector('.case-arrow-prev');
  const next = document.querySelector('.case-arrow-next');
  if (!track || !cards.length) return;

  let current = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'case-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.case-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  addSwipe(wrapper, () => goTo(current + 1), () => goTo(current - 1));

  // Keyboard
  wrapper.setAttribute('tabindex', '0');
  wrapper.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });
})();

// ─── Scroll Fade-In (with stagger for cards & timeline) ──────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);

// Base fade-up elements (no stagger)
document.querySelectorAll(
  '.section-headline, .about-body, .award-item, .volunteer-card, .edu-card, .contact-headline'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Expertise cards — staggered via CSS nth-child delays in style.css
document.querySelectorAll('.expertise-card').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Timeline items — staggered via CSS nth-child delays in style.css
document.querySelectorAll('.timeline-item').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
