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

  // Check each section's CURRENT position before deciding whether to
  // animate it. On a refresh where the browser restores scroll position,
  // sections already on screen must appear immediately - waiting on the
  // observer's async callback risks a race against that scroll restore
  // and leaves them stuck invisible.
  sections.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) {
      el.classList.add('is-visible');
    } else {
      el.classList.add('reveal');
      observer.observe(el);
    }
  });
})();
