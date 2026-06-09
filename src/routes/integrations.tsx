import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import {
  Search, Check, ShieldCheck, Lock, Eye, KeyRound, ChevronDown,
} from "lucide-react";

const orbitTools = ["Slack", "Notion", "GitHub", "HubSpot", "Stripe", "Linear", "Figma", "Jira", "Asana", "Drive", "Gmail", "Meta"];

const directoryTabs = ["All Integrations", "Featured", "Cloud Storage", "Communication", "Customer Support", "Developer Tools", "Marketing", "Productivity", "Sales & CRM", "Social Media", "Other"];

const directoryItems: { name: string; cat: string }[] = [
  { name: "Google Drive", cat: "Storage" },
  { name: "Notion", cat: "Productivity" },
  { name: "Linear", cat: "Dev" },
  { name: "Slack", cat: "Comms" },
  { name: "Dropbox", cat: "Storage" },
  { name: "Airtable", cat: "Database" },
  { name: "Asana", cat: "Productivity" },
  { name: "Google Sites", cat: "Web" },
  { name: "Calendly", cat: "Scheduling" },
  { name: "Jira Cloud", cat: "Dev" },
  { name: "Salesforce", cat: "CRM" },
  { name: "Zoom", cat: "Comms" },
  { name: "PayPal", cat: "Payments" },
  { name: "Outlook", cat: "Email" },
  { name: "HubSpot", cat: "CRM" },
  { name: "Intercom", cat: "Support" },
  { name: "Webflow", cat: "Web" },
  { name: "Zendesk", cat: "Support" },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Integrations — Viktor"
        description="Viktor connects to 3,000+ tools and uses them like you do. One AI employee for your entire tool stack."
        ogTitle="Integrations — Viktor"
        ogDescription="One AI employee. Your entire tool stack."
      />
      {/* HERO */}
      <section className="relative bg-hero pt-6 pb-32 overflow-hidden rounded-b-[40px]">
        <Nav />
        <div className="relative mx-auto max-w-5xl px-6 pt-20 text-center">
          <h1 className="font-display text-white text-5xl md:text-7xl leading-[1.02] tracking-tight font-extrabold">
            One AI employee.<br />Your entire tool stack.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-white/90 text-base md:text-lg leading-relaxed">
            Viktor connects to 3,000+ tools and uses them from the way you do.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <GetStartedButton variant="dark" shadow className="px-7 py-3.5" />
            <button className="px-7 py-3.5 rounded-full text-white/95 text-sm font-semibold hover:bg-white/10 transition">
              See it in action →
            </button>
          </div>

          {/* Orbiting tools + V logo */}
          <div className="mt-16 relative h-56 flex items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center gap-6 flex-wrap">
              {orbitTools.map((t, i) => (
                <div
                  key={t}
                  className="w-11 h-11 rounded-xl bg-white/90 shadow-lg flex items-center justify-center text-[10px] font-bold text-foreground"
                  style={{ opacity: 0.35 + 0.65 * (1 - Math.abs(i - orbitTools.length / 2) / orbitTools.length) }}
                >
                  {t.slice(0, 2)}
                </div>
              ))}
            </div>
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 shadow-2xl flex items-center justify-center font-display text-white text-4xl font-extrabold">
              V
            </div>
          </div>
        </div>
      </section>

      {/* THREE STEP CARDS */}
      <section className="px-6 -mt-20 relative z-10">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-5">
          <StepCard
            number="1"
            title="Connect your stack"
            body="Securely connect to 3,000+ tools across cloud storage, comms, CRMs, and dev workflows."
            visual={<GridIconsVisual />}
          />
          <StepCard
            number="2"
            title="Tell Viktor what you need"
            body="Just chat in Slack, Teams, or the app. No prompt engineering, no setup."
            visual={<ChatVisual />}
          />
          <StepCard
            number="3"
            title="Viktor operates, you review"
            body="Viktor pulls data, runs the workflow, and ships output. You approve or course-correct."
            visual={<ReviewVisual />}
          />
        </div>
      </section>

      {/* IF IT EXISTS */}
      <section className="px-6 py-24 mt-12">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            If it exists, Viktor connects to it.<br />If it doesn't, Viktor builds it.
          </h2>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-secondary p-1.5">
            {["Connectors", "Integrations", "Build a tool"].map((t, i) => (
              <button
                key={t}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  i === 0 ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-[32px] p-10 md:p-14 text-left relative overflow-hidden shadow-2xl"
            style={{ background: "linear-gradient(135deg, oklch(0.78 0.16 35) 0%, oklch(0.65 0.22 320) 45%, oklch(0.45 0.22 285) 100%)" }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white/95 text-xs font-semibold">
                  Managed
                </div>
                <h3 className="mt-4 font-display text-white text-4xl md:text-5xl font-extrabold leading-tight">
                  3,000+ via Managed<br />Connectors
                </h3>
                <p className="mt-4 text-white/85 leading-relaxed max-w-md">
                  Viktor maintains direct connections to the tools your team uses, so workflows keep running even when APIs change.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-white/90 shadow-lg flex items-center justify-center text-[11px] font-bold text-foreground">
                    {orbitTools[i % orbitTools.length].slice(0, 2)}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-10 text-white/80 text-sm text-center max-w-3xl mx-auto">
              Don't see what you need? Viktor can build a custom connector for any tool with an API — usually within a day.
            </p>
          </div>
        </div>
      </section>

      {/* SEE IT IN ACTION */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[32px] p-10 md:p-14 shadow-2xl"
          style={{ background: "linear-gradient(135deg, oklch(0.42 0.20 285) 0%, oklch(0.32 0.20 285) 100%)" }}
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">Live Workflow</div>
              <h3 className="mt-3 font-display text-white text-4xl md:text-5xl font-extrabold">See It In Action</h3>
              <ul className="mt-8 space-y-3">
                {["Connect data sources", "Build a workflow", "Get instant results"].map((t) => (
                  <li key={t} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-white">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm font-medium">{t}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 px-6 py-3 rounded-full bg-white text-foreground text-sm font-semibold hover:bg-white/95">
                See It in Action →
              </button>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="text-xs text-muted-foreground">Monday morning</div>
              <p className="mt-1 text-foreground font-semibold leading-snug">
                Viktor pulls Meta Ads and Google Ads, runs cross-vendor, and ships them as a PDF.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { t: "Spend snapshot", d: "Across channels" },
                  { t: "Performance", d: "vs last week" },
                  { t: "Top creatives", d: "By CTR" },
                  { t: "Recommendations", d: "Auto-generated" },
                ].map((b) => (
                  <div key={b.t} className="rounded-xl bg-secondary p-3">
                    <div className="text-[12px] font-semibold text-foreground">{b.t}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{b.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MULTIPLE ACCOUNTS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-[28px] p-8 shadow-xl"
            style={{ background: "linear-gradient(135deg, oklch(0.78 0.14 320) 0%, oklch(0.58 0.20 285) 100%)" }}
          >
            <div className="text-white/85 text-xs font-semibold uppercase tracking-wider mb-4">Your accounts</div>
            <div className="grid grid-cols-2 gap-3">
              {["HubSpot — Acme", "HubSpot — Globex", "Stripe — Live", "Stripe — Test", "GA4 — Site A", "GA4 — Site B", "Slack — Eng", "Slack — Sales"].map((t) => (
                <div key={t} className="rounded-xl bg-white/15 backdrop-blur border border-white/20 px-3 py-2.5 text-[12px] text-white font-medium flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-white/30" />
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Multiple accounts?<br />Connect them all.
            </h3>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              Agencies, multi-brand teams, and consultants can link every workspace, environment, and account. Viktor keeps them organized and never mixes data.
            </p>
          </div>
        </div>
      </section>

      {/* INTEGRATION DIRECTORY */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl md:text-5xl font-extrabold tracking-tight">Integration Directory</h2>

          <div className="mt-10 rounded-2xl border border-border bg-card shadow-sm p-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground ml-2" />
            <input
              type="text"
              placeholder="Search 3,000+ integrations..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {directoryTabs.map((t, i) => (
              <button
                key={t}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition ${
                  i === 0
                    ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-3 text-xs font-semibold text-muted-foreground">Top Picks</div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {directoryItems.map((it) => (
              <div key={it.name} className="rounded-2xl bg-card border border-border p-4 flex items-center gap-3 hover:shadow-md transition">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-200 to-indigo-200 flex items-center justify-center text-[11px] font-bold text-foreground shrink-0">
                  {it.name.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{it.name}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{it.cat}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              Show more <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
            Need something specific? Viktor can build a custom connector for any tool with an API.
          </p>
        </div>
      </section>

      {/* YOUR TOOLS YOUR DATA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Your tools. Your data.<br />
            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">Your control.</span>
          </h2>

          <div className="mt-12 grid md:grid-cols-4 gap-5 text-left">
            {[
              { icon: ShieldCheck, title: "Bank-grade security", body: "End-to-end encryption in transit and at rest. SOC 2 Type II audited." },
              { icon: Lock, title: "SSO & granular access", body: "Workspace-level permissions, scoped tokens, audit trails on every action." },
              { icon: Eye, title: "Approval workflows", body: "Review what Viktor will do before it runs. Step in or step out anytime." },
              { icon: KeyRound, title: "Bring your own keys", body: "Use your own credentials and OAuth. We never store more than necessary." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-card border border-border p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                  <f.icon className="w-5 h-5" />
                </div>
                <div className="mt-4 text-base font-semibold text-foreground">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            {["SOC", "GDPR", "HIPAA", "ISO"].map((b) => (
              <div key={b} className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* START FREE */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[32px] p-10 md:p-14 shadow-2xl"
          style={{ background: "linear-gradient(135deg, oklch(0.45 0.20 285) 0%, oklch(0.72 0.18 330) 100%)" }}
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-white text-4xl md:text-5xl font-extrabold leading-tight">
                Start free.<br />Pay only when you're ready.
              </h3>
              <p className="mt-5 text-white/85 max-w-md leading-relaxed">
                $100 in free credits. No credit card required. Cancel anytime. Real work, real output, from day one.
              </p>
              <div className="mt-8 flex gap-3">
                <GetStartedButton />
                <button className="px-6 py-3 rounded-full text-white text-sm font-semibold hover:bg-white/10">
                  Talk to Sales
                </button>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "$100 in free credits",
                "No credit card required",
                "Cancel anytime, no questions asked",
                "SOC 2 Type II compliant",
                "3,000+ integrations included",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-white/95 text-sm">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StepCard({ number, title, body, visual }: { number: string; title: string; body: string; visual: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-sm">
      <div className="h-56 relative flex items-center justify-center p-6"
        style={{ background: "linear-gradient(135deg, oklch(0.96 0.04 50) 0%, oklch(0.88 0.10 310) 100%)" }}
      >
        {visual}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-600">
          <span className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center">{number}</span>
          Step {number}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function GridIconsVisual() {
  return (
    <div className="grid grid-cols-4 gap-2 w-full max-w-[220px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-lg bg-white/95 shadow-sm flex items-center justify-center text-[9px] font-bold text-foreground">
          {orbitTools[i % orbitTools.length].slice(0, 2)}
        </div>
      ))}
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="w-full max-w-[240px] space-y-2">
      <div className="rounded-xl bg-white/95 shadow-sm p-3 text-[11px]">
        <div className="font-semibold text-foreground">You</div>
        <div className="text-foreground/80">@Viktor pull last week's Meta Ads spend by campaign.</div>
      </div>
      <div className="rounded-xl bg-white/95 shadow-sm p-3 text-[11px]">
        <div className="font-semibold text-violet-600">Viktor</div>
        <div className="text-foreground/80">On it. Sending a chart in 30 seconds…</div>
      </div>
    </div>
  );
}

function ReviewVisual() {
  return (
    <div className="w-full max-w-[240px] rounded-xl bg-white/95 shadow-sm p-4 text-[11px]">
      <div className="font-semibold text-foreground">Weekly Report.pdf</div>
      <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full w-4/5 bg-gradient-to-r from-violet-500 to-indigo-600" />
      </div>
      <div className="mt-3 flex gap-2">
        <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-[10px] font-semibold flex items-center gap-1">
          <Check className="w-3 h-3" /> Approved
        </span>
        <span className="px-2 py-1 rounded-md bg-secondary text-foreground text-[10px] font-semibold">Edit</span>
      </div>
    </div>
  );
}