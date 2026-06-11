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
  credits: {
    available: "39.4k",
    reward: "39.4k",
    progressPercent: 100,
  },
  inviteLink: "https://app.viktor.com/signin?ref=eY9xAiDrEahAt3NDC5CNLH",
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
