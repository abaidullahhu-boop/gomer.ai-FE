import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import adsLogo from "@/assets/images/pricing-ads.webp";
import outreachLogo from "@/assets/images/pricing-outreach.avif";
import pipelineLogo from "@/assets/images/pricing-pipeline.webp";
import reportsLogo from "@/assets/images/pricing-reports.avif";

const WORD_CYCLE_MS = 2500;

type CreditsPowerItem = {
  label: string;
  icon: ReactNode;
};

function PricingTickerIcon({ src, dark }: { src: string; dark?: boolean }) {
  return (
    <img
      alt=""
      loading="lazy"
      width={88}
      height={88}
      className={`size-[0.875em] shrink-0 object-contain${dark ? " brightness-0" : ""}`}
      draggable={false}
      src={src}
    />
  );
}

function IntegrationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[0.875em] shrink-0" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2.5" fill="#000" />
      <path
        fill="#fff"
        d="M4.5 3.2 12 1.5l7.5 1.7v15.1L12 21.5 4.5 18.4V3.2zm1.4 1.5v12.6l5.1 2.2V6.9L5.9 4.7zm6.5 2.2v11.8l5.1-2.2V6.9l-5.1-2.2z"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <span
      className="inline-block size-[0.875em] shrink-0 rounded-md bg-[linear-gradient(135deg,#2a2a2a,#0a0a0a)]"
      aria-hidden="true"
    />
  );
}

function OrganizationIcon() {
  return (
    <span
      className="inline-block size-[0.875em] shrink-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#5a6470,#0f1722_70%)]"
      aria-hidden="true"
    />
  );
}

function AutomationsIcon() {
  return (
    <span
      className="inline-flex size-[0.875em] shrink-0 items-center justify-center rounded-md bg-[#6e47ff] text-[0.42em] font-bold text-white"
      aria-hidden="true"
    >
      Z
    </span>
  );
}

const creditsPowerItems: CreditsPowerItem[] = [
  { label: "Outreach", icon: <PricingTickerIcon src={outreachLogo} /> },
  { label: "Integrations", icon: <IntegrationIcon /> },
  { label: "Pipeline", icon: <PricingTickerIcon src={pipelineLogo} /> },
  { label: "Automations", icon: <AutomationsIcon /> },
  { label: "Reports", icon: <PricingTickerIcon src={reportsLogo} /> },
  { label: "Code", icon: <CodeIcon /> },
  { label: "Organization", icon: <OrganizationIcon /> },
  { label: "Ads", icon: <PricingTickerIcon src={adsLogo} /> },
];

function TickerItem({ item }: { item: CreditsPowerItem }) {
  return (
    <div className="inline-flex w-max shrink-0 items-center justify-start gap-5 leading-[1.1] whitespace-nowrap max-lg:justify-center max-lg:gap-4 h-[var(--pricing-credit-ticker-item-height)]">
      {item.icon}
      <span>{item.label}</span>
    </div>
  );
}

export function CreditsPowerHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState<number | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const itemHeightVar = "[--pricing-credit-ticker-item-height:clamp(4.75rem,7vw,5.5rem)] max-md:[--pricing-credit-ticker-item-height:4.5rem]";

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((i) => (i + 1) % creditsPowerItems.length),
      WORD_CYCLE_MS,
    );
    return () => clearInterval(t);
  }, []);

  useLayoutEffect(() => {
    const measureNode = measureRef.current;
    if (!measureNode) return;

    const activeItem = measureNode.children[activeIndex] as HTMLElement | undefined;
    if (!activeItem) return;

    setItemWidth(activeItem.offsetWidth);
  }, [activeIndex]);

  const tickerItems = [...creditsPowerItems, ...creditsPowerItems.slice(0, 1)];

  return (
    <div className="mx-auto flex w-full flex-col items-center text-center">
      <h2 className="relative z-10 max-w-5xl pb-[0.12em] font-heading h2 font-bold text-balance text-primary">
        Credits power everything
      </h2>
      <div className="relative z-0 flex w-full items-start justify-center gap-x-4 font-heading h2 font-bold max-lg:flex-col max-lg:items-center max-lg:gap-3 text-primary">
        <span className="whitespace-nowrap">Gomer does:</span>
        <div
          className={`relative overflow-hidden text-left max-lg:max-w-full max-lg:text-center ${itemHeightVar}`}
          aria-label="Gomer capabilities"
          style={{
            maxWidth: "min(32.5rem, 100%)",
            transition: "width 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)",
            height: "var(--pricing-credit-ticker-item-height)",
            width: itemWidth ?? undefined,
          }}
        >
          <span className="sr-only">{creditsPowerItems.map((item) => item.label).join(", ")}</span>
          <div
            ref={measureRef}
            className={`pointer-events-none fixed top-0 left-[-10000px] z-[-1] flex w-max flex-col opacity-0 ${itemHeightVar}`}
            aria-hidden="true"
          >
            {creditsPowerItems.map((item) => (
              <TickerItem key={item.label} item={item} />
            ))}
          </div>
          <div className="flex min-w-0 flex-col items-start max-lg:items-center" aria-hidden="true">
            <div
              className="flex flex-col items-start max-lg:items-center"
              style={{
                filter: "blur(0px)",
                opacity: 1,
                transition:
                  "transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1), filter 21ms cubic-bezier(0.45, 0, 0.9, 0.55)",
                transform: `translate3d(0px, calc(-1 * ${activeIndex} * var(--pricing-credit-ticker-item-height)), 0px)`,
              }}
            >
              {tickerItems.map((item, index) => (
                <TickerItem key={`${item.label}-${index}`} item={item} />
              ))}
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(180deg, var(--background) 10%, transparent 15.81%, transparent 95%, var(--background) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
