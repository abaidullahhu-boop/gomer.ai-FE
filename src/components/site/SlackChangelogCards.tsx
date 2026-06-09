import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import viktorAvatar from "@/assets/images/viktor-marketplace-avatar.svg";

type SlackReaction = { emoji: string; count: number };

const QUICK_REACTION_EMOJIS = ["👍", "🙌", "❤️", "😂", "🎉", "🚀", "👀", "📊"];

const lisaAvatar =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

const tomAvatar =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

function CompareSlackGradientShell({ children }: { children: ReactNode }) {
  return (
    <div className="dark relative flex w-full overflow-hidden rounded-[32px] gradient-dark-1 min-h-[22rem] flex-col items-center justify-center p-4 lg:min-h-[616px] lg:p-16">
      <div className="flex w-full max-w-[27.5rem] flex-col gap-2">{children}</div>
    </div>
  );
}

/* ---------- Light Slack card (image 1) ---------- */
export function SlackLightCard() {
  return (
    <div className="relative w-full rounded-[28px] p-5 sm:p-7 bg-gradient-to-br from-[#c9b8ff] via-[#a78bfa] to-[#7c6cf0] shadow-[0_30px_60px_-20px_rgba(80,40,160,0.35)]">
      <div className="rounded-[18px] bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-[0_10px_30px_-15px_rgba(40,20,80,0.25)]">
        <div className="flex flex-col gap-3.5">
          <SlackRow name="Anna" time="1:23 PM" avatarClass="from-fuchsia-400 to-violet-500">
            <Mention>@Viktor</Mention> we need a competitive analysis for Monday
          </SlackRow>
          <SlackRow name="Lisa" time="1:24 PM" avatarClass="from-pink-400 to-violet-500">
            <Mention>@Viktor</Mention> please make it a PDF
          </SlackRow>
          <SlackRow name="Viktor" time="2:43 PM" avatarClass="from-violet-400 to-fuchsia-500" app>
            <>
              Done — pulled latest from Stripe, HubSpot and three review sites.
              <div className="mt-2.5">
                <FileChip name="competitive-analysis.pdf" />
              </div>
            </>
          </SlackRow>
        </div>
      </div>
    </div>
  );
}

/* ---------- Purple Slack card with Viktor glass reply (compare page) ---------- */
export function SlackPurpleCard() {
  return (
    <CompareSlackGradientShell>
      <CompareSlackUserMessage
        name="Lisa"
        time="9:02 AM"
        avatar={lisaAvatar}
        reactions={[{ emoji: "⏳", count: 1 }]}
        body={
          <>
            <SlackMention>@Viktor</SlackMention> we need a competitive analysis — us vs Notion AI, Glean, and
            Moveworks. Pricing, features, positioning. Make it a PDF I can share with the board
          </>
        }
      />
      <CompareSlackViktorMessage
        time="9:04 AM"
        reactions={[
          { emoji: "❤️", count: 4 },
          { emoji: "🔥", count: 3 },
        ]}
        attachment={<SlackFileAttachment name="competetive-analysis-q1.pdf" />}
        body={
          <>
            <p>✅ Done.</p>
            <p>
              12-page PDF with feature matrix, pricing comparison, and positioning map. Here&apos;s the executive
              summary:
            </p>
          </>
        }
      />
    </CompareSlackGradientShell>
  );
}

/* ---------- Teammate in Slack card (compare page, flipped layout) ---------- */
export function SlackTeammateCard() {
  return (
    <CompareSlackGradientShell>
      <CompareSlackUserMessage
        name="Tom"
        time="9:02 AM"
        avatar={tomAvatar}
        reactions={[{ emoji: "⏳", count: 1 }]}
        body={
          <>
            <SlackMention>@Viktor</SlackMention> audit our Meta Ads and Google Ads spend. Compare vs last month.
          </>
        }
      />
      <CompareSlackViktorMessage
        time="9:02 AM"
        reactions={[
          { emoji: "🎯", count: 4 },
          { emoji: "❤️", count: 2 },
        ]}
        body={
          <span className="whitespace-pre-line">{`✅ Done.
Pulled data from both platforms. Key findings:
Meta Ads: CPA down 12% MoM, ROAS up to 3.4x
Google Ads: Brand campaigns strong, pMax underperforming`}</span>
        }
      />
    </CompareSlackGradientShell>
  );
}

function SlackMention({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm px-1 py-0.5 align-baseline whitespace-nowrap bg-slack-mention text-slack-mention text-sm leading-snug">
      {children}
    </span>
  );
}

