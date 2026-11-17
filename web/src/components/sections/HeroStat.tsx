export function HeroStat({ value, suffix, label }: {
  value: number;
  suffix: string;
  label: string;
}) {
  return (
    <li>
      <strong className="stat-number">{value}{suffix}</strong>
      <span className="stat-label">{label}</span>
    </li>
  );
}
