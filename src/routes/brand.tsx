import { useId } from "react";
import { Check, X } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import mockupGenerator1 from "@/assets/images/mockup-generator-1.avif";
import mockupGenerator2 from "@/assets/images/mockup-generator-2.avif";
import mockupGenerator3 from "@/assets/images/mockup-generator-3.avif";

const styles = `
.vb { --vb-bg:#faf5f1; --vb-dark:#1a182b; --vb-grey:#6b6880; --vb-line:rgba(26,24,43,0.08);
  --vb-violet1:#a89bff; --vb-violet2:#7c66f5; --vb-violet3:#4224bc; --vb-peach:#ffd4b5;
  background:var(--vb-bg); color:var(--vb-dark); min-height:100vh; font-family:Gellix,ui-sans-serif,sans-serif; }
.vb-nav { display:flex; align-items:center; justify-content:space-between; padding:1.5rem 0; }
.vb-nav-brand { font-size:1.4rem; font-weight:700; letter-spacing:-0.04em; }
.vb-nav ul { display:flex; gap:1.8rem; list-style:none; padding:0; margin:0; font-size:0.9rem; color:var(--vb-grey); }
.vb-nav a { color:inherit; text-decoration:none; }
.vb-cta { background:var(--vb-dark); color:#fff; padding:0.55rem 1.1rem; border-radius:999px; font-size:0.85rem; text-decoration:none; }
.vb-hero { text-align:center; padding:3.5rem 0 4rem; }
.vb-hero h1 { font-size:clamp(2.4rem,5vw,3.6rem); font-weight:700; letter-spacing:-0.04em; line-height:1.05; margin:0; }
.vb-dl-btn { display:inline-flex; align-items:center; gap:0.5rem; background:var(--vb-dark); color:#fff; padding:0.6rem 1.1rem; border-radius:999px; font-size:0.85rem; border:none; cursor:pointer; text-decoration:none; }
.vb-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
@media (max-width:780px) { .vb-grid-2 { grid-template-columns:1fr; } }
.vb-card { border-radius:18px; aspect-ratio:16/10; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; border:1px solid var(--vb-line); }
.vb-card-bar { position:absolute; top:0; left:0; right:0; height:22px; background:rgba(255,255,255,0.45); display:flex; align-items:center; gap:5px; padding:0 10px; }
.vb-card-bar i { width:8px; height:8px; border-radius:50%; background:rgba(0,0,0,0.18); }
.vb-card .logo { font-size:clamp(2rem,5vw,3.4rem); font-weight:700; letter-spacing:-0.05em; }
.vb-bg-violet { background:linear-gradient(135deg,#a89bff,#7c66f5 55%,#4224bc); color:#fff; }
.vb-bg-peach { background:radial-gradient(ellipse at 30% 30%,#ffd9b8,#f8c9c0 60%,#e8c5e0); color:#1a182b; }
.vb-bg-white { background:#fff; color:#1a182b; }
.vb-bg-dark { background:#161427; color:#fff; }
.vb-checklist { display:grid; grid-template-columns:1fr 1fr; gap:0.7rem 2rem; margin-top:1.2rem; font-size:0.9rem; color:var(--vb-grey); }
.vb-checklist span { display:flex; align-items:center; gap:0.55rem; }
.vb-checklist .ok { color:#22c55e; }
.vb-checklist .no { color:#ef4444; }
@media (max-width:780px) { .vb-checklist { grid-template-columns:1fr; } }
.vb-footer { padding:4rem 0 2rem; border-top:1px solid var(--vb-line); margin-top:3rem; }
.vb-footer-grid { display:grid; grid-template-columns:1.5fr repeat(4,1fr); gap:2rem; }
@media (max-width:800px) { .vb-footer-grid { grid-template-columns:1fr 1fr; } }
.vb-footer h4 { font-size:0.8rem; font-weight:600; margin:0 0 1rem; }
.vb-footer ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.55rem; font-size:0.9rem; }
.vb-footer a { color:var(--vb-grey); text-decoration:none; }
.vb-footer a:hover { color:var(--vb-dark); }
.vb-wordmark { text-align:center; font-size:clamp(6rem,22vw,18rem); font-weight:800; letter-spacing:-0.06em; line-height:0.8; background:linear-gradient(180deg,#c9beff 0%,#7c66f5 60%,#3a1fa6 100%); -webkit-background-clip:text; background-clip:text; color:transparent; margin-top:3rem; user-select:none; }
`;

function LogoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-auto min-h-5 w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent bg-[#e7e2ff] px-3 py-1.5 text-[0.6875rem] leading-normal font-medium whitespace-normal text-[#6e47ff]">
      {children}
    </span>
  );
}

