import { Rung1Svg, Rung2Svg, Rung3Svg } from '@/components/ladder/RungSvgs';
import type { LadderSnapshot } from '@/ladder/engine';

type Powered = LadderSnapshot['svgPowered'];

// Rungs are only revealed, with their explanation, once the action that
// drives them has actually happened. Final DOM order stays Rung 1 -> Rung 2
// -> Rung 3 even though the walkthrough reveals rungs 2 & 3 first — callers
// must render <Rung1Block> before <Rung23Block> in JSX source order.

export function Rung23Block({ powered }: { powered: Powered }) {
  return (
    <>
      <div className="rung-block">
        <p className="rung-num">RUNG 2: Start/Stop seal-in, fault-interlocked</p>
        <Rung2Svg powered={powered} />
        <p className="rung-explain">
          That&apos;s the classic motor-starter circuit: Start energized Run, and a seal-in contact (Run)
          keeps it energized after you let go, the same way the Pico&apos;s state stayed{' '}
          <code>Running</code> once it started. A Fault contact in series would cut the whole rung the
          instant a fault trips.
        </p>
        <details>
          <summary>Show the code</summary>
          <code>{'if (start or run) and not stop and not fault:\n    run = True\nelse:\n    run = False'}</code>
        </details>
      </div>
      <div className="rung-block">
        <p className="rung-num">RUNG 3: Motor output</p>
        <Rung3Svg powered={powered} />
        <p className="rung-explain">
          A direct output: Run energizes the Motor coil, mirroring the Pico&apos;s status LEDs turning on
          when it entered the Running state.
        </p>
        <details>
          <summary>Show the code</summary>
          <code>motor = run</code>
        </details>
      </div>
    </>
  );
}

export function Rung1Block({ powered }: { powered: Powered }) {
  return (
    <div className="rung-block">
      <p className="rung-num">RUNG 1: Fault latch</p>
      <Rung1Svg powered={powered} />
      <p className="rung-explain">
        Jam just set the Fault coil here, and its own seal-in contact (Fault, in parallel with Jam) keeps
        it latched even after Jam clears, exactly like the Pico&apos;s fault-interlock logic stayed latched
        in the Fault state until told otherwise. That same Fault contact sits in series in Rung 2 above,
        which is what cut the motor immediately. Only Reset breaks the seal.
      </p>
      <details>
        <summary>Show the code</summary>
        <code>{'if jam or fault:\n    fault = True and not reset'}</code>
      </details>
    </div>
  );
}
