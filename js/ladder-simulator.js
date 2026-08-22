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
  return `<svg class="rung-svg" viewBox="0 0 960 150" xmlns="http://www.w3.org/2000/svg">
    ${railSVG(20, 15, 140)}
    ${railSVG(940, 15, 140)}
    ${staticWire(20, 90, 55)}
    ${staticWire(90, 140, 55)}
    ${contactSVG('r1-jam', 160, 55, 'JAM', 'XIC', false)}
    ${wireSVG('r1-out-jam', 180, 230, 55)}
    ${staticVert(90, 55, 100)}
    ${staticWire(90, 140, 100)}
    ${contactSVG('r1-seal', 160, 100, 'FAULT', 'XIC', false)}
    ${vertSVG('r1-bv2', 230, 55, 100)}
    ${wireSVG('r1-merge', 230, 450, 55)}
    ${contactSVG('r1-reset', 470, 55, 'RESET', 'XIO', true)}
    ${wireSVG('r1-post-reset', 490, 740, 55)}
    ${coilSVG('r1-coil', 760, 55, 'FAULT', 'OTE')}
    ${wireSVG('r1-out', 780, 940, 55)}
  </svg>`;
}

function rung2SVG() {
  return `<svg class="rung-svg" viewBox="0 0 960 150" xmlns="http://www.w3.org/2000/svg">
    ${railSVG(20, 15, 140)}
    ${railSVG(940, 15, 140)}
    ${staticWire(20, 90, 55)}
    ${staticWire(90, 140, 55)}
    ${contactSVG('r2-start', 160, 55, 'START', 'XIC', false)}
    ${wireSVG('r2-out-start', 180, 230, 55)}
    ${staticVert(90, 55, 100)}
    ${staticWire(90, 140, 100)}
    ${contactSVG('r2-seal', 160, 100, 'RUN', 'XIC', false)}
    ${vertSVG('r2-bv2', 230, 55, 100)}
    ${wireSVG('r2-merge', 230, 360, 55)}
    ${contactSVG('r2-stop', 380, 55, 'STOP', 'XIO', true)}
    ${wireSVG('r2-post-stop', 400, 540, 55)}
    ${contactSVG('r2-fault', 560, 55, 'FAULT', 'XIO', true)}
    ${wireSVG('r2-post-fault', 580, 740, 55)}
    ${coilSVG('r2-coil', 760, 55, 'RUN', 'OTE')}
    ${wireSVG('r2-out', 780, 940, 55)}
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

function buildLadder() {
  const wrap = document.getElementById('ladder-wrap');
  wrap.innerHTML = `
    <div class="rung-block"><p class="rung-num">RUNG 1: Fault latch</p>${rung1SVG()}</div>
    <div class="rung-block"><p class="rung-num">RUNG 2: Start/Stop seal-in, fault-interlocked</p>${rung2SVG()}</div>
    <div class="rung-block"><p class="rung-num">RUNG 3: Motor output</p>${rung3SVG()}</div>
  `;
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

/* ---------- Guided demo ---------- */

function waitUntil(conditionFn, timeoutMs = 6000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      if (conditionFn()) {
        resolve(true);
      } else if (Date.now() - start > timeoutMs) {
        resolve(false);
      } else {
        setTimeout(check, 60);
      }
    };
    check();
  });
}

function pressButton(btnId, holdMs = 150) {
  return new Promise((resolve) => {
    const btn = document.getElementById(btnId);
    btn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    setTimeout(() => {
      btn.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
      resolve();
    }, holdMs);
  });
}

function setControlsEnabled(enabled) {
  ['btn-start', 'btn-stop', 'btn-jam', 'btn-reset', 'btn-power', 'btn-demo'].forEach((id) => {
    document.getElementById(id).disabled = !enabled;
  });
}

async function runGuidedDemo() {
  const status = document.getElementById('demo-status');
  setControlsEnabled(false);
  document.getElementById('btn-demo').disabled = true;

  if (!state.power) {
    status.textContent = 'Powering on the PLC...';
    setPower(true);
    await wait(400);
  }

  status.textContent = 'Pressing Start. This starts the simulated conveyor motor.';
  await pressButton('btn-start');
  await waitUntil(() => state.out.run);
  await wait(900);

  status.textContent = 'Motor running. Now simulating a jam being sensed on the line...';
  setToggle('btn-jam', 'jam', true);
  const faultTripped = await waitUntil(() => state.out.fault);
  await wait(1300);

  if (!faultTripped) {
    status.textContent = 'Demo timed out waiting for the fault to trip. Try again or use the controls manually.';
    setToggle('btn-jam', 'jam', false);
    setControlsEnabled(true);
    return;
  }

  status.textContent = 'Fault tripped. The motor stopped and Start/Stop are locked out, same as the Pico trainer.';
  await wait(1600);

  status.textContent = 'Clearing the jam and pressing Reset to unlock it...';
  setToggle('btn-jam', 'jam', false);
  await pressButton('btn-reset');
  await waitUntil(() => !state.out.fault);
  await wait(600);

  status.textContent = 'Done. System is back at ready. Try the controls yourself, or run it again.';
  setControlsEnabled(true);
}

buildLadder();
bindMomentary('btn-start', 'start');
bindMomentary('btn-stop', 'stop');
bindMomentary('btn-reset', 'reset');
bindToggle('btn-jam', 'jam');
bindPower();
document.getElementById('btn-demo').addEventListener('click', runGuidedDemo);
document.getElementById('power-label').textContent = 'PLC: PROG (Stopped)';
document.getElementById('btn-power').classList.remove('on');
updateStatusBanner();
