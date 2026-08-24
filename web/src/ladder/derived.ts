import type { LadderSnapshot } from './engine';

// Ports updateStatusBanner()'s plain-language state derivation.
export function statusBanner(s: LadderSnapshot) {
  if (!s.power) {
    return { cls: 'state-off', title: 'PLC OFF', desc: 'Turn it on to begin.' };
  }
  if (s.out.fault) {
    return {
      cls: 'state-fault',
      title: 'FAULT LOCKED OUT',
      desc: "Start and Stop won't do anything until you press Reset.",
    };
  }
  if (s.out.motor) {
    return { cls: 'state-running', title: 'RUNNING', desc: 'The simulated conveyor motor is on.' };
  }
  return { cls: 'state-ready', title: 'READY', desc: 'Press Start to run it, or Jam to simulate a fault.' };
}

// Ports updateWalkthroughGate()'s per-button enabled state.
export function walkthroughGate(s: LadderSnapshot) {
  if (s.walkStage >= 5) {
    return { start: s.power, stop: s.power, jam: s.power, reset: s.power };
  }
  return {
    start: s.power && s.walkStage === 2,
    stop: false,
    jam: s.power && (s.walkStage === 3 || s.walkStage === 4),
    reset: s.power && s.walkStage === 4,
  };
}
