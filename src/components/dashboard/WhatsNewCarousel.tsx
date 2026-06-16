import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import whatsNewWorkspaceSwitcher from "@/assets/images/whats-new-workspace-switcher.png";
import whatsNewEditableCrons from "@/assets/images/whats-new-editable-crons.png";
import whatsNewCreditRollover from "@/assets/images/whats-new-credit-rollover.webp";

type WhatsNewItem = {
  date: string;
  title: string;
  description: string;
  image: string;
};

const items: WhatsNewItem[] = [
  {
    date: "May 26",
    title: "Multiple Workspaces",
    description:
      "Switch between Gomer workspaces from the sidebar — keep personal, team, and client work in separate spaces without signing out.",
    image: whatsNewWorkspaceSwitcher,
  },
  {
    date: "May 19",
    title: "Editable Crons",
    description:
      "Edit scheduled task timing directly from the dashboard — change frequency, timezone, or pause a cron without rebuilding the workflow.",
    image: whatsNewEditableCrons,
  },
  {
    date: "May 12",
    title: "Credit Rollover",
    description:
      "Unused credits now roll over to the next billing cycle on annual plans, so nothing goes to waste when usage dips month to month.",
    image: whatsNewCreditRollover,
  },
];

const AUTO_ADVANCE_MS = 5000;

export function WhatsNewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const item = items[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex((index + items.length) % items.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) goTo(activeIndex + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <div
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">What&apos;s new</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            New features, improvements, and fixes shipped to Gomer.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="gomer-focus-ring rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Previous update"
            onClick={() => goTo(activeIndex - 1)}
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="gomer-focus-ring rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Next update"
            onClick={() => goTo(activeIndex + 1)}
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <a
          href="https://gomer.com/changelog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-col gap-4 rounded-xl border bg-card transition-colors hover:border-muted-foreground/30 sm:flex-row sm:items-center sm:gap-6"
        >
          <div className="aspect-video w-full shrink-0 overflow-hidden rounded-t-xl bg-muted sm:w-[280px] sm:rounded-l-xl sm:rounded-tr-none">
            <img
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
              src={item.image}
            />
          </div>
          <div className="min-w-0 px-5 pb-5 sm:px-0 sm:py-5 sm:pr-6">
            <span className="text-xs text-muted-foreground">{item.date}</span>
            <h3 className="mt-1 text-sm font-semibold">{item.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        </a>
      </div>

      <div className="flex items-center justify-center gap-2 pt-4">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`size-2 rounded-full transition-colors ${
              index === activeIndex
                ? "bg-highlight"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
