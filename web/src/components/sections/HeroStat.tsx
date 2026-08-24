import { m, type Variants } from 'motion/react';
import { useCountUp } from '@/hooks/useCountUp';

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
  const count = useCountUp(value);

  return (
    <m.div className={`hero-tile hero-stat-tile hero-stat-tile--${index}`} variants={variants}>
      <span className="stat-eyebrow">{`// 0${index}`}</span>
      <span className="stat-number">
        {count}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </m.div>
  );
}
