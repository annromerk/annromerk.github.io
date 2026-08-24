import { describe, expect, it } from 'vitest';
import { easeOutBackSubtle } from './easing';

describe('easeOutBackSubtle (hero stat count-up curve)', () => {
  it('starts at 0', () => {
    expect(easeOutBackSubtle(0)).toBeCloseTo(0, 5);
  });

  it('ends exactly at 1', () => {
    expect(easeOutBackSubtle(1)).toBeCloseTo(1, 5);
  });

  it('overshoots past 1 partway through (the "spring" feel)', () => {
    const samples = Array.from({ length: 101 }, (_, i) => easeOutBackSubtle(i / 100));
    expect(Math.max(...samples)).toBeGreaterThan(1);
  });

  it('keeps the overshoot small enough that a target of 5 never rounds up to 6', () => {
    const samples = Array.from({ length: 101 }, (_, i) => easeOutBackSubtle(i / 100));
    const peak = Math.max(...samples);
    expect(Math.round(peak * 5)).toBe(5);
  });

  it('keeps the overshoot small enough that a target of 3 never rounds up to 4', () => {
    const samples = Array.from({ length: 101 }, (_, i) => easeOutBackSubtle(i / 100));
    const peak = Math.max(...samples);
    expect(Math.round(peak * 3)).toBe(3);
  });
});
