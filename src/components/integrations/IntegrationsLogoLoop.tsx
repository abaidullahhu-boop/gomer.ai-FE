import { useEffect, useRef, type ReactNode } from "react";

import gomerIcon from "@/assets/images/viktor-marketplace-avatar.svg";

const HERO_ICON_CLASS =
  "h-auto max-h-20 w-auto max-w-[5rem] object-contain sm:max-h-32 sm:max-w-[7rem]";
const PRODUCT_ICON_CLASS =
  "h-auto max-h-14 w-auto max-w-[3.75rem] object-contain sm:max-h-16 sm:max-w-[4.25rem]";

const integrationLogos: { name: string; icon: (iconClass: string) => ReactNode }[] = [
  {
    name: "Cursor",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={`${iconClass} brightness-0`} aria-hidden>
        <path
          fill="currentColor"
          d="M4 4.5 12 2l8 2.5v15L12 22l-8-2.5V4.5zm2 1.8v10.9l6 1.9V6.4l-6-1.1zm8 0v12.8l6-1.9V6.4l-6-1.1z"
        />
      </svg>
    ),
  },
  {
    name: "Notion",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="#000"
          d="M4.5 3.2 12 1.5l7.5 1.7v15.1L12 21.5 4.5 18.4V3.2zm1.4 1.5v12.6l5.1 2.2V6.9L5.9 4.7zm6.5 2.2v11.8l5.1-2.2V6.9l-5.1-2.2z"
        />
      </svg>
    ),
  },
  {
    name: "Linear",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path fill="#5E6AD2" d="M3 17.3 17.3 3l3.7 3.7L6.7 21 3 17.3zm0-6.6L10.7 3l3.7 3.7L6.7 14.4 3 10.7z" />
      </svg>
    ),
  },
  {
    name: "HubSpot",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={iconClass} fill="#ff7a59" aria-hidden>
        <path d="M18.16 8.84V6.5a1.83 1.83 0 1 0-1.6 0v2.34a5.18 5.18 0 0 0-2.51.92L7.31 4.4a2.05 2.05 0 1 0-1.07 1.4l6.55 5.09a5.2 5.2 0 1 0 5.37-2.05Zm-1.6 7.92a2.6 2.6 0 1 1 2.6-2.6 2.6 2.6 0 0 1-2.6 2.6Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={`${iconClass} brightness-0`} fill="#111" aria-hidden>
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    name: "Google Ads",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path fill="#FBBC04" d="M12 2.5 3.5 17h5.5l3-5.2 3 5.2H20.5L12 2.5z" />
        <circle cx="6.5" cy="18.5" r="2.5" fill="#4285F4" />
        <circle cx="17.5" cy="18.5" r="2.5" fill="#34A853" />
      </svg>
    ),
  },
  {
    name: "Google Drive",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path fill="#4285F4" d="M8.4 3 1.2 15.5h6.8L15.2 3H8.4z" />
        <path fill="#0F9D58" d="M8.4 3 1.2 15.5h14.4L22.8 3H8.4z" />
        <path fill="#FFBA00" d="M1.2 15.5 8.4 3l6.8 12.5H1.2z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="#635BFF"
          d="M13.3 10.2c0-.8-.7-1.1-1.8-1.1-1.5 0-3.4.5-4.9 1.3V6.4c1.6-.6 3.2-.9 4.9-.9 4 0 6.6 2.1 6.6 5.6 0 5.4-7.4 4.5-7.4 7 0 .9.8 1.2 1.9 1.2 1.6 0 3.6-.6 5.2-1.5v3.2c-1.7.7-3.4 1-5.2 1-4.1 0-6.8-2.1-6.8-5.7 0-5.8 7.4-4.8 7.4-7.1z"
        />
      </svg>
    ),
  },
  {
    name: "PostHog",
    icon: (iconClass) => (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path fill="#F54E00" d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
      </svg>
    ),
  },
  {
    name: "Meta",
    icon: (iconClass) => (
      <svg
        viewBox="0 0 60 34"
        className={
          iconClass === PRODUCT_ICON_CLASS
            ? "h-auto max-h-14 w-auto object-contain sm:max-h-16 max-w-[4.75rem] sm:max-w-[5.25rem]"
            : "h-auto max-h-16 w-auto max-w-[6.5rem] object-contain sm:max-h-28 sm:max-w-[8.5rem]"
        }
        aria-hidden
      >
        <path
          fill="#0081FB"
          d="M7.5 19.5c-3.2 0-5.5-2.6-5.5-6.2 0-4.2 2.8-7.3 6.2-7.3 2.5 0 4.1 1.5 4.8 3.5.7-2 2.3-3.5 4.8-3.5 3.4 0 6.2 3.1 6.2 7.3 0 3.6-2.3 6.2-5.5 6.2-2.6 0-4.2-1.8-5-4.2-.8 2.4-2.4 4.2-5 4.2z"
        />
      </svg>
    ),
  },
];

const STEP_PAUSE_MS = 2400;
const STEP_SLIDE_MS = 650;
const DIM_OPACITY = 0.3;

