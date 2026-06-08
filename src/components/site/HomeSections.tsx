import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Workflow, BarChart3, GitBranch, Globe, Users, ShieldCheck, Check } from "lucide-react";
import claudeAppIcon from "@/assets/images/claude-app-icon.png";
import viktorMarketplaceAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import chatgptIcon from "@/assets/images/chatgpt.svg";

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
          body="Don't build flows in a no-code maze. Tell Viktor the outcome — it figures out which tools to query, when to run, and what to do with the result."
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
          body="Viktor pulls numbers from every source of truth, writes the narrative, designs the charts, and delivers a polished PDF or live dashboard."
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

const HOW_IT_WORKS_STEPS = [
  {
    number: "/01",
    title: "Connect",
    body: "Install Viktor from the Slack App Directory or Microsoft Teams. Connect your tools: Stripe, Notion, Google Ads, whatever you use. Takes 2 minutes.",
  },
  {
    number: "/02",
    title: "Delegate",
    body: "Message Viktor in Slack like you'd message a teammate. Describe the outcome — reports, audits, campaigns — no workflows to build.",
  },
  {
    number: "/03",
    title: "Ship",
    body: "Viktor pulls data, runs the work, and delivers finished output right in your channel. You review, approve, and move on.",
  },
] as const;

function MarketplaceApps() {
  return (
    <div className="p-6 space-y-3">
      <div className="flex items-center gap-3 py-1">
        <img src={claudeAppIcon} alt="" className="w-10 h-10 rounded-full shrink-0 object-cover" />
        <div className="min-w-0">
          <div className="font-semibold text-sm text-white">Claude</div>
          <div className="text-xs text-white/60 leading-snug">
            Anthropic&apos;s AI agent for any task, think, write, and code with Claude.
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <img src={viktorMarketplaceAvatar} alt="" className="w-10 h-10 rounded-full shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-[#0a1128]">Viktor</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-600 text-[10px] font-semibold inline-flex items-center gap-1">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                <path d="M2.5 7C1.12 7 0 5.88 0 4.5 0 3.12 1.12 2 2.5 2c.28-1.24 1.44-2 2.5-2s2.22.76 2.5 2C8.88 2 10 3.12 10 4.5 10 5.88 8.88 7 7.5 7H2.5Z" fill="currentColor" />
              </svg>
              Salesforce Partner
            </span>
          </div>
          <div className="text-xs text-[#0a1128]/60">Your AI employee in Slack</div>
        </div>
      </div>

      <div className="flex items-center gap-3 py-1">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
          <img src={chatgptIcon} alt="" className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm text-white">ChatGPT</div>
          <div className="text-xs text-white/60 leading-snug">
            ChatGPT in Slack: Search, write, summarize and get work done.
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorksCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/20 p-4 w-full max-w-sm shadow-[0_20px_60px_-20px_rgba(60,40,180,0.4)]">
      <MarketplaceApps />
      <div className="relative flex shrink-0 flex-col items-start gap-3 p-6 sm:p-8">
        <p className="body-small text-[#ffbb98]">{number}</p>
        <h3 className="font-heading text-2xl max-sm:text-[1.3125rem] leading-[1.2] font-bold tracking-normal text-white">{title}</h3>
        <p className="body-main text-white/70">{body}</p>
      </div>
    </div>
  );
}

function getHowItWorksCardMotion(needle: number, index: number) {
  const distance = needle - index;
  const exitX = -64;
  const exitY = 96;
  const enterX = 48;
  const enterY = 112;

  if (distance >= 1) {
    return {
      opacity: 0,
      transform: `translate(${exitX}px, ${exitY}px) rotate(-12deg) scale(0.96)`,
      zIndex: 10,
      pointerEvents: "none" as const,
    };
  }

  if (distance <= -1) {
    return {
      opacity: 0,
      transform: `translate(${enterX}px, ${enterY}px) rotate(12deg) scale(0.98)`,
      zIndex: 10,
      pointerEvents: "none" as const,
    };
  }

  if (distance >= 0) {
    const t = distance;
    return {
      opacity: 1 - t,
      transform: `translate(${exitX * t}px, ${exitY * t}px) rotate(${-12 * t}deg) scale(${1 - 0.04 * t})`,
      zIndex: t < 0.5 ? 30 : 20,
      pointerEvents: t < 0.5 ? ("auto" as const) : ("none" as const),
    };
  }

  const t = distance + 1;
  return {
    opacity: t,
    transform: `translate(${enterX * (1 - t)}px, ${enterY * (1 - t)}px) rotate(${12 * (1 - t)}deg) scale(${0.98 + 0.02 * t})`,
    zIndex: t > 0.5 ? 30 : 10,
    pointerEvents: t > 0.5 ? ("auto" as const) : ("none" as const),
  };
}

