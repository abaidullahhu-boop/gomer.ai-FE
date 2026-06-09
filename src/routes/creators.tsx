import { useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import {
  ChevronDown,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Music2,
  Rocket,
  LineChart,
  Cog,
  Megaphone,
  HeartHandshake,
  UserCircle2,
  Lightbulb,
  ArrowLeftRight,
  Search,
  CalendarDays,
  MonitorPlay,
  Flame,
  Check,
  X,
  Info,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export default function CreatorsPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Become a Viktor Influencer — Earn for Posting Real Work"
        description="Viktor does the work. You take the screenshot. Post real product output, get paid up to $10,000 per post — or take 50% more in credits."
        ogTitle="Become a Viktor Influencer"
        ogDescription="Post real Viktor outputs and earn cash or credits. No follower minimum, no approvals."
        ogUrl="/creators"
        canonical="/creators"
      />
      <Hero />
      <Payouts />
      <HowItWorks />
      <CreditsOrCash />
      <PostIdeas />
      <WhoFor />
      <Disclose />
      <Rules />
      <CreatorsFAQ />
      <SubmitCTA />
      <Footer />
    </div>
  );
}

/* ----------------------- HERO ----------------------- */

function Hero() {
  return (
    <section className="relative pt-6 pb-0">
      <Nav />
      <div className="mx-auto max-w-7xl px-4 mt-6">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-hero">
          <div className="relative z-10 px-6 sm:px-12 lg:px-20 pt-24 pb-20 lg:pt-32 lg:pb-28 text-center text-white">
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-white/75">
              INTRODUCING VIKTOR INFLUENCERS
            </p>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] tracking-tight">
              Viktor does the work.
              <br />
              <span className="bg-gradient-to-r from-[oklch(0.92_0.08_55)] via-white to-[oklch(0.85_0.10_30)] bg-clip-text text-transparent">
                You take the screenshot.
              </span>
            </h1>
            <p className="mt-7 mx-auto max-w-[34rem] text-base sm:text-lg text-white/85 leading-relaxed">
              Post real Viktor outputs on your channels. Earn up to{" "}
              <span className="text-[oklch(0.90_0.10_55)] font-semibold">$10,000</span> per
              post. Choose credits for{" "}
              <span className="text-[oklch(0.90_0.10_55)] font-semibold">50% more</span>.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row sm:justify-center gap-3 w-full sm:w-auto">
              <a
                href="#submit"
                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-white text-foreground font-semibold hover:opacity-90 transition"
              >
                Submit a post
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
              >
                See how it works
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4" /> Pays in cash or credits
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4" /> Pays the same day
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4" /> No follower minimum
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4" /> No approvals
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- PAYOUTS ----------------------- */

const platforms = [
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "x", label: "X / Twitter", icon: Twitter },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "tiktok", label: "TikTok", icon: Music2 },
] as const;

