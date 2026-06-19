import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import footerBlob from "../../assets/images/footer-blob.svg";

type Item = { label: string; to: string; external?: boolean; newTab?: boolean };

const colsRow1: { h: string; items: Item[] }[] = [
  {
    h: "Product",
    items: [
      { label: "Product", to: "/product" },
      { label: "Pricing", to: "/pricing" },
      { label: "FAQ", to: "/#faq" },
    ],
  },
  {
    h: "Compare",
    items: [
      { label: "vs ChatGPT", to: "/compare/gomer-vs-chatgpt" },
      { label: "vs OpenClaw", to: "/compare/gomer-vs-openclaw" },
      { label: "vs Claude in Slack", to: "/compare/gomer-vs-claude-in-slack" },
      { label: "vs Tasklet", to: "/compare/gomer-vs-tasklet" },
    ],
  },
  {
    h: "Solutions",
    items: [
      { label: "Integrations", to: "/integrations" },
      { label: "Personas", to: "/use-cases" },
    ],
  },
];

const colsRow2: { h: string; items: Item[] }[] = [
  {
    h: "About",
    items: [
      { label: "Earn money with Gomer", to: "https://partners.dub.co/getgomer-com", external: true },
      { label: "Become a Gomer influencer", to: "/creators" },
      { label: "About", to: "/landing" },
      { label: "Brand", to: "/brand" },
      { label: "Careers", to: "https://jobs.ashbyhq.com/gomer", external: true },
    ],
  },
  {
    h: "Resources",
    items: [
      { label: "Blog", to: "/blog" },
      { label: "Research", to: "/research" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Changelog", to: "/changelog" },
    ],
  },
  {
    h: "Terms & Docs",
    items: [
      { label: "Terms of service", to: "/terms", newTab: true },
      { label: "Privacy Policy", to: "/privacy", newTab: true },
      { label: "Docs", to: "/docs" },
      { label: "Impressum", to: "/impressum" },
    ],
  },
];

const allCols = [...colsRow1, ...colsRow2];

const desktopColPositions = [
  "lg:col-span-2 lg:col-start-5 lg:row-start-1",
  "lg:col-span-2 lg:col-start-8 lg:row-start-1",
  "lg:col-span-2 lg:col-start-11 lg:row-start-1",
  "lg:col-span-2 lg:col-start-5 lg:row-start-2",
  "lg:col-span-2 lg:col-start-8 lg:row-start-2",
  "lg:col-span-2 lg:col-start-11 lg:row-start-2",
] as const;

function Social({ label, href, d }: { label: string; href: string; d: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-primitive-main-grey transition-colors hover:text-primitive-main-dark"
    >
      <svg className="size-5 shrink-0 text-primitive-main-dark" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d={d} />
      </svg>
    </a>
  );
}

function FooterLink({ item }: { item: Item }) {
  const className = "text-sm text-secondary transition-colors hover:text-primary";

  if (item.newTab) {
    return (
      <a href={item.to} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
      </a>
    );
  }

  if (item.external || item.to.startsWith("http://") || item.to.startsWith("https://")) {
    return (
      <a href={item.to} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
      </a>
    );
  }

  if (item.to.includes("#")) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <Link to={item.to} className={className}>
      {item.label}
    </Link>
  );
}

function LinkCol({ h, items }: { h: string; items: Item[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold text-primary ">{h}</p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandBlock() {
  return (
    <div className="flex flex-col gap-16">
      <Link to="/" aria-label="Gomer home" className="inline-flex w-fit">
        <span aria-hidden="true" className="block">
          <img src={logo} alt="" width={152} height={38} className="block" loading="lazy" decoding="async" />
        </span>
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        <Social
          label="LinkedIn"
          href="https://www.linkedin.com/company/getgomer/"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        />
        <Social
          label="X"
          href="https://x.com/gomer__com"
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        />
        <Social
          label="YouTube"
          href="https://www.youtube.com/@getgomer_com"
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </div>
    </div>
  );
}

function Copyright() {
  return (
    <div className="mt-10 space-y-1 text-xs text-secondary lg:mt-auto">
      <p>2026 gomer.com. All rights reserved.</p>

    </div>
  );
}

export function Footer() {
  return (
    <footer
      aria-label="Footer"
      className="relative isolate overflow-hidden bg-primitive-main-beige pt-14 text-primitive-main-dark [color-scheme:light] md:pt-28"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Mobile */}
          <div className="flex flex-col gap-12 lg:hidden">
            <div>
              <BrandBlock />
              <Copyright />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
              {allCols.map((col) => (
                <LinkCol key={col.h} {...col} />
              ))}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden gap-x-6 gap-y-10 lg:grid lg:grid-cols-12 lg:grid-rows-2 lg:items-start">
            <div className="flex min-h-[262px] flex-col lg:col-span-4 lg:row-span-2 lg:h-full lg:min-h-0 lg:self-stretch">
              <BrandBlock />
              <Copyright />
            </div>
            {allCols.map((col, i) => (
              <div key={col.h} className={desktopColPositions[i]}>
                <LinkCol {...col} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative z-[1] mt-14 w-full md:mt-20" aria-hidden="true">
            <img
              src={footerBlob}
              alt=""
              width={1840}
              height={1150}
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-full max-w-none select-none"
              style={{ opacity: 1, transform: "translate(-50%, -34%) scale(1.4)" }}
              decoding="async"
              draggable={false}
            />
            <svg
              width={1280}
              height={379}
              viewBox="0 0 1280 379"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              overflow="visible"
              className="relative z-[1] block h-auto w-full overflow-visible select-none"
              aria-hidden="true"
            >
              <defs>
                <radialGradient
                  id="footer-wordmark-glass-radial-gomer"
                  cx="50%"
                  cy="32%"
                  r="72%"
                  gradientUnits="objectBoundingBox"
                >
                  <stop stopColor="white" stopOpacity="0.18" />
                  <stop offset="1" stopColor="white" stopOpacity="0.42" />
                </radialGradient>
                <linearGradient
                  id="footer-wordmark-glass-linear-gomer"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  gradientUnits="objectBoundingBox"
                >
                  <stop stopColor="white" stopOpacity="0.7" />
                  <stop offset="0.38" stopColor="white" stopOpacity="0" />
                  <stop offset="0.62" stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" stopOpacity="0.7" />
                </linearGradient>
                <filter
                  id="footer-wordmark-bezel-blur-gomer"
                  x="-40%"
                  y="-40%"
                  width="180%"
                  height="180%"
                  colorInterpolationFilters="sRGB"
                >
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              </defs>
              <text
                x="640"
                y="375"
                textAnchor="middle"
                fontFamily="UlmGrotesk, 'Segoe UI', sans-serif"
                fontSize="300"
                fontWeight="700"
                letterSpacing="4px"
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeOpacity="0.45"
                filter="url(#footer-wordmark-bezel-blur-gomer)"
                style={{ mixBlendMode: "luminosity" }}
                opacity="0.95"
              >
                GOMER
              </text>
              <text
                x="640"
                y="375"
                textAnchor="middle"
                fontFamily="UlmGrotesk, 'Segoe UI', sans-serif"
                fontSize="300"
                fontWeight="700"
                letterSpacing="4px"
                fill="url(#footer-wordmark-glass-radial-gomer)"
                fillOpacity="0.35"
                stroke="url(#footer-wordmark-glass-linear-gomer)"
                strokeWidth="1"
                style={{ mixBlendMode: "luminosity" }}
                opacity="0.9"
              >
                GOMER
              </text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
