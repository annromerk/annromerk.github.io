// Ladder Logic Simulator
// Models a real PLC scan cycle: Input Scan -> Program Scan (rungs evaluated
// top-to-bottom) -> Output Scan, looping continuously. Nothing updates instantly.

const INPUT_MS = 280;
const PER_RUNG_MS = 280;
const OUTPUT_MS = 300;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const state = {
  power: false,
  // raw: the "pulse" register the next Input Scan reads. A momentary button
  // sets this true immediately on press and it stays true — even after the
  // button is released — until an Input Scan actually consumes it. This
  // guarantees a quick click is never silently missed between scans.
  raw: { start: false, stop: false, jam: false, reset: false },
  // held: the live physical button state (only meaningful for momentary
  // buttons), used to re-arm `raw` after each scan consumes it.
  held: { start: false, stop: false, reset: false },
  img: { start: false, stop: false, jam: false, reset: false },
  out: { fault: false, run: false, motor: false },
};

let loopActive = false;
let scanCount = 0;

/* ---------- SVG primitives ---------- */

function contactSVG(id, cx, cy, label, mnemonic, nc) {
  const bar1 = cx - 8;
  const bar2 = cx + 8;
  const top = cy - 15;
  const bot = cy + 15;
  const slash = nc
    ? `<line class="contact-slash" x1="${cx - 12}" y1="${cy + 13}" x2="${cx + 12}" y2="${cy - 13}"/>`
    : '';
  return `<g class="contact" id="${id}">
    <line class="contact-bar" x1="${bar1}" y1="${top}" x2="${bar1}" y2="${bot}"/>
    <line class="contact-bar" x1="${bar2}" y1="${top}" x2="${bar2}" y2="${bot}"/>
    ${slash}
    <text class="sym-label" x="${cx}" y="${cy - 24}" text-anchor="middle">${label}</text>
    <text class="sym-mnemonic" x="${cx}" y="${cy + 34}" text-anchor="middle">${mnemonic} (${nc ? 'NC' : 'NO'})</text>
  </g>`;
}

function coilSVG(id, cx, cy, label, mnemonic) {
  return `<g class="coil" id="${id}">
    <path class="coil-arc" d="M ${cx - 2} ${cy - 16} A 16 16 0 0 0 ${cx - 2} ${cy + 16}"/>
    <path class="coil-arc" d="M ${cx + 2} ${cy - 16} A 16 16 0 0 1 ${cx + 2} ${cy + 16}"/>
    <text class="coil-label" x="${cx}" y="${cy - 24}" text-anchor="middle">${label}</text>
    <text class="sym-mnemonic" x="${cx}" y="${cy + 34}" text-anchor="middle">${mnemonic}</text>
  </g>`;
}

function wireSVG(id, x1, x2, y) {
  return `<line class="wire" id="${id}" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>`;
}

function vertSVG(id, x, y1, y2) {
  return `<line class="vert" id="${id}" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/>`;
}

function staticWire(x1, x2, y) {
  return `<line class="wire" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>`;
}

function staticVert(x, y1, y2) {
  return `<line class="vert" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/>`;
}

function railSVG(x, y1, y2) {
  return `<line class="rail" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/>`;
}

/* ---------- Rung markup ---------- */

function rung1SVG() {
  return `<svg class="rung-svg" viewBox="0 0 960 185" xmlns="http://www.w3.org/2000/svg">
    ${railSVG(20, 10, 170)}
    ${railSVG(940, 10, 170)}
    ${staticWire(20, 90, 45)}
    ${staticWire(90, 140, 45)}
    ${contactSVG('r1-jam', 160, 45, 'JAM', 'XIC', false)}
    ${wireSVG('r1-out-jam', 180, 230, 45)}
    ${staticVert(90, 45, 125)}
    ${staticWire(90, 140, 125)}
    ${contactSVG('r1-seal', 160, 125, 'FAULT', 'XIC', false)}
    ${vertSVG('r1-bv2', 230, 45, 125)}
    ${wireSVG('r1-merge', 230, 450, 45)}
    ${contactSVG('r1-reset', 470, 45, 'RESET', 'XIO', true)}
    ${wireSVG('r1-post-reset', 490, 740, 45)}
    ${coilSVG('r1-coil', 760, 45, 'FAULT', 'OTE')}
    ${wireSVG('r1-out', 780, 940, 45)}
  </svg>`;
}

