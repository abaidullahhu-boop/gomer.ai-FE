/**
 * Pure arithmetic over a credit balance.
 *
 * Kept apart from `credits.tsx` because that file exports a React component;
 * mixing helpers into it breaks fast refresh, and these functions have no
 * business depending on React anyway.
 */

import type { CreditBalance, CreditBucket } from "./api";

/** Share of granted credits still unspent, clamped to 0–100 for the meter. */
export function creditProgressPercent(balance: CreditBalance | null | undefined): number {
  if (!balance || balance.granted <= 0) return 0;
  return Math.max(Math.min((balance.balance / balance.granted) * 100, 100), 0);
}

/** What one bucket currently holds; 0 when the bucket is absent or empty. */
export function bucketCredits(
  balance: CreditBalance | null | undefined,
  bucket: CreditBucket,
): number {
  return balance?.buckets.find((entry) => entry.bucket === bucket)?.credits ?? 0;
}

/**
 * Credits that were given rather than bought — the trial, referrals, seat
 * bonuses and support goodwill.
 *
 * Read from the reward bucket rather than by summing grants, because a grant
 * records what arrived, not what is left. Summing grants overstated the figure
 * the moment any of it was spent.
 */
export function rewardCredits(balance: CreditBalance | null | undefined): number | null {
  if (!balance) return null;
  return bucketCredits(balance, "reward");
}

/** Credits that expire at the end of a period: this month's and last month's. */
export function expiringCredits(balance: CreditBalance | null | undefined): number {
  return bucketCredits(balance, "rollover") + bucketCredits(balance, "plan");
}

/** Credits with no expiry — bought outright or given. */
export function permanentCredits(balance: CreditBalance | null | undefined): number {
  return bucketCredits(balance, "topup") + bucketCredits(balance, "reward");
}

/**
 * The soonest moment any of the workspace's credits run out, or null when
 * nothing is on a clock.
 */
export function nextExpiry(balance: CreditBalance | null | undefined): Date | null {
  const stamps = (balance?.buckets ?? [])
    .filter((entry) => entry.credits > 0 && entry.expiresAt)
    .map((entry) => new Date(entry.expiresAt as string).getTime())
    .filter((time) => Number.isFinite(time));
  return stamps.length ? new Date(Math.min(...stamps)) : null;
}
