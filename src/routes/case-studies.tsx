import { useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";

type Case = {
  category: string;
  statLines: string[];
  person: string;
  role: string;
  tags: string[];
  title: string;
  excerpt: string;
  pills: string[];
};

const featured: Case = {
  category: "all",
  statLines: ["30 projects.", "6 weeks. One", "AI coworker."],
  person: "David Joerg",
  role: "Technical Product Manager,\nAI/ML at Chess.com",
  tags: ["Tech entrepreneur", "Power user"],
  title: "From Power User to Power Team",
  excerpt:
    "How a tech entrepreneur turned an AI coworker into a full operating system for work and life. Then his family did the same.",
  pills: ["30+ distinct projects", "6 weeks of usage"],
};

const cases: Case[] = [
  featured,
  {
    category: "ecommerce",
    statLines: ["12 workflows. 8", "channels. 15 days."],
    person: "TWL",
    role: "Australian ecommerce\nretailer",
    tags: ["Australian ecommerce retailer", "Ecommerce"],
    title: "12 scheduled workflows across 8 channels in 15 days.",
    excerpt:
      "Replacing ~2 hours of manual work per day, split across 5 team members at an Australian functional fitness retailer.",
    pills: ["12 scheduled workflows", "15 days to full setup"],
  },
  {
    category: "operations",
    statLines: ["62 workflows.", "2 weeks. One", "AI coworker."],
    person: "Element Turf",
    role: "Lawn care and landscaping\ncompany",
    tags: ["Landscaping", "Operations"],
    title: "From zero automation to 62 workflows in two weeks.",
    excerpt:
      "How a 15-person, 8-crew landscaping company put an AI coworker to work across Asana, ClickUp, BambooHR, Gmail, and seven inboxes.",
    pills: ["62 automated workflows", "2 weeks to setup"],
  },
  {
    category: "operations",
    statLines: ["10 platforms.", "27 automations.", "75 days."],
    person: "ColabFD",
    role: "Non-profit professional\ndevelopment community",
    tags: ["EdTech / Non-profit", "Operations"],
    title: "10 web platforms, 2 mobile apps, 27 automations — in 75 days.",
    excerpt:
      "No developers. No designers. No IT team. One founder, 46 volunteers, and an AI coworker.",
    pills: ["10 live web platforms", "75 days to build it all"],
  },
  {
    category: "media",
    statLines: ["18 workflows.", "67 days. One", "AI coworker."],
    person: "AlphaSignal",
    role: "AI-curated newsletter and\ninformation platform",
    tags: ["AI Newsletter", "Media & Content"],
    title: "Not a chatbot. A coworker.",
    excerpt:
      "How AlphaSignal's 6-person team automated 18 workflows in 67 days — without hiring a developer.",
    pills: ["18 automated workflows", "67 days to full setup"],
  },
  {
    category: "founders",
    statLines: ["12 web apps. 887", "threads. 44 days."],
    person: "Hampton",
    role: "Private network for high-\ngrowth founders & CEOs",
    tags: ["Private network for founders & CEOs", "Founders & Power users"],
    title: "Editors, not creators",
    excerpt:
      "How a Hampton's 25-person team started operating like a much larger one, in 44 days with Viktor.",
    pills: ["26 scheduled tasks", "44 days to full setup"],
  },
];

const filters = ["All", "Ecommerce", "Operations", "Media & Content", "Founders & Power users"];
const filterKey: Record<string, string> = {
  All: "all",
  Ecommerce: "ecommerce",
  Operations: "operations",
  "Media & Content": "media",
  "Founders & Power users": "founders",
};

const logos = ["Squidoo", "TRUE CLASSIC", "Accel", "LYFEfuel"];

export default function CaseStudiesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? cases : cases.filter((c) => c.category === filterKey[active]);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Case Studies — Viktor"
        description="Real stories from teams running on Viktor. The numbers are the customers'. The tools are theirs. The workflows still run today."
        ogTitle="Case Studies — Viktor"
        ogDescription="Real stories from teams running on Viktor."
      />
      <div className="pt-6">
        <Nav />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-48 text-center">
        <h1 className="font-display text-6xl md:text-7xl tracking-tight">Real</h1>
        <p className="mt-5 mx-auto max-w-md text-sm text-muted-foreground leading-relaxed">
          Every story below is a working installation. The numbers are the
          customers'. The tools are theirs. The workflows still run today.
        </p>

        {/* Logos row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-foreground/70">
          {logos.map((l, i) => (
            <div key={l} className="flex items-center">
              {i > 0 && <span className="hidden md:block w-px h-5 bg-border mr-12 -ml-12" />}
              <span
                className={`font-display text-base tracking-tight ${
                  l === "Accel" ? "italic" : ""
                } ${l === "TRUE CLASSIC" ? "font-extrabold uppercase tracking-wider text-[13px]" : ""}`}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured case card */}
      <section className="mx-auto max-w-5xl px-6 mt-12">
        <div className="rounded-3xl bg-card shadow-xl p-3 md:p-3 grid md:grid-cols-2 gap-3">
          <FeatureLeft c={featured} />
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="text-[11px] text-muted-foreground flex gap-2">
              <span>{featured.tags[0]}</span>
              <span>·</span>
              <span>{featured.tags[1]}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl mt-2 leading-tight">
              {featured.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
              <StatPill big="30+" label="distinct projects" />
              <StatPill big="6" label="weeks of usage" />
            </div>
          </div>
        </div>
      </section>

      {/* Use cases section */}
      <section className="mx-auto max-w-5xl px-6 mt-20">
        <p className="text-[11px] uppercase tracking-widest text-violet-600 font-semibold">
          Use Cases
        </p>
        <h2 className="font-display text-3xl md:text-4xl mt-3 tracking-tight">
          Pick a team that looks like yours
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                active === f
                  ? "bg-violet-200 text-violet-800 border-violet-200"
                  : "bg-transparent text-foreground/80 border-border hover:bg-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {filtered.map((c, i) => (
            <CaseCard key={c.title + i} c={c} />
          ))}
        </div>

        {/* Pagination */}
        <nav className="mt-12 flex items-center justify-center gap-3 text-sm border-t border-border pt-8">
          <button className="w-8 h-8 rounded-full border border-border text-muted-foreground flex items-center justify-center">
            ‹
          </button>
          <span className="text-violet-600 font-semibold w-8 text-center">1</span>
          <button className="w-8 h-8 rounded-full border border-border text-muted-foreground flex items-center justify-center">
            ›
          </button>
        </nav>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 mt-20 mb-24">
        <div className="rounded-[28px] bg-startfree-card p-10 md:p-16 text-center">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
            <span className="text-[oklch(0.82_0.16_70)]">Your story</span>{" "}
            <span className="text-white">could be next</span>
          </h2>
          <p className="mt-4 mx-auto max-w-md text-white/80 text-sm leading-relaxed">
            Most teams have their first workflow running before the install conversation is
            over. Setup is two minutes. The rest is delegation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <GetStartedButton />
            <button className="px-6 py-3 rounded-full bg-white/10 text-white text-sm font-semibold border border-white/20">
              Book a demo
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[12px] text-white/80">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> SOC 2 compliant.</span>
            <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> No credit card required.</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Your data never trains models.</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatPill({ big, label }: { big: string; label: string }) {
  return (
    <div className="rounded-2xl px-4 py-3 bg-gradient-to-br from-orange-100 via-violet-100 to-violet-200">
      <div className="font-display text-2xl text-foreground">{big}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function FeatureLeft({ c }: { c: Case }) {
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-violet-500 via-violet-600 to-indigo-700 p-6 md:p-7 overflow-hidden min-h-[230px]">
      <PurpleBg />
      <div className="relative grid grid-cols-[1fr_auto] gap-3 items-start h-full">
        <div className="text-white">
          {c.statLines.map((l) => (
            <div key={l} className="font-display text-xl md:text-2xl leading-tight">{l}</div>
          ))}
        </div>
        <div className="text-right text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/20 overflow-hidden ring-2 ring-white/30 ml-auto">
            <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300" />
          </div>
          <div className="mt-2 text-[11px] font-semibold">{c.person}</div>
          <div className="text-[10px] text-white/75 whitespace-pre-line leading-tight">{c.role}</div>
        </div>
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: Case }) {
  return (
    <article className="rounded-2xl bg-card shadow-sm overflow-hidden border border-border/60">
      <div className="relative bg-gradient-to-br from-violet-500 via-violet-600 to-indigo-700 p-6 overflow-hidden min-h-[170px]">
        <PurpleBg />
        <div className="relative grid grid-cols-[1fr_auto] gap-3 items-start">
          <div className="text-white">
            {c.statLines.map((l) => (
              <div key={l} className="font-display text-lg leading-tight">{l}</div>
            ))}
          </div>
          <div className="text-right text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/85 ring-2 ring-white/30 ml-auto" />
            <div className="mt-2 text-[10px] font-semibold">{c.person}</div>
            <div className="text-[9px] text-white/75 whitespace-pre-line leading-tight">{c.role}</div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="text-[10px] text-muted-foreground flex gap-2">
          {c.tags.map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              {i > 0 && <span>·</span>}
              <span>{t}</span>
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-[15px] mt-2 leading-snug">{c.title}</h3>
        <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed line-clamp-3">
          {c.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {c.pills.map((p, i) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-full text-[10px] font-medium ${
                i === 0
                  ? "bg-violet-100 text-violet-700"
                  : "bg-secondary text-foreground/70"
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function PurpleBg() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay"
      viewBox="0 0 200 120"
      preserveAspectRatio="none"
    >
      <circle cx="20" cy="20" r="35" fill="white" opacity="0.15" />
      <circle cx="160" cy="90" r="50" fill="white" opacity="0.1" />
      <circle cx="100" cy="100" r="20" fill="white" opacity="0.12" />
    </svg>
  );
}
