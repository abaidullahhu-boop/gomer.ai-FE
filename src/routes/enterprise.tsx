import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import gomerAvatar from "@/assets/images/gomer-marketplace-avatar.svg";
import soc2Badge from "@/assets/images/soc2.svg";
import gdprBadge from "@/assets/images/gdpr.svg";
import ccpaBadge from "@/assets/images/ccpa.svg";
import casaTier3Badge from "@/assets/images/casa-tier-3.svg";
import onboardingInstallSlackImage from "@/assets/images/enterprise-onboarding-install-slack.avif";
import onboardingConnectOAuthImage from "@/assets/images/enterprise-onboarding-connect-oauth.avif";
import onboardingAdminPoliciesImage from "@/assets/images/enterprise-onboarding-admin-policies.avif";
import comparisonTabActiveBg from "@/assets/images/download (1).svg";
import { PageMeta } from "@/components/PageMeta";
import {
  KeyRound, Eye,
  Play,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { EnterpriseHeroPoints } from "@/components/site/HeroBadges";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { StartFreeSection } from "@/components/site/StartFreeSection";
import { FAQSection } from "@/components/site/FAQSection";
import { SlackReactions, type SlackReaction } from "@/components/site/SlackReactions";

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;

const customerTestimonials = [
  { name: "Boris Wexler", role: "CEO, Space Dinosaurs", saved: "10+ hrs/week", quote: "Gomer is an incredible tool — it was almost instantly adopted by the bulk of my team.", image: avatar("photo-1500648767791-00dcc994a43e") },
  { name: "Robert Tyrrell", role: "Owner, TalentBright", saved: "10+ hrs/week", quote: "It's blown my mind seeing what Gomer can actually do. I'm having real conversations with my partner about investing in an AI tool the way we used to talk about hiring actual people.", image: avatar("photo-1519345182560-3f2917c472ef") },
  { name: "Jordan Dikoum", role: "Co-Founder, UniTru Inc.", saved: "10+ hrs/week", quote: "Gomer is our eyes, ears, and hands. We might really never have to hire someone again.", image: avatar("photo-1506794778202-cad84cf45f1d") },
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Enterprise — Gomer"
        description="One AI employee. Enterprise-ready. SSO, RBAC, audit logs, SOC 2, GDPR — everything your security, IT, and procurement teams ask for."
        ogTitle="Enterprise — Gomer"
        ogDescription="Enterprise-ready AI coworker with SSO, SCIM, audit logs, and SOC 2."
        ogUrl="/enterprise"
        canonical="/enterprise"
      />
      <EnterpriseHero />
      <ComplianceGrid />
      <DeliverablesTabs />
      <SecurityAlly />
      <TestimonialsCarousel items={customerTestimonials} title="What our customers say" />
      <AddInTwoMinutes />
      <FAQSection
        faqs={ENTERPRISE_FAQS}
        title={
          <>
            Questions people ask
            <br />
            before adding Gomer
          </>
        }
      />
      <StartFreeSection
        title={
          <>
            Start free.
            <br />
            Pay only when you're ready.
          </>
        }
        description="Every Gomer Team integration is $30 / month per seat. Unlimited tasks lived and aided with no admin. Bring your team start when it makes 30 minutes."
        points={[
          "SAML + integrations",
          "Users and Teams",
          "Approvals, customizable scopes",
          "Costs and PII reviews",
          "SOC 2 compliance",
        ]}
      />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */

const HERO_TICKER_PHRASES = ["Every team.", "Enterprise-ready."];
const HERO_TICKER_INTERVAL_MS = 3200;

function HeroHeadlineTicker({ phrases }: { phrases: readonly string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((i) => (i + 1) % phrases.length),
      HERO_TICKER_INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, [phrases.length]);

  return (
    <>
      <span className="sr-only">{phrases.join(" ")}</span>
      <br aria-hidden="true" />
      <span
        aria-hidden="true"
        className="relative isolate mx-auto block max-w-full overflow-hidden motion-reduce:hidden h-[calc(1lh+0.17em)]"
      >
        <span className="grid size-full [grid-template-areas:'ticker-slot']">
          {phrases.map((phrase, index) => (
            <span
              key={phrase}
              aria-hidden="true"
              className={[
                "flex justify-center justify-self-center [grid-area:ticker-slot] text-balance whitespace-nowrap text-integrations-hero-gradient transition-all duration-500 ease-out",
                index === activeIndex
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[120%] opacity-0",
              ].join(" ")}
            >
              {phrase}
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only motion-reduce:not-sr-only motion-reduce:block text-integrations-hero-gradient">
        {phrases[activeIndex]}
      </span>
    </>
  );
}

function EnterpriseHero() {
  return (
    <section className="border-0 py-0">
      <div className="relative w-full overflow-hidden rounded-b-section bg-integrations-hero-surface sm:rounded-b-section">
        <Nav heroTone="light" />
        <div className="hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-5 pb-20 text-center sm:px-8 md:gap-20 md:px-12 md:pb-24 lg:px-20 lg:pb-28 mt-16">
          <div className="flex w-full max-w-4xl flex-col items-center gap-8">
            <h1 className="font-heading h2 text-balance sm:h1">
              One AI employee.
              <HeroHeadlineTicker phrases={HERO_TICKER_PHRASES} />
            </h1>

            <p className="body-main max-w-[547px] text-secondary font-medium">
              Lives in Slack, works across 3,200+ tools. SSO, RBAC, audit logs, and a security
              model your CISO will actually sign.
            </p>

            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center">
              <GetStartedButton
                variant="dark"
                className="inline-flex h-14 min-h-14 w-full items-center justify-center px-10 text-base tracking-[-0.01em] sm:w-auto"
              />
              <a
                href="https://cal.com/forms/24cb15e9-8a3d-4d94-9209-cc3d5f198286"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-full border border-[#1a182b1a] px-10 text-base font-medium tracking-[-0.01em] text-primitive-main-dark transition-all hover:bg-[#1a182b]/[0.06] active:translate-y-px sm:w-auto"
              >
                Book a Demo
              </a>
            </div>
          </div>

          <EnterpriseHeroPoints />
        </div>
      </div>
    </section>
  );
}

/* ---------------- DATA HANDLING 3-COLUMN GRID ---------------- */

type ComplianceColumnData = {
  title: string;
  pillClassName: string;
  icon: ReactNode;
  rows: { t: string; d: string }[];
};

function IdentityAccessIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-5 shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.6235 2.6235C4.37209 0.874903 6.8971 0 10 0C13.1029 0 15.6279 0.874903 17.3766 2.6235C19.1251 4.37209 20 6.8971 20 10C20 13.1029 19.1251 15.6279 17.3766 17.3766C15.6279 19.1251 13.1029 20 10 20C6.8971 20 4.37209 19.1251 2.6235 17.3766C0.874903 15.6279 0 13.1029 0 10C0 6.8971 0.874903 4.37209 2.6235 2.6235ZM10 6.07143C8.42204 6.07143 7.14286 7.35061 7.14286 8.92857C7.14286 10.1947 7.96646 11.2685 9.10714 11.6434V13.4152C9.10714 13.9083 9.50689 14.308 10 14.308C10.4931 14.308 10.8929 13.9083 10.8929 13.4152V11.6434C12.0335 11.2685 12.8571 10.1947 12.8571 8.92857C12.8571 7.35061 11.578 6.07143 10 6.07143Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ComplianceShieldIcon() {
  return (
    <svg viewBox="0 0 19.9995 19.7823" fill="none" aria-hidden className="size-5 shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.10721 0C7.81143 0.174354 6.24625 0.663574 4.96455 1.12072C4.1483 1.41187 3.41371 1.70255 2.88343 1.92033C2.61804 2.02931 2.40323 2.12028 2.25423 2.18424C2.17973 2.21621 2.12163 2.24145 2.08187 2.25884L2.0362 2.27888L2.02411 2.28423L2.02083 2.28567L2.01988 2.2861C2.01978 2.28614 2.01943 2.2863 2.30944 2.93905L2.01988 2.2861C1.99865 2.29553 1.97744 2.3062 1.95723 2.31764L2.30944 2.93905C1.95723 2.31764 1.95641 2.31811 1.95558 2.31858L1.95388 2.31955L1.9504 2.32157L1.94301 2.32591L1.92661 2.33591C1.91497 2.34318 1.90193 2.35167 1.88761 2.36148C1.85895 2.38113 1.82528 2.40603 1.78743 2.43711C1.71157 2.49941 1.61981 2.58581 1.51851 2.70337C1.31556 2.93888 1.07838 3.29464 0.85282 3.82421C0.428764 4.81981 0.0419766 6.43817 0 9.06307H9.10721V0ZM0.0788613 10.8488C0.444866 13.676 1.98261 15.6942 3.80357 17.1032C5.54844 18.4533 7.5661 19.258 9.10721 19.727V10.8488H0.0788613ZM10.8929 19.7823C12.4483 19.3213 14.5203 18.5056 16.296 17.098C18.0773 15.686 19.5677 13.6687 19.9228 10.8488H10.8929V19.7823ZM19.9995 9.06307H10.8929V8.32826e-05C12.1886 0.17451 13.7535 0.663647 15.035 1.12072C15.8513 1.41187 16.5858 1.70255 17.1161 1.92033C17.3815 2.02931 17.5963 2.12028 17.7453 2.18424C17.8198 2.21621 17.8778 2.24145 17.9177 2.25884L17.9633 2.27888L17.9754 2.28423L17.9787 2.28567L17.9797 2.2861C17.9797 2.28614 17.9801 2.2863 17.6901 2.93905C18.0423 2.31764 18.0431 2.31811 18.044 2.31858L18.0457 2.31955L18.0491 2.32157L18.0565 2.32591L18.073 2.33591C18.0845 2.34318 18.0975 2.35167 18.112 2.36148C18.1405 2.38113 18.1743 2.40603 18.2121 2.43711C18.288 2.49941 18.3797 2.58581 18.481 2.70337C18.684 2.93888 18.9211 3.29464 19.1467 3.82421C19.5708 4.81981 19.9575 6.43817 19.9995 9.06307ZM17.6901 2.93905L18.0423 2.31764C18.0221 2.3062 18.001 2.29553 17.9797 2.2861L17.6901 2.93905Z"
        fill="currentColor"
      />
    </svg>
  );
}

function OperationsIcon() {
  return (
    <svg viewBox="0 0 15.7207 20.0058" fill="none" aria-hidden className="size-5 shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9205 1.53962C10.9889 0.496322 9.92199 -0.361731 8.88398 0.154436C5.35869 1.90742 2.33961 5.61293 0.277837 9.30163C-0.560277 10.8011 0.616723 12.4766 2.22044 12.4766H4.64225C4.23911 14.4048 4.02272 16.4544 3.89722 18.4654C3.81889 19.7206 5.25034 20.4607 6.23568 19.695C11.1134 15.9044 14.0954 11.7542 15.4873 9.10618C16.1173 7.90774 15.4133 6.49944 14.0793 6.27054C13.0124 6.08751 11.8045 5.97868 10.6333 5.91768L10.9205 1.53962Z"
        fill="currentColor"
      />
    </svg>
  );
}

const complianceColumns: ComplianceColumnData[] = [
  {
    title: "Identity & Access",
    pillClassName: "bg-[rgba(103,72,253,0.16)] text-[#6748fd]",
    icon: <IdentityAccessIcon />,
    rows: [
      {
        t: "Slack-native auth",
        d: "Gomer inherits your existing Slack SSO/SAML, MFA, and provisioning. No separate Gomer password or identity store.",
      },
      {
        t: "Approval policies",
        d: "Configure which action types require human approval. Defaults are conservative.",
      },
      {
        t: "EU data residency roadmap",
        d: "EU data residency is on the roadmap - ask us for the current timeline.",
      },
    ],
  },
  {
    title: "Compliance",
    pillClassName: "bg-[rgba(253,188,160,0.16)] text-[#cc9881]",
    icon: <ComplianceShieldIcon />,
    rows: [
      {
        t: "Per-user OAuth",
        d: "Each person connects their own Google, HubSpot, Linear, GitHub, and other tools. Gomer only sees what that user has granted access to. Credentials stay in your SSO layer, never in ours.",
      },
      {
        t: "Retention roadmap",
        d: "Configurable retention is not available today. If retention requirements matter for your rollout, talk to us about your needs and timeline.",
      },
      {
        t: "Workspace-scoped skills",
        d: "Skills, memory, and scheduled tasks live inside your Gomer workspace and never cross to another customer.",
      },
    ],
  },
  {
    title: "Operations",
    pillClassName: "bg-[rgba(208,162,201,0.16)] text-[#a37f9e]",
    icon: <OperationsIcon />,
    rows: [
      {
        t: "Usage reporting",
        d: "The Gomer team can generate usage reports from admin data to support rollout reviews, adoption tracking, and procurement conversations.",
      },
      {
        t: "DPA included",
        d: "GDPR + CCPA Data Processing Agreement available for every Enterprise customer. Ready to sign during procurement.",
      },
      {
        t: "Direct line to our team",
        d: "A dedicated channel in the Gomer Community Slack where you talk to the engineers building Gomer and other power users.",
      },
    ],
  },
];

function ComplianceGlassCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative h-full w-full rounded-2xl bg-white/20 px-8 py-6 lg:min-h-[163px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
          mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
          WebkitMask:
            "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
          padding: "1px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(5px)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
            mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
            WebkitMask:
              "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
            padding: "4px",
          }}
        />
      </div>
      <div className="relative z-[2] flex h-full w-full flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="body-medium text-primitive-main-dark">{title}</h3>
          <p className="body-small text-secondary font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ComplianceColumn({ data }: { data: ComplianceColumnData }) {
  return (
    <div className="flex flex-col gap-5">
      <div
        className={`body-main inline-flex h-12 w-fit items-center justify-center gap-4 rounded-full px-6 ${data.pillClassName}`}
      >
        {data.icon}
        {data.title}
      </div>
      <div className="flex flex-col gap-4">
        {data.rows.map((row) => (
          <ComplianceGlassCard key={row.t} title={row.t} description={row.d} />
        ))}
      </div>
    </div>
  );
}

function ComplianceGrid() {
  return (
    <section className="bg-primitive-main-beige pt-14 pb-14 sm:pt-[7rem] sm:pb-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end">
            <div className="w-full lg:w-[776px] lg:shrink-0">
              <div className="w-full pb-4">
                <div className="inline-flex max-w-full items-center">
                  <p className="body-small m-0 max-w-full truncate font-medium text-[#4e32b5]">
                    Data handling
                  </p>
                </div>
              </div>
              <h2 className="font-heading h3 max-w-[776px] text-balance">
                Everything your security, IT, and procurement teams ask for. By default.
              </h2>
            </div>
            <p className="font-medium body-main max-w-[472px] text-secondary lg:flex-1 lg:pb-1">
              The audit reports are real, the controls are continuously monitored, and the next
              audit is always on the calendar.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {complianceColumns.map((column) => (
              <ComplianceColumn key={column.title} data={column} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- DELIVERABLES TABS ---------------- */

type TabIconProps = { className?: string };

function MarketingIcon({ className }: TabIconProps) {
  return (
    <svg viewBox="0 0 20.0011 20.0001" fill="none" className={className} aria-hidden="true">
      <path d="M10.1075 0C10.4625 6.51119e-05 10.7934 0.058444 11.0896 0.205079C11.3912 0.354604 11.6073 0.571401 11.7704 0.806361C11.9256 1.03013 12.0393 1.28013 12.1331 1.5067C12.1779 1.61483 12.2158 1.71101 12.2531 1.80524C12.3055 1.93759 12.3566 2.06821 12.4247 2.22656C12.6201 2.68016 13.1354 2.86743 13.577 2.64649C13.7371 2.56639 13.8695 2.49449 14.0039 2.42187C14.0921 2.37429 14.1828 2.32556 14.2816 2.274C14.5043 2.15776 14.7567 2.03553 15.0237 1.9615C15.304 1.88386 15.6143 1.85486 15.9473 1.9336C16.2743 2.01109 16.572 2.17991 16.8513 2.41211C17.1352 2.64814 17.3579 2.91434 17.493 3.22824C17.6305 3.54759 17.6538 3.86289 17.6242 4.15597C17.5959 4.43556 17.5179 4.71094 17.44 4.95536C17.408 5.05574 17.3759 5.14896 17.3452 5.24136C17.2935 5.39707 17.2436 5.5508 17.1903 5.73103C17.0496 6.20756 17.3243 6.672 17.7902 6.77874C17.8603 6.79479 17.9423 6.81227 18.026 6.83036C18.154 6.85807 18.2883 6.88794 18.3943 6.91406C18.5895 6.9622 18.8117 7.0262 19.022 7.13589C19.2436 7.25157 19.4503 7.41564 19.6163 7.65067C19.7782 7.87977 19.8802 8.14523 19.9429 8.43471C20.012 8.75407 20.0259 9.0682 19.9498 9.37081C19.8716 9.6814 19.7113 9.9254 19.5229 10.12C19.3448 10.3038 19.1349 10.4498 18.9468 10.5706C18.8579 10.6276 18.7628 10.6851 18.6719 10.7408L18.651 10.7547C18.5512 10.816 18.4512 10.8777 18.3496 10.9431C17.945 11.2036 17.8469 11.7345 18.1418 12.1289C18.2532 12.2778 18.353 12.4029 18.4543 12.5293C18.5159 12.6062 18.5795 12.6833 18.6455 12.7679C18.8023 12.9692 18.9715 13.2007 19.0932 13.4528C19.221 13.7177 19.3056 14.025 19.276 14.375C19.2467 14.7189 19.1128 15.0407 18.9119 15.3474C18.737 15.614 18.5335 15.8386 18.2855 16.0017C18.0319 16.1683 17.7662 16.2473 17.5056 16.2766C17.2575 16.3043 17.0125 16.2857 16.7969 16.2611C16.69 16.249 16.5783 16.2339 16.4719 16.2193H16.4649C16.3536 16.2041 16.2425 16.1881 16.1273 16.1747C15.6455 16.1181 15.227 16.466 15.1967 16.9601C15.1863 17.1289 15.1816 17.2636 15.1772 17.401C15.1739 17.5016 15.1703 17.6039 15.1646 17.7219C15.1529 17.9631 15.1322 18.233 15.0627 18.4933C14.99 18.766 14.8622 19.0381 14.6373 19.2801C14.4163 19.5177 14.1345 19.6901 13.8086 19.82C13.4607 19.9586 13.1141 20.0271 12.7679 19.9903C12.4158 19.9526 12.1252 19.8126 11.8834 19.6373C11.6531 19.4701 11.4529 19.2591 11.2779 19.0653C11.2099 18.99 11.1463 18.9184 11.084 18.8477C11.3079 18.3899 11.4653 17.9007 11.5458 17.3967L12.8739 17.0857C12.8918 17.0814 12.9106 17.0764 12.9283 17.0717L13.1153 17.0214C13.133 17.0167 13.1521 17.0114 13.1697 17.0061C13.5265 16.898 14.1616 16.6549 14.6945 16.0673L14.767 15.9836L14.8786 15.844L14.9233 15.7854L15.0935 15.5301C15.4592 14.9311 15.606 14.2999 15.6543 13.7751L15.671 13.5184C15.6882 13.0923 15.6523 12.6729 15.5887 12.281L15.4995 11.8234C15.2693 10.7893 14.8283 9.71261 14.3039 8.73604L14.0751 8.3231H14.0737C13.5281 7.3784 12.8464 6.42929 12.0871 5.65849L11.7578 5.339H11.7564C11.3665 4.98131 10.901 4.62024 10.3725 4.34291L10.1423 4.22991V4.22851L9.92889 4.13783C9.41269 3.93031 8.76089 3.77749 8.03575 3.85743L7.95484 3.86859L7.77766 3.89649L7.56002 3.94391L7.40516 3.98856L7.31169 4.01926C6.88372 4.16881 6.54899 4.38907 6.31002 4.58287L6.10355 4.76423L6.05472 4.81166L5.91801 4.94977L5.88731 4.98186L0.887313 10.2958C0.820504 10.2409 0.753497 10.1834 0.692 10.12C0.503527 9.92537 0.344776 9.6815 0.266497 9.37081C0.190284 9.06799 0.204258 8.75431 0.273473 8.43471C0.33619 8.1452 0.43669 7.87979 0.598529 7.65067C0.764721 7.41554 0.971163 7.25156 1.19284 7.13589C1.40333 7.02617 1.62538 6.9622 1.82062 6.91406C1.92669 6.88793 2.06078 6.85809 2.18894 6.83036C2.27251 6.81227 2.35461 6.79479 2.42471 6.77874C2.89008 6.67176 3.16641 6.2072 3.02598 5.73103C2.97274 5.55081 2.92145 5.39704 2.86974 5.24136C2.83908 5.14906 2.80819 5.05563 2.77626 4.95536C2.69845 4.71091 2.61904 4.43561 2.59072 4.15597C2.56109 3.8628 2.58431 3.54767 2.72185 3.22824C2.85719 2.91411 3.08086 2.64827 3.36499 2.41211C3.64442 2.17997 3.94182 2.01094 4.26901 1.9336C4.60191 1.85514 4.91239 1.8838 5.19256 1.9615C5.45944 2.03569 5.71214 2.15779 5.93475 2.274C6.03342 2.32551 6.12291 2.37431 6.21098 2.42187C6.34569 2.49464 6.47874 2.56617 6.63926 2.64649C7.08079 2.86699 7.59499 2.68011 7.79021 2.22656C7.85838 2.06816 7.90939 1.93769 7.96181 1.80524C7.99912 1.71096 8.03699 1.61489 8.08179 1.5067C8.17562 1.2801 8.28925 1.03016 8.44451 0.806361C8.60768 0.571293 8.82476 0.354571 9.12671 0.205079C9.42275 0.058756 9.75264 1.52863e-05 10.1075 0ZM8.23246 5.63337C8.64384 5.58797 9.04254 5.69016 9.39456 5.8524C9.79792 6.03843 10.1886 6.3246 10.5497 6.65597C11.272 7.31909 11.9667 8.24534 12.5279 9.21736C13.0892 10.1897 13.544 11.2554 13.757 12.2126C13.8633 12.6907 13.9162 13.1712 13.8756 13.6133C13.835 14.0542 13.6956 14.5101 13.3706 14.8689C13.0733 15.1963 12.6717 15.3001 12.4652 15.3487L9.73218 15.9906C10.0189 17.362 9.36755 18.8077 8.10132 19.5396C6.53899 20.4416 4.49425 19.9944 3.57425 18.4013C3.41101 18.1184 3.29548 17.8203 3.22688 17.5167C0.652797 18.0293 -1.0666 14.9837 0.76036 13.0399L7.18754 6.20676C7.31485 6.07136 7.55298 5.82734 7.90042 5.70591L8.05528 5.66127L8.23246 5.63337ZM5.31394 17.0299C5.33596 17.1336 5.37475 17.2344 5.42972 17.3299C5.71269 17.8197 6.41221 18.0407 7.02989 17.6841C7.50654 17.4083 7.70464 16.9169 7.64094 16.483L5.31394 17.0299Z" fill="currentColor" />
    </svg>
  );
}

function EngineeringIcon({ className }: TabIconProps) {
  return (
    <svg viewBox="0 0 18.5652 20" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.70143 9.53671e-06C8.27042 0.000556324 7.84833 0.13026 7.49191 0.37268C7.13591 0.614824 6.86084 0.958369 6.70316 1.35905L6.70256 1.36057L6.1638 2.71629L4.50836 3.66929L3.0563 3.4491C2.6295 3.38506 2.192 3.45031 1.80283 3.6369C1.41377 3.82344 1.08966 4.12261 0.873315 4.49597L0.289286 5.50103C0.0723577 5.87433 -0.0264851 6.30441 0.00607773 6.73497C0.0386306 7.16539 0.200932 7.5756 0.471199 7.9121L1.38784 9.05421V10.9458L0.471441 12.0876C0.201173 12.4241 0.0386306 12.8346 0.00607773 13.2651C-0.0264851 13.6956 0.072352 14.1257 0.289281 14.499L0.873043 15.5036C1.08937 15.877 1.41373 16.1766 1.80283 16.3631C2.192 16.5497 2.62841 16.6151 3.05521 16.5511L4.51254 16.3307L6.16339 17.2784L6.69989 18.6394C6.85751 19.0406 7.13297 19.385 7.48926 19.6273C7.84566 19.8697 8.26684 19.9994 8.69784 20H9.2826H9.86734C10.2983 19.9994 10.7195 19.8697 11.0759 19.6273C11.4322 19.385 11.7077 19.0406 11.8653 18.6394L12.4018 17.2783L14.0526 16.3307L15.51 16.551C15.9367 16.6151 16.3731 16.5497 16.7624 16.3631C17.1514 16.1766 17.4759 15.877 17.6921 15.5036L18.2759 14.499C18.4929 14.1257 18.5917 13.6956 18.5591 13.265C18.5266 12.8346 18.364 12.4241 18.0937 12.0876L17.1773 10.9458V9.05421L18.094 7.91209C18.3643 7.57559 18.5266 7.16539 18.5591 6.73496C18.5917 6.3044 18.4929 5.87431 18.2759 5.50101L17.6919 4.49596C17.4756 4.1226 17.1514 3.82343 16.7624 3.63689C16.3731 3.4503 15.9357 3.38504 15.5089 3.44909L14.0569 3.66927L12.4014 2.71629L11.8626 1.36057L11.862 1.35904C11.7043 0.958359 11.4293 0.614816 11.0733 0.37267C10.7169 0.13025 10.2948 0.000546787 9.86376 0L9.2826 9.83471e-06L8.70143 9.53671e-06ZM6.83549 7.55257C7.42466 6.9634 8.26786 6.6769 9.28259 6.6769C10.2973 6.6769 11.1405 6.9634 11.7297 7.55257C12.3189 8.14173 12.6054 8.98493 12.6054 9.99967C12.6054 11.0144 12.3189 11.8576 11.7297 12.4468C11.1405 13.0359 10.2973 13.3224 9.28259 13.3224C8.26786 13.3224 7.42466 13.0359 6.83549 12.4468C6.24633 11.8576 5.95983 11.0144 5.95983 9.99967C5.95983 8.98493 6.24633 8.14173 6.83549 7.55257Z" fill="currentColor" />
    </svg>
  );
}

function SalesIcon({ className }: TabIconProps) {
  return (
    <svg viewBox="0 0 19.2871 19.2871" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.437 7.10593C18.0506 7.24401 17.6191 7.14704 17.329 6.85687L16.1423 5.67017L3.04841 18.7641C2.35104 19.4614 1.22038 19.4614 0.523023 18.7641C-0.174341 18.0667 -0.174341 16.936 0.523023 16.2387L13.6169 3.14478L12.4302 1.95811C12.1401 1.66794 12.0431 1.23654 12.1812 0.850108C12.3193 0.463681 12.6677 0.191431 13.076 0.150875C15.0993 -0.0500695 16.2451 -0.0506766 18.1894 0.151363C18.689 0.203272 19.0838 0.598103 19.1357 1.09764C19.3378 3.04197 19.3371 4.18783 19.1363 6.21107C19.0957 6.61941 18.8234 6.96784 18.437 7.10593ZM1.18995 1.05602C1.89971 0.346255 2.89745 0.0208591 4.04663 0.0208591C5.1958 0.0208591 6.19354 0.346255 6.9033 1.05602C7.61307 1.76578 7.93845 2.76351 7.93845 3.91268C7.93845 5.06187 7.61307 6.0596 6.9033 6.76937C6.19354 7.47913 5.1958 7.80453 4.04663 7.80453C2.89745 7.80453 1.89971 7.47913 1.18995 6.76937C0.480193 6.0596 0.154799 5.06187 0.154799 3.91268C0.154799 2.76351 0.480193 1.76578 1.18995 1.05602ZM12.5153 12.3808C13.2252 11.6708 14.2233 11.3453 15.3728 11.3453C16.5224 11.3453 17.5206 11.6708 18.2304 12.3808C18.9404 13.0908 19.266 14.0888 19.266 15.2384C19.266 16.388 18.9404 17.386 18.2304 18.096C17.5206 18.806 16.5224 19.1316 15.3728 19.1316C14.2233 19.1316 13.2252 18.806 12.5153 18.096C11.8053 17.386 11.4798 16.388 11.4798 15.2384C11.4798 14.0888 11.8053 13.0908 12.5153 12.3808Z" fill="currentColor" />
    </svg>
  );
}

function LeadershipIcon({ className }: TabIconProps) {
  return (
    <svg viewBox="0 0 17.1455 20.0001" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.57282 0C9.16455 0 9.64425 0.479694 9.64425 1.07143V1.42264H9.99512C10.5869 1.42264 11.0666 1.90234 11.0666 2.49407C11.0666 3.0858 10.5869 3.5655 9.99512 3.5655H9.64425V4.29997C10.6333 4.32694 11.412 4.38833 11.9851 4.45103C13.0453 4.56701 13.7514 5.4729 13.7514 6.47067V8.06839C13.7514 9.30237 13.1695 10.4136 12.255 11.0735C12.4521 11.8242 12.8492 13.3262 13.2124 14.699C13.8853 14.7451 14.5715 14.801 15.2771 14.8666C16.0287 14.9364 16.8053 15.4223 17.0205 16.2876C17.1871 16.9569 17.1871 17.5779 17.0205 18.2473C16.8053 19.1124 16.0287 19.5983 15.2771 19.6681C10.5166 20.1107 6.62895 20.1107 1.86844 19.6681C1.11687 19.5983 0.340238 19.1124 0.124938 18.2473C-0.0416436 17.5779 -0.0416436 16.9569 0.124924 16.2876C0.340238 15.4223 1.11687 14.9364 1.86844 14.8666C2.57345 14.8011 3.25932 14.7453 3.93174 14.6991C4.29504 13.326 4.69218 11.8235 4.88934 11.073C3.97515 10.4131 3.39355 9.30206 3.39355 8.06839V6.47067C3.39355 5.4729 4.09972 4.56701 5.15985 4.45103C5.73312 4.38831 6.51208 4.32691 7.5014 4.29996V3.5655H7.14998C6.55825 3.5655 6.07855 3.0858 6.07855 2.49407C6.07855 1.90234 6.55825 1.42264 7.14998 1.42264H7.5014V1.07143C7.5014 0.479694 7.98109 0 8.57282 0Z" fill="currentColor" />
    </svg>
  );
}

type SlackMessage =
  | {
      kind: "user";
      name: string;
      time: string;
      avatar: string;
      body: ReactNode;
      reactions?: SlackReaction[];
    }
  | {
      kind: "gomer";
      time: string;
      body: ReactNode;
      reactions?: SlackReaction[];
    };

type TeamTab = {
  id: string;
  label: string;
  icon: (props: TabIconProps) => ReactNode;
  headline: string;
  messages: SlackMessage[];
};

const teamAvatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80`;

const TEAM_TABS: TeamTab[] = [
  {
    id: "marketing",
    label: "Marketing & Growth",
    icon: MarketingIcon,
    headline: "Audit campaigns, compare engagement, and ship ranked recommendations.",
    messages: [
      {
        kind: "user",
        name: "Sarah",
        time: "10:23 AM",
        avatar: teamAvatar("photo-1494790108377-be9c29b29330"),
        body: (
          <>
            <SlackMention>@Gomer</SlackMention>, audit our Google Ads account and flag anything underperforming.
          </>
        ),
      },
      {
        kind: "gomer",
        time: "10:24 AM",
        body: "✅ Done. 3 campaigns above target CPA: Brand US, Retargeting EU, Lookalike APAC. Ranked PDF with the cuts and reallocations is in the thread.",
        reactions: [{ emoji: "🙌", count: 2 }],
      },
      {
        kind: "user",
        name: "Priya",
        time: "10:26 AM",
        avatar: teamAvatar("photo-1438761681033-6461ffad8d80"),
        body: "Pull engagement metrics from our last 10 LinkedIn posts and compare them.",
        reactions: [{ emoji: "⏳", count: 1 }],
      },
      {
        kind: "gomer",
        time: "10:27 AM",
        body: "Top performer was the product launch post (4.2% engagement). Carousel posts averaged 2.8x more clicks than text-only. Full breakdown in the thread.",
        reactions: [{ emoji: "📊", count: 2 }],
      },
    ],
  },
  {
    id: "ops",
    label: "Operations & Finance",
    icon: OperationsIcon,
    headline: "Reports, dashboards, approvals, and repeatable internal workflows.",
    messages: [
      {
        kind: "user",
        name: "James",
        time: "8:02 AM",
        avatar: teamAvatar("photo-1472099645785-5658abf4ff4e"),
        body: (
          <>
            <SlackMention>@Gomer</SlackMention> Build a morning briefing covering MRR, signups, and churn. Post it to #business-team every weekday at 8am.
          </>
        ),
      },
      {
        kind: "gomer",
        time: "8:02 AM",
        body: "Scheduled. Pulling from Stripe, the prod DB, and ChartMogul at 7:55, posting to #business-team at 8 sharp. First run goes out tomorrow.",
        reactions: [{ emoji: "🗓️", count: 2 }],
      },
      {
        kind: "user",
        name: "Nina",
        time: "8:05 AM",
        avatar: teamAvatar("photo-1573496359142-b8d87734a5a2"),
        body: "Track Stripe revenue and DM me if anything drops more than 10% day-over-day.",
        reactions: [{ emoji: "⏳", count: 1 }],
      },
      {
        kind: "gomer",
        time: "8:05 AM",
        body: "Monitoring live. Hourly Stripe check, immediate DM if daily revenue drops more than 10% vs the prior day.",
        reactions: [
          { emoji: "❤️", count: 3 },
          { emoji: "🚀", count: 1 },
        ],
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: EngineeringIcon,
    headline: "Code, automations, project context, and cross-tool execution.",
    messages: [
      {
        kind: "user",
        name: "Alex",
        time: "2:15 PM",
        avatar: teamAvatar("photo-1507003211169-0a1dd7228f2d"),
        body: (
          <>
            <SlackMention>@Gomer</SlackMention> Clone the repo, create a branch, fix this bug, and open a PR.
          </>
        ),
      },
      {
        kind: "gomer",
        time: "2:16 PM",
        body: "PR opened: fix/null-check-user-profile (#247). Missing null check on the user profile response. Tests pass, ready for review.",
        reactions: [{ emoji: "🙌", count: 2 }],
      },
      {
        kind: "user",
        name: "Lena",
        time: "2:18 PM",
        avatar: teamAvatar("photo-1544005313-94ddf0286df2"),
        body: "Check PostHog for the top 5 user drop-off points this week.",
        reactions: [{ emoji: "⏳", count: 1 }],
      },
      {
        kind: "gomer",
        time: "2:19 PM",
        body: "Top 5: pricing page (38%), onboarding step 3 (29%), checkout (24%), invite flow (19%), settings (15%). Funnel chart in the thread.",
        reactions: [
          { emoji: "💡", count: 2 },
          { emoji: "🚀", count: 1 },
        ],
      },
    ],
  },
  {
    id: "sales",
    label: "Sales & RevOps",
    icon: SalesIcon,
    headline: "CRM instances, pipeline work, customer follow-ups, and RevOps context.",
    messages: [
      {
        kind: "user",
        name: "Dan",
        time: "9:14 AM",
        avatar: teamAvatar("photo-1506794778202-cad84cf45f1d"),
        body: (
          <>
            <SlackMention>@Gomer</SlackMention> Excel of every closed-won deal this quarter, by owner and ARR.
          </>
        ),
      },
      {
        kind: "gomer",
        time: "9:14 AM",
        body: "47 closed deals, $312K total. Excel attached: deal name, owner, ARR, close date, source.",
        reactions: [{ emoji: "📊", count: 2 }],
      },
      {
        kind: "user",
        name: "Maya",
        time: "9:16 AM",
        avatar: teamAvatar("photo-1534528741775-53994a69daeb"),
        body: "Research Acme Corp before my 11am call. Pain points, recent news, fit with Gomer.",
        reactions: [{ emoji: "⏳", count: 1 }],
      },
      {
        kind: "gomer",
        time: "9:18 AM",
        body: "One-pager ready: 240 employees, recent Series B, expanding RevOps team, struggling with cross-tool reporting per their job posts. Strong fit. Talk track in the thread.",
        reactions: [
          { emoji: "🙌", count: 3 },
          { emoji: "❤️", count: 3 },
        ],
      },
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    icon: LeadershipIcon,
    headline: "Same Gomer, same context, same security policies across the org.",
    messages: [
      {
        kind: "user",
        name: "Mike",
        time: "9:00 AM",
        avatar: teamAvatar("photo-1560250097-0b93528c311a"),
        body: (
          <>
            <SlackMention>@Gomer</SlackMention> Summarize what happened across all team channels this week.
          </>
        ),
      },
      {
        kind: "gomer",
        time: "9:01 AM",
        body: "Weekly digest ready. Eng shipped the payments refactor, marketing launched the LinkedIn campaign (2.1K clicks), ops flagged a vendor pricing issue. 3 blockers need your attention. Details in the thread.",
        reactions: [{ emoji: "🙌", count: 2 }],
      },
      {
        kind: "user",
        name: "Emma",
        time: "9:03 AM",
        avatar: teamAvatar("photo-1580489944761-15a19d654956"),
        body: "Draft the investor update email based on this month's metrics.",
        reactions: [{ emoji: "⏳", count: 1 }],
      },
      {
        kind: "gomer",
        time: "9:04 AM",
        body: "Draft ready. MRR ($48.2K, +12%), 8 new logos, 1.2% churn, product highlights. Tone matches your last three updates. Pasted in the thread for review.",
        reactions: [
          { emoji: "❤️", count: 4 },
          { emoji: "📊", count: 2 },
        ],
      },
    ],
  },
];

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm px-1 py-0.5 align-baseline whitespace-nowrap bg-slack-mention text-slack-mention text-sm leading-snug">
      {children}
    </span>
  );
}

function EnterpriseSlackUserMessage({
  name,
  time,
  avatar,
  body,
  reactions,
}: {
  name: string;
  time: string;
  avatar: string;
  body: ReactNode;
  reactions?: SlackReaction[];
}) {
  return (
    <div className="relative flex w-full text-left isolate gap-2 rounded-lg px-[var(--slack-message-pad-x)] border border-solid border-transparent bg-transparent py-2">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
        <img alt={name} loading="lazy" width={36} height={36} className="size-full object-cover" src={avatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small text-white font-medium">{name}</span>
          <span className="body-small text-xs text-white/50 font-normal">{time}</span>
        </div>
        <div className="body-main text-white font-normal">{body}</div>
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

function EnterpriseSlackGomerMessage({
  time,
  body,
  reactions,
}: {
  time: string;
  body: ReactNode;
  reactions?: SlackReaction[];
}) {
  return (
    <div
      data-variant="gomer"
      className="relative flex w-full text-left isolate slack-message-gomer gap-2 px-[var(--slack-message-pad-x)] py-[var(--slack-message-pad-y)]"
    >
      <div aria-hidden="true" className="slack-gomer-bg-mount">
        <div className="slack-gomer-layer-glass-stack" />
        <div className="slack-gomer-layer-inner-depth-soft" />
        <div className="slack-gomer-layer-inner-glow-overlay" />
        <div className="slack-gomer-layer-feather-blur" />
        <div className="slack-gomer-layer-white-sheet" />
      </div>
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md z-[1] bg-transparent">
        <img alt="Gomer" loading="lazy" width={36} height={36} className="size-full object-cover" src={gomerAvatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 mb-0.5">
          <span className="body-small text-slack font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span>Gomer</span>
              <span className="inline-flex items-center rounded-sm bg-slack-app-badge px-1 py-px text-[12px] leading-tight font-normal tracking-wide text-slack-app-badge uppercase">
                APP
              </span>
            </span>
          </span>
          <span className="body-small text-slack-secondary font-normal">{time}</span>
        </div>
        <div className="body-main text-slack font-normal">{body}</div>
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

function EnterpriseChatPreview({ messages }: { messages: SlackMessage[] }) {
  return (
    <div className="w-full max-w-[502px] rounded-2xl p-0 sm:p-4 [--slack-add-reaction-icon:#2e1e6b] [--slack-mention-bg:#3d278c] [--slack-mention-text:#f1edff] [--slack-reaction-pill-bg:#d2c6ff] [--slack-reaction-pill-hover-bg:#c4b5ff]">
      <div className="flex flex-col gap-2">
        {messages.map((message, index) =>
          message.kind === "user" ? (
            <EnterpriseSlackUserMessage
              key={`${message.name}-${message.time}-${index}`}
              name={message.name}
              time={message.time}
              avatar={message.avatar}
              body={message.body}
              reactions={message.reactions}
            />
          ) : (
            <EnterpriseSlackGomerMessage
              key={`gomer-${message.time}-${index}`}
              time={message.time}
              body={message.body}
              reactions={message.reactions}
            />
          ),
        )}
      </div>
    </div>
  );
}

function FadeStack({ activeIndex, children }: { activeIndex: number; children: ReactNode[] }) {
  return (
    <div className="grid grid-cols-1">
      {children.map((child, index) => (
        <div
          key={index}
          aria-hidden={index !== activeIndex}
          inert={index !== activeIndex ? true : undefined}
          className={[
            "col-start-1 row-start-1 transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            index === activeIndex
              ? "z-10 opacity-100 blur-0 motion-reduce:blur-0"
              : "pointer-events-none z-0 opacity-0 blur-md motion-reduce:blur-0",
          ].join(" ")}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

type TabIndicator = { left: number; width: number };

function ComparisonTabActiveBackground({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      aria-hidden
      alt=""
      src={comparisonTabActiveBg}
      className={className}
      style={style}
    />
  );
}

function DeliverablesTabs() {
  const [active, setActive] = useState(0);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const desktopTabsRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef(new Map<number, HTMLButtonElement>());
  const desktopTabRefs = useRef(new Map<number, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<TabIndicator | null>(null);

  const updateIndicator = useCallback(() => {
    const container = desktopTabsRef.current;
    const button = desktopTabRefs.current.get(active);
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    setIndicator({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    });
  }, [active]);

  useLayoutEffect(() => {
    updateIndicator();

    const container = desktopTabsRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(container);
    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  useEffect(() => {
    const button = mobileTabRefs.current.get(active);
    button?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <section className="bg-primitive-main-beige pt-14 pb-14 sm:pt-[7rem] sm:pb-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <div className="w-full pb-4 flex justify-center">
              <div className="inline-flex max-w-full items-center">
                <p className="body-small m-0 max-w-full truncate font-medium text-[#4e32b5]">The Enterprise plan</p>
              </div>
            </div>
            <h2 className="font-heading h3 text-balance">One coworker. Every team. Real deliverables.</h2>
            <p className="max-w-[570px] body-main text-secondary font-medium">
              Gomer doesn&apos;t pick a department. Same Gomer, same context, same security policies — across
              marketing, ops, finance, engineering, sales, and leadership.
            </p>
          </div>

          <div className="flex w-full flex-col gap-10">
            {/* Mobile tabs */}
            <div className="relative overflow-hidden py-1 md:hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10"
                style={{ background: "linear-gradient(90deg, var(--primitive-main-beige) 0%, transparent 100%)" }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10"
                style={{ background: "linear-gradient(270deg, var(--primitive-main-beige) 0%, transparent 100%)" }}
              />
              <div
                ref={mobileTabsRef}
                className="flex w-full gap-2 overflow-x-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Team use cases"
              >
                {TEAM_TABS.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = active === index;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      ref={(node) => {
                        if (node) mobileTabRefs.current.set(index, node);
                        else mobileTabRefs.current.delete(index);
                      }}
                      aria-pressed={isActive}
                      aria-controls={`${tab.id}-enterprise-panel`}
                      onClick={() => setActive(index)}
                      className={[
                        "relative flex shrink-0 items-center justify-center gap-4 rounded-full text-center whitespace-nowrap transition-[background,border-color,color] duration-300 h-12 px-[18px] body-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                        isActive ? "text-white" : "text-primary bg-secondary",
                      ].join(" ")}
                    >
                      {isActive && (
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                          <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                        </span>
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        <Icon className={`size-5 shrink-0 transition-[color,opacity] duration-300 ${isActive ? "text-white opacity-100" : "text-primitive-main-grey opacity-45"}`} />
                        <span>{tab.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop tabs */}
            <div className="-m-3 hidden overflow-x-auto p-3 md:block">
              <div
                ref={desktopTabsRef}
                role="tablist"
                aria-label="Team use cases"
                className="relative isolate mx-auto grid w-full min-w-[1178px] grid-cols-5 overflow-hidden rounded-full bg-white p-1"
              >
                {indicator && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1 bottom-1 z-0 overflow-hidden rounded-full transition-[left,width] duration-500 ease-out"
                    style={{ left: indicator.left, width: indicator.width }}
                  >
                    <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                  </span>
                )}
                {TEAM_TABS.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = active === index;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      id={`${tab.id}-enterprise-tab`}
                      aria-selected={isActive}
                      aria-controls={`${tab.id}-enterprise-panel`}
                      tabIndex={isActive ? 0 : -1}
                      ref={(node) => {
                        if (node) desktopTabRefs.current.set(index, node);
                        else desktopTabRefs.current.delete(index);
                      }}
                      onClick={() => setActive(index)}
                      className={[
                        "cursor-pointer relative z-10 flex items-center justify-center gap-4 rounded-full bg-transparent text-center whitespace-nowrap transition-[border-color,color] duration-300 h-12 body-main px-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                        isActive ? "text-white" : "text-secondary",
                      ].join(" ")}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        <Icon
                          className={`size-5 shrink-0 transition-[color,opacity] duration-300 ${isActive ? "text-white opacity-100" : "text-primitive-main-grey opacity-50"}`}
                        />
                        <span>{tab.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <article
              role="tabpanel"
              id={`${TEAM_TABS[active].id}-enterprise-panel`}
              aria-labelledby={`${TEAM_TABS[active].id}-enterprise-tab`}
              className="flex min-h-[577px] flex-col gap-10 overflow-hidden rounded-section p-6 text-white bg-hero sm:p-10 lg:min-h-[713px] lg:flex-row lg:items-center lg:justify-between lg:p-16"
            >
              <div className="grid max-w-[458px] grid-cols-1">
                <FadeStack activeIndex={active}>
                  {TEAM_TABS.map((tab) => (
                    <h3 key={tab.id} className="font-heading h4 text-balance text-white">
                      {tab.headline}
                    </h3>
                  ))}
                </FadeStack>
              </div>

              <div className="grid w-full max-w-[502px] grid-cols-1">
                <FadeStack activeIndex={active}>
                  {TEAM_TABS.map((tab) => (
                    <EnterpriseChatPreview key={tab.id} messages={tab.messages} />
                  ))}
                </FadeStack>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECURITY ALLY ---------------- */

function enterpriseIconGradient(id: string) {
  return (
    <radialGradient
      id={id}
      cx="0"
      cy="0"
      r="1"
      gradientTransform="matrix(2.91667 33.3926 -44.9053 12.3962 16.6583 -1.39259)"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor="#FFBB98" />
      <stop offset="0.0642857" stopColor="#FFBB98" />
      <stop offset="0.507143" stopColor="#9E84FF" />
      <stop offset="0.803571" stopColor="#6E47FF" />
      <stop offset="1" stopColor="#150079" />
    </radialGradient>
  );
}

function CredentialsLockIcon({ className }: { className?: string }) {
  const gradientId = "enterprise-security-credentials-gradient";
  return (
    <svg viewBox="0 0 26.2894 32.0011" fill="none" aria-hidden className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25646 2.46046C8.81539 0.88693 10.9331 0 13.1448 0C15.3564 0 17.4741 0.88693 19.0331 2.46046C20.5914 4.03342 21.4641 6.16347 21.4641 8.38117V10.0955C21.4641 11.0423 20.6965 11.8098 19.7498 11.8098C18.803 11.8098 18.0355 11.0423 18.0355 10.0955V8.38117C18.0355 7.06254 17.5164 5.80107 16.5974 4.87349C15.679 3.94645 14.4367 3.42857 13.1448 3.42857C11.8528 3.42857 10.6105 3.94645 9.6921 4.87349C8.7731 5.80107 8.25397 7.06254 8.25397 8.38117V10.0955C8.25397 11.0423 7.48647 11.8098 6.53968 11.8098C5.59292 11.8098 4.8254 11.0423 4.8254 10.0955V8.38117C4.8254 6.16347 5.69806 4.03342 7.25646 2.46046ZM13.1447 17.7053C9.04275 17.7053 5.57772 17.8498 1.83754 18.1193C0.893216 18.1873 0.0725305 17.4769 0.00450769 16.5326C-0.063538 15.5883 0.646839 14.7676 1.59118 14.6996C5.40483 14.4248 8.95244 14.2768 13.1447 14.2768C14.0291 14.2768 14.8853 14.2834 15.7218 14.2964C16.6684 14.3111 17.4239 15.0904 17.4092 16.0371C17.3945 16.9837 16.6152 17.7392 15.6685 17.7245C14.8504 17.7118 14.012 17.7053 13.1447 17.7053ZM19.0859 16.0917C19.133 15.1461 19.9379 14.4178 20.8835 14.465C22.1491 14.5282 23.409 14.6067 24.6981 14.6996C25.6426 14.7676 26.353 15.5883 26.2849 16.5326C26.2168 17.4769 25.3962 18.1873 24.4517 18.1193C23.1845 18.028 21.95 17.9511 20.7125 17.8893C19.767 17.8421 19.0387 17.0373 19.0859 16.0917ZM13.5555 28.1545C12.6087 28.1522 11.8394 28.9179 11.8372 29.8647C11.835 30.8117 12.6007 31.5808 13.5475 31.5831C17.4745 31.5922 20.8341 31.7358 24.4517 31.9966C25.3962 32.0645 26.2168 31.3541 26.2849 30.4098C26.353 29.4656 25.6426 28.6448 24.6981 28.5767C21.0101 28.3111 17.5705 28.1639 13.5555 28.1545ZM9.16922 31.6313C10.1157 31.6073 10.8636 30.8208 10.8397 29.8743C10.8158 28.9278 10.0291 28.1799 9.08261 28.2039C6.52371 28.2686 4.11445 28.395 1.59118 28.5767C0.646839 28.6448 -0.063538 29.4656 0.00450769 30.4098C0.0725305 31.3541 0.893216 32.0645 1.83754 31.9966C4.31621 31.8178 6.67157 31.6944 9.16922 31.6313ZM13.1447 26.9598C9.04275 26.9598 5.57772 27.1042 1.83754 27.3737C0.893216 27.4418 0.0725305 26.7314 0.00450769 25.787C-0.063538 24.8427 0.646839 24.0219 1.59118 23.9541C5.40483 23.6793 8.95244 23.5312 13.1447 23.5312C14.0915 23.5312 14.859 24.2987 14.859 25.2455C14.859 26.1922 14.0915 26.9598 13.1447 26.9598ZM16.7411 25.2747C16.7734 24.3285 17.5666 23.5877 18.5128 23.6199C20.5966 23.6907 22.6085 23.8034 24.6981 23.9541C25.6426 24.0219 26.353 24.8427 26.2849 25.787C26.2168 26.7314 25.3962 27.4418 24.4517 27.3737C22.3985 27.2258 20.4302 27.1157 18.3961 27.0464C17.4498 27.0142 16.7089 26.221 16.7411 25.2747ZM11.291 22.3428C11.8957 22.336 12.5125 22.3326 13.1447 22.3326C17.2466 22.3326 20.7116 22.477 24.4517 22.7465C25.3962 22.8145 26.2168 22.1042 26.2849 21.1598C26.353 20.2155 25.6426 19.3948 24.6981 19.3268C20.8846 19.052 17.3369 18.904 13.1447 18.904C12.5001 18.904 11.8705 18.9075 11.2525 18.9144C10.3058 18.9251 9.54695 19.7011 9.55756 20.6478C9.56819 21.5946 10.3443 22.3534 11.291 22.3428ZM5.76956 22.5071C6.7152 22.4611 7.44453 21.6572 7.39856 20.7115C7.35258 19.7659 6.54869 19.0366 5.60304 19.0825C4.27091 19.1473 2.94723 19.2291 1.59118 19.3268C0.646839 19.3948 -0.063538 20.2155 0.00450769 21.1598C0.0725305 22.1042 0.893216 22.8145 1.83754 22.7465C3.17063 22.6504 4.46748 22.5704 5.76956 22.5071Z"
        fill={`url(#${gradientId})`}
      />
      <defs>{enterpriseIconGradient(gradientId)}</defs>
    </svg>
  );
}

function ApprovalUserCheckIcon({ className }: { className?: string }) {
  const gradientId = "enterprise-security-approval-gradient";
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6626 0C9.55026 0 7.73858 0.597641 6.45611 1.88012C5.17362 3.16258 4.576 4.97426 4.576 7.08663C4.576 9.19902 5.17362 11.0107 6.45611 12.2931C7.73858 13.5756 9.55026 14.1733 11.6626 14.1733C13.775 14.1733 15.5867 13.5756 16.8691 12.2931C18.1516 11.0107 18.7493 9.19902 18.7493 7.08663C18.7493 4.97426 18.1516 3.16258 16.8691 1.88012C15.5867 0.597641 13.775 0 11.6626 0ZM11.6587 16.3453C8.05803 16.3453 4.70683 17.4281 1.91719 19.2861C0.99318 19.9015 0.381479 20.715 0.128854 21.6388C-0.12201 22.5561 0.007628 23.4866 0.394601 24.2933C1.16293 25.8949 2.9472 27.0512 5.09973 27.0512H16.3822C16.3076 25.7701 16.7699 24.4649 17.7635 23.5015C19.1503 22.1566 21.1704 21.8669 22.8301 22.6169C22.8645 22.5623 22.899 22.5079 22.9337 22.4536C23.0411 22.2859 23.1502 22.1212 23.2608 21.9593C23.2416 21.8525 23.2176 21.7456 23.1886 21.6388C22.9358 20.715 22.3241 19.9015 21.4001 19.2861C18.6105 17.4281 15.2593 16.3453 11.6587 16.3453ZM31.4375 22.2156C32.1387 21.5795 32.1915 20.4953 31.5554 19.7941C30.9193 19.0928 29.8352 19.0401 29.1339 19.6762C27.5611 21.1028 26.3584 22.4044 25.3394 23.9947C24.7291 24.9472 24.2018 25.9769 23.6997 27.1605L22.1765 25.5899C21.5175 24.9102 20.4322 24.8935 19.7525 25.5527C19.0728 26.2117 19.0561 27.2969 19.7152 27.9767L23.1115 31.4791C23.5255 31.9061 24.1314 32.088 24.7122 31.9595C25.2928 31.8313 25.7657 31.411 25.9611 30.8494C26.7397 28.6133 27.4199 27.1031 28.2263 25.8443C29.0261 24.5963 29.9959 23.5234 31.4375 22.2156Z"
        fill={`url(#${gradientId})`}
      />
      <defs>{enterpriseIconGradient(gradientId)}</defs>
    </svg>
  );
}

function NoTrainingLockIcon({ className }: { className?: string }) {
  const gradientId = "enterprise-security-no-training-gradient";
  return (
    <svg viewBox="0 0 32.0001 31.9998" fill="none" aria-hidden className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7144 0C14.3765 0 11.6923 0.102413 8.89702 0.297463C6.12625 0.490805 3.92068 2.69648 3.74273 5.47351C3.56833 8.19502 3.46404 11.0012 3.43624 13.8706C3.70964 13.7171 3.99245 13.5796 4.2833 13.4592C5.24461 13.061 6.27492 12.856 7.31542 12.856C8.35592 12.856 9.38559 13.0621 10.3469 13.4603C11.3082 13.8584 12.1816 14.4421 12.9174 15.1778C13.6531 15.9136 14.2367 16.787 14.6349 17.7483C14.9081 18.4077 15.0903 19.0997 15.1778 19.8051C16.1839 20.5918 16.89 21.7433 17.1061 23.0578L17.1472 23.307C17.2874 24.1557 17.4872 25.3653 17.4872 26.6498C17.4872 27.9346 17.2874 29.1442 17.1472 29.9927L17.1058 30.2439C17.0716 30.4521 17.025 30.6562 16.9669 30.8553C17.2126 30.8565 17.4616 30.8571 17.7144 30.8571C21.0523 30.8571 23.7366 30.7547 26.5318 30.5598C29.3025 30.3664 31.5082 28.1607 31.6861 25.3835C31.892 22.1715 32.0001 18.8414 32.0001 15.4286C32.0001 14.5192 31.9924 13.6156 31.9773 12.7187C31.9432 10.7032 31.2986 8.71401 30.0401 7.09221C28.209 4.73259 26.5482 3.07248 24.0376 1.14739C23.1133 0.438688 21.9896 0.0589303 20.8419 0.0333088C19.8519 0.0112061 18.8186 0 17.7144 0ZM7.31542 15.7143C7.9807 15.7143 8.63949 15.8453 9.25414 16.0999C9.86879 16.3545 10.4273 16.7277 10.8977 17.1981C11.3682 17.6685 11.7413 18.227 11.9959 18.8417C12.2505 19.4563 12.3815 20.1151 12.3815 20.7804V21.4805C12.3815 21.5197 12.38 21.5586 12.3769 21.5971C13.355 21.7622 14.1247 22.5379 14.2859 23.5205L14.3167 23.7079C14.4618 24.587 14.6293 25.6018 14.6293 26.6501C14.6293 27.6985 14.4618 28.7134 14.3167 29.5925L14.2859 29.7799C14.1132 30.8325 13.2422 31.6475 12.1647 31.7291C11.9178 31.7477 11.6665 31.7675 11.4114 31.7879C10.1211 31.8901 8.73242 31.9998 7.31466 31.9998C5.8969 31.9998 4.50836 31.8901 3.21805 31.7879C2.96294 31.7675 2.71153 31.7477 2.46463 31.7291C1.38711 31.6475 0.516064 30.8325 0.343456 29.7799L0.312566 29.5925C0.167484 28.7134 0 27.6985 0 26.6501C0 25.6018 0.167484 24.587 0.312566 23.7079L0.343456 23.5205C0.504662 22.5374 1.27508 21.7614 2.25396 21.5968C2.25087 21.5584 2.24929 21.5196 2.24929 21.4805V20.7804C2.24929 20.1151 2.38033 19.4563 2.63492 18.8417C2.88952 18.227 3.26269 17.6685 3.73313 17.1981C4.20356 16.7277 4.76205 16.3545 5.3767 16.0999C5.99135 15.8453 6.65012 15.7143 7.31542 15.7143ZM7.31466 21.3005C6.56708 21.3005 5.82765 21.331 5.10644 21.3749V20.7804C5.10644 20.4903 5.16358 20.2031 5.27457 19.9351C5.38559 19.6671 5.54831 19.4235 5.75343 19.2184C5.95855 19.0133 6.20207 18.8506 6.47007 18.7396C6.73807 18.6286 7.02534 18.5714 7.31542 18.5714C7.6055 18.5714 7.89274 18.6286 8.16077 18.7396C8.42877 18.8506 8.67229 19.0133 8.87741 19.2184C9.08253 19.4235 9.24525 19.6671 9.35627 19.9351C9.46726 20.2031 9.5244 20.4903 9.5244 20.7804V21.375C8.80271 21.3311 8.06276 21.3005 7.31466 21.3005Z"
        fill={`url(#${gradientId})`}
      />
      <defs>{enterpriseIconGradient(gradientId)}</defs>
    </svg>
  );
}

const allyCards = [
  {
    icon: CredentialsLockIcon,
    title: "Credentials never touch the AI.",
    body: "A backend tool gateway injects API keys at execution time. The model never sees them.",
  },
  {
    icon: ApprovalUserCheckIcon,
    title: "Sensitive actions wait for human approval.",
    body: "Money moves, code pushes, customer emails: all gated by an explicit approve / reject in Slack.",
  },
  {
    icon: NoTrainingLockIcon,
    title: "Your data never trains a model.",
    body: "Not by us. Not by our model providers.",
  },
];

const securityBadges = [
  { src: soc2Badge, label: "SOC 2 compliant." },
  { src: gdprBadge, label: "GDPR aligned" },
  { src: ccpaBadge, label: "CCPA compliant" },
  { src: casaTier3Badge, label: "CASA Tier 3 certified" },
];

type SecurityIcon = ({ className }: { className?: string }) => ReactNode;

function SecurityControlCard({
  icon: Icon,
  title,
  body,
}: {
  icon: SecurityIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="relative h-full w-full rounded-[inherit] rounded-section bg-white/20 px-8 py-8 text-left lg:min-h-[15.75rem] lg:pr-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
          mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
          WebkitMask:
            "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
          padding: "1px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(5px)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
            mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
            WebkitMask:
              "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
            padding: "4px",
          }}
        />
      </div>
      <div className="relative z-[2] flex h-full w-full flex-col justify-between">
        <div className="flex h-full flex-col gap-8">
          <Icon className="size-8 shrink-0 object-contain" />
          <div className="flex flex-col gap-3">
            <h3 className="body-medium text-primary">{title}</h3>
            <p className="body-small text-secondary font-medium">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityAlly() {
  return (
    <section className="bg-primitive-main-beige py-14 sm:py-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-[72.625rem] flex-col items-center gap-16 text-center">
          <div className="flex max-w-[34.125rem] flex-col items-center">
            <div className="w-full pb-4 flex justify-center">
              <div className="inline-flex max-w-full items-center">
                <p className="body-small m-0 max-w-full truncate text-[#4e32b5] font-medium px-3 py-1">
                  Security & Compliance
                </p>
              </div>
            </div>
            <h2 className="font-heading h4 text-balance text-primary">
              Built so your security team becomes an ally, not a blocker.
            </h2>
            <p className="mt-5 body-main text-balance font-medium text-secondary">
              Three architectural choices that make the security review short.
            </p>
          </div>

          <div className="grid w-full gap-5 lg:grid-cols-3">
            {allyCards.map((card) => (
              <SecurityControlCard key={card.title} {...card} />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {securityBadges.map((badge) => (
              <div key={badge.label} className="flex shrink-0 items-center gap-4">
                <img
                  src={badge.src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  width={40}
                  height={40}
                  className="size-10 shrink-0 object-contain"
                />
                <p className="body-small whitespace-nowrap text-secondary font-medium">{badge.label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/security"
            className="inline-flex h-14 min-h-14 shrink-0 items-center justify-center rounded-full bg-foreground px-10 text-base font-medium tracking-[-0.01em] text-background transition-all hover:bg-foreground/90 active:translate-y-px"
          >
            Read full Security model
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ADD IN 2 MINUTES ---------------- */

const onboardingSteps = [
  {
    step: "01",
    title: "Install from Slack App Directory",
    body: "Start the pilot from inside Slack with a reviewed App Directory listing.",
    visual: (
      <img
        src={onboardingInstallSlackImage}
        alt=""
        aria-hidden
        width={640}
        height={526}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    step: "02",
    title: "Connect tools with OAuth",
    body: "Each tool connect takes seconds and is scoped to admin-controlled permissions.",
    visual: (
      <img
        src={onboardingConnectOAuthImage}
        alt=""
        aria-hidden
        width={640}
        height={526}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    step: "03",
    title: "Set admin policies",
    body: "Apply RBAC, approval rules, retention controls, and audit visibility before rollout.",
    visual: (
      <img
        src={onboardingAdminPoliciesImage}
        alt=""
        aria-hidden
        width={640}
        height={526}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    ),
  },
];

function OnboardingGlassCard({
  step,
  title,
  body,
  visual,
}: {
  step: string;
  title: string;
  body: string;
  visual: ReactNode;
}) {
  return (
    <article className="relative min-w-0">
      <div
        className="relative flex min-h-[30.5625rem] h-full w-full flex-col overflow-hidden rounded-section rounded-[inherit]"
        style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      >
        <div
          aria-hidden
          className="bg-conic-gradient-bg pointer-events-none absolute inset-0 z-0"
          style={{ borderRadius: "inherit" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[20px] z-0"
          style={{ borderRadius: "inherit", background: "rgb(255, 255, 255)", filter: "blur(10px)" }}
        />
        <div className="relative z-[1] h-full w-full rounded-[inherit]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
            style={{
              background:
                "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
            style={{
              background:
                "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
              mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
              WebkitMask:
                "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
              padding: "1px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
            style={{ filter: "blur(5px)" }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                background:
                  "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
                mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
                WebkitMask:
                  "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
                padding: "4px",
              }}
            />
          </div>
          <div className="relative z-[2] flex h-full w-full flex-col justify-between">
            <div className="relative z-10 h-[21.25rem] shrink-0 overflow-hidden">
              {visual}
              <span className="absolute top-8 left-8 z-20 flex h-8 items-center justify-center rounded-full bg-[#5c28d7]/16 px-5 font-sans text-sm leading-[1.3] font-medium tracking-[0.01em] text-[#5c28d7]">
                {step}
              </span>
            </div>
            <div className="relative z-10 flex flex-1 flex-col items-start gap-3 p-8">
              <h3 className="font-heading h5 text-primitive-main-dark xl:whitespace-nowrap">{title}</h3>
              <p className="body-main max-w-[21.875rem] text-secondary font-medium">{body}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function AddInTwoMinutes() {
  return (
    <section
      className="bg-primitive-main-beige pt-14 pb-14 sm:pt-[7rem] sm:pb-[7rem]"
      aria-label="Enterprise onboarding"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <div className="flex w-full justify-center pb-4">
              <div className="inline-flex max-w-full items-center">
                <p className="body-small m-0 max-w-full truncate font-medium text-[#4e32b5] px-3 py-1">
                  Onboarding
                </p>
              </div>
            </div>
            <h2 className="font-heading h3 text-balance text-primitive-main-dark">
              You can add Gomer in 2 minutes.
            </h2>
            <p className="body-main max-w-[570px] font-medium text-secondary">
              One-click install from the Slack App Directory. Connect tools as you need them, with OAuth
              scoped to admin-controlled permissions. No infra to provision and no procurement detour
              just to start a pilot.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {onboardingSteps.map((step) => (
              <OnboardingGlassCard key={step.step} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ENTERPRISE_FAQS = [
  { q: "What does the Enterprise plan include?", a: "SSO via SAML, SCIM provisioning, audit log export, US/EU data residency, custom retention policies, a signed DPA, priority support, and a dedicated Slack channel with our engineering team — plus everything in the Team plan." },
  { q: "How long does Gomer to install?", a: "Most teams are live in under 10 minutes: install from the Slack App Directory, connect OAuth for the tools you need, and set admin policies." },
  { q: "Do we control which tools Gomer has access to?", a: "Yes. Admins decide which integrations are enabled, which actions require approval, and which scopes each integration uses. Anything can be revoked instantly." },
  { q: "Does Gomer support SSO?", a: "Yes — SAML 2.0 with Okta, Google Workspace, OneLogin, JumpCloud, Microsoft Entra ID, or any standards-compliant IdP. SCIM provisioning is included on Enterprise." },
];
