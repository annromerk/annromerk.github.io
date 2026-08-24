import { m } from 'motion/react';
import type { ReactNode } from 'react';

// Scroll-triggered fade/slide-up, replacing the old IntersectionObserver +
// CSS-class approach (js/reveal.js) with Motion. Respects
// prefers-reduced-motion globally via the <MotionConfig> wrapper in
// main.tsx, so no per-component guard is needed here.
export function Reveal({ children }: { children: ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
