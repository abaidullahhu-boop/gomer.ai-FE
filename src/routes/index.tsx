import { useEffect, useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CompareSection } from "@/components/site/CompareSection";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { UseCasesSection } from "@/components/site/UseCasesSection";
import slackLogo from "@/assets/images/slack.svg";
import zapierLogo from "@/assets/images/zapier.svg";
import microsoftLogo from "@/assets/images/microsoft-teams.svg";
import viktorAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import {
  WorkflowAutomation, ReportsAnalytics, AppBuilder, AskAI,
} from "@/components/site/HomeSections";
import { FAQSection } from "@/components/site/FAQSection";
import { StartFreeSection } from "@/components/site/StartFreeSection";
import { HeroBadges } from "@/components/site/HeroBadges";
import { GetStartedButton } from "@/components/site/GetStartedButton";

const trustedLogos = ["Squibler", "True Classic", "Accel", "Ridge", "LYFEfuel"];

const toolLogos = ["Slack", "Zapier", "ClickUp", "GitHub", "HubSpot"];

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;

const testimonials = [
  { name: "Tobias Giesen", role: "CEO, Growably", saved: "1-3 hrs/week", quote: "Viktor is like Claude, but you can interact with him like with a colleague, not an LLM. He runs projects and scheduled tasks in the cloud.", image: avatar("photo-1507003211169-0a1dd7228f2d") },
  { name: "Antonín Štětina", role: "CEO, KULINA Group", saved: "10+ hrs/week", quote: "Mindblowing all-in-one AI which does everything in a single solution.", image: avatar("photo-1560250097-0b93528c311a") },
  { name: "Sam Kopelman", role: "CEO, Givr", saved: "10+ hrs/week", quote: "Viktor is like the most capable all-round colleague you can imagine.", image: avatar("photo-1472099645785-5658abf4ff4e") },
  { name: "Boris Wexler", role: "CEO, Space Dinosaurs", saved: "10+ hrs/week", quote: "Viktor is an incredible tool — it was almost instantly adopted by the bulk of my team.", image: avatar("photo-1500648767791-00dcc994a43e") },
  { name: "Robert Tyrrell", role: "Owner, TalentBright", saved: "10+ hrs/week", quote: "It's blown my mind seeing what Viktor can actually do. I'm having real conversations with my partner about investing in an AI tool the way we used to talk about hiring.", image: avatar("photo-1519345182560-3f2917c472ef") },
  { name: "Jordan Dikoum", role: "Co-Founder, UniTru Inc.", saved: "10+ hrs/week", quote: "Viktor is our eyes, ears, and hands. We might really never have to hire someone again.", image: avatar("photo-1506794778202-cad84cf45f1d") },
  { name: "Jacob Aldridge", role: "Founder, Como Business Coaching", saved: "3-5 hrs/week", quote: "Viktor may feel expensive for a monthly subscription, but is the cheapest employee I've ever hired AND the only one who acts on my midnight instructions.", image: avatar("photo-1573496359142-b8d87734a5a2") },
  { name: "Richard Comer", role: "Owner, Flagship Financial", saved: "10+ hrs/week", quote: "Like a virtual personal assistant who you don't have to manage as their therapist. He just does the work and doesn't complain.", image: avatar("photo-1580489944761-15a19d654956") },
  { name: "Matthias Lis", role: "CEO, CodeYourBrand", saved: "1-3 hrs/week", quote: "A proactive employee that learns what's important in your company and delivers without hesitation.", image: avatar("photo-1438761681033-6461ffad8d80") },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Viktor — Not a tool. A hire."
        description="Viktor is the AI coworker that connects to 3,000+ tools and does the work. Reports, dashboards, code, campaigns."
        ogTitle="Viktor — Not a tool. A hire."
        ogDescription="The AI coworker that ships real work in Slack and Teams."
      />
      {/* HERO with peach->violet->indigo gradient */}
      <section className="relative pt-6 pb-14 overflow-hidden rounded-b-2xl bg-hero">
        <Nav />
        <div className="relative mx-auto max-w-5xl px-6 pt-40 text-center">
          <div className="inline-flex items-center gap-3 px-4 pb-4 pt-8 rounded-full text-white/95 text-sm">
            <div className="flex space-x-2 pr-1">
              <img src={slackLogo} alt="Slack" className="w-4 h-4" />
              <img src={microsoftLogo} alt="Microsoft Teams" className="w-4 h-4" />
            </div>
            
            <span className="text-white">25,000+ workspaces hired Viktor </span>
          </div>

          <h1 className="font-heading text-5xl leading-[1.1] font-bold tracking-[-2.4px] text-balance text-white max-sm:text-[2.625rem] sm:text-6xl sm:tracking-[-3.6px] lg:text-7xl xl:text-[80px] xl:tracking-[-4.8px]">
            Not a tool.<br />A hire.
          </h1>

          <p className="mt-8 mx-auto max-w-136.75 font-medium text-white text-lg leading-[1.4]">
            Viktor is the AI employee that connects to 3,200+ tools and does the work. Reports, dashboards, code, campaigns.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <GetStartedButton />
            <a className="text-white/80 text-sm underline underline-offset-4">or talk to sales →</a>
          </div>

          <HeroBadges />

          <div className="mt-20 mb-6">
            <LogoMarquee logos={trustedLogos} />
          </div>
        </div>
      </section>

      {/* OUTPUT / FEATURES — visuals overlap hero bottom */}
      <section className="px-4 md:px-4 lg:px-20 relative z-10 pb-24 bg-section-cream overflow-x-clip">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-5 items-start min-w-0">
          <FeatureCard
            title="Real output, not just text."
            body="Viktor doesn't brainstorm. It ships. PDFs your board can read. Dashboards your team actually uses. Web apps you'd think a developer built."
            visual={<ChatPreview />}
          />
          <FeatureCard
            title="One message, all your tools."
            body="Stripe, Meta Ads, Notion, GitHub. Viktor queries them all in a single run. No tab-switching, no CSV exports."
            visual={<ToolIconsVisual />}
            tinted
          />
          <FeatureCard
            title="Never repeat yourself."
            body="Every conversation makes Viktor smarter about your business. It remembers what worked, what didn't, and how you like things done."
            visual={<FollowUpPreview />}
          />
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
      <FAQSection />

      {/* START FREE */}
      <StartFreeSection />

      <Footer />
    </div>
  );
}

