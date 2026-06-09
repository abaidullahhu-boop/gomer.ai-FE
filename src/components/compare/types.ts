import type { ReactNode } from "react";

export type CompareRow = {
  feature: string;
  viktor: string;
  competitor: string;
};

export type ComparePageConfig = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    lastUpdated: string;
  };
  competitor: {
    name: string;
    icon: string;
    iconAlt: string;
    heroDescription: [string, string];
    heroChooseWhen: string;
    badges?: string[];
    whenChooseHeaderGradient: string;
  };
  rows: CompareRow[];
  featureSections: {
    title: string;
    paragraphs: string[];
  }[];
  whenToChoose: {
    title: string;
    competitorChooseLabel: string;
    viktorWhen: string[];
    competitorWhen: string[];
  };
  testimonials: { name: string; role: string; quote: string }[];
  faqs: { q: string; a: string }[];
  faqTitle?: ReactNode;
};
