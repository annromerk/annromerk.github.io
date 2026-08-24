import { useScrollProgress } from '@/hooks/useScrollProgress';

export function DocProgressBar() {
  const pct = useScrollProgress();
  return (
    <div className="doc-progress">
      <div className="doc-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}
