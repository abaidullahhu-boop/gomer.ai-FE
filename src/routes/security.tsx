import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { PageMeta } from "@/components/PageMeta";
import {
  KeyRound,
  BadgeCheck, Rocket, Shield, type LucideIcon,
} from "lucide-react";
import securityHeroIllustration from "@/assets/images/hero-illustration.avif";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FAQSection } from "@/components/site/FAQSection";
import { StartFreeSection } from "@/components/site/StartFreeSection";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import soc2Badge from "@/assets/images/soc2.svg";
import gdprBadge from "@/assets/images/gdpr.svg";
import ccpaBadge from "@/assets/images/ccpa.svg";
import casaTier3Badge from "@/assets/images/casa-tier-3.svg";
import slackLogo from "@/assets/images/slack.svg";
import iso27001Badge from "@/assets/images/iso27001.svg";
import intgTilesImage from "@/assets/images/integrations.avif";

import riskTabsBg from "@/assets/images/security-risk-tabs-bg.png";
import riskTabsCredentialsVisual from "@/assets/images/security/risk-tabs-credentials-visual.webp";
import riskTabsApprovalsVisual from "@/assets/images/security/risk-tabs-approvals-visual.webp";
import riskTabsNoTrainingVisual from "@/assets/images/security/risk-tabs-no-training-visual.webp";
import riskTabsIsolationVisual from "@/assets/images/security/risk-tabs-isolation-visual.webp";
import viktorSlackAvatar from "@/assets/images/viktor-slack-avatar (1).svg";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Security — Viktor"
        description="The security behind your AI coworker. Independently audited, continuously verified. SOC 2 Type II, GDPR, encryption everywhere, and zero training on your data."
        ogTitle="Security — Viktor"
        ogDescription="Independently audited, continuously verified. Enterprise-grade security for your AI coworker."
        ogUrl="/security"
        canonical="/security"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Security — Viktor",
          description: "The security behind your AI coworker.",
        }}
      />
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

function HeroBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <li className="flex items-center gap-4 whitespace-nowrap">
      <img
        src={icon}
        alt=""
        loading="lazy"
        width={40}
        height={40}
        decoding="async"
        className="size-10 shrink-0"
        aria-hidden
      />
      <span className="body-small text-white font-medium">{text}</span>
    </li>
  );
}

