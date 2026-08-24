import { Coil, Contact, Rail, Vert, Wire } from '@/components/ladder/RungPrimitives';
import type { LadderSnapshot } from '@/ladder/engine';

type Powered = LadderSnapshot['svgPowered'];

export function Rung1Svg({ powered }: { powered: Powered }) {
  const on = (id: string) => !!powered[id];
  const cls = 'fault-energized';
  return (
    <svg className="rung-svg" viewBox="0 0 960 185" xmlns="http://www.w3.org/2000/svg">
      <Rail x={20} y1={10} y2={170} />
      <Rail x={940} y1={10} y2={170} />
      <Wire x1={20} x2={90} y={45} />
      <Wire x1={90} x2={140} y={45} />
      <Contact id="r1-jam" x={160} y={45} label="JAM" mnemonic="XIC" nc={false} on={on('r1-jam')} onClass={cls} />
      <Wire id="r1-out-jam" x1={180} x2={230} y={45} on={on('r1-out-jam')} onClass={cls} />
      <Vert x={90} y1={45} y2={125} />
      <Wire x1={90} x2={140} y={125} />
      <Contact id="r1-seal" x={160} y={125} label="FAULT" mnemonic="XIC" nc={false} on={on('r1-seal')} onClass={cls} />
      <Vert id="r1-bv2" x={230} y1={45} y2={125} on={on('r1-bv2')} onClass={cls} />
      <Wire id="r1-merge" x1={230} x2={450} y={45} on={on('r1-merge')} onClass={cls} />
      <Contact id="r1-reset" x={470} y={45} label="RESET" mnemonic="XIO" nc on={on('r1-reset')} onClass={cls} />
      <Wire id="r1-post-reset" x1={490} x2={740} y={45} on={on('r1-post-reset')} onClass={cls} />
      <Coil id="r1-coil" x={760} y={45} label="FAULT" mnemonic="OTE" on={on('r1-coil')} onClass={cls} />
      <Wire id="r1-out" x1={780} x2={940} y={45} on={on('r1-out')} onClass={cls} />
    </svg>
  );
}

export function Rung2Svg({ powered }: { powered: Powered }) {
  const on = (id: string) => !!powered[id];
  return (
    <svg className="rung-svg" viewBox="0 0 960 185" xmlns="http://www.w3.org/2000/svg">
      <Rail x={20} y1={10} y2={170} />
      <Rail x={940} y1={10} y2={170} />
      <Wire x1={20} x2={90} y={45} />
      <Wire x1={90} x2={140} y={45} />
      <Contact id="r2-start" x={160} y={45} label="START" mnemonic="XIC" nc={false} on={on('r2-start')} onClass="powered" />
      <Wire id="r2-out-start" x1={180} x2={230} y={45} on={on('r2-out-start')} onClass="powered" />
      <Vert x={90} y1={45} y2={125} />
      <Wire x1={90} x2={140} y={125} />
      <Contact id="r2-seal" x={160} y={125} label="RUN" mnemonic="XIC" nc={false} on={on('r2-seal')} onClass="powered" />
      <Vert id="r2-bv2" x={230} y1={45} y2={125} on={on('r2-bv2')} onClass="powered" />
      <Wire id="r2-merge" x1={230} x2={360} y={45} on={on('r2-merge')} onClass="powered" />
      <Contact id="r2-stop" x={380} y={45} label="STOP" mnemonic="XIO" nc on={on('r2-stop')} onClass="powered" />
      <Wire id="r2-post-stop" x1={400} x2={540} y={45} on={on('r2-post-stop')} onClass="powered" />
      <Contact id="r2-fault" x={560} y={45} label="FAULT" mnemonic="XIO" nc on={on('r2-fault')} onClass="powered" />
      <Wire id="r2-post-fault" x1={580} x2={740} y={45} on={on('r2-post-fault')} onClass="powered" />
      <Coil id="r2-coil" x={760} y={45} label="RUN" mnemonic="OTE" on={on('r2-coil')} onClass="energized" />
      <Wire id="r2-out" x1={780} x2={940} y={45} on={on('r2-out')} onClass="powered" />
    </svg>
  );
}

export function Rung3Svg({ powered }: { powered: Powered }) {
  const on = (id: string) => !!powered[id];
  return (
    <svg className="rung-svg" viewBox="0 0 960 150" xmlns="http://www.w3.org/2000/svg">
      <Rail x={20} y1={15} y2={140} />
      <Rail x={940} y1={15} y2={140} />
      <Wire x1={20} x2={280} y={55} />
      <Contact id="r3-run" x={300} y={55} label="RUN" mnemonic="XIC" nc={false} on={on('r3-run')} onClass="powered" />
      <Wire id="r3-mid" x1={320} x2={680} y={55} on={on('r3-mid')} onClass="powered" />
      <Coil id="r3-coil" x={700} y={55} label="MOTOR" mnemonic="OTE" on={on('r3-coil')} onClass="energized" />
      <Wire id="r3-out" x1={720} x2={940} y={55} on={on('r3-out')} onClass="powered" />
    </svg>
  );
}