const LOGO_REVEAL_MS = 900;
const LOGO_HOLD_MS = 2500;

function logoRevealOrder(count: number): number[] {
  const order: number[] = [];
  for (let group = 0; group * 3 < count; group++) {
    const base = group * 3;
    for (const i of [base, base + 2, base + 1]) {
      if (i < count) order.push(i);
    }
  }
  return order;
}

function logoRevealDelay(slotIndex: number, count: number) {
  const pos = logoRevealOrder(count).indexOf(slotIndex);
  return (pos >= 0 ? pos : slotIndex) * (LOGO_REVEAL_MS / 1000);
}

function LogoMarquee({ logos }: { logos: string[] }) {
  const count = logos.length;
  const revealOrder = logoRevealOrder(count);
  const [offset, setOffset] = useState(0);

  const batch = Array.from({ length: count }, (_, i) => logos[(offset + i) % logos.length]);

  useEffect(() => {
    const cycleMs = revealOrder.length * LOGO_REVEAL_MS + LOGO_HOLD_MS;
    const t = setInterval(() => setOffset((o) => (o + 1) % logos.length), cycleMs);
    return () => clearInterval(t);
  }, [logos.length, revealOrder.length]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-y-4">
      <span className="text-white/70 text-sm shrink-0 mr-6 md:mr-10">Trusted by:</span>
      <div className="flex items-center justify-center">
        {batch.map((name, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && <div className="w-px h-8 bg-white/25 mx-5 md:mx-8 shrink-0" aria-hidden />}
            <div className="h-10 overflow-hidden flex items-center justify-center">
              <span
                key={`${offset}-${i}`}
                className="animate-logo-slide-up text-white/80 text-lg md:text-2xl font-display whitespace-nowrap"
                style={{ animationDelay: `${logoRevealDelay(i, count)}s` }}
              >
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ title, body, visual, tinted }: { title: string; body: string; visual: React.ReactNode; tinted?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden bg-white/50 rounded-[40px]">
      <div className="relative rounded-[32px] overflow-hidden min-h-[340px] flex items-center justify-center px-4 py-8">
        <div className="relative z-10 w-full min-w-0 max-w-full flex items-center justify-center overflow-hidden">{visual}</div>
      </div>
      <div className="pt-6 pb-6 px-3">
        <h3 className="font-display text-[22px] leading-tight text-foreground font-bold tracking-tight">{title}</h3>
        <p className="mt-3 text-foreground/60 leading-relaxed text-[15px]">{body}</p>
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

const WHEEL_SIZE = 420;
const WHEEL_RADIUS = 210;
const LOGO_CARD_SIZE = 88;
const INTEGRATION_STEP_HOLD_MS = 2500;
const INTEGRATION_STEP_MS = 650;

function integrationRelativeSlot(logoIndex: number, activeIndex: number, count: number) {
  let diff = logoIndex - activeIndex;
  while (diff > count / 2) diff -= count;
  while (diff < -count / 2) diff += count;
  return diff;
}

function IntegrationLogoCard({ children, featured }: { children: React.ReactNode; featured?: boolean }) {
  return (
    <div
      className={`flex size-full items-center justify-center overflow-visible rounded-lg border border-[#fffefc] bg-[linear-gradient(135deg,rgb(249_245_241)_19.749%,rgb(255_254_252)_100.45%)] ${
        featured
          ? "shadow-[0_12px_24px_0_rgb(26_24_41/10%),inset_1.8px_1.8px_3.6px_0_#f5f1ed]"
          : "shadow-[0_8px_16px_0_rgb(26_24_41/6%),inset_1.8px_1.8px_3.6px_0_#f5f1ed]"
      }`}
    >
      <div className="flex size-full items-center justify-center overflow-hidden rounded-[inherit] p-2">
        {children}
      </div>
    </div>
  );
}

function ToolIconsVisual() {
  const count = INTEGRATION_WHEEL_LOGOS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const rotation = activeIndex * (360 / count);
  const stepEase = `transform ${INTEGRATION_STEP_MS}ms cubic-bezier(0.45, 0, 0.2, 1)`;

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, INTEGRATION_STEP_HOLD_MS);
    return () => clearInterval(t);
  }, [count]);

  useEffect(() => {
    const t = setTimeout(() => setDisplayIndex(activeIndex), INTEGRATION_STEP_MS);
    return () => clearTimeout(t);
  }, [activeIndex]);

  return (
    <div className="relative h-[220px] w-full" aria-hidden="true">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto max-w-xl"
        
      />
      <div
        className="relative z-0 mx-auto h-full w-full max-w-[340px] overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 translate-y-[3.75rem]"
          style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
        >
          <div
            className="relative h-full w-full will-change-transform"
            style={{ transform: `rotate(${rotation}deg)`, transition: stepEase }}
          >
            {INTEGRATION_WHEEL_LOGOS.map((logo, i) => {
              const angle = (i / count) * 360;
              const slot = integrationRelativeSlot(i, displayIndex, count);
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
                    transform: `rotate(${angle}deg) translateY(-${WHEEL_RADIUS}px) scale(${featured ? 1 : 0.94})`,
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
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  if (name === "Anna") {
    return (
      <img
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="Anna"
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
    );
  }
  if (name === "Lisa") {
    return (
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="Lisa"
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
    );
  }
  if (name === "Steven") {
    return (
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="Steven"
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <img
      src={viktorAvatar}
      alt="Viktor"
      className="w-8 h-8 rounded-lg object-cover shrink-0 shadow-[0_2px_6px_rgba(98,54,255,0.25)]"
    />
  );
}

function ViktorBubble({ time, body }: { time: string; body: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-3 border border-white/60 shadow-[0_4px_12px_rgba(98,54,255,0.2)] backdrop-blur-md w-full"
      style={{
        background: "linear-gradient(90deg, #FAF2ED 40%,rgb(241, 239, 249) 90%)",
      }}
    >
      <ChatBubble name="Viktor" badge="APP" time={time} body={body} />
    </div>
  );
}

function ChatBubble({ name, time, body, badge }: { name: string; time: string; body: React.ReactNode; badge?: string }) {
  return (
    <div className="flex gap-3 items-start">
      <Avatar name={name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-semibold text-foreground text-[13px]">{name}</span>
          {badge && (
            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#6236FF] text-white text-[9px] font-bold tracking-wider leading-none">
              {badge}
            </span>
          )}
          <span className="text-[#A1A1AA] text-[11px] ml-1">{time}</span>
        </div>
        <div className="text-md text-foreground/90 leading-normal mt-0.5">{body}</div>
      </div>
    </div>
  );
}

function Mention({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-[5px] bg-[#ECE9FE] text-[#6236FF]  text-md leading-none select-none">
      {children}
    </span>
  );
}

function ChatPreview() {
  return (
    <div className="w-full max-w-[300px] flex flex-col gap-3">
      <ChatBubble
        name="Anna"
        time="1:23 PM"
        body={<><Mention>@Viktor</Mention> we need a competitive analysis</>}
      />
      <ChatBubble
        name="Lisa"
        time="1:23 PM"
        body={<><Mention>@Viktor</Mention> make it a PDF plssss</>}
      />
      <ViktorBubble
        time="2:43 PM"
        body={
          <>
            <span>
              Here you go <Mention>@Lisa</Mention> and <br /> <Mention>@Anna</Mention>
            </span>
            <div className="mt-2.5 inline-flex items-center gap-1.5">
              <span className="text-[13px] leading-none">📎</span>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[radial-gradient(ellipse_160%_120%_at_52%_-24%,#ffbd9e_0%,#fdbca0_6%,#947fff_51%,#6748fd_80%,#150079_100%)] text-white text-xs font-semibold shadow-[0_4px_12px_rgba(98,54,255,0.2)] cursor-pointer select-none">
                <span>competitive-analysis..</span>
              </div>
            </div>
          </>
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
    <div className="flex flex-col gap-3 w-full max-w-[300px]">
      <div className="">
        <ChatBubble
          name="Steven"
          time="2:43 PM"
          body={<><Mention>@Viktor</Mention> any updates?</>}
        />
        <div className="flex items-center gap-2 mt-2.5 ml-11">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F4F6] border border-[#E4E4E7] text-xs font-medium text-foreground/80 shadow-sm cursor-pointer select-none">
            <span>👀</span>
            <span className="font-bold text-[10px] text-foreground/70">1</span>
          </div>
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F4F4F6] border border-[#E4E4E7] text-xs text-muted-foreground cursor-pointer select-none">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#71717A] stroke-[2.5] fill-none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      <ViktorBubble time="2:43 PM" body="No response from Acme. Smells fishy. 🐟" />
      <ViktorBubble time="2:43 PM" body="I just followed up with them" />
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


