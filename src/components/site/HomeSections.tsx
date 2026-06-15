import { type ReactNode } from "react";
import { Workflow, BarChart3, GitBranch, Globe, Users, ShieldCheck, Check } from "lucide-react";
import { HowItWorksScrollSection, type HowItWorksStep } from "@/components/site/ProductHowItWorksSection";
import askaiWordmark from "@/assets/images/askai-wordmark-color.svg";
import chatgptLogo from "@/assets/images/chatgpt.svg";
import claudeLogo from "@/assets/images/claude.svg";
import perplexityLogo from "@/assets/images/perplexity.svg";

function CapabilityRow({
  eyebrow, icon: Icon, title, body, bullets, visual, reverse, eyebrowNoBg,
}: {
  eyebrow: string; icon?: any; title: ReactNode; body: string; bullets: string[]; visual: ReactNode; reverse?: boolean; eyebrowNoBg?: boolean;
}) {
  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:[direction:rtl]" : ""}`}>
      <div className="[direction:ltr] pl-[108px]">
        <div className={`inline-flex items-center gap-2 text-violet-700 text-xs ${eyebrowNoBg ? "" : "px-3 py-1.5 rounded-full bg-violet-100"}`}>
          {Icon ? <Icon className="w-3.5 h-3.5" /> : null} {eyebrow}
        </div>
        <h3 className="font-medium text-4xl md:text-5xl mt-4 leading-[1.05]">{title}</h3>
        <p className="mt-5 text-muted-foreground leading-relaxed">{body}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-foreground/90">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="[direction:ltr] rounded-3xl bg-hero p-8 min-h-[380px] flex items-center justify-center ">
        {visual}
      </div>
    </div>
  );
}

