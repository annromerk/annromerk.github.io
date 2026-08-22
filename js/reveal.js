// Subtle scroll-reveal: fades sections in as they enter the viewport.
// Progressive enhancement only — the 'reveal' class is added here in JS,
// so content stays fully visible if this script fails to load or run.

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('main > section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  sections.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
