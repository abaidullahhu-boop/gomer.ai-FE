import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { CheckCircle2, Plug } from "lucide-react";
import type { ReactNode } from "react";
import { StartFreeSection } from "@/components/site/StartFreeSection";
import {
  ProductAppsIcon,
  ProductAutomateIcon,
  ProductBrowserIcon,
  ProductDataIcon,
  ProductEngineeringIcon,
  ProductIntegrationsIcon,
  ProductManagedIcon,
  ProductNoSetupIcon,
  ProductResearchIcon,
  ProductScheduleIcon,
  ProductSecureIcon,
  ProductTeamFirstIcon,
  ProductWorksEverywhereIcon,
} from "@/components/product/ProductCapabilityIcons";
import { IntegrationsLogoLoop } from "@/components/integrations/IntegrationsLogoLoop";
import { ProductHowItWorksSection } from "@/components/site/ProductHowItWorksSection";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import builtForTeamsImg from "@/assets/images/built-for-teams.avif";
import slackLogo from "@/assets/images/slack.svg";
import microsoftLogo from "@/assets/images/microsoft-teams.svg";
import soc2Badge from "@/assets/images/soc2.svg";
import gdprBadge from "@/assets/images/gdpr.svg";
import ccpaBadge from "@/assets/images/ccpa.svg";
import casaTier3Badge from "@/assets/images/casa-tier-3.svg";

/* ============================================================
   Design tokens used inline (mapped from prompt):
   --beige:  #faf5f1
   --orange: #ff9b6b  (primitive-orange-500)
   --purple-300: #b9a7ff
   --purple-500: #8267ff
   --dblue: #1a1342  (primitive-main-dblue)
============================================================ */

const CTA_GRADIENT =
  "radial-gradient(60% 80% at 20% 20%, #ffb08a55 0%, transparent 60%), radial-gradient(80% 90% at 80% 50%, #8267ff 0%, #4b2dbe 45%, #1a1342 100%)";

const SECURITY_GRADIENT =
  "radial-gradient(108.79% 100% at 50% 0%, rgba(255,187,152,0.2) 0%, rgba(255,187,152,0) 100%), radial-gradient(210.1% 116.78% at 39.65% 0%, #9e84ff 0%, #8666ff 18.26%, #6e47ff 36.52%, #5835de 52.39%, #4224bc 68.26%, #2b129b 84.13%, #20098a 92.07%, #150079 100%)";