function rung2SVG() {
  return `<svg class="rung-svg" viewBox="0 0 960 185" xmlns="http://www.w3.org/2000/svg">
    ${railSVG(20, 10, 170)}
    ${railSVG(940, 10, 170)}
    ${staticWire(20, 90, 45)}
    ${staticWire(90, 140, 45)}
    ${contactSVG('r2-start', 160, 45, 'START', 'XIC', false)}
    ${wireSVG('r2-out-start', 180, 230, 45)}
    ${staticVert(90, 45, 125)}
    ${staticWire(90, 140, 125)}
    ${contactSVG('r2-seal', 160, 125, 'RUN', 'XIC', false)}
    ${vertSVG('r2-bv2', 230, 45, 125)}
    ${wireSVG('r2-merge', 230, 360, 45)}
    ${contactSVG('r2-stop', 380, 45, 'STOP', 'XIO', true)}
    ${wireSVG('r2-post-stop', 400, 540, 45)}
    ${contactSVG('r2-fault', 560, 45, 'FAULT', 'XIO', true)}
    ${wireSVG('r2-post-fault', 580, 740, 45)}
    ${coilSVG('r2-coil', 760, 45, 'RUN', 'OTE')}
    ${wireSVG('r2-out', 780, 940, 45)}
  </svg>`;
}

function rung3SVG() {
  return `<svg class="rung-svg" viewBox="0 0 960 150" xmlns="http://www.w3.org/2000/svg">
    ${railSVG(20, 15, 140)}
    ${railSVG(940, 15, 140)}
    ${staticWire(20, 280, 55)}
    ${contactSVG('r3-run', 300, 55, 'RUN', 'XIC', false)}
    ${wireSVG('r3-mid', 320, 680, 55)}
    ${coilSVG('r3-coil', 700, 55, 'MOTOR', 'OTE')}
    ${wireSVG('r3-out', 720, 940, 55)}
  </svg>`;
}

/* ---------- Walkthrough: rungs are only revealed, with their explanation,
   once the action that drives them has actually happened ---------- */

function rung23Block() {
  return `
    <div class="rung-block">
      <p class="rung-num">RUNG 2: Start/Stop seal-in, fault-interlocked</p>
      ${rung2SVG()}
      <p class="rung-explain">That's the classic motor-starter circuit: Start energized Run, and a seal-in
        contact (Run) keeps it energized after you let go, the same way the Pico's state stayed
        <code>Running</code> once it started. A Fault contact in series would cut the whole rung the
        instant a fault trips.</p>
      <details>
        <summary>Show the code</summary>
        <code>if (start or run) and not stop and not fault:
    run = True
else:
    run = False</code>
      </details>
    </div>
    <div class="rung-block">
      <p class="rung-num">RUNG 3: Motor output</p>
      ${rung3SVG()}
      <p class="rung-explain">A direct output: Run energizes the Motor coil, mirroring the Pico's status
        LEDs turning on when it entered the Running state.</p>
      <details>
        <summary>Show the code</summary>
        <code>motor = run</code>
      </details>
    </div>`;
}

