// SVG primitives ported from the string-template functions in
// js/ladder-simulator.js (contactSVG/coilSVG/wireSVG/vertSVG/railSVG).
// `on` + `onClass` replace the original setPowered()/classList.toggle calls.

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Contact({
  id,
  x,
  y,
  label,
  mnemonic,
  nc,
  on,
  onClass,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  mnemonic: string;
  nc: boolean;
  on: boolean;
  onClass: string;
}) {
  const bar1 = x - 8;
  const bar2 = x + 8;
  const top = y - 15;
  const bot = y + 15;
  return (
    <g className={cx('contact', on && onClass)} id={id}>
      <line className="contact-bar" x1={bar1} y1={top} x2={bar1} y2={bot} />
      <line className="contact-bar" x1={bar2} y1={top} x2={bar2} y2={bot} />
      {nc && <line className="contact-slash" x1={x - 12} y1={y + 13} x2={x + 12} y2={y - 13} />}
      <text className="sym-label" x={x} y={y - 24} textAnchor="middle">
        {label}
      </text>
      <text className="sym-mnemonic" x={x} y={y + 34} textAnchor="middle">
        {mnemonic} ({nc ? 'NC' : 'NO'})
      </text>
    </g>
  );
}

export function Coil({
  id,
  x,
  y,
  label,
  mnemonic,
  on,
  onClass,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  mnemonic: string;
  on: boolean;
  onClass: string;
}) {
  return (
    <g className={cx('coil', on && onClass)} id={id}>
      <path className="coil-arc" d={`M ${x - 2} ${y - 16} A 16 16 0 0 0 ${x - 2} ${y + 16}`} />
      <path className="coil-arc" d={`M ${x + 2} ${y - 16} A 16 16 0 0 1 ${x + 2} ${y + 16}`} />
      <text className="coil-label" x={x} y={y - 24} textAnchor="middle">
        {label}
      </text>
      <text className="sym-mnemonic" x={x} y={y + 34} textAnchor="middle">
        {mnemonic}
      </text>
    </g>
  );
}

export function Wire({
  id,
  x1,
  x2,
  y,
  on,
  onClass,
}: {
  id?: string;
  x1: number;
  x2: number;
  y: number;
  on?: boolean;
  onClass?: string;
}) {
  return <line className={cx('wire', on && onClass)} id={id} x1={x1} y1={y} x2={x2} y2={y} />;
}

export function Vert({
  id,
  x,
  y1,
  y2,
  on,
  onClass,
}: {
  id?: string;
  x: number;
  y1: number;
  y2: number;
  on?: boolean;
  onClass?: string;
}) {
  return <line className={cx('vert', on && onClass)} id={id} x1={x} y1={y1} x2={x} y2={y2} />;
}

export function Rail({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return <line className="rail" x1={x} y1={y1} x2={x} y2={y2} />;
}
