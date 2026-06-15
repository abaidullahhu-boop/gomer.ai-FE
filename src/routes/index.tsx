import { useEffect, useState, type ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CompareSection } from "@/components/site/CompareSection";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { UseCasesSection } from "@/components/site/UseCasesSection";
import slackLogo from "@/assets/images/slack.svg";
import zapierLogo from "@/assets/images/zapier.svg";
import microsoftLogo from "@/assets/images/microsoft-teams.svg";
import gomerAvatar from "@/assets/images/viktor-slack-avatar (1).svg";
import {
  WorkflowAutomation, ReportsAnalytics, AppBuilder, AskAI,
} from "@/components/site/HomeSections";
import { FAQSection } from "@/components/site/FAQSection";
import { StartFreeSection } from "@/components/site/StartFreeSection";
import { PricingHeroPoints, landingHeroBadges } from "@/components/site/HeroBadges";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { LogoWall } from "@/components/site/LogoWall";
import { SlackReactions } from "@/components/site/SlackReactions";

const toolLogos = ["Slack", "Zapier", "ClickUp", "GitHub", "HubSpot"];

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;

const testimonials = [
  { name: "Tobias Giesen", role: "CEO, Growably", saved: "1-3 hrs/week", quote: "Gomer is like Claude, but you can interact with him like with a colleague, not an LLM. He runs projects and scheduled tasks in the cloud.", image: avatar("photo-1507003211169-0a1dd7228f2d") },
  { name: "Antonín Štětina", role: "CEO, KULINA Group", saved: "10+ hrs/week", quote: "Mindblowing all-in-one AI which does everything in a single solution.", image: avatar("photo-1560250097-0b93528c311a") },
  { name: "Sam Kopelman", role: "CEO, Givr", saved: "10+ hrs/week", quote: "Gomer is like the most capable all-round colleague you can imagine.", image: avatar("photo-1472099645785-5658abf4ff4e") },
  { name: "Boris Wexler", role: "CEO, Space Dinosaurs", saved: "10+ hrs/week", quote: "Gomer is an incredible tool — it was almost instantly adopted by the bulk of my team.", image: avatar("photo-1500648767791-00dcc994a43e") },
  { name: "Robert Tyrrell", role: "Owner, TalentBright", saved: "10+ hrs/week", quote: "It's blown my mind seeing what Gomer can actually do. I'm having real conversations with my partner about investing in an AI tool the way we used to talk about hiring.", image: avatar("photo-1519345182560-3f2917c472ef") },
  { name: "Jordan Dikoum", role: "Co-Founder, UniTru Inc.", saved: "10+ hrs/week", quote: "Gomer is our eyes, ears, and hands. We might really never have to hire someone again.", image: avatar("photo-1506794778202-cad84cf45f1d") },
  { name: "Jacob Aldridge", role: "Founder, Como Business Coaching", saved: "3-5 hrs/week", quote: "Gomer may feel expensive for a monthly subscription, but is the cheapest employee I've ever hired AND the only one who acts on my midnight instructions.", image: avatar("photo-1573496359142-b8d87734a5a2") },
  { name: "Richard Comer", role: "Owner, Flagship Financial", saved: "10+ hrs/week", quote: "Like a virtual personal assistant who you don't have to manage as their therapist. He just does the work and doesn't complain.", image: avatar("photo-1580489944761-15a19d654956") },
  { name: "Matthias Lis", role: "CEO, CodeYourBrand", saved: "1-3 hrs/week", quote: "A proactive employee that learns what's important in your company and delivers without hesitation.", image: avatar("photo-1438761681033-6461ffad8d80") },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Gomer — Not a tool. A hire."
        description="Gomer is the AI coworker that connects to 3,000+ tools and does the work. Reports, dashboards, code, campaigns."
        ogTitle="Gomer — Not a tool. A hire."
        ogDescription="The AI coworker that ships real work in Slack and Teams."
      />
      <section className="border-0 py-0!" id="hero">
        <div className="relative w-full overflow-hidden rounded-b-section">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 h-[56.25rem] w-screen max-w-none -translate-x-1/2 rounded-b-section gradient-dark-2"
          />
          <Nav />
          <div className="hero-page-stack-pt relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-3 sm:px-5 pb-14 sm:gap-16 sm:px-10 sm:pb-16 md:px-14 md:pb-20 lg:gap-20 lg:px-20">
            <div className="flex w-full mt-13 sm:mt-16 flex-col items-center gap-8 text-center">
              <div className="flex w-full flex-col items-center gap-2">
                <div
                  data-slot="workspace-counter"
                  className="inline-flex max-h-10 max-w-full items-center gap-4 rounded-full border-0 bg-transparent px-6 py-2 text-white [&_span]:text-white"
                >
                  <span className="flex shrink-0 items-center gap-2" aria-hidden="true">
                    <img src={slackLogo} alt="" width={16} height={16} className="size-4 shrink-0" />
                    <img src={microsoftLogo} alt="" width={16} height={16} className="size-4 shrink-0" />
                  </span>
                  <span className="body-small font-medium min-w-0 truncate">30,000+ workspaces hired Gomer</span>
                </div>

                <h1 className="font-heading text-5xl leading-[1.1] font-bold tracking-[-2.4px] text-balance text-white max-sm:text-[2.625rem] sm:text-6xl sm:tracking-[-3.6px] lg:text-7xl xl:text-[80px] xl:tracking-[-4.8px]">
                  <span className="block">Not a tool.</span>
                  <span className="block">A hire.</span>
                </h1>
              </div>

              <div className="flex max-w-136.75 flex-col items-center gap-8">
                <p className="text-lg leading-[1.4] font-medium text-white">
                  Gomer is the AI employee that connects to 3,200+ tools and does the work. Reports, dashboards, code, campaigns.
                </p>

                <div className="flex w-full flex-col items-center gap-3">
                  <GetStartedButton className="inline-flex h-14 min-h-14 w-full items-center justify-center border border-white bg-white px-10 text-base tracking-[-0.01em] text-primitive-main-dark transition-all hover:opacity-90 active:translate-y-px sm:w-auto" />
                  <a
                    href="https://cal.com/forms/24cb15e9-8a3d-4d94-9209-cc3d5f198286"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    or talk to sales →
                  </a>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-center gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-8 [--text-primary:var(--primitive-main-white)]">
              <PricingHeroPoints badges={landingHeroBadges} />
            </div>

            <div className="flex w-full flex-col gap-10">
              <LogoWall />

              <div className="grid w-full gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-x-5 lg:gap-y-0">
                <FeatureCard
                  title="Real output, not just text."
                  body="Gomer doesn't brainstorm. He ships. PDFs your board can read. Dashboards your team actually uses. Web apps you'd think a developer built."
                  visual={<ChatPreview />}
                  contentClassName="pr-4"
                />
                <FeatureCard
                  title="One message, all your tools."
                  body="Stripe, Meta Ads, Notion, GitHub. Gomer queries them all in a single run. No tab-switching, no CSV exports."
                  visual={<ToolIconsVisual />}
                  visualOverflow
                />
                <FeatureCard
                  title="Never repeat yourself."
                  body="Every conversation makes Gomer smarter about your business. He remembers what worked, what didn't, and how you like things done."
                  visual={<FollowUpPreview />}
                  visualAlign="end"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <CompareSection />

      {/* TESTIMONIALS */}
      <TestimonialsCarousel items={testimonials} />

      {/* APP BUILDER */}
      <AppBuilder />

      {/* USE CASES */}
      <UseCasesSection />

      {/* ASK AI */}
      <AskAI />

      {/* FAQ */}
      <FAQSection id="faq" />

      {/* START FREE */}
      <StartFreeSection />

      <Footer />
    </div>
  );
}

