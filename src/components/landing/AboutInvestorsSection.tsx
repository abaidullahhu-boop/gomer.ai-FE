import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  funderCells,
  investorAsset,
  investors,
  type FunderLogo,
  type Investor,
} from "@/data/about-investors";

const SLIDE_GAP_PX = 32;
const SCROLL_MS = 600;
const AUTO_ADVANCE_MS = 4000;
const DRUM_INTERVAL_MS = 3200;

function CarouselChevron({ className }: { className?: string }) {
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

function AvatarGlassOverlays() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 100%)",
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
        className="pointer-events-none absolute inset-0 z-1 overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(5px)" }}
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

function InvestorCard({ investor }: { investor: Investor }) {
  const avatarSrc = investorAsset(
    `/assets/people/avatars/investors/${investor.avatarFile}.png`,
  );

  return (
    <div className="flex w-[9.25rem] shrink-0 flex-col items-center gap-4 rounded-[inherit] focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none">
      <div className="relative size-[6.5rem] shrink-0 rounded-[32px]">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-20 -translate-x-1/2 -translate-y-1/2 rounded-[32px] border-4 border-solid border-white blur-[4px]"
        />
        <div className="relative z-1 size-full shrink-0 overflow-hidden rounded-[inherit]">
          <AvatarGlassOverlays />
          <div className="relative z-2 flex h-full w-full flex-col justify-between">
            <div className="flex h-full w-full items-center justify-center p-2">
              <div className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-[24px]">
                <img
                  alt={investor.name}
                  loading="lazy"
                  width={88}
                  height={88}
                  decoding="async"
                  className="relative z-0 size-full object-cover"
                  src={avatarSrc}
                />
                <span
                  aria-hidden
                  className="absolute right-2 bottom-[10px] z-10 box-content size-[10px] shrink-0 rounded-full border-4 border-solid border-[#f8f5f1] bg-[#2fbf71]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-1 text-center">
        <p className="body-main text-balance whitespace-normal text-white">{investor.name}</p>
        {investor.company && investor.companyLogo ? (
          <div className="flex h-6 flex-col items-center justify-center opacity-50">
            <img
              alt={investor.company}
              loading="lazy"
              width={320}
              height={48}
              decoding="async"
              className="h-4 max-w-full object-contain object-center"
              src={investorAsset(`/assets/companies/logos/${investor.companyLogo}`)}
            />
          </div>
        ) : (
          <div className="h-6" aria-hidden />
        )}
      </div>
    </div>
  );
}