function SecurityHero() {
  return (
    <section className="border-0 py-0!" id="hero">
      <div className="relative w-full overflow-hidden rounded-b-section bg-primitive-main-beige">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-[44rem] w-screen max-w-none -translate-x-1/2 rounded-b-section gradient-dark-2 sm:h-[48rem] lg:h-[56.25rem]"
        />
        <Nav />
        <div className="hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-5 pb-16 text-center sm:px-10 sm:pb-20 md:px-14 lg:gap-20 lg:px-20 lg:pb-20">
          <div className="flex w-full flex-col items-center gap-8 lg:gap-12 mt-16">
            <div className="flex w-full max-w-[55.5rem] flex-col items-center gap-8">
              <h1 className="font-heading text-5xl leading-[1.1] font-bold tracking-[-2.4px] text-balance text-white max-sm:text-[2.625rem] sm:text-6xl sm:tracking-[-3.6px] lg:text-7xl xl:text-[80px] xl:tracking-[-4.8px]">
                The security behind your{" "}
                <span className="text-primitive-orange-500">AI employee.</span>
              </h1>
              <div className="flex w-full max-w-[34.1875rem] flex-col items-center gap-8">
                <p className="max-w-[34.1875rem] body-main text-white sm:text-lg sm:leading-[1.4] font-medium">
                  Built so your credentials never touch the AI, every sensitive action waits for approval, and your data never trains a model.
                </p>
                <GetStartedButton
                  shadow
                  className="inline-flex h-14 min-h-14 w-full items-center justify-center border border-white bg-white px-10 text-base tracking-[-0.01em] text-primitive-main-dark transition-all hover:opacity-90 active:translate-y-px sm:w-auto"
                />
              </div>
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:flex-nowrap lg:gap-8">
              <HeroBadge icon={soc2Badge} text="SOC 2 compliant." />
              <HeroBadge icon={gdprBadge} text="GDPR aligned" />
              <HeroBadge icon={ccpaBadge} text="CCPA compliant" />
              <HeroBadge icon={casaTier3Badge} text="CASA Tier 3 certified" />
            </ul>
          </div>

          <div className="flex w-full max-w-[42rem] flex-col items-center gap-8 lg:gap-12">
            <div className="w-full rounded-[32px] shadow-[0_16px_32px_0_rgba(26,24,41,0.16)]">
              <div
                className="relative h-full w-full overflow-hidden rounded-[32px]"
                style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[20px] z-0"
                  style={{
                    borderRadius: "inherit",
                    background: "rgb(255, 255, 255)",
                    filter: "blur(10px)",
                  }}
                />
                <div className="relative z-[1] h-full w-full rounded-[inherit]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
                    style={{
                      background:
                        "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
                    style={{
                      background:
                        "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
                      mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
                      WebkitMask:
                        "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
                      padding: "1px",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
                    style={{ filter: "blur(5px)" }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit]"
                      style={{
                        background:
                          "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
                        mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
                        WebkitMask:
                          "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
                        padding: "4px",
                      }}
                    />
                  </div>
                  <div className="relative z-[2] flex h-full w-full flex-col justify-between">
                    <div className="flex min-h-[26rem] flex-col rounded-[inherit] pt-16 lg:min-h-[28.9375rem]">
                      <div className="relative mx-auto w-full max-w-[438px] overflow-hidden rounded-t-[inherit]">
                        <img
                          src={securityHeroIllustration}
                          alt=""
                          aria-hidden
                          width={502}
                          height={264}
                          decoding="async"
                          className="h-auto w-full max-w-full"
                        />
                      </div>
                      <div className="mt-auto flex flex-col gap-4 p-6 text-left sm:p-8">
                        <h2 className="font-heading h5 text-primitive-main-dark">
                          Approved by Slack. Listed in the App Directory.
                        </h2>
                        <p className="body-main text-secondary font-medium">
                          Viktor is published in the official Slack App Directory. That
                          means our OAuth scopes, security posture, and store listing
                          have been reviewed and approved by Slack before we were allowed
                          to ship to customers through their store.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:px-8">
              <p className="text-left body-main text-secondary font-medium">
                One-click install from inside Slack. No infra to provision. No long
                procurement detour just to start a pilot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AUDITED TABLE ---------------- */

const auditRows = [
  { logo: soc2Badge, name: "SOC 2 Type 1", badge: "Certified", what: "Independent attestation that our security controls operate as designed. Type II in progress.", who: "Report available under NDA." },
  { logo: gdprBadge, name: "GDPR", badge: "Aligned", what: "EU data protection requirements met.", who: "DPA available on request." },
  { logo: ccpaBadge, name: "CCPA", badge: "Compliant", what: "California Consumer Privacy Act requirements met.", who: "Privacy documentation available." },
  { logo: casaTier3Badge, name: "CASA Tier 3", badge: "Certified", what: "Cloud Application Security Assessment, the highest tier required for Google API access.", who: "Attestation included in compliance pack." },
  { logo: slackLogo, name: "Slack App Directory", badge: "Listed", what: "OAuth scopes and security posture vetted before shipment through the Slack store.", who: "Public App Directory listing." },
  { logo: iso27001Badge, name: "ISO 27001", badge: "In progress", what: "ISMS controls implementation and evidence collection in progress.", who: "Controls overview available today; audit evidence shared after certification." },
];

function AuditedTable() {
  return (
    <section className="p-2 sm:px-6 py-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow-primitive-purple-700 font-medium">Compliance</p>
        <div className="mt-4 grid md:grid-cols-[1fr_300px] gap-8 items-end">
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Independently audited.<br />Continuously verified.
          </h2>
          <p className="text-secondary text-md leading-relaxed font-medium">
            The audit reports are real, the controls are continuously monitored,
            and the next audit is always on the calendar.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          <div className="hidden lg:grid grid-cols-[minmax(0,260px)_minmax(0,180px)_minmax(0,1fr)_minmax(0,340px)] gap-x-5 px-2 sm:px-6 py-2 text-[11px] uppercase tracking-wide text-muted-foreground">
            <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0 object-contain"> <g clip-path="url(#security-compliance-standard-clip0_6346_2060)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.44621 0.214459C8.33777 0.0789084 8.17359 0 8 0C7.82641 0 7.66223 0.0789084 7.55379 0.214459C6.67889 1.30809 5.77898 1.5331 5.06135 1.47227C4.29622 1.40744 3.67592 1.01065 3.45168 0.786415C3.22853 0.563258 2.86672 0.563258 2.64355 0.786415C2.31969 1.11028 1.64919 1.78101 1.06628 2.94683C0.483505 4.11238 0 5.74789 0 8C0 10.7007 1.36267 12.5577 3.01429 13.7965C4.64981 15.0231 6.59127 15.6654 7.86141 15.983C7.9524 16.0057 8.0476 16.0057 8.13859 15.983C9.40874 15.6654 11.3502 15.0231 12.9857 13.7965C14.6374 12.5577 16 10.7007 16 8C16 5.74789 15.5165 4.11238 14.9337 2.94683C14.3509 1.78101 13.6803 1.11028 13.3565 0.786415C13.1333 0.563258 12.7714 0.563258 12.5483 0.786415C12.3241 1.01065 11.7038 1.40744 10.9387 1.47227C10.221 1.5331 9.32112 1.30809 8.44621 0.214459Z" fill="#9693A3"></path> </g> <defs> <clipPath id="security-compliance-standard-clip0_6346_2060"> <rect width="16" height="16" fill="white"></rect> </clipPath> </defs> </svg>
              <span>Standard</span>
            </div>
            <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0 object-contain"> <g clip-path="url(#security-compliance-status-clip0_6346_2093)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.0988 2.0988C3.49767 0.699922 5.51768 0 8 0C10.4823 0 12.5023 0.699922 13.9013 2.0988C15.3001 3.49767 16 5.51768 16 8C16 10.4823 15.3001 12.5023 13.9013 13.9013C12.5023 15.3001 10.4823 16 8 16C5.51768 16 3.49767 15.3001 2.0988 13.9013C0.699922 12.5023 0 10.4823 0 8C0 5.51768 0.699922 3.49767 2.0988 2.0988ZM7.71429 2.78571C7.71429 2.62792 7.84221 2.5 8 2.5C9.72117 2.5 11.1062 2.98496 12.0606 3.93939C12.1722 4.05097 12.1722 4.23189 12.0606 4.34346L8.20203 8.20203C8.12032 8.28375 7.99743 8.30819 7.89066 8.26397C7.7839 8.21974 7.71429 8.11557 7.71429 8V2.78571Z" fill="#9693A3"></path> </g> <defs> <clipPath id="security-compliance-status-clip0_6346_2093"> <rect width="16" height="16" fill="white"></rect> </clipPath> </defs> </svg>
              <span>Status</span>
            </div>
            <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0 object-contain"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.28397 1.14383C3.60341 0.317142 5.17214 -0.080799 6.78958 0.0136424C8.63719 0.121523 10.4185 0.863782 11.8434 2.09521L12.4415 1.52473C12.784 1.19799 13.3266 1.21079 13.6534 1.55333C13.9801 1.89587 13.9673 2.43843 13.6247 2.76518L13.0256 3.3367C14.1825 4.81584 14.8363 6.62533 14.8568 8.4709C14.8748 10.091 14.4034 11.6392 13.5154 12.9182C12.8586 13.864 11.6369 14.1035 10.6531 13.5905C9.5594 13.0202 7.88935 11.9474 5.93924 10.0168L3.15943 12.5859C2.97227 12.7665 2.86376 13.0137 2.85763 13.2738C2.85144 13.536 2.94963 13.7897 3.13057 13.9794C3.31152 14.1691 3.56041 14.2792 3.82251 14.2854C4.08459 14.2915 4.33839 14.1934 4.52809 14.0125C4.87063 13.6857 5.41319 13.6985 5.73993 14.041C6.06668 14.3835 6.05388 14.9262 5.71134 15.2529C5.19265 15.7477 4.49867 16.0161 3.78205 15.9992C3.06543 15.9823 2.38489 15.6814 1.89013 15.1627C1.39536 14.644 1.12691 13.9501 1.14382 13.2334C1.16073 12.5168 1.46163 11.8362 1.98031 11.3415L1.99009 11.3322L4.75807 8.7741C2.96413 6.76762 1.98915 5.07694 1.47734 3.9712C1.01127 2.96427 1.30824 1.75517 2.28397 1.14383Z" fill="#9693A3"></path> </svg>
              <span>Coverage</span>
            </div>

            <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0 object-contain"> <g clip-path="url(#security-compliance-documentation-clip0_6346_2067)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.96189 0.0730977C6.05666 -0.00781671 6.88567 -0.0252349 8.24197 0.0394135C8.85014 0.0684023 9.37303 0.465947 9.57319 1.03333L9.77392 1.60238C9.82276 1.74082 9.95223 1.83441 10.0981 1.83765C10.2915 1.84193 10.4747 1.84579 10.6497 1.84947C11.8596 1.87491 12.6811 1.89219 13.7975 1.98957C14.957 2.09071 15.8594 3.03017 15.9266 4.18715C16.0603 6.48899 16.0073 8.36685 15.7986 10.202C15.664 11.3855 14.7535 12.3522 13.5789 12.4864C10.9665 12.785 8.38933 12.7928 5.77455 12.4939C4.60893 12.3607 3.63145 11.4509 3.48941 10.202C3.15608 7.27157 3.26338 4.34811 3.58019 1.45331C3.65813 0.741275 4.20951 0.128705 4.96189 0.0730977ZM2.06998 10.3625C2.28985 12.2954 3.80949 13.7062 5.61232 13.9122C7.40229 14.1169 10.0119 14.1835 12.3622 14.1171C12.0328 14.9993 11.2508 15.6618 10.2934 15.7712C7.68103 16.0698 5.10389 16.0776 2.48912 15.7786C1.32349 15.6455 0.346022 14.7357 0.203969 13.4867C-0.129359 10.5563 -0.0220567 7.63286 0.29476 4.73806C0.372687 4.02602 0.924077 3.41345 1.67645 3.35784C1.77762 3.35037 1.87653 3.34343 1.97379 3.33705C1.80768 5.64626 1.80064 7.99456 2.06998 10.3625Z" fill="#9693A3"></path> </g> <defs> <clipPath id="security-compliance-documentation-clip0_6346_2067"> <rect width="16" height="16" fill="white"></rect> </clipPath> </defs> </svg>
              <span>Documentation</span>
            </div>

          </div>
          {auditRows.map((r) => (
            <div key={r.name} className="relative z-[2] flex h-full w-full flex-col justify-between">
              <div className="flex items-center rounded-2xl bg-white/88 p-4 shadow-[inset_2.702px_2.702px_1.351px_0px_white,inset_-2.702px_-2.702px_1.351px_0px_white,inset_0px_0px_8.106px_0px_rgba(255,255,255,0.5),inset_0px_0px_43.232px_0px_#f2f2f2] backdrop-blur-[12px] sm:min-h-24 sm:px-6">
                <div className="grid w-full gap-x-5 gap-y-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:grid-cols-[minmax(0,260px)_minmax(0,180px)_minmax(0,1fr)_minmax(0,340px)] lg:items-center">
                  <div className="flex min-w-0 items-center gap-3 md:pr-4 lg:pr-0">
                    <img src={r.logo} alt="" className="size-10 shrink-0 object-contain" aria-hidden />
                    <p className="min-w-0 font-heading text-base max-sm:text-[0.9375rem] leading-[1.1] font-bold tracking-[-0.06em] text-primary">{r.name}</p>
                  </div>
                  <div className="flex min-w-0 items-center gap-3 md:justify-self-start">
                    <p className="text-sm font-medium text-secondary lg:hidden">Status</p>
                    <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-primitive-purple-100 px-5 text-[14px] leading-[1.3] font-medium text-violet-700">{r.badge}</span>
                  </div>
                  <div className="min-w-0 space-y-1 md:col-span-2 lg:col-span-1">
                    <p className="text-sm font-medium text-secondary lg:hidden">Coverage</p>
                    <p className="text-base font-medium text-primary">{r.what}</p>
                  </div>
                  <div className="min-w-0 space-y-1 md:col-span-2 lg:col-span-1">
                    <p className="text-sm font-medium text-secondary lg:hidden">Documentation</p>
                    <p className="text-base font-medium text-primary">{r.who}</p>
                  </div>
                </div>
              </div>
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

const insetCardShadow =
  "rgb(255,255,255) 2.702px 2.702px 1.351px -2.702px inset, rgb(255,255,255) -2.702px -2.702px 1.351px -2.702px inset, rgba(255,255,255,0.5) 0px 0px 8.106px 0px inset, rgb(242,242,242) 0px 0px 43.232px 0px inset";

function DoesCheckIcon() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(145.58%_104.75%_at_52.06%_-4.35%,#ffbb98_0%,#ffbb98_6.43%,#9e84ff_50.71%,#6e47ff_80.36%,#150079_100%)]">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-white" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
    </div>
  );
}

function DoesNotXIcon() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/15">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-white" aria-hidden="true">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </div>
  );
}

function CapHeader({ active, label }: { active?: boolean; label: string }) {
  return (
    <div className="relative pb-8">
      <div
        className={`relative rounded-[28px] h-32 ${
          active
            ? "bg-[radial-gradient(120%_120%_at_50%_0%,#ffb89a_0%,#c4b5fd_45%,#8b7cf6_100%)]"
            : "bg-[radial-gradient(120%_120%_at_50%_0%,#f3f4f6_0%,#9ca3af_45%,#1f2937_100%)]"
        }`}
      />
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center ring-4 ring-background p-1">
          <img
            src={viktorSlackAvatar}
            alt=""
            aria-hidden
            className={`w-14 h-14 rounded-xl object-cover ${
              active ? "" : "grayscale brightness-[0.55]"
            }`}
          />
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
    <section className="px-2 sm:px-6 py-2">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-eyebrow-primitive-purple-700">Data handling</p>
          <h2 className="font-display text-4xl md:text-6xl mt-4 leading-tight">
            What Viktor does.<br />What Viktor does not.
          </h2>
          <p className="mt-5 text-secondary max-w-xl mx-auto font-medium">
            The audit reports are real, the controls are continuously monitored,
            and the next audit is always on the calendar.
          </p>
        </div>

        <div className="mt-14">
          <div className="grid md:grid-cols-2 gap-6">
            <CapHeader active label="Does" />
            <CapHeader label="Does not" />
          </div>
          <div className="mt-6 space-y-4">
            {doesItems.map((item, index) => {
              const notItem = doesNotItems[index];
              return (
                <div key={item.t} className="grid md:grid-cols-2 gap-6">
                  <div
                    className="flex h-full items-start gap-3 rounded-3xl p-5"
                    style={{ boxShadow: insetCardShadow }}
                  >
                    <DoesCheckIcon />
                    <div>
                      <div className="font-medium text-xl">{item.t}</div>
                      <div className="mt-1 text-md font-medium text-secondary leading-relaxed">{item.d}</div>
                    </div>
                  </div>
                  <div
                    className="flex h-full items-start gap-3 rounded-3xl p-5"
                    style={{ boxShadow: insetCardShadow }}
                  >
                    <DoesNotXIcon />
                    <div>
                      <div className="font-medium text-xl">{notItem.t}</div>
                      <div className="mt-1 text-md font-medium text-secondary leading-relaxed">{notItem.d}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AI BRINGS NEW RISKS ---------------- */

const RISK_CYCLE_MS = 6000;
const RISK_PROGRESS_R = 8;
const RISK_PROGRESS_CIRCUMFERENCE = 2 * Math.PI * RISK_PROGRESS_R;

const riskTabs: {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  lead: string;
  subhead: string;
  visual: string;
  visualAlt: string;
}[] = [
  {
    id: "credentials",
    label: "Credentials",
    icon: KeyRound,
    description: "Your credentials are invisible to the AI",
    lead: "A backend tool gateway injects your API keys and OAuth tokens at execution time. The AI model itself never sees them.",
    subhead: "Not a policy. The architecture.",
    visual: riskTabsCredentialsVisual,
    visualAlt: "Model context preview and tool gateway security illustration",
  },
  {
    id: "approvals",
    label: "Approvals",
    icon: BadgeCheck,
    description: "You approve every sensitive action",
    lead: "Before Viktor sends an email, pushes code, modifies an ad campaign, or charges a card, it shows you exactly what it wants to do and waits for approval or rejection in Slack.",
    subhead: "Admins choose which action types require approval. Defaults are conservative.",
    visual: riskTabsApprovalsVisual,
    visualAlt: "Slack approval flow security illustration",
  },
  {
    id: "no-training",
    label: "No training",
    icon: Rocket,
    description: "Your data never trains a model",
    lead: "Conversations, files, business data, and outputs stay in your workspace. We do not use customer data to train Viktor, and our model providers do not either.",
    subhead: "Enterprise customers can turn persistent memory off per workspace or channel.",
    visual: riskTabsNoTrainingVisual,
    visualAlt: "No training and inference receipt security illustration",
  },
  {
    id: "isolation",
    label: "Isolation",
    icon: Shield,
    description: "Your workspace is fully isolated",
    lead: "Every workspace runs in a sandboxed execution environment with no cross-tenant access. Skills, integrations, and memory are walled off per workspace.",
    subhead: "What happens in your Slack stays in your Slack.",
    visual: riskTabsIsolationVisual,
    visualAlt: "Isolated workspace security illustration",
  },
];

function RiskTabGlassPill({
  top,
  height,
  cycleKey,
}: {
  top: number;
  height: number;
  cycleKey: number;
}) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-0 z-0 w-full overflow-hidden rounded-full transition-[top,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ top, height, opacity: height > 0 ? 1 : 0 }}
    >
      <div className="relative h-full w-full rounded-full bg-white/10 backdrop-blur-[22px] backdrop-saturate-150">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
            mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
            WebkitMask:
              "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
            padding: "1px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
          style={{ filter: "blur(5px)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
              mask: "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
              WebkitMask:
                "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)",
              padding: "4px",
            }}
          />
        </div>
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <span className="absolute top-1/2 right-8 z-10 -translate-y-1/2">
            <span className="relative size-5 shrink-0 text-white" aria-hidden>
              <svg className="size-5 -rotate-90" viewBox="0 0 20 20">
                <circle
                  cx="10"
                  cy="10"
                  r={RISK_PROGRESS_R}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-45"
                />
                <circle
                  key={cycleKey}
                  cx="10"
                  cy="10"
                  r={RISK_PROGRESS_R}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={RISK_PROGRESS_CIRCUMFERENCE}
                  className="animate-use-case-progress"
                  style={{
                    animationDuration: `${RISK_CYCLE_MS}ms`,
                    ["--use-case-circumference" as string]: RISK_PROGRESS_CIRCUMFERENCE,
                  }}
                />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </span>
  );
}

function RisksHandled() {
  const [active, setActive] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [pillStyle, setPillStyle] = useState({ top: 0, height: 0 });
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectTab = useCallback((index: number) => {
    setActive(index);
    setCycleKey((k) => k + 1);
  }, []);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % riskTabs.length);
    setCycleKey((k) => k + 1);
  }, []);

  useLayoutEffect(() => {
    const tab = tabRefs.current[active];
    const list = tablistRef.current;
    if (!tab || !list) return;

    const updatePill = () => {
      setPillStyle({ top: tab.offsetTop, height: tab.offsetHeight });
    };

    updatePill();
    const observer = new ResizeObserver(updatePill);
    observer.observe(list);
    observer.observe(tab);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const timer = setTimeout(goNext, RISK_CYCLE_MS);
    return () => clearTimeout(timer);
  }, [active, cycleKey, goNext]);

  return (
    <section className="py-14 sm:py-[7rem]" id="security-risks">
      <div className="px-0 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-[90rem]">
          <div
            className="overflow-hidden rounded-section px-4 py-10 text-white sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-[60px] lg:py-20 xl:px-20 xl:py-[112px]"
            style={{
              backgroundColor: "#d9d9d9",
              backgroundImage: `url(${riskTabsBg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="flex flex-col gap-12 md:gap-14 xl:flex-row xl:items-start xl:justify-between xl:gap-[106px]">
              <div className="w-full xl:w-[434px] xl:pt-[42px]">
                <div className="pb-4">
                  <p className="text-sm text-[#f1edff] font-medium">AI Safety</p>
                </div>
                <h2 className="font-heading text-[36px] max-sm:text-[31.5px] leading-[1.1] font-bold tracking-[-0.06em] text-balance text-white sm:text-[40px] md:text-[44px] xl:text-[48px]">
                  AI brings new risks, and we know how to handle them
                </h2>

                <div
                  ref={tablistRef}
                  role="tablist"
                  aria-label="AI Safety controls"
                  className="relative isolate mt-10 flex w-full max-w-[414px] flex-col overflow-visible md:mt-12"
                >
                  <RiskTabGlassPill top={pillStyle.top} height={pillStyle.height} cycleKey={cycleKey} />

                  {riskTabs.map((tab, i) => {
                    const Icon = tab.icon;
                    const isActive = active === i;
                    return (
                      <button
                        key={tab.id}
                        ref={(el) => { tabRefs.current[i] = el; }}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`${tab.id}-panel`}
                        id={`${tab.id}-tab`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => selectTab(i)}
                        className={`group relative z-10 flex w-full min-h-[61px] items-center rounded-section px-8 py-4 text-left transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/45 ${
                          isActive ? "text-white" : "text-white/70 hover:text-white/90"
                        }`}
                      >
                        <span className="relative z-10 flex h-full w-full min-w-0 items-start justify-between gap-5">
                          <span className="flex min-w-0 items-start gap-4">
                            <span
                              className={`mt-[2px] transition-opacity duration-300 ${
                                isActive ? "opacity-100" : "opacity-70"
                              }`}
                            >
                              <Icon
                                className="size-5 shrink-0 text-white/50 transition-colors duration-300"
                                strokeWidth={2.1}
                                aria-hidden
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="text-base font-medium text-inherit">{tab.label}</span>
                              <div
                                className={`grid min-h-0 transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                              >
                                <div className="min-h-0 overflow-hidden">
                                  <p
                                    className="mt-1 text-sm leading-relaxed text-white/75 font-medium"
                                    aria-hidden={!isActive}
                                  >
                                    {tab.description}
                                  </p>
                                </div>
                              </div>
                            </span>
                          </span>
                          <span className="mt-[2px] size-5 shrink-0" aria-hidden />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className="relative w-full overflow-hidden rounded-section px-4 pb-4 pt-6 sm:px-6 sm:pb-6 sm:pt-8 md:min-h-[640px] md:px-8 lg:min-h-[700px] xl:min-h-[600px] xl:w-[632px] xl:px-0 xl:pb-0 xl:pt-0"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.14)" }}
              >
                <div className="relative h-full min-h-[500px] sm:min-h-[560px] md:min-h-[640px] lg:min-h-[700px] xl:min-h-[600px]">
                  {riskTabs.map((tab, i) => (
                    <div
                      key={tab.id}
                      role="tabpanel"
                      id={`${tab.id}-panel`}
                      aria-labelledby={`${tab.id}-tab`}
                      hidden={active !== i}
                      className={`absolute inset-0 z-10 transition-opacity duration-300 ${
                        active === i ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <div className="relative min-h-full overflow-hidden pt-[49px]">
                        <img
                          alt=""
                          width={1896}
                          height={1800}
                          decoding="async"
                          loading="lazy"
                          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-auto w-full max-w-[632px] -translate-x-1/2 select-none xl:max-w-none"
                          draggable={false}
                          aria-hidden
                          src={tab.visual}
                        />
                        <div className="relative z-10 mx-auto flex max-w-[454px] flex-col gap-5 text-center">
                          <p className="text-sm leading-relaxed text-white font-medium">{tab.lead}</p>
                          <p className="text-sm leading-relaxed text-white font-medium">{tab.subhead}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PILLARS (3 cards) ---------------- */

function PillarAccessIcon() {
  return (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" viewBox="0 0 32 31.9995" fill="none" aria-hidden="true" className="size-8 shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.81266 0.445179C8.54551 0.227398 11.4237 0 14.3784 0C17.333 0 20.2112 0.227398 22.944 0.445179C25.6416 0.660146 27.8981 2.71266 28.3138 5.40565C28.5509 6.94007 28.7568 8.56585 28.7568 10.2413C28.7568 11.9168 28.5509 13.5426 28.3138 15.077C28.2974 15.1846 28.2777 15.2912 28.2553 15.3967C27.1399 14.9084 25.9904 14.558 24.9056 14.3033V10.775C24.9056 7.49435 22.2461 4.83481 18.9655 4.83481C15.6848 4.83481 13.0253 7.49435 13.0253 10.775V18.8192C12.3615 19.278 11.7837 19.8148 11.295 20.4088C9.41893 20.3241 7.58523 20.1788 5.81266 20.0375C3.11518 19.8225 0.85861 17.77 0.442793 15.077C0.205869 13.5426 0 11.9168 0 10.2413C0 8.56585 0.205869 6.94007 0.442793 5.40565C0.85861 2.71266 3.11518 0.660146 5.81266 0.445179ZM11.7455 8.39291C12.3299 7.86281 12.3739 6.95936 11.8438 6.37499C11.3137 5.79063 10.4102 5.74663 9.8259 6.27673C8.84917 7.16274 8.08745 7.98441 7.43973 8.99538C7.14601 9.45385 6.88382 9.93865 6.63733 10.469L6.09701 9.91175C5.54775 9.34535 4.64334 9.33143 4.07694 9.88069C3.51054 10.4299 3.49662 11.3343 4.04585 11.9008L6.12377 14.0436C6.46882 14.3994 6.97365 14.551 7.45762 14.444C7.9416 14.3371 8.33554 13.9869 8.49851 13.5188C8.97015 12.1639 9.37486 11.2713 9.84549 10.5367C10.3104 9.81095 10.878 9.17989 11.7455 8.39291ZM13.8793 29.8985C11.1522 27.1714 11.8542 22.5816 15.2718 20.7943L15.8823 20.4751V10.775C15.8823 9.0723 17.2626 7.69195 18.9653 7.69195C20.6681 7.69195 22.0484 9.0723 22.0484 10.775V16.6792C23.8037 16.923 25.9483 17.3907 27.7897 18.3368C30.0485 19.4974 32 21.4753 32 24.6905C32 27.5833 31.2352 29.5314 30.0727 31.4491C29.8656 31.7909 29.4951 31.9995 29.0953 31.9995H16.4537C16.1506 31.9995 15.8599 31.8793 15.6456 31.6649L13.8793 29.8985Z" fill="url(#pillar-access-gradient)" />
      <defs>
        <radialGradient id="pillar-access-gradient" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3921 -44.9053 12.396 16.6583 -1.39257)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function PillarVisibilityIcon() {
  return (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" viewBox="0 0 32.0015 32.0003" fill="none" aria-hidden="true" className="size-8 shrink-0">
      <path d="M23.1884 3.35965C24.4604 4.14018 25.568 5.09677 26.5321 6.19001C29.1628 9.17453 30.6937 13.096 31.8535 16.8396C32.235 18.0733 31.9011 19.6333 30.5902 20.4244C29.8748 20.8557 29.2112 21.0335 28.4204 21.0895V23.0695C28.4204 25.5847 26.3424 27.5799 23.8334 27.5806H22.6995C22.151 27.5808 21.834 27.9084 21.7731 28.2167V30.8574C21.7731 31.4883 21.2611 31.9998 20.6303 32.0003H6.80661C6.17555 32 5.66376 31.4885 5.66376 30.8574C5.66376 30.3242 5.66419 29.6757 5.666 29.0405C5.66901 27.9214 5.48723 26.835 5.10351 25.8419C5.62755 25.827 6.1569 25.8042 6.7017 25.7548H6.70394C8.62526 25.5795 10.1515 24.0549 10.3267 22.132V22.1297C10.4332 20.9528 10.4554 19.8424 10.4004 18.6989C11.3987 18.7301 12.3788 18.7058 13.416 18.6119H13.4182C15.3417 18.4365 16.8652 16.9087 17.041 14.9891L17.1191 13.8418C17.1718 12.7109 17.1464 11.6112 17.041 10.4467V10.4445L17.0365 10.4266C17.8417 10.4326 18.6451 10.4022 19.4852 10.3262C21.4097 10.1513 22.934 8.62404 23.1102 6.70562V6.7034C23.214 5.55659 23.2377 4.47261 23.1884 3.35965ZM5.42268 16.7413L6.44277 16.8105L6.64367 16.8463C7.09564 16.9704 7.4345 17.3658 7.4785 17.8463C7.60373 19.2287 7.60371 20.4906 7.4785 21.873C7.42833 22.4224 6.99221 22.859 6.44277 22.9088C5.05674 23.0343 3.80211 23.0343 2.41599 22.9088C1.86717 22.8583 1.43032 22.422 1.38028 21.873C1.25508 20.4907 1.25506 19.2286 1.38028 17.8463L1.416 17.6454C1.54047 17.194 1.93602 16.8546 2.41599 16.8105C3.45514 16.7164 4.42099 16.6944 5.42268 16.7413ZM12.137 9.59625L13.1571 9.66546L13.358 9.70116C13.8098 9.82527 14.1486 10.2209 14.1928 10.7012C14.3181 12.0838 14.318 13.3454 14.1928 14.7279C14.143 15.2776 13.7068 15.7139 13.1571 15.7637C11.771 15.8891 10.5164 15.8892 9.13027 15.7637C8.58131 15.7132 8.14433 15.2771 8.09457 14.7279C7.96938 13.3455 7.96929 12.0837 8.09457 10.7012L8.13027 10.5003C8.25482 10.049 8.65029 9.70946 9.13027 9.66546C10.1694 9.57133 11.1353 9.5493 12.137 9.59625ZM3.71733 8.16322L4.59903 8.22349L4.79992 8.26143C5.25114 8.3858 5.59045 8.77945 5.63475 9.25919C5.74303 10.4542 5.74296 11.5465 5.63475 12.7413C5.58479 13.2908 5.14856 13.7272 4.59903 13.777C3.40097 13.8855 2.31503 13.8856 1.11689 13.777C0.56809 13.7265 0.131086 13.2903 0.0811748 12.7413C-0.0270104 11.5466 -0.0271061 10.4541 0.0811748 9.25919L0.119121 9.0583C0.243926 8.60754 0.637322 8.26751 1.11689 8.22349C2.01517 8.1421 2.85114 8.1226 3.71733 8.16322ZM18.2084 1.31054L19.2285 1.37973L19.4294 1.41545C19.8812 1.53957 20.2201 1.93513 20.2642 2.41545C20.3895 3.79803 20.3894 5.05974 20.2642 6.44223C20.2144 6.99188 19.7781 7.42806 19.2285 7.47794C17.8421 7.60351 16.5881 7.60354 15.2017 7.47794C14.6523 7.42793 14.2158 6.99177 14.166 6.44223C14.0408 5.05977 14.0407 3.79801 14.166 2.41545L14.2017 2.21455C14.3264 1.76311 14.7214 1.42338 15.2017 1.37973C16.2411 1.28559 17.2064 1.26352 18.2084 1.31054ZM9.57448 1.30607L10.4562 1.36634L10.6571 1.40429C11.1083 1.52867 11.4476 1.92229 11.4919 2.40205C11.6002 3.59702 11.6001 4.68932 11.4919 5.8842C11.4419 6.43369 11.0057 6.87005 10.4562 6.9199C9.25811 7.02838 8.17217 7.02845 6.97404 6.9199C6.42524 6.86939 5.98824 6.43318 5.93832 5.8842C5.83013 4.68941 5.83004 3.59693 5.93832 2.40205L5.97626 2.20116C6.10106 1.7504 6.49445 1.41038 6.97404 1.36634C7.87233 1.28496 8.70828 1.26546 9.57448 1.30607ZM2.82449 0.0136621L3.41153 0.0538406L3.6102 0.0917871C4.06213 0.215808 4.40081 0.609211 4.44501 1.08955C4.51711 1.88508 4.51701 2.61554 4.44501 3.41099C4.39473 3.95979 3.96035 4.39423 3.41153 4.44447C2.61407 4.51666 1.88765 4.51673 1.0901 4.44447C0.541471 4.39403 0.104615 3.95967 0.0543889 3.41099C-0.0175971 2.61565 -0.0176892 1.88497 0.0543889 1.08955L0.0901032 0.888662C0.214657 0.437414 0.610154 0.0978516 1.0901 0.0538406C1.68836 -0.00035395 2.24687 -0.013416 2.82449 0.0136621Z" fill="url(#pillar-visibility-gradient)" />
      <defs>
        <radialGradient id="pillar-visibility-gradient" cx="0" cy="0" r="1" gradientTransform="matrix(2.9168 33.3929 -44.9074 12.3963 16.6591 -1.3926)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function PillarProtectionIcon() {
  return (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" viewBox="0 0 30.8571 30.8571" fill="none" aria-hidden="true" className="size-8 shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.78805 0.513568C10.2426 0.239977 12.8038 0 15.4286 0C18.0533 0 20.6146 0.239977 23.069 0.513568C26.8907 0.939541 29.9614 4.00754 30.371 7.83607C30.6322 10.2779 30.8571 12.822 30.8571 15.4286C30.8571 18.0351 30.6322 20.5792 30.371 23.021C29.9614 26.8496 26.8907 29.9177 23.069 30.3435C20.6146 30.6171 18.0533 30.8571 15.4286 30.8571C12.8038 30.8571 10.2426 30.6171 7.78805 30.3435C3.96645 29.9177 0.89579 26.8496 0.486181 23.021C0.224933 20.5792 0 18.0351 0 15.4286C0 12.822 0.224933 10.2779 0.486181 7.83607C0.895787 4.00754 3.96645 0.939541 7.78805 0.513568ZM22.6597 14.101C22.6597 19.369 16.6048 23.2622 15.4286 23.2622C14.2525 23.2622 8.19755 19.369 8.19755 14.101C8.19755 12.7319 8.32315 11.6442 8.46546 10.7971C8.58809 10.0671 9.396 9.69509 10.1247 9.82533C11.5573 10.0814 13.0411 9.66875 14.5623 8.40423C15.0605 7.9901 15.7968 7.9901 16.295 8.40423C17.8162 9.66875 19.3 10.0814 20.7326 9.82533C21.4613 9.69509 22.2692 10.0671 22.3918 10.7971C22.5342 11.6442 22.6597 12.7319 22.6597 14.101Z" fill="url(#pillar-protection-gradient)" />
      <defs>
        <radialGradient id="pillar-protection-gradient" cx="0" cy="0" r="1" gradientTransform="matrix(2.8125 32.2 -43.3016 11.9535 16.0634 -1.34286)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const pillars = [
  { icon: PillarAccessIcon, title: "Access you control", body: "Granular scopes, SSO, SAML, and SCIM. Grant exactly what Viktor needs, revoke in one click, and provision your whole team automatically." },
  { icon: PillarVisibilityIcon, title: "Visibility you can trust", body: "A full audit log of every action, queryable and exportable. Know what Viktor did, when, and on whose behalf — always." },
  { icon: PillarProtectionIcon, title: "Protection that's tested", body: "Continuous penetration testing, encryption everywhere, and isolated runtimes. Security that's proven, not promised." },
];

function Pillars() {
  return (
    <section className="px-2 sm:px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex w-full max-w-[776px] flex-col justify-center items-center gap-8 text-center">
          <p className="text-eyebrow-primitive-purple-700">Viktor vs AI tools</p>
          <h2 className="font-heading text-[36px] max-sm:text-[31.5px] leading-[1.1] font-bold tracking-[-0.06em] text-primary text-balance sm:text-[40px] md:text-[48px]">
            Independently audited.<br />
            AI brings new risks, and we know how to handle them
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto font-medium">
            Three principles guide every security decision we make — control,
            visibility, and protection that's continuously tested.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col items-start gap-4 rounded-3xl p-7 text-left"
              style={{
                boxShadow:
                  "rgb(255,255,255) 2.702px 2.702px 1.351px -2.702px inset, rgb(255,255,255) -2.702px -2.702px 1.351px -2.702px inset, rgba(255,255,255,0.5) 0px 0px 8.106px 0px inset, rgb(242,242,242) 0px 0px 43.232px 0px inset",
              }}
            >
              <p.icon />
              <div className="font-semibold text-lg">{p.title}</div>
              <p className="text-sm leading-relaxed text-secondary font-medium">{p.body}</p>
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
    <section className="px-2 sm:px-6 py-18 sm:py-26">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[40px] bg-hero px-4 py-28 sm:px-20 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
            <p className="text-white/75 text-md leading-relaxed pb-4">Credentials & secrets</p>
              <h2 className="font-display text-white typo-h2">
                3,000+<br />integrations.<br />Zero secrets in<br />chat.
              </h2>
              <div className="mt-8 space-y-5 max-w-md">
                <div className="border-b border-white/15 pb-5">
                  <h3 className="text-white font-semibold text-2xl">OAuth first</h3>
                  <p className="text-white/75 text-md leading-relaxed">Viktor connects through OAuth wherever possible — no passwords pasted into a message, ever.</p>
                </div>
                <div className="border-b border-white/15 pb-5">
                  <h3 className="text-white font-semibold text-lg">Encrypted vault</h3>
                  <p className="text-white/75 text-md leading-relaxed">When a credential is needed, it's stored in an encrypted vault, scoped per integration and never echoed back.</p>
                </div>
                <div className="border-b border-white/15 pb-5">
                  <h3 className="text-white font-semibold text-lg">Revoke any time</h3>
                  <p className="text-white/75 text-md leading-relaxed">Disconnect a tool and its access is gone instantly — across every workspace and thread.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <img
                src={intgTilesImage}
                alt="Integrations"
                className="col-span-4 w-full h-auto"
              />
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
    <section className="px-6 py-12 sm:pt-26 sm:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[40px] bg-disclosure-card px-6 py-20 text-center">
          <svg width="499" height="386" viewBox="0 0 499 386" fill="none" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-auto w-[min(32.3125rem,92vw)] max-w-none -translate-x-1/2 select-none"><defs><radialGradient id="ask-ai-keyhole-radial-_S_1_" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(249.268 249.267) rotate(90) scale(249.267 463.944)"><stop stop-color="white" stop-opacity="0.2"></stop><stop offset="1" stop-color="white"></stop></radialGradient><linearGradient id="ask-ai-keyhole-linear-_S_1_" x1="0" y1="0" x2="498.535" y2="498.536" gradientUnits="userSpaceOnUse"><stop stop-color="white"></stop><stop offset="0.248762" stop-color="white" stop-opacity="0"></stop><stop offset="0.749473" stop-color="white" stop-opacity="0"></stop><stop offset="1" stop-color="white"></stop></linearGradient><filter id="ask-ai-keyhole-bezel-blur-_S_1_" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur></filter><clipPath id="ask-ai-keyhole-clip-_S_1_"><path fill-rule="evenodd" clip-rule="evenodd" d="M82.0542 5.70306C85.5376 2.06036 90.3587 0 95.3987 0H403.138C408.179 0 412.998 2.06036 416.48 5.70306C426.566 16.2491 447.386 38.0361 465.474 75.8668C483.546 113.663 498.536 166.682 498.536 239.708C498.536 326.965 457.069 387 406.115 427.186C355.732 466.917 295.804 487.597 256.259 497.934C253.197 498.735 249.981 498.735 246.918 497.934C207.46 487.62 146.426 466.973 94.9127 427.319C42.849 387.237 0 327.191 0 239.708C0 166.682 14.9891 113.663 33.061 75.8668C51.149 38.0361 71.9693 16.2491 82.0542 5.70306ZM317.369 203.105C317.369 238.265 301.41 261.013 272.355 268.487V332.355C272.355 345.102 262.022 355.435 249.275 355.435C236.528 355.435 226.194 345.102 226.194 332.355V268.482C197.151 261.003 181.199 238.258 181.199 203.105C181.199 159.531 205.709 135.02 249.284 135.02C292.858 135.02 317.369 159.531 317.369 203.105Z"></path></clipPath></defs><g opacity="0.3"><g clip-path="url(#ask-ai-keyhole-clip-_S_1_)"><path fill-rule="evenodd" clip-rule="evenodd" d="M82.0542 5.70306C85.5376 2.06036 90.3587 0 95.3987 0H403.138C408.179 0 412.998 2.06036 416.48 5.70306C426.566 16.2491 447.386 38.0361 465.474 75.8668C483.546 113.663 498.536 166.682 498.536 239.708C498.536 326.965 457.069 387 406.115 427.186C355.732 466.917 295.804 487.597 256.259 497.934C253.197 498.735 249.981 498.735 246.918 497.934C207.46 487.62 146.426 466.973 94.9127 427.319C42.849 387.237 0 327.191 0 239.708C0 166.682 14.9891 113.663 33.061 75.8668C51.149 38.0361 71.9693 16.2491 82.0542 5.70306ZM317.369 203.105C317.369 238.265 301.41 261.013 272.355 268.487V332.355C272.355 345.102 262.022 355.435 249.275 355.435C236.528 355.435 226.194 345.102 226.194 332.355V268.482C197.151 261.003 181.199 238.258 181.199 203.105C181.199 159.531 205.709 135.02 249.284 135.02C292.858 135.02 317.369 159.531 317.369 203.105Z" fill="none" stroke="white" stroke-width="8" stroke-opacity="0.45" filter="url(#ask-ai-keyhole-bezel-blur-_S_1_)"></path></g><path fill-rule="evenodd" clip-rule="evenodd" d="M82.0542 5.70306C85.5376 2.06036 90.3587 0 95.3987 0H403.138C408.179 0 412.998 2.06036 416.48 5.70306C426.566 16.2491 447.386 38.0361 465.474 75.8668C483.546 113.663 498.536 166.682 498.536 239.708C498.536 326.965 457.069 387 406.115 427.186C355.732 466.917 295.804 487.597 256.259 497.934C253.197 498.735 249.981 498.735 246.918 497.934C207.46 487.62 146.426 466.973 94.9127 427.319C42.849 387.237 0 327.191 0 239.708C0 166.682 14.9891 113.663 33.061 75.8668C51.149 38.0361 71.9693 16.2491 82.0542 5.70306ZM317.369 203.105C317.369 238.265 301.41 261.013 272.355 268.487V332.355C272.355 345.102 262.022 355.435 249.275 355.435C236.528 355.435 226.194 345.102 226.194 332.355V268.482C197.151 261.003 181.199 238.258 181.199 203.105C181.199 159.531 205.709 135.02 249.284 135.02C292.858 135.02 317.369 159.531 317.369 203.105Z" fill="url(#ask-ai-keyhole-radial-_S_1_)" fill-opacity="0.2"></path><path d="M95.3984 0.5H403.138C408.042 0.5 412.731 2.50479 416.119 6.04883C426.192 16.5816 446.969 38.323 465.022 76.082C483.062 113.808 498.036 166.753 498.036 239.708C498.036 326.78 456.665 386.681 405.805 426.793C355.5 466.463 295.649 487.121 256.133 497.45H256.132C253.339 498.181 250.415 498.226 247.605 497.587L247.045 497.45C207.613 487.143 146.654 466.517 95.2178 426.923C43.2459 386.911 0.500065 327 0.5 239.708C0.5 166.753 15.4734 113.808 33.5117 76.082C51.5656 38.3227 72.3439 16.5815 82.416 6.04883C85.8051 2.5049 90.4951 0.500064 95.3984 0.5ZM249.284 134.521C227.405 134.521 210.241 140.675 198.548 152.368C186.854 164.062 180.699 181.226 180.699 203.104C180.699 220.754 184.703 235.337 192.394 246.456C200.022 257.486 211.251 265.067 225.694 268.866V332.354C225.694 345.378 236.251 355.935 249.274 355.936C262.298 355.936 272.854 345.378 272.854 332.354V268.871C287.304 265.074 298.537 257.493 306.169 246.463C313.862 235.343 317.868 220.758 317.868 203.104C317.868 181.226 311.714 164.062 300.021 152.368C288.327 140.675 271.163 134.521 249.284 134.521Z" fill="none" stroke="url(#ask-ai-keyhole-linear-_S_1_)" stroke-opacity="0.6"></path></g></svg>
          <div className="relative">
            <p className="text-white/70 text-sm font-medium">Responsible disclosure</p>
            <h2 className="font-display text-white text-4xl md:text-5xl mt-3 ">Found something? Tell us.</h2>
            <p className="mt-4 mx-auto max-w-md text-white/80 leading-relaxed">
              We run a responsible disclosure program and reward valid reports.
              Reach our security team directly — we read every message.
            </p>
            <div className="mt-10">
              <button className="rounded-full bg-white px-8 py-3.5 text-sm text-foreground shadow-lg hover:bg-white/95 transition">
                Send Security Report
              </button>
            </div>
          </div>
        </div>
        <p className="mt-8 mx-auto max-w-2xl text-center text-sm text-muted-foreground leading-relaxed font-medium">
          We are building a formal bug bounty program. In the meantime, we recognize meaningful security research with a thank you, public credit if you want it, and Viktor credits.
        </p>
      </div>
    </section>
  );
}