export function WorkflowAutomation() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <CapabilityRow
          eyebrow="Workflow Automation"
          icon={Workflow}
          title="Automations that write themselves."
          body="Don't build flows in a no-code maze. Tell Gomer the outcome — it figures out which tools to query, when to run, and what to do with the result."
          bullets={[
            "Schedule recurring tasks in plain English",
            "Multi-step workflows across 3,000+ tools",
            "Self-healing when an API or schema changes",
          ]}
          visual={
            <div className="bg-background rounded-2xl p-5 w-full max-w-sm text-foreground shadow-2xl space-y-2.5">
              <div className="text-xs text-muted-foreground">Scheduled · Every Monday 9am</div>
              {[
                ["Pull Stripe revenue + churn", "✓"],
                ["Query HubSpot pipeline", "✓"],
                ["Build PDF weekly report", "✓"],
                ["Post to #leadership Slack", "→"],
              ].map(([t, s], i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted text-sm">
                  <span>{t}</span>
                  <span className="text-violet-600 font-bold">{s}</span>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </section>
  );
}



export function ReportsAnalytics() {
  return (
    <section className="px-6 py-24 bg-secondary">
      <div className="mx-auto max-w-6xl">
        <CapabilityRow
          reverse
          eyebrow="Reports & Analytics"
          icon={BarChart3}
          title="Board-ready reports. Zero copy-paste."
          body="Gomer pulls numbers from every source of truth, writes the narrative, designs the charts, and delivers a polished PDF or live dashboard."
          bullets={[
            "MRR, churn, CAC, ROAS — always in sync",
            "Investor updates, board decks, weekly digests",
            "Live dashboards your team actually opens",
          ]}
          visual={
            <div className="rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/20 p-4 w-full max-w-sm shadow-[0_20px_60px_-20px_rgba(60,40,180,0.4)]">
              <div className="bg-white rounded-2xl p-5 w-full text-foreground shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm">Q1 Performance</div>
                  <div className="text-xs text-emerald-600 font-semibold">+41%</div>
                </div>
                <div className="mt-4 flex items-end gap-2 h-32">
                  {[40, 55, 48, 70, 62, 85, 78, 95].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-violet-500 to-indigo-400" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[["MRR", "$284k"], ["Churn", "1.8%"], ["ROAS", "3.4x"]].map(([l, v]) => (
                    <div key={l} className="p-2 rounded-lg bg-muted">
                      <div className="text-[10px] text-muted-foreground">{l}</div>
                      <div className="text-sm font-bold">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          
        />
      </div>
    </section>
  );
}

const HOME_HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "/01",
    title: "Connect",
    body: "Install Gomer from the Slack App Directory or Microsoft Teams. Connect your tools: Stripe, Notion, Google Ads, whatever you use. Takes 2 minutes.",
    visual: "marketplace",
  },
  {
    number: "/02",
    title: "Ask",
    body: 'Talk to Gomer like a colleague. "Pull our Meta Ads data and compare vs. last month." "Create a Linear issue for the pricing update." "Build me a revenue dashboard."',
    visual: "slack-connect",
  },
  {
    number: "/03",
    title: "Gomer delivers",
    body: "Gomer queries your tools, analyzes data, and delivers real outputs: PDFs, spreadsheets, web apps, code. He also schedules recurring tasks and proposes automations you didn't think to ask for.",
    visual: "slack-work",
  },
];

export function AppBuilder() {
  return <HowItWorksScrollSection steps={HOME_HOW_IT_WORKS_STEPS} />;
}

export function Engineering() {
  return (
    <section className="px-6 py-24 bg-secondary">
      <div className="mx-auto max-w-6xl">
        <CapabilityRow
          reverse
          eyebrow="Engineering"
          icon={GitBranch}
          title="An engineer who ships PRs while you sleep."
          body="Gomer clones your repo, writes the fix on a feature branch, opens a PR with context, and assigns reviewers. Real commits. Real review."
          bullets={[
            "Bug triage from Slack and Linear",
            "Pull requests with tests + release notes",
            "Incident response and root-cause summaries",
          ]}
          visual={
            <div className="bg-[#0d1117] rounded-2xl p-5 w-full max-w-sm text-slate-200 shadow-2xl font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <GitBranch className="w-3.5 h-3.5" /> feature/fix-checkout-validation
              </div>
              <div className="mt-3 space-y-1">
                <div className="text-emerald-400">+ if (!email.includes('@')) {`{`}</div>
                <div className="text-emerald-400">+   throw new Error('Invalid email')</div>
                <div className="text-emerald-400">+ {`}`}</div>
                <div className="text-rose-400">- // TODO: validate email</div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-white/5 text-slate-300">
                <div className="text-[10px] text-slate-500">PR #1284 · opened by Gomer</div>
                <div className="mt-1">Fix checkout validation crash</div>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}

export function BrowserAutomation() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <CapabilityRow
          eyebrow="Browser Automation"
          icon={Globe}
          title="Gomer uses the web like you do."
          body="No API? No problem. Gomer logs in, clicks through, scrapes the dashboard, and pulls the data — securely, in its own sandboxed browser."
          bullets={[
            "Works with any web app, even legacy admin panels",
            "Multi-factor login + credential vault",
            "Scheduled scrapes, exports, and form-filling",
          ]}
          visual={
            <div className="bg-background rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl text-foreground">
              <div className="px-3 py-2 bg-muted flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <div className="flex-1 text-[10px] bg-background rounded px-2 py-1">admin.legacy-erp.com</div>
              </div>
              <div className="p-5 space-y-2">
                {["Logging in…", "Navigating /reports", "Exporting CSV", "Parsing 1,284 rows", "Posting to Slack ✓"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2 text-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${i < 4 ? "bg-emerald-500" : "bg-violet-500 animate-pulse"}`} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}

export function TeamCollaboration() {
  return (
    <section className="px-6 py-24 bg-secondary">
      <div className="mx-auto max-w-6xl">
        <CapabilityRow
          reverse
          eyebrow="Team Collaboration"
          icon={Users}
          title="One coworker. The whole team."
          body="Everyone on your team works with the same Gomer. Shared memory, shared integrations, shared context — but private threads when you need them."
          bullets={[
            "Public + private DMs in Slack and Teams",
            "Role-based access for integrations",
            "Audit log of every action Gomer takes",
          ]}
          visual={
            <div className="bg-background rounded-2xl p-5 w-full max-w-sm shadow-2xl text-foreground space-y-3">
              <div className="text-xs text-muted-foreground"># product-launch</div>
              {[
                ["Anna", "Gomer draft the launch email"],
                ["Gomer", "Sent to Lisa for review ✓", true],
                ["Lisa", "Approved. Push to Mailchimp."],
                ["Gomer", "Scheduled for 9am tomorrow ✓", true],
              ].map(([n, t, app], i) => (
                <div key={i} className="flex gap-2 items-start text-sm">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-300 to-violet-500 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs">{n}</span>
                      {app && <span className="px-1 py-0.5 rounded text-[9px] bg-violet-100 text-violet-700 font-bold">APP</span>}
                    </div>
                    <div className="text-xs text-foreground/80">{t}</div>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </section>
  );
}

export function SecurityCompliance() {
  const items = [
    { t: "SOC 2 Type II", d: "Audited annually by an independent firm." },
    { t: "GDPR & CCPA", d: "Full data residency and deletion controls." },
    { t: "Encryption at rest", d: "AES-256 for every byte we store." },
    { t: "Encryption in transit", d: "TLS 1.3 for every connection." },
    { t: "SSO & SAML", d: "Okta, Google Workspace, Microsoft Entra." },
    { t: "Zero training", d: "Your data is never used to train any model." },
  ];
  return (
    <section className="px-6 py-24 bg-foreground text-background rounded-[40px] mx-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/10 text-background/80 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Security & Compliance
          </div>
          <h2 className="font-display text-5xl md:text-7xl mt-5">Enterprise-grade by default.</h2>
          <p className="mt-5 text-background/70 max-w-2xl mx-auto">
            Gomer is built for teams who can't trade speed for security. Every plan ships with the controls auditors ask for.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {items.map((i) => (
            <div key={i.t} className="p-7 rounded-3xl bg-background/5 border border-background/10">
              <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="mt-4 font-semibold text-lg">{i.t}</div>
              <div className="mt-2 text-background/60 text-sm leading-relaxed">{i.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ASK_AI_QUERY =
  "I'm evaluating Gomer, the AI employee for Slack and Microsoft Teams (Gomer.com). What does he do, what are his strengths and weaknesses, and who is he best for?";

const ASK_AI_OPTIONS = [
  {
    name: "Ask ChatGPT",
    logo: chatgptLogo,
    link: `https://chatgpt.com/?q=${encodeURIComponent(ASK_AI_QUERY)}`,
  },
  {
    name: "Ask Perplexity",
    logo: perplexityLogo,
    link: `https://www.perplexity.ai/search?q=${encodeURIComponent(ASK_AI_QUERY)}`,
  },
  {
    name: "Ask Claude",
    logo: claudeLogo,
    link: `https://claude.ai/new?q=${encodeURIComponent(ASK_AI_QUERY)}`,
  },
];

export function AskAI() {
  return (
    <section className="bg-primary py-1 sm:py-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="dark relative flex min-h-[25.8125rem] w-full flex-col items-center justify-center overflow-hidden rounded-section px-6 py-12 text-center max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] sm:px-10 sm:py-16 lg:px-16 gradient-dark-1">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              src={askaiWordmark}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full min-w-[46rem] max-w-none opacity-90"
            />
            <div className="relative z-10 flex w-full flex-col items-center gap-16">
              <div className="flex w-full flex-col items-center gap-8">
                <div className="flex w-full flex-col items-center">
                  <div className="pb-4">
                    <p className="body-small text-[#f1edff] font-medium">Don't take our word for it</p>
                  </div>
                  <h2 className="font-heading max-w-full text-balance text-[2.5rem] leading-[1.1] font-bold tracking-[-0.06em] text-white max-sm:text-[2.1875rem] sm:text-[3rem]">
                    Ask AI about Gomer
                  </h2>
                </div>
                <p className="body-main max-w-[35.625rem] text-white opacity-80 font-medium">
                  Pick your favorite AI and ask what it thinks about Gomer.
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  No filter, no spin.
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-center gap-x-4 gap-y-3">
                {ASK_AI_OPTIONS.map((option) => (
                  <a
                    key={option.name}
                    href={option.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center gap-2.5 rounded-full border-transparent bg-white px-10 text-base font-medium tracking-[0.01em] text-[#292737] transition-all hover:bg-white/95 active:translate-y-px sm:w-auto"
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width={20}
                      height={20}
                      decoding="async"
                      src={option.logo}
                      className="size-5 brightness-0"
                    />
                    {option.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

