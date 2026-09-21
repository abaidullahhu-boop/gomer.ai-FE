import bundleGoogleAds from "@/assets/images/bundle.png";
import bundleMetaAds from "@/assets/images/bundle2.png";

// The skill catalogue and per-user install state now come from the backend
// (`@/lib/api`). This file only holds the static bundle showcase, which the
// backend does not model yet: a bundle is simply every catalogue skill in one
// category, so `categorySlug` is how the detail page finds its members.

export type SkillBundle = {
  slug: string;
  title: string;
  description: string;
  image: string;
  author: string;
  authorTitle: string;
  /**
   * The catalogue category (as the API slugs it) whose skills make up this
   * bundle. Must match `Skill.category.slug` from `/skills`.
   */
  categorySlug: string;
  /** Advertised size; the detail page shows the live count once loaded. */
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
    categorySlug: "google-ads",
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
    categorySlug: "meta-ads",
    skillCount: 28,
    verified: true,
  },
];

/** The bundle behind a `/dashboard/skills/bundle/:slug` URL, if there is one. */
export function findSkillBundle(slug: string): SkillBundle | undefined {
  return skillBundles.find((bundle) => bundle.slug === slug);
}
