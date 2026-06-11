import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type SlackReaction = { emoji: string; count: number };

const QUICK_REACTION_EMOJIS = ["👍", "🙌", "❤️", "😂", "🎉", "🚀", "👀", "📊"];

export function SlackAddReactionIcon() {
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
  pillClassName,
}: {
  emoji: string;
  count: number;
  onClick: () => void;
  pillClassName?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed="false"
      onClick={onClick}
      className={
        pillClassName ??
        "inline-flex min-h-6 items-center gap-1 rounded-full border-0 bg-[var(--slack-reaction-pill-bg)] px-2 py-0.5 text-xs font-normal text-slack-reaction-pill cursor-pointer transition-colors hover:bg-[var(--slack-reaction-pill-hover-bg)]"
      }
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

export function SlackReactions({
  initial,
  pillClassName,
}: {
  initial: SlackReaction[];
  pillClassName?: string;
}) {
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
        <SlackReactionPill
          key={r.emoji}
          emoji={r.emoji}
          count={r.count}
          onClick={() => increment(r.emoji)}
          pillClassName={pillClassName}
        />
      ))}
      <SlackAddReactionButton onSelect={selectReaction} />
    </div>
  );
}
