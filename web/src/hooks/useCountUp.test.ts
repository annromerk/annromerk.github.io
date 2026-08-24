import { describe, expect, it } from 'vitest';
import { countUpValueAt } from './useCountUp';

describe('countUpValueAt (hero stat count-up easing)', () => {
  it('starts at 0', () => {
    expect(countUpValueAt(0, 1100, 5)).toBe(0);
  });

  it('reaches the exact target at the animation duration', () => {
    expect(countUpValueAt(1100, 1100, 5)).toBe(5);
  });

  it('clamps to the target well past the duration (e.g. a throttled/backgrounded tab)', () => {
    expect(countUpValueAt(60_000, 1100, 3)).toBe(3);
  });

  it('never returns a negative value for negative elapsed time', () => {
    expect(countUpValueAt(-50, 1100, 5)).toBe(0);
  });

  it('is monotonically non-decreasing as elapsed time increases', () => {
    const samples = [0, 100, 300, 600, 900, 1100].map((t) => countUpValueAt(t, 1100, 5));
    for (let i = 1; i < samples.length; i++) {
      expect(samples[i]).toBeGreaterThanOrEqual(samples[i - 1]);
    }
    expect(samples.at(-1)).toBe(5);
  });

  it('is already past the midpoint value by the halfway mark (ease-out, not linear)', () => {
    const half = countUpValueAt(550, 1100, 10);
    expect(half).toBeGreaterThan(5);
  });
});
