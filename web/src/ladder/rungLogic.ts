// Pure rung-evaluation functions, ported verbatim from js/ladder-simulator.js.
// Mirrors real PLC same-scan behavior: a contact referencing THIS rung's own
// coil reads the value from before this rung executed; a contact referencing
// an earlier rung's coil in the same scan reads that rung's freshly solved
// value. Kept as standalone pure functions (not engine methods) so they can
// be unit-tested directly against known input/output pairs.

export interface Rung1Result {
  jamPass: boolean;
  sealPass: boolean;
  mergeVal: boolean;
  resetPass: boolean;
  newFault: boolean;
}

export function evalRung1(oldFault: boolean, jam: boolean, reset: boolean): Rung1Result {
  const jamPass = jam;
  const sealPass = oldFault;
  const mergeVal = jamPass || sealPass;
  const resetPass = mergeVal && !reset;
  return { jamPass, sealPass, mergeVal, resetPass, newFault: resetPass };
}

export interface Rung2Result {
  startPass: boolean;
  sealPass: boolean;
  mergeVal: boolean;
  stopPass: boolean;
  faultPass: boolean;
  newRun: boolean;
}

export function evalRung2(oldRun: boolean, start: boolean, stop: boolean, faultNow: boolean): Rung2Result {
  const startPass = start;
  const sealPass = oldRun;
  const mergeVal = startPass || sealPass;
  const stopPass = mergeVal && !stop;
  const faultPass = stopPass && !faultNow;
  return { startPass, sealPass, mergeVal, stopPass, faultPass, newRun: faultPass };
}

export interface Rung3Result {
  runPass: boolean;
  newMotor: boolean;
}

export function evalRung3(run: boolean): Rung3Result {
  return { runPass: run, newMotor: run };
}