function rung1Block() {
  return `
    <div class="rung-block">
      <p class="rung-num">RUNG 1: Fault latch</p>
      ${rung1SVG()}
      <p class="rung-explain">Jam just set the Fault coil here, and its own seal-in contact (Fault, in
        parallel with Jam) keeps it latched even after Jam clears, exactly like the Pico's fault-interlock
        logic stayed latched in the Fault state until told otherwise. That same Fault contact sits in
        series in Rung 2 above, which is what cut the motor immediately. Only Reset breaks the seal.</p>
      <details>
        <summary>Show the code</summary>
        <code>if jam or fault:
    fault = True and not reset</code>
      </details>
    </div>`;
}

/* ---------- Walkthrough state machine ---------- */

let walkStage = 1;
let walkRung1Revealed = false;

const WALK_STEPS = {
  1: { step: 'Step 1 of 4', text: 'Turn on the PLC to begin.' },
  2: { step: 'Step 2 of 4', text: 'Press Start to run the line.' },
  3: { step: 'Step 3 of 4', text: 'Now trip a fault: hold Jam.' },
  4: { step: 'Step 4 of 4', text: 'Clear the jam, then press Reset.' },
  5: {
    step: 'Walkthrough complete',
    text: "Nice work. You've now seen all three rungs work together: Start/seal-in drives the motor, "
      + 'and a fault latch can cut it instantly until Reset. (The Pico trainer used this same logic, just '
      + "with a 2-second jam-hold timer left out here to keep this diagram focused on scan-cycle behavior "
      + 'and NO/NC contact logic.) The controls below are unlocked, explore freely or restart to watch it '
      + 'again.',
  },
};

function updateWalkthroughPanel() {
  const s = WALK_STEPS[walkStage];
  document.getElementById('walkthrough-step').textContent = s.step;
  document.getElementById('walkthrough-text').textContent = s.text;
  document.getElementById('btn-walkthrough-restart').classList.toggle('is-hidden', walkStage < 5);
}

function updateWalkthroughGate() {
  const set = (id, on) => { document.getElementById(id).disabled = !on; };
  if (walkStage >= 5) {
    set('btn-start', state.power);
    set('btn-stop', state.power);
    set('btn-jam', state.power);
    set('btn-reset', state.power);
    return;
  }
  set('btn-start', state.power && walkStage === 2);
  set('btn-stop', false);
  set('btn-jam', state.power && (walkStage === 3 || walkStage === 4));
  set('btn-reset', state.power && walkStage === 4);
}

function advanceWalkthrough() {
  let changed = false;

  if (walkStage === 1 && state.power) {
    walkStage = 2;
    changed = true;
  }
  if (walkStage === 2 && state.out.motor) {
    walkStage = 3;
    document.getElementById('ladder-legend').classList.remove('is-hidden');
    document.getElementById('ladder-wrap').insertAdjacentHTML('beforeend', rung23Block());
    changed = true;
  }
  if (walkStage === 3 && state.out.fault) {
    walkStage = 4;
    document.getElementById('ladder-wrap').insertAdjacentHTML('afterbegin', rung1Block());
    walkRung1Revealed = true;
    changed = true;
  }
  if (walkStage === 4 && !state.out.fault && walkRung1Revealed) {
    walkStage = 5;
    changed = true;
  }

  if (changed) updateWalkthroughPanel();
  updateWalkthroughGate();
}

function restartWalkthrough() {
  walkStage = 1;
  walkRung1Revealed = false;
  document.getElementById('ladder-wrap').innerHTML = '';
  document.getElementById('ladder-legend').classList.add('is-hidden');
  if (state.power) setPower(false);
  updateWalkthroughPanel();
  updateWalkthroughGate();
}

/* ---------- Rung evaluation (mirrors real PLC same-scan behavior:
   a contact referencing THIS rung's own coil reads the value from before
   this rung executed; a contact referencing an earlier rung's coil in the
   same scan reads that rung's freshly solved value) ---------- */

function evalRung1(oldFault, jam, reset) {
  const jamPass = jam;
  const sealPass = oldFault;
  const mergeVal = jamPass || sealPass;
  const resetPass = mergeVal && !reset;
  return { jamPass, sealPass, mergeVal, resetPass, newFault: resetPass };
}