const annaAvatar =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";
const lisaAvatar =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";
const stevenAvatar =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

function FeatureGlassCardShell({ children }: { children: ReactNode }) {
  return (
    <article className="relative h-full min-h-96 overflow-hidden rounded-section">
      <div className="h-full min-h-96 w-full overflow-hidden rounded-[35px] backdrop-blur-[20px]">
        <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[20px] z-0"
            style={{ borderRadius: "inherit", background: "rgb(255, 255, 255)", filter: "blur(20px)" }}
          />
          <div className="relative z-[1] h-full w-full rounded-[inherit]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
              style={{
                background: "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
              style={{
                background:
                  "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
              style={{ filter: "blur(5px)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{
                  background:
                    "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "4px",
                }}
              />
            </div>
            <div className="relative z-[2] flex h-full w-full flex-col justify-between">{children}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeatureCard({
  title,
  body,
  visual,
  visualAlign = "start",
  visualOverflow,
  contentClassName = "",
}: {
  title: string;
  body: string;
  visual: ReactNode;
  visualAlign?: "start" | "end";
  visualOverflow?: boolean;
  contentClassName?: string;
}) {
  return (
    <FeatureGlassCardShell>
      <div className="relative flex h-full min-h-0 flex-col rounded-[inherit]">
        <div
          className={`flex min-h-0 flex-1 p-0 ${visualOverflow ? "overflow-hidden" : ""} ${visualAlign === "end" ? "flex-col justify-end" : ""}`}
        >
          {visual}
        </div>
        <div className={`shrink-0 p-8 ${contentClassName}`}>
          <div className="flex flex-col gap-4">
            <h5 className="font-heading h5 text-primitive-main-dark">{title}</h5>
            <p className="body-main text-secondary font-medium">{body}</p>
          </div>
        </div>
      </div>
    </FeatureGlassCardShell>
  );
}

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm bg-slack-mention px-1 py-0.5 align-baseline whitespace-nowrap text-sm leading-snug text-slack-mention">
      {children}
    </span>
  );
}

function SlackUserMessage({
  name,
  time,
  avatar,
  body,
  reactions,
}: {
  name: string;
  time: string;
  avatar: string;
  body: ReactNode;
  reactions?: ReactNode;
}) {
  return (
    <div className="relative isolate flex w-full gap-2 rounded-lg border border-solid border-transparent bg-transparent px-[var(--slack-message-pad-x)] py-0 text-left">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
        <img alt={name} loading="lazy" width={36} height={36} className="size-full object-cover" src={avatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small font-medium text-slack">{name}</span>
          <span className="text-xs font-normal text-slack-secondary">{time}</span>
        </div>
        <div className="body-main font-normal text-slack">{body}</div>
        {reactions}
      </div>
    </div>
  );
}

function SlackGomerMessage({
  time,
  body,
  attachment,
}: {
  time: string;
  body: ReactNode;
  attachment?: ReactNode;
}) {
  return (
    <div
      data-variant="gomer"
      data-highlighted="true"
      className="relative isolate flex w-full gap-2 overflow-hidden px-[var(--slack-message-pad-x)] py-4 text-left slack-message-gomer"
    >
      <div aria-hidden="true" className="slack-gomer-bg-mount">
        <div className="slack-gomer-layer-glass-stack" />
        <div className="slack-gomer-layer-inner-depth-soft" />
        <div className="slack-gomer-layer-inner-glow-overlay" />
        <div className="slack-gomer-layer-feather-blur" />
        <div className="slack-gomer-layer-white-sheet" />
      </div>
      <div className="relative z-[1] flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-transparent">
        <img alt="Gomer" loading="lazy" width={36} height={36} className="size-full object-cover" src={gomerAvatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="mb-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small font-medium text-slack">
            <span className="inline-flex items-center gap-1.5">
              <span>Gomer</span>
              <span className="inline-flex items-center rounded-sm bg-slack-app-badge px-1 py-px text-[12px] leading-tight font-normal tracking-wide text-slack-app-badge uppercase">
                APP
              </span>
            </span>
          </span>
          <span className="text-xs font-normal text-slack-secondary">{time}</span>
        </div>
        <div className="body-main font-normal text-slack">{body}</div>
        {attachment}
      </div>
    </div>
  );
}

const INTEGRATION_WHEEL_LOGOS = [
  { id: "slack", icon: <img src={slackLogo} alt="" className="h-auto max-h-10 w-auto max-w-10 object-contain" draggable={false} /> },
  { id: "zapier", icon: <img src={zapierLogo} alt="" className="h-auto max-h-10 w-auto max-w-10 object-contain" draggable={false} /> },
  { id: "clickup", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden><path fill="#7B68EE" d="M2 18.5 10.5 2l3.5 2.2L5.5 18.5H2zm12.2 0L22 5.7 18.5 3.5 11 18.5h3.2z"/></svg> },
  { id: "github", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#111" aria-hidden><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/></svg> },
  { id: "hubspot", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#ff7a59" aria-hidden><path d="M18.16 8.84V6.5a1.83 1.83 0 1 0-1.6 0v2.34a5.18 5.18 0 0 0-2.51.92L7.31 4.4a2.05 2.05 0 1 0-1.07 1.4l6.55 5.09a5.2 5.2 0 1 0 5.37-2.05Zm-1.6 7.92a2.6 2.6 0 1 1 2.6-2.6 2.6 2.6 0 0 1-2.6 2.6Z"/></svg> },
  { id: "meta-ads", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden><path fill="#0081FB" d="M7.5 19.5c-3.2 0-5.5-2.6-5.5-6.2 0-4.2 2.8-7.3 6.2-7.3 2.5 0 4.1 1.5 4.8 3.5.7-2 2.3-3.5 4.8-3.5 3.4 0 6.2 3.1 6.2 7.3 0 3.6-2.3 6.2-5.5 6.2-2.6 0-4.2-1.8-5-4.2-.8 2.4-2.4 4.2-5 4.2z"/></svg> },
  { id: "notion", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden><path fill="#000" d="M4.5 3.2 12 1.5l7.5 1.7v15.1L12 21.5 4.5 18.4V3.2zm1.4 1.5v12.6l5.1 2.2V6.9L5.9 4.7zm6.5 2.2v11.8l5.1-2.2V6.9l-5.1-2.2z"/></svg> },
  { id: "linear", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden><path fill="#5E6AD2" d="M3 17.3 17.3 3l3.7 3.7L6.7 21 3 17.3zm0-6.6L10.7 3l3.7 3.7L6.7 14.4 3 10.7z"/></svg> },
  { id: "trello", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden><rect x="3" y="3" width="18" height="18" rx="2.5" fill="#0079BF"/><rect x="5.5" y="5.5" width="5" height="11" rx="1" fill="#fff"/><rect x="13.5" y="5.5" width="5" height="7" rx="1" fill="#fff"/></svg> },
  { id: "airtable", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden><path fill="#FCB400" d="M3 5.5 12 2l9 3.5v2.2L12 12 3 7.7V5.5z"/><path fill="#18BFFF" d="M3 8.5 12 13l9-4.5V18l-9 4-9-4V8.5z"/></svg> },
  { id: "asana", icon: <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden><circle cx="12" cy="6.5" r="3.5" fill="#F06A6A"/><circle cx="5.5" cy="16" r="3.5" fill="#F06A6A"/><circle cx="18.5" cy="16" r="3.5" fill="#F06A6A"/></svg> },
] as const;

const WHEEL_SIZE = 528;
const WHEEL_RADIUS = 270;
const LOGO_CARD_SIZE = 90;
const INTEGRATION_STEP_HOLD_MS = 2500;
const INTEGRATION_STEP_MS = 650;

function integrationRelativeSlot(logoIndex: number, activeIndex: number, count: number) {
  let diff = logoIndex - activeIndex;
  while (diff > count / 2) diff -= count;
  while (diff < -count / 2) diff += count;
  return diff;
}

function IntegrationLogoCard({ children, featured }: { children: ReactNode; featured?: boolean }) {
  return (
    <div
      className={`flex size-full items-center justify-center overflow-visible rounded-lg border border-[#fffefc] bg-[linear-gradient(135deg,rgb(249_245_241)_19.749%,rgb(255_254_252)_100.45%)] shadow-[0_8px_16px_0_rgb(26_24_41/6%),inset_1.8px_1.8px_3.6px_0_#f5f1ed] transition-opacity duration-[50ms] ease-out ${featured ? "opacity-100" : "opacity-90"}`}
    >
      <div className="flex size-full items-center justify-center overflow-hidden rounded-[inherit] px-2 py-2">
        {children}
      </div>
    </div>
  );
}

function ToolIconsVisual() {
  const count = INTEGRATION_WHEEL_LOGOS.length;
  const [step, setStep] = useState(0);
  const activeIndex = ((step % count) + count) % count;
  const rotation = step * (360 / count);
  const stepEase = `transform ${INTEGRATION_STEP_MS}ms cubic-bezier(0.45, 0, 0.2, 1)`;

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => s + 1);
    }, INTEGRATION_STEP_HOLD_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-full min-h-0 w-full flex-1 overflow-hidden" aria-hidden="true">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto max-w-xl"
        style={{
          height: "9.24rem",
          background: "radial-gradient(60% 100% at 50% -10%, rgba(237, 229, 251, 0.95), transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 translate-y-[5.5rem]"
        style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
      >
        <div
          className="relative h-full w-full will-change-transform"
          style={{ transform: `rotate(${rotation}deg)`, transition: stepEase }}
        >
          {INTEGRATION_WHEEL_LOGOS.map((logo, i) => {
            const angle = (i / count) * 360;
            const slot = integrationRelativeSlot(i, activeIndex, count);
            const featured = slot === 0;

            return (
              <div
                key={logo.id}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  width: LOGO_CARD_SIZE,
                  height: LOGO_CARD_SIZE,
                  marginLeft: -LOGO_CARD_SIZE / 2,
                  marginTop: -LOGO_CARD_SIZE / 2,
                  transform: `rotate(${angle}deg) translateY(-${WHEEL_RADIUS}px)`,
                  transformOrigin: "50% 50%",
                  zIndex: featured ? 3 : 1,
                  transition: stepEase,
                }}
              >
                <IntegrationLogoCard featured={featured}>{logo.icon}</IntegrationLogoCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="flex min-h-0 w-full flex-col gap-2 px-3 pt-8 pb-3 sm:px-4 sm:pb-4">
      <SlackUserMessage
        name="Anna"
        time="1:23 PM"
        avatar={annaAvatar}
        body={
          <>
            <SlackMention>@Gomer</SlackMention> we need a competitive analysis
          </>
        }
      />
      <SlackUserMessage
        name="Lisa"
        time="1:23 PM"
        avatar={lisaAvatar}
        body={
          <>
            <SlackMention>@Gomer</SlackMention> make it a PDF plssss
          </>
        }
      />
      <SlackGomerMessage
        time="2:43 PM"
        body={
          <>
            Here you go <SlackMention>@Lisa</SlackMention> and <SlackMention>@Anna</SlackMention>
          </>
        }
        attachment={
          <div className="mt-2 flex w-full max-w-full min-w-0 items-center gap-1" aria-label="Attachment competitive-analysis.pdf">
            <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center text-[13px] leading-[1.4] text-[var(--slack-add-reaction-icon)] opacity-80">
              📎
            </span>
            <div className="slack-attached-pill">
              <span className="min-w-0 truncate text-[13px] leading-[1.4] tracking-[-0.26px] font-normal">
                competitive-analysis.pdf
              </span>
            </div>
          </div>
        }
      />
    </div>
  );
}

function SpinningTools() {
  return (
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 rounded-full border border-white/40" />
      <div className="absolute inset-6 rounded-full border border-white/30" />
      <div className="absolute inset-0 animate-spin-slow">
        {toolLogos.slice(0, 8).map((t, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 50 + 45 * Math.cos(angle);
          const y = 50 + 45 * Math.sin(angle);
          return (
            <div key={t} style={{ left: `${x}%`, top: `${y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center text-[10px] font-bold text-foreground">
              {t.slice(0,2)}
            </div>
          );
        })}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center font-display text-3xl">V</div>
    </div>
  );
}

function FollowUpPreview() {
  return (
    <div className="flex min-h-0 w-full flex-col justify-end gap-2 px-3 pt-8 pb-3 sm:px-4 sm:pb-4">
      <SlackUserMessage
        name="Steven"
        time="2:43 PM"
        avatar={stevenAvatar}
        body={
          <>
            <SlackMention>@Gomer</SlackMention> any updates?
          </>
        }
        reactions={<SlackReactions initial={[{ emoji: "👀", count: 1 }]} />}
      />
      <SlackGomerMessage time="2:43 PM" body="No response from Acme. Smells fishy. 🐟" />
      <SlackGomerMessage time="2:43 PM" body="I just followed up with them" />
    </div>
  );
}

function TestimonialRow({ items, duration, reverse }: { items: typeof testimonials; duration: string; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className="flex gap-5 w-max" style={{ animation: `marquee ${duration} linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}>
        {doubled.map((t, i) => (
          <div key={i} className="w-[380px] shrink-0 rounded-3xl bg-card border border-border p-7 shadow-sm">
            <div className="text-xs text-violet-600 font-semibold">Saved: {t.saved}</div>
            <p className="mt-3 text-foreground leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-violet-500" />
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


