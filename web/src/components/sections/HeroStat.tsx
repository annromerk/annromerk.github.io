import { animated, useSpring } from '@react-spring/web';
import { m, type Variants } from 'motion/react';
import { easeOutBackSubtle } from '@/lib/easing';

const COUNT_DURATION_MS = 1400;
const COUNT_GAP_MS = 150;
const COUNT_START_MS = 600;

export function HeroStat({
  index,
  value,
  suffix,
  label,
  variants,
}: {
  index: number;
  value: number;
  suffix: string;
  label: string;
  variants: Variants;
}) {
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Strictly serial: stat 01 finishes counting before 02 starts, then 03 —
  // not a small stagger offset with overlapping animations.
  const { count } = useSpring({
    from: { count: 0 },
    to: { count: value },
    delay: COUNT_START_MS + (index - 1) * (COUNT_DURATION_MS + COUNT_GAP_MS),
    config: { duration: COUNT_DURATION_MS, easing: easeOutBackSubtle },
    immediate: reducedMotion,
  });

  return (
    <m.div className={`hero-tile hero-stat-tile hero-stat-tile--${index}`} variants={variants}>
      <span className="stat-eyebrow">{`// 0${index}`}</span>
      <animated.span className="stat-number">{count.to((v) => `${Math.round(v)}${suffix}`)}</animated.span>
      <span className="stat-label">{label}</span>
    </m.div>
  );
}
