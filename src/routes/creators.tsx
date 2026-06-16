import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import {
  ArrowUpRight,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Music2,
  Rocket,
  LineChart,
  Sun,
  Megaphone,
  MessageCircle,
  UserCircle2,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FAQSection, type FAQItem } from "@/components/site/FAQSection";
import { CoinIcon, CreditCardIcon, Soc2Icon } from "@/components/site/HeroBadges";
import gomerSlackAvatar from "@/assets/images/gomer-slack-avatar (1).svg";
import comparisonTabActiveBg from "@/assets/images/download (1).svg";

function ComparisonTabActiveBackground({ className }: { className?: string }) {
  return <img aria-hidden alt="" src={comparisonTabActiveBg} className={className} />;
}

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Become a Gomer Influencer — Earn for Posting Real Work"
        description="Gomer does the work. You take the screenshot. Post real product output, get paid up to $10,000 per post — or take 50% more in credits."
        ogTitle="Become a Gomer Influencer"
        ogDescription="Post real Gomer outputs and earn cash or credits. No follower minimum, no approvals."
        ogUrl="/creators"
        canonical="/creators"
      />
      <Hero />
      <Payouts />
      <HowItWorks />
      <CreditsOrCash />
      <PostIdeas />
      <PostAnatomy />
      <WhoFor />
      <Disclose />
      <Rules />
      <FAQSection faqs={creatorFaqs} className="px-4 sm:px-6 md:px-12 lg:px-20 py-14 sm:py-24" />
      <SubmitCTA />
      <Footer />
    </div>
  );
}

/* ----------------------- HERO ----------------------- */

function MoneyBagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <g fill="currentColor" opacity="0.5">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.7566 0C13.177 0 11.8421 0.446469 10.9027 1.3858C9.96342 2.32513 9.51696 3.66004 9.51696 5.23963C9.51696 6.81921 9.96342 8.15411 10.9027 9.09344C11.8421 10.0328 13.177 10.4792 14.7566 10.4792C16.3361 10.4792 17.671 10.0328 18.6104 9.09344C19.5497 8.15411 19.9961 6.81921 19.9961 5.23963C19.9961 3.66004 19.5497 2.32513 18.6104 1.3858C17.671 0.446469 16.3361 0 14.7566 0ZM14.7566 3.29224C15.3483 3.29224 15.828 3.77193 15.828 4.36367V6.11531C15.828 6.70704 15.3483 7.18674 14.7566 7.18674C14.1648 7.18674 13.6851 6.70704 13.6851 6.11531V4.36367C13.6851 3.77193 14.1648 3.29224 14.7566 3.29224ZM16.7301 13.5016L12.8798 14.4154L10.6063 14.9807C10.0451 15.1203 9.45994 15.1326 8.8934 15.017L4.96034 14.2143C4.54139 14.1288 4.27043 13.7206 4.3543 13.3013C4.43817 12.882 4.84529 12.6095 5.2649 12.6917L7.00649 13.033L7.06669 13.0437C7.98589 13.2065 8.86207 12.5904 9.01976 11.6703C9.168 10.8053 8.627 9.9716 7.77672 9.75459L4.48967 8.91563C3.75139 8.7272 2.98771 8.65806 2.22759 8.71083L0.664817 8.81931C0.290427 8.84531 0 9.1566 0 9.53189V17.031C0 17.3337 0.19066 17.6034 0.4759 17.7044L5.21304 19.3816C7.70173 20.2626 10.4271 20.2004 12.873 19.2066L17.9011 17.1637C18.8004 16.7983 19.2879 15.8213 19.0389 14.8831C18.7709 13.873 17.747 13.2603 16.7301 13.5016Z"
        />
      </g>
    </svg>
  );
}

const creatorHeroPoints = [
  { icon: <CoinIcon />, label: "Every qualifying post earns 10,000 Gomer credits" },
  { icon: <CreditCardIcon />, label: "Cash tiers unlock above each platform's threshold" },
  { icon: <MoneyBagIcon />, label: "No follower minimum" },
  { icon: <Soc2Icon />, label: "No approvals" },
] as const;