function ColorSwatchBadge({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex h-auto min-h-5 w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent px-3 py-1.5 text-[0.6875rem] leading-normal font-medium whitespace-normal text-white ${
        variant === "light"
          ? "bg-primitive-main-dark/10 text-primitive-main-dark"
          : "bg-white/20 text-primitive-main-white"
      }`}
    >
      {children}
    </span>
  );
}

function SolidColorSwatch({
  color,
  badges,
  hexCodes,
  badgeVariant,
}: {
  color: string;
  badges: readonly string[];
  hexCodes: readonly string[];
  badgeVariant: "light" | "dark";
}) {
  return (
    <div className="relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl shadow-sm sm:min-h-[240px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: color }}
      />
      <div className="relative z-1 flex min-h-full flex-1 flex-col justify-between">
        <div className="flex flex-wrap gap-2 p-4 text-white">
          {badges.map((badge) => (
            <ColorSwatchBadge key={badge} variant={badgeVariant}>
              {badge}
            </ColorSwatchBadge>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 p-4 text-white">
          {hexCodes.map((hex) => (
            <ColorSwatchBadge key={hex} variant={badgeVariant}>
              {hex}
            </ColorSwatchBadge>
          ))}
        </div>
      </div>
    </div>
  );
}

const mockupGeneratorUrl =
  "https://slack-mockup-f361ab3c.viktor.space/?s=N4IgxgFghgdjCmAbEAuUAXAngB3q80cSIANCDFALZ4ogDOUi8dIAvmdXQwObOoDaoAJYATfJgCMlAE4AWaZVIgoANyjoo0-AHpV6zXW24A9tia61AOmwxuSitXwBBNUqF0n2bKgBmjOvBk6EKcGpTetACcKBKyAAROALJKAEbGIpj4AAIAakIA1ujG0nF0AK6UlJpCAF7wcZjM6PDSIlCYAOR0cQDEDEzd6BDS8FAicbDjPohQ3BMwmENCtnEAknEI8ONFcT7GiIjGAO5xZdhxxjBKI1BgwZcsKIIg8JTGAFZC%2BIDPxEpgxmUYOhUBJWABdMjqDSQahAx78MHsYRiWgAJnyADZpJEwABmJR6DRaWgWfTSQwqAC0KiE%2B3g6GstnsVBoIDyhWKbg8XlQ6GkZUCIGCoSoERA0QkAFYEskyGkMvhcXERKNEN0RO4wGUuFtLHEACpHYwXGBxPm3fJxQAoBAkwNQ4mBDgFugAxaSidokOIAIUOxkopSE3AQIj1AHkEBt4FtupgASg4gARfQAZUwMDAcSO8CBgaYuagPmaJSG9RVbz16xE0kLzXGUF2%2B0OR0pZziyziAAkyikU9hjOgvUdYOg4vadgEYOMhOgAPzXUZ3WkweGgV4fL60QAm5IB4P7%2BAKBqFkSJeb0%2B%2BEAvBuAAR394DgTFwZD0NCILD0PDERCQCkLdxpAeUVAbARgCe8QGwKA6GaZAyAgkQNSZFBJQxMg-ygZZeX5eB2HAWA1EeUAa3ufAQP7FchBUPAyGMSjpGmY4nAzCBOVoIpvBw0tHFoRAgwgYFWCAA";

const mockupTemplates = [
  { label: "Pastel", image: mockupGenerator1 },
  { label: "Cloud", image: mockupGenerator2 },
  { label: "Orchid", image: mockupGenerator3 },
] as const;

const brandSolidColors = [
  { color: "#FFBD9E", badges: ["Solid", "Peach"], hexCodes: ["#FFBD9E"], badgeVariant: "light" as const },
  { color: "#947FFF", badges: ["Solid", "Lilac"], hexCodes: ["#947FFF"], badgeVariant: "dark" as const },
  { color: "#6748FD", badges: ["Solid", "Violet"], hexCodes: ["#6748FD"], badgeVariant: "dark" as const },
  { color: "#150079", badges: ["Solid", "Navy"], hexCodes: ["#150079"], badgeVariant: "dark" as const },
] as const;

type LogoShowcaseCardProps = {
  badges: string[];
  logoSrc: string;
  logoAlt: string;
  logoMaxWidth?: string;
  background?: "gradient" | "peach" | "white" | "dark";
};

function LogoShowcaseCard({
  badges,
  logoSrc,
  logoAlt,
  logoMaxWidth = "18rem",
  background = "gradient",
}: LogoShowcaseCardProps) {
  return (
    <div className="relative isolate min-h-[280px] overflow-hidden rounded-2xl shadow-sm sm:min-h-[360px]">
      {background === "gradient" ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] gradient-dark-2" />
      ) : null}
      {background === "peach" ? (
        <img
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none"
          loading="lazy"
          src="/assets/visuals/sections/brand/card2-bg.svg"
        />
      ) : null}
      {background === "white" ? (
        <div aria-hidden="true" className="absolute inset-0 bg-white" />
      ) : null}
      {background === "dark" ? (
        <div aria-hidden="true" className="absolute inset-0 bg-primitive-main-dark" />
      ) : null}
      <div className="absolute top-0 right-0 left-0 z-2 flex flex-wrap gap-2 p-4">
        {badges.map((badge) => (
          <LogoBadge key={badge}>{badge}</LogoBadge>
        ))}
      </div>
      <div className="relative z-1 flex min-h-[280px] items-center justify-center p-8 sm:min-h-[360px]">
        <img
          alt={logoAlt}
          className="max-h-16 object-contain"
          loading="lazy"
          src={logoSrc}
          style={{ maxWidth: `min(100%, ${logoMaxWidth})` }}
        />
      </div>
    </div>
  );
}

const primaryLogoCards: LogoShowcaseCardProps[] = [
  {
    badges: ["Logo", "Light"],
    logoSrc: "/assets/brand/logos/viktor-logo-pure-white.svg",
    logoAlt: "Gomer wordmark (pure white) on brand gradient",
    background: "gradient",
  },
  {
    badges: ["Logo", "Dark"],
    logoSrc: "/assets/brand/logos/viktor-logo-soft-black.svg",
    logoAlt: "Gomer wordmark on light blurred background",
    background: "peach",
  },
  {
    badges: ["Logo", "Dark"],
    logoSrc: "/assets/brand/logos/viktor-logo-soft-black.svg",
    logoAlt: "Gomer wordmark (soft black) on white background",
    background: "white",
  },
  {
    badges: ["Logo", "Dark", "Flat"],
    logoSrc: "/assets/brand/logos/viktor-logo-pure-white.svg",
    logoAlt: "Gomer wordmark (pure white) on dark background",
    background: "dark",
  },
];

const brandRuleGlassShadow =
  "rgb(255, 255, 255) 2.702px 2.702px 1.351px -2.702px inset, rgb(255, 255, 255) -2.702px -2.702px 1.351px -2.702px inset, rgba(255, 255, 255, 0.5) 0px 0px 8.106px inset, rgb(242, 242, 242) 0px 0px 43.232px inset";

const avatarDoRules = [
  "Messaging-app profile pictures.",
  "Favicon and OS app icon.",
  "Anywhere the wordmark would be unintelligible.",
] as const;

const avatarDontRules = [
  "Don't place next to or pair with the wordmark.",
  "Don't call this the logo — it's the avatar.",
  "Don't recolor, outline, or add effects.",
  "Don't distort, rotate, or crop the shape.",
] as const;

function AvatarShowcaseCard({
  badges,
  background,
}: {
  badges: string[];
  background: "white" | "dark";
}) {
  return (
    <div
      className={`relative isolate min-h-[280px] overflow-hidden rounded-2xl shadow-sm sm:min-h-[360px] ${
        background === "white" ? "bg-primitive-main-white" : "bg-primitive-main-dark"
      }`}
    >
      <div className="absolute top-0 right-0 left-0 z-2 flex flex-wrap gap-2 p-4">
        {badges.map((badge) => (
          <LogoBadge key={badge}>{badge}</LogoBadge>
        ))}
      </div>
      <div className="relative z-1 flex min-h-[280px] items-center justify-center p-8 sm:min-h-[360px]">
        <img
          alt={
            background === "white"
              ? "Gomer avatar on white background"
              : "Gomer avatar on dark background"
          }
          className="size-40 object-contain"
          loading="lazy"
          src="/assets/brand/logos/viktor-avatar-color.svg"
        />
      </div>
    </div>
  );
}

function BrandRuleDoIcon() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.35)] gradient-dark-2"
      aria-hidden="true"
    >
      <Check className="size-3 text-white" strokeWidth={2.8} aria-hidden="true" />
    </span>
  );
}

function BrandRuleDontIcon() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1a182b]/12 text-white"
      aria-hidden="true"
    >
      <X className="size-3" strokeWidth={2.4} aria-hidden="true" />
    </span>
  );
}

function BrandRuleCard({
  children,
  variant,
}: {
  children: string;
  variant: "do" | "dont";
}) {
  return (
    <div
      className="overflow-hidden rounded-4xl border-0 bg-white/30 py-0 ring-1 ring-primitive-main-dark/10 backdrop-blur-[10px]"
      style={{ boxShadow: brandRuleGlassShadow }}
    >
      <div className="flex items-start gap-4 px-4 py-5 sm:gap-5 sm:py-5">
        {variant === "do" ? <BrandRuleDoIcon /> : <BrandRuleDontIcon />}
        <div className="min-w-0 flex-1 body-main text-primary font-medium">{children}</div>
      </div>
    </div>
  );
}

function BrandRuleColumn({
  label,
  variant,
  rules,
}: {
  label: string;
  variant: "do" | "dont";
  rules: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex min-w-0 items-center gap-5">
        <span
          className={`inline-flex h-auto shrink-0 items-center justify-center rounded-full border border-transparent px-5 py-1 text-lg font-medium ${
            variant === "do"
              ? "bg-[rgba(92,40,215,0.16)] text-accent-1"
              : "bg-[rgba(26,24,42,0.05)] text-[#9693A3]"
          }`}
        >
          {label}
        </span>
        <div
          className="pointer-events-none h-px min-h-px min-w-0 flex-1 bg-[linear-gradient(90deg,rgba(26,24,42,0.2)_0%,rgba(26,24,42,0)_100%)]"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-4">
        {rules.map((rule) => (
          <BrandRuleCard key={rule} variant={variant}>
            {rule}
          </BrandRuleCard>
        ))}
      </div>
    </div>
  );
}

const brandToneHeaderShadow =
  "inset 2.702px 2.702px 1.351px -2.702px white, inset -2.702px -2.702px 1.351px -2.702px white, inset 0 0 8.106px rgba(255,255,255,0.5), inset 0 0 43.232px #f2f2f2";

const toneGradientDo =
  "radial-gradient(135% 145% at 52% -8%, rgb(255, 189, 158) 0%, rgb(253, 188, 160) 6.43%, rgb(201, 158, 208) 21.2%, rgb(148, 127, 255) 36%, rgb(126, 100, 254) 58%, rgb(103, 72, 253) 80%, rgb(83, 54, 220) 85%, rgb(62, 36, 187) 90%, rgb(42, 18, 154) 95%, rgb(21, 0, 121) 100%)";

const toneGradientDont =
  "radial-gradient(135% 145% at 52% -8%, rgb(245, 245, 245) 0%, rgb(236, 236, 236) 6.43%, rgb(206, 206, 206) 21.2%, rgb(153, 153, 153) 36%, rgb(125, 125, 125) 58%, rgb(102, 102, 102) 80%, rgb(82, 82, 82) 85%, rgb(61, 61, 61) 90%, rgb(42, 42, 42) 95%, rgb(21, 21, 21) 100%)";

const toneOfVoiceIsRules = [
  "An AI employee with its own computer. It lives in Slack, connects to your tools, and does real work.",
  "A persistent agent that remembers context, learns over time, and acts proactively.",
  "The most capable colleague on your team: research, reports, code, workflows, dashboards.",
  "Built for teams. Connects to 3,000+ tools via browser and native APIs.",
  "Human-in-the-loop: Gomer proposes, the human decides.",
] as const;

const toneOfVoiceIsNotRules = [
  "Not a chatbot. Gomer does not just answer questions. It actually does the work.",
  "Not a simple automation tool. It thinks, plans, and adapts with full reasoning.",
  "Not autonomous without oversight. Every significant action requires approval.",
  "Not a replacement for people. It augments your team's capabilities.",
  'Not "AI-powered X". Gomer is the coworker, not a feature inside something else.',
] as const;

const dosRules = [
  'Always say Gomer. Do not say "the Gomer bot" or "the Gomer AI assistant."',
  "Emphasize that Gomer does real work, not only answers.",
  "Position Gomer as a coworker. Use team language.",
  "Mention Slack-first. Gomer lives where your team already works.",
  "Highlight execution: code, browser, build, and deploy. Gomer is not chat-only.",
  "Use concrete examples of what Gomer can do (research, reports, apps, automations).",
] as const;

const dontRuleGroups = [
  {
    title: "Messaging",
    rules: [
      "Do not call Gomer a chatbot, virtual assistant, or copilot.",
      "Do not imply full autonomy. Always show where a human approves or reviews.",
      "Do not position Gomer as ChatGPT or Claude in Slack. Gomer is a different category: an AI employee wired into your tools and Slack.",
    ],
  },
  {
    title: "Logo and color (official materials)",
    rules: [
      "Do not use the logo on busy backgrounds without enough contrast.",
      "Do not stretch, rotate, or change the logo proportions.",
      "Do not use colors outside the brand palette for official materials.",
    ],
  },
] as const;

function ToneOfVoiceCheckIcon() {
  const id = useId();
  const gradientId = `${id}-gradient`;
  const clipId = `${id}-clip`;

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="block size-full">
      <g clipPath={`url(#${clipId})`}>
        <rect width="64" height="64" fill="#FAF5F1" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.3952 8.3952C13.9907 2.79969 22.0707 0 32 0C41.9293 0 50.0091 2.79969 55.605 8.3952C61.2005 13.9907 64 22.0707 64 32C64 41.9293 61.2005 50.0091 55.605 55.605C50.0091 61.2005 41.9293 64 32 64C22.0707 64 13.9907 61.2005 8.3952 55.605C2.79969 50.0091 0 41.9293 0 32C0 22.0707 2.79969 13.9907 8.3952 8.3952ZM45.3483 22.6876C46.517 21.6274 46.6048 19.8205 45.5447 18.6518C44.4846 17.4831 42.6777 17.3951 41.5089 18.4553C37.7112 21.9003 34.8585 24.9964 32.4504 28.755C30.6967 31.4923 29.2203 34.5163 27.7748 38.1813L22.6226 32.8682C21.5241 31.7354 19.7152 31.7075 18.5824 32.806C17.4496 33.9045 17.4218 35.7133 18.5203 36.8462L26.832 45.4176C27.5221 46.1294 28.5317 46.4325 29.4997 46.2185C30.4676 46.0046 31.2555 45.3041 31.5814 44.3679C33.5025 38.8495 35.208 35.0435 37.2619 31.8376C39.3045 28.6495 41.7689 25.9345 45.3483 22.6876Z"
          fill={`url(#${gradientId})`}
        />
      </g>
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(5.83333 66.7852 -89.8106 24.7924 33.3167 -2.78518)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
        <clipPath id={clipId}>
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ToneOfVoiceDismissIcon() {
  const clipId = `${useId()}-clip`;

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="block size-full">
      <g clipPath={`url(#${clipId})`}>
        <rect width="64" height="64" fill="#FAF5F1" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 0C22.0822 0 13.9992 2.79671 8.39799 8.39799C2.79671 13.9992 0 22.0822 0 32C0 41.9178 2.79671 50.0009 8.39799 55.6018C13.9992 61.2032 22.0822 64 32 64C41.9178 64 50.0009 61.2032 55.6018 55.6018C61.2032 50.0009 64 41.9178 64 32C64 22.0822 61.2032 13.9992 55.6018 8.39799C50.0009 2.79671 41.9178 0 32 0ZM45.594 18.4083C46.7099 19.5241 46.7099 21.3331 45.594 22.4489L36.0428 32L45.594 41.5511C46.7099 42.6669 46.7099 44.476 45.594 45.5918C44.4782 46.7077 42.6692 46.7077 41.5534 45.5917L32.0022 36.0406L22.4511 45.5918C21.3353 46.7077 19.5263 46.7077 18.4105 45.5918C17.2947 44.476 17.2947 42.6669 18.4105 41.5511L27.9616 32L18.4105 22.4489C17.2947 21.3331 17.2947 19.5241 18.4105 18.4083C19.5263 17.2925 21.3353 17.2925 22.4511 18.4083L32.0022 27.9594L41.5534 18.4083C42.6692 17.2925 44.4782 17.2925 45.594 18.4083Z"
          fill="#9693A3"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ToneOfVoiceColumnHeader({ variant }: { variant: "do" | "dont" }) {
  return (
    <div className="relative h-24 overflow-visible rounded-section sm:h-28 lg:h-32">
      <div
        className="absolute inset-0 isolate rounded-section"
        style={{ boxShadow: brandToneHeaderShadow }}
      >
        <div
          className="absolute inset-0 rounded-section"
          style={{ background: variant === "do" ? toneGradientDo : toneGradientDont }}
        />
        <div className="absolute inset-0 rounded-section bg-white/20" />
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-end justify-center">
        <span className="block size-10 shrink-0 rounded-[17px] shadow-[0_0_0_24px_var(--bg-primary)] sm:size-11 lg:size-[3.25rem]">
          {variant === "do" ? <ToneOfVoiceCheckIcon /> : <ToneOfVoiceDismissIcon />}
        </span>
      </div>
    </div>
  );
}

function ToneOfVoiceLabel({
  children,
  variant,
}: {
  children: string;
  variant: "do" | "dont";
}) {
  return (
    <div className="flex items-center justify-center gap-3 px-1 sm:gap-5">
      <div
        className={`h-px flex-1 ${
          variant === "do"
            ? "bg-[linear-gradient(90deg,rgba(26,24,43,0)_0%,rgba(26,24,43,0.12)_100%)]"
            : "bg-[linear-gradient(90deg,rgba(26,24,43,0.12)_0%,rgba(26,24,43,0)_100%)]"
        }`}
      />
      <span
        className={`relative z-30 inline-flex h-8 items-center justify-center rounded-full px-4 text-base leading-[1.3] font-medium tracking-[0.01em] sm:px-5 sm:text-[1.125rem] ${
          variant === "do" ? "bg-[#5c28d7]/16 text-[#5c28d7]" : "bg-[#1a182b]/5 text-secondary"
        }`}
      >
        {children}
      </span>
      <div
        className={`h-px flex-1 ${
          variant === "do"
            ? "bg-[linear-gradient(90deg,rgba(26,24,43,0.12)_0%,rgba(26,24,43,0)_100%)]"
            : "bg-[linear-gradient(90deg,rgba(26,24,43,0)_0%,rgba(26,24,43,0.12)_100%)]"
        }`}
      />
    </div>
  );
}

function ToneOfVoiceColumn({
  variant,
  label,
  rules,
}: {
  variant: "do" | "dont";
  label: string;
  rules: readonly string[];
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <ToneOfVoiceColumnHeader variant={variant} />
      <div className="relative z-20 mt-5 flex min-w-0 flex-col gap-4 sm:gap-5">
        <ToneOfVoiceLabel variant={variant}>{label}</ToneOfVoiceLabel>
        <div className="grid gap-4">
          {rules.map((rule) => (
            <BrandRuleCard key={rule} variant={variant}>
              {rule}
            </BrandRuleCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function DosDontsDontColumn({
  label,
  groups,
}: {
  label: string;
  groups: readonly { title: string; rules: readonly string[] }[];
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <ToneOfVoiceColumnHeader variant="dont" />
      <div className="relative z-20 mt-5 flex min-w-0 flex-col gap-4 sm:gap-5">
        <ToneOfVoiceLabel variant="dont">{label}</ToneOfVoiceLabel>
        <div className="flex flex-col gap-4">
          {groups.map((group, groupIndex) => (
            <div key={group.title} className="contents">
              <p className={`body-small text-secondary${groupIndex > 0 ? " pt-2" : ""}`}>
                {group.title}
              </p>
              {group.rules.map((rule) => (
                <BrandRuleCard key={rule} variant="dont">
                  {rule}
                </BrandRuleCard>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const secondaryLogoCards: LogoShowcaseCardProps[] = [
  {
    badges: ["Logo", "Light"],
    logoSrc: "/assets/brand/logos/viktor-logo-secondary-pure-white.svg",
    logoAlt: "Gomer secondary lockup (pure white) on brand gradient",
    logoMaxWidth: "24rem",
    background: "gradient",
  },
  {
    badges: ["Logo", "Dark"],
    logoSrc: "/assets/brand/logos/viktor-logo-secondary-soft-black.svg",
    logoAlt: "Gomer secondary lockup on soft blurred background",
    logoMaxWidth: "24rem",
    background: "peach",
  },
  {
    badges: ["Logo", "Dark"],
    logoSrc: "/assets/brand/logos/viktor-logo-secondary-soft-black.svg",
    logoAlt: "Gomer secondary lockup (soft black) on white background",
    logoMaxWidth: "24rem",
    background: "white",
  },
  {
    badges: ["Logo", "Dark", "Flat"],
    logoSrc: "/assets/brand/logos/viktor-logo-secondary-pure-white.svg",
    logoAlt: "Gomer secondary lockup (pure white) on dark background",
    logoMaxWidth: "24rem",
    background: "dark",
  },
];

export default function BrandPage() {
  return (
    <div className="vb">
      <PageMeta
        title="Brand Usage Guidelines — Gomer"
        description="Logo, colours, typography and tone of voice guidelines for the Gomer brand."
      />
      <style>{styles}</style>

      <section className="border-0 bg-primitive-main-beige py-0!">
        <div className=" relative w-full overflow-hidden rounded-b-section bg-surface-hero-primary sm:rounded-b-section">
          <Nav heroTone="light" />
          <div className="mt-15 hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-5 pb-20 text-center sm:px-8 md:px-12 md:pb-24 lg:px-20 lg:pb-28">
            <h1 className="flex max-w-[22ch] flex-col gap-0 font-heading h2 text-balance leading-none text-primary sm:h1 lg:text-7xl">
              <span className="text-[55px] sm:text-[71px]">Brand Usage</span>
              <span className="text-[55px] sm:text-[71px]">Guidelines</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-primitive-main-beige py-14 sm:py-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div className="flex min-w-0 max-w-xl flex-col gap-4 lg:max-w-none lg:flex-1 lg:gap-5">
                <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance text-primary max-sm:text-[1.625rem] sm:text-4xl lg:text-5xl">
                  Logo
                </h2>
                <p className="body-main max-w-xl font-medium text-secondary">
                  Use the logo with clear space and sufficient contrast. Available in dark and light variants, gradient or flat.
                </p>
              </div>
              <div className="w-full shrink-0 lg:w-auto">
                <a
                  className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-full bg-primitive-main-dark px-10 text-base font-medium tracking-[-0.01em] whitespace-nowrap text-white transition-all hover:opacity-90 sm:w-auto"
                  href="/assets/downloads/brand/viktor-logo-pack.zip"
                >
                  Download all logos
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-12 lg:gap-16">
              <div className="flex flex-col gap-8 lg:gap-12">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                  <p className="body-small shrink-0 font-medium text-primitive-purple-700 md:min-w-[8rem]">
                    Primary logo
                  </p>
                  <div className="flex min-w-0 max-w-xl flex-col gap-3 md:max-w-[32.5rem] md:flex-1">
                    <p className="body-main leading-relaxed text-secondary font-medium">
                      The Gomer wordmark is our primary logo and should be used in most applications. Its bold, distinctive form makes it the most recognizable expression of the brand.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {primaryLogoCards.map((card) => (
                    <LogoShowcaseCard key={card.logoAlt} {...card} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8 lg:gap-12">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                  <p className="body-small shrink-0 font-medium text-primitive-purple-700 md:min-w-[8rem]">
                    Secondary logo
                  </p>
                  <div className="flex min-w-0 max-w-xl flex-col gap-3 md:max-w-[32.5rem] md:flex-1">
                    <p className="body-main leading-relaxed text-secondary font-medium">
                      The Gomer.com lockup is a secondary logo used in applications where added clarity or direct navigation is important.
                    </p>
                    <p className="body-main leading-relaxed text-secondary font-medium">
                      It is most effective in digital advertising, out-of-home, and campaign environments where driving recognition and traffic to the website is a priority.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {secondaryLogoCards.map((card) => (
                    <LogoShowcaseCard key={card.logoAlt} {...card} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primitive-main-beige py-14 sm:py-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div className="flex min-w-0 max-w-xl flex-col gap-4 lg:max-w-none lg:flex-1 lg:gap-5">
                <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance text-primary max-sm:text-[1.625rem] sm:text-4xl lg:text-5xl">
                  Avatar
                </h2>
                <p className="body-main max-w-xl text-secondary font-medium">
                  The Gomer avatar — not the logo. Use it where the wordmark won't fit: a messaging-app
                  profile, a favicon, an app icon. Avatar and wordmark are never paired — pick one or the
                  other based on context.
                </p>
              </div>
              <div className="w-full shrink-0 lg:w-auto">
                <a
                  className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-full bg-primitive-main-dark px-10 text-base font-medium tracking-[-0.01em] whitespace-nowrap text-white transition-all hover:opacity-90 sm:w-auto"
                  href="/assets/downloads/brand/viktor-avatar-pack.zip"
                >
                  Download avatar (PNG)
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <AvatarShowcaseCard badges={["Avatar", "Light"]} background="white" />
              <AvatarShowcaseCard badges={["Avatar", "Dark"]} background="dark" />
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <BrandRuleColumn label="Do" variant="do" rules={avatarDoRules} />
              <BrandRuleColumn label="Don't" variant="dont" rules={avatarDontRules} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primitive-main-beige py-14 sm:py-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div className="flex min-w-0 max-w-xl flex-col gap-4 lg:max-w-none lg:flex-1 lg:gap-5">
                <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance text-primary max-sm:text-[1.625rem] sm:text-4xl lg:text-5xl">
                  Colours
                </h2>
                <p className="body-main max-w-xl text-secondary font-medium">
                  Gomer&apos;s palette runs from warm peach through lilac and violet into deep navy.
                  Soft-black and white anchor it; the radial gradient ties them together.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {brandSolidColors.map((swatch) => (
                  <SolidColorSwatch key={swatch.hexCodes[0]} {...swatch} />
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="relative min-h-[200px] overflow-hidden rounded-2xl shadow-sm sm:min-h-[240px]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 gradient-dark-2 select-none"
                  />
                  <div className="relative flex h-full min-h-[200px] flex-col justify-between gap-6 p-4 sm:min-h-[240px]">
                    <div className="flex flex-wrap gap-2">
                      <ColorSwatchBadge variant="dark">Gradient</ColorSwatchBadge>
                      <ColorSwatchBadge variant="dark">Radial</ColorSwatchBadge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["#FFBD9E", "#947FFF", "#6748FD", "#150079"].map((hex) => (
                        <ColorSwatchBadge key={hex} variant="dark">
                          {hex}
                        </ColorSwatchBadge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[200px] overflow-hidden rounded-2xl shadow-sm sm:min-h-[240px]">
                  <img
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover select-none"
                    loading="lazy"
                    src="/assets/visuals/sections/brand/brand-colours-gradient2.svg"
                  />
                  <div className="relative flex h-full min-h-[200px] flex-col justify-between gap-6 p-4 sm:min-h-[240px]">
                    <div className="flex flex-wrap gap-2">
                      <ColorSwatchBadge variant="light">Gradient</ColorSwatchBadge>
                      <ColorSwatchBadge variant="light">Blur + Blend mode</ColorSwatchBadge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["#B3A3FF", "#FFCCB5", "#FFF5AC", "#150079"].map((hex) => (
                        <ColorSwatchBadge key={hex} variant="light">
                          {hex}
                        </ColorSwatchBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SolidColorSwatch
                  color="#1B182A"
                  badges={["Solid", "Soft-black"]}
                  hexCodes={["#1B182A"]}
                  badgeVariant="dark"
                />
                <SolidColorSwatch
                  color="#FFFFFF"
                  badges={["Solid", "White"]}
                  hexCodes={["#FFFFFF"]}
                  badgeVariant="light"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primitive-main-beige py-14 sm:py-[7rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div className="flex min-w-0 max-w-xl flex-col gap-4 lg:max-w-none lg:flex-1 lg:gap-5">
                <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance text-primary max-sm:text-[1.625rem] sm:text-4xl lg:text-5xl">
                  Typography
                </h2>
                <p className="body-main max-w-xl text-secondary font-medium">
                  Font styles, weights, and how to apply Gomer&apos;s typography in design.
                </p>
              </div>
            </div>

            <div className="dark relative overflow-hidden rounded-2xl shadow-sm gradient-dark-1 text-white">
              <div className="relative z-1 flex flex-col gap-8 p-6 sm:gap-[32px] sm:p-10">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:gap-12">
                  <div className="flex max-w-sm shrink-0 flex-col gap-4 lg:gap-6">
                    <p className="font-heading text-base leading-tight font-semibold">Ulm Grotesk Bold</p>
                    <div className="flex flex-wrap gap-2">
                      <ColorSwatchBadge variant="dark">Display</ColorSwatchBadge>
                      <ColorSwatchBadge variant="dark">Headlines</ColorSwatchBadge>
                      <ColorSwatchBadge variant="dark">Subheads</ColorSwatchBadge>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden -mr-8 sm:-mr-14 lg:-mr-16">
                    <p
                      aria-hidden="true"
                      className="translate-x-[12%] whitespace-nowrap font-heading text-[80px] leading-[1.1] font-semibold tracking-[-0.02em] sm:translate-x-[28%] sm:text-[200px]"
                    >
                      AaBbCc
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:gap-12">
                  <div className="flex max-w-sm shrink-0 flex-col gap-4 lg:gap-6">
                    <p className="body-main text-base leading-tight font-medium">Gellix Medium</p>
                    <div className="flex flex-wrap gap-2">
                      <ColorSwatchBadge variant="dark">Body text</ColorSwatchBadge>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden -mr-6 sm:-mr-10">
                    <p
                      aria-hidden="true"
                      className="body-main translate-x-[6%] text-right text-[80px] leading-[1.1] font-medium tracking-[-0.02em] whitespace-nowrap sm:text-[200px]"
                    >
                      AaBbCc
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primitive-main-beige py-12 sm:py-[5rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div className="flex min-w-0 max-w-xl flex-col gap-4 lg:max-w-none lg:flex-1 lg:gap-5">
                <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance text-primary max-sm:text-[1.625rem] sm:text-4xl lg:text-5xl">
                  Tone of voice
                </h2>
                <p className="body-main max-w-xl text-secondary">
                  Write like Gomer: direct, capable, and human. Not a chatbot. A coworker.
                </p>
              </div>
            </div>

            <div className="mx-auto grid w-full max-w-full gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
              <ToneOfVoiceColumn variant="do" label="What Gomer is" rules={toneOfVoiceIsRules} />
              <ToneOfVoiceColumn variant="dont" label="What Gomer is not" rules={toneOfVoiceIsNotRules} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 sm:py-[5rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div className="flex min-w-0 max-w-xl flex-col gap-4 lg:max-w-none lg:flex-1 lg:gap-5">
                <h2 className="font-heading text-3xl max-sm:text-[1.625rem] leading-tight font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
                  Mockup Generator
                </h2>
                <p className="body-main max-w-xl text-secondary font-medium">
                  Make your own send-ready Slack mockup in seconds. Pick a template, edit any text in place,
                  choose a brand backdrop, and export at 2× retina for posts, decks, and ads. No design tool needed.
                </p>
              </div>
              <div className="w-full shrink-0 lg:w-auto">
                <a
                  className="group/button inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-full border-[length:var(--border-main)] border-solid border-btn-primary bg-btn-primary bg-clip-padding px-10 text-base font-medium tracking-[-0.01em] whitespace-nowrap text-btn-primary transition-all outline-none select-none hover:opacity-90 focus-visible:border-primitive-purple-500 focus-visible:ring-3 focus-visible:ring-primitive-purple-500/50 active:translate-y-px sm:w-auto"
                  href={mockupGeneratorUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open the generator
                </a>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {mockupTemplates.map((template) => (
                <div key={template.label} className="flex flex-col gap-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-sm">
                    <img
                      alt={`Slack mockup template: ${template.label}`}
                      className="absolute inset-0 h-full w-full object-cover select-none"
                      decoding="async"
                      height={540}
                      loading="lazy"
                      src={template.image}
                      width={960}
                    />
                  </div>
                  <div className="px-2">
                    <LogoBadge>{template.label}</LogoBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primitive-main-beige py-12 sm:py-[5rem]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div className="flex min-w-0 max-w-xl flex-col gap-4 lg:max-w-none lg:flex-1 lg:gap-5">
                <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance text-primary max-sm:text-[1.625rem] sm:text-4xl lg:text-5xl">
                  DOs & DON'Ts
                </h2>
              </div>
            </div>

            <div className="mx-auto grid w-full max-w-full gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
              <ToneOfVoiceColumn variant="do" label="Do" rules={dosRules} />
              <DosDontsDontColumn label="Don't" groups={dontRuleGroups} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
