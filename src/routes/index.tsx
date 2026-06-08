import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  WorkflowAutomation, ReportsAnalytics, AppBuilder, FAQ,
  AskAI, StartFree,
} from "@/components/site/HomeSections";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Viktor — Not a tool. A hire." },
      { name: "description", content: "Viktor is the AI coworker that connects to 3,000+ tools and does the work. Reports, dashboards, code, campaigns." },
      { property: "og:title", content: "Viktor — Not a tool. A hire." },
      { property: "og:description", content: "The AI coworker that ships real work in Slack and Teams." },
    ],
  }),
  component: Index,
});

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

function Index() {
  return (
    <div className="min-h-screen">
      {/* HERO with peach->violet->indigo gradient */}
      <section className="relative pt-6 pb-14 overflow-hidden rounded-b-2xl bg-hero">
        <Nav />
        <div className="relative mx-auto max-w-5xl px-6 pt-40 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-4 rounded-full text-white/95 text-sm">
            <div className="flex space-x-2">
              <img src={slackLogo} alt="Slack" className="w-5 h-5" />
              <img src={microsoftLogo} alt="Microsoft Teams" className="w-5 h-5" />
            </div>
            25,000+ workspaces hired Viktor
          </div>

          <h1 className="font-heading text-5xl leading-[1.1] font-bold tracking-[-2.4px] text-balance text-white max-sm:text-[2.625rem] sm:text-6xl sm:tracking-[-3.6px] lg:text-7xl xl:text-[80px] xl:tracking-[-4.8px]">
            Not a tool.<br />A hire.
          </h1>

          <p className="mt-10 mx-auto max-w-xl text-white text-lg leading-relaxed">
            Viktor is the AI coworker that connects to 3,000+ tools and does the work. Reports, dashboards, code, campaigns.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button className="px-8 py-4 rounded-full bg-white text-foreground font-medium text-base hover:bg-white/95 transition">
              Get Started for Free
            </button>
            <a className="text-white/80 text-sm underline underline-offset-4">or talk to sales →</a>
          </div>

          <div className="mt-16 pb-3 flex flex-wrap justify-center items-center gap-8 text-white/85 text-sm">

            <BadgeItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="size-5 shrink-0" aria-hidden="true">
                <g opacity="0.5" fill="currentColor">
                  <path d="M15.403 1.53687L15.3809 1.51479C13.9792 0.113128 12.1922 -0.299302 10.2382 0.20911C8.33003 0.70559 6.27473 2.07099 4.17286 4.17284C2.07099 6.27471 0.705597 8.33001 0.209119 10.2382C0.0725881 10.7629 0.00246034 11.2756 6.30673e-05 11.772C-0.00643744 13.1241 0.489523 14.3554 1.51474 15.3807C2.91641 16.7823 4.70337 17.1947 6.65737 16.6863C8.56553 16.1899 10.6208 14.8244 12.7227 12.7226C14.8246 10.6207 16.19 8.5654 16.6864 6.65726C17.1921 4.71356 16.7869 2.93517 15.403 1.53687Z" />
                  <path d="M18.2587 4.39263L18.4853 4.6192C19.8869 6.02086 20.2993 7.80781 19.7909 9.76183C19.6916 10.1433 19.5576 10.5308 19.39 10.9232L17.3421 8.87539C17.6446 8.2537 17.8803 7.6312 18.042 7.00996C18.2737 6.11926 18.3486 5.23901 18.2587 4.39263Z" />
                  <path d="M18.718 12.2321C18.1153 13.242 17.308 14.2783 16.313 15.3283L14.1992 13.2146C15.1596 12.2041 15.9816 11.1781 16.6319 10.146L18.718 12.2321Z" />
                  <path d="M15.3224 16.3186C14.2717 17.3137 13.2347 18.1206 12.2242 18.7226L10.1383 16.6367C11.171 15.9869 12.1976 15.1651 13.2087 14.2048L15.3224 16.3186Z" />
                  <path d="M10.9144 19.3937L8.86687 17.3461C8.24806 17.6467 7.62846 17.881 7.01007 18.0419C6.1193 18.2736 5.23897 18.3486 4.3925 18.2586L4.6192 18.4853C6.02086 19.8869 7.80781 20.2993 9.76183 19.7909C10.1405 19.6923 10.525 19.5596 10.9144 19.3937Z" />
                </g>
              </svg>
              <span>$100 in free credits</span>
            </BadgeItem>

            <BadgeItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="size-5 shrink-0" aria-hidden="true"><g opacity="0.5" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M14.6866 0.313814C14.2681 -0.104605 13.5897 -0.104605 13.1713 0.313814C12.7529 0.732233 12.7529 1.41062 13.1713 1.82904L14.9137 3.57144L13.1713 5.31381C12.7529 5.73223 12.7529 6.41063 13.1713 6.82904C13.5897 7.24746 14.2681 7.24746 14.6866 6.82904L16.429 5.08667L18.1711 6.82884C18.5896 7.24727 19.2679 7.24727 19.6863 6.82884C20.1047 6.41043 20.1047 5.73203 19.6863 5.31361L17.9441 3.57144L19.6863 1.82924C20.1047 1.41082 20.1047 0.73243 19.6863 0.314011C19.268 -0.104407 18.5896 -0.104407 18.1711 0.314011L16.429 2.05621L14.6866 0.313814ZM11.9086 8.09173C10.8863 7.06936 10.8007 5.46493 11.6519 4.3451C10.9136 4.30794 10.1228 4.28589 9.28571 4.28589C5.95984 4.28589 4.44051 4.56681 3.09029 4.8182C2.89307 4.85493 2.70333 4.89024 2.51217 4.92386C1.12592 5.16767 0 6.36439 0 7.86087V9.17637H18.5714V8.90609C17.9634 8.82989 17.3753 8.55837 16.9084 8.09153L16.429 7.61204L15.9493 8.09173C14.8334 9.20751 13.0244 9.20751 11.9086 8.09173ZM0 16.4103V10.9621H18.5714V16.4103C18.5714 17.9321 17.3953 19.1237 15.9863 19.375C15.821 19.4044 15.6561 19.4351 15.4859 19.4669L15.4811 19.4679C14.1309 19.7193 12.6116 20 9.28571 20C5.95986 20 4.44053 19.7191 3.09031 19.4677C2.91831 19.4357 2.75197 19.4047 2.58513 19.375C1.17609 19.1237 0 17.9321 0 16.4103ZM12.2217 14.1288C11.7286 14.1288 11.3288 14.5286 11.3288 15.0216C11.3288 15.5147 11.7286 15.9144 12.2217 15.9144H15.1253C15.6183 15.9144 16.0181 15.5147 16.0181 15.0216C16.0181 14.5286 15.6183 14.1288 15.1253 14.1288H12.2217Z"></path></g></svg>
              <span>No credit card required</span>
            </BadgeItem>

            <BadgeItem>
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="size-5 shrink-0" aria-hidden="true"><g opacity="0.5" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M9.10746 0.108826C7.81167 0.28318 6.2465 0.7724 4.9648 1.22955C4.14854 1.52069 3.41396 1.81138 2.88367 2.02915C2.61828 2.13814 2.40347 2.22911 2.25447 2.29307C2.17997 2.32504 2.12187 2.35028 2.08211 2.36767L2.03644 2.38771L2.02436 2.39305L2.02107 2.39449L2.02013 2.39492C2.02003 2.39497 2.01967 2.39512 2.30968 3.04788L2.02013 2.39492C1.9989 2.40435 1.97768 2.41502 1.95747 2.42647L2.30968 3.04788C1.95747 2.42647 1.95666 2.42694 1.95583 2.42741L1.95413 2.42838L1.95064 2.43039L1.94326 2.43474L1.92686 2.44474C1.91521 2.45201 1.90217 2.46049 1.88786 2.47031C1.8592 2.48995 1.82553 2.51485 1.78767 2.54594C1.71181 2.60824 1.62006 2.69464 1.51876 2.81219C1.3158 3.04771 1.07862 3.40347 0.853064 3.93304C0.429008 4.92864 0.0422208 6.54699 0.000244141 9.17189H9.10746V0.108826ZM0.0791055 10.9576C0.44511 13.7848 1.98286 15.803 3.80381 17.212C5.54868 18.5622 7.56634 19.3669 9.10746 19.8359V10.9576H0.0791055ZM10.8932 19.8912C12.4486 19.4302 14.5205 18.6144 16.2962 17.2069C18.0775 15.7949 19.5679 13.7775 19.9231 10.9576H10.8932V19.8912ZM19.9998 9.17189H10.8932V0.108909C12.1888 0.283336 13.7537 0.772473 15.0352 1.22955C15.8515 1.52069 16.5861 1.81138 17.1164 2.02915C17.3818 2.13814 17.5965 2.22911 17.7455 2.29307C17.8201 2.32504 17.8781 2.35028 17.9179 2.36767L17.9635 2.38771L17.9756 2.39305L17.9789 2.39449L17.9799 2.39492C17.9799 2.39497 17.9804 2.39512 17.6904 3.04788C18.0425 2.42647 18.0434 2.42694 18.0442 2.42741L18.0459 2.42838L18.0494 2.43039L18.0568 2.43474L18.0732 2.44474C18.0848 2.45201 18.0978 2.46049 18.1122 2.47031C18.1408 2.48995 18.1745 2.51485 18.2124 2.54594C18.2882 2.60824 18.3799 2.69464 18.4812 2.81219C18.6842 3.04771 18.9214 3.40347 19.1469 3.93304C19.5711 4.92864 19.9578 6.54699 19.9998 9.17189ZM17.6904 3.04788L18.0425 2.42647C18.0224 2.41502 18.0012 2.40435 17.9799 2.39492L17.6904 3.04788Z"></path></g></svg>
              <span>SOC 2 compliant</span>
            </BadgeItem>

          </div>

          <div className="mt-20 mb-6">
            <LogoMarquee logos={trustedLogos} />
          </div>
        </div>
      </section>

      {/* OUTPUT / FEATURES — visuals overlap hero bottom */}
      <section className="px-20 -mt-1 relative z-10 pt-2 pb-24 bg-section-cream">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-5 items-start">
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
      <FAQ />

      {/* START FREE */}
      <StartFree />

      <Footer />
    </div>
  );
}

function BadgeItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
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
    <div className="flex flex-col bg-white/60 rounded-4xl">
      <div
        className="relative -mt-10 rounded-[32px] overflow-hidden min-h-[340px] flex items-center justify-center px-4 py-8 shadow-[0_20px_50px_-20px_rgba(40,20,80,0.12)] backdrop-blur-xl"
        style={{
          background: tinted
            ? "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(220,210,245,0.3) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: "#ffffff",
            filter: "blur(20px)",
            WebkitFilter: "blur(20px)",
            opacity: 0.15,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
            filter: "blur(0.5px)",
            WebkitFilter: "blur(0.5px)",
          }}
        />
        <div className="relative z-10 w-full flex items-center justify-center">{visual}</div>
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
const INTEGRATION_ARC_VIEWPORT_W = 340;
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
  const rotation = -(activeIndex * (360 / count));
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
        style={{
          height: "92px",
          background: "radial-gradient(60% 100% at 50% -10%, rgb(237 229 251 / 0.95), transparent 62%)",
        }}
      />
      <div
        className="relative z-0 mx-auto h-full overflow-hidden"
        style={{ width: INTEGRATION_ARC_VIEWPORT_W }}
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
              const visible = Math.abs(slot) <= 1;
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
                    opacity: visible ? 1 : 0,
                    zIndex: featured ? 3 : 1,
                    transition: `${stepEase}, opacity 200ms ease-out`,
                    pointerEvents: visible ? "auto" : "none",
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
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-[5px] bg-[#ECE9FE] text-[#6236FF] font-medium text-md leading-none select-none">
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
            <span className="whitespace-nowrap">
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


