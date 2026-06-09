import { type ReactNode } from "react";
import { GetStartedButton } from "@/components/site/GetStartedButton";

const DEFAULT_POINTS = [
  "3,000+ integrations",
  "Slack and Teams",
  "Reports, dashboards, apps",
  "Code and PR reviews",
  "SOC 2 compliant",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-6 shrink-0 opacity-50">
      <g opacity="0.3">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.28571 1.42859C6.41139 1.42859 4.06494 2.2392 2.43779 3.86637C0.810617 5.49353 0 7.83997 0 10.7143C0 13.5886 0.810617 15.935 2.43779 17.5623C4.06494 19.1894 6.41139 20 9.28571 20C12.16 20 14.5064 19.1894 16.1337 17.5623C17.7609 15.935 18.5714 13.5886 18.5714 10.7143C18.5714 7.83997 17.7609 5.49353 16.1337 3.86637C14.5064 2.2392 12.16 1.42859 9.28571 1.42859Z"
          fill="white"
          style={{ mixBlendMode: "plus-lighter" }}
        />
      </g>
      <g opacity="0.5">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.7411 0.373119C20.1268 0.821897 20.0756 1.49836 19.6268 1.88403C17.4778 3.73086 15.9752 5.29501 14.7262 7.1419C13.4735 8.99426 12.4446 11.1774 11.2978 14.2981C11.1725 14.6391 10.8829 14.8934 10.5285 14.9736C10.1741 15.0537 9.80329 14.9489 9.5434 14.695L4.60833 9.87354C4.18507 9.46003 4.17717 8.78169 4.59069 8.35843C5.0042 7.93516 5.68254 7.92726 6.10581 8.34077L9.87209 12.0203C10.8381 9.57747 11.7939 7.65267 12.9511 5.94149C14.3446 3.88079 15.9991 2.17626 18.2302 0.258861C18.6789 -0.126815 19.3554 -0.0756606 19.7411 0.373119Z"
          fill="white"
          style={{ mixBlendMode: "plus-lighter" }}
        />
      </g>
    </svg>
  );
}

type StartFreeSectionProps = {
  title?: ReactNode;
  description?: string;
  points?: string[];
  primaryCtaLabel?: string;
  primaryCtaTo?: string;
  secondaryCtaLabel?: string;
  onSecondaryCtaClick?: () => void;
  className?: string;
};

export function StartFreeSection({
  title = (
    <>
      Start free.
      <br />
      Pay only whenyou're ready.
    </>
  ),
  description = "Every feature. Every integration. $100 in credits on the house. No credit card, no sales call, no catch. When you need more, it starts $20/month.",
  points = DEFAULT_POINTS,
  primaryCtaLabel = "Get Started for Free",
  primaryCtaTo = "/pricing",
  secondaryCtaLabel = "See all plans",
  onSecondaryCtaClick,
  className = "sm:px-4 pb-20 pt-12",
}: StartFreeSectionProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl sm:px-12">
        <div className="rounded-[40px] bg-hero px-4 sm:px-8 py-12 sm:py-16 md:px-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-display text-white text-3xl leading-[1.05]">{title}</h2>
                <p className="mt-6 text-white max-w-md leading-relaxed">{description}</p>
              </div>
              <div className="mt-10 md:mt-0 flex flex-wrap gap-4">
                <GetStartedButton
                  to={primaryCtaTo}
                  label={primaryCtaLabel}
                  className="px-7 py-3.5 text-md font-medium"
                />
                <button
                  type="button"
                  onClick={onSecondaryCtaClick}
                  className="cursor-pointer rounded-full border border-white/50 px-7 py-3.5 text-md font-medium text-white hover:bg-white/10 transition"
                >
                  {secondaryCtaLabel}
                </button>
              </div>
            </div>
            <ul className="divide-y divide-white/15 md:pl-10">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3.5 py-8 text-lg text-white first:pt-0 last:pb-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                    <CheckIcon />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
