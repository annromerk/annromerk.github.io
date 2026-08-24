import { animated, useSpring } from '@react-spring/web';
import { m, type Variants } from 'motion/react';

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

  // react-spring drives the count-up with real spring physics (mass/tension/
  // friction) rather than a fixed-duration easing curve, so it settles with
  // a touch of natural overshoot instead of a mechanical linear-to-eased count.
  const { count } = useSpring({
    from: { count: 0 },
    to: { count: value },
    config: { mass: 1, tension: 110, friction: 22 },
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