function getCssRemPx(name: string, fallback: number) {
  const styles = getComputedStyle(document.documentElement);
  const value = parseFloat(styles.getPropertyValue(name));
  return Number.isFinite(value) && value > 0 ? value * 16 : fallback;
}

function getLoopMetrics() {
  return {
    step: getCssRemPx("--integrations-logo-loop-step", 136),
    tileSize: getCssRemPx("--integrations-logo-loop-tile-size", 112),
  };
}

function getCenteredOffset(trackIndex: number, viewportWidth: number) {
  const { step, tileSize } = getLoopMetrics();
  return trackIndex * step + tileSize / 2 - viewportWidth / 2;
}

type IntegrationsLogoLoopProps = {
  variant?: "hero" | "product";
  className?: string;
};

export function IntegrationsLogoLoop({ variant = "hero", className }: IntegrationsLogoLoopProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tiles = [...integrationLogos, ...integrationLogos, ...integrationLogos, ...integrationLogos];
  const iconClass = variant === "product" ? PRODUCT_ICON_CLASS : HERO_ICON_CLASS;
  const tilePadding = variant === "product" ? "" : "p-4";

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const viewportEl = viewport;
    const trackEl = track;
    const length = integrationLogos.length;
    const loopStart = length * 2;
    const loopEnd = length * 3;
    let activeIndex = 0;
    let timeoutId = 0;
    let cancelled = false;

    function getPhysicalIndex(index = activeIndex) {
      return index + loopStart;
    }

    function updateTileOpacity(physicalIndex = getPhysicalIndex()) {
      trackEl.querySelectorAll<HTMLElement>(".integrations-icon-tile--motion").forEach((tile, index) => {
        tile.style.opacity = index === physicalIndex ? "1" : String(DIM_OPACITY);
      });
    }

    function setOffset(offset: number, animate: boolean) {
      trackEl.style.transition = animate
        ? `transform ${STEP_SLIDE_MS}ms cubic-bezier(0.33, 1, 0.68, 1)`
        : "none";
      trackEl.style.transform = `translateX(${-offset}px)`;
    }

    function centerTrackAt(index: number, animate: boolean) {
      setOffset(getCenteredOffset(index, viewportEl.clientWidth), animate);
    }

    function syncPosition(animate: boolean) {
      centerTrackAt(getPhysicalIndex(), animate);
      updateTileOpacity();
    }

    function advance() {
      if (cancelled) return;

      const nextActive = (activeIndex + 1) % length;
      const wrapping = nextActive === 0;

      if (wrapping) {
        centerTrackAt(loopEnd, true);
        updateTileOpacity(loopEnd);

        timeoutId = window.setTimeout(() => {
          if (cancelled) return;

          activeIndex = 0;
          centerTrackAt(loopStart, false);
          updateTileOpacity();

          timeoutId = window.setTimeout(advance, STEP_PAUSE_MS);
        }, STEP_SLIDE_MS);
        return;
      }

      activeIndex = nextActive;
      centerTrackAt(getPhysicalIndex(), true);
      updateTileOpacity();

      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        timeoutId = window.setTimeout(advance, STEP_PAUSE_MS);
      }, STEP_SLIDE_MS);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    syncPosition(false);

    const onResize = () => syncPosition(false);
    window.addEventListener("resize", onResize);

    if (!reducedMotion) {
      timeoutId = window.setTimeout(advance, STEP_PAUSE_MS);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={`flex w-full flex-col items-center ${className ?? ""}`}>
      <div className="integrations-logo-loop w-full">
        <div
          ref={viewportRef}
          className="integrations-logo-loop-viewport"
          aria-label="Connected platforms"
        >
          <div className="integrations-logo-loop-clip">
            <div
              ref={trackRef}
              className="integrations-logo-loop-track integrations-logo-loop-track--motion flex"
            >
              {tiles.map((logo, index) => (
                <span
                  key={`${logo.name}-${index}`}
                  className={`integrations-icon-tile integrations-icon-tile--motion flex shrink-0 items-center justify-center ${tilePadding}`}
                  style={{ opacity: DIM_OPACITY }}
                >
                  {logo.icon(iconClass)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="sr-only">
          Gomer connects to popular tools including Cursor, Notion, Linear, HubSpot, GitHub, Google
          Ads, Google Drive, Stripe, PostHog, and Meta.
        </p>
      </div>

      <div className="integrations-connector" aria-hidden="true">
        <span className="integrations-connector-dot integrations-connector-dot-top" />
        <span className="integrations-connector-line flex-1" />
        <span className="integrations-connector-dot integrations-connector-dot-bottom" />
      </div>

      <div
        className={
          variant === "product"
            ? "relative -mt-3 size-24 sm:size-[9.0625rem]"
            : "relative -mt-1 size-28 sm:size-[120px]"
        }
      >
        <span className="integrations-gomer-avatar-glow absolute inset-[-38px]" aria-hidden="true" />
        <img
          alt="Gomer"
          className={`relative z-10 size-full rounded-[25px] ${variant === "hero" ? "rounded-[34px]" : ""}`}
          src={gomerIcon}
        />
      </div>
    </div>
  );
}
