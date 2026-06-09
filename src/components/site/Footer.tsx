import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import footerBlob from "../../assets/images/footer-blob.svg";
import footerWordmark from "../../assets/images/footer-wordmark.svg";
type Item = { label: string; to: string };

const colsRow1: { h: string; items: Item[] }[] = [
  { h: "Product", items: [
    { label: "Product", to: "/product" },
    { label: "Pricing", to: "/pricing" },
    { label: "FAQ", to: "/" },
  ]},
  { h: "Compare", items: [
    { label: "vs ChatGPT", to: "/compare/viktor-vs-chatgpt" },
    { label: "vs OpenClaw", to: "/compare/viktor-vs-openclaw" },
    { label: "vs Claude in Slack", to: "/compare/viktor-vs-claude-in-slack" },
    { label: "vs Tasklet", to: "/compare/viktor-vs-tasklet" },
  ]},
  { h: "Solutions", items: [
    { label: "Integrations", to: "/integrations" },
    { label: "Personas", to: "/" },
  ]},
];

const colsRow2: { h: string; items: Item[] }[] = [
  { h: "About", items: [
    { label: "Earn money with Viktor", to: "/creators" },
    { label: "Become a Viktor influencer", to: "/creators" },
    { label: "About", to: "/landing" },
    { label: "Brand", to: "/brand" },
    { label: "Careers", to: "/" },
  ]},
  { h: "Resources", items: [
    { label: "Blog", to: "/blog" },
    { label: "Case Studies", to: "/case-study" },
    { label: "Changelog", to: "/changelog" },
  ]},
  { h: "Terms & Docs", items: [
    { label: "Terms of service", to: "/terms" },
    { label: "Privacy Policy", to: "/" },
    { label: "Docs", to: "/docs" },
    { label: "Impressum", to: "/impressum" },
  ]},
];

function Social({ label, href, d }: { label: string; href: string; d: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-foreground cursor-pointer"
    >
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={d} /></svg>
    </a>
  );
}

function LinkCol({ h, items }: { h: string; items: Item[] }) {
  return (
    <div>
      <div className="text-sm font-bold text-foreground mb-5">{h}</div>
      <ul className="space-y-3.5">
        {items.map(i => (
          <li key={i.label}>
            <Link to={i.to} className="text-sm text-foreground/55 hover:text-foreground transition-colors">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-2 sm:px-20 sm:pt-32 pb-0">
      <div className="relative z-10 mx-auto max-w-7xl ">
        <div className="grid grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-x-8 gap-y-10 md:gap-x-8 md:gap-y-16">
          {/* Brand column — spans both link rows on desktop */}
          <div className="flex flex-col col-span-2 md:col-span-1 md:row-span-2">
            <img src={logo} alt="viktor" className="w-24 h-24" />
            <div className="mt-6 flex items-center gap-5">
              <Social label="LinkedIn" href="https://www.linkedin.com/company/getviktor/" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              <Social label="X" href="https://x.com/viktor__com" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              <Social label="YouTube" href="https://www.youtube.com/@getviktor_com" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </div>
            <div className="hidden md:block mt-auto text-xs text-foreground/45 leading-relaxed">
              <p>2026 viktor.com. All rights reserved.</p>
              <p>Website by Grafit</p>
            </div>
          </div>
          {colsRow1.map(c => <LinkCol key={c.h} {...c} />)}
          {colsRow2.map(c => <LinkCol key={c.h} {...c} />)}
        </div>

        <div className="md:hidden mt-16 text-xs text-foreground/45 leading-relaxed">
          <p>2026 viktor.com. All rights reserved.</p>
          <p>Website by Grafit</p>
        </div>
      </div>

      {/* Big translucent wordmark */}
      <div className="">
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
            <img
              src={footerWordmark}
              alt=""
              width={1280}
              height={379}
              className="relative z-[1] block h-auto w-full overflow-visible select-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