function evalRung2(oldRun, start, stop, faultNow) {
  const startPass = start;
  const sealPass = oldRun;
  const mergeVal = startPass || sealPass;
  const stopPass = mergeVal && !stop;
  const faultPass = stopPass && !faultNow;
  return { startPass, sealPass, mergeVal, stopPass, faultPass, newRun: faultPass };
}

function evalRung3(run) {
  return { runPass: run, newMotor: run };
}

function setPowered(id, on, cls = 'powered') {
  const el = document.getElementById(id);
  if (el) el.classList.toggle(cls, !!on);
}

function applyRung1(r) {
  setPowered('r1-jam', r.jamPass, 'fault-energized');
  setPowered('r1-seal', r.sealPass, 'fault-energized');
  setPowered('r1-out-jam', r.jamPass, 'fault-energized');
  setPowered('r1-bv2', r.sealPass, 'fault-energized');
  setPowered('r1-merge', r.mergeVal, 'fault-energized');
  setPowered('r1-reset', r.resetPass, 'fault-energized');
  setPowered('r1-post-reset', r.resetPass, 'fault-energized');
  setPowered('r1-coil', r.newFault, 'fault-energized');
  setPowered('r1-out', r.newFault, 'fault-energized');
}

function applyRung2(r) {
  setPowered('r2-start', r.startPass);
  setPowered('r2-seal', r.sealPass);
  setPowered('r2-out-start', r.startPass);
  setPowered('r2-bv2', r.sealPass);
  setPowered('r2-merge', r.mergeVal);
  setPowered('r2-stop', r.stopPass);
  setPowered('r2-post-stop', r.stopPass);
  setPowered('r2-fault', r.faultPass);
  setPowered('r2-post-fault', r.faultPass);
  setPowered('r2-coil', r.newRun, 'energized');
  setPowered('r2-out', r.newRun);
}

function applyRung3(r) {
  setPowered('r3-run', r.runPass);
  setPowered('r3-mid', r.runPass);
  setPowered('r3-coil', r.newMotor, 'energized');
  setPowered('r3-out', r.newMotor);
}

function deenergizeAll() {
  document.querySelectorAll('.powered').forEach((el) => el.classList.remove('powered'));
  document.querySelectorAll('.energized').forEach((el) => el.classList.remove('energized'));
  document.querySelectorAll('.fault-energized').forEach((el) => el.classList.remove('fault-energized'));
}

/* ---------- Scan-phase indicator & output lamps ---------- */

function setPhase(name) {
  ['input', 'program', 'output'].forEach((p) => {
    document.getElementById(`phase-${p}`).classList.toggle('active', p === name);
  });
}

function updateLamps() {
  document.getElementById('lamp-run').classList.toggle('on', state.out.motor);
  document.getElementById('lamp-fault').classList.toggle('on', state.out.fault);
}

function updateConveyorVisual() {
  const el = document.getElementById('conveyor-visual');
  el.classList.toggle('is-running', state.power && state.out.motor && !state.out.fault);
  el.classList.toggle('is-fault', state.power && state.out.fault);
}

function updateStatusBanner() {
  const banner = document.getElementById('status-banner');
  const title = document.getElementById('status-title');
  const desc = document.getElementById('status-desc');

  let cls = 'state-off';
  let t = 'PLC OFF';
  let d = 'Turn it on to begin.';

  if (state.power) {
    if (state.out.fault) {
      cls = 'state-fault';
      t = 'FAULT LOCKED OUT';
      d = "Start and Stop won't do anything until you press Reset.";
    } else if (state.out.motor) {
      cls = 'state-running';
      t = 'RUNNING';
      d = 'The simulated conveyor motor is on.';
    } else {
      cls = 'state-ready';
      t = 'READY';
      d = 'Press Start to run it, or Jam to simulate a fault.';
    }
  }

  banner.classList.remove('state-off', 'state-ready', 'state-running', 'state-fault');
  banner.classList.add(cls);
  title.textContent = t;
  desc.textContent = d;

  updateConveyorVisual();
  advanceWalkthrough();
}

