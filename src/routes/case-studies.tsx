import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { CreditCardIcon, Soc2Icon } from "@/components/site/HeroBadges";
import askaiWordmark from "@/assets/images/askai-wordmark-color.svg";
import comparisonTabActiveBg from "@/assets/images/download (1).svg";

type Case = {
  category: string;
  statLines: [string, string];
  person: string;
  role: string;
  tags: string[];
  title: string;
  excerpt: string;
  pills: string[];
  isPerson?: boolean;
  logoLabel?: string;
};

const featured: Case = {
  category: "all",
  statLines: ["30 projects. 6 weeks.", "One AI employee."],
  person: "David Joerg",
  role: "Technical Product Manager, AI/ML at Chess.com",
  tags: ["Tech entrepreneur", "Power user"],
  title: "From Power User to Power Team",
  excerpt:
    "How a tech entrepreneur turned an AI employee into a full operating system for work and life. Then his family did the same.",
  pills: ["30+ distinct projects", "6 weeks of usage"],
  isPerson: true,
};

const cases: Case[] = [
  featured,
  {
    category: "ecommerce",
    statLines: ["12 workflows. 8 channels.", "15 days."],
    person: "TWL",
    role: "Australian ecommerce retailer",
    tags: ["Australian ecommerce retailer", "Ecommerce"],
    title: "12 scheduled workflows across 8 channels in 15 days.",
    excerpt:
      "Replacing ~2 hours of manual work per day, split across 5 team members at an Australian functional-fitness retailer.",
    pills: ["12 scheduled workflows", "15 days to full setup"],
    logoLabel: "TWL",
  },
  {
    category: "operations",
    statLines: ["62 workflows. 2 weeks.", "One AI employee."],
    person: "Element Turf",
    role: "Lawn care and landscaping company",
    tags: ["Landscaping", "Operations"],
    title: "From zero automation to 62 workflows in two weeks.",
    excerpt:
      "How a 25-person, 8-crew landscaping company put an AI employee to work across Aspire, ClickUp, BambooHR, Gmail, and seven inboxes.",
    pills: ["62 automated workflows", "2 weeks to setup"],
    logoLabel: "ET",
  },
  {
    category: "operations",
    statLines: ["10 platforms. 27 automations.", "75 days."],
    person: "CollabED",
    role: "Non-profit professional development community",
    tags: ["EdTech / Non-profit", "Operations"],
    title: "10 web platforms, 2 mobile apps, 27 automations — in 75 days.",
    excerpt:
      "No developers. No designers. No IT team. One founder, 46 volunteers, and an AI employee.",
    pills: ["10 live web platforms", "75 days to build it all"],
    logoLabel: "C",
  },
  {
    category: "media",
    statLines: ["18 workflows. 67 days.", "One AI employee."],
    person: "AlphaSignal",
    role: "AI-curated newsletter and information platform",
    tags: ["AI Newsletter", "Media & Content"],
    title: "Not a chatbot. A coworker.",
    excerpt:
      "How AlphaSignal's 8-person team automated 18 workflows in 67 days — without hiring a developer.",
    pills: ["18 automated workflows", "67 days to full setup"],
    logoLabel: "A",
  },
  {
    category: "founders",
    statLines: ["12 web apps. 887 threads.", "44 days."],
    person: "Hampton",
    role: "Private network for high-growth founders & CEOs",
    tags: ["Private network for founders & CEOs", "Founders & Power users"],
    title: "Editors, not creators",
    excerpt:
      "How Hampton's 25-person team started operating like a much larger one, in 44 days with Viktor.",
    pills: ["26 scheduled tasks", "44 days to full setup"],
    logoLabel: "H",
  },
];

const filters = ["All", "Ecommerce", "Operations", "Media & Content", "Founders & Power users"];
const filterKey: Record<string, string> = {
  All: "all",
  Ecommerce: "ecommerce",
  Operations: "operations",
  "Media & Content": "media",
  "Founders & Power users": "founders",
};

