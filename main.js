// Recommendations slider
(function () {
  const track = document.querySelector('.rec-track');
  const dotsContainer = document.querySelector('.rec-dots');
  const cards = document.querySelectorAll('.rec-card');
  const prev = document.querySelector('.rec-arrow-prev');
  const next = document.querySelector('.rec-arrow-next');
  if (!track || !cards.length) return;

  let current = 0;

  // Build dots
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
})();

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
