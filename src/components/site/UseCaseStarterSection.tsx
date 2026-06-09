import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { LucideIcon } from "lucide-react";
import { Megaphone, ShoppingBag, Sun } from "lucide-react";
import viktorAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import { GetStartedButton } from "@/components/site/GetStartedButton";

const CYCLE_MS = 6000;
const PROGRESS_R = 8;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_R;

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80`;

type SlackReaction = { emoji: string; count: number };

type StarterTab = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge: { label: string; variant: "live" | "soon" };
  description: string;
  marquee: string[];
  messages: {
    user: { name: string; time: string; avatar: string; body: ReactNode; reactions?: SlackReaction[] };
    viktor: { time: string; body: ReactNode; reactions?: SlackReaction[] };
  };
};

const STARTER_TABS: StarterTab[] = [
  {
    id: "media-buying",
    label: "Media Buying",
    icon: Megaphone,
    badge: { label: "Live", variant: "live" },
    description: "Your credentials are invisible to the AI",
    marquee: [
      "Pause underperforming ad sets by CPA threshold",
      "Reallocate budget to top performers",
      "Daily performance reports to Slack",
      "Launch new campaigns from a single message",
    ],
    messages: {
      user: {
        name: "Lisa",
        time: "11:32 AM",
        avatar: avatar("photo-1544005313-94ddf0286df2"),
        reactions: [{ emoji: "⏳", count: 1 }],
        body: (
          <>
            <SlackMention>@Viktor</SlackMention> pause anything with CPA above $40 and export this
            week&apos;s performance to Sheets ASAP.
          </>
        ),
      },
      viktor: {
        time: "11:38 AM",
        reactions: [
          { emoji: "✅", count: 2 },
          { emoji: "🚀", count: 1 },
        ],
        body: "Okie dokie. Paused 3 campaigns above $40 CPA. Sheet's in your Drive.",
      },
    },
  },
  {
    id: "e-commerce",
    label: "E-Commerce",
    icon: ShoppingBag,
    badge: { label: "Soon", variant: "soon" },
    description: "Pulls refund reasons straight from Shopify",
    marquee: [
      "Track revenue and refund trends in real time",
      "Flag inventory alerts before stockouts",
      "Automate customer support escalations",
      "Weekly P&L summaries from Stripe + Shopify",
    ],
    messages: {
      user: {
        name: "Priya Shah",
        time: "11:32 AM",
        avatar: avatar("photo-1573496359142-b8d87734a5a2"),
        reactions: [{ emoji: "⏳", count: 1 }],
        body: (
          <>
            <SlackMention>@Viktor</SlackMention> refund rate jumped to 8% this weekend. Pull the top
            reasons from Shopify and tell me if any SKUs are driving it.
          </>
        ),
      },
      viktor: {
        time: "11:38 AM",
        reactions: [
          { emoji: "✅", count: 2 },
          { emoji: "🚀", count: 1 },
        ],
        body: (
          <>
            <p>
              Done. Refunds Sat–Sun: 142 orders, $18,420 (vs $6,180 the weekend before). 73% came from
              one SKU: &apos;Linen Shirt · Size M&apos; Top reason code: &apos;smaller than expected&apos;
              (27 matching notes).
            </p>
            <p className="mt-2">Two things I can do now:</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              <li>Pause Meta ads pointing to that SKU</li>
              <li>Draft an updated size chart for Shopify</li>
            </ol>
            <p className="mt-2">Say the word.</p>
          </>
        ),
      },
    },
  },
  {
    id: "agencies",
    label: "Agencies",
    icon: Sun,
    badge: { label: "Soon", variant: "soon" },
    description: "Branded client recaps posted to Slack channels",
    marquee: [
      "Auto-generate client performance reports",
      "Track deliverables across projects",
      "Consolidate data from multiple client ad accounts",
      "Weekly status updates to Slack channels",
    ],
    messages: {
      user: {
        name: "Sarah Chen",
        time: "11:37 AM",
        avatar: avatar("photo-1580489944761-15a19d654956"),
        reactions: [{ emoji: "⏳", count: 1 }],
        body: (
          <>
            <SlackMention>@Viktor</SlackMention> weekly recap for Kelso Athletics. Spend, ROAS, open
            deliverables. Branded PDF in{" "}
            <span className="text-slack-mention underline decoration-solid">#client-kelso</span>.
          </>
        ),
      },
      viktor: {
        time: "11:38 AM",
        reactions: [
          { emoji: "✅", count: 2 },
          { emoji: "🚀", count: 1 },
        ],
        body: (
          <>
            <p>Done.</p>
            <ul className="mt-1 list-none space-y-1 pl-0">
              <li>• Spend: $48,320 (Meta $31.4k / Google $16.9k)</li>
              <li>• Blended ROAS: 3.2x (+0.4 vs last week)</li>
              <li>• Open deliverables: 3</li>
            </ul>
            <p className="mt-2">
              PDF in{" "}
              <span className="text-slack-mention underline decoration-solid">#client-kelso</span>.
              Schedule every Monday?
            </p>
          </>
        ),
      },
    },
  },
];

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm px-1 py-0.5 align-baseline whitespace-nowrap bg-slack-mention text-slack-mention body-main">
      {children}
    </span>
  );
}

function TabProgressCircle({ cycleKey }: { cycleKey: number }) {
  return (
    <span className="relative size-5 shrink-0 text-white" aria-hidden="true">
      <svg className="size-5 -rotate-90" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r={PROGRESS_R} fill="none" stroke="currentColor" strokeWidth="2" className="opacity-45" />
        <circle
          key={cycleKey}
          cx="10"
          cy="10"
          r={PROGRESS_R}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={PROGRESS_CIRCUMFERENCE}
          className="animate-use-case-progress"
          style={{
            animationDuration: `${CYCLE_MS}ms`,
            ["--use-case-circumference" as string]: PROGRESS_CIRCUMFERENCE,
          }}
        />
      </svg>
    </span>
  );
}

function TabGlassIndicator({
  top,
  height,
}: {
  top: number;
  height: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 z-0 w-full overflow-hidden rounded-section shadow-[inset_0_0_32px_0_rgba(255,255,255,0.64)] transition-[top,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ top, height, opacity: height > 0 ? 1 : 0 }}
    >
      <div className="relative h-full w-full rounded-section bg-white/[0.08] backdrop-blur-[22px] backdrop-saturate-150">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background: "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
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
                "linear-gradient(-56deg, rgb(255,255,255) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgb(255,255,255) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "4px",
            }}
          />
        </div>
        <div className="relative z-[2] h-full w-full" />
      </div>
    </span>
  );
}

function TabBadge({ label, variant }: { label: string; variant: "live" | "soon" }) {
  if (variant === "live") {
    return (
      <span className="inline-flex h-7 shrink-0 items-center rounded-full bg-[#6e47ff] px-4 body-small font-medium text-white">
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 shrink-0 items-center rounded-full border border-white/25 px-4 body-small font-medium text-[#f1edff]">
      {label}
    </span>
  );
}

function SlackReactions({ reactions }: { reactions: SlackReaction[] }) {
  return (
    <div className="mt-1.5 flex flex-wrap items-stretch gap-1">
      {reactions.map((r) => (
        <span
          key={r.emoji}
          className="inline-flex min-h-6 items-center gap-1 rounded-full border-0 bg-[var(--slack-reaction-pill-bg)] px-2 py-0.5 text-xs font-normal text-slack-reaction-pill"
        >
          <span aria-hidden="true">{r.emoji}</span>
          <span className="tabular-nums">{r.count}</span>
        </span>
      ))}
      <span className="inline-flex min-h-6 items-center gap-1 rounded-full border-0 bg-[var(--slack-reaction-pill-bg)] px-2 py-0.5 text-[var(--slack-add-reaction-icon)]">
        <SlackAddReactionIcon />
      </span>
    </div>
  );
}

function SlackAddReactionIcon() {
  return (
    <svg aria-hidden="true" className="size-[15px] shrink-0" fill="none" viewBox="0 0 15 15" width="15" height="15">
      <path
        d="M5.625 6.5625C5.625 7.08027 5.20527 7.5 4.6875 7.5C4.16973 7.5 3.75 7.08027 3.75 6.5625C3.75 6.04473 4.16973 5.625 4.6875 5.625C5.20527 5.625 5.625 6.04473 5.625 6.5625Z"
        fill="currentColor"
      />
      <path
        d="M9.375 6.5625C9.375 7.08027 8.95527 7.5 8.4375 7.5C7.91973 7.5 7.5 7.08027 7.5 6.5625C7.5 6.04473 7.91973 5.625 8.4375 5.625C8.95527 5.625 9.375 6.04473 9.375 6.5625Z"
        fill="currentColor"
      />
      <path
        d="M4.0106 10.1568C3.8824 9.77219 4.16867 9.375 4.57409 9.375H8.55091C8.95633 9.375 9.24261 9.77219 9.1144 10.1568L9.03043 10.4087C8.67634 11.471 7.68223 12.1875 6.5625 12.1875C5.44277 12.1875 4.44866 11.471 4.09457 10.4087L4.0106 10.1568Z"
        fill="currentColor"
      />
      <path
        d="M7.5 1.94146C7.19381 1.89766 6.8808 1.875 6.5625 1.875C2.93813 1.875 0 4.81313 0 8.4375C0 12.0619 2.93813 15 6.5625 15C10.1869 15 13.125 12.0619 13.125 8.4375C13.125 8.1192 13.1023 7.80619 13.0585 7.5H11.9068C11.9598 7.80453 11.9875 8.11779 11.9875 8.4375C11.9875 11.4336 9.55865 13.8625 6.5625 13.8625C3.56636 13.8625 1.1375 11.4336 1.1375 8.4375C1.1375 5.44136 3.56636 3.0125 6.5625 3.0125C6.88221 3.0125 7.19547 3.04016 7.5 3.09321V1.94146Z"
        fill="currentColor"
      />
      <path
        d="M11.25 0.46875C11.25 0.209866 11.4599 0 11.7188 0C11.9776 0 12.1875 0.209867 12.1875 0.46875V5.15625C12.1875 5.41513 11.9776 5.625 11.7188 5.625C11.4599 5.625 11.25 5.41513 11.25 5.15625V0.46875Z"
        fill="currentColor"
      />
      <path
        d="M14.0625 2.34375C14.3214 2.34375 14.5312 2.55362 14.5312 2.8125C14.5312 3.07138 14.3214 3.28125 14.0625 3.28125L9.375 3.28125C9.11612 3.28125 8.90625 3.07138 8.90625 2.8125C8.90625 2.55362 9.11612 2.34375 9.375 2.34375L14.0625 2.34375Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarterSlackUserMessage({
  name,
  time,
  avatar: avatarSrc,
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
    <div className="relative flex w-full text-left isolate gap-2 rounded-lg px-[var(--slack-message-pad-x)] py-0 border border-solid border-transparent bg-transparent">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
        <img alt={name} loading="lazy" width={36} height={36} className="size-full rounded-md object-cover" src={avatarSrc} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small text-slack font-medium">{name}</span>
          <span className="text-xs text-slack-secondary font-normal">{time}</span>
        </div>
        <div className="body-main text-slack font-normal">{body}</div>
        {reactions && reactions.length > 0 && <SlackReactions reactions={reactions} />}
      </div>
    </div>
  );
}

function StarterSlackViktorMessage({
  time,
  body,
  reactions,
}: {
  time: string;
  body: ReactNode;
  reactions?: SlackReaction[];
}) {
  return (
    <div
      data-variant="viktor"
      data-highlighted="true"
      className="relative flex w-full text-left isolate overflow-hidden slack-message-viktor gap-2 px-[var(--slack-message-pad-x)] py-[var(--slack-message-pad-y)]"
    >
      <div aria-hidden="true" className="slack-viktor-bg-mount">
        <div className="slack-viktor-layer-glass-stack" />
        <div className="slack-viktor-layer-inner-depth-soft" />
        <div className="slack-viktor-layer-inner-glow-overlay" />
        <div className="slack-viktor-layer-feather-blur" />
        <div className="slack-viktor-layer-white-sheet" />
      </div>
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md z-[1] bg-transparent">
        <img alt="Viktor" loading="lazy" width={36} height={36} className="size-full object-cover" src={viktorAvatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 mb-0.5">
          <span className="body-small text-slack font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span>Viktor</span>
              <span className="inline-flex items-center rounded-sm bg-slack-app-badge px-1 py-px text-[12px] leading-tight font-normal tracking-wide text-slack-app-badge uppercase">
                APP
              </span>
            </span>
          </span>
          <span className="text-xs text-slack-secondary font-normal">{time}</span>
        </div>
        <div className="body-main text-slack font-normal">{body}</div>
        {reactions && reactions.length > 0 && <SlackReactions reactions={reactions} />}
      </div>
    </div>
  );
}

function PointsMarquee({ points, id }: { points: string[]; id: string }) {
  const items = [...points, ...points];
  const itemCount = points.length;
  const stepPercent = 100 / itemCount;

  return (
    <div className="relative h-16 w-full shrink-0 overflow-hidden">
      <style>{`
        @keyframes starter-marquee-${id} {
          ${Array.from({ length: itemCount }, (_, i) => {
            const start = (i / itemCount) * 100;
            const holdEnd = start + (stepPercent * 0.8);
            const next = ((i + 1) / itemCount) * 100;
            return `
              ${start}% { transform: translate3d(0, calc(-${i} * 4rem), 0); }
              ${holdEnd}% { transform: translate3d(0, calc(-${i} * 4rem), 0); }
              ${Math.min(next, 99.9)}% { transform: translate3d(0, calc(-${i + 1} * 4rem), 0); }
            `;
          }).join("")}
          100% { transform: translate3d(0, calc(-${itemCount} * 4rem), 0); }
        }
        [data-starter-marquee="${id}"] {
          animation: starter-marquee-${id} 12s linear infinite;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-starter-marquee="${id}"] {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
      <div data-starter-marquee={id} className="w-full">
        {items.map((point, index) => (
          <p
            key={`${point}-${index}`}
            className="flex h-16 min-h-16 w-full items-center justify-center text-balance text-center body-large font-medium text-primary"
          >
            {point}
          </p>
        ))}
      </div>
    </div>
  );
}

