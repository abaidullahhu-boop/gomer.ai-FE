import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  saved?: string;
  image?: string;
  linkedinUrl?: string;
};

export type TestimonialsCarouselProps = {
  items: Testimonial[];
  title?: string;
  className?: string;
};

const PAUSE_MS = 4000;
const SCROLL_MS = 700;
const TRANSITION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const EDGE_BLUR_LAYERS = [
  { blur: 40, start: 0, end: 12.5 },
  { blur: 21.39, start: 0, end: 25 },
  { blur: 11.44, start: 0, end: 37.5 },
  { blur: 6.12, start: 12.5, end: 50 },
  { blur: 3.27, start: 25, end: 62.5 },
  { blur: 1.75, start: 37.5, end: 75 },
  { blur: 0.94, start: 50, end: 87.5 },
  { blur: 0.5, start: 62.5, end: 100 },
] as const;

function SavedClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6479 2.06636C12.2636 0.682046 10.2743 0 7.85714 0C5.43996 0 3.45066 0.682046 2.06636 2.06636C0.682046 3.45066 0 5.43996 0 7.85714C0 10.2743 0.682046 12.2636 2.06636 13.6479C3.45066 15.0323 5.43996 15.7143 7.85714 15.7143C8.60643 15.7143 9.3146 15.6487 9.97637 15.5171C10.1209 15.1509 10.3439 14.8089 10.6449 14.517C11.4149 13.7703 12.4972 13.544 13.4565 13.8314C13.5215 13.7717 13.5853 13.7105 13.6479 13.6479C15.0323 12.2636 15.7143 10.2743 15.7143 7.85714C15.7143 5.43996 15.0323 3.45066 13.6479 2.06636ZM6.7456 4.70983C6.7456 4.11809 7.2253 3.6384 7.81703 3.6384C8.40877 3.6384 8.88846 4.11809 8.88846 4.70983V7.79663C8.88846 8.08079 8.77559 8.3533 8.57464 8.55424L6.72257 10.4063C6.30414 10.8247 5.62576 10.8247 5.20734 10.4063C4.78891 9.9879 4.78891 9.30951 5.20734 8.89109L6.7456 7.35283V4.70983ZM19.6484 13.4275C20.0867 13.0299 20.1197 12.3523 19.7221 11.9141C19.3246 11.4758 18.647 11.4428 18.2087 11.8404C17.152 12.799 16.347 13.6706 15.6657 14.7341C15.2376 15.4023 14.8699 16.1281 14.518 16.9719L13.4031 15.8221C12.9912 15.3974 12.3129 15.387 11.8881 15.7989C11.4633 16.2109 11.4528 16.8891 11.8647 17.314L14.1537 19.6744C14.4124 19.9413 14.7911 20.055 15.1541 19.9747C15.5171 19.8946 15.8126 19.6319 15.9347 19.2809C16.4604 17.771 16.9214 16.7463 17.47 15.89C18.0143 15.0404 18.6736 14.3119 19.6484 13.4275Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CarouselArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.68985 12.8912C7.07614 13.3871 6.98058 14.2865 7.47641 14.9002C7.97225 15.5139 8.8717 15.6095 9.48541 15.1136C11.645 13.3688 12.9858 12.1323 14.5287 10.38C15.7262 9.01994 15.7262 6.98142 14.5287 5.62139C12.9858 3.86899 11.645 2.63253 9.48541 0.887713C8.8717 0.391882 7.97225 0.487444 7.47641 1.10115C6.98058 1.71486 7.07614 2.61432 7.68985 3.11015C9.3344 4.43881 10.4381 5.42179 11.5265 6.56925H2.00169C1.21271 6.56925 0.57312 7.20883 0.57312 7.99782C0.57312 8.78679 1.21271 9.42639 2.00169 9.42639H11.532C10.4417 10.5763 9.33713 11.5603 7.68985 12.8912Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function CarouselEdgeFade({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-y-0 z-10 hidden w-8 sm:block " +
        (isLeft ? "left-0" : "right-0")
      }
    >
      {EDGE_BLUR_LAYERS.map((layer, index) => (
        <div
          key={`${side}-${index}`}
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: isLeft
              ? `linear-gradient(to right, rgba(0,0,0,1) ${layer.start}%, rgba(0,0,0,1) ${layer.end}%, rgba(0,0,0,0) ${layer.end + 12.5}%)`
              : `linear-gradient(to left, rgba(0,0,0,1) ${layer.start}%, rgba(0,0,0,1) ${layer.end}%, rgba(0,0,0,0) ${layer.end + 12.5}%)`,
            WebkitMaskImage: isLeft
              ? `linear-gradient(to right, rgba(0,0,0,1) ${layer.start}%, rgba(0,0,0,1) ${layer.end}%, rgba(0,0,0,0) ${layer.end + 12.5}%)`
              : `linear-gradient(to left, rgba(0,0,0,1) ${layer.start}%, rgba(0,0,0,1) ${layer.end}%, rgba(0,0,0,0) ${layer.end + 12.5}%)`,
          }}
        />
      ))}
    </div>
  );
}