const payoutData: Record<string, { range: string; cash: string; credits: string; note?: string }[]> = {
  linkedin: [
    { range: "1,000 – 4,999 views", cash: "$30 cash", credits: "$45 in credits" },
    { range: "5,000 – 19,999 views", cash: "$150 cash", credits: "$225 in credits" },
    { range: "20,000 – 49,999 views", cash: "$500 cash", credits: "$750 in credits" },
    { range: "50,000 – 99,999 views", cash: "$1,500 cash", credits: "$2,250 in credits" },
    { range: "100,000+ views", cash: "$10,000 cash", credits: "$15,000 in credits", note: "Capped at $10,000" },
  ],
  x: [
    { range: "5,000 – 19,999 views", cash: "$30 cash", credits: "$45 in credits" },
    { range: "20,000 – 99,999 views", cash: "$150 cash", credits: "$225 in credits" },
    { range: "100,000 – 499,999 views", cash: "$500 cash", credits: "$750 in credits" },
    { range: "500,000 – 999,999 views", cash: "$1,500 cash", credits: "$2,250 in credits" },
    { range: "1M+ views", cash: "$10,000 cash", credits: "$15,000 in credits" },
  ],
  instagram: [
    { range: "5,000 – 24,999 views", cash: "$30 cash", credits: "$45 in credits" },
    { range: "25,000 – 99,999 views", cash: "$150 cash", credits: "$225 in credits" },
    { range: "100,000 – 499,999 views", cash: "$500 cash", credits: "$750 in credits" },
    { range: "500,000 – 999,999 views", cash: "$1,500 cash", credits: "$2,250 in credits" },
    { range: "1M+ views", cash: "$10,000 cash", credits: "$15,000 in credits" },
  ],
  youtube: [
    { range: "1,000 – 4,999 views", cash: "$30 cash", credits: "$45 in credits" },
    { range: "5,000 – 24,999 views", cash: "$150 cash", credits: "$225 in credits" },
    { range: "25,000 – 99,999 views", cash: "$500 cash", credits: "$750 in credits" },
    { range: "100,000 – 499,999 views", cash: "$1,500 cash", credits: "$2,250 in credits" },
    { range: "500,000+ views", cash: "$10,000 cash", credits: "$15,000 in credits" },
  ],
  tiktok: [
    { range: "10,000 – 49,999 views", cash: "$30 cash", credits: "$45 in credits" },
    { range: "50,000 – 249,999 views", cash: "$150 cash", credits: "$225 in credits" },
    { range: "250,000 – 999,999 views", cash: "$500 cash", credits: "$750 in credits" },
    { range: "1M – 4,999,999 views", cash: "$1,500 cash", credits: "$2,250 in credits" },
    { range: "5M+ views", cash: "$10,000 cash", credits: "$15,000 in credits" },
  ],
};