/* ---------- Scan loop ---------- */

async function scanLoop() {
  if (loopActive) return;
  loopActive = true;

  while (state.power) {
    scanCount += 1;
    document.getElementById('scan-counter').textContent = `Scan #${scanCount}`;

    setPhase('input');
    state.img = { ...state.raw };
    // Re-arm momentary pulses to whatever is currently physically held: a
    // quick tap collapses back to false (one-shot, consumed), a genuine
    // hold stays true so the next scan sees it again too.
    state.raw.start = state.held.start;
    state.raw.stop = state.held.stop;
    state.raw.reset = state.held.reset;
    await wait(INPUT_MS);
    if (!state.power) break;

    setPhase('program');

    const oldFault = state.out.fault;
    const oldRun = state.out.run;

    const r1 = evalRung1(oldFault, state.img.jam, state.img.reset);
    applyRung1(r1);
    state.out.fault = r1.newFault;
    await wait(PER_RUNG_MS);
    if (!state.power) break;

    const r2 = evalRung2(oldRun, state.img.start, state.img.stop, state.out.fault);
    applyRung2(r2);
    state.out.run = r2.newRun;
    await wait(PER_RUNG_MS);
    if (!state.power) break;

    const r3 = evalRung3(state.out.run);
    applyRung3(r3);
    state.out.motor = r3.newMotor;
    await wait(PER_RUNG_MS);
    if (!state.power) break;

    setPhase('output');
    updateLamps();
    updateStatusBanner();
    await wait(OUTPUT_MS);
  }

  loopActive = false;
  setPhase(null);
}

function stopAndReset() {
  state.out = { fault: false, run: false, motor: false };
  deenergizeAll();
  updateLamps();
  updateStatusBanner();
  setPhase(null);
}

/* ---------- Input wiring ---------- */

function bindMomentary(btnId, key) {
  const btn = document.getElementById(btnId);
  const press = () => {
    state.held[key] = true;
    state.raw[key] = true;
    btn.classList.add('active', 'pressed');
  };
  const release = () => {
    state.held[key] = false;
    btn.classList.remove('active', 'pressed');
  };
  btn.addEventListener('pointerdown', press);
  btn.addEventListener('pointerup', release);
  btn.addEventListener('pointerleave', release);
  btn.addEventListener('pointercancel', release);
}

function setToggle(btnId, key, on) {
  state.raw[key] = on;
  document.getElementById(btnId).classList.toggle('active', on);
}

function bindToggle(btnId, key) {
  const btn = document.getElementById(btnId);
  btn.addEventListener('click', () => setToggle(btnId, key, !state.raw[key]));
}

function setPower(on) {
  const btn = document.getElementById('btn-power');
  const label = document.getElementById('power-label');
  state.power = on;
  btn.classList.toggle('on', state.power);
  if (state.power) {
    label.textContent = 'PLC: RUN';
    scanCount = 0;
    updateStatusBanner();
    scanLoop();
  } else {
    label.textContent = 'PLC: PROG (Stopped)';
    stopAndReset();
  }
}

function bindPower() {
  document.getElementById('btn-power').addEventListener('click', () => setPower(!state.power));
}

bindMomentary('btn-start', 'start');
bindMomentary('btn-stop', 'stop');
bindMomentary('btn-reset', 'reset');
bindToggle('btn-jam', 'jam');
bindPower();
document.getElementById('btn-walkthrough-restart').addEventListener('click', restartWalkthrough);
document.getElementById('power-label').textContent = 'PLC: PROG (Stopped)';
document.getElementById('btn-power').classList.remove('on');
updateWalkthroughPanel();
updateWalkthroughGate();
updateStatusBanner();