const HEADLINE_WORDS = ["workflows.", "content.", "coworkers."];
const HEADLINE_INTERVAL_MS = 3200;

const logoWallItems: { label?: string; className?: string; drum?: string[] }[] = [
  { label: "Accel", className: "font-display text-base tracking-tight" },
  { label: "TRUE CLASSIC", className: "font-display text-[13px] font-extrabold uppercase tracking-wider" },
  { label: "Aura", className: "font-display text-base tracking-tight" },
  { label: "RIDGE", className: "font-display text-sm font-bold uppercase tracking-[0.2em]" },
  { drum: ["CoinGate", "Squibler"], className: "font-display text-base tracking-tight" },
];

export default function CaseStudiesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? cases : cases.filter((c) => c.category === filterKey[active]);

  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Case Studies — Viktor"
        description="Real stories from teams running on Viktor. The numbers are the customers'. The tools are theirs. The workflows still run today."
        ogTitle="Case Studies — Viktor"
        ogDescription="Real stories from teams running on Viktor."
      />
      {/* Hero + featured case */}
      <section className="relative border-0">
        <div className="relative overflow-visible">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 bottom-[-3rem] z-0 bg-case-study-hero-surface md:bottom-[-4rem]"
          />
          <Nav heroTone="light" />
          <div className="hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-5 pb-20 text-center sm:px-8 md:px-12 md:pb-24 lg:gap-16 lg:px-20 lg:pb-20 ">
            <div className="mx-auto flex max-w-[66.5rem] flex-col items-center gap-8 mt-16">
              <div className="flex flex-col items-center gap-4">
                <CaseStudyHeadline />
                <p className="max-w-[34.1875rem] body-medium font-medium text-secondary">
                  Every story below is a working installation. The numbers are the customers'. The
                  tools are theirs. The workflows still run today.
                </p>
              </div>
            </div>

            <CaseStudyLogoWall />

            <FeaturedCaseCard c={featured} />
          </div>
        </div>
      </section>

      {/* Use cases section */}
      <section className="relative bg-transparent pt-8 pb-14 sm:pt-10 sm:pb-28">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-[66.5rem] flex-col gap-12">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="body-small text-accent-1">Use Cases</p>
                <h2 className="font-heading h4 text-primary">Pick a team that looks like yours</h2>
              </div>

              <div className="flex w-full flex-col gap-10">
                <CaseStudyFilters active={active} onChange={setActive} />

                <div className="grid gap-5 lg:grid-cols-2">
                  {filtered.map((c, i) => (
                    <CaseCard key={c.title + i} c={c} />
                  ))}
                </div>

                <nav
                  className="mt-2 flex items-center justify-between border-y border-primitive-main-grey/25 py-8"
                  aria-label="Case study pagination"
                >
                  <button
                    type="button"
                    disabled
                    aria-label="Previous case studies page"
                    className="cursor-pointer flex h-10 w-16 items-center justify-center rounded-full border border-primary bg-primitive-main-dark text-white transition-colors disabled:pointer-events-none disabled:border-transparent disabled:bg-primitive-main-dark/20 disabled:text-primary disabled:opacity-20"
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-current="page"
                      className="flex h-10 min-w-10 items-center justify-center rounded-sm px-4 font-medium text-accent-1"
                    >
                      1
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled
                    aria-label="Next case studies page"
                    className="flex h-10 w-16 items-center justify-center rounded-full border border-primary bg-primitive-main-dark text-white transition-colors disabled:pointer-events-none disabled:border-transparent disabled:bg-primitive-main-dark/20 disabled:text-primary disabled:opacity-20"
                  >
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primitive-main-beige py-1 sm:py-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="dark relative mx-auto flex min-h-[29.8125rem] w-full max-w-[80rem] flex-col items-center gap-10 overflow-hidden rounded-[32px] px-6 pt-14 pb-10 text-center text-white gradient-dark-1 max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] sm:gap-16 sm:px-10 sm:pt-20 sm:pb-16 lg:px-16">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src={askaiWordmark}
                className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full min-w-[46rem] max-w-none opacity-90"
              />
              <div className="relative flex w-full flex-col items-center gap-10 sm:gap-16">
                <div className="flex w-full flex-col items-center gap-8">
                  <h2 className="font-heading h3 w-full max-w-[20rem] text-balance text-white sm:max-w-[39rem] sm:whitespace-nowrap">
                    <span className="text-primitive-orange-500">Your story</span> could be next
                  </h2>
                  <p className="w-full max-w-[21rem] body-main text-white/80 sm:max-w-[35.625rem]">
                    Most teams have their first workflow running before the install conversation is
                    over. Setup is two minutes. The rest is delegation.
                  </p>
                </div>
                <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row">
                  <GetStartedButton className="inline-flex h-14 min-h-14 w-full items-center justify-center px-10 text-base tracking-[-0.01em] sm:w-auto" />
                  <a
                    href="https://cal.com/forms/24cb15e9-8a3d-4d94-9209-cc3d5f198286"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-full border border-white/20 bg-transparent px-10 text-base font-medium tracking-[-0.01em] text-white transition-all hover:bg-white/10 active:translate-y-px sm:w-auto"
                  >
                    Book a demo
                  </a>
                </div>
                <div className="flex flex-row flex-wrap items-center justify-center gap-6 sm:gap-8">
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="inline-flex text-white">
                      <Soc2Icon />
                    </span>
                    <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.4] text-white">
                      SOC 2 compliant.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="inline-flex text-white">
                      <CreditCardIcon />
                    </span>
                    <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.4] text-white">
                      No credit card required.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="inline-flex text-white">
                      <NoTrainingIcon />
                    </span>
                    <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.4] text-white">
                      Your data never trains models.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const FEATURED_AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

function CaseStudyHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((i) => (i + 1) % HEADLINE_WORDS.length),
      HEADLINE_INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <h1 className="font-heading h1 text-primary max-md:text-balance md:whitespace-nowrap">
      <span className="sr-only">Real workflows. Real content. Real coworkers.</span>
      <span
        aria-hidden
        className="inline-flex flex-col items-center md:flex-row md:items-baseline md:justify-center md:gap-x-[0.25em]"
      >
        <span className="whitespace-nowrap">Real</span>
        <span className="relative inline-block max-w-full overflow-hidden text-left leading-[1.1] h-[1.1em] motion-reduce:hidden md:h-[calc(var(--typo-h1-size)*var(--typo-h1-leading))]">
          <span className="grid size-full [grid-template-areas:'headline-slot']">
            {HEADLINE_WORDS.map((word, index) => (
              <span
                key={word}
                className={[
                  "inline-block w-max shrink-0 whitespace-nowrap leading-[1.1] [grid-area:headline-slot]",
                  "transition-all duration-[580ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]",
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[120%] opacity-0",
                ].join(" ")}
              >
                {word}
              </span>
            ))}
          </span>
        </span>
      </span>
      <span className="sr-only motion-reduce:not-sr-only motion-reduce:block">
        Real {HEADLINE_WORDS[activeIndex]}
      </span>
    </h1>
  );
}

