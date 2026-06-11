import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { investorAsset } from "@/data/about-investors";

const STEP_DURATION_S = 0.8;
const STEP_PHASE_MS = 1520;
const EASING = "cubic-bezier(0.645, 0.045, 0.355, 1)";

type CompanyLogo = {
  id: string;
  label: string;
  src: string;
  width: number;
  height: number;
};

const defaultLogos: CompanyLogo[] = [
  { id: "squibler", label: "Squibler", src: investorAsset("/assets/companies/logos/squibler-wordmark.svg"), width: 75, height: 32 },
  { id: "true-classic", label: "True Classic", src: investorAsset("/assets/companies/logos/true-classic-wordmark.svg"), width: 82, height: 24 },
  { id: "accel", label: "Accel", src: investorAsset("/assets/companies/logos/accel-wordmark.svg"), width: 74, height: 24 },
  { id: "ridge", label: "Ridge", src: investorAsset("/assets/companies/logos/ridge-wordmark.svg"), width: 107, height: 24 },
  { id: "lyfefuel", label: "LYFEfuel", src: investorAsset("/assets/companies/logos/lyfefuel-wordmark.svg"), width: 78, height: 24 },
  { id: "outlet", label: "Outlet", src: investorAsset("/assets/companies/logos/outlet-wordmark.svg"), width: 80, height: 24 },
  { id: "swoop", label: "Swoop", src: investorAsset("/assets/companies/logos/swoop-wordmark.svg"), width: 80, height: 24 },
  { id: "james-edition", label: "James Edition", src: investorAsset("/assets/companies/logos/james-edition-wordmark.svg"), width: 96, height: 24 },
  { id: "hampton", label: "Hampton", src: investorAsset("/assets/companies/logos/hampton-wordmark.svg"), width: 80, height: 24 },
  { id: "coingate", label: "CoinGate", src: investorAsset("/assets/companies/logos/coingate-wordmark.svg"), width: 88, height: 24 },
  { id: "aura", label: "Aura", src: investorAsset("/assets/companies/logos/aura-wordmark.svg"), width: 72, height: 24 },
];

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useInView(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

function LogoImage({ logo }: { logo: CompanyLogo }) {
  return (
    <img
      alt=""
      loading="lazy"
      width={logo.width}
      height={logo.height}
      decoding="async"
      className="max-w-full shrink-0 object-contain brightness-0 invert"
      src={logo.src}
      style={{
        color: "transparent",
        height: `${logo.height / 16}rem`,
        width: `${logo.width / 16}rem`,
      }}
    />
  );
}

function LogoDrumSlot({ logo, animate }: { logo: CompanyLogo; animate: boolean }) {
  const rawId = useId().replace(/:/g, "");
  const animationName = `vk_logo_drum_${rawId}`;
  const drumRef = useRef<HTMLDivElement>(null);
  const currentLogoRef = useRef(logo);
  const isFirstRender = useRef(true);
  const isAnimating = useRef(false);
  const pendingLogo = useRef<CompanyLogo | null>(null);
  const [slotRem, setSlotRem] = useState(3.5);
  const [visibleLogos, setVisibleLogos] = useState<CompanyLogo[]>([logo]);

  const keyframesCss = useMemo(
    () => `@keyframes ${animationName} {
  0% {
    transform: translate3d(0, 0, 0);
    animation-timing-function: ${EASING};
  }
  100% {
    transform: translate3d(0, calc(-1 * ${slotRem}rem), 0);
  }
}`,
    [animationName, slotRem],
  );

  const shouldAnimate = visibleLogos.length === 2 && animate;

  useLayoutEffect(() => {
    const media = window.matchMedia("(min-width: 40rem)");
    const update = () => setSlotRem(media.matches ? 4 : 3.5);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      currentLogoRef.current = logo;
      return;
    }

    if (logo.id === currentLogoRef.current.id) return;

    if (isAnimating.current) {
      pendingLogo.current = logo;
      return;
    }

    const previous = currentLogoRef.current;
    currentLogoRef.current = logo;
    setVisibleLogos(animate ? [previous, logo] : [logo]);
  }, [animate, logo]);

  useLayoutEffect(() => {
    if (!shouldAnimate) return;

    isAnimating.current = true;
    const drum = drumRef.current;
    if (!drum) return;

    drum.style.animation = "none";
    void drum.offsetHeight;
    drum.style.animation = `${animationName} ${STEP_DURATION_S}s linear 1 forwards`;

    const onEnd = (event: AnimationEvent) => {
      if (event.target !== drum) return;
      isAnimating.current = false;
      setVisibleLogos([logo]);
    };

    drum.addEventListener("animationend", onEnd);
    return () => drum.removeEventListener("animationend", onEnd);
  }, [animationName, logo, shouldAnimate]);

  useLayoutEffect(() => {
    if (shouldAnimate) return;

    const drum = drumRef.current;
    if (drum) {
      drum.style.animation = "";
      drum.style.transform = "";
      drum.style.willChange = "";
    }

    const pending = pendingLogo.current;
    if (!pending || pending.id === currentLogoRef.current.id) return;

    pendingLogo.current = null;
    if (isAnimating.current) {
      pendingLogo.current = pending;
      return;
    }

    const previous = currentLogoRef.current;
    currentLogoRef.current = pending;
    setVisibleLogos(animate ? [previous, pending] : [pending]);
  }, [animate, shouldAnimate]);

  return (
    <>
      {shouldAnimate ? (
        <style
          dangerouslySetInnerHTML={{
            __html: `${keyframesCss}
[data-vk-logo-drum="${rawId}"] {
  backface-visibility: hidden;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  [data-vk-logo-drum="${rawId}"] {
    animation: none !important;
    transform: none !important;
    will-change: auto;
  }
}`,
          }}
        />
      ) : null}
      <div className="logo-wall-drum-viewport relative h-14 w-full shrink-0 overflow-hidden sm:h-16">
        <div
          ref={drumRef}
          data-vk-logo-drum={shouldAnimate ? rawId : undefined}
          className="mx-auto flex w-full max-w-[66%] flex-col"
        >
          {visibleLogos.map((item) => (
            <div
              key={item.id}
              className="flex h-14 shrink-0 items-center justify-center sm:h-16"
            >
              <LogoImage logo={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function LogoWallSlots({
  visibleCount,
  logos,
  cycleMs = STEP_PHASE_MS,
  initialDelayMs = 0,
}: {
  visibleCount: number;
  logos: CompanyLogo[];
  cycleMs?: number;
  initialDelayMs?: number;
}) {
  const logoById = useMemo(
    () => Object.fromEntries(logos.map((logo) => [logo.id, logo])),
    [logos],
  );
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView();
  const [pageVisible, setPageVisible] = useState(true);
  const [state, setState] = useState(() => {
    const ids = logos.map((logo) => logo.id);
    return {
      slots: ids.slice(0, visibleCount),
      queue: shuffle(ids.slice(visibleCount)),
      pattern: shuffle(Array.from({ length: visibleCount }, (_, index) => index)),
      patternIndex: 0,
    };
  });

  const shouldAnimate =
    !reducedMotion && inView && pageVisible && state.queue.length > 0;

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const rotateNext = useCallback(() => {
    setState((current) => {
      if (current.queue.length === 0) return current;

      const slotIndex =
        current.pattern[current.patternIndex % current.pattern.length];
      const nextPatternIndex = (current.patternIndex + 1) % current.pattern.length;
      const outgoingId = current.slots[slotIndex];
      const incomingId = current.queue[0];
      const nextSlots = [...current.slots];
      nextSlots[slotIndex] = incomingId;

      return {
        slots: nextSlots,
        queue: [...current.queue.slice(1), outgoingId],
        pattern: current.pattern,
        patternIndex: nextPatternIndex,
      };
    });
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(rotateNext, cycleMs);
    }, initialDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [cycleMs, initialDelayMs, rotateNext, shouldAnimate]);

  useEffect(() => {
    const ids = logos.map((logo) => logo.id);
    setState({
      slots: ids.slice(0, visibleCount),
      queue: shuffle(ids.slice(visibleCount)),
      pattern: shuffle(Array.from({ length: visibleCount }, (_, index) => index)),
      patternIndex: 0,
    });
  }, [logos, visibleCount]);

  return (
    <div
      ref={ref}
      className="flex w-full flex-wrap items-center justify-center sm:flex-nowrap"
    >
      {state.slots.slice(0, visibleCount).map((logoId, index) => {
        const logo = logoById[logoId];
        if (!logo) return null;

        return (
          <span key={`slot-${index}`} className="contents">
            {index > 0 ? (
              <div
                aria-hidden="true"
                className="hidden h-6 w-px shrink-0 self-center bg-white/20 sm:block"
              />
            ) : null}
            <div
              className={[
                "flex min-w-0 items-center justify-center py-1 sm:flex-1 sm:py-0",
                visibleCount === 4 ? "w-1/2" : "flex-1",
              ].join(" ")}
            >
              <LogoDrumSlot logo={logo} animate={shouldAnimate} />
            </div>
          </span>
        );
      })}
    </div>
  );
}

function useVisibleSlotCount() {
  const [count, setCount] = useState(5);

  useLayoutEffect(() => {
    const media = window.matchMedia("(min-width: 40rem)");
    const update = () => setCount(media.matches ? 5 : 4);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return count;
}

export function LogoWall({
  title = "Trusted by:",
  logos = defaultLogos,
  className = "",
}: {
  title?: string;
  logos?: CompanyLogo[];
  className?: string;
}) {
  const visibleCount = useVisibleSlotCount();
  const labels = logos.map((logo) => logo.label).join(", ");

  return (
    <div
      className={[
        "mx-auto flex w-full min-w-0 max-w-4xl flex-col items-center gap-4 sm:flex-row sm:gap-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="shrink-0 text-center text-sm leading-[1.4] font-medium text-white sm:text-left">
        {title}
      </p>
      <LogoWallSlots
        key={`${visibleCount}-${logos.map((logo) => logo.id).join("-")}`}
        visibleCount={visibleCount}
        logos={logos}
      />
      <span className="sr-only">{labels}</span>
    </div>
  );
}
