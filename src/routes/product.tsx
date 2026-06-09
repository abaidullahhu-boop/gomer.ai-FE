import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, MessageSquare, Zap, Shield, Workflow, Brain, GitBranch, Layers,
  CheckCircle2, ArrowRight, Plug, Eye, Lock, KeyRound,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product — Viktor, an AI coworker for your entire team" },
      { name: "description", content: "Viktor is an AI coworker that plugs into your tools, talks in Slack, and ships real deliverables — built for teams, secure by default." },
      { property: "og:title", content: "Product — Viktor" },
      { property: "og:description", content: "An AI coworker for your entire team." },
    ],
    links: [{ rel: "canonical", href: "/product" }],
  }),
  component: ProductPage,
});

/* ============================================================
   Design tokens used inline (mapped from prompt):
   --beige:  #faf5f1
   --orange: #ff9b6b  (primitive-orange-500)
   --purple-300: #b9a7ff
   --purple-500: #8267ff
   --dblue: #1a1342  (primitive-main-dblue)
============================================================ */

const HERO_BG =
  "radial-gradient(70% 44% at 52% 9rem, #ffbd9eb8 0%, #fdbca0a8 6%, #c99ed06b 29%, #947fff2e 51%, #faf5f100 92%), linear-gradient(90deg, #faf5f1, #faf5f1)";

const CARD_GRADIENT =
  "radial-gradient(145.58% 104.75% at 52.06% -4.35%, #ff9b6b 0%, #ff9b6b 6.43%, #b9a7ff 50.71%, #8267ff 80.36%, #1a1342 100%)";

const CTA_GRADIENT =
  "radial-gradient(60% 80% at 20% 20%, #ffb08a55 0%, transparent 60%), radial-gradient(80% 90% at 80% 50%, #8267ff 0%, #4b2dbe 45%, #1a1342 100%)";