const securityBadges = [
  { src: soc2Badge, alt: "SOC 2", label: "SOC 2 compliant." },
  { src: gdprBadge, alt: "GDPR", label: "GDPR aligned" },
  { src: ccpaBadge, alt: "CCPA", label: "CCPA compliant" },
  { src: casaTier3Badge, alt: "CASA", label: "CASA Tier 3 certified" },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Product — Viktor, an AI coworker for your entire team"
        description="Viktor is an AI coworker that plugs into your tools, talks in Slack, and ships real deliverables — built for teams, secure by default."
        ogTitle="Product — Viktor"
        ogDescription="An AI coworker for your entire team."
        canonical="/product"
      />
      <Hero />
      <SectionWhatViktorIs />
      <ProductHowItWorksSection />
      <SectionWhatCanDo />
      <SectionBuiltForTeams />
      <SectionHowDifferent />
      <SectionSecurity />
      <StartFreeSection />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function IntegrationIconTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="flex size-16 items-center justify-center overflow-hidden rounded-[25px] border border-[var(--integrations-icon-tile-border)] p-3"
      style={{
        background: "var(--integrations-icon-tile-bg)",
        boxShadow: "var(--integrations-icon-tile-shadow)",
      }}
    >
      <img src={src} alt={alt} width={40} height={40} className="max-h-full max-w-full object-contain" />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-0 py-0">
      <div className="relative w-full overflow-hidden rounded-b-section bg-integrations-hero-surface sm:rounded-b-section">
        <Nav heroTone="light" />
        <div className="hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 mt-16 px-5 pb-20 text-center sm:px-8 md:px-12 md:pb-24 lg:px-20 lg:pb-28">
          <div className="flex items-center gap-2">
            <IntegrationIconTile src={slackLogo} alt="Slack" />
            <IntegrationIconTile src={microsoftLogo} alt="Microsoft Teams" />
          </div>

          <div className="flex max-w-5xl flex-col items-center gap-6">
            <h1 className="font-heading h2 text-center text-balance sm:h1">
              Viktor is an AI employee
              <br />
              <span className="text-accent-1">for your entire team.</span>
            </h1>
            <p className="max-w-[34.1875rem] body-medium text-secondary font-medium">
              Viktor doesn&apos;t just answer questions. It does the work: pulling reports, managing
              campaigns, building dashboards, researching leads, automating workflows, and writing code.
              Like a new hire that already knows your stack.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center">
            <GetStartedButton
              variant="dark"
              className="inline-flex h-14 min-h-14 w-full items-center justify-center px-10 text-base tracking-[-0.01em] sm:w-auto"
            />
            <a
              href="https://cal.com/forms/24cb15e9-8a3d-4d94-9209-cc3d5f198286"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-full border border-[#1a182b1a] px-10 text-base font-medium tracking-[-0.01em] text-primitive-main-dark transition-all hover:bg-[#1a182b]/[0.06] active:translate-y-px sm:w-auto"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 2: WHAT VIKTOR IS ---------------- */
const whatViktorIsFeatures = [
  {
    title: "Your AI employee",
    description:
      "Viktor is a managed AI employee that operates across your entire organization. Add it to Slack or Microsoft Teams (soon) — and every person on your team gets access to an AI that can do real, meaningful work across every department.",
    icon: (
      <svg
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        overflow="visible"
        viewBox="0 0 31.9998 31.9984"
        fill="none"
        aria-hidden
        className="size-8 object-contain"
      >
        <path
          opacity="0.5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.6206 0.519906C22.7969 0.319607 23.1609 0 23.7143 0C24.2677 0 24.6315 0.319607 24.8078 0.519906C24.9874 0.723874 25.1138 0.959897 25.2018 1.1437C25.3433 1.4394 25.4866 1.82527 25.6219 2.18931C25.6537 2.27492 25.6853 2.35975 25.7159 2.44146C26.0789 3.40519 26.4821 4.33205 27.0848 4.93481C27.6779 5.52782 28.584 5.89902 29.5513 6.24583L29.7337 6.31088C30.1191 6.44779 30.5435 6.59865 30.8709 6.75986C31.0635 6.85483 31.3104 6.99387 31.5211 7.19826C31.7451 7.41545 31.9998 7.78048 31.9998 8.28571C31.9998 8.79095 31.7451 9.15598 31.5211 9.37317C31.3104 9.57755 31.0635 9.71659 30.8709 9.81157C30.5435 9.97278 30.1191 10.1236 29.7337 10.2605L29.5513 10.3256C28.584 10.6724 27.6779 11.0436 27.0848 11.6366C26.4821 12.2394 26.0789 13.1662 25.7159 14.13C25.685 14.2117 25.6537 14.2962 25.6219 14.3819C25.4866 14.7459 25.3433 15.132 25.2018 15.4277C25.1138 15.6115 24.9874 15.8476 24.8078 16.0515C24.6315 16.2518 24.2677 16.5714 23.7143 16.5714C23.1609 16.5714 22.7969 16.2518 22.6206 16.0515C22.4411 15.8476 22.3146 15.6115 22.2266 15.4277C22.0851 15.132 21.9418 14.7461 21.8065 14.3821C21.7747 14.2964 21.7432 14.2118 21.7125 14.13C21.3496 13.1662 20.9463 12.2394 20.3435 11.6366C19.7505 11.0436 18.8444 10.6724 17.8771 10.3256L17.6946 10.2605C17.3093 10.1236 16.8848 9.97278 16.5575 9.81157C16.3648 9.71659 16.1181 9.57755 15.9073 9.37317C15.6832 9.15598 15.4286 8.79095 15.4286 8.28571C15.4286 7.78048 15.6832 7.41545 15.9073 7.19826C16.1181 6.99387 16.3648 6.85483 16.5575 6.75986C16.8848 6.59865 17.3093 6.44779 17.6946 6.31088L17.8771 6.24583C18.8444 5.89902 19.7505 5.52782 20.3435 4.93481C20.9463 4.33205 21.3496 3.40519 21.7125 2.44146C21.7433 2.35961 21.7747 2.27507 21.8065 2.18932C21.9418 1.82527 22.0851 1.4394 22.2266 1.1437C22.3146 0.959897 22.4411 0.723874 22.6206 0.519906ZM12.5903 7.86864C12.4178 7.86395 12.2438 7.8616 12.0684 7.8616C8.36183 7.8616 5.30473 8.90761 3.17536 11.037C1.046 13.1663 0 16.2235 0 19.93C0 23.6366 1.046 26.6935 3.17536 28.8229C5.30473 30.9522 8.36183 31.9984 12.0684 31.9984C15.7749 31.9984 18.832 30.9522 20.9613 28.8229C23.0907 26.6935 24.1367 23.6366 24.1367 19.93C24.1367 19.7551 24.1344 19.5817 24.1298 19.4097C23.9954 19.4221 23.8569 19.4286 23.7143 19.4286C21.3103 19.4286 20.0937 17.5894 19.6494 16.6612C19.4444 16.2327 19.2394 15.6786 19.107 15.3209C19.0597 15.1929 19.0168 15.0529 18.9726 14.9087C18.8219 14.4163 18.6562 13.8752 18.2475 13.5998C18.1882 13.5599 18.1008 13.5081 17.9754 13.4455C17.7125 13.3144 17.3765 13.1814 16.9155 13.0161L16.7531 12.959C16.3893 12.8321 15.821 12.6337 15.295 12.3746C14.2731 11.8712 12.5714 10.6039 12.5714 8.28571C12.5714 8.14272 12.5779 8.0037 12.5903 7.86864ZM7.78553 15.3125C8.57451 15.3125 9.2141 15.9521 9.2141 16.7411V17.9177C9.2141 18.7067 8.57451 19.3462 7.78553 19.3462C6.99657 19.3462 6.35696 18.7067 6.35696 17.9177V16.7411C6.35696 15.9521 6.99657 15.3125 7.78553 15.3125ZM16.3511 15.3125C17.1401 15.3125 17.7797 15.9521 17.7797 16.7411V17.9177C17.7797 18.7067 17.1401 19.3462 16.3511 19.3462C15.5621 19.3462 14.9225 18.7067 14.9225 17.9177V16.7411C14.9225 15.9521 15.5621 15.3125 16.3511 15.3125ZM8.14665 21.8441C7.86082 21.1087 7.03298 20.7443 6.29758 21.0301C5.56219 21.3159 5.19776 22.1437 5.48359 22.8791C5.98423 24.1673 6.83643 25.2005 8.00679 25.896C9.16142 26.5826 10.5471 26.8951 12.0684 26.8951C13.5897 26.8951 14.9754 26.5826 16.1301 25.896C17.3004 25.2005 18.1526 24.1673 18.6533 22.8791C18.9391 22.1437 18.5747 21.3159 17.8393 21.0301C17.1039 20.7443 16.276 21.1087 15.9902 21.8441C15.7093 22.5668 15.2656 23.0862 14.67 23.4402C14.0587 23.8037 13.2085 24.0379 12.0684 24.0379C10.9283 24.0379 10.0781 23.8037 9.46681 23.4402C8.87127 23.0862 8.42754 22.5668 8.14665 21.8441Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "3,200+ integrations",
    description:
      "It connects to 3,200+ business tools out of the box — Stripe, HubSpot, Google Ads, Meta Ads, PostHog, Linear, Notion, GitHub, Google Calendar, and more — and uses them the way a human analyst, ops manager, or junior engineer would.",
    icon: (
      <svg
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        overflow="visible"
        viewBox="0 0 32 31.9999"
        fill="none"
        aria-hidden
        className="size-8 object-contain"
      >
        <path
          opacity="0.5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.0736 0.502103L26.2857 3.29006C23.0398 1.19785 18.5937 1.87635 16.1615 5.10139L15.407 6.10192C14.7427 6.98281 14.8288 8.21849 15.609 8.99865L23.0005 16.39C23.7801 17.1697 25.0146 17.2563 25.8955 16.5932L26.8933 15.8421C30.1223 13.4112 30.8032 8.96224 28.7099 5.71449L31.4981 2.92647C32.1673 2.257 32.1673 1.17157 31.4981 0.502103C30.8286 -0.167368 29.7431 -0.167368 29.0736 0.502103ZM13.7473 13.5289C14.4168 14.1984 14.4168 15.2838 13.7473 15.9533L11.3223 18.3782L13.6248 20.6807L16.0495 18.256C16.719 17.5865 17.8044 17.5865 18.4739 18.256C19.1433 18.9255 19.1433 20.0109 18.4739 20.6804L16.0492 23.1051L16.1677 23.2235C16.9473 24.0032 17.0339 25.2379 16.3708 26.1189L15.6197 27.1166C13.1891 30.3451 8.74066 31.0263 5.49301 28.9337L2.9259 31.4983C2.2561 32.1675 1.17068 32.1671 0.501527 31.4971C-0.167626 30.8274 -0.167109 29.7419 0.502679 29.0729L3.06825 26.5097C0.975353 23.2638 1.65368 18.8171 4.87902 16.3847L5.87954 15.6302C6.76043 14.9659 7.99611 15.052 8.77627 15.8322L8.89797 15.9539L11.3229 13.5289C11.9924 12.8594 13.0778 12.8594 13.7473 13.5289Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "Real output",
    description:
      "Not by summarizing docs or generating text, but by logging into your tools, pulling live data, running analysis, and delivering actual output: PDFs, spreadsheets, presentations, deployed web apps, code commits, structured reports.",
    icon: (
      <svg
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        overflow="visible"
        viewBox="0 0 32.0015 32.0012"
        fill="none"
        aria-hidden
        className="size-8 object-contain"
      >
        <path
          opacity="0.5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.9299 2.0717C30.3754 1.01925 30.3749 1.01905 30.3745 1.01883L30.3731 1.01834L30.3704 1.01713L30.3624 1.01386L30.3384 1.00399C30.3187 0.995986 30.2917 0.985179 30.2579 0.971947C30.1898 0.945488 30.0938 0.909289 29.9722 0.866359C29.729 0.780562 29.382 0.667486 28.9507 0.551477C28.0904 0.32011 26.8803 0.0734114 25.4787 0.0135654C22.6726 -0.10625 19.0318 0.525874 15.962 3.59095C14.5158 4.98901 13.063 7.15691 11.6418 9.50139C10.887 10.7465 10.0874 12.1352 9.2888 13.5221C8.6104 14.7004 7.93276 15.8773 7.28387 16.9639C6.96361 17.5002 7.13328 18.1943 7.66483 18.5224L7.72275 18.5581C10.0672 20.0052 12.0384 21.9835 13.477 24.3333C13.8043 24.8679 14.5012 25.0391 15.039 24.7168C16.2058 24.0178 17.4117 23.3234 18.6158 22.6301L18.8026 22.5225C20.0649 21.7955 21.323 21.0694 22.5086 20.3513C24.8499 18.9331 27.0124 17.486 28.4106 16.0396C31.4758 12.9698 32.1078 9.32903 31.988 6.52283C31.9281 5.12117 31.6815 3.91127 31.4502 3.0509C31.334 2.6195 31.2209 2.27258 31.1352 2.02937C31.0922 1.90768 31.0561 1.81167 31.0296 1.74374C31.0163 1.70977 31.0056 1.68279 30.9976 1.6631L30.9878 1.63907L30.9843 1.63122L30.9832 1.62835L30.9827 1.62718C30.9825 1.62667 30.9823 1.62619 29.9299 2.0717ZM29.9299 2.0717L30.3754 1.01925C30.6488 1.13502 30.8666 1.3527 30.9823 1.62619L29.9299 2.0717ZM17.2477 31.1909L15.2894 27.6489C15.7082 27.5591 16.1196 27.4002 16.5073 27.168C17.6494 26.4837 18.8337 25.8016 20.0418 25.1058L20.2285 24.9984C21.4875 24.2734 22.7723 23.5321 23.9889 22.7951C24.3667 22.5662 24.7475 22.3323 25.1276 22.0935C24.8678 25.7248 22.9679 29.4549 18.7783 31.6501C18.228 31.9383 17.5483 31.7344 17.2477 31.1909ZM4.83084 15.4991C4.5995 15.8865 4.44119 16.2974 4.352 16.7158L0.81957 14.7627C0.276702 14.4625 0.0723871 13.7841 0.359207 13.2341C2.54736 9.03787 6.27479 7.13584 9.90519 6.87445C9.66466 7.25687 9.42901 7.64009 9.19852 8.02032C8.42697 9.29303 7.61415 10.7048 6.82243 12.0798L6.81278 12.0965C6.13189 13.2791 5.46592 14.4356 4.83084 15.4991ZM5.80832 21.0898C6.48174 21.0779 7.15065 21.2018 7.77516 21.454C8.39966 21.7063 8.96695 22.0817 9.4432 22.558C9.91945 23.0343 10.2949 23.6016 10.5471 24.2261C10.7994 24.8505 10.9232 25.5193 10.9114 26.1929C10.8995 26.8663 10.7521 27.5303 10.478 28.1456C10.2051 28.7579 9.81234 29.3093 9.32281 29.7671C8.79397 30.2738 7.9667 30.6713 7.18286 30.9829C6.3515 31.3131 5.39632 31.6112 4.48864 31.8635C1.80263 32.6103 -0.609127 30.1986 0.137605 27.5125C0.389948 26.6048 0.687986 25.6496 1.01831 24.8183C1.32976 24.0345 1.72728 23.2073 2.23398 22.6784C2.69187 22.1888 3.24325 21.796 3.85559 21.5232C4.47079 21.2491 5.13493 21.1017 5.80832 21.0898ZM21.5299 8.45134C20.972 9.00923 20.972 9.91376 21.5299 10.4717C22.0878 11.0295 22.9923 11.0295 23.5503 10.4717L24.4086 9.61337C24.9663 9.05547 24.9663 8.15097 24.4086 7.59307C23.8506 7.03518 22.9462 7.03518 22.3882 7.59307L21.5299 8.45134Z"
          fill="white"
        />
      </svg>
    ),
  },
];

function SectionWhatViktorIs() {
  return (
    <section id="what-viktor-is" className="py-10 sm:py-12 bg-primitive-main-beige">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="bg-hero dark mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.5rem]">
            <div className="flex flex-col gap-10">
              <div className="px-6 sm:px-10 lg:px-16 pt-10 sm:pt-12 lg:pt-16">
                <h2 className="font-heading h3 text-center text-white sm:h2">What Viktor is</h2>
              </div>

              <IntegrationsLogoLoop
                variant="product"
                className="product-what-viktor-is-animation"
              />

              <div className="grid gap-8 px-6 sm:px-10 lg:px-16 pb-10 sm:pb-12 lg:pb-16 md:grid-cols-3 md:gap-6 lg:gap-8">
                {whatViktorIsFeatures.map((feature) => (
                  <article key={feature.title} className="flex flex-col gap-4">
                    {feature.icon}
                    <div className="flex flex-col gap-3">
                      <h3 className="font-heading text-xl leading-snug font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="body-small font-medium text-white">{feature.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 3: WHAT VIKTOR CAN DO (cards grid) ---------------- */
const capabilityCardShadow =
  "inset 2.702px 2.702px 1.351px -2.702px rgb(255, 255, 255), inset -2.702px -2.702px 1.351px -2.702px rgb(255, 255, 255), inset 0 0 8.106px rgba(255, 255, 255, 0.5), inset 0 0 43.232px rgb(242, 242, 242)";

const capabilityCards: { icon: ReactNode; tag: string; title: string; desc: string }[] = [
  {
    icon: <ProductDataIcon />,
    tag: "Data",
    title: "OAuth, not passwords.",
    desc: "Pulls data from Stripe, PostHog, Google Ads, HubSpot — cross-references it and produces polished reports with charts and actionable insights. Board-ready PDFs, Excel files, or quick summaries in chat.",
  },
  {
    icon: <ProductAutomateIcon />,
    tag: "Automation",
    title: "Proactive automation",
    desc: "Its heartbeat system observes how your team works — then suggests automations tailored to your company. Morning revenue briefings, weekly ad audits, anomaly alerts. Approve once, runs on autopilot.",
  },
  {
    icon: <ProductScheduleIcon />,
    tag: "Scheduling",
    title: "Scheduled tasks",
    desc: "Recurring workflows that execute automatically: daily standups with real data, weekly competitive scans, monthly performance reviews. Viktor manages the schedule, execution, and delivery.",
  },
  {
    icon: <ProductResearchIcon />,
    tag: "Research",
    title: "Research & intelligence",
    desc: "Searches the web, browses real websites, reads documents, and cross-references multiple sources. Competitive analysis, market intelligence, lead research — deep work, not surface-level summaries.",
  },
  {
    icon: <ProductAppsIcon />,
    tag: "Apps",
    title: "App building",
    desc: "Describe what you need and Viktor builds it: live dashboards, internal tools, calculators — real web apps with databases, auth, and hosting. Deployed via a link. No design team needed.",
  },
  {
    icon: <ProductEngineeringIcon />,
    tag: "Engineering",
    title: "Code & engineering",
    desc: "Reads your codebase, creates branches, writes code, opens pull requests, and runs tests. It understands repository context before making changes. Real engineering contributions.",
  },
  {
    icon: <ProductBrowserIcon />,
    tag: "Browser",
    title: "Browser automation",
    desc: "Operates a real browser — filling forms, navigating complex workflows, scraping data, capturing screenshots. Anything you'd do manually in a browser, Viktor can do programmatically.",
  },
];

function CapabilityCard({ children }: { children: React.ReactNode }) {
  return (
    <article className="relative overflow-hidden rounded-section p-8 lg:w-[25.8125rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]">
        <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity" />
        <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: capabilityCardShadow }}
      />
      <div className="relative z-10">{children}</div>
    </article>
  );
}

function SectionWhatCanDo() {
  return (
    <section id="what-viktor-can-do" className="bg-primitive-main-beige py-10 sm:py-12">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:gap-14">
          <h2 className="font-heading h3 text-center sm:h2">What Viktor can do</h2>

          <div className="relative">
            <div
              className="product-capabilities-fade-left pointer-events-none absolute top-0 bottom-0 left-0 z-10 hidden w-20 lg:block"
              aria-hidden
            />
            <div className="flex flex-wrap justify-center gap-5">
              {capabilityCards.map((c) => (
                <CapabilityCard key={c.title}>
                  <div className="flex flex-col gap-8">
                    <div className="flex items-start justify-between gap-3">
                      {c.icon}
                      <span className="inline-flex font-medium h-8 shrink-0 items-center justify-center rounded-full bg-[#5c28d7]/16 px-5 body-small text-accent-1">
                        {c.tag}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="body-medium text-primary font-medium">{c.title}</h3>
                      <p className="body-small text-secondary font-medium">{c.desc}</p>
                    </div>
                  </div>
                </CapabilityCard>
              ))}
            </div>
            <div
              className="product-capabilities-fade-right pointer-events-none absolute top-0 right-0 bottom-0 z-10 hidden w-20 lg:block"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 4: BUILT FOR TEAMS ---------------- */
function SectionBuiltForTeams() {
  return (
    <section id="built-for-teams" className="bg-primitive-main-beige py-10 sm:py-12">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="dark mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 overflow-hidden rounded-section p-8 bg-hero sm:p-12 lg:grid-cols-[minmax(0,29.625rem)_minmax(0,45.375rem)] lg:items-center lg:justify-between lg:gap-16 lg:p-20 xl:gap-20">
            <div className="dark flex w-full min-w-0 flex-col gap-6">
              <p className="body-small pb-0 font-medium text-white opacity-70">
                One AI employee. Every department. No silos.
              </p>
              <h2 className="font-heading text-white h2">Built for teams</h2>
              <div className="body-main flex flex-col gap-4 font-medium text-white">
                <p>
                  Most AI tools are built for one person at a time. One conversation, one context, one
                  user.
                </p>
                <p>
                  Viktor is built for organizations. It understands that your marketing team needs campaign
                  metrics, your finance lead needs revenue data, and your support team needs ticket
                  analysis — all at the same time.
                </p>
                <p>
                  Everyone on your team can use it — in Slack or in Microsoft Teams (soon). No technical
                  expertise required.
                </p>
              </div>
            </div>
            <div className="flex min-w-0 items-center justify-center lg:justify-end">
              <img
                src={builtForTeamsImg}
                alt="Teams across marketing, engineering, sales, and support using Viktor"
                loading="lazy"
                decoding="async"
                width={1368}
                height={1480}
                className="h-auto w-full max-w-[45.375rem] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 5: HOW DIFFERENT ---------------- */
const diffCards: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <ProductManagedIcon />,
    title: "Managed, not self-hosted",
    desc: "Viktor is a fully hosted service. There's nothing to install on your machine, no infrastructure to maintain, no updates to manage. Compare this to open-source alternatives like OpenClaw, which require a developer to set up, configure, host, and keep running. Viktor works out of the box — for your entire team, not just the person who set it up.",
  },
  {
    icon: <ProductSecureIcon />,
    title: "Secure by design",
    desc: "Viktor stores all credentials in the cloud with enterprise-grade encryption. Your API keys, passwords, and sensitive data never touch a local machine. Self-hosted tools like OpenClaw store credentials directly on your computer — meaning a single prompt injection attack could compromise every password and API key in one breach.",
  },
  {
    icon: <ProductTeamFirstIcon />,
    title: "Team-first, not personal-first",
    desc: "OpenClaw is a personal productivity tool — it excels at managing one person's calendar, email, and tasks. Viktor is purpose-built for teams. It navigates complex multi-channel workspaces, maintains context across different team members' conversations, and creates automations that benefit the entire company.",
  },
  {
    icon: <ProductWorksEverywhereIcon />,
    title: "Works everywhere your team works",
    desc: "Viktor is available in Slack and Microsoft Teams (soon). Not everyone can install a Slack bot. Not everyone uses Teams. Viktor ensures nobody on your team is locked out — regardless of their platform or admin permissions.",
  },
  {
    icon: <ProductNoSetupIcon />,
    title: "No setup required",
    desc: "OpenClaw requires a developer to install, configure, and maintain. Viktor requires a Slack install, a Teams install, or a browser login. Anyone on your team — marketing, sales, support, leadership — can start using it in minutes with zero technical background.",
  },
  {
    icon: <ProductIntegrationsIcon />,
    title: "3,000+ native integrations, zero configuration",
    desc: "Every integration is pre-built, secured with OAuth, and connects in one click. No API keys to paste, no webhooks to wire up, no YAML to edit. Need a tool that isn't in the catalog? Viktor can build custom integrations on the fly.",
  },
];

function SectionHowDifferent() {
  return (
    <section id="how-different" className=" py-10 sm:py-12">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:gap-14">
          <h2 className="font-heading h3 text-center sm:h2">How Viktor is different</h2>

          <div className="flex flex-wrap justify-center gap-5">
            {diffCards.map((c) => (
              <CapabilityCard key={c.title}>
                <div className="flex flex-col gap-8">
                  <div>{c.icon}</div>
                  <div className="flex flex-col gap-3">
                    <h3 className="body-medium text-primary font-medium">{c.title}</h3>
                    <p className="body-small text-secondary font-medium">{c.desc}</p>
                  </div>
                </div>
              </CapabilityCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 6: SECURITY ---------------- */
function SecurityKeyholeGraphic() {
  return (
    <svg
      width="499"
      height="386"
      viewBox="0 0 499 386"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-auto w-[min(32.3125rem,92vw)] max-w-none -translate-x-1/2 select-none"
    >
      <defs>
        <radialGradient
          id="product-security-keyhole-radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(249.268 249.267) rotate(90) scale(249.267 463.944)"
        >
          <stop stopColor="white" stopOpacity="0.2" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <linearGradient
          id="product-security-keyhole-linear"
          x1="0"
          y1="0"
          x2="498.535"
          y2="498.536"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.248762" stopColor="white" stopOpacity="0" />
          <stop offset="0.749473" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <filter
          id="product-security-keyhole-bezel-blur"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
        <clipPath id="product-security-keyhole-clip">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M82.0542 5.70306C85.5376 2.06036 90.3587 0 95.3987 0H403.138C408.179 0 412.998 2.06036 416.48 5.70306C426.566 16.2491 447.386 38.0361 465.474 75.8668C483.546 113.663 498.536 166.682 498.536 239.708C498.536 326.965 457.069 387 406.115 427.186C355.732 466.917 295.804 487.597 256.259 497.934C253.197 498.735 249.981 498.735 246.918 497.934C207.46 487.62 146.426 466.973 94.9127 427.319C42.849 387.237 0 327.191 0 239.708C0 166.682 14.9891 113.663 33.061 75.8668C51.149 38.0361 71.9693 16.2491 82.0542 5.70306ZM317.369 203.105C317.369 238.265 301.41 261.013 272.355 268.487V332.355C272.355 345.102 262.022 355.435 249.275 355.435C236.528 355.435 226.194 345.102 226.194 332.355V268.482C197.151 261.003 181.199 238.258 181.199 203.105C181.199 159.531 205.709 135.02 249.284 135.02C292.858 135.02 317.369 159.531 317.369 203.105Z"
          />
        </clipPath>
      </defs>
      <g opacity="0.3">
        <g clipPath="url(#product-security-keyhole-clip)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M82.0542 5.70306C85.5376 2.06036 90.3587 0 95.3987 0H403.138C408.179 0 412.998 2.06036 416.48 5.70306C426.566 16.2491 447.386 38.0361 465.474 75.8668C483.546 113.663 498.536 166.682 498.536 239.708C498.536 326.965 457.069 387 406.115 427.186C355.732 466.917 295.804 487.597 256.259 497.934C253.197 498.735 249.981 498.735 246.918 497.934C207.46 487.62 146.426 466.973 94.9127 427.319C42.849 387.237 0 327.191 0 239.708C0 166.682 14.9891 113.663 33.061 75.8668C51.149 38.0361 71.9693 16.2491 82.0542 5.70306ZM317.369 203.105C317.369 238.265 301.41 261.013 272.355 268.487V332.355C272.355 345.102 262.022 355.435 249.275 355.435C236.528 355.435 226.194 345.102 226.194 332.355V268.482C197.151 261.003 181.199 238.258 181.199 203.105C181.199 159.531 205.709 135.02 249.284 135.02C292.858 135.02 317.369 159.531 317.369 203.105Z"
            fill="none"
            stroke="white"
            strokeWidth="8"
            strokeOpacity="0.45"
            filter="url(#product-security-keyhole-bezel-blur)"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M82.0542 5.70306C85.5376 2.06036 90.3587 0 95.3987 0H403.138C408.179 0 412.998 2.06036 416.48 5.70306C426.566 16.2491 447.386 38.0361 465.474 75.8668C483.546 113.663 498.536 166.682 498.536 239.708C498.536 326.965 457.069 387 406.115 427.186C355.732 466.917 295.804 487.597 256.259 497.934C253.197 498.735 249.981 498.735 246.918 497.934C207.46 487.62 146.426 466.973 94.9127 427.319C42.849 387.237 0 327.191 0 239.708C0 166.682 14.9891 113.663 33.061 75.8668C51.149 38.0361 71.9693 16.2491 82.0542 5.70306ZM317.369 203.105C317.369 238.265 301.41 261.013 272.355 268.487V332.355C272.355 345.102 262.022 355.435 249.275 355.435C236.528 355.435 226.194 345.102 226.194 332.355V268.482C197.151 261.003 181.199 238.258 181.199 203.105C181.199 159.531 205.709 135.02 249.284 135.02C292.858 135.02 317.369 159.531 317.369 203.105Z"
          fill="url(#product-security-keyhole-radial)"
          fillOpacity="0.2"
        />
        <path
          d="M95.3984 0.5H403.138C408.042 0.5 412.731 2.50479 416.119 6.04883C426.192 16.5816 446.969 38.323 465.022 76.082C483.062 113.808 498.036 166.753 498.036 239.708C498.036 326.78 456.665 386.681 405.805 426.793C355.5 466.463 295.649 487.121 256.133 497.45H256.132C253.339 498.181 250.415 498.226 247.605 497.587L247.045 497.45C207.613 487.143 146.654 466.517 95.2178 426.923C43.2459 386.911 0.500065 327 0.5 239.708C0.5 166.753 15.4734 113.808 33.5117 76.082C51.5656 38.3227 72.3439 16.5815 82.416 6.04883C85.8051 2.5049 90.4951 0.500064 95.3984 0.5ZM249.284 134.521C227.405 134.521 210.241 140.675 198.548 152.368C186.854 164.062 180.699 181.226 180.699 203.104C180.699 220.754 184.703 235.337 192.394 246.456C200.022 257.486 211.251 265.067 225.694 268.866V332.354C225.694 345.378 236.251 355.935 249.274 355.936C262.298 355.936 272.854 345.378 272.854 332.354V268.871C287.304 265.074 298.537 257.493 306.169 246.463C313.862 235.343 317.868 220.758 317.868 203.104C317.868 181.226 311.714 164.062 300.021 152.368C288.327 140.675 271.163 134.521 249.284 134.521Z"
          fill="none"
          stroke="url(#product-security-keyhole-linear)"
          strokeOpacity="0.6"
        />
      </g>
    </svg>
  );
}

function SectionSecurity() {
  return (
    <section id="security" className="bg-primitive-main-beige py-1 sm:py-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="dark relative flex w-full flex-col items-center justify-center overflow-hidden rounded-section px-6 py-12 text-center max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] sm:px-10 sm:py-16 lg:px-16 min-h-[29.5rem]"
            style={{ background: SECURITY_GRADIENT }}
          >
            <SecurityKeyholeGraphic />
            <div className="relative z-10 flex w-full flex-col items-center gap-16">
              <div className="flex w-full flex-col items-center gap-8">
                <div className="flex w-full flex-col items-center">
                  <div className="w-full pb-4">
                    <p className="body-small m-0 font-medium text-white">Security &amp; compliance</p>
                  </div>
                  <h2 className="font-heading max-w-[40.625rem] text-balance text-[2.5rem] leading-[1.1] font-bold tracking-[-0.06em] text-white max-sm:text-[2.1875rem] sm:text-[3rem]">
                    Built for businesses that
                    <br className="hidden sm:block" />
                    take security seriously.
                  </h2>
                </div>
                <p className="body-main max-w-[30rem] font-medium text-white/80">
                  All credentials encrypted at rest and in transit. No sensitive data stored on local machines — ever.
                  OAuth-based authentication for all integrations.
                </p>
              </div>
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {securityBadges.map((badge) => (
                  <li key={badge.label} className="flex items-center gap-3 text-left">
                    <img
                      alt={badge.alt}
                      loading="lazy"
                      width={40}
                      height={40}
                      decoding="async"
                      className="size-10 shrink-0 rounded object-contain"
                      src={badge.src}
                    />
                    <span className="body-small font-medium text-white">{badge.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 7: START FREE / ADVANCED CARDS ---------------- */
const startFeatures = [
  "All integrations",
  "Users and teams",
  "Approvals, customizable scopes",
  "Costs and PII reviews",
  "SOC 2 compliance",
];

<StartFreeSection />