function CardGlassBorder() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.04))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(5px)", WebkitFilter: "blur(5px)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,1) 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "4px",
          }}
        />
      </div>
    </>
  );
}

export function TestimonialsCarousel({
  items,
  title = "What our customers say.",
  className,
}: TestimonialsCarouselProps) {
  const extendedItems = useMemo(
    () => [...items, ...items, ...items],
    [items],
  );
  const [activeIndex, setActiveIndex] = useState(items.length);
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const pausedRef = useRef(false);

  useEffect(() => {
    setActiveIndex(items.length);
  }, [items.length]);

  const updateOffset = useCallback(() => {
    const container = containerRef.current;
    const card = cardRefs.current[activeIndex];
    if (!container || !card) return;
    const containerCenter = container.offsetWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    setOffset(containerCenter - cardCenter);
  }, [activeIndex]);

  useEffect(() => {
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [updateOffset]);

  const snapTo = useCallback((index: number) => {
    setTransitionEnabled(false);
    setActiveIndex(index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    if (activeIndex >= 2 * items.length) {
      const timer = setTimeout(() => snapTo(items.length), SCROLL_MS);
      return () => clearTimeout(timer);
    }
    if (activeIndex < items.length) {
      const timer = setTimeout(
        () => snapTo(activeIndex + items.length),
        SCROLL_MS,
      );
      return () => clearTimeout(timer);
    }
  }, [activeIndex, items.length, snapTo]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => i - 1);
  }, []);

  const goToCard = useCallback(
    (clickedIndex: number) => {
      setActiveIndex((current) => {
        if (clickedIndex === current) return current;
        const itemIndex = clickedIndex % items.length;
        const candidates = [
          itemIndex,
          itemIndex + items.length,
          itemIndex + 2 * items.length,
        ];
        return candidates.reduce((closest, candidate) =>
          Math.abs(candidate - current) < Math.abs(closest - current)
            ? candidate
            : closest,
        );
      });
    },
    [items.length],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) goNext();
    }, PAUSE_MS + SCROLL_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section
      className={
        "bg-primitive-main-beige py-1 max-sm:overflow-x-clip sm:py-10 " +
        (className ?? "")
      }
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className={
              "relative overflow-hidden py-12 text-white bg-hero sm:py-16 rounded-section px-0 sm:px-8 lg:px-0 " +
              "max-sm:w-screen max-sm:max-w-none max-sm:-translate-x-1/2 max-sm:left-1/2 sm:left-auto sm:translate-x-0 sm:w-full"
            }
          >
            <div className="flex flex-col items-center gap-12 lg:gap-16">
              <h2 className="max-w-4xl text-center font-heading text-4xl max-sm:text-[2rem] leading-[1.1] font-bold tracking-[-0.06em] text-balance sm:text-5xl">
                {title}
              </h2>

              <div className="flex w-full flex-col items-center gap-10 lg:gap-12">
                <div className="relative -my-28 w-full max-w-none overflow-visible py-28 sm:-mx-8 sm:w-[calc(100%+4rem)] lg:mx-0 lg:w-full">
                  <CarouselEdgeFade side="left" />
                  <CarouselEdgeFade side="right" />

                  <div
                    ref={containerRef}
                    className="relative z-0 w-full overflow-hidden"
                    onMouseEnter={() => {
                      pausedRef.current = true;
                    }}
                    onMouseLeave={() => {
                      pausedRef.current = false;
                    }}
                  >
                    <div
                      className="flex w-max items-start gap-5 will-change-transform"
                      style={{
                        transform: `translateX(${offset}px)`,
                        transition: transitionEnabled
                          ? `transform ${SCROLL_MS}ms ${TRANSITION_EASE}`
                          : "none",
                      }}
                    >
                      {extendedItems.map((t, i) => {
                        const isActive = i === activeIndex;

                        return (
                          <div
                            key={`${t.name}-${i}`}
                            ref={(el) => {
                              cardRefs.current[i] = el;
                            }}
                            data-card
                            className="w-[min(24.75rem,calc(100vw-3rem))] shrink-0"
                          >
                            <article
                              onClick={() => !isActive && goToCard(i)}
                              className={
                                "relative flex min-h-75 w-full flex-col overflow-hidden rounded-section transition-[box-shadow,opacity,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none " +
                                (isActive
                                  ? ""
                                  : "cursor-pointer")
                              }
                            >
                              <div
                                className={
                                  "relative h-full min-h-52 w-full overflow-hidden rounded-[inherit] p-6 transition-[background-color,box-shadow,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:p-8 " +
                                  (isActive
                                    ? "bg-white text-primitive-main-dark"
                                    : "bg-white/4 text-white backdrop-blur-sm")
                                }
                              >
                                {isActive ? (
                                  <div
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
                                    style={{
                                      background:
                                        "linear-gradient(125deg, rgba(255, 255, 255, 0.92) 0%, rgba(254, 177, 142, 0.32) 42%, rgba(211, 196, 252, 0.32) 100%)",
                                    }}
                                  />
                                ) : (
                                  <CardGlassBorder />
                                )}

                                <div className="relative z-[2] flex h-full w-full flex-col justify-between">
                                  <div className="relative flex h-full min-h-52 flex-col justify-between gap-12">
                                    <div className="flex flex-col gap-10">
                                      {t.saved && (
                                        <div
                                          className={
                                            "flex flex-wrap items-center gap-2 text-sm font-medium transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                                            (isActive
                                              ? "text-accent-1"
                                              : "text-primitive-purple-50")
                                          }
                                        >
                                          <span className="flex items-center gap-1">
                                            <SavedClockIcon className="size-5" />
                                            Saved:
                                          </span>
                                          <span
                                            className={
                                              "rounded-full px-2 py-1 text-sm leading-[1.3] transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                                              (isActive
                                                ? "bg-primitive-purple-500/16 text-accent-1"
                                                : "border border-white text-primitive-purple-50 shadow-[inset_0_0_10px_#d2c6ff]")
                                            }
                                          >
                                            {t.saved}
                                          </span>
                                        </div>
                                      )}
                                      <p
                                        className={
                                          "text-xl leading-[1.4] font-medium tracking-[-0.03em] transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                                          (isActive
                                            ? "text-primitive-main-dark"
                                            : "text-white")
                                        }
                                      >
                                        “{t.quote}”
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-4">
                                      {t.image ? (
                                        <img
                                          src={t.image}
                                          alt={t.name}
                                          className="size-12 shrink-0 rounded-full object-cover"
                                        />
                                      ) : (
                                        <div className="size-12 shrink-0 rounded-full bg-gradient-to-br from-pink-300 to-violet-500" />
                                      )}
                                      <div className="min-w-0 flex-1 text-base font-medium tracking-[-0.03em] transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                                        <p
                                          className={
                                            "truncate leading-[1.4] " +
                                            (isActive
                                              ? "text-primitive-main-dark"
                                              : "text-white")
                                          }
                                        >
                                          {t.name}
                                        </p>
                                        <p
                                          className={
                                            "truncate leading-[1.4] opacity-70 " +
                                            (isActive
                                              ? "text-primitive-main-dark"
                                              : "text-white")
                                          }
                                        >
                                          {t.role}
                                        </p>
                                      </div>
                                      {t.linkedinUrl ? (
                                        <a
                                          href={t.linkedinUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          aria-label={`${t.name} on LinkedIn`}
                                          onClick={(e) => e.stopPropagation()}
                                          className={
                                            "shrink-0 transition-[color,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none " +
                                            (isActive
                                              ? "text-primitive-main-dark"
                                              : "text-white")
                                          }
                                        >
                                          <LinkedInIcon className="size-6" />
                                        </a>
                                      ) : (
                                        <LinkedInIcon
                                          className={
                                            "size-6 shrink-0 transition-[color,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                                            (isActive
                                              ? "text-primitive-main-dark"
                                              : "text-white")
                                          }
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </article>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="relative z-20 flex items-center gap-6">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous testimonial"
                    className="inline-flex h-10 min-h-10 items-center justify-center rounded-full border border-white bg-white px-6 text-primitive-main-dark transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
                  >
                    <CarouselArrowIcon className="size-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next testimonial"
                    className="inline-flex h-10 min-h-10 items-center justify-center rounded-full border border-white bg-white px-6 text-primitive-main-dark transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
                  >
                    <CarouselArrowIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
