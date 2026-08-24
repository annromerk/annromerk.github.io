import { useState, useSyncExternalStore } from 'react';
import { LadderEngine } from './engine';

export function useLadderEngine() {
  const [engine] = useState(() => new LadderEngine());
  const snapshot = useSyncExternalStore(engine.subscribe, engine.getSnapshot);
  return { engine, snapshot };
}
