import { useEffect, useRef, useState, type ReactNode } from "react";
import claudeAppIcon from "@/assets/images/claude-app-icon.png";
import viktorMarketplaceAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import chatgptIcon from "@/assets/images/chatgpt.svg";
import viktorAvatar from "@/assets/images/viktor-slack-avatar (1).svg";

const lisaAvatar =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

const HEADING_GRADIENT =
  "radial-gradient(125% 115% at 58% -8%, rgb(255, 187, 152) 0%, rgb(255, 187, 152) 7%, rgb(207, 160, 204) 29%, rgb(158, 132, 255) 51%, rgb(110, 71, 255) 80%, rgb(21, 0, 121) 100%)";

const STEPS = [
  {
    number: "/01",
    title: "Add Viktor to your workspace",
    body: "Install the Slack app or the Microsoft Teams (soon) app. No servers to spin up, no code to write, no developer required.",
    visual: "marketplace" as const,
  },
  {
    number: "/02",
    title: "Connect your tools",
    body: "Link the platforms your team already uses — CRM, analytics, ad platforms, project management, version control. Each integration authenticates through OAuth. One click per tool.",
    visual: "slack-connect" as const,
  },
  {
    number: "/03",
    title: "Just work",
    body: "Message Viktor the way you'd message a coworker. It pulls the relevant data, does the work in a secure cloud sandbox, and delivers the result — right back into your conversation.",
    visual: "slack-work" as const,
  },
] as const;

function GlassCardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full min-h-0 rounded-[inherit]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
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
  );
}

function MarketplaceAppsVisual() {
  return (
    <div className="flex min-w-0 w-full max-w-[438px] flex-col items-start">
      <div className="flex min-w-0 w-full items-center gap-4 overflow-hidden rounded-2xl p-4">
        <img alt="" loading="lazy" width={56} height={56} className="size-14 shrink-0 rounded-2xl object-cover" src={claudeAppIcon} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate text-sm leading-[1.3] font-medium text-white">Claude</p>
          <p className="text-sm leading-[1.3] text-white/70">
            Anthropic&apos;s AI agent for any task, think, write, and code with Claude.
          </p>
        </div>
      </div>

      <div className="relative flex min-w-0 w-full items-center gap-4 overflow-hidden rounded-2xl p-4 shadow-[0_16px_32px_rgba(26,24,41,0.16)]">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit]"
          style={{
            backgroundImage:
              "radial-gradient(95% 80% at 50% 0%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.65) 38%, rgba(255, 255, 255, 0) 76%), conic-gradient(from 90deg, rgba(253, 227, 170, 0.6) 0%, rgba(255, 189, 158, 0.6) 33%, rgba(210, 198, 255, 0.6) 66%, rgba(103, 72, 253, 0.6) 80%, rgba(253, 227, 170, 0.6) 100%)",
          }}
        />
        <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-white/8 mix-blend-plus-lighter backdrop-blur-[10px]" />
        <span aria-hidden="true" className="absolute inset-4 rounded-2xl bg-white blur-2xl mix-blend-plus-lighter" />
        <img alt="" className="relative z-10 size-14 shrink-0 overflow-hidden rounded-2xl" loading="lazy" src={viktorMarketplaceAvatar} />
        <div className="relative z-10 flex min-w-0 flex-1 items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex min-w-0 flex-wrap items-center gap-1">
              <p className="text-sm leading-[1.3] font-medium whitespace-nowrap text-[#262219]">Viktor</p>
              <div className="flex items-center justify-center gap-2 rounded-full bg-[#cff2ff] px-2 py-px">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true" className="h-3 w-[17px] shrink-0">
                  <path
                    d="M3.4 10.8C1.52 10.8 0 9.28 0 7.4 0 5.52 1.52 4 3.4 4c.38-1.49 1.73-2.4 3-2.4s2.62.91 3 2.4C11.28 4 12.8 5.52 12.8 7.4 12.8 9.28 11.28 10.8 9.4 10.8H3.4Z"
                    fill="#00A1E0"
                  />
                </svg>
                <span className="text-xs leading-[1.3] font-medium whitespace-nowrap text-[#00a1e0]">Salesforce Partner</span>
              </div>
            </div>
            <p className="text-sm leading-[1.3] text-[#262219]">Your AI employee in Slack</p>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2.702px_2.702px_1.351px_-2.702px_#fff,inset_-2.702px_-2.702px_1.351px_-2.702px_#fff,inset_0_0_8.106px_rgba(255,255,255,0.5),inset_0_0_43.232px_#f2f2f2]"
        />
      </div>

      <div className="flex min-w-0 w-full items-center gap-4 overflow-hidden rounded-2xl p-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white">
          <img alt="" loading="lazy" width={28} height={28} className="size-7" src={chatgptIcon} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate text-sm leading-[1.3] font-medium text-white">ChatGPT</p>
          <p className="text-sm leading-[1.3] text-white/70">
            ChatGPT in Slack: Search, write, summarize and get work done.
          </p>
        </div>
      </div>
    </div>
  );
}

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm bg-slack-mention px-1 py-0.5 align-baseline whitespace-nowrap text-sm leading-snug text-slack-mention">
      {children}
    </span>
  );
}

