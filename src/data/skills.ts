import bundleGoogleAds from "@/assets/images/bundle.png";
import bundleMetaAds from "@/assets/images/bundle2.png";

// The skill catalogue and per-user install state now come from the backend
// (`@/lib/api`). This file only holds the static bundle showcase, which the
// backend does not model yet.

export type SkillBundle = {
  slug: string;
  title: string;
  description: string;
  image: string;
  author: string;
  authorTitle: string;
  skillCount: number;
  verified: boolean;
};

export const skillBundles: SkillBundle[] = [
  {
    slug: "google-ads-toolkit",
    title: "Google Ads Toolkit",
    description:
      "27 skills covering Search, Shopping, PMax, YouTube, Demand Gen, bidding, budgets, and creative — with maturity-calibrated analysis and Google Ads Editor-ready outputs.",
    image: bundleGoogleAds,
    author: "Julio Casado",
    authorTitle: "Full Funnel Growth",
    skillCount: 27,
    verified: true,
  },
  {
    slug: "meta-ads-toolkit",
    title: "Meta Ads Toolkit",
    description:
      "28 skills for full Meta Ads execution — campaign creation, audience management, automated rules, A/B testing, CAPI events, and creative strategy, all with human approval on every write.",
    image: bundleMetaAds,
    author: "Matt Swulinski",
    authorTitle: "Wispr Flow",
    skillCount: 28,
    verified: true,
  },
];
