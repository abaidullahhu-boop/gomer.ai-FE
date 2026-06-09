import { type ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { CoinIcon, CreditCardIcon, Soc2Icon } from "@/components/site/HeroBadges";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { Check, X } from "lucide-react";
import { FAQSection } from "@/components/site/FAQSection";
import { StartFreeSection } from "@/components/site/StartFreeSection";
import { SlackPurpleCard, SlackTeammateCard } from "@/components/site/SlackChangelogCards";
import compareVisual3 from "@/assets/images/compare-visual-3.avif";
import viktorAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import type { ComparePageConfig } from "@/components/compare/types";

const glassBorderLayers = (
  <>
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
  </>
);

const whenChooseGlassShadow =
  "rgb(255, 255, 255) 2.702px 2.702px 1.351px -2.702px inset, rgb(255, 255, 255) -2.702px -2.702px 1.351px -2.702px inset, rgba(255, 255, 255, 0.5) 0px 0px 8.106px inset, rgb(242, 242, 242) 0px 0px 43.232px inset";

const whenChooseHeaderShadow =
  "inset 2.702px 2.702px 1.351px -2.702px white, inset -2.702px -2.702px 1.351px -2.702px white, inset 0 0 8.106px rgba(255,255,255,0.5), inset 0 0 43.232px #f2f2f2";

const whenChooseTrustBadges = [
  { label: "$100 in free credits", icon: <CoinIcon /> },
  { label: "No credit card required", icon: <CreditCardIcon /> },
  { label: "SOC 2 compliant", icon: <Soc2Icon /> },
] as const;

function ViktorCheckBadge() {
  return (
    <span
      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(145.58%_104.75%_at_52.06%_-4.35%,#ffbb98_0%,#ffbb98_6.43%,#9e84ff_50.71%,#6e47ff_80.36%,#150079_100%)] shadow-[inset_0_0_8px_rgba(255,255,255,0.35)]"
      aria-hidden="true"
    >
      <Check className="size-3.5 text-white" strokeWidth={2.8} aria-hidden="true" />
    </span>
  );
}

function CompetitorXBadge() {
  return (
    <span
      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1a182b]/12 text-white"
      aria-hidden="true"
    >
      <X className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
    </span>
  );
}

function WhenChooseCheckBadge() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.35)] gradient-dark-2"
      aria-hidden="true"
    >
      <Check className="size-3 text-white" strokeWidth={2.8} aria-hidden="true" />
    </span>
  );
}

function WhenChooseItemCard({ children }: { children: string }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border-0 bg-white/30 backdrop-blur-[10px] ring-1 ring-primitive-main-dark/10"
      style={{ boxShadow: whenChooseGlassShadow }}
    >
      <div className="flex items-start gap-4 px-4 py-5 sm:gap-5 sm:py-5">
        <WhenChooseCheckBadge />
        <div className="min-w-0 flex-1 body-main font-medium text-primary">{children}</div>
      </div>
    </div>
  );
}

function WhenChooseLabel({ children, variant }: { children: string; variant: "viktor" | "competitor" }) {
  return (
    <div className="flex items-center justify-center gap-3 px-1 sm:gap-5">
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(26,24,43,0.12)_0%,rgba(26,24,43,0)_100%)]" />
      <span
        className={`relative z-30 inline-flex h-8 items-center justify-center rounded-full px-4 text-base leading-[1.3] font-medium tracking-[0.01em] sm:px-5 sm:text-[1.125rem] ${
          variant === "viktor" ? "bg-[#5c28d7]/16 text-[#5c28d7]" : "bg-[#1a182b]/5 text-secondary"
        }`}
      >
        {children}
      </span>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(26,24,43,0)_0%,rgba(26,24,43,0.12)_100%)]" />
    </div>
  );
}

function CompareIntegrationsVisual() {
  return (
    <div className="dark relative flex w-full overflow-hidden rounded-[32px] gradient-dark-1 min-h-[22rem] flex-col items-center justify-center p-4 lg:min-h-[616px] lg:p-16">
      <img
        src={compareVisual3}
        alt="Logos of tools Viktor integrates with"
        loading="lazy"
        width={1608}
        height={1515}
        className="h-auto w-full max-w-[630px] object-contain"
      />
    </div>
  );
}