function Hero() {
  return (
    <section className="border-0 py-0! dark" id="hero">
      <div className="bg-integrations-hero-surface relative w-full overflow-hidden rounded-b-[24px] sm:rounded-b-[32px]">
        <div
          className="pointer-events-none absolute inset-0 rounded-b-[24px] bg-hero sm:rounded-b-[32px]"
          aria-hidden="true"
        />
        <Nav />
        <div className="hero-page-stack-pt relative z-10 mx-auto flex w-full max-w-[82rem] flex-col items-center mt-16 gap-12 px-5 pb-16 text-center sm:px-10 sm:pb-20 md:px-14 lg:gap-16 lg:px-20 lg:pb-24">
          <div className="flex max-w-[82rem] flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <a
                href="#creator-questions"
                className="group inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 transition-colors hover:border-white/40 hover:bg-white/15"
              >
                <span className="body-small font-semibold text-accent-2">Early access</span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-white/30 sm:block" />
                <span className="body-small font-medium text-white/80">
                  Available in select regions. Check the FAQ
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block transition-transform group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </span>
              </a>
              <p className="body-small font-medium text-white">Hundreds of creators already paid out</p>
            </div>

            <h1 className="font-heading text-5xl leading-[1.1] font-bold tracking-[-2.4px] text-balance text-white sm:text-6xl sm:tracking-[-3.6px] lg:text-7xl xl:text-[80px] xl:tracking-[-4.8px]">
              Gomer does the work.{" "}
              <span className="text-accent-2">You take the screenshot.</span>
            </h1>

            <div className="flex w-full max-w-[34.1875rem] flex-col items-center gap-8">
              <p className="max-w-[34.1875rem] body-main font-medium text-white sm:text-lg sm:leading-[1.4]">
                The report&apos;s built. The analysis ran. The automation shipped. Screenshot it,
                post it on LinkedIn, X, Instagram, YouTube, or TikTok, and earn up to{" "}
                <span className="text-accent-2">$10,000</span>. Choose credits for{" "}
                <span className="text-accent-2">50% more</span>.
              </p>

              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:justify-center">
                <a
                  href="#submit"
                  className="inline-flex h-14 min-h-14 w-full items-center justify-center rounded-full border border-white bg-white px-10 text-base font-medium tracking-[-0.01em] text-primitive-main-dark transition hover:opacity-90 sm:w-auto"
                >
                  Start Earning
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex h-14 min-h-14 w-full items-center justify-center rounded-full border border-white/20 px-10 text-base font-medium tracking-[-0.01em] text-white transition hover:bg-white/10 sm:w-auto"
                >
                  See How It Works
                </a>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
            <div className="flex w-full items-center justify-center gap-10 sm:gap-8">
              {creatorHeroPoints.slice(0, 2).map((point) => (
                <div key={point.label} className="flex shrink-0 items-center gap-4">
                  <span className="inline-flex shrink-0 text-white">{point.icon}</span>
                  <p className="text-sm font-medium leading-[1.4] text-white">{point.label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-8 sm:gap-8">
              {creatorHeroPoints.slice(2).map((point) => (
                <div key={point.label} className="flex shrink-0 items-center gap-4">
                  <span className="inline-flex shrink-0 text-white">{point.icon}</span>
                  <p className="whitespace-nowrap text-sm font-medium leading-[1.4] text-white">
                    {point.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- PAYOUTS ----------------------- */

const PAYOUT_TAB_SHADOW =
  "inset 2.7px 2.7px 1.35px -2.7px white, inset -2.7px -2.7px 1.35px -2.7px white, inset 0 0 8px rgb(255 255 255 / 50%), inset 0 0 43px #f2f2f2";

const payoutTiers = [
  { credits: "120,000 credits", worth: "$300", cash: "$200" },
  { credits: "360,000 credits", worth: "$900", cash: "$600" },
  { credits: "900,000 credits", worth: "$2,250", cash: "$1,500" },
  { credits: "3,000,000 credits", worth: "$7,500", cash: "$5,000" },
  { credits: "6,000,000 credits", worth: "$15,000", cash: "$10,000" },
] as const;

const payoutPlatforms = [
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    metricLabel: "Impressions",
    ranges: ["1,000 - 4,999", "5,000 - 14,999", "15,000 - 29,999", "30,000 - 99,999", "100,000+"],
    example:
      "Your post hits 7,914 impressions. You earn $900 in credits or $600 paid out via Dub.",
  },
  {
    id: "x",
    label: "Twitter / X",
    icon: Twitter,
    metricLabel: "Views",
    ranges: ["3,000 - 14,999", "15,000 - 29,999", "30,000 - 69,999", "70,000 - 299,999", "300,000+"],
    example:
      "Your post hits 18,000 views. You earn $900 in credits or $600 paid out via Dub.",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    metricLabel: "Views",
    ranges: ["3,000 - 14,999", "15,000 - 29,999", "30,000 - 199,999", "200,000 - 999,999", "1,000,000+"],
    example:
      "Your post hits 22,000 views. You earn $900 in credits or $600 paid out via Dub.",
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: Youtube,
    metricLabel: "Views",
    ranges: ["2,000 - 9,999", "10,000 - 29,999", "30,000 - 79,999", "80,000 - 299,999", "300,000+"],
    example:
      "Your post hits 15,000 views. You earn $900 in credits or $600 paid out via Dub.",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: Music2,
    metricLabel: "Views",
    ranges: ["3,000 - 9,999", "10,000 - 29,999", "30,000 - 69,999", "70,000 - 299,999", "300,000+"],
    example:
      "Your post hits 22,000 views. You earn $900 in credits or $600 paid out via Dub.",
  },
] as const;

function ImpressionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-primitive-main-grey opacity-45"
    >
      <path
        fill="currentColor"
        d="M7 1.875c1.83561 0 3.4533.99263 4.5869 2.06641.5714.54131 1.0374 1.11941 1.3643 1.63769.1633.25909.2961.51041.3896.74024.0899.22079.1592.45864.1592.68066s-.0693.45987-.1592.68066c-.0935.22983-.2263.48115-.3896.74024-.3269.51828-.7929 1.09638-1.3643 1.6377C10.4533 11.1324 8.83561 12.125 7 12.125s-3.45326-.9926-4.58691-2.0664c-.57143-.54132-1.03743-1.11942-1.36426-1.6377-.163368-.25909-.2961-.51041-.38965-.74024C.569307 7.45987.5 7.22202.5 7s.069307-.45987.15918-.68066c.09355-.22983.226282-.48115.38965-.74024.32683-.51828.79283-1.09638 1.36426-1.63769C3.54674 2.86763 5.16439 1.875 7 1.875Zm0 3.0293c-.63659.00008-1.16873.18044-1.54199.55371-.3731.37325-.55363.90554-.55371 1.54199.00009.63657.18045 1.16971.55371 1.54297.37325.37307.90556.55362 1.54199.55371.63665 0 1.16963-.18052 1.54297-.55371.37326-.37326.55362-.9064.55371-1.54297-.00009-.63643-.18064-1.16874-.55371-1.54199C8.16962 5.08465 7.63679 4.9043 7 4.9043Z"
      />
    </svg>
  );
}

function PayoutRowCard({
  range,
  credits,
  worth,
  cash,
}: {
  range: string;
  credits: string;
  worth: string;
  cash: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div
        aria-hidden="true"
        className="bg-conic-gradient-bg pointer-events-none absolute inset-0 z-0"
        style={{ borderRadius: "inherit" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[20px] z-0"
        style={{ borderRadius: "inherit", background: "#fff", filter: "blur(20px)" }}
      />
      <div className="relative z-[1] h-full w-full rounded-[inherit]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
            padding: "1px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
          style={{ filter: "blur(5px)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
              mask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
              padding: "4px",
            }}
          />
        </div>
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-2 md:items-center md:gap-5">
            <p className="font-heading h5 min-w-0 text-primary">{range}</p>
            <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="body-medium font-medium text-primary">{credits}</p>
              <div className="flex flex-col items-start sm:items-end">
                <p className="body-small font-medium text-accent-1">worth {worth}</p>
                <p className="body-small font-medium text-secondary">or {cash} in cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Payouts() {
  const [active, setActive] = useState(0);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef(new Map<number, HTMLButtonElement>());

  const activePlatform = payoutPlatforms[active];
  const rows = payoutTiers.map((tier, index) => ({
    ...tier,
    range: activePlatform.ranges[index],
  }));

  useLayoutEffect(() => {
    const button = mobileTabRefs.current.get(active);
    const container = mobileTabsRef.current;
    if (!button || !container) return;

    const buttonLeft = button.offsetLeft;
    const buttonWidth = button.offsetWidth;
    const containerWidth = container.clientWidth;
    const scrollTarget = buttonLeft - containerWidth / 2 + buttonWidth / 2;
    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, [active]);

  return (
    <section id="payouts" className="scroll-mt-24 py-12 sm:py-[5rem] md:scroll-mt-28">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-16">
          <h2 className="mx-auto max-w-3xl text-center font-heading h3 text-balance text-primary">
            See how much you can earn
          </h2>

          <div className="mx-auto flex w-full max-w-[52.875rem] flex-col gap-4">
            <div className="flex w-full flex-col gap-10">
              {/* Mobile platform tabs */}
              <div className="relative overflow-hidden py-1 md:hidden">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primitive-main-beige) 0%, transparent 100%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10"
                  style={{
                    background:
                      "linear-gradient(270deg, var(--primitive-main-beige) 0%, transparent 100%)",
                  }}
                />
                <div
                  ref={mobileTabsRef}
                  className="flex w-full gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Creator platforms"
                >
                  {payoutPlatforms.map((platform, index) => {
                    const isActive = active === index;
                    const panelId = `${platform.id}-creators-payouts-platforms-panel`;
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        ref={(node) => {
                          if (node) mobileTabRefs.current.set(index, node);
                          else mobileTabRefs.current.delete(index);
                        }}
                        aria-pressed={isActive}
                        aria-controls={panelId}
                        onClick={() => setActive(index)}
                        className={[
                          "relative flex h-12 shrink-0 items-center justify-center gap-4 rounded-full px-[18px] body-main transition-[background,border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                          isActive ? "text-white" : "bg-secondary text-primary",
                        ].join(" ")}
                      >
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                          >
                            <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                          </span>
                        )}
                        <platform.icon
                          className={`relative z-10 size-5 shrink-0 transition-[color,opacity] duration-300 ${
                            isActive ? "text-white opacity-100" : "text-primitive-main-grey opacity-45"
                          }`}
                        />
                        <span className="sr-only">{platform.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop platform tabs */}
              <div className="-m-3 hidden overflow-x-auto p-3 md:block">
                <div
                  role="tablist"
                  aria-label="Creator platforms"
                  className="relative isolate mx-auto grid w-full grid-cols-5 overflow-visible rounded-full bg-white p-1"
                  style={{ boxShadow: PAYOUT_TAB_SHADOW }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1 bottom-1 left-1 z-0 overflow-hidden rounded-full transition-transform duration-500 ease-out"
                    style={{
                      width: "calc(20% - 0.1rem)",
                      transform: `translateX(${active * 100}%)`,
                    }}
                  >
                    <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                  </span>
                  {payoutPlatforms.map((platform, index) => {
                    const isActive = active === index;
                    const panelId = `${platform.id}-creators-payouts-platforms-panel`;
                    const tabId = `${platform.id}-creators-payouts-platforms-tab`;
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        role="tab"
                        id={tabId}
                        aria-selected={isActive}
                        aria-controls={panelId}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActive(index)}
                        className={[
                          "cursor-pointer relative z-10 flex h-12 items-center justify-center gap-4 rounded-full px-5 body-main transition-[border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                          isActive ? "text-white" : "text-primary",
                        ].join(" ")}
                      >
                        <platform.icon
                          className={`size-5 shrink-0 opacity-50 transition-[color,opacity] duration-300 ${
                            isActive ? "text-white" : "text-primitive-main-grey"
                          }`}
                        />
                        <span className="sr-only">{platform.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              id={`${activePlatform.id}-creators-payouts-platforms-panel`}
              role="tabpanel"
              aria-labelledby={`${activePlatform.id}-creators-payouts-platforms-tab`}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-3 px-4 pt-8 pb-0 md:grid-cols-2 md:gap-5 md:px-8">
                <div className="flex min-w-0 items-center gap-2">
                  <ImpressionsIcon />
                  <p className="body-small text-secondary">{activePlatform.metricLabel}</p>
                </div>
                <div className="flex min-w-0 text-secondary items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="inline-flex shrink-0 [&_svg]:size-4">
                      <CoinIcon />
                    </span>
                    <p className="body-small text-secondary">Payout</p>
                  </div>
                  <span className="inline-flex h-7 shrink-0 items-center justify-center rounded-full border border-transparent bg-accent-1 px-4 text-xs text-white">
                    50% more with credits
                  </span>
                </div>
              </div>

              <div key={activePlatform.id} className="flex flex-col gap-2">
                {rows.map((row, index) => (
                  <div
                    key={row.range}
                    className="animate-payout-card-in motion-reduce:animate-none"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <PayoutRowCard
                      range={row.range}
                      credits={row.credits}
                      worth={row.worth}
                      cash={row.cash}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 px-4 pt-0 md:px-8">
                <p className="body-small text-accent-1 font-medium">Example</p>
                <p className="body-main font-medium text-secondary">{activePlatform.example}</p>
                <p className="body-main font-medium text-primary">
                  Same post. 50% more value with credits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- HOW IT WORKS ----------------------- */

const HOW_IT_WORKS_CARD_SHADOW =
  "inset 2.702px 2.702px 1.351px -2.702px rgb(255, 255, 255), inset -2.702px -2.702px 1.351px -2.702px rgb(255, 255, 255), inset 0 0 8.106px rgba(255, 255, 255, 0.5), inset 0 0 43.232px rgb(242, 242, 242)";

const platformPostLabels: Record<(typeof payoutPlatforms)[number]["id"], string> = {
  linkedin: "LinkedIn",
  x: "X",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

function CreatorsHowIcon({
  gradientId,
  gradientTransform,
  viewBox,
  pathD,
}: {
  gradientId: string;
  gradientTransform: string;
  viewBox: string;
  pathD: string;
}) {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      overflow="visible"
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      className="size-8 shrink-0 object-contain"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={pathD} fill={`url(#${gradientId})`} />
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform={gradientTransform}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const howItWorksStepIcons = [
  {
    gradientId: "creators-how-capture",
    viewBox: "0 0 30.8572 30.8575",
    gradientTransform: "matrix(2.81251 32.2003 -43.3017 11.9536 16.0634 -1.34287)",
    pathD:
      "M21.9709 0.00786451C21.0284 -0.0820349 20.1915 0.609131 20.1016 1.55163C20.0117 2.49413 20.7029 3.33104 21.6454 3.42094C22.6809 3.5197 23.7042 3.63333 24.7111 3.75493C25.9714 3.9072 26.968 4.90667 27.1179 6.17369C27.2327 7.14327 27.341 8.12971 27.4363 9.12798C27.5262 10.0705 28.363 10.7617 29.3056 10.6718C30.248 10.582 30.9392 9.7451 30.8494 8.80258C30.7511 7.77232 30.6398 6.75922 30.5227 5.77077C30.1877 2.9387 27.9595 0.693876 25.1223 0.351108C24.0935 0.226843 23.0409 0.109917 21.9709 0.00786451ZM10.7557 1.55163C10.8456 2.49413 10.1544 3.33104 9.21189 3.42094C8.17643 3.5197 7.15296 3.63333 6.14626 3.75493C4.88576 3.9072 3.88919 4.90667 3.73925 6.17369C3.6245 7.14327 3.51612 8.12971 3.42096 9.12798C3.33111 10.0705 2.49422 10.7617 1.55171 10.6718C0.609212 10.582 -0.0819972 9.7451 0.00785649 8.80258C0.106076 7.77232 0.217461 6.75922 0.334435 5.77077C0.669582 2.9387 2.89767 0.693876 5.73506 0.351108C6.76373 0.226843 7.81641 0.109917 8.88633 0.00786451C9.82882 -0.0820349 10.6657 0.609131 10.7557 1.55163ZM29.3056 20.1856C30.248 20.2755 30.9392 21.1123 30.8494 22.0548C30.7511 23.085 30.6398 24.0983 30.5227 25.0866C30.1877 27.9186 27.9595 30.1637 25.1223 30.5063C24.0935 30.6306 23.0409 30.7474 21.9709 30.8496C21.0284 30.9394 20.1915 30.2482 20.1016 29.3058C20.0117 28.3632 20.7029 27.5264 21.6454 27.4366C22.6809 27.3376 23.7042 27.224 24.7111 27.1024C25.9714 26.9502 26.968 25.9509 27.1179 24.6837C27.2327 23.7141 27.341 22.7278 27.4363 21.7294C27.5262 20.7869 28.363 20.0957 29.3056 20.1856ZM1.55171 20.1856C2.49422 20.0957 3.33111 20.7869 3.42096 21.7294C3.51612 22.7278 3.6245 23.7141 3.73925 24.6837C3.88919 25.9509 4.88576 26.9502 6.14626 27.1024C7.15296 27.224 8.17643 27.3376 9.21189 27.4366C10.1544 27.5264 10.8456 28.3632 10.7557 29.3058C10.6657 30.2482 9.82882 30.9394 8.88633 30.8496C7.81641 30.7474 6.76373 30.6306 5.73506 30.5063C2.89767 30.1637 0.669582 27.9186 0.334435 25.0866C0.217461 24.0983 0.106076 23.085 0.00785649 22.0548C-0.0819972 21.1123 0.609212 20.2755 1.55171 20.1856ZM6.28571 12C6.28571 11.0532 7.05323 10.2857 8 10.2857H22.8571C23.8039 10.2857 24.5714 11.0532 24.5714 12C24.5714 12.9468 23.8039 13.7143 22.8571 13.7143H8C7.05323 13.7143 6.28571 12.9468 6.28571 12ZM6.28571 18.8571C6.28571 17.9104 7.05323 17.1429 8 17.1429H14.8316C15.7784 17.1429 16.5459 17.9104 16.5459 18.8571C16.5459 19.8039 15.7784 20.5714 14.8316 20.5714H8C7.05323 20.5714 6.28571 19.8039 6.28571 18.8571Z",
  },
  {
    gradientId: "creators-how-post",
    viewBox: "0 0 31.9965 31.9964",
    gradientTransform: "matrix(2.91634 33.3889 -44.9004 12.3948 16.6565 -1.39244)",
    pathD:
      "M25.2074 0.104698C27.8641 -0.232817 29.4415 0.260349 30.5798 1.37271C31.1151 1.89578 31.5532 2.55666 31.7939 3.45917C32.0278 4.33656 32.0591 5.38349 31.8881 6.66907C31.5487 9.21846 30.3745 12.9636 27.9574 18.7152C26.2998 22.66 24.9036 25.9749 23.238 28.1703C22.387 29.2919 21.4166 30.1922 20.2351 30.7392C19.0394 31.2928 17.72 31.4421 16.2514 31.2101C15.1799 31.0407 13.9676 30.5351 12.7543 29.8633L11.3815 31.0825C9.10772 33.1024 5.37469 31.5744 5.37469 28.454V24.0626C11.0584 18.5981 17.0797 13.6198 23.5606 9.02168C24.204 8.56513 24.3555 7.67341 23.8991 7.02993C23.4424 6.38646 22.5508 6.23492 21.9073 6.69147C15.3711 11.3288 9.29165 16.3482 3.5514 21.8523C3.01759 21.1743 2.52074 20.4867 2.07955 19.8094C1.10472 18.3129 0.329857 16.7588 0.108721 15.4223C-0.131007 13.9734 0.0232675 12.6686 0.595841 11.488C1.15976 10.3253 2.08431 9.37627 3.22847 8.54751C5.47114 6.92303 8.85759 5.56116 12.8962 3.94088C18.7827 1.57928 22.6086 0.434879 25.2074 0.104698Z",
  },
  {
    gradientId: "creators-how-mention",
    viewBox: "0 0 30.8571 30.8571",
    gradientTransform: "matrix(2.8125 32.2 -43.3016 11.9535 16.0634 -1.34286)",
    pathD:
      "M15.4286 0C12.8038 0 10.2426 0.239977 7.78805 0.513568C3.96645 0.93954 0.895787 4.00754 0.486181 7.83607C0.224933 10.2779 0 12.822 0 15.4286C0 18.0351 0.224933 20.5792 0.486181 23.021C0.89579 26.8496 3.96645 29.9177 7.78805 30.3435C10.2426 30.6171 12.8038 30.8571 15.4286 30.8571C18.0533 30.8571 20.6146 30.6171 23.069 30.3435C26.8907 29.9177 29.9614 26.8496 30.371 23.021C30.6322 20.5792 30.8571 18.0351 30.8571 15.4286C30.8571 12.822 30.6322 10.2779 30.371 7.83607C29.9614 4.00754 26.8907 0.93954 23.069 0.513568C20.6146 0.239977 18.0533 0 15.4286 0ZM9.99015 9.99015C8.84878 11.1315 8.14286 12.9029 8.14286 15.4286C8.14286 17.9542 8.84878 19.7256 9.99015 20.867C11.1315 22.0084 12.9029 22.7143 15.4286 22.7143C16.4945 22.7143 17.4286 22.5877 18.2351 22.3566C18.9936 22.1392 19.7846 22.5778 20.0019 23.3362C20.2192 24.0949 19.7805 24.8857 19.0221 25.1031C17.9216 25.4185 16.7179 25.5714 15.4286 25.5714C12.3771 25.5714 9.79131 24.7088 7.96985 22.8873C6.14837 21.0658 5.28571 18.4801 5.28571 15.4286C5.28571 12.3771 6.14837 9.79131 7.96985 7.96985C9.79131 6.14837 12.3771 5.28571 15.4286 5.28571C18.4801 5.28571 21.0658 6.14837 22.8873 7.96985C24.7088 9.79131 25.5714 12.3771 25.5714 15.4286C25.5714 16.6178 25.3582 17.8804 24.808 18.9016C24.2354 19.9649 23.2101 20.8798 21.7029 20.8798C20.7769 20.8798 19.9436 20.6543 19.2852 20.1232C19.1648 20.0261 19.0559 19.9233 18.9575 19.8164C17.9884 20.5558 16.7591 20.8802 15.4285 20.8802C13.8783 20.8802 12.4655 20.4398 11.4416 19.4159C10.4177 18.392 9.97726 16.9792 9.97726 15.4289C9.97726 13.8787 10.4177 12.4659 11.4416 11.442C12.4655 10.4181 13.8783 9.97767 15.4285 9.97767C16.9787 9.97767 18.3916 10.4181 19.4155 11.442C20.4344 12.4609 20.8754 13.8648 20.8798 15.4061C20.8876 15.6531 20.8784 15.983 20.8704 16.2651C20.8664 16.4063 20.8628 16.5358 20.8619 16.6366C20.8579 17.0456 20.8787 17.3601 20.9379 17.5991C20.9935 17.8234 21.0584 17.8827 21.0791 17.8994C21.0959 17.913 21.2345 18.0227 21.7029 18.0227C21.8688 18.0227 22.0635 17.972 22.2926 17.5468C22.5442 17.0795 22.7143 16.3308 22.7143 15.4286C22.7143 12.9029 22.0084 11.1315 20.867 9.99015C19.7256 8.84878 17.9542 8.14286 15.4286 8.14286C12.9029 8.14286 11.1315 8.84878 9.99015 9.99015ZM18.0226 15.4094C18.0225 15.4217 18.0225 15.434 18.0226 15.4463C18.0194 16.46 17.737 17.0537 17.3952 17.3956C17.0514 17.7394 16.4528 18.0231 15.4285 18.0231C14.4042 18.0231 13.8057 17.7394 13.4619 17.3956C13.1181 17.0518 12.8344 16.4533 12.8344 15.4289C12.8344 14.4046 13.1181 13.8061 13.4619 13.4623C13.8057 13.1185 14.4042 12.8348 15.4285 12.8348C16.4528 12.8348 17.0514 13.1185 17.3952 13.4623C17.7368 13.8039 18.019 14.397 18.0226 15.4094Z",
  },
  {
    gradientId: "creators-how-calendar",
    viewBox: "0 0 30.8566 30.8571",
    gradientTransform: "matrix(2.81245 32.2 -43.3008 11.9535 16.0631 -1.34286)",
    pathD:
      "M10.8616 1.71429C10.8616 0.767511 10.0941 0 9.14731 0C8.20055 0 7.43303 0.767511 7.43303 1.71429V3.54825C3.75102 3.98425 0.825694 6.87979 0.402802 10.5118C-0.134267 15.1243 -0.134267 19.0662 0.402802 23.6789C0.847799 27.5006 4.06366 30.507 8.01637 30.6903C10.3856 30.8 12.8048 30.8571 15.4283 30.8571C18.0519 30.8571 20.4712 30.8 22.8402 30.6903C26.7931 30.507 30.0089 27.5006 30.4539 23.6789C30.9909 19.0662 30.9909 15.1243 30.4539 10.5118C30.0311 6.87995 27.1058 3.98448 23.424 3.54832V1.71429C23.424 0.767511 22.6567 0 21.7098 0C20.763 0 19.9955 0.767511 19.9955 1.71429V3.39499C18.5251 3.35426 17.014 3.33342 15.4283 3.33342C13.8428 3.33342 12.3319 3.35426 10.8616 3.39499V1.71429ZM13.741 10.7871C13.9047 10.6893 14.0917 10.6377 14.2824 10.6377C14.4595 10.6377 14.6336 10.6823 14.7887 10.7671C19.1687 12.8032 21.6572 17.0327 21.5034 20.5831C21.4376 22.0772 20.9024 23.4647 19.8605 24.48C18.8149 25.499 17.3152 26.0889 15.4262 26.0889C13.5464 26.0889 12.0443 25.5321 10.9938 24.525C9.94485 23.5193 9.41161 22.1274 9.34901 20.5813L9.34862 20.5719C9.32592 19.6828 9.54729 18.8044 9.98855 18.0322C10.4298 17.26 11.0742 16.6234 11.8518 16.1915C12.0068 16.1054 12.1909 16.0885 12.359 16.1451C12.5271 16.2016 12.6636 16.3263 12.7351 16.4885C12.9423 16.9586 13.3416 17.139 13.6802 17.1146C14.0027 17.0914 14.3101 16.8841 14.3878 16.4111C14.616 15.0225 14.2398 13.3795 13.456 12.0196C13.3433 11.8311 13.3021 11.6082 13.3403 11.3917C13.3792 11.1714 13.4975 10.9731 13.6728 10.8342C13.6945 10.817 13.7173 10.8013 13.741 10.7871Z",
  },
  {
    gradientId: "creators-how-submit",
    viewBox: "0 0 28.5714 29.7143",
    gradientTransform: "matrix(2.60416 31.0074 -40.094 11.5108 14.8735 -1.29312)",
    pathD:
      "M27.8197 27.2832C28.1566 26.3509 28.5714 24.9136 28.5714 23.4286C28.5714 21.9435 28.1566 20.5062 27.8197 19.5739C27.4009 18.4153 26.3506 17.6974 25.2078 17.5855C23.4455 17.413 19.8047 17.1429 14.2857 17.1429C8.76677 17.1429 5.12599 17.413 3.36357 17.5855C2.22071 17.6973 1.17049 18.4153 0.751794 19.5739C0.414843 20.5062 0 21.9435 0 23.4286C0 24.9136 0.414843 26.3509 0.751794 27.2832C1.17049 28.4418 2.22071 29.1598 3.36357 29.2715C5.12601 29.4441 8.76677 29.7143 14.2857 29.7143C19.8047 29.7143 23.4455 29.4441 25.2078 29.2715C26.3506 29.1598 27.4009 28.4418 27.8197 27.2832ZM12.355 4.78361C12.4252 4.71346 12.4974 4.64494 12.5714 4.57824V12C12.5714 12.9468 13.3389 13.7143 14.2857 13.7143C15.2325 13.7143 16 12.9468 16 12V4.57824C16.074 4.64494 16.1462 4.71346 16.2164 4.78361C16.9505 5.51769 17.1429 6.1027 17.1429 6.28571C17.1429 7.23248 17.9104 8 18.8571 8C19.8039 8 20.5714 7.23248 20.5714 6.28571C20.5714 4.75445 19.621 3.33945 18.6408 2.35925C17.618 1.33653 16.2281 0.443381 14.7446 0.0621074C14.5985 0.021632 14.4446 0 14.2857 0C14.1267 0 13.9727 0.0216548 13.8266 0.0621737C12.3432 0.443483 10.9533 1.33659 9.93067 2.35925C8.95047 3.33943 8 4.75445 8 6.28571C8 7.23248 8.76752 8 9.71429 8C10.6611 8 11.4286 7.23248 11.4286 6.28571C11.4286 6.1027 11.621 5.51769 12.355 4.78361Z",
  },
  {
    gradientId: "creators-how-paid",
    viewBox: "0 0 30.8571 30.8571",
    gradientTransform: "matrix(2.8125 32.2 -43.3016 11.9535 16.0634 -1.34286)",
    pathD:
      "M17.1429 6.79246C17.1429 7.73925 16.3753 8.50674 15.4286 8.50674C14.4818 8.50674 13.7143 7.73925 13.7143 6.79246V1.71429C13.7143 0.767513 14.4818 0 15.4286 0C16.3753 0 17.1429 0.767513 17.1429 1.71429V6.79246ZM7.29479 8.18053C7.35515 9.12537 8.17006 9.84238 9.1149 9.78199C10.0597 9.72162 10.7768 8.90674 10.7164 7.9619C10.5788 5.80919 10.435 4.32743 9.36169 2.44357C8.89301 1.62095 7.84619 1.33404 7.02357 1.80274C6.20094 2.27143 5.91403 3.31824 6.38272 4.14087C7.04386 5.30123 7.16222 6.10581 7.29479 8.18053ZM21.6898 9.78199C22.6347 9.84238 23.4496 9.12537 23.5099 8.18053C23.6425 6.10581 23.7609 5.30123 24.4219 4.14087C24.8907 3.31824 24.6037 2.27143 23.781 1.80274C22.9584 1.33404 21.9117 1.62095 21.443 2.44357C20.3696 4.32743 20.2258 5.80919 20.0883 7.9619C20.0279 8.90674 20.7449 9.72162 21.6898 9.78199ZM0.745264 13.7323C1.11278 12.1566 2.49831 10.8876 4.22859 10.8876H26.6286C28.3605 10.8876 29.7394 12.1576 30.1184 13.7208L30.157 13.8794C30.5067 15.3162 30.8571 16.7563 30.8571 20.8724C30.8571 24.9886 30.5067 26.4286 30.157 27.8654L30.1184 28.024C29.7394 29.5872 28.3605 30.8571 26.6286 30.8571H4.22859C2.49831 30.8571 1.11278 29.5881 0.745264 28.0123L0.697719 27.8094C0.351163 26.3319 0 24.8347 0 20.8724C0 16.91 0.351161 15.4129 0.697719 13.9354L0.745264 13.7323ZM22.9671 19.4619C22.1782 19.4721 21.5469 20.1198 21.557 20.9088C21.5672 21.6977 22.2149 22.3289 23.0039 22.3189L24.395 22.301C25.1838 22.2907 25.8151 21.6431 25.805 20.8542C25.795 20.0653 25.1472 19.4339 24.3582 19.4441L22.9671 19.4619ZM5.05257 20.9088C5.04245 20.1198 5.67376 19.4721 6.46267 19.4619L7.85374 19.4441C8.64265 19.4339 9.2904 20.0653 9.30053 20.8542C9.31067 21.6431 8.67934 22.2907 7.89045 22.301L6.49938 22.3189C5.71047 22.3289 5.06272 21.6977 5.05257 20.9088ZM12.5906 18.0524C13.2858 17.3573 14.2709 17.0299 15.4286 17.0299C16.5863 17.0299 17.5714 17.3573 18.2666 18.0524C18.9617 18.7476 19.2891 19.7327 19.2891 20.8904C19.2891 22.0481 18.9617 23.0331 18.2666 23.7285C17.5714 24.4235 16.5863 24.7509 15.4286 24.7509C14.2709 24.7509 13.2858 24.4235 12.5906 23.7285C11.8955 23.0331 11.5681 22.0481 11.5681 20.8904C11.5681 19.7327 11.8955 18.7476 12.5906 18.0524Z",
  },
] as const;

const howItWorksStepsBase = [
  {
    title: "Capture the output",
    body: "Gomer did something in Slack or Microsoft Teams. Screenshot it. Or screen-record it. Whatever shows the real output.",
  },
  {
    title: "Post it",
    body: "Add your take. What did you ask? What happened? Why does it matter?",
  },
  {
    title: "Tag Gomer",
    body: "Tag @gomer.com. That's how we find you.",
  },
  {
    title: "Let it run",
    body: "Wait 7 days. Let impressions settle. Reply to comments. Build momentum.",
  },
  {
    title: "Submit",
    body: "Send us the post link and an analytics screenshot showing impressions. Pick credits or cash.",
  },
  {
    title: "Get paid",
    body: "We review within 48 hours. Credits hit your Gomer account immediately. Cash goes through Dub within 5 business days.",
  },
] as const;

function HowItWorksStepCard({
  icon,
  number,
  title,
  body,
}: {
  icon: (typeof howItWorksStepIcons)[number];
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="relative w-full overflow-hidden rounded-section p-8 lg:w-auto">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
        <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity" />
        <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: HOW_IT_WORKS_CARD_SHADOW }}
      />
      <div className="relative z-10">
        <div className="flex flex-col gap-8">
          <div className="flex items-start justify-between gap-3">
            <CreatorsHowIcon {...icon} />
            <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-[#5c28d7]/16 px-5 body-small text-accent-1">
              {number}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="body-medium font-medium text-primary">{title}</h3>
            <p className="body-small font-medium text-secondary">{body}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function HowItWorks() {
  const [active, setActive] = useState(0);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef(new Map<number, HTMLButtonElement>());

  const activePlatform = payoutPlatforms[active];

  const steps = howItWorksStepsBase.map((step, index) => {
    if (index !== 1) return step;
    return {
      ...step,
      body: `Share it on ${platformPostLabels[activePlatform.id]}. ${step.body}`,
    };
  });

  useLayoutEffect(() => {
    const button = mobileTabRefs.current.get(active);
    const container = mobileTabsRef.current;
    if (!button || !container) return;

    const buttonLeft = button.offsetLeft;
    const buttonWidth = button.offsetWidth;
    const containerWidth = container.clientWidth;
    const scrollTarget = buttonLeft - containerWidth / 2 + buttonWidth / 2;
    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, [active]);

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 py-14 sm:py-[7rem] md:scroll-mt-28"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-16">
          <div className="mx-auto flex max-w-[570px] flex-col items-center gap-4 text-center">
            <h2 className="font-heading h3 text-balance text-primary">How it works</h2>
            <p className="body-main text-secondary font-medium">
              Screenshot. Post. Tag. Wait. Submit. Get paid.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[52.875rem] flex-col gap-10">
              <div className="relative overflow-hidden py-1 md:hidden">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primitive-main-beige) 0%, transparent 100%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10"
                  style={{
                    background:
                      "linear-gradient(270deg, var(--primitive-main-beige) 0%, transparent 100%)",
                  }}
                />
                <div
                  ref={mobileTabsRef}
                  className="flex w-full gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Creator platforms"
                >
                  {payoutPlatforms.map((platform, index) => {
                    const isActive = active === index;
                    const panelId = `${platform.id}-creators-how-it-works-platforms-panel`;
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        ref={(node) => {
                          if (node) mobileTabRefs.current.set(index, node);
                          else mobileTabRefs.current.delete(index);
                        }}
                        aria-pressed={isActive}
                        aria-controls={panelId}
                        onClick={() => setActive(index)}
                        className={[
                          "relative flex h-12 shrink-0 items-center justify-center gap-4 rounded-full px-[18px] body-main transition-[background,border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                          isActive ? "text-white" : "bg-secondary text-primary",
                        ].join(" ")}
                      >
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                          >
                            <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                          </span>
                        )}
                        <platform.icon
                          className={`relative z-10 size-5 shrink-0 transition-[color,opacity] duration-300 ${
                            isActive ? "text-white opacity-100" : "text-primitive-main-grey opacity-45"
                          }`}
                        />
                        <span className="sr-only">{platform.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="-m-3 hidden overflow-x-auto p-3 md:block">
                <div
                  role="tablist"
                  aria-label="Creator platforms"
                  className="relative isolate mx-auto grid w-full grid-cols-5 overflow-visible rounded-full bg-white p-1"
                  style={{ boxShadow: PAYOUT_TAB_SHADOW }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1 bottom-1 left-1 z-0 overflow-hidden rounded-full transition-transform duration-500 ease-out"
                    style={{
                      width: "calc(20% - 0.1rem)",
                      transform: `translateX(${active * 100}%)`,
                    }}
                  >
                    <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                  </span>
                  {payoutPlatforms.map((platform, index) => {
                    const isActive = active === index;
                    const panelId = `${platform.id}-creators-how-it-works-platforms-panel`;
                    const tabId = `${platform.id}-creators-how-it-works-platforms-tab`;
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        role="tab"
                        id={tabId}
                        aria-selected={isActive}
                        aria-controls={panelId}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActive(index)}
                        className={[
                          "cursor-pointer relative z-10 flex h-12 items-center justify-center gap-4 rounded-full px-5 body-main transition-[border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                          isActive ? "text-white" : "text-primary",
                        ].join(" ")}
                      >
                        <platform.icon
                          className={`size-5 shrink-0 opacity-50 transition-[color,opacity] duration-300 ${
                            isActive ? "text-white" : "text-primitive-main-grey"
                          }`}
                        />
                        <span className="sr-only">{platform.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            <div
              id={`${activePlatform.id}-creators-how-it-works-platforms-panel`}
              role="tabpanel"
              aria-labelledby={`${activePlatform.id}-creators-how-it-works-platforms-tab`}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {steps.map((step, index) => (
                <HowItWorksStepCard
                  key={step.title}
                  icon={howItWorksStepIcons[index]}
                  number={String(index + 1).padStart(2, "0")}
                  title={step.title}
                  body={step.body}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- CREDITS OR CASH ----------------------- */

const creditsTiers = [
  ["$200 cash", "$300 in credits"],
  ["$600 cash", "$900 in credits"],
  ["$1,500 cash", "$2,250 in credits"],
  ["$5,000 cash", "$7,500 in credits"],
  ["$10,000 cash", "$15,000 in credits"],
] as const;

function CreditsConicCardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
      <div
        aria-hidden="true"
        className="bg-conic-gradient-bg pointer-events-none absolute inset-0 z-0"
        style={{ borderRadius: "inherit" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[20px] z-0"
        style={{ borderRadius: "inherit", background: "#fff", filter: "blur(20px)", WebkitFilter: "blur(20px)" }}
      />
      <div className="relative z-[1] h-full w-full rounded-[inherit]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{ background: "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
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
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "4px",
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

function CreditsOrCash() {
  return (
    <section className="py-12 sm:py-[5rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-16">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
            <h2 className="font-heading h3 text-balance text-primary font-medium">Credits or cash</h2>
            <p className="body-main text-secondary font-medium">You choose with each submission.</p>
          </div>

          <div className="creators-credits-grid-width mx-auto grid w-full gap-5 lg:grid-cols-2 lg:items-start">
            <CreditsConicCardShell>
              <div className="relative z-[2] flex h-full w-full flex-col justify-between">
                <div className="flex flex-col gap-10 p-8 md:gap-16 md:p-16">
                  <img
                    src={gomerSlackAvatar}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    width={32}
                    height={32}
                    className="size-8"
                  />
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-heading h5 text-accent-1 font-medium">Gomer Credits</h3>
                      <span className="font-medium inline-flex h-7 w-fit shrink-0 items-center justify-center rounded-full border border-transparent bg-accent-1 px-4 text-xs text-white">
                        50% more with credits
                      </span>
                    </div>
                    <p className="body-main text-secondary font-medium">
                      We add 1.5x the cash equivalent to your Gomer account. More tasks, more automations,
                      more AI employee time. Automatic. No strings.
                    </p>
                  </div>
                  <ul className="creators-credits-table border-y body-main">
                    {creditsTiers.map(([cash, credits]) => (
                      <li
                        key={cash}
                        className="flex items-center justify-between gap-4 border-t py-4 first:border-t-0"
                      >
                        <span className="text-primary font-medium">{cash}</span>
                        <span className="text-right text-accent-1 font-medium">{credits}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CreditsConicCardShell>

            <article className="relative overflow-hidden rounded-[2rem]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
                <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity" />
                <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[2rem] border-4 border-white blur-[4px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{ boxShadow: HOW_IT_WORKS_CARD_SHADOW }}
              />
              <div className="relative z-10">
                <div className="flex flex-col gap-10 p-8 md:gap-16 md:p-16">
                  <span className="inline-flex size-8 shrink-0 text-primary opacity-50 [&_svg]:size-8">
                    <CoinIcon />
                  </span>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-heading h5 text-primary font-medium">Cash</h3>
                      <span className="font-medium inline-flex h-7 w-fit shrink-0 items-center justify-center rounded-full border border-transparent bg-secondary px-4 body-small text-primary">
                        Paid through Dub
                      </span>
                    </div>
                    <p className="body-main text-secondary font-medium">
                      Paid through{" "}
                      <a
                        href="https://partners.dub.co/getgomer/creator-program/apply"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-accent-1"
                      >
                        Dub
                      </a>
                      . Apply once. Add your payout details. Get paid within 5 business days. No invoicing.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- POST IDEAS ----------------------- */

const storyAngleIcons = [
  {
    gradientId: "creators-post-shocked",
    viewBox: "0 0 32.0005 31.9985",
    gradientTransform: "matrix(2.91671 33.391 -44.9061 12.3956 16.6586 -1.39253)",
    pathD:
      "M16.0003 0C11.1481 0 7.14577 1.06858 4.35148 3.55793C1.53181 6.06991 0.143136 9.8465 0.143136 14.8107C0.143136 15.4065 0.202685 16.0209 0.315328 16.6465C1.14576 16.1653 2.20076 15.869 3.45317 16.0513C5.73141 16.3831 7.36714 18.1463 8.54782 20.1331C10.8844 24.065 11.0463 28.2577 10.7398 30.5157C12.4365 31.438 14.2254 31.9985 16.0005 31.9985C17.7754 31.9985 19.5642 31.438 21.2608 30.5157C20.9543 28.2579 21.1161 24.065 23.4529 20.1331C24.6334 18.1463 26.2691 16.3831 28.5475 16.0513C29.7998 15.869 30.8549 16.1653 31.6853 16.6465C31.7978 16.021 31.8574 15.4065 31.8574 14.8107C31.8574 9.8465 30.4689 6.06991 27.649 3.55793C24.8549 1.06858 20.8524 0 16.0003 0ZM6.09783 21.6173C7.56519 24.0865 7.98316 26.6956 7.99934 28.5637L7.99982 28.6645C8.00055 29.4273 7.93427 30.0597 7.84718 30.4995C7.80547 30.71 7.6494 30.8794 7.44302 30.9381C5.03591 31.6229 2.82211 31.6229 0.415029 30.9379C0.239854 30.8881 0.0989355 30.7578 0.035631 30.587C-0.0276735 30.4163 -0.00577995 30.2254 0.094575 30.0734C0.586329 29.3288 1.48132 27.118 0.856153 24.5932C0.509948 23.195 0.429838 22.1446 0.484112 21.3852C0.511246 21.0056 0.572514 20.6911 0.655737 20.4391C0.727746 20.2209 0.826793 20.0173 0.96118 19.8632C1.02572 19.7699 1.10147 19.6754 1.18791 19.5839L1.18707 19.5818C1.59115 19.1523 2.22836 18.7876 3.04531 18.9065C4.03098 19.0501 5.06142 19.8732 6.09783 21.6173ZM30.8126 19.5839C30.8129 19.5832 30.8133 19.5825 30.8135 19.5818C30.4094 19.1523 29.7722 18.7876 28.9553 18.9065C27.9697 19.0501 26.9393 19.8732 25.9027 21.6173C24.4353 24.0865 24.0174 26.6956 24.0012 28.564C24.001 28.5978 24.0007 28.6314 24.0007 28.6648C24.0001 29.4273 24.0663 30.0597 24.1534 30.4995C24.195 30.71 24.3511 30.8794 24.5575 30.9381C26.9646 31.6229 29.1783 31.6229 31.5854 30.9379C31.7607 30.8881 31.9015 30.7578 31.9649 30.587C32.0282 30.4163 32.0065 30.2254 31.9059 30.0734C31.4142 29.3288 30.5191 27.118 31.1445 24.5932C31.4906 23.195 31.5708 22.1446 31.5164 21.3852C31.4894 21.0056 31.4279 20.6911 31.3447 20.4391C31.2727 20.2209 31.1738 20.0173 31.0394 19.8632C30.9749 19.7699 30.899 19.6755 30.8126 19.5839ZM13.5117 7.76515C13.5117 10.6188 11.9219 12.224 9.09557 12.224C6.26922 12.224 4.67941 10.6188 4.67941 7.76515C4.67941 4.91153 6.26922 3.30636 9.09557 3.30636C11.9219 3.30636 13.5117 4.91153 13.5117 7.76515ZM22.905 12.224C20.0787 12.224 18.4889 10.6188 18.4889 7.76515C18.4889 4.91153 20.0787 3.30636 22.905 3.30636C25.7313 3.30636 27.3212 4.91153 27.3212 7.76515C27.3212 10.6188 25.7313 12.224 22.905 12.224ZM19.1333 17.0991C19.7443 18.1029 19.9825 19.37 19.9825 20.5064C19.9825 21.6428 19.7443 22.9098 19.1333 23.9137C18.5059 24.9445 17.481 25.6933 16.0003 25.6933C14.5196 25.6933 13.4947 24.9445 12.8674 23.9137C12.2564 22.9098 12.0181 21.6428 12.0181 20.5064C12.0181 19.37 12.2564 18.1029 12.8674 17.0991C13.4947 16.0684 14.5196 15.3194 16.0003 15.3194C17.481 15.3194 18.5059 16.0684 19.1333 17.0991Z",
  },
  {
    gradientId: "creators-post-competitor",
    viewBox: "0 0 30.858 30.8564",
    gradientTransform: "matrix(2.81258 32.1993 -43.3028 11.9532 16.0639 -1.34282)",
    pathD:
      "M14.6362 0C19.0867 9.14286e-06 22.8059 1.25685 25.4107 3.8616C28.0155 6.46638 29.2722 10.1856 29.2722 14.6362C29.2722 18.1564 28.4816 21.2161 26.8638 23.6318L30.1897 26.9554C31.0809 27.8478 31.0807 29.2951 30.1897 30.1874C29.2974 31.0798 27.848 31.0791 26.9554 30.1874L23.6318 26.8638C21.2161 28.4816 18.1564 29.2722 14.6362 29.2722C10.1856 29.2722 6.46638 28.0155 3.8616 25.4107C1.25685 22.8059 9.14286e-06 19.0867 0 14.6362C0 10.1856 1.25685 6.46638 3.8616 3.8616C6.46638 1.25685 10.1856 0 14.6362 0ZM14.6362 3.42857C10.8167 3.42857 8.07438 4.49705 6.28571 6.28571C4.49705 8.07438 3.42857 10.8167 3.42857 14.6362C3.42857 18.4556 4.49705 21.1979 6.28571 22.9865C6.49301 23.1938 6.71554 23.3886 6.94866 23.576V18.3951C6.72082 18.4539 6.48734 18.5231 6.25001 18.6094C5.70059 18.8093 5.08341 18.6505 4.69419 18.2143C4.30551 17.7777 4.22295 17.1479 4.48437 16.625C5.14615 15.3027 6.41659 14.034 7.73883 13.3728C7.74537 13.3694 7.75232 13.3648 7.75893 13.3616C7.79582 13.3439 7.83419 13.3271 7.87278 13.3125C7.93179 13.2903 7.99273 13.2708 8.05358 13.2567C8.08258 13.2501 8.11321 13.246 8.14286 13.2411C8.20393 13.231 8.26645 13.2253 8.32812 13.2232C8.34407 13.2225 8.36117 13.2187 8.37724 13.2187C8.3926 13.2189 8.40887 13.2227 8.42412 13.2232C8.48505 13.2253 8.54679 13.2312 8.60713 13.2411C8.63756 13.246 8.66894 13.2499 8.69865 13.2567C8.7595 13.2708 8.82043 13.2903 8.87947 13.3125C8.91803 13.3271 8.95639 13.3439 8.9933 13.3616C9.00023 13.365 9.0088 13.3693 9.01563 13.3728C10.3381 14.0346 11.6111 15.3048 12.2723 16.6272C12.5327 17.1498 12.4486 17.7804 12.0603 18.2165C11.6717 18.652 11.0554 18.8077 10.5067 18.6094C10.269 18.5229 10.034 18.454 9.80581 18.3951V25.1184C10.7908 25.4558 11.9005 25.6839 13.1429 25.7835V11.4576C12.6375 11.5298 12.1243 11.6399 11.5982 11.788C11.0544 11.9406 10.4717 11.7566 10.1116 11.3214C9.75132 10.8856 9.68014 10.2781 9.93303 9.77232C10.7433 8.15211 12.3128 6.58494 13.933 5.77456C13.9402 5.77097 13.9482 5.76683 13.9554 5.76338C13.9916 5.74597 14.0291 5.72864 14.067 5.71429C14.1259 5.69209 14.1869 5.67262 14.2478 5.65849C14.284 5.65015 14.3222 5.64619 14.3594 5.64062C14.4064 5.63358 14.4548 5.62955 14.5022 5.62722C14.5249 5.62599 14.5485 5.62055 14.5714 5.62053C14.5933 5.62071 14.6168 5.62624 14.6384 5.62722C14.6873 5.62951 14.7372 5.63333 14.7857 5.64062C14.8207 5.64587 14.8565 5.6507 14.8906 5.65849C14.9538 5.67294 15.0169 5.69337 15.0781 5.71653C15.1151 5.73058 15.152 5.7464 15.1875 5.76338C15.1953 5.76709 15.2043 5.77067 15.212 5.77456C16.8317 6.58501 18.3996 8.15255 19.2098 9.77232C19.4624 10.2778 19.3932 10.8857 19.0335 11.3214C18.6736 11.7567 18.0906 11.9401 17.5469 11.788C17.0201 11.6396 16.5061 11.5298 16 11.4576V25.7947C17.2412 25.7045 18.3516 25.4859 19.3393 25.1607V18.3951C19.1111 18.454 18.8761 18.5229 18.6384 18.6094C18.0896 18.8081 17.4736 18.6519 17.0848 18.2165C16.696 17.7803 16.612 17.1501 16.8728 16.6272C17.5342 15.3046 18.8068 14.0344 20.1295 13.3728C20.1357 13.3695 20.1433 13.3646 20.1496 13.3616C20.1864 13.3439 20.2248 13.3271 20.2634 13.3125C20.3224 13.2902 20.3834 13.2709 20.4442 13.2567C20.4739 13.2499 20.5053 13.2461 20.5357 13.2411C20.596 13.2311 20.6578 13.2253 20.7187 13.2232C20.7347 13.2225 20.7517 13.2187 20.7679 13.2187C20.7832 13.2189 20.7995 13.2227 20.8147 13.2232C20.8764 13.2253 20.9389 13.231 21 13.2411C21.0297 13.2459 21.0603 13.25 21.0893 13.2567C21.1501 13.2708 21.211 13.2903 21.2701 13.3125C21.3087 13.3271 21.347 13.3439 21.3839 13.3616C21.3911 13.3651 21.3991 13.3692 21.4062 13.3728C22.7285 14.0342 23.9991 15.3029 24.6608 16.625C24.9218 17.1476 24.8391 17.7779 24.451 18.2143C24.0619 18.6506 23.4446 18.8088 22.8951 18.6094C22.6578 18.523 22.4242 18.454 22.1964 18.3951V23.6763C22.477 23.4594 22.7419 23.2313 22.9865 22.9865C24.7753 21.1979 25.8437 18.4556 25.8437 14.6362C25.8437 10.8168 24.7753 8.07438 22.9865 6.28571C21.1979 4.49705 18.4556 3.42857 14.6362 3.42857Z",
  },
  {
    gradientId: "creators-post-calendar",
    viewBox: "0 0 30.8566 30.8571",
    gradientTransform: "matrix(2.81245 32.2 -43.3008 11.9535 16.0631 -1.34286)",
    pathD:
      "M9.14731 0C10.0941 0 10.8616 0.767511 10.8616 1.71429V3.39499C12.3319 3.35426 13.8428 3.33342 15.4283 3.33342C17.014 3.33342 18.5251 3.35426 19.9955 3.39499V1.71429C19.9955 0.767511 20.763 0 21.7098 0C22.6567 0 23.424 0.767511 23.424 1.71429V3.54832C27.1058 3.98448 30.0311 6.87995 30.4539 10.5118C30.9909 15.1243 30.9909 19.0662 30.4539 23.6789C30.0089 27.5006 26.7931 30.507 22.8402 30.6903C20.4712 30.8 18.0519 30.8571 15.4283 30.8571C12.8048 30.8571 10.3856 30.8 8.01637 30.6903C4.06366 30.507 0.847799 27.5006 0.402802 23.6789C-0.134267 19.0662 -0.134267 15.1243 0.402802 10.5118C0.825694 6.87979 3.75102 3.98425 7.43303 3.54825V1.71429C7.43303 0.767511 8.20055 0 9.14731 0ZM16.8571 9.78571C16.8571 8.99673 16.2176 8.35714 15.4286 8.35714C14.6396 8.35714 14 8.99673 14 9.78571V10.881C14 11.6699 14.6396 12.3095 15.4286 12.3095C16.2176 12.3095 16.8571 11.6699 16.8571 10.881V9.78571ZM22.2473 13.2021C22.8053 12.6442 22.8053 11.7397 22.2473 11.1818C21.6894 10.6239 20.7849 10.6239 20.227 11.1818L19.4526 11.9562C18.8947 12.5141 18.8947 13.4187 19.4526 13.9766C20.0104 14.5345 20.915 14.5345 21.4729 13.9766L22.2473 13.2021ZM25.0715 18C25.0715 18.789 24.4318 19.4286 23.643 19.4286H22.5477C21.7587 19.4286 21.119 18.789 21.119 18C21.119 17.211 21.7587 16.5714 22.5477 16.5714H23.643C24.4318 16.5714 25.0715 17.211 25.0715 18ZM20.227 24.8183C20.7849 25.376 21.6894 25.376 22.2473 24.8183C22.8053 24.2603 22.8053 23.3559 22.2473 22.7979L21.4729 22.0234C20.915 21.4655 20.0104 21.4655 19.4526 22.0234C18.8947 22.5813 18.8947 23.4859 19.4526 24.0437L20.227 24.8183ZM15.4286 27.643C16.2176 27.643 16.8571 27.0032 16.8571 26.2144V25.1191C16.8571 24.3301 16.2176 23.6905 15.4286 23.6905C14.6396 23.6905 14 24.3301 14 25.1191V26.2144C14 27.0032 14.6396 27.643 15.4286 27.643ZM10.6301 24.8183C10.0722 25.376 9.16773 25.376 8.60983 24.8183C8.05193 24.2603 8.05193 23.3559 8.60983 22.7979L9.38428 22.0234C9.94217 21.4655 10.8467 21.4655 11.4046 22.0234C11.9625 22.5813 11.9625 23.4859 11.4046 24.0437L10.6301 24.8183ZM5.78571 18C5.78571 18.789 6.4253 19.4286 7.21429 19.4286H8.30953C9.09849 19.4286 9.7381 18.789 9.7381 18C9.7381 17.211 9.09849 16.5714 8.30953 16.5714H7.21429C6.4253 16.5714 5.78571 17.211 5.78571 18ZM8.60983 13.2021C8.05193 12.6442 8.05193 11.7397 8.60983 11.1818C9.16773 10.6239 10.0722 10.6239 10.6301 11.1818L11.4046 11.9562C11.9625 12.5141 11.9625 13.4187 11.4046 13.9766C10.8467 14.5345 9.94217 14.5345 9.38428 13.9766L8.60983 13.2021ZM12.4002 14.9688C13.139 14.23 14.1885 13.8795 15.4284 13.8795C16.6683 13.8795 17.7177 14.23 18.4566 14.9688C19.1955 15.7077 19.546 16.7571 19.546 17.997C19.546 19.237 19.1955 20.2864 18.4566 21.0252C17.7177 21.7641 16.6683 22.1146 15.4284 22.1146C14.1885 22.1146 13.139 21.7641 12.4002 21.0252C11.6613 20.2864 11.3108 19.237 11.3108 17.997C11.3108 16.7571 11.6613 15.7077 12.4002 14.9688Z",
  },
  {
    gradientId: "creators-post-trending",
    viewBox: "0 0 27.4286 32",
    gradientTransform: "matrix(2.5 33.3926 -38.4903 12.3962 14.2786 -1.39259)",
    pathD:
      "M12.9879 2.5896C14.1136 1.18219 15.6223 0 17.5294 0C19.4364 0 20.9451 1.1822 22.0709 2.58962C23.2094 4.01298 24.1161 5.85838 24.816 7.62599C25.5211 9.40679 26.043 11.1776 26.3876 12.497C26.5604 13.1584 26.69 13.7106 26.7764 14.0991C26.8199 14.2934 26.8526 14.447 26.8745 14.5532L26.8996 14.6761L26.9063 14.7093L26.9086 14.7214L25.7655 14.9475C26.9088 14.7229 26.9086 14.7217 26.9086 14.7214L26.9095 14.7258C28.0368 20.615 27.5819 26.2754 22.9831 29.9442C21.3673 31.2331 19.3658 31.7358 17.505 31.88C12.1757 32.293 7.86456 31.6681 4.82203 29.5643C1.70772 27.4107 0.166805 23.8869 0.00371954 19.1142L0.00321664 19.0993C-0.0427582 16.966 0.404703 14.8504 1.30683 12.9795C1.79049 11.9766 2.39641 11.0616 3.10578 10.2627C3.8471 9.42779 4.87332 9.22775 5.77241 9.45659C6.6362 9.67646 7.39794 10.2838 7.84884 11.096C8.10694 11.5609 8.38751 12.0061 8.68882 12.4295C9.03364 11.1176 9.54962 9.37655 10.2428 7.62592C10.9427 5.85833 11.8494 4.01296 12.9879 2.5896ZM12.173 17.5129C12.7174 16.9537 13.4082 16.5206 14.2393 16.5206C15.0717 16.5206 15.7568 16.955 16.2923 17.5164C16.8273 18.0773 17.2549 18.8065 17.5853 19.5062C17.9178 20.2103 18.1638 20.9103 18.3263 21.4317C18.4077 21.6931 18.4688 21.9115 18.5097 22.0653C18.5301 22.1422 18.5455 22.2031 18.556 22.2453L18.5679 22.2943L18.5711 22.3076L18.572 22.3114L18.1044 22.4215C18.5724 22.3133 18.572 22.3116 18.572 22.3114L18.5727 22.3146C18.8383 23.4779 18.9246 24.5593 18.6562 25.5129C18.3812 26.4905 17.7492 27.2798 16.6944 27.8727C15.0372 28.8043 13.3343 28.8043 11.6772 27.8727C10.6223 27.2798 9.99035 26.4905 9.71531 25.5129C9.44699 24.5593 9.5333 23.4779 9.79885 22.3146L9.80116 22.3045L9.85942 22.3192L10.2657 22.4212L9.80116 22.3045L9.80267 22.2989L9.80612 22.2856L9.81899 22.2367C9.83026 22.1945 9.8469 22.1336 9.86884 22.0568C9.91273 21.903 9.97807 21.6848 10.0647 21.4235C10.2374 20.9023 10.497 20.2028 10.8431 19.4992C11.1871 18.8 11.6284 18.0722 12.173 17.5129Z",
  },
] as const;

const storyAngles = [
  {
    title: "“We hired Gomer”",
    quote: "“We didn’t buy software last month. We hired someone.”",
    description:
      "Tell it like a hiring story: what role was open, what Gomer took over, what your team stopped doing by hand. The screenshot is the new hire’s work.",
    skip: "Skip: calling Gomer a tool or an assistant. Employees hand you finished work. That’s the story.",
  },
  {
    title: "“Asked at 9:04, done at 9:06”",
    quote: "“Asked Gomer for the competitor breakdown at 9:04. Had the finished report at 9:06.”",
    description:
      "Name the task, what it used to take, and the exact thing Gomer handed back: the report, the PR, the dashboard, the follow-up email. Specific numbers beat adjectives.",
    skip: "Skip: the vague “AI saves me so much time” line. Show the finished work instead.",
  },
  {
    title: "“Gomer went first”",
    quote: "“I didn’t ask for this. Gomer flagged it before I knew it was a problem.”",
    description:
      "Scheduled tasks, monitoring, a heads-up that arrived unprompted. Show the message Gomer sent before anyone asked. That’s the moment people don’t believe until they see it.",
    skip: "Skip: cropping out the timestamp or context. Unprompted only lands if it’s visibly unprompted.",
  },
  {
    title: "“Employee > chatbot”",
    quote: "“A chatbot answers questions. An AI employee hands you finished work.”",
    description:
      "Take a side. Put your Gomer screenshot next to the chat-only workflow it replaced and let the contrast argue for you.",
    skip: "Skip: the 5-tools roundup. Multi-tool posts don’t qualify, and they don’t convert anyway.",
  },
] as const;

const terminologyLabels = [
  { preferred: "AI employee", avoid: "AI assistant" },
  { preferred: "hired", avoid: "subscribed" },
  { preferred: "finished work", avoid: "answers" },
] as const;

function StoryAngleCard({
  icon,
  title,
  quote,
  description,
  skip,
}: {
  icon: (typeof storyAngleIcons)[number];
  title: string;
  quote: string;
  description: string;
  skip: string;
}) {
  return (
    <article className="relative h-full overflow-hidden rounded-section p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
        <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity" />
        <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: HOW_IT_WORKS_CARD_SHADOW }}
      />
      <div className="relative z-10">
        <div className="flex h-full flex-col gap-6">
          <div className="flex items-center gap-4">
            <CreatorsHowIcon {...icon} />
            <h3 className="body-medium text-primary font-medium">{title}</h3>
          </div>
          <p className="body-main border-l-2 border-secondary pl-5 italic text-primary font-medium">{quote}</p>
          <div className="flex flex-1 flex-col gap-3">
            <p className="body-main text-secondary font-medium">{description}</p>
            <p className="body-small text-secondary font-medium">{skip}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function PostIdeas() {
  return (
    <section className="pt-12 pb-14 sm:pt-[5rem] sm:pb-[7rem]" id="story-angles">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-16">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 text-center">
            <h2 className="font-heading h3 text-balance text-primary font-medium">Four stories that get paid</h2>
            <p className="body-main text-secondary font-medium">
              Any real output qualifies. But the posts that break out tell one of four stories. Pick the one that
              matches your screenshot. The best ones get engagement from Gomer’s own accounts, and more reach means a
              higher tier.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {storyAngles.map((angle, index) => (
              <StoryAngleCard key={angle.title} icon={storyAngleIcons[index]} {...angle} />
            ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {terminologyLabels.map(({ preferred, avoid }) => (
                <span
                  key={preferred}
                  className="font-medium inline-flex items-center gap-2 rounded-full text-sm font-medium text-accent-1"
                >
                  {preferred}
                  <span className="text-secondary line-through font-medium">{avoid}</span>
                </span>
              ))}
            </div>
            <p className="body-small max-w-[640px] text-center text-secondary font-medium">
              Use the angle, not our exact words. Near-identical posts get flagged in review. Original takes get
              featured. Screenshots, screen recordings, before / afters, and day-in-the-life threads all work for
              every angle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- POST ANATOMY ----------------------- */

const postAnatomyLines = [
  "Our Monday ad report used to eat half a day.",
  "Last week I handed it to Gomer. It pulled Meta, Google Ads, and Stripe, flagged a campaign quietly burning $1,400 a week, and posted the full breakdown in Slack before my coffee was done.",
  "We didn't add another tool. We hired an AI employee.",
  "Output below. 👇",
  "#ad @gomer.com",
] as const;

const postAnatomySteps = [
  {
    title: "Open with a cost",
    description: "A chore your audience recognizes. Stakes first, product second.",
  },
  {
    title: "Specific ask, specific result",
    description: "Numbers, tool names, real output. This is the line people quote.",
  },
  {
    title: "One category line",
    description:
      "Employee, not tool. It's the take people argue with in the comments, and comments are reach.",
  },
  {
    title: "The screenshot is the proof",
    description: "The story is the post, the output is the evidence. Never post the screenshot alone.",
  },
  {
    title: "Disclosure + tag",
    description: "Without these the post can't be approved or paid. Every platform, every post.",
  },
] as const;

function PostAnatomyNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex size-6 shrink-0 items-center justify-center text-xs font-medium text-accent-1">
      {n}
    </span>
  );
}

function PostAnatomy() {
  return (
    <section className="pt-12 pb-14 sm:pt-[5rem] sm:pb-[7rem]" id="post-anatomy">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-16">
          <div className="mx-auto flex max-w-[570px] flex-col items-center gap-4 text-center">
            <h2 className="font-heading h3 text-balance text-primary">Anatomy of a $5,000 post</h2>
            <p className="body-main text-secondary">
              Posts that reach the top cash tiers share the same skeleton. Steal it.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <article className="relative h-fit overflow-hidden rounded-section p-8 md:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
                <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity" />
                <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{ boxShadow: HOW_IT_WORKS_CARD_SHADOW }}
              />
              <div className="relative z-10">
                <div className="flex flex-col gap-5">
                  {postAnatomyLines.map((line, index) => (
                    <div key={line} className="flex items-start gap-4">
                      <p className="body-main flex-1 text-primary font-medium">{line}</p>
                      <PostAnatomyNumber n={index + 1} />
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <ul className="flex flex-col gap-6">
              {postAnatomySteps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <PostAnatomyNumber n={index + 1} />
                  <div className="flex flex-col gap-1">
                    <span className="body-main font-medium text-primary">{step.title}</span>
                    <span className="body-main text-secondary font-medium">{step.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- WHO THIS IS FOR ----------------------- */

const audiences = [
  {
    icon: Rocket,
    title: "Startup founders",
    body: "Gomer built your internal tool and deployed it in 10 minutes. Screenshot the link.",
  },
  {
    icon: LineChart,
    title: "Ops & RevOps leads",
    body: "Gomer audited your ad spend across platforms, found the waste, handed you the PDF.",
  },
  {
    icon: Sun,
    title: "Engineering managers",
    body: "Gomer read your codebase, opened a PR, and ran the tests. Post the diff.",
  },
  {
    icon: Megaphone,
    title: "Marketing teams",
    body: "Gomer cross-referenced HubSpot and Google Ads, then built a board-ready report.",
  },
  {
    icon: MessageCircle,
    title: "Customer success",
    body: "Gomer summarized 200 support tickets and spotted the pattern your team missed.",
  },
  {
    icon: UserCircle2,
    title: "Anyone, really",
    body: "If Gomer does work for your team in Slack or Microsoft Teams, that's the post.",
  },
] as const;

const GLASS_BORDER_MASK =
  "linear-gradient(#fff, #fff) content-box exclude, linear-gradient(#fff, #fff)";

function AudienceGlassCard({
  icon: Icon,
  title,
  body,
}: {
  icon: (typeof audiences)[number]["icon"];
  title: string;
  body: string;
}) {
  return (
    <article className="relative min-h-[210px] overflow-hidden rounded-[32px]">
      <div className="relative h-full w-full rounded-[inherit]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
            mask: GLASS_BORDER_MASK,
            WebkitMask: GLASS_BORDER_MASK,
            padding: "1px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
          style={{ filter: "blur(5px)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
              mask: GLASS_BORDER_MASK,
              WebkitMask: GLASS_BORDER_MASK,
              padding: "4px",
            }}
          />
        </div>
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <div className="flex h-full flex-col items-center gap-6 p-8 text-center">
            <span className="relative size-8 shrink-0 opacity-50">
              <Icon className="size-full text-white" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <p className="body-main text-white font-medium">{title}</p>
              <p className="body-small text-white/75 font-medium">{body}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function WhoFor() {
  return (
    <section className="border-0 py-0!">
      <div className="">
        <div className="relative w-full overflow-hidden rounded-[32px] bg-hero">
          <div className="pointer-events-none absolute inset-0 bg-hero" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 md:gap-16 md:px-12 md:py-28 lg:px-20">
            <div className="mx-auto flex max-w-[570px] flex-col items-center gap-4 text-center">
              <h2 className="font-heading h3 text-balance text-white">Who this is for</h2>
              <p className="body-main text-white/75 font-medium">If Gomer does work for your team, you qualify.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((a) => (
                <AudienceGlassCard key={a.title} icon={a.icon} title={a.title} body={a.body} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- DISCLOSE ----------------------- */

function Disclose() {
  const rules = [
    { p: "LinkedIn", t: "Add #ad at the end of your post." },
    { p: "X / Twitter", t: "Toggle the Paid partnership label in post settings." },
    { p: "Instagram", t: "Toggle the Paid partnership label in post settings and add #ad to the caption." },
    { p: "YouTube", t: "Turn on 'Includes paid promotion' in YouTube Studio and disclose verbally or on-screen." },
    { p: "TikTok", t: "Turn on 'Disclose video content → Brand organic' and add #ad to the caption." },
  ];
  return (
    <section id="disclosure" className="pt-14 pb-12 sm:pt-[7rem] sm:pb-[5rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative overflow-hidden rounded-section rounded-[32px] p-8 md:p-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
              <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity" />
              <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{ boxShadow: HOW_IT_WORKS_CARD_SHADOW }}
            />
            <div className="relative z-10">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                <div className="flex max-w-[480px] flex-col gap-4">
                  <span className="inline-flex w-fit items-center text-sm font-medium text-accent-1">
                    Required on every post
                  </span>
                  <h2 className="font-heading h3 text-balance text-primary font-medium">Disclose the partnership</h2>
                  <p className="body-main text-secondary font-medium">
                    Every post you submit is a paid partnership, even if you pick credits, even if the payout
                    hasn't hit yet, even if your account is small. Disclosure is triggered the moment you intend
                    to submit, not when the money lands.
                  </p>
                  <p className="body-main text-secondary font-medium">
                    The FTC (US), the ASA / CMA (UK), and every major platform require it. Posts without
                    disclosure won't be approved and can't be paid out.
                  </p>
                </div>
                <ul className="flex flex-1 flex-col gap-5">
                  {rules.map((r) => (
                    <li key={r.p} className="flex flex-col gap-1 border-l-2 border-secondary pl-5">
                      <span className="body-main font-medium text-primary font-medium">{r.p}</span>
                      <span className="body-main text-secondary font-medium">{r.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- THE RULES ----------------------- */

function RulesReceiptCheckIcon() {
  return (
    <svg viewBox="0 0 17.1456 20" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.43668 2.88096C0.706137 1.15026 2.21884 0 3.88249 0H13.284C14.8943 0 16.3871 1.08234 16.6785 2.77039C17.4541 7.26234 17.158 12.9894 16.5578 17.8154C16.3424 19.5487 14.3167 20.3164 13.0094 19.18L11.6268 17.978L10.7032 19.0181C9.54591 20.3216 7.53394 20.3283 6.36824 19.0323L5.41955 17.9777L4.09994 19.1366C2.78638 20.29 0.741437 19.5064 0.537366 17.7596C-0.0328942 12.8781 -0.269909 7.41931 0.43668 2.88096ZM12.1498 7.25457C12.5881 6.857 12.6211 6.17941 12.2235 5.74114C11.826 5.30286 11.1484 5.26987 10.7101 5.66744C9.74702 6.54109 9.00957 7.33893 8.38471 8.31423C8.01597 8.88977 7.69668 9.51116 7.39301 10.2231L6.48487 9.28657C6.07292 8.86176 5.39461 8.85133 4.96981 9.26326C4.54501 9.67519 4.53457 10.3535 4.94649 10.7783L7.02442 12.9212C7.28321 13.188 7.66184 13.3017 8.02481 13.2215C8.38779 13.1413 8.68325 12.8786 8.80547 12.5275C9.28144 11.1603 9.69697 10.2382 10.189 9.47021C10.6768 8.70883 11.2687 8.05391 12.1498 7.25457Z"
        fill="#6748FD"
      />
    </svg>
  );
}

function RulesOpenHandIcon() {
  return (
    <svg viewBox="0 0 18.5714 20" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.23356 9.10611C8.70746 9.10611 8.28096 8.68679 8.28096 8.16953V2.60189C8.28096 1.74214 7.584 1.04519 6.72426 1.04519C5.97787 1.04519 5.33306 1.57451 5.21779 2.31194C4.71644 5.51924 4.63566 8.77029 4.8553 12.0164L2.85794 11.0947C1.84324 10.7247 0.707975 11.1654 0.223985 12.1171C-0.214735 12.9798 0.00567888 14.0257 0.756915 14.646L6.22083 19.1576C6.62924 19.4947 7.1231 19.7147 7.64924 19.7754C10.222 20.0724 12.7376 20.0749 15.3094 19.7829C15.8761 19.7184 16.4236 19.4831 16.762 19.024C19.0919 15.8629 18.6211 8.58536 18.3099 3.78757C18.2623 3.05464 17.6543 2.48487 16.9197 2.48487C16.1533 2.48487 15.5319 3.10624 15.5319 3.87273V8.09416C15.5319 8.61141 15.1054 9.03074 14.5793 9.03074C14.0531 9.03074 13.6267 8.61141 13.6267 8.09416V1.72027C13.6267 0.770192 12.8565 0 11.9064 0C10.9564 0 10.1862 0.770192 10.1862 1.72027V8.16953C10.1862 8.68679 9.75967 9.10611 9.23356 9.10611ZM4.76283 10.1248C4.78103 10.7378 4.81146 11.3657 4.85536 12.0148C6.61386 12.2139 7.78923 12.9747 8.40391 14.2924C8.62326 14.7626 9.18873 14.9689 9.66693 14.7533C10.1451 14.5376 10.355 13.9816 10.1357 13.5115C9.12153 11.3375 7.1384 10.3218 4.76283 10.1248Z"
        fill="#CC9881"
      />
    </svg>
  );
}

function RulesWebBrowserIcon() {
  return (
    <svg viewBox="0 0 19.2916 19.2837" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.49452 4.76463C2.4345 4.96173 2.39243 5.16607 2.37025 5.37573C2.06706 8.24136 2.06706 11.0423 2.37025 13.908C2.53499 15.4651 3.79726 16.73 5.3584 16.9023C8.24165 17.2203 11.0499 17.2203 13.9332 16.9023C15.4942 16.73 16.7565 15.4651 16.9214 13.908C17.2245 11.0423 17.2245 8.24136 16.9214 5.37573C16.8991 5.16607 16.8571 4.96173 16.7971 4.76463H2.49452ZM14.1681 0.251492C11.1287 -0.0838312 8.16285 -0.0838298 5.12342 0.251492C2.566 0.533636 0.510486 2.5869 0.239282 5.15027C-0.0797612 8.16579 -0.0797598 11.1179 0.239282 14.1334C0.510487 16.6967 2.566 18.75 5.12342 19.0321C8.16285 19.3676 11.1287 19.3676 14.1681 19.0321C16.7255 18.75 18.7811 16.6967 19.0522 14.1334C19.3714 11.1179 19.3714 8.16579 19.0522 5.15027C18.7811 2.5869 16.7255 0.533636 14.1681 0.251492ZM11.7868 13.0357C11.7868 12.444 11.3071 11.9643 10.7153 11.9643H5.6724C5.08068 11.9643 4.60098 12.444 4.60098 13.0357C4.60098 13.6274 5.08068 14.1071 5.6724 14.1071H10.7153C11.3071 14.1071 11.7868 13.6274 11.7868 13.0357ZM5.67243 7.85714C5.0807 7.85714 4.601 8.33684 4.601 8.92857C4.601 9.5203 5.0807 10 5.67243 10H13.6189C14.2106 10 14.6902 9.5203 14.6902 8.92857C14.6902 8.33684 14.2106 7.85714 13.6189 7.85714H5.67243Z"
        fill="#A37F9E"
      />
    </svg>
  );
}

const ruleColumns = [
  {
    label: "Requirements",
    pillClass: "creators-rules-pill-requirements",
    Icon: RulesReceiptCheckIcon,
    items: [
      "Disclose the partnership: add #ad at the end of your post (required even if you choose credits)",
      "Tag @gomer.com in your post",
      "Include a screenshot or screen recording of Gomer's output in Slack or Microsoft Teams",
      "Organic reach only, no boosted or promoted posts",
      "Real Gomer output from a real workspace",
    ],
  },
  {
    label: "Limits",
    pillClass: "creators-rules-pill-limits",
    Icon: RulesOpenHandIcon,
    items: [
      "4 posts per month",
      "5 days between submissions",
      "$10,000 cap per post",
      "Post must feature Gomer, not a multi-tool roundup",
    ],
  },
  {
    label: "Content",
    pillClass: "creators-rules-pill-content",
    Icon: RulesWebBrowserIcon,
    items: [
      "Blur anything sensitive: customer names, financial data, private messages",
      "Your own content from your own Slack",
      "No staged or fabricated output",
      "No pre-approval needed, post first, submit later",
    ],
  },
] as const;

function RulesColumn({
  label,
  pillClass,
  Icon,
  items,
}: {
  label: string;
  pillClass: string;
  Icon: () => ReactNode;
  items: readonly string[];
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 overflow-hidden">
      <div className={`inline-flex h-12 w-fit items-center gap-4 rounded-full px-6 ${pillClass}`}>
        <Icon />
        <span className="body-main whitespace-nowrap">{label}</span>
      </div>
      <ul className="flex flex-col gap-5 pr-4">
        {items.map((item) => (
          <li key={item} className="flex gap-4 pl-6">
            <span className="flex shrink-0 items-center py-px">
              <Icon />
            </span>
            <p className="body-main text-secondary font-medium">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Rules() {
  const [active, setActive] = useState(0);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef(new Map<number, HTMLButtonElement>());

  const activePlatform = payoutPlatforms[active];

  useLayoutEffect(() => {
    const button = mobileTabRefs.current.get(active);
    const container = mobileTabsRef.current;
    if (!button || !container) return;

    const buttonLeft = button.offsetLeft;
    const buttonWidth = button.offsetWidth;
    const containerWidth = container.clientWidth;
    const scrollTarget = buttonLeft - containerWidth / 2 + buttonWidth / 2;
    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, [active]);

  return (
    <section id="rules" className="bg-primitive-main-beige pt-14 pb-12 sm:pt-[7rem] sm:pb-[5rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-16">
          <div className="creators-rules-heading-width mx-auto flex flex-col items-center gap-4 text-center">
            <h2 className="creators-rules-heading-width font-heading h3 text-balance text-primary">
              The rules
            </h2>
            <p className="creators-rules-copy-width body-main text-secondary">
              Short. Fair. No fine print.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="w-full">
              <div className="flex w-full flex-col gap-10">
                <div className="relative overflow-hidden py-1 md:hidden">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--primitive-main-beige) 0%, transparent 100%)",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10"
                    style={{
                      background:
                        "linear-gradient(270deg, var(--primitive-main-beige) 0%, transparent 100%)",
                    }}
                  />
                  <div
                    ref={mobileTabsRef}
                    className="flex w-full gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    aria-label="Creator platforms"
                  >
                    {payoutPlatforms.map((platform, index) => {
                      const isActive = active === index;
                      const panelId = `${platform.id}-creators-rules-platforms-panel`;
                      return (
                        <button
                          key={platform.id}
                          type="button"
                          ref={(node) => {
                            if (node) mobileTabRefs.current.set(index, node);
                            else mobileTabRefs.current.delete(index);
                          }}
                          aria-pressed={isActive}
                          aria-controls={panelId}
                          onClick={() => setActive(index)}
                          className={[
                            "relative flex h-12 shrink-0 items-center justify-center gap-4 rounded-full px-[18px] body-main transition-[background,border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                            isActive ? "text-white" : "bg-secondary text-primary",
                          ].join(" ")}
                        >
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                            >
                              <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                            </span>
                          )}
                          <platform.icon
                            className={`relative z-10 size-5 shrink-0 transition-[color,opacity] duration-300 ${
                              isActive
                                ? "text-white opacity-100"
                                : "text-primitive-main-grey opacity-45"
                            }`}
                          />
                          <span className="sr-only">{platform.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="-m-3 hidden overflow-x-auto p-3 md:block">
                  <div
                    role="tablist"
                    aria-label="Creator platforms"
                    className="creators-platform-content-width creators-platform-tabs-bezel relative isolate mx-auto grid w-full grid-cols-5 overflow-visible rounded-full bg-white p-1"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1 bottom-1 left-1 z-0 overflow-hidden rounded-full transition-transform duration-500 ease-out"
                      style={{
                        width: "calc(20% - 0.1rem)",
                        transform: `translateX(${active * 100}%)`,
                      }}
                    >
                      <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                    </span>
                    {payoutPlatforms.map((platform, index) => {
                      const isActive = active === index;
                      const panelId = `${platform.id}-creators-rules-platforms-panel`;
                      const tabId = `${platform.id}-creators-rules-platforms-tab`;
                      return (
                        <button
                          key={platform.id}
                          type="button"
                          role="tab"
                          id={tabId}
                          aria-selected={isActive}
                          aria-controls={panelId}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => setActive(index)}
                          className={[
                            "cursor-pointer relative z-10 flex h-12 items-center justify-center gap-4 rounded-full px-5 body-main transition-[border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                            isActive ? "text-white" : "text-primary",
                          ].join(" ")}
                        >
                          <platform.icon
                            className={`size-5 shrink-0 opacity-50 transition-[color,opacity] duration-300 ${
                              isActive ? "text-white" : "text-primitive-main-grey"
                            }`}
                          />
                          <span className="sr-only">{platform.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              id={`${activePlatform.id}-creators-rules-platforms-panel`}
              role="tabpanel"
              aria-labelledby={`${activePlatform.id}-creators-rules-platforms-tab`}
              className="creators-rules-panel-card relative w-full overflow-hidden rounded-section p-8 md:p-16"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
                <div className="absolute inset-0 rounded-[inherit] bg-[#333]/20 mix-blend-luminosity" />
                <div className="absolute inset-0 rounded-[inherit] bg-white/20 mix-blend-plus-lighter" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{ boxShadow: HOW_IT_WORKS_CARD_SHADOW }}
              />
              <div className="relative z-10">
                <div className="flex flex-col gap-8 lg:flex-row">
                  {ruleColumns.map((column) => (
                    <RulesColumn key={column.label} {...column} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- FAQ ----------------------- */

const creatorFaqs: FAQItem[] = [
  {
    q: "Who can apply?",
    a: "Anyone with a public account on LinkedIn, X, Instagram, YouTube, or TikTok. No follower minimum. We care about the work, not the audience size.",
  },
  {
    q: "How long until I get paid?",
    a: "We verify the post within 24 hours of submission. Cash payouts go out the same day they're verified at the 30-day view checkpoint.",
  },
  {
    q: "Do I need approval before I post?",
    a: "Nope. Post first, submit second. As long as it follows the rules above, you're paid.",
  },
  {
    q: "Is there a limit per month?",
    a: "Up to $10,000 per post. No cap on the number of posts. Post a lot, earn a lot.",
  },
];

/* ----------------------- SUBMIT CTA ----------------------- */

const submitChannels = [
  { label: "Submit on LinkedIn", icon: Linkedin, href: "https://forms.gle/CT3AQ2A6zc9Bt4w1A" },
  { label: "Submit on Twitter / X", icon: Twitter, href: "https://forms.gle/evAxXmXxzZRs8o7B9" },
  { label: "Submit on Instagram", icon: Instagram, href: "https://forms.gle/5QkhJ2S6vgnfkRpJ7" },
  { label: "Submit on YouTube", icon: Youtube, href: "https://forms.gle/vvUZLjNGa57iYH5BA" },
  { label: "Submit on TikTok", icon: Music2, href: "https://ref.gomer.com/tiktok_form" },
];

function SubmitCTA() {
  return (
    <section id="submit" className="pt-14 pb-14 sm:pt-[7rem] sm:pb-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-[32px] gradient-dark-2">
            <div className="flex flex-col gap-10 p-8 md:gap-12 md:p-16">
              <div className="flex max-w-[560px] flex-col gap-6">
                <span className="inline-flex w-fit items-center rounded-full bg-white/12 px-4 py-1.5 text-sm font-medium text-white">
                  Ready to get paid
                </span>
                <h2 className="font-heading h4 text-white">
                  <span className="block">Gomer already did the work.</span>
                  <span className="block">Submit your post.</span>
                </h2>
                <p className="max-w-[480px] body-main text-white font-medium">
                  Send us the post link and an analytics screenshot showing impressions. Pick credits or
                  cash. Credits give you 50% more value on every payout.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <p className="body-small font-medium text-white/70">
                  Pick the platform you posted on to open its submission form:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {submitChannels.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-vk-track="cta_click"
                      data-vk-label={c.label}
                      className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-start gap-3 rounded-full border border-white bg-white px-10 font-medium text-primitive-main-dark transition hover:opacity-90"
                    >
                      <c.icon className="size-5 shrink-0" aria-hidden="true" />
                      <span className="font-medium">{c.label}</span>
                      <ArrowUpRight className="ml-auto size-4 shrink-0 opacity-60" aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <p className="body-small text-white/60 font-medium">
                  No follower minimum. No approvals. We review within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
