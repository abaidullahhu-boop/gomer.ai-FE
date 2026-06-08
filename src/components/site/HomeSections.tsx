import { useEffect, useRef, useState, type ReactNode } from "react";
import { Workflow, BarChart3, GitBranch, Globe, Users, ShieldCheck, Check } from "lucide-react";
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
    const lgQuery = window.matchMedia("(min-width: 1024px)");

    function updateScrollProgress() {
      if (!lgQuery.matches) {
        setScrollProgress(0);
        return;
      }

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
    lgQuery.addEventListener("change", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      lgQuery.removeEventListener("change", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const needle = scrollProgress * (HOW_IT_WORKS_STEPS.length - 1);

  return (
    <section className="px-2 md:px-6 py-24 bg-section-cream">
      <div ref={scrollRef} className="mx-auto max-w-6xl max-lg:min-h-0 lg:min-h-[300vh]">
        <div className="lg:sticky lg:top-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="pl-[108px] max-lg:pl-0 max-lg:px-4">
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

            <div className="max-lg:flex lg:hidden flex-col gap-6 w-full px-2 sm:px-0">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="rounded-3xl bg-hero p-6 sm:p-8 shadow-xl flex justify-center"
                >
                  <HowItWorksCard {...step} />
                </div>
              ))}
            </div>

            <div className="max-lg:hidden lg:flex relative overflow-hidden rounded-3xl bg-hero p-8 min-h-[560px] h-[640px] shadow-xl">
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
    { name: "Ask ChatGPT", icon: "💬", link: "https://chatgpt.com" },
    { name: "Ask Perplexity", icon: "🔎", link: "https://perplexity.com" },
    { name: "Ask Claude", icon: "✳️", link: "https://claude.com" },
  ];
  return (
    <section className="smpx-6 pt-2 sm:pt-32 sm:pb-10 bg-section-cream">
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
            <div className="cursor-pointer mt-10 flex flex-wrap justify-center gap-4">
              {options.map((o) => (
                <button
                  key={o.name}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-md font-medium text-foreground shadow-lg hover:bg-white/95 transition"
                  onClick={() => window.open(o.link, "_blank")}
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

