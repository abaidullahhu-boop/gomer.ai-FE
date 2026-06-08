import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ShieldCheck, Lock, FileCheck, KeyRound, Globe, Eye, Database,
  CheckCircle2, XCircle, Github,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FAQSection } from "@/components/site/FAQSection";
import { StartFreeSection } from "@/components/site/StartFreeSection";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — Viktor" },
      { name: "description", content: "The security behind your AI coworker. Independently audited, continuously verified. SOC 2 Type II, GDPR, encryption everywhere, and zero training on your data." },
      { property: "og:title", content: "Security — Viktor" },
      { property: "og:description", content: "Independently audited, continuously verified. Enterprise-grade security for your AI coworker." },
      { property: "og:url", content: "/security" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Security — Viktor",
        description: "The security behind your AI coworker.",
      }),
    }],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <div className="min-h-screen">
      <SecurityHero />
      <AuditedTable />
      <DoesDoesNot />
      <RisksHandled />
      <Pillars />
      <ZeroSecrets />
      <FoundSomething />
      <FAQSection />
      <StartFreeSection />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */

function HeroBadge({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2 text-white/85 text-sm">
      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5" />
      </span>
      {text}
    </div>
  );
}

function SecurityHero() {
  return (
    <section className="relative bg-hero pt-6 pb-24 overflow-visible rounded-b-[40px]">
      <Nav />
      <div className="relative mx-auto max-w-4xl px-6 pt-20 text-center">
        <h1 className="font-display text-white text-5xl md:text-7xl leading-[1.02] tracking-tight">
          The security behind<br />
          your <span className="text-[oklch(0.82_0.16_70)]">AI coworker.</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-white/80 leading-relaxed">
          Viktor takes real actions across your stack. That power demands real
          security — independently audited, continuously verified, and built in
          from day one.
        </p>

        <div className="mt-10">
          <button className="px-8 py-4 rounded-full bg-white text-foreground font-semibold text-sm shadow-xl hover:bg-white/95 transition">
            Get Started for Free
          </button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <HeroBadge icon={ShieldCheck} text="SOC 2 Type II" />
          <HeroBadge icon={FileCheck} text="GDPR & CCPA" />
          <HeroBadge icon={Lock} text="AES-256 encryption" />
          <HeroBadge icon={Eye} text="Zero training on your data" />
        </div>
      </div>

      {/* App directory card — floats half over hero, half over next section */}
      <div className="relative mx-auto w-full max-w-[42rem] px-6 mt-20 -mb-[260px] z-20">
        <div
          className="relative rounded-[28px]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.15) 75%, rgba(255,255,255,0.9) 100%)",
            padding: "1px",
            boxShadow: "0 16px 32px 0 rgba(26,24,41,0.16)",
          }}
        >
          {/* Blurred outer glow border */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 rounded-[30px] opacity-90"
            style={{
              background:
                "linear-gradient(-56deg, rgb(255,255,255) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgb(255,255,255) 100%)",
              filter: "blur(10px)",
            }}
          />
          <div
            className="relative rounded-[27px] p-7 md:p-9 text-left overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.95) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >

            {/* App rows */}
            <div className="space-y-2">
              <AppRow
                logo={<span className="text-orange-500 text-2xl leading-none">✱</span>}
                logoBg="bg-orange-50"
                title="Zapier"
                desc="Automate AI Workflows, Agents, and Apps"
              />
              <div
                className="rounded-2xl p-3 flex items-center gap-3 border border-violet-200/70"
                style={{
                  background:
                    "linear-gradient(90deg, #f5f0ff 0%, #ffffff 55%, #eef2ff 100%)",
                  boxShadow: "0 6px 18px 0 rgba(109, 92, 246, 0.12)",
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white font-display text-lg shrink-0">V</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">Viktor</span>
                    <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-600 text-[10px] font-semibold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      Salesforce Partner
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Your AI employee in Slack</div>
                </div>
                <span className="text-foreground/40 text-sm pr-1">↗</span>
              </div>
              <AppRow
                logo={<Github className="w-5 h-5 text-foreground" />}
                logoBg="bg-zinc-100"
                title="GitHub"
                desc="GitHub Copilot's AI-powered dev tools"
              />
            </div>

            <div className="mt-8 pt-6">
              <div className="font-display text-2xl md:text-[28px] text-foreground leading-snug">
                Approved by Slack. Listed in the App Directory.
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Viktor is published in the official Slack App Directory. That
                means our OAuth scopes, security posture, and store listing
                have been reviewed and approved by Slack before we were allowed
                to ship to customers through their store.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppRow({ logo, logoBg, title, desc }: { logo: React.ReactNode; logoBg: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl p-3 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${logoBg} flex items-center justify-center shrink-0`}>{logo}</div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

/* ---------------- AUDITED TABLE ---------------- */

const auditRows = [
  { icon: ShieldCheck, dot: "from-cyan-400 to-blue-500", name: "SOC 2 Type 1", badge: "Certified", what: "Independent attestation that our security controls operate as designed. Type II in progress.", who: "Report available under NDA." },
  { icon: Lock, dot: "from-indigo-600 to-indigo-900", name: "GDPR", badge: "Aligned", what: "EU data protection requirements met.", who: "DPA available on request." },
  { icon: Globe, dot: "from-blue-400 to-indigo-500", name: "CCPA", badge: "Compliant", what: "California Consumer Privacy Act requirements met.", who: "Privacy documentation available." },
  { icon: FileCheck, dot: "from-violet-300 to-violet-500", name: "CASA Tier 3", badge: "Certified", what: "Cloud Application Security Assessment, the highest tier required for Google API access.", who: "Attestation included in compliance pack." },
  { icon: KeyRound, dot: "from-fuchsia-400 to-pink-500", name: "Slack App Directory", badge: "Listed", what: "OAuth scopes and security posture vetted before shipment through the Slack store.", who: "Public App Directory listing." },
  { icon: Database, dot: "from-zinc-300 to-zinc-500", name: "ISO 27001", badge: "In progress", what: "ISMS controls implementation and evidence collection in progress.", who: "Controls overview available today; audit evidence shared after certification." },
];

function AuditedTable() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Compliance</p>
        <div className="mt-4 grid md:grid-cols-[1fr_300px] gap-8 items-end">
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Independently audited.<br />Continuously verified.
          </h2>
          <p className="text-muted-foreground text-xs leading-relaxed">
            The audit reports are real, the controls are continuously monitored,
            and the next audit is always on the calendar.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          <div className="hidden md:grid grid-cols-[210px_150px_1fr_1fr] gap-6 px-7 py-2 text-[11px] uppercase tracking-wide text-muted-foreground">
            <div>Standard</div>
            <div>Status</div>
            <div>Coverage</div>
            <div>Documentation</div>
          </div>
          {auditRows.map((r) => (
            <div key={r.name} className="grid md:grid-cols-[210px_150px_1fr_1fr] gap-3 md:gap-6 px-7 py-5 items-center rounded-2xl bg-card border border-border/60 shadow-sm">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${r.dot} text-white flex items-center justify-center shrink-0`}>
                  <r.icon className="w-4 h-4" />
                </span>
                <span className="font-semibold text-sm">{r.name}</span>
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-[11px] font-semibold">{r.badge}</span>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">{r.what}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{r.who}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------------- WHAT VIKTOR DOES / DOES NOT ---------------- */

const doesItems = [
  { t: "Encrypts everything", d: "TLS 1.2+ in transit, AES-256 at rest. Secrets in dedicated vaults." },
  { t: "Authenticates with SSO", d: "SAML SSO across Okta, Google Workspace, OneLogin, and any SAML 2.0 IdP." },
  { t: "Data residency options", d: "US-hosted by default. EU data residency available on Enterprise accounts." },
  { t: "Revokes instantly", d: "Admins can disconnect any integration, action, or user to kill a running task in one click." },
];

const doesNotItems = [
  { t: "Train on your data", d: "Skills, integrations, and memory are walled off per workspace. No cross-tenant access." },
  { t: "Read your secrets", d: "Skills, integrations, and memory are walled off per workspace. No cross-tenant access." },
  { t: "Act without approval", d: "Skills, integrations, and memory are walled off per workspace. No cross-tenant access." },
  { t: "Share across workspaces", d: "Skills, integrations, and memory are walled off per workspace. No cross-tenant access." },
];

function CapHeader({ active, label }: { active?: boolean; label: string }) {
  return (
    <div className="relative pb-8">
      <div
        className={`relative rounded-[28px] h-32 ${
          active
            ? "bg-[radial-gradient(120%_120%_at_50%_0%,#ffb89a_0%,#c4b5fd_45%,#8b7cf6_100%)]"
            : "bg-[radial-gradient(120%_120%_at_50%_0%,#e5e7eb_0%,#9ca3af_55%,#6b7280_100%)]"
        }`}
      />
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center ring-4 ring-background">
          <span
            className={`font-display text-2xl ${
              active
                ? "bg-[linear-gradient(135deg,#ff8a4c,#8b7cf6,#1e1b6b)] bg-clip-text text-transparent"
                : "text-zinc-500"
            }`}
          >
            v
          </span>
        </div>
        <span
          className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
            active ? "bg-violet-200/70 text-violet-800" : "bg-zinc-200 text-zinc-600"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}


function DoesDoesNot() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-violet-600">Data handling</p>
          <h2 className="font-display text-4xl md:text-6xl mt-4 leading-tight">
            What Viktor does.<br />What Viktor does not.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            The audit reports are real, the controls are continuously monitored,
            and the next audit is always on the calendar.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div>
            <CapHeader active label="Does" />
            <ul className="mt-6 space-y-5">
              {doesItems.map((i) => (
                <li key={i.t} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">{i.t}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{i.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <CapHeader label="Does not" />
            <ul className="mt-6 space-y-5">
              {doesNotItems.map((i) => (
                <li key={i.t} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-foreground/40 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">{i.t}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{i.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AI BRINGS NEW RISKS ---------------- */

const riskTabs = [
  { label: "Prompt injection", body: "Viktor treats external content as untrusted input. Tool calls are scoped, validated, and gated behind approval so a malicious page or message can't hijack an action." },
  { label: "Data exfiltration", body: "Outbound actions are logged and policy-checked. Viktor can't quietly ship your data somewhere new — every destination is known and auditable." },
  { label: "Over-permissioned access", body: "Least-privilege by default. Viktor requests the minimum scopes per task and you approve each integration before it's used." },
  { label: "Hallucinated actions", body: "High-impact steps require confirmation, and Viktor shows its plan before executing so nothing irreversible happens on a guess." },
];

function RisksHandled() {
  const [active, setActive] = useState(0);
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[40px] bg-startfree-card p-8 md:p-14">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <p className="text-white/70 text-sm">The new threat model</p>
              <h2 className="font-display text-white text-4xl md:text-5xl mt-3 leading-[1.05]">
                AI brings new<br />risks, and we<br />know how to<br />handle them
              </h2>
              <div className="mt-8 space-y-2.5">
                {riskTabs.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setActive(i)}
                    className={`w-full text-left rounded-full px-5 py-3 text-sm font-semibold transition ${
                      active === i ? "bg-white text-foreground" : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 border border-white/15 p-8 min-h-[260px] flex items-center">
              <p className="text-white/90 text-lg leading-relaxed">{riskTabs[active].body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PILLARS (3 cards) ---------------- */

const pillars = [
  { icon: KeyRound, title: "Access you control", body: "Granular scopes, SSO, SAML, and SCIM. Grant exactly what Viktor needs, revoke in one click, and provision your whole team automatically." },
  { icon: Eye, title: "Visibility you can trust", body: "A full audit log of every action, queryable and exportable. Know what Viktor did, when, and on whose behalf — always." },
  { icon: ShieldCheck, title: "Protection that's tested", body: "Continuous penetration testing, encryption everywhere, and isolated runtimes. Security that's proven, not promised." },
];

function Pillars() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-violet-600">Proven, not promised</p>
          <h2 className="font-display text-3xl md:text-5xl mt-4 leading-tight">
            Independently audited.<br />
            AI brings new risks, and we know how to handle them
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
            Three principles guide every security decision we make — control,
            visibility, and protection that's continuously tested.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-3xl bg-card border border-border p-7">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-white" />
              </div>
              <div className="mt-4 font-semibold text-lg">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ZERO SECRETS ---------------- */

const intgTiles = ["Slack", "Teams", "Notion", "Linear", "GitHub", "Stripe", "HubSpot", "Drive", "Figma", "Asana", "Zapier", "Calendly"];

function ZeroSecrets() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[40px] bg-ask-card p-8 md:p-14 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-white text-4xl md:text-5xl leading-[1.05]">
                3,000+<br />integrations.<br />Zero secrets in<br />chat.
              </h2>
              <div className="mt-8 space-y-5 max-w-md">
                <div>
                  <div className="text-white font-semibold text-sm">OAuth first</div>
                  <p className="text-white/75 text-sm leading-relaxed">Viktor connects through OAuth wherever possible — no passwords pasted into a message, ever.</p>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Encrypted vault</div>
                  <p className="text-white/75 text-sm leading-relaxed">When a credential is needed, it's stored in an encrypted vault, scoped per integration and never echoed back.</p>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Revoke any time</div>
                  <p className="text-white/75 text-sm leading-relaxed">Disconnect a tool and its access is gone instantly — across every workspace and thread.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {intgTiles.map((t) => (
                <div key={t} className="aspect-square rounded-2xl bg-white/10 border border-white/15 flex flex-col items-center justify-center gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-white/20" />
                  <div className="text-[9px] font-medium text-white/80">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOUND SOMETHING ---------------- */

function FoundSomething() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[40px] bg-startfree-card px-6 py-20 text-center">
          <div className="relative">
            <p className="text-white/70 text-sm">Responsible disclosure</p>
            <h2 className="font-display text-white text-4xl md:text-6xl mt-3">Found something? Tell us.</h2>
            <p className="mt-4 mx-auto max-w-md text-white/80 leading-relaxed">
              We run a responsible disclosure program and reward valid reports.
              Reach our security team directly — we read every message.
            </p>
            <div className="mt-10">
              <button className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground shadow-lg hover:bg-white/95 transition">
                Report a vulnerability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
