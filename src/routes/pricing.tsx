import { useState, type ReactNode } from "react";
import { BarChart3, CalendarClock, Coins } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FAQSection } from "@/components/site/FAQSection";
import { StartFreeSection } from "@/components/site/StartFreeSection";
import { TeamPriceCard } from "@/components/site/TeamPriceCard";
import { EnterprisePriceCard } from "@/components/site/EnterprisePriceCard";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { HeroBadgeItem, pricingHeroBadges } from "@/components/site/HeroBadges";
import { CreditsPowerHeadline } from "@/components/site/CreditsPowerHeadline";
import viktorAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import fullProjectsImageTabs from "@/assets/images/full-projects-image-tabs.avif";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Pricing — Viktor"
        description="We'll front you $100. Put Viktor to work. Start free with $100 in credits — no credit card, no strings. Upgrade when you're ready."
        ogTitle="Pricing — Viktor"
        ogDescription="Start free with $100 in credits. Credits power everything Viktor does. No markup on model costs."
        ogUrl="/pricing"
        canonical="/pricing"
      />
      <PricingHero />
      <CreditsPower />
      <HowCreditsWork />
      <FAQSection />
      <StartFreeSection />
      <Footer />
    </div>
  );
}

/* ---------------- HERO + PLAN CARDS ---------------- */

function PricingHero() {
  return (
    <section className="relative pt-36 pb-40 overflow-hidden rounded-b-[40px] bg-gradient-dark3">
      <Nav />
      <div className="relative mx-auto max-w-5xl px-6 pt-20 text-center">
        <h1 className="font-heading text-white text-5xl max-sm:text-[2.625rem] leading-[1.05] font-bold tracking-[-0.06em]  sm:text-6xl lg:text-[5rem]">
          We'll front you <span className="text-[#ffbb98]">$100.</span><br />
          Put Viktor to work.
        </h1>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-white/85">
          {pricingHeroBadges.map((badge) => (
            <HeroBadgeItem key={badge.label} icon={badge.icon} label={badge.label} variant="circle" />
          ))}
        </div>

        <div className="mt-10">
          <GetStartedButton shadow />
        </div>
      </div>

      {/* PLAN CARDS overlapping hero */}
      <div id="plans" className="relative mx-auto px-4 mt-16 scroll-mt-28">
        <div className="grid md:grid-cols-2 gap-5">
          <TeamPriceCard />
          <EnterprisePriceCard />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CREDITS POWER EVERYTHING ---------------- */

const sarahAvatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm px-1 py-0.5 align-baseline whitespace-nowrap bg-slack-mention text-slack-mention text-sm leading-snug">
      {children}
    </span>
  );
}

function AddReactionIcon() {
  return (
    <svg aria-hidden="true" className="size-[15px] shrink-0 text-[var(--slack-add-reaction-icon)]" fill="none" viewBox="0 0 15 15" width="15" height="15">
      <path d="M5.625 6.5625C5.625 7.08027 5.20527 7.5 4.6875 7.5C4.16973 7.5 3.75 7.08027 3.75 6.5625C3.75 6.04473 4.16973 5.625 4.6875 5.625C5.20527 5.625 5.625 6.04473 5.625 6.5625Z" fill="currentColor" />
      <path d="M9.375 6.5625C9.375 7.08027 8.95527 7.5 8.4375 7.5C7.91973 7.5 7.5 7.08027 7.5 6.5625C7.5 6.04473 7.91973 5.625 8.4375 5.625C8.95527 5.625 9.375 6.04473 9.375 6.5625Z" fill="currentColor" />
      <path d="M4.0106 10.1568C3.8824 9.77219 4.16867 9.375 4.57409 9.375H8.55091C8.95633 9.375 9.24261 9.77219 9.1144 10.1568L9.03043 10.4087C8.67634 11.471 7.68223 12.1875 6.5625 12.1875C5.44277 12.1875 4.44866 11.471 4.09457 10.4087L4.0106 10.1568Z" fill="currentColor" />
      <path d="M7.5 1.94146C7.19381 1.89766 6.8808 1.875 6.5625 1.875C2.93813 1.875 0 4.81313 0 8.4375C0 12.0619 2.93813 15 6.5625 15C10.1869 15 13.125 12.0619 13.125 8.4375C13.125 8.1192 13.1023 7.80619 13.0585 7.5H11.9068C11.9598 7.80453 11.9875 8.11779 11.9875 8.4375C11.9875 11.4336 9.55865 13.8625 6.5625 13.8625C3.56636 13.8625 1.1375 11.4336 1.1375 8.4375C1.1375 5.44136 3.56636 3.0125 6.5625 3.0125C6.88221 3.0125 7.19547 3.04016 7.5 3.09321V1.94146Z" fill="currentColor" />
      <path d="M11.25 0.46875C11.25 0.209866 11.4599 0 11.7188 0C11.9776 0 12.1875 0.209867 12.1875 0.46875V5.15625C12.1875 5.41513 11.9776 5.625 11.7188 5.625C11.4599 5.625 11.25 5.41513 11.25 5.15625V0.46875Z" fill="currentColor" />
      <path d="M14.0625 2.34375C14.3214 2.34375 14.5312 2.55362 14.5312 2.8125C14.5312 3.07138 14.3214 3.28125 14.0625 3.28125L9.375 3.28125C9.11612 3.28125 8.90625 3.07138 8.90625 2.8125C8.90625 2.55362 9.11612 2.34375 9.375 2.34375L14.0625 2.34375Z" fill="currentColor" />
    </svg>
  );
}

