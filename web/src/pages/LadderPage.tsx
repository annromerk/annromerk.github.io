import { Footer } from '@/components/Footer';
import { Rung1Block, Rung23Block } from '@/components/ladder/RungBlocks';
import { WALK_STEPS } from '@/content/ladderWalkthrough';
import { statusBanner, walkthroughGate } from '@/ladder/derived';
import { useLadderEngine } from '@/ladder/useLadderEngine';

export function LadderPage() {
  const { engine, snapshot } = useLadderEngine();
  const banner = statusBanner(snapshot);
  const gate = walkthroughGate(snapshot);
  const walkCopy = WALK_STEPS[snapshot.walkStage];

  const momentaryHandlers = (key: 'start' | 'stop' | 'reset') => ({
    onPointerDown: () => engine.pressMomentary(key),
    onPointerUp: () => engine.releaseMomentary(key),
    onPointerLeave: () => engine.releaseMomentary(key),
    onPointerCancel: () => engine.releaseMomentary(key),
  });

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <main id="main-content">
        <div className="container sim-header">
          <a className="back-link" href="/">
            &larr; Back to portfolio
          </a>
        </div>

        <section className="sim-intro">
          <div className="container">
            <h1>Ladder Logic Simulator</h1>
            <p>
              This is a self-directed learning project, a browser-based simulator that models how a real
              PLC evaluates ladder logic, translating the fault-interlock state machine from my{' '}
              <a href="/#project">Raspberry Pi Pico trainer</a> into Allen-Bradley/RSLogix notation (XIC,
              XIO, OTE), the North American industry standard for the equipment I&apos;d be working with in
              a maintenance role.
            </p>
            <div className="sim-disclaimer">
              <strong>What this is:</strong> a learning tool I built to understand ladder logic concepts,
              not a certified, IEC 61131-3-compliant, or production PLC programming environment.
            </div>
          </div>
        </section>

        <section className="sim-panel">
          <div className="container">
            <div className={`status-banner ${banner.cls}`} id="status-banner">
              <span className="status-dot" />
              <div className="status-text">
                <strong>{banner.title}</strong>
                <span>{banner.desc}</span>
              </div>
            </div>

            <div className="sim-technical">
              <h2 className="section-title">The technical simulation</h2>

              <div className="walkthrough-panel">
                <span className="walkthrough-step">{walkCopy.step}</span>
                <p className="walkthrough-text">{walkCopy.text}</p>
                <button
                  className={`walkthrough-restart${snapshot.walkStage < 5 ? ' is-hidden' : ''}`}
                  type="button"
                  onClick={() => engine.restartWalkthrough()}
                >
                  &#8635; Restart walkthrough
                </button>
              </div>

              <div className="panel-row">
                <div className="io-controls">
                  <button className="io-btn" data-momentary disabled={!gate.start} {...momentaryHandlers('start')}>
                    <span className="io-dot" />
                    Start
                  </button>
                  <button className="io-btn" data-momentary disabled={!gate.stop} {...momentaryHandlers('stop')}>
                    <span className="io-dot" />
                    Stop
                  </button>
                  <button
                    className={`io-btn toggle-jam${snapshot.jamOn ? ' active' : ''}`}
                    disabled={!gate.jam}
                    onClick={() => engine.toggleJam()}
                  >
                    <span className="io-dot" />
                    Jam
                  </button>
                  <button className="io-btn" data-momentary disabled={!gate.reset} {...momentaryHandlers('reset')}>
                    <span className="io-dot" />
                    Reset
                  </button>
                </div>
                <button
                  className={`power-toggle${snapshot.power ? ' on' : ''}`}
                  onClick={() => engine.setPower(!snapshot.power)}
                >
                  <span className="io-dot" />
                  <span>{snapshot.power ? 'PLC: RUN' : 'PLC: PROG (Stopped)'}</span>
                </button>
              </div>
              <p className="io-hint">
                Start/Stop/Reset are momentary pushbuttons, Jam is a toggle switch like a held sensor.
                Locked-out buttons unlock as you go.
              </p>
              <p className={`lockout-message${snapshot.lockoutVisible ? '' : ' is-hidden'}`} role="status">
                Locked out, a fault is active. Press Reset first.
              </p>

              <div className="scan-strip">
                <span className={`scan-phase${snapshot.phase === 'input' ? ' active' : ''}`}>Input Scan</span>
                <span className="scan-phase-arrow">&rarr;</span>
                <span className={`scan-phase${snapshot.phase === 'program' ? ' active' : ''}`}>Program Scan</span>
                <span className="scan-phase-arrow">&rarr;</span>
                <span className={`scan-phase${snapshot.phase === 'output' ? ' active' : ''}`}>Output Scan</span>
                <span className="scan-meta">Scan #{snapshot.scanCount}</span>
              </div>

              {snapshot.walkStage >= 3 && (
                <div className="ladder-legend">
                  <span className="legend-item">
                    <span className="legend-sym">| |</span>a switch (contact) that lets power through when its
                    condition is met
                  </span>
                  <span className="legend-item">
                    <span className="legend-sym">|/|</span>a switch that&apos;s normally closed and opens when
                    triggered (used for Stop, Fault, Reset)
                  </span>
                  <span className="legend-item">
                    <span className="legend-sym">( )</span>an output (coil) that turns on when power reaches it
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot legend-dot--accent" />
                    power flowing right now
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot legend-dot--red" />
                    the fault path
                  </span>
                </div>
              )}

              <div className="ladder-wrap">
                {snapshot.walkStage >= 4 && <Rung1Block powered={snapshot.svgPowered} />}
                {snapshot.walkStage >= 3 && <Rung23Block powered={snapshot.svgPowered} />}
              </div>

              <div className="sim-outputs">
                <div className={`output-lamp${snapshot.out.motor ? ' on' : ''}`}>
                  <span className="lamp-dot" />
                  <span className="lamp-text">
                    <strong>RUN</strong>
                    <span>Motor / conveyor running</span>
                  </span>
                </div>
                <div className={`output-lamp fault${snapshot.out.fault ? ' on' : ''}`}>
                  <span className="lamp-dot" />
                  <span className="lamp-text">
                    <strong>FAULT</strong>
                    <span>Locked out until Reset</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer minimal />
    </>
  );
}
