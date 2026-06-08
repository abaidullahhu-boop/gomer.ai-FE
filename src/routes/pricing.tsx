import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FAQ, StartFree } from "@/components/site/HomeSections";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Viktor" },
      { name: "description", content: "We'll front you $100. Put Viktor to work. Start free with $100 in credits — no credit card, no strings. Upgrade when you're ready." },
      { property: "og:title", content: "Pricing — Viktor" },
      { property: "og:description", content: "Start free with $100 in credits. Credits power everything Viktor does. No markup on model costs." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen">
      <PricingHero />
      <CreditsPower />
      <HowCreditsWork />
      <FAQ />
      <StartFree />
      <Footer />
    </div>
  );
}

/* ---------------- HERO + PLAN CARDS ---------------- */

const teamFeatures = [
  "Exclusive agent in threads + mentions",
  "Persistent workspace context",
  "Integrations + tool execution",
  "Scheduled tasks & cron (reports, audits, proactive check-ins)",
  "Drafts + artifacts (updates, tables/docs where supported)",
];

const enterpriseFeatures = [
  "Invoicing + custom billing terms",
  "Security review support + DPA",
  "SLA + priority support",
  "Dedicated onboarding + tailored limits/controls",
];

function HeroBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-white/85 text-sm">
      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">{icon}</span>
      {text}
    </div>
  );
}

function PricingHero() {
  return (
    <section className="relative bg-hero pt-6 pb-40 overflow-hidden rounded-b-[40px]">
      <Nav />
      <div className="relative mx-auto max-w-5xl px-6 pt-20 text-center">
        <h1 className="font-display text-white text-5xl md:text-7xl leading-[1.02] tracking-tight">
          We'll front you <span className="text-[oklch(0.82_0.16_70)]">$100.</span><br />
          Put Viktor to work.
        </h1>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <HeroBadge icon="💰" text="Start free with $100 in credits" />
          <HeroBadge icon="🪪" text="No credit card, no strings" />
          <HeroBadge icon="⚡" text="Upgrade when you're ready" />
        </div>

        <div className="mt-10">
          <button className="px-8 py-4 rounded-full bg-white text-foreground font-semibold text-sm shadow-xl hover:bg-white/95 transition">
            Get Started for Free
          </button>
        </div>
      </div>

      {/* PLAN CARDS overlapping hero */}
      <div id="plans" className="relative mx-auto max-w-5xl px-6 mt-16 scroll-mt-28">
        <div className="grid md:grid-cols-2 gap-5">
          <TeamCard />
          <EnterpriseCard />
        </div>
      </div>
    </section>
  );
}

