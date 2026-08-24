import { evalRung1, evalRung2, evalRung3 } from './rungLogic';

const INPUT_MS = 280;
const PER_RUNG_MS = 280;
const OUTPUT_MS = 300;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export type ScanPhase = 'input' | 'program' | 'output' | null;
export type MomentaryKey = 'start' | 'stop' | 'reset';

export interface LadderSnapshot {
  power: boolean;
  out: { fault: boolean; run: boolean; motor: boolean };
  held: { start: boolean; stop: boolean; reset: boolean };
  jamOn: boolean;
  phase: ScanPhase;
  scanCount: number;
  svgPowered: Readonly<Record<string, boolean>>;
  walkStage: number;
  lockoutVisible: boolean;
}

interface EngineState {
  power: boolean;
  raw: { start: boolean; stop: boolean; jam: boolean; reset: boolean };
  held: { start: boolean; stop: boolean; reset: boolean };
  img: { start: boolean; stop: boolean; jam: boolean; reset: boolean };
  out: { fault: boolean; run: boolean; motor: boolean };
}

// Plain TS class (not React state) holding the ported PLC scan-cycle
// simulation. React reads it via useSyncExternalStore — rewriting this as
// useReducer/useEffect risks breaking timing under strict-mode's double
// invoke and makes the same-scan semantics harder to verify by inspection.
export class LadderEngine {
  private state: EngineState = {
    power: false,
    raw: { start: false, stop: false, jam: false, reset: false },
    held: { start: false, stop: false, reset: false },
    img: { start: false, stop: false, jam: false, reset: false },
    out: { fault: false, run: false, motor: false },
  };

  private phase: ScanPhase = null;
  private scanCount = 0;
  private loopActive = false;
  private svgPowered: Record<string, boolean> = {};

  private walkStage = 1;
  private walkRung1Revealed = false;

  private lockoutVisible = false;
  private lockoutTimer: ReturnType<typeof setTimeout> | undefined;

  private audioCtx: AudioContext | null = null;

