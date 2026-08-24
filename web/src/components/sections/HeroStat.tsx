import { useCountUp } from '@/hooks/useCountUp';

export function HeroStat({
  index,
  value,
  suffix,
  label,
}: {
  index: number;
  value: number;
  suffix: string;
  label: string;
}) {
  const count = useCountUp(value);

  return (
    <div className={`hero-tile hero-stat-tile hero-stat-tile--${index}`}>
      <span className="stat-eyebrow">{`// 0${index}`}</span>
      <span className="stat-number">
        {count}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
