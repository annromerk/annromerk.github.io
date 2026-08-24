// Gentle overshoot-and-settle (easeOutBack) for the hero stat count-up.
// Standard easeOutBack uses c1=1.70158 (~10% overshoot), but these targets
// are small single-digit numbers, so a full 10% overshoot on "5" would round
// up to a visible "6" for a frame before settling back down.
const C1 = 0.8;
const C3 = C1 + 1;

export function easeOutBackSubtle(t: number): number {
  return 1 + C3 * (t - 1) ** 3 + C1 * (t - 1) ** 2;
}