function CaseStudyLogoWall() {
  const [drumIndex, setDrumIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDrumIndex((i) => (i + 1) % 2), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-[66.5rem] flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <div className="grid w-full grid-cols-2 items-center justify-items-center gap-x-4 gap-y-3 sm:flex sm:flex-nowrap sm:justify-center sm:gap-y-0">
        {logoWallItems.map((item, i) => {
          const key = item.label ?? item.drum?.join("-") ?? String(i);
          const cell = (
            <div
              key={key}
              className="flex min-w-0 w-full items-center justify-center py-1 sm:flex-1 sm:py-0"
            >
              <div className="relative h-14 w-full shrink-0 overflow-hidden sm:h-16">
                <div className="mx-auto flex w-full max-w-[66%] flex-col">
                  {item.drum ? (
                    <div
                      className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-reduce:transform-none"
                      style={{ transform: `translate3d(0, calc(-1 * ${drumIndex} * 3.5rem), 0)` }}
                    >
                      {item.drum.map((name) => (
                        <div
                          key={name}
                          className="flex h-14 shrink-0 items-center justify-center sm:h-16"
                        >
                          <span className={`text-primary ${item.className ?? ""}`}>{name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-14 shrink-0 items-center justify-center sm:h-16">
                      <span className={`text-primary ${item.className ?? ""}`}>{item.label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

          if (i === 0) return cell;

          return (
            <span key={`${key}-wrap`} className="contents">
              <div
                aria-hidden
                className="hidden h-6 w-px shrink-0 self-center bg-primitive-main-dark/10 sm:block"
              />
              {cell}
            </span>
          );
        })}
      </div>
      <span className="sr-only">
        Squibler, True Classic, Accel, Ridge, LYFEfuel, Outlet, Swoop, James Edition, Hampton,
        CoinGate, Aura
      </span>
    </div>
  );
}

function GlassOverlays() {
  return (
    <>
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
        className="pointer-events-none absolute inset-0  overflow-hidden rounded-[inherit]"
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
    </>
  );
}

function FeaturedCaseCard({ c }: { c: Case }) {
  return (
    <div
      className="group block h-full min-w-0 w-full max-w-[72.875rem] rounded-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primitive-purple-500 focus-visible:ring-offset-2"
      aria-label={`Read ${c.title}`}
    >
      <div className="relative h-full w-full min-w-0 overflow-hidden rounded-[35px] bg-white p-3 transition-transform duration-300 group-hover:-translate-y-1">
        <GlassOverlays />
        <div className="relative flex h-full w-full flex-col justify-between">
          <article className="grid min-h-0 min-w-0 gap-0 text-left h-full min-[1301px]:grid-cols-[minmax(0,36.34rem)_minmax(0,32rem)] min-[1301px]:items-stretch min-[1301px]:gap-12">
            <FeatureLeft c={c} />
            <div className="flex min-w-0 flex-col justify-between gap-8 p-5 sm:p-8 min-[1301px]:py-8 min-[1301px]:pr-8 min-[1301px]:pl-0">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2 body-small text-secondary">
                  {c.tags.map((tag, i) => (
                    <span key={tag} className="inline-flex items-center gap-2">
                      {i > 0 && <span aria-hidden>·</span>}
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-3.5">
                  <h2 className="font-heading h5 text-balance text-primary">{c.title}</h2>
                  <p className="body-small text-secondary">{c.excerpt}</p>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <StatPill big="30+" label="distinct projects" icon={<ProjectsIcon />} />
                <StatPill big="6" label="weeks of usage" icon={<UsageIcon />} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function StatPill({
  big,
  label,
  icon,
}: {
  big: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div
      className="relative h-full w-full min-h-[6.0625rem] overflow-hidden rounded-2xl text-primary"
      style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
    >
      <div aria-hidden className="bg-conic-gradient-bg pointer-events-none absolute inset-0 z-0 rounded-[inherit]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[20px] z-0 rounded-[inherit] bg-white blur-[16px]"
      />
      <div className="relative  h-full w-full rounded-[inherit]">
        <GlassOverlays />
        <div className="relative  flex h-full w-full flex-col justify-between">
          <div className="flex h-full items-start justify-between gap-4 p-5">
            <div>
              <p className="font-heading h5 text-primary">{big}</p>
              <p className="mt-1 body-small text-secondary">{label}</p>
            </div>
            <span className="size-6 shrink-0 text-accent-1">{icon}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 object-contain">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7315 0.428711C13.2139 0.428711 11.7361 0.571072 10.3302 0.729079C8.50474 0.934237 6.98204 2.19552 6.40129 3.88456C7.32034 3.80563 8.28248 3.75014 9.26873 3.75014C10.9118 3.75014 12.4879 3.90417 13.9093 4.06392C17.076 4.41981 19.6111 6.94739 19.9547 10.1293C20.1076 11.5465 20.2514 13.1071 20.2514 14.7329C20.2514 15.7131 20.1991 16.6696 20.1241 17.5853C21.8191 17.0039 23.0887 15.478 23.2869 13.6422C23.438 12.243 23.5713 10.7753 23.5713 9.26861C23.5713 7.76191 23.438 6.29426 23.2869 4.89506C23.0515 2.716 21.3069 0.973432 19.1327 0.729079C17.7268 0.571072 16.249 0.428711 14.7315 0.428711ZM9.26862 5.893C7.75107 5.893 6.27324 6.03535 4.86733 6.19336C2.69314 6.43771 0.948457 8.18026 0.7132 10.3593C0.562139 11.7585 0.428711 13.2262 0.428711 14.7329C0.428711 16.2396 0.562139 17.7073 0.7132 19.1065C0.948457 21.2856 2.69314 23.0281 4.86733 23.2724C6.27324 23.4305 7.75107 23.5728 9.26862 23.5728C10.7862 23.5728 12.264 23.4305 13.6699 23.2724C15.8441 23.0281 17.5888 21.2856 17.824 19.1065C17.975 17.7073 18.1086 16.2396 18.1086 14.7329C18.1086 13.2262 17.975 11.7585 17.824 10.3593C17.5888 8.18028 15.8441 6.43771 13.6699 6.19336C12.264 6.03535 10.7862 5.893 9.26862 5.893ZM13.5433 10.5303C13.9409 10.9685 13.9079 11.6461 13.4696 12.0437C12.387 13.0257 11.6501 13.8393 11.0408 14.7903C10.4272 15.7479 9.91383 16.8907 9.33111 18.5647C9.20888 18.9157 8.91342 19.1784 8.55044 19.2586C8.18746 19.3387 7.80884 19.225 7.55005 18.9583L5.01834 16.3474C4.60642 15.9226 4.61686 15.2443 5.04166 14.8323C5.46646 14.4204 6.14477 14.4308 6.55671 14.8556L7.91034 16.2516C8.31785 15.254 8.74059 14.4082 9.23645 13.6343C9.9828 12.4694 10.8654 11.5129 12.0299 10.4566C12.4681 10.059 13.1457 10.092 13.5433 10.5303Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UsageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 object-contain">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.57491 1.71443C8.57491 1.00434 7.99929 0.428711 7.2892 0.428711C6.57912 0.428711 6.00348 1.00434 6.00348 1.71443V3.0899C3.24197 3.4169 1.04798 5.58856 0.730813 8.31254C0.32801 11.772 0.32801 14.7284 0.730813 18.1879C1.06456 21.0541 3.47645 23.3089 6.44099 23.4464C8.21788 23.5287 10.0323 23.5716 12 23.5716C13.9676 23.5716 15.7821 23.5287 17.5589 23.4464C20.5236 23.3089 22.9354 21.0541 23.2692 18.1879C23.6719 14.7284 23.6719 11.772 23.2692 8.31254C22.952 5.58868 20.7581 3.41707 17.9967 3.08995V1.71443C17.9967 1.00434 17.4212 0.428711 16.7111 0.428711C16.001 0.428711 15.4254 1.00434 15.4254 1.71443V2.97496C14.3225 2.94441 13.1892 2.92877 12 2.92877C10.8108 2.92877 9.67766 2.94441 8.57491 2.97496V1.71443ZM10.7345 8.51901C10.8572 8.44569 10.9975 8.40698 11.1405 8.40698C11.2734 8.40698 11.4039 8.44042 11.5202 8.50401C14.8052 10.0311 16.6716 13.2032 16.5562 15.8661C16.5069 16.9866 16.1055 18.0272 15.3241 18.7887C14.5399 19.5529 13.4151 19.9954 11.9984 19.9954C10.5885 19.9954 9.46192 19.5778 8.67407 18.8225C7.88735 18.0682 7.48742 17.0243 7.44046 15.8647L7.44017 15.8576C7.42315 15.1908 7.58918 14.532 7.92012 13.9528C8.25108 13.3737 8.73437 12.8962 9.31754 12.5724C9.43382 12.5078 9.57191 12.4951 9.69797 12.5375C9.82404 12.5799 9.92644 12.6734 9.98006 12.7951C10.1354 13.1477 10.4349 13.2829 10.6889 13.2646C10.9307 13.2472 11.1613 13.0918 11.2196 12.737C11.3907 11.6956 11.1086 10.4633 10.5207 9.4434C10.4362 9.30204 10.4053 9.13486 10.434 8.97249C10.4631 8.80728 10.5518 8.65852 10.6833 8.55434C10.6996 8.54145 10.7167 8.52965 10.7345 8.51901Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FeatureLeft({ c }: { c: Case }) {
  return (
    <div className="dark relative flex w-full max-w-full min-h-[19.5rem] flex-col justify-between gap-5 overflow-hidden rounded-3xl p-6 text-white gradient-dark-1 sm:p-8 lg:p-9 md:aspect-video md:min-h-0 md:flex-row md:gap-0">
      <CaseStarBg />
      <div className="relative  flex min-w-0 flex-1 flex-col gap-4 justify-start md:justify-center">
        <h3 className="font-heading text-balance max-w-full text-[2.625rem] leading-[0.98] tracking-[-0.12rem] sm:text-5xl md:h4 md:max-w-56">
          <span className="text-white/75">{c.statLines[0]} </span>
          {c.statLines[1]}
        </h3>
      </div>
      <div className="relative flex w-full shrink-0 items-center justify-between gap-4 text-left md:ml-auto md:w-[min(38%,11.5rem)] md:flex-col md:items-start md:justify-center md:gap-3 md:self-center">
        <span className="relative inline-flex aspect-square w-[clamp(4.75rem,24vw,6.25rem)] shrink-0 rounded-[32%] bg-white/20 p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.32),0_0_24px_rgba(255,255,255,0.2)] sm:w-28 md:w-full md:max-w-[11.5rem] md:p-2">
          <img
            alt=""
            loading="lazy"
            width={240}
            height={240}
            className="h-full w-full rounded-[28%] object-cover"
            src={FEATURED_AVATAR}
          />
        </span>
        <div className="min-w-0 flex-1 px-0 md:max-w-full md:px-1">
          <p className="text-xs font-medium leading-tight text-white sm:body-small">{c.person}</p>
          <p className="text-[0.625rem] leading-tight text-white/70 sm:text-xs sm:leading-[1.35]">
            {c.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function CaseStarBg() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-[-2rem] h-[95%] w-auto object-contain opacity-40"
      viewBox="0 0 200 200"
      fill="none"
    >
      <path
        d="M100 10 L115 75 L185 75 L128 115 L148 180 L100 140 L52 180 L72 115 L15 75 L85 75 Z"
        fill="white"
        fillOpacity="0.15"
      />
      <circle cx="30" cy="160" r="40" fill="white" fillOpacity="0.08" />
    </svg>
  );
}

function ComparisonTabActiveBackground({ className }: { className?: string }) {
  return (
    <img
      aria-hidden
      alt=""
      src={comparisonTabActiveBg}
      className={className}
    />
  );
}

function CaseStudyFilters({
  active,
  onChange,
}: {
  active: string;
  onChange: (filter: string) => void;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 64 });
  const activeIndex = filters.indexOf(active);

  useLayoutEffect(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeIndex]);

  const filterButtonClass = (isActive: boolean) =>
    `relative flex h-10 min-w-16 shrink-0 items-center justify-center rounded-full border px-5 body-small whitespace-nowrap transition-[border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500 ${
      isActive
        ? "border-transparent text-white"
        : "border-primitive-main-grey/30 bg-transparent text-primary hover:border-accent-1 hover:text-accent-1"
    }`;

  return (
    <>
      <div className="relative overflow-hidden py-1 md:hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0  w-10"
          style={{
            background:
              "linear-gradient(90deg, var(--primitive-main-beige) 0%, transparent 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0  w-10"
          style={{
            background:
              "linear-gradient(270deg, var(--primitive-main-beige) 0%, transparent 100%)",
          }}
        />
        <div
          className="flex gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Case study filters"
        >
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(f)}
                className={filterButtonClass(isActive)}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                  >
                    <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                  </span>
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="-m-3 hidden overflow-x-auto p-3 md:block">
        <div
          role="tablist"
          aria-label="Case study filters"
          className="relative isolate mx-auto flex w-full flex-wrap gap-2"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-0 h-10 overflow-hidden rounded-full transition-[transform,width] duration-500 ease-out"
            style={{
              width: indicator.width,
              transform: `translate(${indicator.left}px, 0)`,
            }}
          >
            <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
          </span>
          {filters.map((f, i) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange(f)}
                className={`font-medium cursor-pointer relative flex h-10 min-w-16 items-center justify-center rounded-full border px-5 body-small whitespace-nowrap transition-[border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500 ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-primitive-main-grey/30 text-primary hover:border-accent-1 hover:text-accent-1"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function CaseCardLogo({ c }: { c: Case }) {
  if (c.isPerson) {
    return (
      <img
        alt=""
        loading="lazy"
        width={240}
        height={240}
        className="h-full w-full rounded-[28%] object-cover"
        src={FEATURED_AVATAR}
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center rounded-[28%] bg-white p-[14%] font-heading text-lg font-bold text-primitive-purple-500 md:text-2xl">
      {c.logoLabel ?? c.person.charAt(0)}
    </div>
  );
}

function CaseCardHeader({ c }: { c: Case }) {
  const logoFrameClass =
    "relative inline-flex aspect-square shrink-0 rounded-[32%] bg-white/20 p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.32),0_0_24px_rgba(255,255,255,0.2)] min-[520px]:p-2";

  return (
    <div className="dark relative flex min-h-[19.5rem] w-full max-w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl p-6 text-white gradient-dark-1 sm:p-8 lg:p-9 md:aspect-video md:min-h-0 md:flex-row md:gap-0">
      <CaseStarBg />
      <div className="relative flex min-w-0 flex-1 flex-col justify-start gap-4 md:justify-center">
        <h3 className="font-heading h5 max-w-full text-balance text-white md:h4 md:max-w-56">
          <span className="text-white/75">{c.statLines[0]} </span>
          {c.statLines[1]}
        </h3>
      </div>
      <div className="relative z-10 flex w-full shrink-0 items-center justify-between gap-4 text-left md:ml-auto md:w-[min(38%,11.5rem)] md:flex-col md:items-start md:justify-center md:gap-3 md:self-center">
        <span
          className={`${logoFrameClass} w-[clamp(4.75rem,24vw,6.25rem)] sm:w-28 md:w-full md:max-w-[11.5rem]`}
        >
          <CaseCardLogo c={c} />
        </span>
        <div className="min-w-0 flex-1 px-0 md:max-w-full md:px-1">
          <p className="text-xs font-medium leading-tight text-white sm:body-small">{c.person}</p>
          <p className="text-[0.625rem] leading-tight text-white/70 sm:text-xs sm:leading-[1.35]">
            {c.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: Case }) {
  return (
    <a
      href="#"
      className="group block h-full min-w-0 max-w-full rounded-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primitive-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primitive-main-beige)]"
      aria-label={`Read ${c.title}`}
    >
      <div className="relative h-full w-full min-w-0 overflow-hidden rounded-section bg-white p-2 transition-transform duration-300 group-hover:-translate-y-1">
        <GlassOverlays />
        <div className="relative  flex h-full w-full flex-col justify-between">
          <article className="grid h-full min-w-0 grid-rows-[auto_1fr] gap-0 text-left">
            <CaseCardHeader c={c} />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 px-4 pt-4 pb-4">
              <div className="flex flex-wrap items-center gap-2 body-small text-secondary">
                {c.tags.map((tag, i) => (
                  <span key={tag} className="inline-flex items-center gap-2">
                    {i > 0 && <span aria-hidden>·</span>}
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-3.5">
                <h3 className="body-large font-medium text-balance text-primary">{c.title}</h3>
                <p className="body-small text-secondary">{c.excerpt}</p>
                <div className="mt-auto flex flex-wrap gap-3.5">
                  {c.pills.map((pill, i) => (
                    <span
                      key={pill}
                      className={`inline-flex items-center gap-3 rounded-full py-1 pr-4 pl-3 body-small font-medium whitespace-nowrap ${
                        i === 0
                          ? "bg-primitive-purple-500/16 text-accent-1"
                          : "bg-primitive-main-grey/16 text-secondary"
                      }`}
                    >
                      <span className="size-3.5 shrink-0 text-accent-1 [&_svg]:size-full">
                        {i === 0 ? <ProjectsIcon /> : <UsageIcon />}
                      </span>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </a>
  );
}

function NoTrainingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="size-5 shrink-0"
      aria-hidden="true"
      style={{ opacity: 0.5 }}
    >
      <g fill="currentColor">
        <g clipPath="url(#case-studies-no-training-clip)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.226923 1.73079C-0.137203 1.26435 -0.0542666 0.591048 0.412167 0.226922C0.878603 -0.137203 1.5519 -0.0542663 1.91603 0.412168C3.26026 2.13408 4.46686 3.63499 5.61459 4.99488C6.02019 4.09172 6.64419 3.22323 7.46546 2.40196C9.01836 0.849051 10.7412 0.00283815 12.5329 0.00283815C14.3245 0.00283815 16.0473 0.849051 17.6002 2.40196C19.1532 3.95488 19.9993 5.67773 19.9993 7.46936C19.9993 9.26101 19.1532 10.9838 17.6002 12.5368C16.7853 13.3517 15.9239 13.9724 15.0283 14.3782C16.3831 15.522 17.8805 16.7342 19.5931 18.088C20.0573 18.455 20.1361 19.1289 19.7692 19.593C19.4022 20.0573 18.7283 20.136 18.2642 19.7692C9.97105 13.2129 6.57366 9.86076 0.226923 1.73079ZM5.10312 10.2525C6.60443 11.8969 8.09328 13.383 9.75265 14.897C9.51706 15.1409 9.27788 15.3849 9.03473 15.628C7.96733 16.6953 6.88183 17.6898 5.84712 18.6375L5.84199 18.6422C5.40938 19.0385 4.98599 19.4263 4.57369 19.8103C4.44148 19.9335 4.26752 20.0019 4.08685 20.0019H0.715044C0.320556 20.0019 0.000759086 19.6822 0.000759086 19.2876V15.9159C0.000759086 15.7352 0.0692268 15.5612 0.19237 15.429C0.576407 15.0168 0.964233 14.5933 1.3605 14.1607L1.36506 14.1558C2.3129 13.121 3.30726 12.0354 4.37473 10.968C4.61702 10.7257 4.86008 10.4873 5.10312 10.2525ZM13.9614 3.93141C14.5225 3.93141 15.0148 4.19855 15.4096 4.59331C15.8043 4.98806 16.0715 5.48038 16.0715 6.04148C16.0715 6.60258 15.8043 7.09489 15.4096 7.48965C15.0148 7.88441 14.5225 8.15153 13.9614 8.15153C13.4003 8.15153 12.908 7.88441 12.5132 7.48965C12.1185 7.09489 11.8513 6.60258 11.8513 6.04148C11.8513 5.48038 12.1185 4.98806 12.5132 4.59331C12.908 4.19855 13.4003 3.93141 13.9614 3.93141Z"
          />
        </g>
        <defs>
          <clipPath id="case-studies-no-training-clip">
            <rect width="20" height="20" fill="currentColor" />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}