function CompareSlackUserMessage({
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
    <div className="relative flex w-full text-left isolate gap-2 rounded-lg px-[var(--slack-message-pad-x)] py-0 border border-solid border-transparent bg-transparent">
      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
        <img alt={name} loading="lazy" width={36} height={36} className="size-full rounded-md object-cover" src={avatar} />
      </div>
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="body-small text-slack font-medium">{name}</span>
          <span className="text-xs text-slack-secondary font-normal">{time}</span>
        </div>
        <div className="body-main text-slack font-normal">{body}</div>
        {reactions && reactions.length > 0 && <SlackReactions initial={reactions} />}
      </div>
    </div>
  );
}

function CompareSlackViktorMessage({
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

function SlackAddReactionIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[15px] shrink-0 text-[var(--slack-add-reaction-icon)]"
      fill="none"
      viewBox="0 0 15 15"
      width="15"
      height="15"
    >
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

function SlackAddReactionButton({ onSelect }: { onSelect: (emoji: string) => void }) {
  const [open, setOpen] = useState(false);
  const [pickerStyle, setPickerStyle] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const pickerHeight = 44;
    const pickerWidth = 280;
    const gap = 8;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openAbove = spaceBelow < pickerHeight + gap && spaceAbove >= pickerHeight + gap;
    const top = openAbove ? rect.top - pickerHeight - gap : rect.bottom + gap;
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - pickerWidth - 8));

    setPickerStyle({ top, left });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setPickerStyle(null);
      return;
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || pickerRef.current?.contains(target)) return;
      setOpen(false);
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const picker =
    open && pickerStyle
      ? createPortal(
          <div
            ref={pickerRef}
            role="toolbar"
            aria-label="Pick a reaction"
            style={{ position: "fixed", top: pickerStyle.top, left: pickerStyle.left, zIndex: 9999 }}
            className="flex items-center gap-0.5 rounded-full border border-white/70 bg-white/95 p-1 shadow-[0_8px_24px_rgba(46,30,107,0.18)] backdrop-blur-sm [--slack-reaction-pill-bg:#d2c6ff]"
          >
            {QUICK_REACTION_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                aria-label={`React with ${emoji}`}
                onClick={() => {
                  onSelect(emoji);
                  setOpen(false);
                }}
                className="flex size-7 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-base transition-colors hover:bg-[var(--slack-reaction-pill-bg)]"
              >
                {emoji}
              </button>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {picker}
      <button
        ref={buttonRef}
        type="button"
        aria-label="Add reaction"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-6 items-center gap-1 rounded-full border-0 bg-[var(--slack-reaction-pill-bg)] px-2 py-0.5 text-xs text-slack-reaction-pill shrink-0 justify-center cursor-pointer h-full transition-colors hover:bg-[var(--slack-reaction-pill-hover-bg)]"
      >
        <SlackAddReactionIcon />
      </button>
    </>
  );
}

function SlackReactions({ initial }: { initial: SlackReaction[] }) {
  const [reactions, setReactions] = useState(initial);

  const increment = (emoji: string) => {
    setReactions((prev) =>
      prev.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r)),
    );
  };

  const selectReaction = (emoji: string) => {
    setReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji);
      if (existing) {
        return prev.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r));
      }
      return [...prev, { emoji, count: 1 }];
    });
  };

  if (reactions.length === 0) return null;

  return (
    <div className="mt-1.5 flex flex-wrap items-stretch gap-1">
      {reactions.map((r) => (
        <SlackReactionPill key={r.emoji} emoji={r.emoji} count={r.count} onClick={() => increment(r.emoji)} />
      ))}
      <SlackAddReactionButton onSelect={selectReaction} />
    </div>
  );
}

/* ---------- helpers ---------- */
function SlackRow({
  name,
  time,
  avatarClass,
  app,
  children,
}: {
  name: string;
  time: string;
  avatarClass: string;
  app?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br ${avatarClass}`}
      >
        <span className="sr-only">{name[0]}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-semibold text-[#1d1c1d] text-sm">{name}</span>
          {app && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-100 text-violet-700 font-semibold">
              APP
            </span>
          )}
          <span className="text-[11px] text-[#1d1c1d]/60">{time}</span>
        </div>
        <div className="text-[14px] text-[#1d1c1d] leading-snug">{children}</div>
      </div>
    </div>
  );
}

function Mention({ children }: { children: ReactNode }) {
  return (
    <span className="px-1 rounded bg-violet-100 text-violet-700 font-medium">
      {children}
    </span>
  );
}

function FileChip({ name, tint }: { name: string; tint?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[12px] font-medium ${
        tint ? "bg-violet-100 text-violet-700" : "bg-stone-100 text-stone-700"
      }`}
    >
      <span>📎</span>
      {name}
    </span>
  );
}
