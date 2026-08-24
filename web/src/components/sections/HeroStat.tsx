import { animated, useSpring } from '@react-spring/web';
import { m, type Variants } from 'motion/react';
import { easeOutBackSubtle } from '@/lib/easing';

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

  const { count } = useSpring({
    from: { count: 0 },
    to: { count: value },
    delay: 600 + index * 120,
    config: { duration: 1400, easing: easeOutBackSubtle },
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