function Payouts() {
  const [active, setActive] = useState<string>("linkedin");
  const rows = payoutData[active];
  return (
    <section
      id="payouts"
      className="py-12 sm:py-[5rem] scroll-mt-24 md:scroll-mt-28"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-10 md:gap-16">
          <h2 className="mx-auto text-center font-display text-4xl sm:text-5xl tracking-tight">
            See how much you can earn
          </h2>

          {/* Platform tabs */}
          <div className="mx-auto">
            <div
              className="relative rounded-full p-1.5 flex items-center gap-1"
              style={{
                background:
                  "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)",
              }}
            >
              {platforms.map((p) => {
                const isActive = active === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    aria-pressed={isActive}
                    aria-label={p.label}
                    className={`relative inline-flex items-center justify-center w-12 h-10 sm:w-14 sm:h-11 rounded-full text-sm font-semibold transition ${
                      isActive
                        ? "text-white shadow-lg"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.62 0.18 290), oklch(0.5 0.22 285))",
                          }
                        : undefined
                    }
                  >
                    <p.icon className="w-4 h-4" />
                  </button>
                );
              })}
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.94_0.05_140)] text-[oklch(0.35_0.15_150)] text-[11px] font-semibold px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.18_150)]" />
                30 month credits
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {rows.map((r) => (
              <div
                key={r.range}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.95 0.05 60 / 0.6) 0%, oklch(0.92 0.06 50 / 0.5) 35%, oklch(0.88 0.07 320 / 0.45) 70%, oklch(0.85 0.09 290 / 0.5) 100%)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
                    mask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
                    padding: "1px",
                  }}
                />
                <div className="relative grid grid-cols-1 sm:grid-cols-[1.2fr_1.2fr_1fr] items-center gap-2 sm:gap-6 px-6 sm:px-8 py-5">
                  <div className="text-foreground font-semibold text-[15px]">
                    {r.range}
                  </div>
                  <div className="text-foreground/70 text-[14px]">
                    {r.credits.replace(" in credits", " credits")}
                  </div>
                  <div className="sm:text-right">
                    <div className="text-foreground font-semibold text-[15px]">
                      {r.cash}
                    </div>
                    <div className="text-foreground/50 text-[12px] line-through">
                      {r.credits}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-3xl text-center text-sm text-muted-foreground leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">Example:</span>{" "}
              Your post hits 75k impressions. You earn $500 in credits or $325
              paid out via Cash.
            </p>
            <p className="mt-1">
              <span className="font-semibold text-foreground">Same post,</span>{" "}
              50% more value with credits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- HOW IT WORKS ----------------------- */

const steps = [
  {
    icon: UserCircle2,
    title: "Capture the output",
    body: "Hit a screenshot or a 30-second Loom of Viktor's output. The unsexier the workflow, the better.",
  },
  {
    icon: Cog,
    title: "Post it",
    body: "Share it on LinkedIn, X, Insta, YouTube, or TikTok. What happened? Why does it matter?",
  },
  {
    icon: Megaphone,
    title: "Tag Viktor",
    body: "Tag @viktor.com. That's how we find you.",
  },
  {
    icon: Rocket,
    title: "Let it run",
    body: "Wait 7 days. Let impressions settle. Reply to comments. Build momentum.",
  },
  {
    icon: HeartHandshake,
    title: "Submit",
    body: "Send us the post link and an analytics screenshot showing impressions. Pub-credits in week.",
  },
  {
    icon: LineChart,
    title: "Get paid",
    body: "We come within 48 hours. Credits hit your Viktor account immediately. Cash goes through Stripe in 5 business days.",
  },
];

function HowItWorks() {
  const [active, setActive] = useState<string>("linkedin");
  return (
    <section
      id="how-it-works"
      className="py-12 sm:py-[5rem] scroll-mt-24 md:scroll-mt-28"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-10 md:gap-16">
          <div className="text-center flex flex-col gap-4">
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight">
              How it works
            </h2>
            <p className="text-muted-foreground">
              Screenshot. Post. Tag. Wait. Submit. Get paid.
            </p>
          </div>

          <div className="mx-auto">
            <div
              className="relative rounded-full p-1.5 flex items-center gap-1"
              style={{
                background:
                  "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)",
              }}
            >
              {platforms.map((p) => {
                const isActive = active === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    aria-pressed={isActive}
                    aria-label={p.label}
                    className={`relative inline-flex items-center justify-center w-12 h-10 sm:w-14 sm:h-11 rounded-full text-sm font-semibold transition ${
                      isActive
                        ? "text-white shadow-lg"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.62 0.18 290), oklch(0.5 0.22 285))",
                          }
                        : undefined
                    }
                  >
                    <p.icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, idx) => (
              <div
                key={s.title}
                className="relative rounded-3xl p-7 flex flex-col gap-4 hover:shadow-md transition overflow-hidden"
                style={{
                  background:
                    "radial-gradient(120% 100% at 0% 0%, oklch(0.97 0.03 50 / 0.7) 0%, oklch(0.98 0.01 290 / 0.4) 40%, #fff 100%)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(-56deg, rgba(255, 255, 255, 0.8) 0%, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.06) 75%, rgba(255, 255, 255, 0.8) 100%)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
                    mask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
                    padding: "1px",
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.18 290), oklch(0.5 0.22 285))",
                    }}
                  >
                    <s.icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground rounded-full border border-border bg-white/70 px-2.5 py-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative text-lg font-semibold">{s.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- CREDITS OR CASH ----------------------- */

function CreditsOrCash() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight">Credits or cash</h2>
          <p className="text-muted-foreground">Pick what works. Or take some of both.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative rounded-3xl p-8 md:p-10 bg-startfree-card text-white overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <span className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </span>
              <span className="rounded-full bg-white text-foreground text-xs font-bold px-3 py-1">
                Recommended
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold">Viktor Credits</h3>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              Choose credits and get 50% more value. Spend them on any Viktor workflow — no expiry.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                ["$30 cash", "$45 in credits"],
                ["$150 cash", "$225 in credits"],
                ["$500 cash", "$750 in credits"],
                ["$1,500 cash", "$2,250 in credits"],
              ].map(([a, b]) => (
                <li key={a} className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-white/70">{a}</span>
                  <span className="font-semibold">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <span className="w-11 h-11 rounded-xl bg-secondary text-foreground flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold">Cash</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Prefer cash? We send it the same day your post is verified. Stripe or PayPal,
              your choice. Available in 40+ countries.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-600" /> Same-day payout</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-600" /> No minimum balance</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-600" /> Tax docs handled for US creators</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-violet-600" /> Mix cash + credits any time</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- POST IDEAS ----------------------- */

const ideas = [
  { icon: Flame, title: "The wow moment", body: "Show the one thing Viktor did that made you stop and screenshot it." },
  { icon: ArrowLeftRight, title: "Before / after", body: "Manual workflow on the left. Viktor's output on the right. Let the contrast speak." },
  { icon: Search, title: "The 2-minute analysis", body: "Ask Viktor something complex. Show the answer in under 120 seconds." },
  { icon: CalendarDays, title: "Day in the life", body: "Multiple Viktor outputs throughout your workday. People love a routine." },
  { icon: MonitorPlay, title: "The screen recording", body: "Record Viktor working through something complex in real time. People will watch." },
  { icon: Lightbulb, title: "The hot take", body: '"AI employees > AI chatbots." Bold claim, Viktor screenshot as evidence.' },
];

function PostIdeas() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight">Post ideas</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stuck for content? Steal one of these. Or remix.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ideas.map((i) => (
            <article
              key={i.title}
              className="rounded-3xl border border-border bg-card p-8 flex flex-col gap-5 hover:shadow-md transition"
            >
              <span className="w-9 h-9 rounded-lg bg-secondary text-foreground flex items-center justify-center">
                <i.icon className="w-4.5 h-4.5" />
              </span>
              <h3 className="font-semibold">{i.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i.body}</p>
            </article>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          The posts that perform best show a real task with a real result. Don't overthink it.
          Viktor did the work — just show the output.
        </p>
      </div>
    </section>
  );
}