type SlackReaction = { emoji: string; count: number };

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
      className="inline-flex min-h-6 cursor-pointer items-center gap-1 rounded-full border-0 bg-[var(--slack-reaction-pill-bg)] px-2 py-0.5 text-xs font-normal text-slack-reaction-pill transition-colors hover:bg-[var(--slack-reaction-pill-hover-bg)]"
    >
      <span aria-hidden="true">{emoji}</span>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}

function SlackReactions({ reactions: initial }: { reactions: SlackReaction[] }) {
  const [reactions, setReactions] = useState(initial);

  const increment = (emoji: string) => {
    setReactions((prev) =>
      prev.map((reaction) =>
        reaction.emoji === emoji ? { ...reaction, count: reaction.count + 1 } : reaction,
      ),
    );
  };

  return (
    <div className="mt-1.5 flex flex-wrap items-stretch gap-1">
      {reactions.map((reaction) => (
        <SlackReactionPill
          key={reaction.emoji}
          emoji={reaction.emoji}
          count={reaction.count}
          onClick={() => increment(reaction.emoji)}
        />
      ))}
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
  reactions?: SlackReaction[];
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
        {reactions && reactions.length > 0 && <SlackReactions reactions={reactions} />}
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
  reactions?: SlackReaction[];
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
        <div className="body-main space-y-3 font-normal text-slack">{body}</div>
        {attachment}
        {reactions && reactions.length > 0 && <SlackReactions reactions={reactions} />}
      </div>
    </div>
  );
}

