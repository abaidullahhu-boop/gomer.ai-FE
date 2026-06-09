import { useEffect, useState, type ReactNode } from "react";
import adsLogo from "@/assets/images/pricing-ads.webp";
import outreachLogo from "@/assets/images/pricing-outreach.avif";
import pipelineLogo from "@/assets/images/pricing-pipeline.webp";
import reportsLogo from "@/assets/images/pricing-reports.avif";
import slackLogo from "@/assets/images/slack.svg";
import zapierLogo from "@/assets/images/zapier.svg";

const WORD_CYCLE_MS = 2500;
const ICON_CLASS = "size-10 md:size-12 lg:size-14 shrink-0";

type CreditsPowerItem = {
  label: string;
  icon: ReactNode;
};

function OrganizationIcon() {
  return (
    <span
      className={`inline-block rounded-full bg-[radial-gradient(circle_at_30%_30%,#5a6470,#0f1722_70%)] ${ICON_CLASS}`}
      aria-hidden="true"
    />
  );
}

function IntegrationIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2.5" fill="#000" />
      <path fill="#fff" d="M4.5 3.2 12 1.5l7.5 1.7v15.1L12 21.5 4.5 18.4V3.2zm1.4 1.5v12.6l5.1 2.2V6.9L5.9 4.7zm6.5 2.2v11.8l5.1-2.2V6.9l-5.1-2.2z" />
    </svg>
  );
}

function PricingLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt=""
      className={`${ICON_CLASS} rounded-full object-contain`}
      draggable={false}
    />
  );
}

const creditsPowerItems: CreditsPowerItem[] = [
  { label: "ads", icon: <PricingLogo src={adsLogo} alt="ads" /> },
  { label: "outreach", icon: <PricingLogo src={outreachLogo} alt="outreach" /> },
  { label: "integration", icon: <IntegrationIcon /> },
  { label: "pipeline", icon: <PricingLogo src={pipelineLogo} alt="pipeline" /> },
  { label: "automation", icon: <img src={zapierLogo} alt="" className={ICON_CLASS} draggable={false} /> },
  { label: "reports", icon: <PricingLogo src={reportsLogo} alt="reports" /> },
  { label: "cord", icon: <img src={slackLogo} alt="" className={ICON_CLASS} draggable={false} /> },
  { label: "organization", icon: <OrganizationIcon /> },
];

export function CreditsPowerHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((i) => (i + 1) % creditsPowerItems.length),
      WORD_CYCLE_MS,
    );
    return () => clearInterval(t);
  }, []);

  const active = creditsPowerItems[activeIndex];

  return (
    <h2 className="typo-h2 text-center">
      Credits power everything
      <br />
      Viktor does:{" "}
      <span className="inline-flex items-center justify-center gap-3 align-middle min-w-[14rem] md:min-w-[18rem] lg:min-w-[20rem]">
        <span className="inline-flex h-[1.6em] items-end overflow-hidden">
          <span key={activeIndex} className="inline-flex items-center gap-3 animate-credits-word-in leading-[1.25]">
            {active.icon}
            <span className="capitalize">{active.label}</span>
          </span>
        </span>
      </span>
    </h2>
  );
}
