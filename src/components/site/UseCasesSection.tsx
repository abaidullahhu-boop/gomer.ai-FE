import { useState, useEffect, useCallback } from "react";
import { Rocket, Megaphone, Sparkles, BarChart3, Check } from "lucide-react";

const CYCLE_MS = 5000;
const PROGRESS_R = 6;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_R;

function ProgressCircle({ isActive, cycleKey }: { isActive: boolean; cycleKey: number }) {
  if (!isActive) {
    return <span className="w-4 h-4 rounded-full border border-white/40 shrink-0" />;
  }

  return (
    <span className="relative w-4 h-4 shrink-0">
      <svg
        className="w-4 h-4 -rotate-90"
        viewBox="0 0 16 16"
        aria-hidden
        style={{ ["--use-case-circumference" as string]: PROGRESS_CIRCUMFERENCE }}
      >
        <circle
          cx="8"
          cy="8"
          r={PROGRESS_R}
          fill="none"
          stroke="white"
          strokeOpacity={0.4}
          strokeWidth="1.5"
        />
        <circle
          key={cycleKey}
          cx="8"
          cy="8"
          r={PROGRESS_R}
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={PROGRESS_CIRCUMFERENCE}
          className="animate-use-case-progress"
          style={{ animationDuration: `${CYCLE_MS}ms` }}
        />
      </svg>
    </span>
  );
}

const CASES = [
  {
    id: "founders",
    label: "Founders & CEOs",
    icon: Rocket,
    headline:
      "One AI coworker that does the analyst work, the marketing work, and the ops work you keep putting off.",
    items: [
      {
        title: "Live business pulse",
        body: "Pulls MRR, churn, CAC, ad spend, and pipeline from Stripe, PostHog, Google Ads, Meta Ads, and your CRM. Delivered to Slack every morning — no dashboard login needed.",
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
      "A growth marketer that ships campaigns, audits spend, and writes the report by morning.",
    items: [
      {
        title: "Campaign analysis",
        body: "Pulls performance from Meta, Google, and TikTok Ads. Surfaces what's working, what to kill, and where to reinvest.",
      },
      {
        title: "Content engine",
        body: "Drafts blog posts, social copy, and newsletters tuned to your brand voice and posts them to your CMS or schedule tool.",
      },
      {
        title: "SEO audits weekly",
        body: "Crawls your site, flags broken pages, missing meta, and ranking drops, then ships fixes straight to your repo.",
      },
      {
        title: "Attribution that holds",
        body: "Stitches together first-touch and multi-touch data across tools so revenue is tied back to channel, not guesses.",
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: Sparkles,
    headline:
      "Ship code, triage incidents, and clear the backlog without pulling a senior off product work.",
    items: [
      {
        title: "PRs that compile",
        body: "Picks up Linear tickets, writes the code, opens a PR with tests, and links the issue. You review and merge.",
      },
      {
        title: "On-call assistant",
        body: "Reads alerts from Datadog and Sentry, correlates with recent deploys, and posts a root-cause summary to Slack.",
      },
      {
        title: "Docs that stay current",
        body: "Watches your repo, updates README, API docs, and changelog on every release. No more stale wiki.",
      },
      {
        title: "Backlog grooming",
        body: "Reads your issue tracker, dedupes, labels, and proposes priorities based on impact and recent customer reports.",
      },
    ],
  },
  {
    id: "ops",
    label: "Operations & Finance",
    icon: BarChart3,
    headline:
      "Close the books, reconcile spend, and keep operations moving without a third headcount.",
    items: [
      {
        title: "Monthly close",
        body: "Reconciles Stripe, bank, and AP/AR in QuickBooks or Xero. Flags anomalies before they hit your books.",
      },
      {
        title: "Vendor spend audit",
        body: "Surfaces unused subscriptions, duplicate tools, and renewals coming up so you stop paying for shelfware.",
      },
      {
        title: "Cash runway model",
        body: "Updates the forecast from real revenue and burn each week. Sends a Slack note when assumptions drift.",
      },
      {
        title: "Compliance & vendor reviews",
        body: "Drafts SOC 2 evidence requests, vendor security reviews, and policy updates. Files them in Vanta or Drata.",
      },
    ],
  },
];

export function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const current = CASES[activeIndex];

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % CASES.length);
    setCycleKey((k) => k + 1);
  }, []);

  const selectCase = useCallback((index: number) => {
    setActiveIndex(index);
    setCycleKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(goNext, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, cycleKey, goNext]);

  return (
    <section className="lg:px-20 py-1 bg-section-cream">
      <div className="mx-auto rounded-[36px] overflow-hidden relative bg-hero px-3 xl:pr-10 xl:pl-20 2xl:gap-[6.75rem] 2xl:pr-16 2xl:pl-40 lg:px-32 py-20">
        {/* Peach glow */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[35%] rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.88 0.10 60 / 0.9), transparent)",
          }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-32 items-start">
          {/* LEFT */}
          <div>
            <p className="text-xs text-white/70">Use cases</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.02] mt-4">
              What Viktor can own for your team.
            </h2>

            <div className="mt-10 space-y-2">
              {CASES.map((c, index) => {
                const Icon = c.icon;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={c.id}
                    onClick={() => selectCase(index)}
                    className={
                      "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-full text-left transition-all " +
                      (isActive
                        ? "bg-white/15 border border-white/30 backdrop-blur-sm shadow-[inset_0_1px_0_oklch(1_0_0/0.2)]"
                        : "border border-transparent hover:bg-white/5")
                    }
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </span>
                      <span className="text-white text-sm font-medium">
                        {c.label}
                      </span>
                    </span>
                    <ProgressCircle isActive={isActive} cycleKey={cycleKey} />
                  </button>
                );
              })}
            </div>

            <button className="mt-10 px-7 py-3 rounded-full bg-white text-foreground font-medium text-sm shadow-md hover:bg-white/95 transition">
              Start for Free
            </button>
          </div>

          {/* RIGHT */}
          <div className="relative overflow-hidden rounded-[28px] bg-white p-8 md:p-10 shadow-[inset_0_0_18px_3px_#FFEEEE,inset_0_0_28px_6px_#FFEEEE]">
            {/* Inner colored glow on all 4 sides */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[28px]"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 72%, #FFEEEE 92%, #FFEEEE 100%)",
              }}
            />
            <div className="relative">
              <h3 className="text-foreground text-xl md:text-[1.65rem] font-bold leading-snug tracking-tight">
                {current.headline}
              </h3>

              <div className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {current.items.map((it) => (
                  <div
                    key={it.title}
                    className="flex h-[170px] flex-col overflow-hidden"
                  >
                    <div className="flex shrink-0 items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[oklch(0.78_0.12_310)] to-[oklch(0.55_0.20_280)] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                      <h4 className="text-foreground text-sm font-medium">
                        {it.title}
                      </h4>
                    </div>
                    <p className="mt-2.5 line-clamp-5 text-muted-foreground text-[13px] leading-relaxed">
                      {it.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