function TeamCard() {
  const [credits, setCredits] = useState("20,000 credits monthly");
  return (
    <div className="rounded-[28px] bg-card p-8 text-foreground shadow-2xl">
      <div className="text-xs font-semibold uppercase tracking-wide text-violet-600">Team</div>
      <div className="mt-3 flex items-end gap-1">
        <span className="font-display text-5xl">$50</span>
        <span className="text-muted-foreground text-sm mb-1.5">/ month</span>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">Shared workspace credits</div>

      <div className="relative mt-3">
        <select
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium pr-10 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option>20,000 credits monthly</option>
          <option>40,000 credits monthly</option>
          <option>80,000 credits monthly</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>

      <button className="mt-5 w-full rounded-full bg-foreground text-background py-3.5 text-sm font-semibold hover:bg-foreground/90 transition">
        Get Started for Free
      </button>

      <ul className="mt-7 space-y-3.5">
        {teamFeatures.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-foreground/90">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EnterpriseCard() {
  return (
    <div className="rounded-[28px] p-8 text-white shadow-2xl bg-ask-card">
      <div className="text-xs font-semibold uppercase tracking-wide text-white/70">Enterprise</div>
      <div className="mt-3 font-display text-5xl">Custom</div>
      <div className="mt-4 text-sm text-white/75">Flexible pricing</div>

      <button className="mt-3 w-full rounded-full bg-white text-foreground py-3.5 text-sm font-semibold hover:bg-white/95 transition">
        Contact sales
      </button>

      <div className="mt-7 text-sm font-medium text-white/85">Everything in Team, plus</div>
      <ul className="mt-4 space-y-3.5">
        {enterpriseFeatures.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/90">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-white/25 text-white flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- CREDITS POWER EVERYTHING ---------------- */

function ChatLine({ name, badge, time, body }: { name: string; badge?: string; time: string; body: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-300 to-violet-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="font-semibold text-foreground">{name}</span>
          {badge && <span className="px-1.5 py-0.5 rounded text-[9px] bg-violet-100 text-violet-700 font-semibold">{badge}</span>}
          <span className="text-muted-foreground">{time}</span>
        </div>
        <div className="text-[12px] text-foreground/85 mt-0.5 leading-snug">{body}</div>
      </div>
    </div>
  );
}

function CreditCard({ tag, credits, sub, children, className = "" }: { tag: string; credits: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-3xl p-[1.5px] overflow-hidden ${className}`}
      style={{
        background:
          "conic-gradient(from -60deg at 62% 64%, #ffbd9e99 0%, #ffbd9e99 15%, #d2c6ff99 35%, #6748fd99 45%, #fde3aa99 80%, #ffbd9e99 100%)",
      }}
    >
      <div
        className="absolute inset-[1.5px] rounded-[calc(1.5rem-1.5px)]"
        style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      />
      <div
        className="relative rounded-[calc(1.5rem-1.5px)] p-6"
        style={{
          background:
            "radial-gradient(100% 100% at 0% 0%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
        }}
      >
        <div className="text-[11px] font-semibold text-violet-600">{tag}</div>
        <div className="mt-1 font-display text-2xl text-foreground">{credits}</div>
        {sub && <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function CreditsPower() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-4xl md:text-5xl text-center leading-tight">
          Credits power everything<br />
          Viktor does: <span className="inline-flex items-center gap-2">🌑 Organization</span>
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <CreditCard tag="Quick Tasks" credits="100–300 credits" sub="Quick summary + DM follow-up">
            <div className="rounded-2xl bg-card/80 border border-border p-4 space-y-3">
              <ChatLine name="Sarah" time="1:15 AM" body={<><span className="text-violet-600">@Viktor</span> summarize yesterday's #sales thread and flag anything I need to follow up on</>} />
              <ChatLine name="Viktor" badge="APP" time="1:16 AM" body="3 deals discussed. Two on track — Acme closes Friday. Bloom signed. One needs you: DataSync went silent after the demo. I drafted a follow-up in HubSpot, want me to send it?" />
            </div>
          </CreditCard>

          <CreditCard tag="Complex Workflows" credits="500–1,500 credits" sub="Multi-step research + analysis">
            <div className="rounded-2xl bg-card/80 border border-border p-4 space-y-3">
              <ChatLine name="Mike" time="11:30 AM" body={<><span className="text-violet-600">@Viktor</span> the pricing page still says $50/mo. Can the slider fix it, should be $79/mo. Can you update it?</>} />
              <ChatLine name="Viktor" badge="APP" time="11:46 AM" body="Done ✅ Updated the pricing page — $79/mo for new. Preview is ready for your review." />
            </div>
          </CreditCard>

          <div className="md:col-span-2">
            <CreditCard tag="Full Projects" credits="2,000–5,000 credits" sub="Deep research + deliverables">
              <div className="grid md:grid-cols-2 gap-5 items-stretch">
                <div className="flex items-end justify-center min-h-[180px]">
                  <div className="rounded-xl bg-card border border-border p-3 shadow-sm w-48">
                    <div className="text-[10px] font-semibold">Executive Summary</div>
                    <div className="mt-1 h-1.5 bg-muted rounded w-full" />
                    <div className="mt-1 h-1.5 bg-muted rounded w-3/4" />
                    <div className="mt-3 grid grid-cols-3 gap-1">
                      {["1Y", "Close", "Forecast"].map((c) => (
                        <div key={c} className="text-[8px] text-center bg-muted rounded py-0.5">{c}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-card/80 border border-border p-4 space-y-3">
                  <ChatLine name="Lisa" time="11:54 AM" body={<><span className="text-violet-600">@Viktor</span> we need a competitive analysis — us vs Notion AI, Glean, and Mavenoid. Pricing, features, positioning. Make it a PDF I can drop in the board deck.</>} />
                  <ChatLine name="Viktor" badge="APP" time="1:31 PM" body="Done. 12-page PDF with feature matrix, pricing comparison, and positioning map. Here's the executive summary." />
                </div>
              </div>
            </CreditCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW CREDITS WORK ---------------- */

const howItems = [
  { icon: "🧩", title: "No markup on model costs", body: "Every credit maps to what Anthropic, OpenAI, and others actually charge. No platform fee layered on top. You'd pay the same going direct." },
  { icon: "📊", title: "Smart caching cuts your bill", body: "Viktor caches context and reuses results across tasks. Repeated workflows cost fewer credits than calling the models from scratch every time." },
  { icon: "⚙️", title: "Automations scale with frequency", body: "Scheduled automations (crons) run on credits too. Frequency matters — daily check-ins cost less than hourly ones." },
];

function HowCreditsWork() {
  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl">How credits work</h2>
        <p className="mt-3 text-muted-foreground text-sm max-w-md">
          Credits are model costs, passed through. Smart caching brings them down.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-5 items-stretch">
          {howItems.map((it) => (
            <div
              key={it.title}
              className="rounded-3xl bg-card border border-border p-7"
              style={{
                boxShadow:
                  "rgb(255,255,255) 2.702px 2.702px 1.351px -2.702px inset, rgb(255,255,255) -2.702px -2.702px 1.351px -2.702px inset, rgba(255,255,255,0.5) 0px 0px 8.106px 0px inset, rgb(242,242,242) 0px 0px 43.232px 0px inset",
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-lg">{it.icon}</div>
              <div className="mt-4 font-semibold">{it.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
            </div>
          ))}

          <div
            className="rounded-3xl p-8 flex flex-col justify-between min-h-[300px]"
            style={{
              background:
                "conic-gradient(from -60deg at 62% 64%, #ffbd9e99 0%, #ffbd9e99 15%, #d2c6ff99 35%, #6748fd99 45%, #fde3aa99 80%, #ffbd9e99 100%), linear-gradient(0deg, #fff3 0%, #fff3 100%), #3333",
            }}
          >
            <p className="text-foreground font-display text-2xl leading-snug">
              Your whole team gets an analyst, an ops lead, and an engineer. For the price of lunch.
            </p>
            <button className="mt-6 w-full rounded-full bg-foreground text-background px-6 py-4 text-sm font-semibold hover:bg-foreground/90 transition">
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
