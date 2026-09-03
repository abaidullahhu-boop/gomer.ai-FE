export type PlanFeature = {
  label: string;
  available: boolean;
  infoLabel?: string;
};

/**
 * What a plan gives you, shown on the current-plan card.
 *
 * These describe the shape of the offer rather than any workspace's state, so
 * they are static — but they must stay true to `plans.ts` in the backend. The
 * three lines below were previously the *opposite* of what shipped ("no
 * renewal", "roll-over unavailable"), left over from before subscriptions
 * existed.
 */
export const PLAN_FEATURES: PlanFeature[] = [
  { label: "Renews monthly", available: true },
  {
    label: "Unused credits roll over one month",
    available: true,
    infoLabel: "How credit roll-over works",
  },
  { label: "Top up any time — top-ups never expire", available: true },
];

/** Shown when the workspace has no subscription at all. */
export const FREE_PLAN_FEATURES: PlanFeature[] = [
  { label: "Free trial credits, no expiry", available: true },
  { label: "Top up any time — top-ups never expire", available: true },
  { label: "No monthly allowance", available: false, infoLabel: "What a plan adds" },
];

export const billingData = {
  // Credit figures come from /billing/summary via `useCredits` — never from here.
  inviteLink: "https://app.gomer.com/signin?ref=eY9xAiDrEahAt3NDC5CNLH",
  referrals: {
    totalEarned: "0 credits",
    rewards: [] as Array<{
      id: string;
      name: string;
      date: string;
      credits: string;
    }>,
  },
} as const;
