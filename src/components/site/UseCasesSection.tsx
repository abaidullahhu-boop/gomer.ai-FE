import { useState, useEffect, useCallback, useLayoutEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  Megaphone,
  Sun,
  ChartNoAxesColumnIncreasing,
  Check,
} from "lucide-react";
import { GetStartedButton } from "@/components/site/GetStartedButton";

const CYCLE_MS = 6000;
const PROGRESS_R = 8;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_R;

type UseCaseItem = { title: string; body: string };

type UseCaseTab = {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  items: UseCaseItem[];
};

const USE_CASE_TABS: UseCaseTab[] = [
  {
    id: "founders",
    label: "Founders & CEOs",
    icon: Rocket,
    headline:
      "One AI employee that does the analyst work, the marketing work, and the ops work you keep putting off.",
    items: [
      {
        title: "Live business pulse",
        body: "Pulls MRR, churn, CAC, ad spend, and pipeline from Stripe, PostHog, Google Ads, Meta Ads, and your CRM. Delivered to Slack every morning - no dashboard login needed.",
      },
      {
        title: "Investor updates on autopilot",
        body: "Assembles revenue, burn rate, pipeline, and headcount into a polished board deck or investor email. Monthly. You just hit send.",
      },
      {
        title: "Outbound that runs itself",
        body: "Builds ICP lead lists from Apollo, enriches contacts, launches email sequences via Instantly, and reports what's converting. Repeats weekly.",
      },
      {
        title: "Internal tools in minutes",
        body: "Builds revenue dashboards, client portals, and approval workflows as deployed web apps with database and auth. No engineering tickets. No sprint planning.",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing & Growth",
    icon: Megaphone,
    headline:
      "Gomer manages your ad accounts, writes your content, builds your pipeline, and reports on all of it. Every day.",
    items: [
      {
        title: "Full-funnel ad intelligence",
        body: "Pulls spend, CAC, CTR, and ROAS across Meta Ads and Google Ads. Flags underperformers, recommends budget shifts, and drafts new ad copy based on what's winning.",
      },
      {
        title: "Content engine",
        body: "Writes SEO blog posts, launch copy, email campaigns, ad scripts, and social drafts. Publishes directly to your CMS or GitHub. Repeats on any schedule.",
      },
      {
        title: "Pipeline builder",
        body: "Sources ICP-matched leads from Apollo, enriches with firmographic data, pushes to HubSpot or Attio, and activates outbound sequences through Instantly. Hands-free.",
      },
      {
        title: "Stakeholder reporting",
        body: "Builds performance reports with charts, narrative, and clear next actions as polished PDFs - not raw spreadsheet exports. Weekly or on-demand.",
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: Sun,
    headline:
      "Gomer writes code, opens PRs, triages bugs, and builds internal tools. Your engineers only work on what matters.",
    items: [
      {
        title: "Intelligent bug triage",
        body: "Monitors support channels, groups duplicate reports, cross-references the codebase, and opens scoped tickets in Linear or Jira with reproduction steps and context.",
      },
      {
        title: "Code contributions",
        body: "Clones your repo, writes fixes on a feature branch, opens pull requests with full context, and drafts release notes. Real commits, real PRs, shipped.",
      },
      {
        title: "Full-stack internal tools",
        body: "Builds and deploys dashboards, admin panels, and ops tools as web apps with database, auth, and hosting. Zero backlog added to the core team.",
      },
      {
        title: "Incident + error response",
        body: "Queries error tracking and logs, summarizes root cause, assigns owners, creates the postmortem checklist, and follows up until every action item closes.",
      },
    ],
  },
  {
    id: "ops",
    label: "Operations & Finance",
    icon: ChartNoAxesColumnIncreasing,
    headline:
      "Gomer eliminates the spreadsheet wrangling, vendor chasing, and report building that eats your ops team alive.",
    items: [
      {
        title: "Board pack assembly",
        body: "Pulls from Stripe, your CRM, Google Sheets, and headcount tools. Delivers a polished investor update with revenue, burn, pipeline, and KPIs - every month, zero manual assembly.",
      },
      {
        title: "Document + invoice processing",
        body: "Reads invoices and contracts as PDFs, matches line items against agreements, flags anomalies, and queues everything for review. Handles the paperwork.",
      },
      {
        title: "Forecast + model refresh",
        body: "Updates operating models with live data from your tools, highlights where actuals diverge from plan, and surfaces the variances that actually matter.",
      },
      {
        title: "Cross-team automation",
        body: "Tracks missing inputs, nudges owners in Slack, syncs data between tools on schedule, and closes reporting loops - without you being the bottleneck.",
      },
    ],
  },
];

function TabProgressCircle({ cycleKey }: { cycleKey: number }) {
  return (
    <span className="relative size-5 shrink-0 text-white" aria-hidden="true">
      <svg className="size-5 -rotate-90" viewBox="0 0 20 20">
        <circle
          cx="10"
          cy="10"
          r={PROGRESS_R}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-45"
        />
        <circle
          key={cycleKey}
          cx="10"
          cy="10"
          r={PROGRESS_R}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={PROGRESS_CIRCUMFERENCE}
          className="animate-use-case-progress"
          style={{
            animationDuration: `${CYCLE_MS}ms`,
            ["--use-case-circumference" as string]: PROGRESS_CIRCUMFERENCE,
          }}
        />
      </svg>
    </span>
  );
}

function TabGlassIndicator({ translateY, cycleKey }: { translateY: number; cycleKey: number }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-0 h-[3.8125rem] w-full overflow-hidden rounded-full transition-transform duration-500 ease-out"
      style={{ transform: `translateY(${translateY}rem)` }}
    >
      <div className="relative h-full w-full rounded-full bg-white/10 backdrop-blur-[22px] backdrop-saturate-150">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background: "radial-gradient(100% 100% at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
          style={{ filter: "blur(5px)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "4px",
            }}
          />
        </div>
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <span className="absolute top-1/2 right-8 -translate-y-1/2">
            <TabProgressCircle cycleKey={cycleKey} />
          </span>
        </div>
      </div>
    </span>
  );
}

function UseCasePanel({ tab }: { tab: UseCaseTab }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="rounded-section px-0 pb-8 sm:px-6 sm:py-6">
        <h3 className="max-w-[29rem] font-heading text-2xl leading-[1.2] font-bold tracking-[-0.06em] text-primitive-main-dark max-sm:text-[1.3125rem]">
          {tab.headline}
        </h3>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 sm:p-8">
        {tab.items.map((item) => (
          <div key={item.title} className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className="gradient-dark-2 mt-0 flex size-4 shrink-0 items-center justify-center rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.35)]"
                aria-hidden="true"
              >
                <Check className="size-2.5 text-white" strokeWidth={2.6} aria-hidden="true" />
              </span>
              <h4 className="body-main min-w-0 text-primitive-main-dark">{item.title}</h4>
            </div>
            <p className="body-small text-primitive-main-grey font-medium">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const tabRefs = useRef(new Map<number, HTMLButtonElement>());
  const tabListRef = useRef<HTMLDivElement>(null);
  const [indicatorY, setIndicatorY] = useState(0);

  const updateIndicator = useCallback(() => {
    const container = tabListRef.current;
    const button = tabRefs.current.get(activeIndex);
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const offsetPx = buttonRect.top - containerRect.top;
    setIndicatorY(offsetPx / 16);
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % USE_CASE_TABS.length);
    setCycleKey((k) => k + 1);
  }, []);

  const selectTab = useCallback((index: number) => {
    setActiveIndex(index);
    setCycleKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(goNext, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, cycleKey, goNext]);

  return (
    <section className="overflow-x-clip bg-primary py-1 sm:py-[7rem]" id="use-cases">
      <div className="px-0 sm:px-0 md:px-0 lg:px-20">
        <div className="mx-auto w-full max-w-[90rem]">
          <div className="bg-hero dark group/tabs relative flex w-full flex-col overflow-hidden rounded-[35px] px-4 py-10 sm:px-6 md:px-12 lg:px-20 xl:min-h-[49.9375rem] xl:flex-row xl:items-stretch xl:justify-start xl:gap-16 xl:py-20 xl:pr-10 xl:pl-20 2xl:gap-[6.75rem] 2xl:pr-16 2xl:pl-40">
            <div className="flex w-full flex-col items-start gap-12 xl:w-96 xl:shrink-0 2xl:w-[25.875rem]">
              <div className="flex w-full flex-col items-start">
                <div className="pb-4">
                  <p className="body-small text-[var(--primitive-purple-50)]">Use cases</p>
                </div>
                <h2 className="font-heading max-w-[27.125rem] text-5xl leading-[1.1] font-bold tracking-[-0.06em] text-white max-sm:text-[2.625rem]">
                  What Gomer can own for your team.
                </h2>
              </div>

              <div
                ref={tabListRef}
                role="tablist"
                aria-label="Use cases"
                className="relative isolate flex h-auto w-full flex-col items-stretch gap-0 overflow-visible bg-transparent p-0 xl:w-96 2xl:w-[25.875rem]"
              >
                <TabGlassIndicator translateY={indicatorY} cycleKey={cycleKey} />

                {USE_CASE_TABS.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      id={`${tab.id}-use-case-tab`}
                      aria-selected={isActive}
                      aria-controls={`${tab.id}-use-case-panel`}
                      tabIndex={isActive ? 0 : -1}
                      ref={(node) => {
                        if (node) tabRefs.current.set(index, node);
                        else tabRefs.current.delete(index);
                      }}
                      onClick={() => selectTab(index)}
                      className={[
                        "relative !flex h-[3.8125rem] !min-h-[3.8125rem] w-full !flex-none items-center justify-start overflow-visible rounded-full border-0 !bg-transparent p-0 text-left body-large transition-colors !shadow-none",
                        isActive ? "text-white opacity-100" : "text-white hover:text-white",
                      ].join(" ")}
                    >
                      <span className="cursor-pointer relative z-10 flex h-full w-full min-w-0 items-center justify-between gap-4 px-8">
                        <span className="flex min-w-0 items-center gap-4">
                          <Icon className="size-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                          <span className="truncate text-white">{tab.label}</span>
                        </span>
                        <span className="size-5 shrink-0" aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>

              <GetStartedButton
                variant="white"
                label="Start for Free"
                className="h-14 min-h-14 gap-0 px-10 text-base tracking-[-0.01em] bg-white text-primitive-main-dark hover:bg-white/95"
              />
            </div>

            <div className="relative mt-10 w-full min-w-0 xl:mt-0 xl:ml-auto xl:max-w-[40.625rem]">
              <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-section border border-white bg-white/[0.01] p-6 text-primary shadow-[inset_0_0_32px_16px_rgb(255_255_255/0.64)] sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[2.63%_2.93%_2.72%] rounded-section bg-white opacity-70 blur-[15px] [mix-blend-mode:plus-lighter]"
                />
                <div className="relative grid min-h-0 flex-1 grid-cols-1">
                  {USE_CASE_TABS.map((tab, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={tab.id}
                        role="tabpanel"
                        id={`${tab.id}-use-case-panel`}
                        aria-labelledby={`${tab.id}-use-case-tab`}
                        aria-hidden={!isActive}
                        inert={!isActive ? true : undefined}
                        className={[
                          "col-start-1 row-start-1 flex min-h-0 flex-col transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                          isActive
                            ? "z-10 opacity-100 blur-0 motion-reduce:blur-0"
                            : "pointer-events-none z-0 opacity-0 blur-md motion-reduce:blur-0",
                        ].join(" ")}
                      >
                        <UseCasePanel tab={tab} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
