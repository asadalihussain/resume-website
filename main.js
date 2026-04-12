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
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll(
  '.section-headline, .about-body, .award-item, .expertise-card, ' +
  '.timeline-item, .volunteer-card, .edu-card, .contact-headline'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
