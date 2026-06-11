import type { ReactNode } from "react";
import integrationsTab1 from "@/assets/images/integrations-tab1.avif";
import viktorAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import { SlackReactions } from "@/components/site/SlackReactions";

const mayaAvatar =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

function StepBadge({ number, className = "" }: { number: string; className?: string }) {
  return (
    <span
      className={`inline-flex h-8 items-center justify-center rounded-full bg-[#5c28d7]/16 px-5 backdrop-blur-[5px] font-sans text-sm leading-[1.3] font-medium tracking-[0.01em] text-[#5c28d7] ${className}`}
    >
      {number}
    </span>
  );
}

function ConicGradientCardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
      <div aria-hidden="true" className="bg-conic-gradient-bg pointer-events-none absolute inset-0 z-0" style={{ borderRadius: "inherit" }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[20px] z-0"
        style={{ borderRadius: "inherit", background: "#ffffff", filter: "blur(20px)", WebkitFilter: "blur(20px)" }}
      />
      <div className="relative z-[1] h-full w-full rounded-[inherit]">
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

function HowItWorksStepCard({
  number,
  title,
  body,
  visual,
  stepBadge,
}: {
  number: string;
  title: string;
  body: string;
  visual: ReactNode;
  stepBadge: "overlay" | "inline";
}) {
  return (
    <article className="relative min-h-[34.6875rem] min-w-0 overflow-hidden rounded-section lg:min-h-[37.1875rem]">
      <div className="h-full min-h-[34.6875rem] w-full overflow-hidden rounded-[inherit] backdrop-blur-[20px] lg:min-h-[37.1875rem]">
        <ConicGradientCardShell>
          <div className="relative z-[2] flex h-full w-full flex-col justify-between">
            <div className="relative flex h-full min-h-0 flex-col rounded-[inherit]">
              {stepBadge === "overlay" ? (
                <div className="relative flex min-h-[21.25rem] flex-1 flex-col overflow-hidden p-0 lg:min-h-[23.75rem]">
                  <div className="relative flex min-h-[21.25rem] w-full flex-1 items-center justify-center overflow-hidden lg:min-h-[23.75rem]">
                    {visual}
                    <StepBadge number={number} className="absolute top-8 left-8 z-20" />
                  </div>
                </div>
              ) : (
                <div className="relative flex min-h-[21.25rem] flex-1 flex-col gap-8 p-0 lg:min-h-[23.75rem]">
                  <div className="shrink-0 px-8 pt-8">
                    <StepBadge number={number} />
                  </div>
                  <div className="relative min-h-0 flex-1">{visual}</div>
                </div>
              )}
              <div className="flex min-h-[12.5rem] shrink-0 flex-col justify-start p-8">
                <div className="flex flex-col items-start gap-3">
                  <h3 className="font-heading h5 text-primary">{title}</h3>
                  <p className="body-main max-w-[21.875rem] text-secondary font-medium">{body}</p>
                </div>
              </div>
            </div>
          </div>
        </ConicGradientCardShell>
      </div>
    </article>
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
  reactions?: { emoji: string; count: number }[];
}) {
  return (
    <div className="relative isolate flex w-full gap-2 rounded-lg border border-solid border-transparent bg-transparent px-[var(--slack-message-pad-x)] py-0 text-left">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
        <img alt={name} loading="lazy" width={36} height={36} className="size-full rounded-md object-cover" src={avatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small font-medium text-slack">{name}</span>
          <span className="text-xs font-normal text-slack-secondary">{time}</span>
        </div>
        <div className="body-main font-normal text-slack">{body}</div>
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
}: {
  time: string;
  body: ReactNode;
  attachment?: ReactNode;
  reactions?: { emoji: string; count: number }[];
}) {
  return (
    <div
      data-variant="viktor"
      data-highlighted="true"
      className="relative isolate flex w-full gap-2 overflow-hidden px-[var(--slack-message-pad-x)] py-[var(--slack-message-pad-y)] text-left slack-message-viktor"
    >
      <div aria-hidden="true" className="slack-viktor-bg-mount">
        <div className="slack-viktor-layer-glass-stack" />
        <div className="slack-viktor-layer-inner-depth-soft" />
        <div className="slack-viktor-layer-inner-glow-overlay" />
        <div className="slack-viktor-layer-feather-blur" />
        <div className="slack-viktor-layer-white-sheet" />
      </div>
      <div className="relative z-[1] flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-transparent">
        <img alt="Viktor" loading="lazy" width={36} height={36} className="size-full object-cover" src={viktorAvatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="mb-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small font-medium text-slack">
            <span className="inline-flex items-center gap-1.5">
              <span>Viktor</span>
              <span className="inline-flex items-center rounded-sm bg-slack-app-badge px-1 py-px text-[12px] leading-tight font-normal tracking-wide text-slack-app-badge uppercase">
                APP
              </span>
            </span>
          </span>
          <span className="text-xs font-normal text-slack-secondary">{time}</span>
        </div>
        <div className="body-main font-normal text-slack">{body}</div>
        {attachment}
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

export function HowItWorksStepsSection() {
  return (
    <section
      className="bg-primitive-main-beige py-14 sm:py-[7rem]"
      id="how-it-works"
      aria-label="How it works"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
          <h2 className="font-heading h3 text-center text-balance text-primary">How it works</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <HowItWorksStepCard
              number="01"
              title="Connect your stack"
              body="27 native integrations. 3,200+ tools via managed connectors. Most are one-click OAuth, some use API keys - Viktor handles auth and starts working. No webhooks, no Zapier zaps."
              stepBadge="overlay"
              visual={
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-hero">
                  <img
                    alt=""
                    loading="lazy"
                    width={826}
                    height={680}
                    decoding="async"
                    className="h-full max-h-full w-auto max-w-full object-contain"
                    src={integrationsTab1}
                  />
                </div>
              }
            />
            <HowItWorksStepCard
              number="02"
              title="Tell Viktor what you need"
              body="Message Viktor in Slack like you'd message a teammate."
              stepBadge="inline"
              visual={
                <div className="flex min-h-0 w-full flex-col items-end justify-end gap-2 px-3 pb-3 sm:px-4 sm:pb-4">
                  <SlackUserMessage
                    name="Maya Patel"
                    time="11:32 AM"
                    avatar={mayaAvatar}
                    reactions={[{ emoji: "⏳", count: 1 }]}
                    body={
                      <>
                        <SlackMention>@Viktor</SlackMention>
                        pull this week&apos;s MRR from Stripe and post it to private channel.
                      </>
                    }
                  />
                  <SlackViktorMessage
                    time="11:33 AM"
                    reactions={[
                      { emoji: "✅", count: 2 },
                      { emoji: "🚀", count: 1 },
                    ]}
                    body="On it. Pulling Stripe MRR, checking week-over-week movement, and preparing a private channel snapshot."
                  />
                </div>
              }
            />
            <HowItWorksStepCard
              number="03"
              title="Viktor operates, you review"
              body="Viktor executes the action, confirms what changed, and logs everything. You stop doing the work and start reviewing completed work."
              stepBadge="inline"
              visual={
                <div className="flex min-h-0 w-full flex-col items-end justify-end gap-2 px-3 pb-3 sm:px-4 sm:pb-4">
                  <SlackViktorMessage
                    time="9:12 AM"
                    reactions={[{ emoji: "👀", count: 2 }]}
                    body={
                      <>
                        <span>📊 MRR this week:</span>
                        <br />
                        <strong className="font-bold">$84,210 (+6.4% WoW).</strong>
                        <br />
                        <span>
                          Posted snapshot to private channel.
                          <br />
                          2 anomalies flagged for review.
                        </span>
                      </>
                    }
                    attachment={
                      <div className="flex w-full items-center gap-1.5 py-1" role="group" aria-label="Approve or reject">
                        <button
                          type="button"
                          className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#007a5a] px-1.5 py-1 text-xs font-medium whitespace-nowrap text-white"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#e01e5a] px-1.5 py-1 text-xs font-medium whitespace-nowrap text-white"
                        >
                          Reject
                        </button>
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
