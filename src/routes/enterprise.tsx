import { useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import {
  ShieldCheck, KeyRound, Eye, CheckCircle2, Shield, UserCheck, Database,
  Play, Plug, Settings2, Boxes,
  ChevronDown, Zap,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;

const customerTestimonials = [
  { name: "Boris Wexler", role: "CEO, Space Dinosaurs", saved: "10+ hrs/week", quote: "Viktor is an incredible tool — it was almost instantly adopted by the bulk of my team.", image: avatar("photo-1500648767791-00dcc994a43e") },
  { name: "Robert Tyrrell", role: "Owner, TalentBright", saved: "10+ hrs/week", quote: "It's blown my mind seeing what Viktor can actually do. I'm having real conversations with my partner about investing in an AI tool the way we used to talk about hiring actual people.", image: avatar("photo-1519345182560-3f2917c472ef") },
  { name: "Jordan Dikoum", role: "Co-Founder, UniTru Inc.", saved: "10+ hrs/week", quote: "Viktor is our eyes, ears, and hands. We might really never have to hire someone again.", image: avatar("photo-1506794778202-cad84cf45f1d") },
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Enterprise — Viktor"
        description="One AI coworker. Enterprise-ready. SSO, SCIM, audit logs, SOC 2, GDPR — everything your security, IT, and procurement teams ask for."
        ogTitle="Enterprise — Viktor"
        ogDescription="Enterprise-ready AI coworker with SSO, SCIM, audit logs, and SOC 2."
        ogUrl="/enterprise"
        canonical="/enterprise"
      />
      <EnterpriseHero />
      <ComplianceGrid />
      <DeliverablesTabs />
      <SecurityAlly />
      <TestimonialsCarousel items={customerTestimonials} title="What our customers say" />
      <AddInTwoMinutes />
      <EnterpriseFAQ />
      <StartFreeCTA />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */

function HeroChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-foreground/80 text-[13px]">
      <span className="w-4 h-4 rounded-full bg-violet-200/70 flex items-center justify-center">
        <CheckCircle2 className="w-3 h-3 text-violet-700" />
      </span>
      {children}
    </div>
  );
}

function EnterpriseHero() {
  return (
    <section className="relative pt-6 pb-24 overflow-hidden bg-gradient-to-b from-[oklch(0.96_0.04_300)] via-[oklch(0.97_0.03_290)] to-background">
      <Nav />
      <div className="relative mx-auto max-w-4xl px-6 pt-20 text-center">
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02] tracking-tight">
          One AI coworker.<br />
          <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
            Enterprise-ready.
          </span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed text-sm">
          Live in Slack, ready across SSO, audit, SCIM, SAML, and rings under
          security model your CISO will actually sign.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <GetStartedButton variant="dark" />
          <button className="px-6 py-3 rounded-full bg-white border border-border text-foreground text-sm font-semibold hover:bg-secondary transition">
            Book a Demo
          </button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <HeroChip>Manage Directory</HeroChip>
          <HeroChip>SAML for everybody</HeroChip>
          <HeroChip>1x roof-need approval</HeroChip>
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <HeroChip>Two log events</HeroChip>
          <HeroChip>AES Encryption</HeroChip>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPLIANCE 3-COLUMN GRID ---------------- */

const colA = {
  icon: UserCheck,
  title: "Identity & Access",
  rows: [
    { t: "SAML native auth", d: "Works with your existing Okta, OneLogin, JumpCloud, Microsoft Entra ID, Google Workspace, or any SAML 2.0 provider — out of the box." },
    { t: "Approval policies", d: "Configure who can approve what action. Defaults are conservative." },
    { t: "PII data redaction, residency", d: "Choose where your data lives — US or EU. PII is auto-redacted." },
  ],
};

const colB = {
  icon: Shield,
  title: "Compliance",
  rows: [
    { t: "Per-user OAuth", d: "Each person connects their own Google, Hubspot, Linear, Gitlab, and other tools. Viktor only acts as them, never as a generic shared SaaS account." },
    { t: "Retention controls", d: "Configurable retention is not optional, it's a per-org requirement we deliver on as part of your needs and timeline." },
    { t: "Workspace per-project skills", d: "Skills, memory, work, and dashboards live inside your Workspace and never leak across customers." },
  ],
};

const colC = {
  icon: Zap,
  title: "Operations",
  rows: [
    { t: "Usage reporting", d: "The Viktor team and growth-stage operators have rolled-up data to support trend metrics, adoption metrics, and a per-seat usage breakdown over time." },
    { t: "DPA included", d: "GDPR + CCPA Data Processing Agreement available for most companies, customer-friendly to sign for most digital-only procurement." },
    { t: "Direct line to our team", d: "A dedicated channel for Viktor Teams customers where you talk to the engineering build Viktor and solve issues fast." },
  ],
};

function CompliancePill({
  data,
  active,
}: {
  data: typeof colA;
  active?: boolean;
}) {
  const Icon = data.icon;
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
        active
          ? "bg-violet-100 text-violet-700"
          : "bg-[#fbe9dd] text-[#c87b5a]"
      }`}
    >
      <Icon className="w-4 h-4" />
      {data.title}
    </div>
  );
}

function ComplianceColumn({ data, active }: { data: typeof colA; active?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <CompliancePill data={data} active={active} />
      </div>
      {data.rows.map((r) => (
        <div
          key={r.t}
          className="rounded-2xl p-5 border border-[#f3e3d4]"
          style={{
            background:
              "linear-gradient(180deg, #fdf2e7 0%, #fef8f1 60%, #ffffff 100%)",
          }}
        >
          <div className="font-semibold text-[14px] text-foreground">{r.t}</div>
          <p className="mt-1.5 text-[12.5px] text-muted-foreground leading-relaxed">
            {r.d}
          </p>
        </div>
      ))}
    </div>
  );
}

function ComplianceGrid() {
  return (
    <section className="px-6 py-24" style={{ background: "#fbf6ef" }}>
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Commitments</p>
        <div className="mt-4 grid md:grid-cols-[1fr_320px] gap-8 items-end">
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Everything your security,<br />
            IT, and procurement<br />
            teams ask for. By default.
          </h2>
          <p className="text-muted-foreground text-xs leading-relaxed">
            The audit reports are real, the controls are continuously monitored, and the next audit is always on the calendar.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <ComplianceColumn data={colA} active />
          <ComplianceColumn data={colB} />
          <ComplianceColumn data={colC} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- DELIVERABLES TABS ---------------- */

const teamTabs = [
  "Marketing & Growth",
  "Operations & Finance",
  "Engineering",
  "Sales & DevOps",
  "Leadership",
];

function DeliverablesTabs() {
  const [active, setActive] = useState(0);
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">The living coworker</p>
        <h2 className="font-display text-4xl md:text-5xl mt-3 leading-[1.05]">
          One coworker. Every<br />team. Real deliverables.
        </h2>
        <p className="mt-5 text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
          Viktor doesn't just answer questions. Every Viktor lands a deliverable: a brief, a
          deck, a pipeline, a rollout plan, a Linear ticket, a campaign brief, ops fixes, data
          backfills, code reviews, ops fixes, real backfills.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2 rounded-full bg-secondary p-1.5 max-w-3xl mx-auto">
          {teamTabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition ${
                active === i ? "bg-white shadow-sm text-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-[32px] bg-gradient-to-br from-violet-400 via-violet-500 to-indigo-600 p-8 md:p-12 text-left relative overflow-hidden min-h-[420px]">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
            <div>
              <h3 className="font-display text-white text-3xl md:text-4xl leading-[1.1]">
                Audit campaigns, compare engagement, and ship ranked recommendations.
              </h3>
            </div>
            <div className="space-y-3">
              <ChatBubble
                name="Viktor"
                role="• Just now"
                text="Audit our Google Ads account and flag underperforming campaigns."
                bgClass="bg-white/15"
                nameClass="text-white"
                textClass="text-white"
              />
              <ChatBubble
                name="Viktor"
                role="• Just now"
                text="I looked at campaigns above 1k spend (CTR, CPC, ROAS). Filtering past 30. I clustered MOFU funnels: 7CV with low CRT, high CAC, and weak retention is the dropoff."
                bgClass="bg-white"
                nameClass="text-foreground"
                textClass="text-foreground/80"
              />
              <ChatBubble
                name="Tim"
                role="• Just now"
                text="Top campaigns: drop bandwidth on the bottom 10 underperforming campaigns and reallocate."
                bgClass="bg-white"
                nameClass="text-foreground"
                textClass="text-foreground/80"
              />
              <ChatBubble
                name="Viktor"
                role="• Just now"
                text="Confirmed. I've drafted the cuts as a 'cuts-engagement' Doc, sorted ranked, and ran an Ad Tag Manager rollout sheet, plus a full breakdown in the thread."
                bgClass="bg-white"
                nameClass="text-foreground"
                textClass="text-foreground/80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ name, role, text, bgClass, nameClass, textClass }: {
  name: string; role: string; text: string; bgClass: string; nameClass: string; textClass: string;
}) {
  return (
    <div className={`rounded-2xl ${bgClass} px-4 py-3`}>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-violet-600" />
        <span className={`text-[12px] font-semibold ${nameClass}`}>{name}</span>
        <span className={`text-[11px] ${nameClass} opacity-60`}>{role}</span>
      </div>
      <p className={`mt-1.5 text-[12.5px] leading-relaxed ${textClass}`}>{text}</p>
    </div>
  );
}

/* ---------------- SECURITY ALLY ---------------- */

const allyCards = [
  {
    icon: ShieldCheck,
    title: "Credentials never touch the AI",
    body: "Connect tools through OAuth or scoped keys. Viktor never sees secrets, only signed tokens.",
  },
  {
    icon: UserCheck,
    title: "Sensitive actions wait for human approval",
    body: "Mass, money-moving, customer-facing, or production-impacting steps wait for explicit Slack approval.",
  },
  {
    icon: Database,
    title: "Your data never trains a model",
    body: "Skills, memory, and outputs stay scoped to your workspace. Not training fodder.",
  },
];

const badges = ["SOC 2 attested", "GDPR aligned", "CCPA compliant", "CASA Tier 3 verified"];

function SecurityAlly() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Security & Compliance</p>
        <h2 className="font-display text-3xl md:text-5xl mt-3 leading-[1.05]">
          Built so your security team<br />
          becomes an ally, not a blocker.
        </h2>
        <p className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto">
          The same controls that make Viktor enterprise-ready, plain in plain English.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-5 text-left">
          {allyCards.map((c) => (
            <div key={c.title} className="rounded-3xl bg-card border border-border p-7">
              <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                <c.icon className="w-4.5 h-4.5" />
              </div>
              <div className="mt-4 font-semibold text-[15px]">{c.title}</div>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {badges.map((b, i) => (
            <div key={b} className="flex items-center gap-2 text-[13px] text-foreground/80">
              <span className={`w-3 h-3 rounded-full ${["bg-violet-500", "bg-violet-300", "bg-violet-200", "bg-foreground/70"][i]}`} />
              {b}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition">
            Read full Security model
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ADD IN 2 MINUTES ---------------- */

const onboardingSteps = [
  { icon: Plug, title: "Install from Slack App Directory", body: "Approved app, listed in the directory. One-click install — no IT ticket required." },
  { icon: Boxes, title: "Connect tools with OAuth", body: "Each teammate connects their own tools via OAuth. Viktor acts only as them." },
  { icon: Settings2, title: "Set admin policies", body: "Set SCIM, approvals, scopes, retention, and PII redaction in minutes — not weeks." },
];

function AddInTwoMinutes() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Onboarding</p>
        <h2 className="font-display text-3xl md:text-5xl mt-3 leading-[1.05]">
          You can add Viktor in 2 minutes.
        </h2>
        <p className="mt-4 text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
          Each step is its own Slack App Directory. Connect tools as you would expect, with no
          token, no admin paperwork, no enable-for-everyone procurement that you'd run
          everywhere else for procurement projects when you adopt a plan.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-5 text-left">
          {onboardingSteps.map((s, i) => (
            <div key={s.title} className="rounded-3xl bg-gradient-to-br from-[oklch(0.96_0.05_30)] via-[oklch(0.94_0.06_320)] to-[oklch(0.93_0.08_290)] border border-border p-6">
              <div className="rounded-2xl bg-white aspect-[1.1] flex items-center justify-center mb-5 border border-border/60">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                {i === 1 && (
                  <span className="absolute mt-20 ml-32 text-[10px] text-foreground/40">OAuth</span>
                )}
              </div>
              <div className="font-semibold text-[15px]">{s.title}</div>
              <p className="mt-1.5 text-[12.5px] text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ENTERPRISE FAQ ---------------- */

const faqs = [
  { q: "What does the Enterprise plan include?", a: "SSO via SAML, SCIM provisioning, audit log export, US/EU data residency, custom retention policies, a signed DPA, priority support, and a dedicated Slack channel with our engineering team — plus everything in the Team plan." },
  { q: "How long does Viktor to install?", a: "Most teams are live in under 10 minutes: install from the Slack App Directory, connect OAuth for the tools you need, and set admin policies." },
  { q: "Do we control which tools Viktor has access to?", a: "Yes. Admins decide which integrations are enabled, which actions require approval, and which scopes each integration uses. Anything can be revoked instantly." },
  { q: "Does Viktor support SSO?", a: "Yes — SAML 2.0 with Okta, Google Workspace, OneLogin, JumpCloud, Microsoft Entra ID, or any standards-compliant IdP. SCIM provisioning is included on Enterprise." },
];

function EnterpriseFAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[1fr_1.4fr] gap-12">
        <div>
          <h2 className="font-display text-3xl md:text-4xl leading-[1.05]">
            Questions people ask<br />before adding Viktor
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl bg-card border border-border">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-[14px]">{f.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 -mt-1 text-[13px] text-muted-foreground leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 text-center">
            <button className="px-5 py-2.5 rounded-full bg-secondary text-foreground text-[13px] font-semibold hover:bg-secondary/80 transition">
              View all FAQ content
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- START FREE CTA ---------------- */

const startFeatures = [
  "SAML + integrations",
  "Users and Teams",
  "Approvals, customizable scopes",
  "Costs and PII reviews",
  "SOC 2 compliance",
];

function StartFreeCTA() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[40px] bg-gradient-to-br from-violet-400 via-violet-500 to-indigo-600 p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-white text-3xl md:text-4xl leading-[1.05]">
              Start free.<br />Pay only when you're ready.
            </h2>
            <p className="mt-4 text-white/85 text-sm leading-relaxed max-w-md">
              Every Viktor Team integration is $30 / month per seat. Unlimited
              tasks lived and aided with no admin. Bring your team start when
              it makes 30 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GetStartedButton className="px-5 py-3" />
              <button className="px-5 py-3 rounded-full bg-white/15 text-white text-sm font-semibold border border-white/20 hover:bg-white/20 transition">
                See all plans
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {startFeatures.map((f) => (
              <div key={f} className="flex items-center gap-3 text-white text-[14px]">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
