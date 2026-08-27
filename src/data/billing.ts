export type PlanFeature = {
  label: string;
  available: boolean;
  infoLabel?: string;
};

export const billingData = {
  plan: {
    name: "Starter",
    features: [
      { label: "No renewal", available: true },
      {
        label: "Top-up credits unavailable",
        available: false,
        infoLabel: "Why top-up credits are unavailable",
      },
      {
        label: "Credit roll-over unavailable",
        available: false,
        infoLabel: "Why credit roll-over is unavailable",
      },
    ] satisfies PlanFeature[],
  },
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
