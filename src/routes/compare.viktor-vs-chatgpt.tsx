import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Check, ChevronDown, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { SlackPurpleCard } from "@/components/site/SlackChangelogCards";

export const Route = createFileRoute("/compare/viktor-vs-chatgpt")({
  head: () => ({
    meta: [
      { title: "Viktor vs ChatGPT — The AI That Does the Work" },
      { name: "description", content: "Compare Viktor and ChatGPT side-by-side. Viktor connects to 3,000+ tools and ships real work in Slack — ChatGPT talks about it." },
      { property: "og:title", content: "Viktor vs ChatGPT — The AI That Does the Work" },
      { property: "og:description", content: "How Viktor and ChatGPT stack up on integrations, deployment, pricing, security, and reliability." },
    ],
  }),
  component: ComparePage,
});

type Row = { feature: string; viktor: string; chatgpt: string };
const rows: Row[] = [
  { feature: "About", viktor: "An AI coworker that connects to your stack and ships finished work — reports, dashboards, code, campaigns.", chatgpt: "A general-purpose chat assistant. Great at conversation, summaries, and one-off questions inside its own UI." },
  { feature: "Strengths", viktor: "End-to-end workflows across many tools. Long-running tasks. Memory of how your business operates.", chatgpt: "Quick answers, writing help, brainstorming. Strong language and reasoning for single-shot prompts." },
  { feature: "Engineered for", viktor: "Operators and teams who want output, not transcripts. Built to act inside the tools you already pay for.", chatgpt: "Individuals chatting in a browser tab. Built around an interactive question-and-answer loop." },
  { feature: "Deployment", viktor: "Lives in Slack and Teams. @mention to assign work, get a deliverable back in the same thread.", chatgpt: "Lives in chatgpt.com and the desktop app. You leave your workflow to go talk to it." },
  { feature: "Pricing", viktor: "Pay only for the work that runs. Free credits to start, no seat tax for the rest of your team.", chatgpt: "Per-seat subscription. Every teammate who needs it is another monthly line item." },
  { feature: "Access", viktor: "Available to every channel and teammate you invite. One workspace, one shared brain.", chatgpt: "One account per person. Context and history do not move between teammates." },
  { feature: "Customization", viktor: "Connects to 3,000+ apps. Learns your tone, your stack, and your playbooks over time.", chatgpt: "Custom GPTs and a handful of official connectors. Most of your tools are out of reach." },
  { feature: "Reliability", viktor: "Runs scheduled and long jobs in the cloud. Picks up where it left off and reports back when finished.", chatgpt: "Session-based. Close the tab and the task is gone — you start over the next time." },
  { feature: "Security", viktor: "SOC 2 compliant. Workspace-level controls, audit logs, and least-privilege access to your tools.", chatgpt: "Enterprise tier offers SOC 2 and admin controls. Lower tiers have limited governance." },
  { feature: "Focus", viktor: "Built for businesses that want an AI that does the job — not one that explains the job back to them.", chatgpt: "Built for the widest possible audience: students, writers, developers, hobbyists, and curious people." },
];

function ComparePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ComparisonTable />
      <DoesTheWork />
      <TeammateInSlack />
      <IntegrationsVsZero />
      <WhenToChoose />
      <Testimonials />
      <FAQ />
      <StartFree />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-hero pt-6 pb-32 overflow-hidden rounded-b-[40px]">
      <Nav />
      <div className="relative mx-auto max-w-5xl px-6 pt-20 text-center">
        <h1 className="font-display text-white text-5xl md:text-7xl leading-[0.95] tracking-tight">
          Viktor vs ChatGPT:<br />
          <span className="text-white/95">The AI That Does the Work</span>
        </h1>
        <p className="mt-8 mx-auto max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
          ChatGPT writes about the work. Viktor actually does it — in Slack, across 3,000+ tools, with the
          context of your business already loaded. Here is how the two compare, side by side.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="px-6 py-3 rounded-full bg-white text-foreground font-semibold text-sm shadow-xl hover:bg-white/95 transition">
            Try Viktor for Free
          </button>
          <button className="px-6 py-3 rounded-full bg-white/10 text-white border border-white/30 font-semibold text-sm backdrop-blur hover:bg-white/20 transition">
            See How Viktor Works
          </button>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-5 text-left">
          <ProductCard
            name="Viktor"
            tag="AI Coworker"
            tagColor="bg-white/20 text-white"
            cardClass="bg-gradient-to-br from-[oklch(0.55_0.18_285)] to-[oklch(0.32_0.18_275)] text-white"
            badge={<div className="w-10 h-10 rounded-xl bg-white/95 flex items-center justify-center text-[oklch(0.45_0.18_280)] font-extrabold">V</div>}
            body="Lives in Slack and Teams. Connects to 3,000+ apps. Runs scheduled jobs and delivers finished work — PDFs, dashboards, code — back to your team."
            ctas={[
              { label: "Try Viktor for Free", primary: true },
              { label: "Talk to sales →", primary: false },
            ]}
          />
          <ProductCard
            name="ChatGPT"
            tag="Chat Assistant"
            tagColor="bg-white text-foreground"
            cardClass="bg-white text-foreground"
            badge={<div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground font-extrabold">∞</div>}
            body="A general-purpose conversation tool. Strong at brainstorming and one-off prompts, but lives in its own tab and stops working the moment you close it."
            ctas={[
              { label: "Visit chatgpt.com →", primary: false, dark: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

type CTA = { label: string; primary: boolean; dark?: boolean };
function ProductCard({
  name, tag, tagColor, cardClass, badge, body, ctas,
}: { name: string; tag: string; tagColor: string; cardClass: string; badge: React.ReactNode; body: string; ctas: CTA[] }) {
  return (
    <div className={`rounded-3xl p-7 ${cardClass} shadow-2xl border border-white/10`}>
      <div className="flex items-center gap-3">
        {badge}
        <div>
          <div className="text-lg font-bold leading-tight">{name}</div>
          <div className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${tagColor}`}>{tag}</div>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed opacity-90">{body}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {ctas.map((c) => (
          <button
            key={c.label}
            className={
              c.primary
                ? "px-4 py-2 rounded-full bg-white text-foreground text-xs font-semibold hover:bg-white/90 transition"
                : c.dark
                ? "px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition"
                : "px-4 py-2 rounded-full bg-white/15 text-white text-xs font-semibold border border-white/30 hover:bg-white/25 transition"
            }
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ComparisonTable() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-[160px_1fr_1fr] md:grid-cols-[200px_1fr_1fr] gap-x-4">
          <div />
          <div className="px-5 py-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[oklch(0.55_0.18_285)] to-[oklch(0.32_0.18_275)] text-white flex items-center justify-center text-[11px] font-extrabold">V</span>
            Viktor
          </div>
          <div className="px-5 py-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="w-6 h-6 rounded-md bg-foreground/5 text-foreground flex items-center justify-center text-[11px] font-extrabold">∞</span>
            ChatGPT
          </div>

          {rows.map((r, i) => (
            <RowItem key={r.feature} row={r} alt={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RowItem({ row, alt }: { row: Row; alt: boolean }) {
  const bg = alt ? "bg-secondary/60" : "bg-transparent";
  return (
    <>
      <div className={`px-5 py-5 text-sm font-semibold text-foreground ${bg} rounded-l-xl border-t border-border/60`}>{row.feature}</div>
      <div className={`px-5 py-5 text-[13px] text-foreground/85 leading-relaxed ${bg} border-t border-border/60`}>{row.viktor}</div>
      <div className={`px-5 py-5 text-[13px] text-muted-foreground leading-relaxed ${bg} rounded-r-xl border-t border-border/60`}>{row.chatgpt}</div>
    </>
  );
}

function DoesTheWork() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
            Viktor does the work.<br />ChatGPT talks about it.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Ask ChatGPT for a competitive analysis and you get a wall of text to copy, paste, and reformat.
            Ask Viktor and you get a finished PDF dropped into the same Slack thread — with the data already
            pulled from your tools and the formatting your team expects.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            That is the difference between an assistant that explains the task and a coworker that closes it.
          </p>
        </div>
        <SlackPurpleCard />

      </div>
    </section>
  );
}

function ChatBubble({ name, time, body, badge }: { name: string; time: string; body: React.ReactNode; badge?: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-violet-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-foreground">{name}</span>
          {badge && <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-100 text-violet-700 font-semibold">{badge}</span>}
          <span className="text-muted-foreground">{time}</span>
        </div>
        <div className="text-sm text-foreground/90 mt-0.5">{body}</div>
      </div>
    </div>
  );
}

function TeammateInSlack() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.85_0.10_310)] via-[oklch(0.65_0.18_290)] to-[oklch(0.40_0.20_280)] p-8 shadow-xl order-2 md:order-1">
          <div className="chat-card rounded-2xl p-4 space-y-3">
            <ChatBubble name="Marcus" time="9:02 AM" body={<><span className="text-violet-600">@Viktor</span> spin up the weekly revenue digest</>} />
            <ChatBubble name="Viktor" badge="APP" time="9:02 AM" body={<>On it — should land in #leadership by 9:15.</>} />
            <ChatBubble name="Viktor" badge="APP" time="9:14 AM" body={<>Posted. Stripe MRR up 4.2%, churn flat, three at-risk accounts flagged.</>} />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
            A teammate in Slack, not a tab in your browser.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            ChatGPT lives somewhere else — you have to leave your work, switch tabs, copy context in, and copy
            answers back out. Viktor lives where your team already talks. @mention it in any channel and the work
            happens in the same thread.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            No new tool to learn. No new place to check. Just an extra coworker who never goes home.
          </p>
        </div>
      </div>
    </section>
  );
}

const integrationGrid = ["Slack","Notion","GitHub","Stripe","HubSpot","Linear","Asana","Trello","Airtable","Zapier","Meta","Drive","Gmail","Sheets","Figma","Jira"];

function IntegrationsVsZero() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
            3,000+ integrations vs. zero plug-ins
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Viktor talks to the tools your business actually runs on — billing, CRM, design, version control,
            ads, analytics, docs. Pulling data from one and pushing results to another is a single message away.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            ChatGPT, by contrast, can browse the web and run a handful of official connectors. Everything else
            has to be pasted in by hand, every single time.
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.55_0.18_285)] to-[oklch(0.30_0.18_275)] p-10 shadow-xl">
          <div className="grid grid-cols-4 gap-3">
            {integrationGrid.map((name) => (
              <div key={name} className="aspect-square rounded-2xl bg-white/95 flex items-center justify-center text-[11px] font-semibold text-foreground/80 shadow-md">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const viktorWhen = [
  "You want finished deliverables, not transcripts",
  "Your work spans multiple tools and accounts",
  "Your team collaborates in Slack or Teams",
  "You run recurring reports or scheduled jobs",
  "You need an AI that learns your business over time",
  "You care about per-task pricing, not per seat",
];
const chatgptWhen = [
  "You want a personal assistant for one-off questions",
  "You are brainstorming, writing, or studying",
  "You are happy living inside a chat window",
  "You do not need the AI to act on your tools",
  "Your use is mostly individual, not team-wide",
];

function WhenToChoose() {
  const [tab, setTab] = useState<"viktor" | "chatgpt">("viktor");
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
          When to choose ChatGPT vs Viktor
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setTab("viktor")}
            className={`rounded-full px-6 py-3 text-sm font-semibold transition flex items-center justify-center gap-2 ${
              tab === "viktor" ? "bg-gradient-to-r from-[oklch(0.55_0.18_285)] to-[oklch(0.32_0.18_275)] text-white shadow-lg" : "bg-secondary text-foreground/70"
            }`}
          >
            <span className="w-5 h-5 rounded bg-white/95 text-[oklch(0.45_0.18_280)] flex items-center justify-center text-[10px] font-extrabold">V</span>
            Choose Viktor
          </button>
          <button
            onClick={() => setTab("chatgpt")}
            className={`rounded-full px-6 py-3 text-sm font-semibold transition flex items-center justify-center gap-2 ${
              tab === "chatgpt" ? "bg-foreground text-background shadow-lg" : "bg-secondary text-foreground/70"
            }`}
          >
            <span className="w-5 h-5 rounded bg-background/20 flex items-center justify-center text-[10px] font-extrabold">∞</span>
            Choose ChatGPT
          </button>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-4 text-left">
          {(tab === "viktor" ? viktorWhen : chatgptWhen).map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" strokeWidth={3} />
              </span>
              <p className="text-sm text-foreground/85 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button className="px-8 py-4 rounded-full bg-foreground text-background font-semibold text-sm shadow-xl hover:bg-foreground/90 transition">
            Try Viktor for Free
          </button>
          <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
            <span>💰 $100 in free credits</span>
            <span>🪪 No credit card required</span>
            <span>🛡️ SOC 2 compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Tobias Giesen", role: "CEO, Growably", quote: "We replaced four different ChatGPT seats with one Viktor workspace. The team actually uses it because it lives where they already work." },
  { name: "Sam Kopelman", role: "CEO, Givr", quote: "ChatGPT was helpful. Viktor is operational. It runs the work, not just the answers." },
  { name: "Antonín Štětina", role: "CEO, KULINA Group", quote: "Mindblowing all-in-one AI which does everything in a single solution — no more tab-switching between ten different products." },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const item = testimonials[i];
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-[oklch(0.88_0.06_310)] via-[oklch(0.70_0.15_290)] to-[oklch(0.45_0.20_280)] p-10 md:p-14 shadow-xl">
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-white text-center">
          What our customers say.
        </h2>
        <div className="mt-10 mx-auto max-w-2xl rounded-2xl bg-white/95 backdrop-blur p-8 shadow-2xl">
          <p className="text-foreground text-base md:text-lg leading-relaxed">"{item.quote}"</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-violet-500" />
            <div>
              <div className="text-sm font-semibold text-foreground">{item.name}</div>
              <div className="text-xs text-muted-foreground">{item.role}</div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full bg-white/90 text-foreground flex items-center justify-center hover:bg-white transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setI((i + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full bg-white/90 text-foreground flex items-center justify-center hover:bg-white transition"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Is Viktor a replacement for ChatGPT?", a: "For team workflows — yes. For personal Q&A in a browser tab, ChatGPT still wins. Many of our customers run both." },
  { q: "Do I have to move my team off ChatGPT to use Viktor?", a: "No. Viktor lives in Slack and Teams next to your existing tools. Try it on one workflow first and grow from there." },
  { q: "How is pricing different from a ChatGPT subscription?", a: "Viktor charges per task that runs, not per seat. Invite the whole company; you only pay for the work that ships." },
  { q: "Is my data safe?", a: "Yes. Viktor is SOC 2 compliant with workspace controls, audit logs, and least-privilege access to every integration you connect." },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl grid md:grid-cols-[1fr_1.4fr] gap-10">
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
          Questions people ask before adding Viktor
        </h2>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <button
              key={f.q}
              onClick={() => setOpen(open === idx ? -1 : idx)}
              className={`w-full text-left rounded-2xl border border-border p-5 transition ${open === idx ? "bg-card shadow-md" : "bg-card/60 hover:bg-card"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-semibold text-foreground text-[15px]">{f.q}</span>
                <ChevronDown className={`w-4 h-4 mt-1 text-muted-foreground transition-transform ${open === idx ? "rotate-180" : ""}`} />
              </div>
              {open === idx && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const startFreeFeatures = [
  "$100 in free credits",
  "Runs in Slack and Teams",
  "Access to 3,000+ integrations",
  "SOC 2 compliant",
];

function StartFree() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-[oklch(0.55_0.18_285)] to-[oklch(0.30_0.18_275)] p-10 md:p-14 text-white shadow-2xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Start free.<br />Pay only when you're ready.
            </h2>
            <p className="mt-5 text-white/85 leading-relaxed">
              Set up your workspace, connect a few tools, and let Viktor run its first task on us. No credit card,
              no seat tax, no migration project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="px-6 py-3 rounded-full bg-white text-foreground font-semibold text-sm hover:bg-white/90 transition">
                Try Viktor for Free
              </button>
              <button className="px-6 py-3 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition inline-flex items-center gap-2">
                <Play className="w-3.5 h-3.5" /> Watch the demo
              </button>
            </div>
          </div>
          <ul className="space-y-3">
            {startFreeFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