  private listeners = new Set<() => void>();
  private snapshot: LadderSnapshot = this.buildSnapshot();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): LadderSnapshot => this.snapshot;

  private emit() {
    this.snapshot = this.buildSnapshot();
    this.listeners.forEach((l) => l());
  }

  private buildSnapshot(): LadderSnapshot {
    return {
      power: this.state.power,
      out: { ...this.state.out },
      held: { ...this.state.held },
      jamOn: this.state.raw.jam,
      phase: this.phase,
      scanCount: this.scanCount,
      svgPowered: { ...this.svgPowered },
      walkStage: this.walkStage,
      lockoutVisible: this.lockoutVisible,
    };
  }

  // ---------- Fault alarm beep (mirrors the Pi Pico trainer's real buzzer).
  // AudioContext must be created/resumed inside a genuine user gesture, so
  // ensureAudio() must only ever be called synchronously from a real
  // pointerdown/click handler, never deferred into an effect. ----------

  ensureAudio() {
    if (!this.audioCtx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      this.audioCtx = new Ctx();
    }
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
  }

  private beepFault() {
    const ctx = this.audioCtx;
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.2].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.12, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.16);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.18);
    });
  }

  // ---------- Walkthrough state machine ----------

  private advanceWalkthrough() {
    if (this.walkStage === 1 && this.state.power) {
      this.walkStage = 2;
    }
    if (this.walkStage === 2 && this.state.out.motor) {
      this.walkStage = 3;
    }
    if (this.walkStage === 3 && this.state.out.fault) {
      this.walkStage = 4;
      this.walkRung1Revealed = true;
    }
    // Reset is wired after the Jam/seal-in merge, so holding Reset genuinely
    // clears the fault for a moment even with Jam still held, real ladder
    // behavior, not a bug. But Jam is a toggle: if it's still on, the fault
    // just re-latches on the very next scan. Only count step 4 as done once
    // Jam is actually off too, otherwise this looks like a false "passed"
    // right before the fault trips again.
    if (this.walkStage === 4 && !this.state.out.fault && !this.state.raw.jam && this.walkRung1Revealed) {
      this.walkStage = 5;
    }
  }

  restartWalkthrough() {
    this.walkStage = 1;
    this.walkRung1Revealed = false;
    if (this.state.power) {
      this.setPower(false);
    } else {
      this.emit();
    }
  }

  // ---------- Rung application (updates the svgPowered map consumed by the
  // JSX rung components) ----------

  private applyRung1(r: ReturnType<typeof evalRung1>) {
    this.svgPowered = {
      ...this.svgPowered,
      'r1-jam': r.jamPass,
      'r1-seal': r.sealPass,
      'r1-out-jam': r.jamPass,
      'r1-bv2': r.sealPass,
      'r1-merge': r.mergeVal,
      'r1-reset': r.resetPass,
      'r1-post-reset': r.resetPass,
      'r1-coil': r.newFault,
      'r1-out': r.newFault,
    };
  }

  private applyRung2(r: ReturnType<typeof evalRung2>) {
    this.svgPowered = {
      ...this.svgPowered,
      'r2-start': r.startPass,
      'r2-seal': r.sealPass,
      'r2-out-start': r.startPass,
      'r2-bv2': r.sealPass,
      'r2-merge': r.mergeVal,
      'r2-stop': r.stopPass,
      'r2-post-stop': r.stopPass,
      'r2-fault': r.faultPass,
      'r2-post-fault': r.faultPass,
      'r2-coil': r.newRun,
      'r2-out': r.newRun,
    };
  }

  private applyRung3(r: ReturnType<typeof evalRung3>) {
    this.svgPowered = {
      ...this.svgPowered,
      'r3-run': r.runPass,
      'r3-mid': r.runPass,
      'r3-coil': r.newMotor,
      'r3-out': r.newMotor,
    };
  }

  // ---------- Scan loop ----------

  private async scanLoop() {
    if (this.loopActive) return;
    this.loopActive = true;

    while (this.state.power) {
      this.scanCount += 1;
      this.phase = 'input';
      this.emit();

      this.state.img = { ...this.state.raw };
      // Re-arm momentary pulses to whatever is currently physically held: a
      // quick tap collapses back to false (one-shot, consumed), a genuine
      // hold stays true so the next scan sees it again too.
      this.state.raw.start = this.state.held.start;
      this.state.raw.stop = this.state.held.stop;
      this.state.raw.reset = this.state.held.reset;
      await wait(INPUT_MS);
      if (!this.state.power) break;

      this.phase = 'program';
      const oldFault = this.state.out.fault;
      const oldRun = this.state.out.run;

      const r1 = evalRung1(oldFault, this.state.img.jam, this.state.img.reset);
      this.applyRung1(r1);
      this.state.out.fault = r1.newFault;
      if (!oldFault && this.state.out.fault) this.beepFault();
      this.emit();
      await wait(PER_RUNG_MS);
      if (!this.state.power) break;

      const r2 = evalRung2(oldRun, this.state.img.start, this.state.img.stop, this.state.out.fault);
      this.applyRung2(r2);
      this.state.out.run = r2.newRun;
      this.emit();
      await wait(PER_RUNG_MS);
      if (!this.state.power) break;

      const r3 = evalRung3(this.state.out.run);
      this.applyRung3(r3);
      this.state.out.motor = r3.newMotor;
      this.emit();
      await wait(PER_RUNG_MS);
      if (!this.state.power) break;

      this.phase = 'output';
      this.advanceWalkthrough();
      this.emit();
      await wait(OUTPUT_MS);
    }

    this.loopActive = false;
    this.phase = null;
    this.emit();
  }

  // ---------- Input wiring ----------

  setPower(on: boolean) {
    this.ensureAudio();
    this.state.power = on;
    if (on) {
      this.scanCount = 0;
      this.advanceWalkthrough();
      this.emit();
      void this.scanLoop();
    } else {
      this.state.out = { fault: false, run: false, motor: false };
      this.svgPowered = {};
      this.phase = null;
      this.advanceWalkthrough();
      this.emit();
    }
  }

  private showLockout() {
    this.lockoutVisible = true;
    if (this.lockoutTimer) clearTimeout(this.lockoutTimer);
    this.lockoutTimer = setTimeout(() => {
      this.lockoutVisible = false;
      this.emit();
    }, 2500);
  }

  pressMomentary(key: MomentaryKey) {
    this.ensureAudio();
    if ((key === 'start' || key === 'stop') && this.state.power && this.state.out.fault) {
      this.showLockout();
    }
    this.state.held[key] = true;
    this.state.raw[key] = true;
    this.emit();
  }

  releaseMomentary(key: MomentaryKey) {
    this.state.held[key] = false;
    this.emit();
  }

  toggleJam() {
    this.ensureAudio();
    this.state.raw.jam = !this.state.raw.jam;
    this.emit();
  }
}
