import { useEffect, useRef, useState } from 'react';

// Cubic ease-out: fast start, settles into the target. Pulled out as a pure
// function so the animation math can be unit-tested without depending on
// requestAnimationFrame or real elapsed wall-clock time.
export function countUpValueAt(elapsedMs: number, durationMs: number, target: number): number {
  const progress = Math.min(Math.max(elapsedMs, 0) / durationMs, 1);
  const eased = 1 - (1 - progress) ** 3;
  return Math.round(eased * target);
}

// Animates from 0 to `target` once on mount, respecting reduced-motion.
export function useCountUp(target: number, durationMs = 1100) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      setValue(countUpValueAt(elapsed, durationMs, target));
      if (elapsed < durationMs) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}