export function ComparePageLayout({ config }: { config: ComparePageConfig }) {
  const { competitor } = config;

  function CompetitorIconTile({ size = "md" }: { size?: "md" | "sm" }) {
    const box = size === "sm" ? "mt-0.5 size-6 " : "size-8 ";
    const icon = size === "sm" ? "size-12" : "size-16";
    return (
      <div className={`flex shrink-0 items-center justify-center ${box}`}>
        <img
          src={competitor.icon}
          alt={competitor.iconAlt}
          width={32}
          height={32}
          className={`${icon} object-contain`}
        />
      </div>
    );
  }

  function CompareHeroViktorCard() {
    return (
      <div className="compare-hero-viktor-card relative min-h-112 overflow-hidden rounded-[36px]">
        <div className="relative h-full w-full rounded-[16px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[20px] z-0"
            style={{ borderRadius: "inherit", background: "rgb(255, 255, 255)", filter: "blur(20px)" }}
          />
          <div className="relative z-[1] h-full w-full rounded-[16px]">
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
              className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
              style={{ filter: "blur(6px)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 10%, rgba(255,255,255,0) 22%)",
                }}
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
              style={{
                boxShadow:
                  "inset 0 1px 14px -4px rgba(255,255,255,0.75), inset 0 0 20px rgba(255,255,255,0.45), inset 0 0 48px rgba(255,255,255,0.12)",
              }}
            />
            <div className="relative z-[2] flex h-full w-full flex-col justify-between">
              <div className="flex h-full flex-col gap-8 p-8 text-primitive-main-dark sm:p-16">
                <img
                  src={viktorAvatar}
                  alt="Viktor"
                  width={80}
                  height={80}
                  className="size-20 shrink-0 rounded-[16px] object-cover"
                />
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-2xl leading-[1.2] font-bold tracking-[-0.06em] text-primitive-main-dark">
                    Viktor
                  </h2>
                  <div className="flex flex-col gap-4">
                    <p className="body-main text-primitive-main-grey">
                      Viktor is an autonomous AI employee that lives in your Slack, connects to 3,200+ business
                      tools, and does real work: pulling data from Stripe, managing Google Ads campaigns,
                      delivering board-ready PDFs, and building web applications.
                    </p>
                    <p className="body-main text-primitive-main-grey">
                      Choose Viktor when you need an AI that actually touches your tools and delivers outputs your
                      team can use.
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {["3,200+ integrations", "SOC 2 compliant", "Used by teams at +2000 companies."].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-accent-1 px-4 py-1 body-small text-white"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CompareHeroCompetitorCard() {
    return (
      <div className="relative min-h-112 overflow-hidden rounded-[36px] bg-white/10 text-white">
        <div className="relative h-full w-full rounded-[1px]">
          {glassBorderLayers}
          <div className="relative z-[2] flex h-full w-full flex-col justify-between">
            <div className="flex h-full flex-col gap-8 p-8 text-left sm:p-16">
              <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-[#fffefc] bg-gradient-to-br from-[#f9f5f1] to-[#fffefc] shadow-[0_10px_20px_rgba(26,24,41,0.06)]">
                <img
                  src={competitor.icon}
                  alt={competitor.iconAlt}
                  width={40}
                  height={40}
                  className="size-10 object-contain"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl leading-[1.2] font-bold tracking-[-0.06em] text-white">
                  {competitor.name}
                </h2>
                <div className="flex flex-col gap-4">
                  <p className="body-main text-white/75">{competitor.heroDescription[0]}</p>
                  <p className="body-main text-white/75">{competitor.heroChooseWhen}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  function Hero() {
    return (
      <section className="border-0 py-0">
        <div className="dark relative w-full overflow-hidden rounded-b-section text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 h-full min-h-[56.25rem] w-screen max-w-none -translate-x-1/2 rounded-b-section bg-gradient-dark3"
          />
          <Nav />
          <div className="hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-5 pb-14 sm:gap-16 sm:px-10 sm:pb-16 md:px-14 md:pb-20 lg:gap-16 lg:px-20">
            <div className="flex w-full max-w-[1280px] flex-col items-center gap-8 text-center mt-16">
              <h1 className="font-heading text-5xl max-sm:text-[2.625rem] leading-[1.1] font-bold tracking-[-0.06em] text-balance sm:text-6xl lg:text-[4rem]">
                <span className="block">{config.hero.titleLine1}</span>
                <span className="block">{config.hero.titleLine2}</span>
              </h1>
              <div className="flex max-w-[630px] flex-col items-center gap-4">
                <p className="body-medium font-medium text-white">{config.hero.subtitle}</p>
                <p className="body-small font-medium text-white">{config.hero.lastUpdated}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <GetStartedButton className="inline-flex h-14 min-h-14 items-center justify-center border border-white bg-white px-10 text-base tracking-[-0.01em] text-primitive-main-dark transition-all hover:bg-white/90 active:translate-y-px" />
                <a
                  href="https://cal.com/forms/24cb15e9-8a3d-4d94-9209-cc3d5f198286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 min-h-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-transparent px-10 text-base font-medium tracking-[-0.01em] text-white transition-all hover:bg-white/10 active:translate-y-px"
                >
                  Watch Viktor Work
                </a>
              </div>
            </div>

            <div className="grid w-full max-w-[1280px] gap-5 lg:grid-cols-2">
              <CompareHeroViktorCard />
              <CompareHeroCompetitorCard />
            </div>
          </div>
        </div>
      </section>
    );
  }

  function ComparisonTable() {
    return (
      <section className="bg-primitive-main-beige py-14 sm:py-28">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-0">
            <table className="hidden w-full border-collapse text-left lg:table">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[32%] py-6 pr-4 text-left font-medium body-main text-primary">Feature</th>
                  <th className="w-[34%] py-6 pr-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={viktorAvatar}
                        alt="Viktor"
                        width={32}
                        height={32}
                        className="size-8 shrink-0 rounded-lg object-cover"
                      />
                      <span className="truncate font-medium body-main text-primary">Viktor</span>
                    </div>
                  </th>
                  <th className="w-[34%] py-6">
                    <div className="flex min-w-0 items-center gap-3">
                      <CompetitorIconTile />
                      <span className="font-medium body-main text-primary">{competitor.name}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-b-0">
                    <td className="py-6 pr-4 align-top font-medium body-main text-primary">{row.feature}</td>
                    <td className="py-6 pr-4 align-top">
                      <div className="flex gap-3">
                        <ViktorCheckBadge />
                        <p className="min-w-0 body-main font-medium text-secondary">{row.viktor}</p>
                      </div>
                    </td>
                    <td className="py-6 align-top">
                      <div className="flex gap-3">
                        <CompetitorXBadge />
                        <p className="min-w-0 body-main font-medium text-secondary">{row.competitor}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col lg:hidden">
              {config.rows.map((row) => (
                <article key={row.feature} className="border-b border-border py-6 last:border-b-0">
                  <h3 className="mb-4 font-medium body-main text-primary">{row.feature}</h3>
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-3">
                      <img
                        src={viktorAvatar}
                        alt="Viktor"
                        width={24}
                        height={24}
                        className="mt-0.5 size-6 shrink-0 rounded-md object-cover"
                      />
                      <p className="min-w-0 body-main text-secondary">{row.viktor}</p>
                    </div>
                    <div className="flex gap-3">
                      <CompetitorIconTile size="sm" />
                      <p className="min-w-0 body-main text-secondary">{row.competitor}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  function CompareFeatureSections() {
    const visuals = [<SlackPurpleCard key="purple" />, <SlackTeammateCard key="teammate" />, <CompareIntegrationsVisual key="integrations" />];
    const layouts = ["default", "flipped", "default"] as const;

    return (
      <section className="bg-primitive-main-beige py-14 sm:py-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 sm:gap-20 lg:gap-28">
            {config.featureSections.map((section, index) => {
              const flipped = layouts[index] === "flipped";
              return (
                <div key={section.title} className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-32">
                  <div className={`order-1 flex flex-col gap-5 lg:max-w-md ${flipped ? "lg:order-2" : ""}`}>
                    <h2 className="font-heading h4 text-balance text-primary">{section.title}</h2>
                    <div className="flex flex-col gap-3">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)} className="body-main font-medium text-secondary">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className={`order-2 min-w-0 ${flipped ? "lg:order-1" : ""}`}>{visuals[index]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  function WhenChooseViktorHeader() {
    return (
      <div className="relative h-24 overflow-visible rounded-section sm:h-28 lg:h-32">
        <div className="absolute inset-0 isolate rounded-section" style={{ boxShadow: whenChooseHeaderShadow }}>
          <div
            className="absolute inset-0 rounded-section"
            style={{
              background:
                "radial-gradient(135% 145% at 52% -8%, rgb(255, 189, 158) 0%, rgb(253, 188, 160) 6.43%, rgb(201, 158, 208) 21.2%, rgb(148, 127, 255) 36%, rgb(126, 100, 254) 58%, rgb(103, 72, 253) 80%, rgb(83, 54, 220) 85%, rgb(62, 36, 187) 90%, rgb(42, 18, 154) 95%, rgb(21, 0, 121) 100%)",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-end justify-center">
          <span className="block size-10 shrink-0 rounded-[17px] shadow-[0_0_0_24px_var(--primitive-main-beige)] sm:size-11 lg:size-[3.25rem]">
            <img
              src={viktorAvatar}
              alt="Viktor"
              width={52}
              height={52}
              className="block size-full rounded-[17px] object-cover"
            />
          </span>
        </div>
      </div>
    );
  }

  function WhenChooseCompetitorHeader() {
    return (
      <div className="relative h-24 overflow-visible rounded-section sm:h-28 lg:h-32">
        <div className="absolute inset-0 isolate rounded-section" style={{ boxShadow: whenChooseHeaderShadow }}>
          <div
            className="absolute inset-0 rounded-section"
            style={{ background: competitor.whenChooseHeaderGradient }}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-end justify-center">
          <span className="block size-10 shrink-0 rounded-[17px] shadow-[0_0_0_24px_var(--primitive-main-beige)] sm:size-11 lg:size-[3.25rem]">
            <div className="flex size-full items-center justify-center overflow-hidden rounded-[17px] border border-[#fffefc] bg-gradient-to-br from-[#f9f5f1] to-[#fffefc]">
              <img
                src={competitor.icon}
                alt={competitor.iconAlt}
                width={32}
                height={32}
                className="size-8 object-contain"
              />
            </div>
          </span>
        </div>
      </div>
    );
  }

  function WhenChooseColumn({
    variant,
    label,
    items,
    header,
  }: {
    variant: "viktor" | "competitor";
    label: string;
    items: string[];
    header: ReactNode;
  }) {
    return (
      <div className="flex min-w-0 flex-col">
        {header}
        <div className="relative z-20 mt-5 flex min-w-0 flex-col gap-4 sm:gap-5">
          <WhenChooseLabel variant={variant}>{label}</WhenChooseLabel>
          <div className="grid gap-4">
            {items.map((item) => (
              <WhenChooseItemCard key={item}>{item}</WhenChooseItemCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function WhenToChoose() {
    return (
      <section className="bg-primitive-main-beige py-14 sm:py-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
              <h2 className="font-heading text-3xl max-sm:text-[1.625rem] leading-tight font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
                {config.whenToChoose.title}
              </h2>
            </div>

            <div className="mx-auto grid w-full max-w-[66.5rem] gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
              <WhenChooseColumn
                variant="viktor"
                label="Choose Viktor if:"
                items={config.whenToChoose.viktorWhen}
                header={<WhenChooseViktorHeader />}
              />
              <WhenChooseColumn
                variant="competitor"
                label={config.whenToChoose.competitorChooseLabel}
                items={config.whenToChoose.competitorWhen}
                header={<WhenChooseCompetitorHeader />}
              />
            </div>

            <div className="flex w-full max-w-[552px] flex-col items-center gap-6">
              <GetStartedButton
                variant="dark"
                className="inline-flex h-14 min-h-14 w-full items-center justify-center gap-0 px-10 text-base tracking-[-0.01em] sm:w-auto"
              />
              <div className="flex flex-row flex-wrap items-center justify-center gap-8">
                {whenChooseTrustBadges.map((badge) => (
                  <div key={badge.label} className="flex shrink-0 items-center gap-4">
                    <span className="inline-flex text-[#1B182A33]">{badge.icon}</span>
                    <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.4] text-primary">
                      {badge.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const faqTitle = config.faqTitle ?? (
    <>
      Questions people ask
      <br />
      before adding Viktor
    </>
  );

  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title={config.meta.title}
        description={config.meta.description}
        ogTitle={config.meta.ogTitle}
        ogDescription={config.meta.ogDescription}
      />
      <Hero />
      <ComparisonTable />
      <CompareFeatureSections />
      <WhenToChoose />
      <TestimonialsCarousel items={config.testimonials} />
      <FAQSection faqs={config.faqs} title={faqTitle} />
      <StartFreeSection />
      <Footer />
    </div>
  );
}