/* ----------------------- WHO THIS IS FOR ----------------------- */

const audiences = [
  { icon: Rocket, title: "Startup founders", body: "You're shipping fast. Viktor does the work you don't have time for." },
  { icon: LineChart, title: "Ops & RevOps leads", body: "Process owners who automate the gnarly stuff and look like heroes." },
  { icon: Cog, title: "Engineering managers", body: "Less context-switching. More shipped tickets. Better standups." },
  { icon: Megaphone, title: "Marketing teams", body: "From research to first draft in minutes. Show your work, get paid." },
  { icon: HeartHandshake, title: "Customer success", body: "Faster replies, deeper account research, happier customers." },
  { icon: UserCircle2, title: "Anyone, really", body: "If Viktor does work for your team, you qualify. No gatekeeping." },
];

function WhoFor() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] bg-hero px-6 sm:px-12 py-20 lg:py-28 text-white">
          <div className="relative z-10 flex flex-col gap-12">
            <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight">Who this is for</h2>
              <p className="text-white/75">If Viktor does work for your team, you qualify.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {audiences.map((a) => (
                <article
                  key={a.title}
                  className="relative min-h-[200px] rounded-3xl bg-white/10 backdrop-blur border border-white/20 p-8 flex flex-col items-center text-center gap-4"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <a.icon className="w-5 h-5 text-white/90" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-sm text-white/70 leading-relaxed">{a.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- DISCLOSE ----------------------- */

function Disclose() {
  const rules = [
    { p: "LinkedIn", t: "Add #ad or 'Paid partnership with Viktor' in the first line." },
    { p: "X / Twitter", t: "Open with #ad. Tag @viktor anywhere in the post." },
    { p: "Instagram", t: "Use the built-in 'Paid partnership' label and tag @viktor." },
    { p: "YouTube", t: "Tick the 'paid promotion' checkbox plus a verbal call-out." },
    { p: "TikTok", t: "Toggle 'Branded content' and add #ad in the caption." },
  ];
  return (
    <section id="disclosure" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[32px] border border-border bg-card p-8 md:p-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
            <div className="max-w-md flex flex-col gap-4">
              <span className="w-fit rounded-full bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5">
                Required on every post
              </span>
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight">
                Disclose the partnership
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Sponsored content has to be labeled — it's the law in most countries and it's
                the right thing to do. Here's how to do it on each platform.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Miss the disclosure and we can't pay out. Add it and you're good.
              </p>
            </div>
            <ul className="flex-1 flex flex-col gap-5">
              {rules.map((r) => (
                <li key={r.p} className="border-l-2 border-violet-300 pl-5 flex flex-col gap-1">
                  <span className="font-semibold">{r.p}</span>
                  <span className="text-sm text-muted-foreground">{r.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- THE RULES ----------------------- */

const ruleCols = [
  {
    icon: Check,
    label: "Do this",
    color: "text-emerald-600 bg-emerald-50",
    items: [
      "Show a real Viktor output you actually used",
      "Disclose the partnership clearly",
      "Tag @viktor and link to viktor.com",
      "Keep the post live for at least 30 days",
    ],
  },
  {
    icon: X,
    label: "Don't",
    color: "text-rose-600 bg-rose-50",
    items: [
      "Fake screenshots or staged demos",
      "Repost the exact same content across accounts",
      "Buy views or engagement",
      "Hide the disclosure in tags or alt text",
    ],
  },
  {
    icon: Info,
    label: "Notes",
    color: "text-violet-600 bg-violet-50",
    items: [
      "We track views via platform analytics — send the screenshot at day 30",
      "Multiple posts per month are welcome",
      "Reels, shorts, and threads all count",
      "Reach out if you want a custom collab",
    ],
  },
];

function Rules() {
  const [tab, setTab] = useState(0);
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight">The rules</h2>
          <p className="text-muted-foreground">A short list. We don't make you sign anything.</p>
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-full border border-border bg-card p-1.5">
          {ruleCols.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setTab(i)}
              className={`inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-semibold transition ${
                tab === i ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ruleCols.map((c, i) => (
            <div
              key={c.label}
              className={`rounded-3xl border border-border bg-card p-7 flex flex-col gap-5 ${
                i === tab ? "ring-2 ring-violet-200" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.color}`}>
                  <c.icon className="w-4.5 h-4.5" />
                </span>
                <span className="font-semibold">{c.label}</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- FAQ ----------------------- */

const faqs = [
  {
    q: "Who can apply?",
    a: "Anyone with a public account on LinkedIn, X, Instagram, YouTube, or TikTok. No follower minimum. We care about the work, not the audience size.",
  },
  {
    q: "How long until I get paid?",
    a: "We verify the post within 24 hours of submission. Cash payouts go out the same day they're verified at the 30-day view checkpoint.",
  },
  {
    q: "Do I need approval before I post?",
    a: "Nope. Post first, submit second. As long as it follows the rules above, you're paid.",
  },
  {
    q: "Is there a limit per month?",
    a: "Up to $10,000 per post. No cap on the number of posts. Post a lot, earn a lot.",
  },
];

function CreatorsFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[180px_1fr] gap-10 md:gap-16">
        <h2 className="font-display text-4xl md:text-5xl">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border overflow-hidden transition-colors ${
                  isOpen ? "border-violet-300 bg-violet-50" : "border-border bg-card"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-violet-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- SUBMIT CTA ----------------------- */

const submitChannels = [
  { label: "Submit on LinkedIn", icon: Linkedin, href: "https://forms.gle/CT3AQ2A6zc9Bt4w1A" },
  { label: "Submit on X", icon: Twitter, href: "https://forms.gle/evAxXmXxzZRs8o7B9" },
  { label: "Submit on Instagram", icon: Instagram, href: "https://forms.gle/5QkhJ2S6vgnfkRpJ7" },
  { label: "Submit on YouTube", icon: Youtube, href: "https://forms.gle/vvUZLjNGa57iYH5BA" },
  { label: "Submit on TikTok", icon: Music2, href: "#" },
];

function SubmitCTA() {
  return (
    <section id="submit" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] bg-hero p-8 md:p-16 text-white">
          <div className="relative z-10 flex flex-col gap-10">
            <div className="flex flex-col gap-6 max-w-xl">
              <span className="w-fit rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold">
                Ready when you are
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight">
                Viktor already did the work.
                <br />
                Now submit your post.
              </h2>
              <p className="text-white/80 max-w-lg">
                Drop the link to your post in the form for your platform. We'll handle the rest.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Pick your platform
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {submitChannels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 h-14 px-6 rounded-full bg-white text-foreground font-semibold hover:opacity-90 transition"
                  >
                    <c.icon className="w-5 h-5" />
                    <span>{c.label}</span>
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
