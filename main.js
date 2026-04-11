// Scroll-spy: add 'scrolled' class to nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(255,255,255,0.97)'
    : 'rgba(255,255,255,0.85)';
});

// Fade-up on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.section-title, .about-text, .about-awards, .skill-card, ' +
  '.timeline-item, .volunteer-card, .edu-card, .award-card'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
