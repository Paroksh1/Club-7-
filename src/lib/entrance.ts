/**
 * Pure-CSS entrance timing. Returns a Tailwind arbitrary-value class
 * string setting `animation-delay`, with a shorter delay under the
 * mobile breakpoint (the entrance should read as lighter/faster on
 * mobile, per brief). No JS/hydration required — works from first
 * paint, and degrades safely if JS never runs.
 */
export function entrance(delayMs: number, mobileDelayMs?: number): string {
  const mobile = mobileDelayMs ?? Math.round(delayMs * 0.65);
  return `[animation-delay:${delayMs}ms] max-[640px]:[animation-delay:${mobile}ms]`;
}