function StepVisual({ type }: { type: (typeof STEPS)[number]["visual"] }) {
  if (type === "marketplace") {
    return (
      <div className="min-w-0 overflow-hidden p-6 sm:p-8">
        <MarketplaceAppsVisual />
      </div>
    );
  }

  if (type === "slack-connect") {
    return (
      <div className="flex min-w-0 flex-col gap-2 p-6 sm:p-8">
        <SlackUserMessage
          name="Lisa"
          time="9:02 AM"
          avatar={lisaAvatar}
          reactions={[{ emoji: "⏳", count: 1 }]}
          body={
            <>
              <SlackMention>@Viktor</SlackMention> audit our Meta Ads and Google Ads spend. Compare vs last month.
            </>
          }
        />
        <SlackViktorMessage
          time="9:02 AM"
          reactions={[
            { emoji: "🎯", count: 4 },
            { emoji: "❤️", count: 2 },
          ]}
          body={
            <>
              <p>Done. Pulled data from both platforms. Findings:</p>
              <p>Meta Ads: CPA down 12% MoM, ROAS up to 3.4x</p>
              <p>Google Ads: Brand campaigns strong, pMax underperforming</p>
            </>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 justify-start overflow-hidden p-6 sm:p-8">
      <div className="min-w-0 w-full max-w-[438px]">
        <SlackViktorMessage
          time="9:02 AM"
          reactions={[{ emoji: "❤️", count: 4 }]}
          body={
            <>
              <p>Done! 📊: Here&apos;s your Q1 breakdown:</p>
              <p className="whitespace-normal">
                • Total billable hours: 1,247h across 14 projects
                <br />
                • Top project: Jace.ai - 312h (68% design, 32% dev)
                <br />• Avg margin: 41% - up from 33% last quarter
              </p>
              <p>Full spreadsheet attached:</p>
            </>
          }
          attachment={
            <div className="mt-2 flex w-full max-w-full min-w-0 items-center gap-1" aria-label="Attachment q1-project-profitability.xlsx">
              <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center text-[13px] leading-[1.4] text-[var(--slack-add-reaction-icon)] opacity-80">
                📎
              </span>
              <div className="slack-attached-pill">
                <span className="min-w-0 truncate text-[13px] leading-[1.4] tracking-[-0.26px] font-normal">
                  q1-project-profitability.xlsx
                </span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

function HowItWorksStepCard({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <article className="relative min-h-0 min-w-0 overflow-hidden rounded-section">
      <GlassCardShell>
        <div className="relative shrink-0">
          <StepVisual type={step.visual} />
        </div>
        <div className="relative flex shrink-0 flex-col items-start gap-3 p-6 sm:p-8">
          <p className="body-small text-primitive-orange-500">{step.number}</p>
          <h3 className="font-heading text-2xl max-sm:text-[1.3125rem] leading-[1.2] font-bold tracking-normal text-white">
            {step.title}
          </h3>
          <p className="body-main text-white/70">{step.body}</p>
        </div>
      </GlassCardShell>
    </article>
  );
}

function getCardMotion(needle: number, index: number) {
  const distance = needle - index;
  const exitX = -64;
  const exitY = 96;
  const enterX = 48;
  const enterY = 112;

  if (distance >= 1) {
    return {
      opacity: 0,
      transform: `translate(${exitX}px, ${exitY}px) rotate(-12deg) scale(0.96)`,
      zIndex: 10,
      pointerEvents: "none" as const,
    };
  }

  if (distance <= -1) {
    return {
      opacity: 0,
      transform: `translate(${enterX}px, ${enterY}px) rotate(12deg) scale(0.98)`,
      zIndex: 10,
      pointerEvents: "none" as const,
    };
  }

  if (distance >= 0) {
    const t = distance;
    return {
      opacity: 1 - t,
      transform: `translate(${exitX * t}px, ${exitY * t}px) rotate(${-12 * t}deg) scale(${1 - 0.04 * t})`,
      zIndex: t < 0.5 ? 30 : 20,
      pointerEvents: t < 0.5 ? ("auto" as const) : ("none" as const),
    };
  }

  const t = distance + 1;
  return {
    opacity: t,
    transform: `translate(${enterX * (1 - t)}px, ${enterY * (1 - t)}px) rotate(${12 * (1 - t)}deg) scale(${0.98 + 0.02 * t})`,
    zIndex: t > 0.5 ? 30 : 10,
    pointerEvents: t > 0.5 ? ("auto" as const) : ("none" as const),
  };
}

export function ProductHowItWorksSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const xlQuery = window.matchMedia("(min-width: 1360px)");

    function updateScrollProgress() {
      if (!xlQuery.matches) {
        setScrollProgress(0);
        return;
      }

      const container = scrollRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const scrollRange = height - window.innerHeight;
      if (scrollRange <= 0) return;

      const progress = Math.min(1, Math.max(0, -top / scrollRange));
      setScrollProgress(progress);
    }

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateScrollProgress();
      });
    }

    updateScrollProgress();
    xlQuery.addEventListener("change", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      xlQuery.removeEventListener("change", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const needle = scrollProgress * (STEPS.length - 1);
  const activeStep = Math.min(STEPS.length - 1, Math.max(0, Math.round(needle)));

  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="relative bg-primitive-main-beige py-14 pt-16 pb-1 sm:py-[7rem] sm:pt-16 sm:pb-[7rem]"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto grid w-full min-w-0 max-w-7xl gap-10 min-[1360px]:grid-cols-[459px_630px] min-[1360px]:justify-between min-[1360px]:pl-[108px]">
          <div className="min-w-0 min-[1360px]:sticky min-[1360px]:top-[max(64px,calc((100vh-712px)/2))] min-[1360px]:flex min-[1360px]:min-h-[min(712px,calc(100vh-128px))] min-[1360px]:items-center min-[1360px]:self-start">
            <div className="flex max-w-[459px] flex-col items-start">
              <p className="body-small pb-4 text-eyebrow-primitive-purple-700">How it works</p>
              <h2 className="font-heading text-[40px] max-sm:text-[35px] leading-[1.1] font-bold tracking-normal text-[#1a182b] sm:text-5xl">
                Hiring your first AI employee has never been{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: HEADING_GRADIENT }}>
                  this easy.
                </span>
              </h2>
              <p className="body-main mt-6 text-secondary">
                There is no prompt engineering. No workflow builder. No &quot;agent configuration.&quot; You describe what
                you need in plain language. Viktor figures out how to do it.
              </p>
            </div>
          </div>

          <div className="gradient-dark-2 flex min-w-0 w-full max-w-[min(630px,100%)] flex-col gap-8 rounded-section p-4 max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] max-sm:max-w-none sm:p-8 min-[1360px]:hidden">
            {STEPS.map((step) => (
              <HowItWorksStepCard key={step.number} step={step} />
            ))}
          </div>

          <div ref={scrollRef} className="relative hidden min-w-0 w-full max-w-[min(630px,100%)] min-[1360px]:block min-[1360px]:h-[300vh]">
            <div
              className="sticky top-[max(64px,calc((100vh-712px)/2))] isolate flex min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-section p-16"
              style={{
                backgroundColor: "#150079",
                backgroundImage:
                  "radial-gradient(146% 140% at 53.5% -3%, rgb(255, 189, 158) 0%, rgb(253, 188, 160) 6%, rgb(148, 127, 255) 51%, rgb(103, 72, 253) 80%, rgb(21, 0, 121) 100%)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "115% 313%",
                backgroundPosition: "55% 38%",
              }}
            >
              <div
                className="relative mx-auto grid w-full max-w-[502px] min-h-0 shrink-0 grid-rows-[minmax(0,1fr)] place-items-center [grid-template-areas:'stack']"
                style={{ height: 597 }}
              >
                {STEPS.map((step, i) => {
                  const motion = getCardMotion(needle, i);

                  return (
                    <div
                      key={step.number}
                      className="relative z-10 flex h-full max-h-none min-h-0 w-full items-stretch justify-center will-change-transform"
                      style={{
                        gridArea: "stack",
                        opacity: motion.opacity,
                        transform: motion.transform,
                        zIndex: motion.zIndex,
                        pointerEvents: motion.pointerEvents,
                      }}
                      aria-live={i === activeStep ? "polite" : undefined}
                      aria-atomic={i === activeStep ? "true" : undefined}
                      role="group"
                      aria-label={`Step ${i + 1}: ${step.title}`}
                      aria-hidden={i !== activeStep}
                    >
                      <HowItWorksStepCard step={step} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