function ProductPage() {
  return (
    <div className="min-h-screen" style={{ background: "#faf5f1" }}>
      <Hero />
      <SectionWhatViktorIs />
      <SectionWhatCanDo />
      <SectionBuiltForTeams />
      <SectionHowDifferent />
      <SectionSecurity />
      <SectionStartFree />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-[7rem]" style={{ background: HERO_BG }}>
      <Nav />
      <div className="relative mx-auto max-w-4xl px-6 pt-16 text-center">
        <div className="mx-auto mb-6 w-12 h-12 rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center shadow-sm">
          <Sparkles className="w-5 h-5 text-violet-600" />
        </div>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-foreground">
          Viktor is an AI coworker<br />
          <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
            for your entire team.
          </span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground text-[15px] leading-relaxed">
          One coworker who plugs into your stack, talks in Slack, and ships real deliverables.
          From briefs to backfills, Viktor operates end-to-end with humans in the loop.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <GetStartedButton variant="dark" />
          <button className="px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-white/60 text-foreground text-sm font-semibold hover:bg-white transition">
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 2: WHAT VIKTOR IS ---------------- */
function SectionWhatViktorIs() {
  return (
    <section id="what-viktor-is" className="py-10 sm:py-12" style={{ background: "#faf5f1" }}>
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-10 sm:p-14 text-white"
            style={{ background: CARD_GRADIENT }}
          >
            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-6 border border-white/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-3xl sm:text-5xl leading-[1.05]">What Viktor is</h2>
              <p className="mt-4 max-w-2xl mx-auto text-white/85 text-sm leading-relaxed">
                An AI coworker — not a chatbot, not a copilot. Viktor connects to your tools,
                reasons across them, and ships real work back to your team.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-3 max-w-3xl mx-auto">
              {["Slack", "Linear", "Notion", "GitHub", "HubSpot", "Figma"].map((t) => (
                <div key={t} className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-3 py-3 text-center text-[12px] font-semibold text-white/90">
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {[
                { t: "Real deliverables", d: "Briefs, decks, tickets, backfills — Viktor finishes the work, not just the prompt." },
                { t: "3,000+ integrations", d: "Connects to the tools you already use via OAuth and scoped tokens." },
                { t: "Auto-aligned", d: "Pulls context from your docs and chats so every task lands on-brand." },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-5">
                  <div className="text-[14px] font-semibold text-white">{c.t}</div>
                  <p className="mt-1.5 text-[12.5px] text-white/80 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 3: WHAT VIKTOR CAN DO (cards grid) ---------------- */
const capabilityCards = [
  { icon: MessageSquare, tag: "Chat", title: "Talks in Slack", desc: "Mention Viktor like a coworker. Threaded, async, and aware of your channels." },
  { icon: Workflow, tag: "Operate", title: "Runs workflows", desc: "Multi-step actions across tools with approvals for sensitive operations." },
  { icon: Brain, tag: "Reason", title: "Remembers context", desc: "Builds a per-workspace memory so it sounds like it works there." },
  { icon: GitBranch, tag: "Ship", title: "Files tickets, PRs, docs", desc: "Real artifacts — Linear tickets, PRs, briefs, decks — not just answers." },
  { icon: Zap, tag: "Fast", title: "Latency that feels live", desc: "Streams results into Slack as they're produced." },
  { icon: Layers, tag: "Scale", title: "Works across teams", desc: "Marketing, ops, eng, finance — same coworker, different skills." },
];

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] p-8 lg:w-[25.8125rem]"
      style={{ background: CARD_GRADIENT }}
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity pointer-events-none" />
      <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter pointer-events-none" />
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.6), inset 0 0 60px 0 rgba(255,255,255,0.15), 0 30px 60px -20px rgba(40,20,80,0.35)",
        }}
      />
      <div className="relative z-10 text-white">{children}</div>
    </div>
  );
}

function LightCard({ children }: { children: React.ReactNode }) {
  return (
    <article
      className="relative overflow-hidden rounded-[2rem] p-8 lg:w-[25.8125rem] bg-white"
      style={{
        boxShadow:
          "inset 2.7px 2.7px 1.35px -2.7px #fff, inset -2.7px -2.7px 1.35px -2.7px #fff, inset 0 0 8.1px rgba(255,255,255,0.5), inset 0 0 43.2px #f2f2f2, 0 1px 2px rgba(20,10,60,0.04), 0 20px 40px -20px rgba(20,10,60,0.08)",
      }}
    >
      <div className="relative z-10">{children}</div>
    </article>
  );
}

function SectionWhatCanDo() {
  return (
    <section id="what-viktor-can-do" className="py-10 sm:py-12" style={{ background: "#faf5f1" }}>
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-10 lg:gap-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Capabilities</p>
            <h2 className="font-display text-3xl sm:text-5xl mt-3 leading-[1.05]">What Viktor can do</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-sm">
              A single coworker that chats, operates, remembers, and ships — without you stitching a stack of bots together.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {capabilityCards.map((c) => (
              <LightCard key={c.title}>
                <div className="flex flex-col gap-8">
                  <div className="flex items-start justify-between gap-3">
                    <span className="size-8 shrink-0 rounded-lg bg-gradient-to-b from-[#ffb89a] via-[#b9a7ff] to-[#5c28d7] flex items-center justify-center">
                      <c.icon className="w-4 h-4 text-white" />
                    </span>
                    <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-[#5c28d7]/15 px-5 text-[13px] font-medium text-[#5c28d7]">
                      {c.tag}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[17px] font-semibold text-foreground leading-snug">{c.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </LightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 4: SPLIT DARK CARD ---------------- */
function SectionBuiltForTeams() {
  return (
    <section id="built-for-teams" className="py-10 sm:py-12" style={{ background: "#faf5f1" }}>
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="dark relative overflow-hidden rounded-[2.5rem] grid lg:grid-cols-[minmax(0,29.625rem)_minmax(0,45.375rem)] gap-10 p-10 sm:p-14 text-white"
            style={{ background: CARD_GRADIENT }}
          >
            <div className="flex flex-col gap-6 justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-200">For teams</p>
              <h2 className="font-display text-4xl sm:text-5xl leading-[1.05]">
                Built for teams<br />of every shape.
              </h2>
              <p className="text-white/85 text-sm leading-relaxed max-w-md">
                Marketing campaigns, ops backfills, eng triage, finance forecasts — Viktor adapts
                to each team's rituals, tools, and tone.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="px-5 py-2.5 rounded-full bg-white text-foreground text-sm font-semibold">Start free</button>
                <button className="px-5 py-2.5 rounded-full bg-white/15 border border-white/20 text-white text-sm font-semibold">See use cases</button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { t: "Marketing", d: "Audit ad accounts and ship ranked recommendations." },
                  { t: "Ops & Finance", d: "Forecast cash flow and draft month-end summaries." },
                  { t: "Engineering", d: "Triage overnight alerts and open Linear tickets." },
                  { t: "Sales", d: "Brief reps before calls with the full context." },
                ].map((c) => (
                  <div key={c.t} className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-5">
                    <div className="text-[13px] font-semibold text-white">{c.t}</div>
                    <p className="mt-1.5 text-[12px] text-white/75 leading-relaxed">{c.d}</p>
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

/* ---------------- SECTION 5: HOW DIFFERENT (reuses card design) ---------------- */
const diffCards = [
  { tag: "Not a chatbot", title: "Operates, not answers", desc: "Viktor doesn't stop at a reply. It opens the ticket, files the PR, and updates the doc." },
  { tag: "Not a copilot", title: "Works without you", desc: "Async, in the background, with approvals only when it matters." },
  { tag: "Not a workflow tool", title: "No flows to wire up", desc: "Tell Viktor what you want. It figures out the steps and tools itself." },
];

function SectionHowDifferent() {
  return (
    <section id="how-different" className="py-10 sm:py-12 bg-primary text-primary-foreground">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-10 lg:gap-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-300">The difference</p>
            <h2 className="font-display text-3xl sm:text-5xl mt-3 leading-[1.05]">How Viktor is different</h2>
            <p className="mt-4 max-w-xl mx-auto text-primary-foreground/70 text-sm">
              Most AI tools answer. Viktor finishes. Same Slack thread, real artifacts on the other side.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {diffCards.map((c) => (
              <GlassCard key={c.title}>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/80">{c.tag}</span>
                <h3 className="mt-4 font-display text-2xl leading-tight">{c.title}</h3>
                <p className="mt-2.5 text-[13.5px] text-white/85 leading-relaxed">{c.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 6: CTA HIGHLIGHT ---------------- */
function SectionSecurity() {
  return (
    <section id="security" className="py-1 sm:py-[7rem] bg-primary text-primary-foreground">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 text-center text-white"
            style={{ background: CTA_GRADIENT, minHeight: "29.5rem" }}
          >
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center justify-center h-full gap-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-200">Security</p>
              <h2 className="font-display text-3xl sm:text-5xl leading-[1.05]">
                Built for businesses that<br />take security seriously.
              </h2>
              <p className="text-white/85 text-sm leading-relaxed max-w-lg">
                SOC 2 attested, GDPR aligned, SAML SSO and SCIM on Enterprise. Your data never trains a model.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl pt-2">
                {[
                  { i: Shield, t: "SOC 2" },
                  { i: Lock, t: "GDPR" },
                  { i: KeyRound, t: "SAML SSO" },
                  { i: Eye, t: "Audit logs" },
                ].map((b) => (
                  <div key={b.t} className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-3 py-3 flex items-center gap-2 justify-center">
                    <b.i className="w-4 h-4 text-white" />
                    <span className="text-[12.5px] font-semibold text-white">{b.t}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 px-6 py-3 rounded-full bg-white text-foreground text-sm font-semibold">
                Read the security model
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 7: START FREE / ADVANCED CARDS ---------------- */
const startFeatures = [
  "All integrations",
  "Users and teams",
  "Approvals, customizable scopes",
  "Costs and PII reviews",
  "SOC 2 compliance",
];

function SectionStartFree() {
  return (
    <section className="py-1 sm:py-[7rem] bg-primary text-primary-foreground">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="relative overflow-hidden rounded-2xl grid lg:grid-cols-2 gap-10 p-10 sm:p-14 -mx-4 sm:mx-0"
            style={{ background: CTA_GRADIENT }}
          >
            <div className="text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-200">Start free</p>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl leading-[1.05]">
                Pay only when<br />you're ready.
              </h2>
              <p className="mt-5 text-white/85 text-sm leading-relaxed max-w-md">
                Every Viktor Team integration is $30 / month per seat. Unlimited tasks. Bring
                your team when it makes sense.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GetStartedButton size="sm" className="px-5 py-3" />
                <Link to="/pricing" className="px-5 py-3 rounded-full bg-white/15 text-white text-sm font-semibold border border-white/20">See all plans</Link>
              </div>
            </div>
            <div className="space-y-3 text-white">
              {startFeatures.map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-4 py-3 text-[14px]">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </span>
                  {f}
                </div>
              ))}
              <div className="flex items-center gap-2 pt-3 text-white/80 text-[12.5px]">
                <Plug className="w-3.5 h-3.5" /> Connect tools via OAuth in seconds.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}