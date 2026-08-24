import { useEffect } from 'react';

// Ports js/reveal.js: fades `main > section` elements in as they enter the
// viewport. Progressive enhancement only — sections stay visible if this
// never runs (they start without the `reveal` class in JSX).
export function useReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const sections = container.querySelectorAll(':scope > section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );

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

    return () => observer.disconnect();
  }, [containerRef]);
}