function SlackReactionPill({
  emoji,
  count,
  onClick,
}: {
  emoji: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed="false"
      onClick={onClick}
      className="inline-flex min-h-6 items-center gap-1 rounded-full border-0 bg-[var(--slack-reaction-pill-bg)] px-2 py-0.5 text-xs font-normal text-slack-reaction-pill cursor-pointer transition-colors hover:bg-[var(--slack-reaction-pill-hover-bg)]"
    >
      <span aria-hidden="true">{emoji}</span>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}

function SlackAddReaction({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Add reaction"
      onClick={onClick}
      className="inline-flex min-h-6 items-center gap-1 rounded-full border-0 bg-[var(--slack-reaction-pill-bg)] px-2 py-0.5 text-xs text-slack-reaction-pill shrink-0 justify-center cursor-pointer h-full transition-colors hover:bg-[var(--slack-reaction-pill-hover-bg)]"
    >
      <AddReactionIcon />
    </button>
  );
}

function SlackReactions({
  initial,
}: {
  initial: { emoji: string; count: number }[];
}) {
  const [reactions, setReactions] = useState(initial);

  const increment = (emoji: string) => {
    setReactions((prev) =>
      prev.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r)),
    );
  };

  const addReaction = () => {
    setReactions((prev) => {
      const heart = prev.find((r) => r.emoji === "❤️");
      if (heart) {
        return prev.map((r) => (r.emoji === "❤️" ? { ...r, count: r.count + 1 } : r));
      }
      return [...prev, { emoji: "❤️", count: 1 }];
    });
  };

  if (reactions.length === 0) return null;

  return (
    <div className="mt-1.5 flex flex-wrap items-stretch gap-1">
      {reactions.map((r) => (
        <SlackReactionPill key={r.emoji} emoji={r.emoji} count={r.count} onClick={() => increment(r.emoji)} />
      ))}
      <div className="relative flex self-stretch">
        <SlackAddReaction onClick={addReaction} />
      </div>
    </div>
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
  reactions?: { emoji: string; count: number }[];
}) {
  return (
    <div className="relative flex w-full text-left isolate gap-2 rounded-lg px-[var(--slack-message-pad-x)] py-0 border border-solid border-transparent bg-transparent">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
        <img alt={name} loading="lazy" width={36} height={36} className="size-full object-cover" src={avatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="text-sm text-slack font-medium">{name}</span>
          <span className="text-xs text-slack-secondary font-normal">{time}</span>
        </div>
        <div className="text-sm text-slack font-normal leading-snug">{body}</div>
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

function SlackViktorMessage({
  time,
  body,
  attachment,
  reactions,
  variant = "default",
}: {
  time: string;
  body: ReactNode;
  attachment?: ReactNode;
  reactions?: { emoji: string; count: number }[];
  variant?: "default" | "plain";
}) {
  const isPlain = variant === "plain";

  return (
    <div
      data-variant="viktor"
      className={`relative flex w-full text-left isolate overflow-hidden slack-message-viktor gap-2 px-[var(--slack-message-pad-x)] py-[var(--slack-message-pad-y)] ${
        isPlain ? "shadow-none rounded-none bg-transparent" : ""
      }`}
    >
      {!isPlain && (
        <div aria-hidden="true" className="slack-viktor-bg-mount">
          <div className="slack-viktor-layer-glass-stack" />
          <div className="slack-viktor-layer-inner-depth-soft" />
          <div className="slack-viktor-layer-inner-glow-overlay" />
          <div className="slack-viktor-layer-feather-blur" />
          <div className="slack-viktor-layer-white-sheet" />
        </div>
      )}
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md z-[1] bg-transparent">
        <img alt="Viktor" loading="lazy" width={36} height={36} className="size-full object-cover" src={viktorAvatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 mb-0.5">
          <span className="text-sm text-slack font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span>Viktor</span>
              <span className="inline-flex items-center rounded-sm bg-slack-app-badge px-1 py-px text-[12px] leading-tight font-normal tracking-wide text-slack-app-badge uppercase">
                APP
              </span>
            </span>
          </span>
          <span className="text-xs text-slack-secondary font-normal">{time}</span>
        </div>
        <div className="text-sm text-slack font-normal leading-snug">{body}</div>
        {attachment}
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

function SlackFileAttachment({ name }: { name: string }) {
  return (
    <div aria-label={`Attachment ${name}`} className="mt-2 flex w-full max-w-full min-w-0 items-center gap-1">
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 items-center justify-center text-[13px] leading-[1.4] text-[var(--slack-add-reaction-icon)] opacity-80"
      >
        📎
      </span>
      <div className="slack-attached-pill">
        <span className="min-w-0 truncate text-[13px] leading-[1.4] tracking-[-0.26px] font-normal">{name}</span>
      </div>
    </div>
  );
}

function ExecutiveSummaryPreview() {
  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[360px]">
      
      <div
        aria-hidden="true"
        className="absolute bottom-3 left-5 right-3 top-8 rounded-2xl border border-black/[0.04] bg-[#f5f0e8] shadow-sm"
        style={{ transform: "rotate(-3deg)" }}
      />
      <div className="relative overflow-hidden">
        <img src={fullProjectsImageTabs} alt="" className="block w-full h-auto" />
      </div>
    </div>
  );
}

function ConicGradientCardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full rounded-[inherit] overflow-hidden rounded-section text-primary ${className}`}>
      <div aria-hidden="true" className="bg-conic-gradient-bg pointer-events-none absolute inset-0 z-0" style={{ borderRadius: "inherit" }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[20px] z-0"
        style={{ borderRadius: "inherit", background: "#ffffff", filter: "blur(20px)", WebkitFilter: "blur(20px)" }}
      />
      <div className="rounded-[inherit] relative z-[1] h-full w-full">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{ background: "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background: "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
          style={{ filter: "blur(5px)", WebkitFilter: "blur(5px)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: "linear-gradient(-56deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,1) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "4px",
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

function CreditPowerCard({
  tag,
  credits,
  sub,
  children,
  document,
  layout = "default",
  className = "",
}: {
  tag: string;
  credits: string;
  sub?: string;
  children: ReactNode;
  document?: ReactNode;
  layout?: "default" | "split";
  className?: string;
}) {
  return (
    <ConicGradientCardShell className={`min-h-112 h-full ${className}`}>
        {layout === "split" ? (
          <div className="relative z-[2] flex h-full w-full min-h-80 flex-col sm:min-h-96 md:min-h-[26rem] md:flex-row md:items-end">
            <div className="relative flex min-w-0 flex-1 flex-col">
              <div className="relative z-10 px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="text-sm text-accent-1">{tag}</p>
              </div>
              <div className="relative z-10 mt-auto flex flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-8 ">
                <div className="shrink-0">
                  <h3 className="mb-5 font-heading text-2xl font-bold text-balance text-primitive-main-dark sm:text-3xl">{credits}</h3>
                </div>
                <div className="flex shrink-0 justify-end sm:justify-end">{document}</div>
              </div>
            </div>
            <div className="relative z-10 flex w-full shrink-0 flex-col justify-end md:w-[36%] md:min-w-[220px] md:max-w-[340px]">
              <div className="box-border flex w-full flex-col items-end p-4 sm:p-6">
                <div className="min-w-0 flex w-full flex-col items-end">
                  <div className="flex w-full min-w-0 flex-col [--slack-message-pad-x:0px] [--slack-message-pad-y:0px] p-0! gap-4 justify-end items-end">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-[2] flex h-full w-full flex-col">
            <div className="relative z-10 px-6 pt-6 sm:px-8 sm:pt-8">
              <div className="flex max-w-md flex-col gap-2">
                <p className="text-sm text-accent-1">{tag}</p>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-balance text-primitive-main-dark">{credits}</h3>
                {sub && <p className="text-sm text-secondary">{sub}</p>}
              </div>
            </div>
            <div className="relative z-10 w-full min-w-0 overflow-hidden px-3 pt-4 pb-3 sm:px-4 sm:pb-4">
              <div className="flex w-full min-w-0 flex-col gap-2">{children}</div>
            </div>
          </div>
        )}
    </ConicGradientCardShell>
  );
}

function CreditsPower() {
  return (
    <section className="px-2 md:px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <CreditsPowerHeadline />

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <CreditPowerCard tag="Quick Tasks" credits="100–300 credits" sub="Slack summary + CRM follow-up">
            <SlackUserMessage
              name="Sarah"
              time="9:14 AM"
              avatar={sarahAvatar}
              reactions={[{ emoji: "⏳", count: 1 }]}
              body={
                <>
                  <SlackMention>@Viktor</SlackMention>
                  summarize yesterday&apos;s #sales thread and flag anything I need to follow up on
                </>
              }
            />
            <SlackViktorMessage
              time="9:15 AM"
              reactions={[
                { emoji: "❤️", count: 4 },
                { emoji: "👀", count: 1 },
              ]}
              body="3 deals discussed. Two on track — Acme closes Friday, Bloom signed. One needs you: DataSync went silent after the demo. I drafted a follow-up in HubSpot, want me to send it?"
            />
          </CreditPowerCard>

          <CreditPowerCard tag="Complex Workflows" credits="500–1,500 credits" sub="Multi-step research + analysis">
            <SlackUserMessage
              name="Mike"
              time="11:30 AM"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
              body={
                <>
                  <SlackMention>@Viktor</SlackMention>
                  the pricing page still says $50/mo. Can the slider fix it, should be $79/mo. Can you update it?
                </>
              }
            />
            <SlackViktorMessage
              time="11:46 AM"
              reactions={[
                { emoji: "✅", count: 2 },
                { emoji: "👀", count: 1 },
              ]}
              body={
                <>
                  Done ✅ Updated the pricing page — Starter tier now shows $79/mo. Preview is ready for your review:{" "}
                  <a
                    href="https://acme.com/pricing-preview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 underline"
                  >
                    acme.com/pricing-preview
                  </a>
                </>
              }
            />
          </CreditPowerCard>

          <div className="md:col-span-2">
            <CreditPowerCard
              layout="split"
              tag="Full Projects"
              credits="2,000–5,000 credits"
              sub="Deep research + deliverables"
              document={<ExecutiveSummaryPreview />}
            >
              <SlackUserMessage
                name="Lisa"
                time="9:14 AM"
                avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
                reactions={[{ emoji: "⏳", count: 1 }]}
                body={
                  <>
                    <SlackMention>@Viktor</SlackMention>
                    we need a competitive analysis — us vs Notion AI, Glean, and Moveworks. Pricing, features, positioning. Make it a PDF I can share with the board
                  </>
                }
              />
              <SlackViktorMessage
                variant="plain"
                time="9:15 AM"
                reactions={[
                  { emoji: "❤️", count: 4 },
                  { emoji: "🔥", count: 3 },
                ]}
                attachment={<SlackFileAttachment name="competetive-analysis-q1.pdf" />}
                body={
                  <>
                    <SlackMention>@Viktor</SlackMention> ✅ Done. 12-page PDF with feature matrix, pricing comparison, and positioning map. Here&apos;s the executive summary.
                  </>
                }
              />
            </CreditPowerCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW CREDITS WORK ---------------- */

const howItems: { icon: ReactNode; title: string; body: string }[] = [
  { icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="relative z-10 size-8 object-contain"> <path d="M24.6448 2.45899L24.6094 2.42366C22.3667 0.181004 19.5075 -0.478884 16.3811 0.334577C13.328 1.12894 10.0396 3.31358 6.67657 6.67655C3.31358 10.0395 1.12896 13.328 0.33459 16.3811C0.116141 17.2206 0.00393655 18.041 0.000100908 18.8352C-0.0102999 20.9986 0.783236 22.9687 2.42359 24.6091C4.66626 26.8517 7.52539 27.5115 10.6518 26.6981C13.7048 25.9038 16.9933 23.7191 20.3563 20.3561C23.7193 16.9931 25.904 13.7046 26.6983 10.6516C27.5074 7.54169 26.859 4.69627 24.6448 2.45899Z" fill="url(#pricing-credit-coin-paint0_radial_6585_3128)"></path> <path d="M29.2139 7.02821L29.5765 7.39072C31.819 9.63337 32.4789 12.4925 31.6654 15.6189C31.5065 16.2293 31.2921 16.8492 31.024 17.4772L27.7474 14.2006C28.2313 13.2059 28.6085 12.2099 28.8672 11.2159C29.2379 9.79081 29.3577 8.38242 29.2139 7.02821Z" fill="url(#pricing-credit-coin-paint1_radial_6585_3128)"></path> <path d="M29.9488 19.5714C28.9845 21.1872 27.6928 22.8453 26.1008 24.5253L22.7188 21.1433C24.2553 19.5266 25.5705 17.885 26.611 16.2336L29.9488 19.5714Z" fill="url(#pricing-credit-coin-paint2_radial_6585_3128)"></path> <path d="M24.5159 26.1097C22.8347 27.7019 21.1755 28.9929 19.5588 29.9561L16.2212 26.6187C17.8736 25.579 19.5162 24.2642 21.1339 22.7277L24.5159 26.1097Z" fill="url(#pricing-credit-coin-paint3_radial_6585_3128)"></path> <path d="M17.4631 31.0299L14.187 27.7538C13.1969 28.2347 12.2055 28.6096 11.2161 28.867C9.79088 29.2377 8.38235 29.3577 7.028 29.2137L7.39072 29.5765C9.63337 31.819 12.4925 32.4789 15.6189 31.6654C16.2248 31.5077 16.8399 31.2953 17.4631 31.0299Z" fill="url(#pricing-credit-coin-paint4_radial_6585_3128)"></path> <defs> <radialGradient id="pricing-credit-coin-paint0_radial_6585_3128" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3926 -44.9053 12.3962 16.6583 -1.39259)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> <radialGradient id="pricing-credit-coin-paint1_radial_6585_3128" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3926 -44.9053 12.3962 16.6583 -1.39259)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> <radialGradient id="pricing-credit-coin-paint2_radial_6585_3128" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3926 -44.9053 12.3962 16.6583 -1.39259)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> <radialGradient id="pricing-credit-coin-paint3_radial_6585_3128" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3926 -44.9053 12.3962 16.6583 -1.39259)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> <radialGradient id="pricing-credit-coin-paint4_radial_6585_3128" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3926 -44.9053 12.3962 16.6583 -1.39259)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> </defs> </svg>, title: "No markup on model costs", body: "Every credit maps to what Anthropic, OpenAI, and others actually charge. No platform fee layered on top. You'd pay the same going direct." },
  { icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="relative z-10 size-8 object-contain"> <path fillRule="evenodd" clipRule="evenodd" d="M17.3339 3.86642C18.0399 3.51408 18.3265 2.65618 17.9742 1.95025C17.6219 1.24432 16.764 0.957659 16.0581 1.30999C14.551 2.06215 13.0957 3.51458 12.3417 5.01979C12.2367 5.2293 12.1864 5.45819 12.1907 5.68629L12.1904 5.71321C12.1904 6.05408 12.3098 6.36706 12.509 6.61264C13.2984 8.00347 14.6558 9.30951 16.0581 10.0093C16.764 10.3617 17.6219 10.075 17.9742 9.36907C18.3265 8.66313 18.0399 7.80523 17.3339 7.45291C17.1592 7.36571 16.9828 7.2608 16.8082 7.14178H22.8453C23.6343 7.14178 24.2738 6.50217 24.2738 5.71321C24.2738 4.92423 23.6343 4.28464 22.8453 4.28464H16.6567C16.8803 4.12087 17.1085 3.97893 17.3339 3.86642ZM7.11303 10.2824C7.11303 9.49342 6.47344 8.85383 5.68446 8.85383C4.8955 8.85383 4.25589 9.49342 4.25589 10.2824V16.2652C4.12747 16.0805 4.01479 15.8934 3.9221 15.7084C3.56875 15.003 2.71042 14.7176 2.00501 15.0709C1.29958 15.4243 1.01416 16.2826 1.36752 16.988C2.07746 18.4053 3.40912 19.7758 4.82027 20.559C5.06023 20.7415 5.3597 20.8499 5.68446 20.8499C5.71248 20.8499 5.74032 20.8491 5.76793 20.8475C5.97102 20.8409 6.17303 20.7911 6.35973 20.6979C7.86683 19.9457 9.32217 18.4933 10.0762 16.988C10.4295 16.2826 10.1441 15.4243 9.43867 15.0709C8.73326 14.7176 7.87495 15.003 7.5216 15.7084C7.41134 15.9285 7.27275 16.1515 7.11303 16.3701V10.2824ZM16.2566 28.2741H9.72688C8.9379 28.2741 8.29831 27.6345 8.29831 26.8455C8.29831 26.0565 8.9379 25.4169 9.72688 25.4169H16.3559C16.1405 25.2608 15.9209 25.1253 15.704 25.0171C14.9981 24.6647 14.7114 23.8069 15.0637 23.101C15.416 22.395 16.2739 22.1083 16.9799 22.4607C18.4869 23.2128 19.9423 24.6651 20.6963 26.1705C20.7995 26.3765 20.8499 26.6011 20.8475 26.8256C20.8476 26.8322 20.8476 26.8389 20.8476 26.8455C20.8476 27.1648 20.7428 27.4597 20.5658 27.6974C19.7823 29.1129 18.4042 30.4491 16.9799 31.16C16.2739 31.5122 15.416 31.2256 15.0637 30.5198C14.7114 29.8137 14.9981 28.9559 15.704 28.6037C15.8877 28.512 16.0733 28.4007 16.2566 28.2741Z" fill="url(#pricing-credit-workflow-paint0_radial_6585_3129)"></path> <path fillRule="evenodd" clipRule="evenodd" d="M26.8512 0C25.3595 0 24.0327 0.422247 23.0795 1.37365C22.126 2.32537 21.7025 3.65102 21.7025 5.14151C21.7025 6.63202 22.126 7.95767 23.0795 8.90939C24.0327 9.8608 25.3595 10.283 26.8512 10.283C28.3429 10.283 29.6699 9.8608 30.6231 8.90939C31.5765 7.95767 32 6.63202 32 5.14151C32 3.65102 31.5765 2.32537 30.6231 1.37365C29.6699 0.422247 28.3429 0 26.8512 0Z" fill="url(#pricing-credit-workflow-paint1_radial_6585_3129)"></path> <path fillRule="evenodd" clipRule="evenodd" d="M6.84674 0.416245C6.1533 -0.136351 5.16487 -0.138182 4.46983 0.418514L4.20805 0.627349C3.60281 1.10923 2.91765 1.65472 2.28743 2.28381C1.65717 2.91294 1.11065 3.59687 0.627895 4.20101L0.418688 4.46231C-0.140102 5.15744 -0.138264 6.14715 0.416411 6.84066C0.493888 6.93753 0.573175 7.03751 0.654366 7.13989C1.12793 7.73701 1.66623 8.41575 2.28743 9.03584C2.90859 9.65589 3.58855 10.1932 4.18674 10.6659C4.2893 10.7469 4.38946 10.8261 4.48651 10.9034C5.17993 11.456 6.16837 11.4578 6.86343 10.9011L7.12521 10.6923C7.73045 10.2104 8.41559 9.66491 9.04583 9.03582C9.67607 8.40674 10.2226 7.72281 10.7053 7.11867L10.9146 6.85733C11.4733 6.16219 11.4715 5.1725 10.9168 4.47897C10.8394 4.38213 10.7601 4.28215 10.6789 4.17979C10.2053 3.58267 9.66702 2.90389 9.04583 2.28382C8.42464 1.66377 7.74471 1.12647 7.14649 0.653771C7.04393 0.572727 6.94377 0.493582 6.84674 0.416245Z" fill="url(#pricing-credit-workflow-paint2_radial_6585_3129)"></path> <path fillRule="evenodd" clipRule="evenodd" d="M5.72098 21.6691C4.9379 21.6691 4.18293 21.7405 3.48759 21.8179C2.03574 21.9794 0.869563 23.139 0.713218 24.5977C0.639113 25.2891 0.572196 26.0361 0.572196 26.8105C0.572196 27.5851 0.639113 28.3321 0.713218 29.0235C0.869563 30.4823 2.03574 31.6418 3.48759 31.8034C4.18293 31.8807 4.9379 31.9522 5.72098 31.9522C6.50405 31.9522 7.25902 31.8807 7.95435 31.8034C9.40619 31.6418 10.5724 30.4823 10.7287 29.0235C10.8028 28.3321 10.8698 27.5851 10.8698 26.8105C10.8698 26.0361 10.8028 25.2891 10.7287 24.5977C10.5724 23.139 9.40619 21.9794 7.95435 21.8179C7.25902 21.7405 6.50405 21.6691 5.72098 21.6691Z" fill="url(#pricing-credit-workflow-paint3_radial_6585_3129)"></path> <path fillRule="evenodd" clipRule="evenodd" d="M26.8512 21.7171C25.3595 21.7171 24.0327 22.1393 23.0795 23.0907C22.126 24.0425 21.7025 25.368 21.7025 26.8585C21.7025 28.349 22.126 29.6747 23.0795 30.6265C24.0327 31.5778 25.3595 32.0002 26.8512 32.0002C28.3429 32.0002 29.6699 31.5778 30.6231 30.6265C31.5765 29.6747 32 28.349 32 26.8585C32 25.368 31.5765 24.0425 30.6231 23.0907C29.6699 22.1393 28.3429 21.7171 26.8512 21.7171Z" fill="url(#pricing-credit-workflow-paint4_radial_6585_3129)"></path> <defs> <radialGradient id="pricing-credit-workflow-paint0_radial_6585_3129" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3928 -44.9053 12.3963 16.6583 -1.3926)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> <radialGradient id="pricing-credit-workflow-paint1_radial_6585_3129" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3928 -44.9053 12.3963 16.6583 -1.3926)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> <radialGradient id="pricing-credit-workflow-paint2_radial_6585_3129" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3928 -44.9053 12.3963 16.6583 -1.3926)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> <radialGradient id="pricing-credit-workflow-paint3_radial_6585_3129" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3928 -44.9053 12.3963 16.6583 -1.3926)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> <radialGradient id="pricing-credit-workflow-paint4_radial_6585_3129" cx="0" cy="0" r="1" gradientTransform="matrix(2.91666 33.3928 -44.9053 12.3963 16.6583 -1.3926)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> </defs> </svg>, title: "Smart caching cuts your bill", body: "Viktor caches context and reuses results across tasks. Repeated workflows cost fewer credits than calling the models from scratch every time." },
  { icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="relative z-10 size-8 object-contain"> <path d="M16.9345 0C17.6241 0.000874859 18.2998 0.208808 18.8701 0.59668C19.4396 0.984107 19.8795 1.53378 20.1318 2.1748L20.1328 2.17676L20.9951 4.3457L23.6435 5.87109L25.9668 5.51855C26.6495 5.41609 27.35 5.5208 27.9726 5.81934C28.5951 6.11779 29.1137 6.59609 29.4599 7.19336L30.3945 8.80176C30.7414 9.399 30.8997 10.0875 30.8476 10.7764C30.7957 11.4648 30.5355 12.1209 30.1035 12.6592L28.6367 14.4863V17.5137L30.1025 19.3398C30.5349 19.8781 30.7957 20.5351 30.8476 21.2236C30.8997 21.9125 30.7416 22.601 30.3945 23.1982L29.4599 24.8057C29.1137 25.403 28.5951 25.8822 27.9726 26.1807C27.35 26.4792 26.6517 26.5841 25.9687 26.4814L23.6367 26.1289L20.9961 27.6455L20.1377 29.8232C19.8854 30.4651 19.444 31.0157 18.874 31.4033C18.3038 31.7912 17.6299 31.9991 16.9404 32H15.0556C14.366 31.9991 13.6913 31.7912 13.1211 31.4033C12.5512 31.0157 12.1105 30.4649 11.8584 29.8232L11 27.6455L8.35835 26.1289L6.0273 26.4814C5.34446 26.5841 4.64605 26.4792 4.02339 26.1807C3.40086 25.8821 2.88126 25.4031 2.53511 24.8057L1.60152 23.1982C1.25447 22.6009 1.0963 21.9125 1.14839 21.2236C1.20056 20.5351 1.4602 19.8781 1.89253 19.3398L3.35933 17.5137V14.4863L1.89253 12.6592C1.46025 12.1209 1.20055 11.4649 1.14839 10.7764C1.0963 10.0875 1.25447 9.39902 1.60152 8.80176L2.53609 7.19336C2.88224 6.59608 3.40099 6.11775 4.02339 5.81934C4.64591 5.52087 5.34557 5.41618 6.02828 5.51855L8.3525 5.87109L11.0009 4.3457L11.8623 2.17676L11.8632 2.1748C12.1155 1.53373 12.5563 0.984112 13.1259 0.59668C13.6961 0.208884 14.371 0.000955928 15.0605 0H16.9345ZM14.0918 11.4824C13.5601 11.4824 13.2163 11.7897 13.0595 11.9678C12.8996 12.1494 12.7924 12.3533 12.7236 12.4971C12.6124 12.7293 12.4994 13.0324 12.3994 13.3018L12.333 13.4805C12.0635 14.1961 11.7841 14.8233 11.3896 15.2178C11.0048 15.6025 10.3973 15.8588 9.67671 16.1172L9.54488 16.1631C9.26232 16.2634 8.92893 16.3822 8.66988 16.5098C8.51683 16.5851 8.30197 16.7047 8.11324 16.8877C7.91134 17.0835 7.6689 17.4256 7.6689 17.9053C7.66894 18.385 7.91134 18.727 8.11324 18.9229C8.30197 19.1058 8.51683 19.2254 8.66988 19.3008C8.92882 19.4283 9.26241 19.5462 9.54488 19.6465L9.67671 19.6934C10.3974 19.9517 11.0048 20.208 11.3896 20.5928C11.7841 20.9873 12.0635 21.6144 12.333 22.3301L12.3994 22.5088C12.4994 22.7782 12.6124 23.081 12.7236 23.3135C12.7924 23.4572 12.8996 23.6609 13.0595 23.8428C13.2163 24.0208 13.5601 24.3281 14.0918 24.3281C14.6234 24.3281 14.9672 24.0208 15.124 23.8428C15.2839 23.6609 15.3911 23.4572 15.4599 23.3135C15.5711 23.081 15.6841 22.7782 15.7841 22.5088L15.8505 22.3301C16.12 21.6144 16.3994 20.9873 16.7939 20.5928C17.1787 20.208 17.7862 19.9517 18.5068 19.6934L18.6386 19.6465C18.9211 19.5462 19.2547 19.4283 19.5136 19.3008C19.6667 19.2254 19.8815 19.1058 20.0703 18.9229C20.2722 18.7271 20.5146 18.385 20.5146 17.9053C20.5146 17.4256 20.2722 17.0835 20.0703 16.8877C19.8815 16.7047 19.6667 16.5851 19.5136 16.5098C19.2546 16.3822 18.9212 16.2634 18.6386 16.1631L18.5068 16.1172C17.7862 15.8588 17.1787 15.6025 16.7939 15.2178C16.3994 14.8233 16.12 14.1961 15.8505 13.4805L15.7841 13.3018C15.6841 13.0324 15.5711 12.7293 15.4599 12.4971C15.3911 12.3533 15.2839 12.1494 15.124 11.9678C14.9672 11.7897 14.6234 11.4824 14.0918 11.4824ZM20.7363 8.52734C19.9862 8.52734 19.3713 9.10492 19.3125 9.83984C18.5776 9.8987 17.999 10.5137 17.999 11.2637C17.999 12.0137 18.5776 12.6287 19.3125 12.6875C19.3713 13.4224 19.9862 14.001 20.7363 14.001C21.4863 14.001 22.1013 13.4224 22.1601 12.6875C22.895 12.6286 23.4736 12.0137 23.4736 11.2637C23.4735 10.5137 22.895 9.8987 22.1601 9.83984C22.1013 9.10493 21.4863 8.52737 20.7363 8.52734Z" fill="url(#pricing-credit-gear-paint0_radial_6585_3131)"></path> <defs> <radialGradient id="pricing-credit-gear-paint0_radial_6585_3131" cx="0" cy="0" r="1" gradientTransform="matrix(2.70873 33.3926 -41.7039 12.3962 16.6094 -1.39259)" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFBD9E"></stop> <stop offset="0.0642857" stopColor="#FDBCA0"></stop> <stop offset="0.507143" stopColor="#947FFF"></stop> <stop offset="0.803571" stopColor="#6748FD"></stop> <stop offset="1" stopColor="#150079"></stop> </radialGradient> </defs> </svg>, title: "Automations scale with frequency", body: "Scheduled automations (crons) run on credits too. Frequency matters — daily check-ins cost less than hourly ones." },
];

function HowCreditsWork() {
  return (
    <section className="px-2 md:px-6 pb-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl">How credits work</h2>
        <p className="mt-3 text-muted-foreground text-sm max-w-md">
          Credits are model costs, passed through. Smart caching brings them down.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-5 items-stretch">
          {howItems.map((it) => (
            <div
              key={it.title}
              className="rounded-3xl bg-card p-7"
              style={{
                boxShadow:
                  "rgb(255,255,255) 2.702px 2.702px 1.351px -2.702px inset, rgb(255,255,255) -2.702px -2.702px 1.351px -2.702px inset, rgba(255,255,255,0.5) 0px 0px 8.106px 0px inset, rgb(242,242,242) 0px 0px 43.232px 0px inset",
              }}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                {it.icon}
              </div>
              <div className="mt-4 font-semibold">{it.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
            </div>
          ))}

          <ConicGradientCardShell className="min-h-[300px] h-full">
            <div className="relative z-[2] flex h-full min-h-[300px] flex-col justify-between p-8">
              <p className="text-lg sm:text-2xl font-bold text-primitive-main-dark">
                Your whole team gets an analyst, an ops lead, and an engineer. For the price of lunch.
              </p>
              <GetStartedButton variant="dark" fullWidth className="mt-6 px-6 py-4" />
            </div>
          </ConicGradientCardShell>
        </div>
      </div>
    </section>
  );
}
