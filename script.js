document.addEventListener('DOMContentLoaded', () => {
  const bubbles = document.querySelectorAll('.bubble[data-delay]');
  const sideLinks = document.querySelectorAll('.side-link');
  const sections = document.querySelectorAll('.section[id]');
  const dateEl = document.getElementById('currentDate');

  // Current date display
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Staggered bubble entrance
  const bubbleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10) * 80;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          bubbleObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  bubbles.forEach((bubble) => bubbleObserver.observe(bubble));

  // Side nav active state on scroll
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sideLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.25, rootMargin: '-15% 0px -55% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Smooth scroll offset for sticky contexts
  sideLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
