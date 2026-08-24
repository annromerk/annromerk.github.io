import { describe, expect, it } from 'vitest';
import { evalRung1, evalRung2, evalRung3 } from './rungLogic';

// Known input/output pairs, checked against js/ladder-simulator.js's
// original behavior before any UI was built on top of this port.

describe('evalRung1 (fault latch: Jam OR seal-in Fault, then NOT Reset)', () => {
  it('stays clear with no jam, no prior fault, no reset', () => {
    expect(evalRung1(false, false, false).newFault).toBe(false);
  });

  it('jam alone sets the fault', () => {
    expect(evalRung1(false, true, false).newFault).toBe(true);
  });

  it('seals in: a prior fault stays latched even once jam clears', () => {
    expect(evalRung1(true, false, false).newFault).toBe(true);
  });

  it('reset clears the fault even while jam is still held (real ladder behavior, not a bug)', () => {
    const r = evalRung1(true, true, true);
    expect(r.mergeVal).toBe(true);
    expect(r.newFault).toBe(false);
  });

  it('reset with nothing else active stays clear', () => {
    expect(evalRung1(false, false, true).newFault).toBe(false);
  });
});

describe('evalRung2 (motor starter: (Start OR seal-in Run) AND NOT Stop AND NOT Fault)', () => {
  it('start alone (no prior run, no stop, no fault) energizes run', () => {
    expect(evalRung2(false, true, false, false).newRun).toBe(true);
  });

  it('seals in: prior run stays on once start is released', () => {
    expect(evalRung2(true, false, false, false).newRun).toBe(true);
  });

  it('stop breaks the seal even if start is held', () => {
    expect(evalRung2(true, true, true, false).newRun).toBe(false);
  });

  it('a same-scan fault immediately cuts run, even with start held', () => {
    expect(evalRung2(true, true, false, true).newRun).toBe(false);
  });

  it('nothing active stays off', () => {
    expect(evalRung2(false, false, false, false).newRun).toBe(false);
  });
});

describe('evalRung3 (direct output: Motor = Run)', () => {
  it('mirrors run when on', () => {
    expect(evalRung3(true).newMotor).toBe(true);
  });

  it('mirrors run when off', () => {
    expect(evalRung3(false).newMotor).toBe(false);
  });
});