function InvestorsCarousel() {
  const looped = useMemo(() => [...investors, ...investors, ...investors], []);
  const [activeIndex, setActiveIndex] = useState(investors.length);
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);

  const updateOffset = useCallback(() => {
    const container = containerRef.current;
    const slide = slideRefs.current[activeIndex];
    if (!container || !slide) return;

    const containerCenter = container.offsetWidth / 2;
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    setOffset(containerCenter - slideCenter);
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
      requestAnimationFrame(() => setTransitionEnabled(true));
    });
  }, []);

  useEffect(() => {
    if (activeIndex >= investors.length * 2) {
      const timer = setTimeout(() => snapTo(investors.length), SCROLL_MS);
      return () => clearTimeout(timer);
    }
    if (activeIndex < investors.length) {
      const timer = setTimeout(
        () => snapTo(activeIndex + investors.length),
        SCROLL_MS,
      );
      return () => clearTimeout(timer);
    }
  }, [activeIndex, snapTo]);

  const goNext = useCallback(() => setActiveIndex((i) => i + 1), []);
  const goPrev = useCallback(() => setActiveIndex((i) => i - 1), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) goNext();
    }, AUTO_ADVANCE_MS + SCROLL_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <div className="flex w-full min-w-0 max-w-none shrink-0 flex-col gap-12 self-stretch">
      <div
        ref={containerRef}
        className="investors-strip relative z-0 w-full max-w-none overflow-hidden pb-12"
        aria-label="Angel investors carousel"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div
          className="flex w-max items-start will-change-transform"
          style={{
            gap: `${SLIDE_GAP_PX}px`,
            transform: `translate3d(${offset}px, 0, 0)`,
            transition: transitionEnabled
              ? `transform ${SCROLL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none",
          }}
        >
          {looped.map((investor, index) => (
            <div
              key={`${investor.avatarFile}-${index}`}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="shrink-0"
              style={{ width: "9.25rem" }}
            >
              <InvestorCard investor={investor} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 flex w-full shrink-0 justify-center gap-6">
        <button
          type="button"
          aria-label="Previous investors"
          onClick={goPrev}
          className="cursor-pointer inline-flex h-10 min-h-10 items-center justify-center rounded-full border border-white bg-white px-6 text-primitive-main-dark transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
        >
          <CarouselChevron className="size-4 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next investors"
          onClick={goNext}
          className="cursor-pointer inline-flex h-10 min-h-10 items-center justify-center rounded-full border border-white bg-white px-6 text-primitive-main-dark transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
        >
          <CarouselChevron className="size-4" />
        </button>
      </div>
    </div>
  );
}

function FunderLogoLink({ logo }: { logo: FunderLogo }) {
  return (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={logo.label}
      className="cursor-pointer flex h-14 shrink-0 items-center justify-center transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:outline-none focus-visible:ring-white/60 sm:h-16"
    >
      <img
        alt=""
        loading="lazy"
        decoding="async"
        className="max-w-full shrink-0 object-contain brightness-0 invert"
        src={investorAsset(logo.src)}
        style={{
          height: logo.heightRem ? `${logo.heightRem}rem` : "1.5rem",
          width: logo.widthRem ? `${logo.widthRem}rem` : undefined,
        }}
      />
    </a>
  );
}

function LogoDrumCell({ logos }: { logos: FunderLogo[] }) {
  const [drumIndex, setDrumIndex] = useState(0);

  useEffect(() => {
    if (logos.length < 2) return;
    const timer = setInterval(
      () => setDrumIndex((i) => (i + 1) % logos.length),
      DRUM_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [logos.length]);

  return (
    <div className="logo-wall-drum-viewport relative h-14 w-full shrink-0 overflow-hidden sm:h-16">
      <div className="mx-auto flex w-full max-w-[66%] flex-col">
        <div
          className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-reduce:transform-none"
          style={{
            transform:
              logos.length > 1
                ? `translate3d(0, calc(-1 * ${drumIndex} * 4rem), 0)`
                : undefined,
          }}
        >
          {logos.map((logo) => (
            <FunderLogoLink key={logo.label} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FundedByLogoWall() {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-none flex-col items-center gap-4 self-stretch px-10 sm:flex-row sm:gap-6">
      <p className="shrink-0 text-center text-sm leading-[1.4] font-medium text-white sm:text-left">
        Funded by:
      </p>
      <div className="flex w-full flex-wrap items-center justify-center sm:flex-nowrap">
        {funderCells.map((cell, index) => (
          <span key={cell.logos.map((l) => l.label).join("-")} className="contents">
            {index > 0 ? (
              <div
                aria-hidden
                className="hidden h-6 w-px shrink-0 self-center bg-white/20 sm:block"
              />
            ) : null}
            <div className="flex min-w-0 flex-1 items-center justify-center py-1 sm:py-0">
              <LogoDrumCell logos={cell.logos} />
            </div>
          </span>
        ))}
      </div>
    </div>
  );
}

export function AboutInvestorsSection() {
  return (
    <section className="dark border-0 py-0! sm:py-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl py-10 md:py-12">
          <div className="relative overflow-hidden rounded-[32px]">
            <div
              aria-hidden
              className="bg-about-investors-surface pointer-events-none absolute inset-0 rotate-180"
            />
            <div className="relative flex w-full min-w-0 flex-col items-center gap-10 py-12 md:gap-24 md:py-28">
              <h2 className="font-heading h3 mx-auto max-w-[54rem] px-5 text-center text-balance text-white! sm:h2 md:px-12">
                <span className="block">Built for the best.</span>
                <span className="block">Backed by the best.</span>
              </h2>
              <InvestorsCarousel />
              <FundedByLogoWall />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