export function AppBuilder() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function updateScrollProgress() {
      if (window.innerWidth < 1024) return;

      const container = scrollRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const scrollRange = height - window.innerHeight;
      if (scrollRange <= 0) return;

      const progress = Math.min(1, Math.max(0, -top / scrollRange));
      setScrollProgress(progress);
    }

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateScrollProgress();
      });
    }

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const needle = scrollProgress * (HOW_IT_WORKS_STEPS.length - 1);

  return (
    <section className="px-6 py-24">
      <div ref={scrollRef} className="mx-auto max-w-6xl lg:min-h-[300vh]">
        <div className="lg:sticky lg:top-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="pl-[108px] max-lg:pl-0">
              <div className="inline-flex items-center gap-2 text-violet-700 text-xs">
                How it works
              </div>
              <h3 className="font-medium text-4xl md:text-5xl mt-4 leading-[1.05]">
                Hiring your first AI employee has never been{" "}
                <span
                  className="bg-clip-text leading-[1.1] text-transparent"
                  style={{
                    backgroundImage:
                      "radial-gradient(125% 115% at 58% -8%, rgb(255, 187, 152) 0%, rgb(255, 187, 152) 7%, rgb(207, 160, 204) 29%, rgb(158, 132, 255) 51%, rgb(110, 71, 255) 80%, rgb(21, 0, 121) 100%)",
                  }}
                >
                  this easy.
                </span>
              </h3>
            </div>

            <div className="lg:hidden flex flex-col gap-6 items-center">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <HowItWorksCard key={step.number} {...step} />
              ))}
            </div>

            <div className="hidden lg:flex relative overflow-hidden rounded-3xl bg-hero p-8 min-h-[560px] h-[640px] shadow-xl">
              {HOW_IT_WORKS_STEPS.map((step, i) => {
                const motion = getHowItWorksCardMotion(needle, i);

                return (
                  <div
                    key={step.number}
                    className="absolute right-20 top-20 will-change-transform"
                    style={{
                      opacity: motion.opacity,
                      transform: motion.transform,
                      zIndex: motion.zIndex,
                      pointerEvents: motion.pointerEvents,
                    }}
                  >
                    <HowItWorksCard {...step} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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
          body="Viktor clones your repo, writes the fix on a feature branch, opens a PR with context, and assigns reviewers. Real commits. Real review."
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
                <div className="text-[10px] text-slate-500">PR #1284 · opened by Viktor</div>
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
          title="Viktor uses the web like you do."
          body="No API? No problem. Viktor logs in, clicks through, scrapes the dashboard, and pulls the data — securely, in its own sandboxed browser."
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
          body="Everyone on your team works with the same Viktor. Shared memory, shared integrations, shared context — but private threads when you need them."
          bullets={[
            "Public + private DMs in Slack and Teams",
            "Role-based access for integrations",
            "Audit log of every action Viktor takes",
          ]}
          visual={
            <div className="bg-background rounded-2xl p-5 w-full max-w-sm shadow-2xl text-foreground space-y-3">
              <div className="text-xs text-muted-foreground"># product-launch</div>
              {[
                ["Anna", "Viktor draft the launch email"],
                ["Viktor", "Sent to Lisa for review ✓", true],
                ["Lisa", "Approved. Push to Mailchimp."],
                ["Viktor", "Scheduled for 9am tomorrow ✓", true],
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
            Viktor is built for teams who can't trade speed for security. Every plan ships with the controls auditors ask for.
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

export function AskAI() {
  const options = [
    { name: "Ask ChatGPT", icon: "💬" },
    { name: "Ask Perplexity", icon: "🔎" },
    { name: "Ask Claude", icon: "✳️" },
  ];
  return (
    <section className="px-6 pt-32 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[40px] bg-ask-card px-6 py-16 text-center">
        <span className="pointer-events-none absolute inset-x-0 top-[90%] -translate-y-1/2 text-center font-display text-[26vw] leading-none text-white/5 select-none">            VIKTOR
          </span>
          <div className="relative">
            <p className="text-white/70 text-sm">Don't take our word for it</p>
            <h2 className="font-display text-white text-4xl md:text-5xl mt-4">Ask AI about Viktor</h2>
            <p className="mt-8 mx-auto max-w-md text-white/80 leading-relaxed">
              Pick your favorite AI and ask what it thinks about Viktor. No filter, no spin.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {options.map((o) => (
                <button
                  key={o.name}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-md font-medium text-foreground shadow-lg hover:bg-white/95 transition"
                >
                  <span>{o.icon}</span> {o.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "What is Viktor, exactly?", a: "Viktor is an AI employee that lives in Slack. It has its own computer in the cloud where it writes and runs code to complete tasks. It's not a chatbot — it's a colleague that does real work." },
  { q: "How is Viktor different from ChatGPT or other AI assistants?", a: "ChatGPT tells you how to do work. Viktor does it. It connects to your tools, takes action, and ships finished artifacts: PDFs, dashboards, code, campaigns." },
  { q: "What can Viktor actually do?", a: "Pull reports, build dashboards, write code, run ad audits, draft outreach, triage bugs, build internal tools, automate recurring work, and more — anything you'd ask a smart generalist hire." },
  { q: "What tools does Viktor connect to?", a: "3,000+ integrations including Slack, Teams, Notion, Linear, GitHub, Stripe, HubSpot, Salesforce, Meta Ads, Google Ads, Apollo, Airtable, and almost any tool with an API." },
  { q: "How does pricing work?", a: "Flat monthly subscription per workspace. No per-seat fees, no per-task billing. Start free with $100 in credits." },
  { q: "Is my data secure?", a: "Yes. Viktor is SOC 2 Type II compliant. Your data is encrypted in transit and at rest, and never used to train shared models." },
  { q: "Where does Viktor run?", a: "Viktor runs in an isolated cloud sandbox per workspace. It has its own computer, file system, and browser environment." },
  { q: "Can Viktor write and deploy code?", a: "Yes. Viktor can write code in any major language, open pull requests, review code, and deploy to your existing CI/CD pipeline." },
  { q: "Does Viktor work in Microsoft Teams?", a: "Yes. Viktor works natively in both Slack and Microsoft Teams with full feature parity." },
  { q: "How long does setup take?", a: "Less than 5 minutes. Install Viktor in Slack or Teams, connect a few tools, and start delegating." },
  { q: "Can I control what Viktor has access to?", a: "Yes. Admins can scope Viktor's access per tool, per channel, and per user with granular permissions." },
  { q: "Does Viktor learn from my company?", a: "Yes. Viktor builds a private knowledge base of your processes, preferences, and past work — scoped to your workspace only." },
  { q: "What happens if Viktor makes a mistake?", a: "You can roll back any action, review Viktor's full execution log, and refine instructions. Viktor learns from corrections." },
  { q: "Can I try Viktor for free?", a: "Yes. Every workspace starts with $100 in free credits — no credit card required." },
  { q: "Do you offer enterprise plans?", a: "Yes. Enterprise plans include SSO, audit logs, custom data residency, and a dedicated success manager." },
  { q: "How does Viktor handle confidential data?", a: "All data is encrypted, isolated per workspace, and never shared with third parties or used for model training." },
  { q: "Can Viktor handle scheduled or recurring tasks?", a: "Yes. Schedule any task on a cron — daily reports, weekly audits, monthly invoices — Viktor runs them in the background." },
  { q: "What languages does Viktor speak?", a: "Viktor is fluent in 50+ languages and adapts to your team's tone and vocabulary." },
  { q: "Can multiple teammates use Viktor at once?", a: "Yes. Viktor handles parallel conversations and tasks across your entire workspace simultaneously." },
  { q: "How does Viktor compare to hiring a contractor?", a: "Viktor is available 24/7, doesn't require onboarding for each task, and costs a fraction of a contractor — while shipping comparable quality work." },
  { q: "Can I cancel anytime?", a: "Yes. No long-term contracts. Cancel anytime from your workspace settings." },
  { q: "Do you offer a refund policy?", a: "Yes. 30-day money-back guarantee on all plans, no questions asked." },
  { q: "How do I get support?", a: "Email, in-app chat, and a dedicated Slack channel for Pro and Enterprise customers." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? faqs : faqs.slice(0, 4);
  return (
    <section className="px-20 py-32 ">
      <div className="mx-auto w-full max-w-7xl grid gap-8 lg:grid-cols-[minmax(0,519fr)_minmax(0,630fr)] lg:items-start">
        <h2 className="font-display text-5xl md:text-5xl">FAQ</h2>
        <div>
          <div className="space-y-3">
            {visible.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`overflow-hidden transition-[border-radius] duration-300 ease-out ${
                    isOpen
                      ? "rounded-3xl bg-white"
                      : "rounded-full bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                  >
                    <span
                      className={`font-medium text-lg transition-colors duration-300 ease-out ${
                        isOpen ? "text-[#6e47ff]" : "text-foreground"
                      }`}
                    >
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-violet-600 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`px-7 pb-6 text-md text-[#9693a3] leading-relaxed transition-[opacity,transform] duration-300 ease-out ${
                          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                        }`}
                      >
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex justify-start">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="rounded-full border border-border px-7 py-3.5 text-md font-medium hover:bg-secondary transition"
            >
              {showAll ? "Show Less" : `Show All ${faqs.length} Questions`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StartFree() {
  const points = [
    "3,000+ integrations",
    "Slack and Teams",
    "Reports, dashboards, apps",
    "Code and PR reviews",
    "SOC 2 compliant",
  ];
  return (
    <section className="px-6 pb-20 pt-16 ">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[40px] bg-hero px-8 py-16 md:px-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-display text-white text-3xl leading-[1.05]">
                  Start free.<br />Pay only whenyou're ready.
                </h2>
                <p className="mt-6 text-white max-w-md leading-relaxed">
                  Every feature. Every integration. $100 in credits on the house.
                  No credit card, no sales call, no catch. When you need more,
                  it starts $20/month.
                </p>
              </div>
              <div className="mt-10 md:mt-0 flex flex-wrap gap-4">
                <button className="rounded-full bg-white px-7 py-3.5 text-md font-medium text-foreground hover:bg-white/95 transition">
                  Get Started for Free
                </button>
                <button className="rounded-full border border-white/50 px-7 py-3.5 text-md font-medium text-white hover:bg-white/10 transition">
                  See all plans
                </button>
              </div>
            </div>
            <ul className="divide-y divide-white/15 md:pl-10">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3.5 py-8 text-lg text-white first:pt-0 last:pb-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-6 shrink-0 opacity-50">
                    <g opacity="0.3">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.28571 1.42859C6.41139 1.42859 4.06494 2.2392 2.43779 3.86637C0.810617 5.49353 0 7.83997 0 10.7143C0 13.5886 0.810617 15.935 2.43779 17.5623C4.06494 19.1894 6.41139 20 9.28571 20C12.16 20 14.5064 19.1894 16.1337 17.5623C17.7609 15.935 18.5714 13.5886 18.5714 10.7143C18.5714 7.83997 17.7609 5.49353 16.1337 3.86637C14.5064 2.2392 12.16 1.42859 9.28571 1.42859Z"
                        fill="white"
                        style={{ mixBlendMode: 'plus-lighter' }}
                      />
                    </g>
                    <g opacity="0.5">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.7411 0.373119C20.1268 0.821897 20.0756 1.49836 19.6268 1.88403C17.4778 3.73086 15.9752 5.29501 14.7262 7.1419C13.4735 8.99426 12.4446 11.1774 11.2978 14.2981C11.1725 14.6391 10.8829 14.8934 10.5285 14.9736C10.1741 15.0537 9.80329 14.9489 9.5434 14.695L4.60833 9.87354C4.18507 9.46003 4.17717 8.78169 4.59069 8.35843C5.0042 7.93516 5.68254 7.92726 6.10581 8.34077L9.87209 12.0203C10.8381 9.57747 11.7939 7.65267 12.9511 5.94149C14.3446 3.88079 15.9991 2.17626 18.2302 0.258861C18.6789 -0.126815 19.3554 -0.0756606 19.7411 0.373119Z"
                        fill="white"
                        style={{ mixBlendMode: 'plus-lighter' }}
                      />
                    </g>
                  </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

