import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, Linkedin } from "lucide-react";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  saved?: string;
  image?: string;
};

export type TestimonialsCarouselProps = {
  items: Testimonial[];
  title?: string;
  className?: string;
};

const PAUSE_MS = 4000;
const SCROLL_MS = 700;

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
  const trackRef = useRef<HTMLDivElement>(null);
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
        "py-18 bg-section-cream sm:px-6 lg:px-18 " + (className ?? "")
      }
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[36px] overflow-hidden relative bg-hero py-16 md:py-20 px-6 sm:px-10 md:px-14">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.88 0.10 60 / 0.9), transparent)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 md:w-12"
          style={{
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.12), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 md:w-12"
          style={{
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            background:
              "linear-gradient(to left, rgba(255,255,255,0.12), transparent)",
          }}
        />

        <h2 className="relative font-display text-4xl md:text-5xl text-white text-center">
          {title}
        </h2>

        <div
          ref={containerRef}
          className="relative mt-12 overflow-hidden px-2 sm:px-4"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          <div
            ref={trackRef}
            className="flex items-start gap-5 w-max will-change-transform"
            style={{
              transform: `translateX(${offset}px)`,
              transition: transitionEnabled
                ? `transform ${SCROLL_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
          >
            {extendedItems.map((t, i) => {
              const isActive = i === activeIndex;
              const itemIndex = i % items.length;
              const isTall = itemIndex % 2 === 0;
              const heightClass = isTall ? "h-[340px]" : "h-[250px]";

              return (
                <div
                  key={`${t.name}-${i}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-card
                  className={
                    "w-[min(85vw,320px)] md:w-[340px] shrink-0 flex items-start transition-[height] duration-500 " +
                    heightClass
                  }
                >
                <article
                  onClick={() => !isActive && goToCard(i)}
                  className={
                    "relative overflow-hidden w-full rounded-3xl p-6 flex flex-col justify-between backdrop-blur-sm transition-[height,opacity,background,box-shadow] duration-500 " +
                    heightClass +
                    (isActive
                      ? " bg-gradient-to-b from-[oklch(0.96_0.03_60)] to-[oklch(0.92_0.05_330)] text-foreground shadow-[0_20px_50px_-20px_oklch(0.3_0.15_290/0.6)]"
                      : " bg-white/15 text-white opacity-80 cursor-pointer hover:opacity-95")
                  }
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{
                      background:
                        "linear-gradient(-56deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 78%, rgba(255,255,255,0.65) 100%)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: "1px",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 0% 0%, rgba(255,255,255,0.18) 0%, transparent 70%), radial-gradient(ellipse 80% 60% at 100% 100%, rgba(255,255,255,0.14) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {t.saved && (
                      <div
                        className={
                          "inline-flex items-center gap-2 text-xs " +
                          (isActive ? "text-indigo-deep" : "text-white/85")
                        }
                      >
                        <span className="relative shrink-0 w-5 h-5">
                          <span
                            className={
                              "flex items-center justify-center w-5 h-5 rounded-full " +
                              (isActive ? "bg-violet-soft" : "")
                            }
                          >
                            <Clock
                              className="w-3 h-3 text-white"
                              strokeWidth={2.5}
                            />
                          </span>
                          {isActive && (
                            <span className="absolute -bottom-px -right-px flex items-center justify-center w-2.5 h-2.5 rounded-full bg-violet-soft ring-1 ring-white">
                              <Check
                                className="w-1.5 h-1.5 text-white"
                                strokeWidth={3.5}
                              />
                            </span>
                          )}
                        </span>
                        <span className={isActive ? "font-medium" : undefined}>
                          Saved:
                        </span>
                        <span
                          className={
                            "px-2 py-0.5 rounded-full " +
                            (isActive
                              ? "bg-[oklch(0.93_0.05_290)] font-medium"
                              : "border border-white/40")
                          }
                        >
                          {t.saved}
                        </span>
                      </div>
                    )}
                    <p
                      className={
                        "mt-6 text-lg font-medium leading-relaxed " +
                        (isActive ? "text-foreground" : "text-white")
                      }
                    >
                      “{t.quote}”
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-300 to-violet-500 shrink-0" />
                      )}
                      <div className="leading-tight">
                        <div
                          className={
                            "text-sm font-medium " +
                            (isActive ? "text-foreground" : "text-white")
                          }
                        >
                          {t.name}
                        </div>
                        <div
                          className={
                            "text-xs " +
                            (isActive
                              ? "text-foreground/60"
                              : "text-white/75")
                          }
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                    <Linkedin
                      className={
                        "w-4 h-4 " +
                        (isActive ? "text-foreground/70" : "text-white/80")
                      }
                    />
                  </div>
                  </div>
                </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-12 flex justify-center gap-2">
          <button
            onClick={goPrev}
            className="h-10 w-16 rounded-full bg-white text-foreground flex items-center justify-center transition hover:bg-white/95"
            aria-label="Previous"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3.5} />
          </button>
          <button
            onClick={goNext}
            className="h-10 w-16 rounded-full bg-white text-foreground flex items-center justify-center transition hover:bg-white/95"
            aria-label="Next"
          >
            <ArrowRight className="w-5 h-5" strokeWidth={3.5} />
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