function GlassChatCard({
  tab,
  isActive,
  panelId,
  tabId,
}: {
  tab: StarterTab;
  isActive: boolean;
  panelId: string;
  tabId: string;
}) {
  const { user, viktor } = tab.messages;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      aria-hidden={!isActive}
      inert={!isActive ? true : undefined}
      className={[
        "col-start-1 row-start-1 flex min-h-full flex-col transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        isActive
          ? "z-10 opacity-100 blur-0 motion-reduce:blur-0"
          : "pointer-events-none z-0 opacity-0 blur-md motion-reduce:blur-0",
      ].join(" ")}
    >
      <PointsMarquee points={tab.marquee} id={tab.id} />
      <div className="flex min-h-0 flex-1 flex-col justify-center pt-8">
        <div className="flex w-full flex-col gap-2">
          <StarterSlackUserMessage
            name={user.name}
            time={user.time}
            avatar={user.avatar}
            body={user.body}
            reactions={user.reactions}
          />
          <StarterSlackViktorMessage time={viktor.time} body={viktor.body} reactions={viktor.reactions} />
        </div>
      </div>
    </div>
  );
}

function GlassCardShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative h-full w-full min-w-0 overflow-hidden rounded-section lg:justify-self-end"
      style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[20px] z-0"
        style={{
          borderRadius: "inherit",
          background: "#ffffff",
          filter: "blur(10px)",
          WebkitFilter: "blur(10px)",
        }}
      />
      <div className="relative z-[1] h-full w-full rounded-[inherit]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background: "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
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
                "linear-gradient(-56deg, rgb(255,255,255) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgb(255,255,255) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "4px",
            }}
          />
        </div>
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <div className="rounded-[inherit] p-8 md:p-10 lg:p-16">
            <div className="relative grid grid-cols-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UseCaseStarterSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [cycleKey, setCycleKey] = useState(0);
  const tabRefs = useRef(new Map<number, HTMLButtonElement>());
  const tabListRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  const updateIndicator = useCallback(() => {
    const container = tabListRef.current;
    const button = tabRefs.current.get(activeIndex);
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setIndicator({
      top: buttonRect.top - containerRect.top,
      height: buttonRect.height,
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    const button = tabRefs.current.get(activeIndex);
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && button) {
      resizeObserver = new ResizeObserver(() => updateIndicator());
      resizeObserver.observe(button);
    }

    return () => {
      window.removeEventListener("resize", updateIndicator);
      resizeObserver?.disconnect();
    };
  }, [activeIndex, updateIndicator]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % STARTER_TABS.length);
    setCycleKey((k) => k + 1);
  }, []);

  const selectTab = useCallback((index: number) => {
    setActiveIndex(index);
    setCycleKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(goNext, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, cycleKey, goNext]);

  return (
    <section className="border-0 " id="use-case-starter">
      <div className="bg-hero mx-auto w-full max-w-[1440px] overflow-hidden rounded-[35px] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-20 lg:py-28 xl:px-20">
        <div className="mx-auto grid w-full max-w-[1172px] grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-8 lg:grid-cols-[minmax(0,27.125rem)_minmax(0,39.375rem)] lg:justify-between lg:gap-[6.75rem]">
          <div className="flex w-full min-w-0 flex-col gap-10 lg:gap-12">
            <div className="flex flex-col gap-4">
              <p className="body-small text-white/70">Choose a starting point</p>
              <h2 className="font-heading h3 max-w-[27.125rem] text-balance text-white md:max-w-none">
                Start with the function that eats the most time.
              </h2>
            </div>

            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Use case starting points"
              className="relative isolate flex w-full max-w-[25.875rem] flex-col overflow-visible md:max-w-none"
            >
              <TabGlassIndicator top={indicator.top} height={indicator.height} />

              {STARTER_TABS.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`${tab.id}-tab`}
                    aria-selected={isActive}
                    aria-controls={`${tab.id}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    ref={(node) => {
                      if (node) tabRefs.current.set(index, node);
                      else tabRefs.current.delete(index);
                    }}
                    onClick={() => selectTab(index)}
                    className={[
                      "group relative z-10 grid w-full min-h-[3.75rem] grid-cols-[1.25rem_minmax(0,1fr)_1.25rem] items-start gap-x-4 rounded-section px-6 py-4 text-left transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/45 md:px-6 lg:px-8",
                      isActive ? "text-white" : "text-white/45 hover:text-white/65",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "col-start-1 row-start-1 mt-0.5 size-5 shrink-0 transition-colors duration-300",
                        isActive ? "text-white" : "text-white/45 group-hover:text-white/65",
                      ].join(" ")}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span className="col-start-2 row-start-1 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="body-large font-medium text-inherit">{tab.label}</span>
                      <TabBadge label={tab.badge.label} variant={tab.badge.variant} />
                    </span>
                    <span className="col-start-3 row-start-1 mt-0.5 flex shrink-0 justify-end">
                      {isActive ? (
                        <TabProgressCircle cycleKey={cycleKey} />
                      ) : (
                        <span className="size-5" aria-hidden="true" />
                      )}
                    </span>
                    <div
                      className={[
                        "col-span-2 col-start-2 row-start-2 grid min-h-0 transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      ].join(" ")}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="mt-4 body-main text-white/75" aria-hidden={!isActive}>
                          {tab.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <GetStartedButton
              variant="white"
              className="text-center h-14 min-h-14 w-full gap-0 border border-white bg-white px-10 text-base tracking-[-0.01em] text-primitive-main-dark hover:bg-white/95 sm:w-auto"
            />
          </div>

          <GlassCardShell>
            {STARTER_TABS.map((tab, index) => (
              <GlassChatCard
                key={tab.id}
                tab={tab}
                isActive={index === activeIndex}
                panelId={`${tab.id}-panel`}
                tabId={`${tab.id}-tab`}
              />
            ))}
          </GlassCardShell>
        </div>
      </div>
    </section>
  );
}
