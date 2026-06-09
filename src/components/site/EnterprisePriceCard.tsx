const enterpriseFeatures = [
  "Invoicing + custom billing terms",
  "Security review support + DPA",
  "SLA + priority support",
  "Dedicated onboarding + tailored limits/controls",
];

function FeatureCheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5 shrink-0">
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

export function EnterprisePriceCard() {
  return (
    <div className="group/card relative flex w-full flex-col gap-4 overflow-hidden rounded-section border-0 bg-white/10 p-0 text-sm text-white ring-0">
      <div className="relative h-full w-full rounded-[inherit] p-6 py-8 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 100%)",
          }}
        />
        <div
          aria-hidden="true"
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
          aria-hidden="true"
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

        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <div className="flex h-full w-full flex-col gap-8">
            <div className="relative grid auto-rows-min items-start gap-4 p-0">
              <p className="text-sm font-medium text-[#ffbb98]">Enterprise</p>
              <p className="font-heading text-5xl max-sm:text-[2.625rem] leading-none font-bold tracking-[-0.06em]">
                Custom
              </p>
            </div>

            <div className="relative flex flex-col gap-8 p-0">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-white/75">Flexible pricing</p>
                <a
                  href="https://cal.com/forms/24cb15e9-8a3d-4d94-9209-cc3d5f198286"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-vk-track="speak_to_sales_click"
                  data-vk-label="Contact Sales"
                  className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-full border border-white bg-white px-10 text-base font-medium tracking-[-0.01em] text-primitive-main-dark transition-all hover:bg-white/90 active:translate-y-px"
                >
                  Contact sales
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-white/75">Everything in Team, plus:</p>
                <ul className="grid gap-3 text-sm font-medium text-white">
                  {enterpriseFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <FeatureCheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
