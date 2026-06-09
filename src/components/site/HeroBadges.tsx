import { useEffect, useState, type ReactNode } from "react";

const iconClass = "size-5 shrink-0";

export function CoinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={iconClass} aria-hidden="true">
      <g opacity="0.5" fill="currentColor">
        <path d="M15.403 1.53687L15.3809 1.51479C13.9792 0.113128 12.1922 -0.299302 10.2382 0.20911C8.33003 0.70559 6.27473 2.07099 4.17286 4.17284C2.07099 6.27471 0.705597 8.33001 0.209119 10.2382C0.0725881 10.7629 0.00246034 11.2756 6.30673e-05 11.772C-0.00643744 13.1241 0.489523 14.3554 1.51474 15.3807C2.91641 16.7823 4.70337 17.1947 6.65737 16.6863C8.56553 16.1899 10.6208 14.8244 12.7227 12.7226C14.8246 10.6207 16.19 8.5654 16.6864 6.65726C17.1921 4.71356 16.7869 2.93517 15.403 1.53687Z" />
        <path d="M18.2587 4.39263L18.4853 4.6192C19.8869 6.02086 20.2993 7.80781 19.7909 9.76183C19.6916 10.1433 19.5576 10.5308 19.39 10.9232L17.3421 8.87539C17.6446 8.2537 17.8803 7.6312 18.042 7.00996C18.2737 6.11926 18.3486 5.23901 18.2587 4.39263Z" />
        <path d="M18.718 12.2321C18.1153 13.242 17.308 14.2783 16.313 15.3283L14.1992 13.2146C15.1596 12.2041 15.9816 11.1781 16.6319 10.146L18.718 12.2321Z" />
        <path d="M15.3224 16.3186C14.2717 17.3137 13.2347 18.1206 12.2242 18.7226L10.1383 16.6367C11.171 15.9869 12.1976 15.1651 13.2087 14.2048L15.3224 16.3186Z" />
        <path d="M10.9144 19.3937L8.86687 17.3461C8.24806 17.6467 7.62846 17.881 7.01007 18.0419C6.1193 18.2736 5.23897 18.3486 4.3925 18.2586L4.6192 18.4853C6.02086 19.8869 7.80781 20.2993 9.76183 19.7909C10.1405 19.6923 10.525 19.5596 10.9144 19.3937Z" />
      </g>
    </svg>
  );
}

export function CreditCardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={iconClass} aria-hidden="true">
      <g opacity="0.5" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M14.6866 0.313814C14.2681 -0.104605 13.5897 -0.104605 13.1713 0.313814C12.7529 0.732233 12.7529 1.41062 13.1713 1.82904L14.9137 3.57144L13.1713 5.31381C12.7529 5.73223 12.7529 6.41063 13.1713 6.82904C13.5897 7.24746 14.2681 7.24746 14.6866 6.82904L16.429 5.08667L18.1711 6.82884C18.5896 7.24727 19.2679 7.24727 19.6863 6.82884C20.1047 6.41043 20.1047 5.73203 19.6863 5.31361L17.9441 3.57144L19.6863 1.82924C20.1047 1.41082 20.1047 0.73243 19.6863 0.314011C19.268 -0.104407 18.5896 -0.104407 18.1711 0.314011L16.429 2.05621L14.6866 0.313814ZM11.9086 8.09173C10.8863 7.06936 10.8007 5.46493 11.6519 4.3451C10.9136 4.30794 10.1228 4.28589 9.28571 4.28589C5.95984 4.28589 4.44051 4.56681 3.09029 4.8182C2.89307 4.85493 2.70333 4.89024 2.51217 4.92386C1.12592 5.16767 0 6.36439 0 7.86087V9.17637H18.5714V8.90609C17.9634 8.82989 17.3753 8.55837 16.9084 8.09153L16.429 7.61204L15.9493 8.09173C14.8334 9.20751 13.0244 9.20751 11.9086 8.09173ZM0 16.4103V10.9621H18.5714V16.4103C18.5714 17.9321 17.3953 19.1237 15.9863 19.375C15.821 19.4044 15.6561 19.4351 15.4859 19.4669L15.4811 19.4679C14.1309 19.7193 12.6116 20 9.28571 20C5.95986 20 4.44053 19.7191 3.09031 19.4677C2.91831 19.4357 2.75197 19.4047 2.58513 19.375C1.17609 19.1237 0 17.9321 0 16.4103ZM12.2217 14.1288C11.7286 14.1288 11.3288 14.5286 11.3288 15.0216C11.3288 15.5147 11.7286 15.9144 12.2217 15.9144H15.1253C15.6183 15.9144 16.0181 15.5147 16.0181 15.0216C16.0181 14.5286 15.6183 14.1288 15.1253 14.1288H12.2217Z" />
      </g>
    </svg>
  );
}

export function Soc2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={iconClass} aria-hidden="true">
      <g opacity="0.5" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.10746 0.108826C7.81167 0.28318 6.2465 0.7724 4.9648 1.22955C4.14854 1.52069 3.41396 1.81138 2.88367 2.02915C2.61828 2.13814 2.40347 2.22911 2.25447 2.29307C2.17997 2.32504 2.12187 2.35028 2.08211 2.36767L2.03644 2.38771L2.02436 2.39305L2.02107 2.39449L2.02013 2.39492C2.02003 2.39497 2.01967 2.39512 2.30968 3.04788L2.02013 2.39492C1.9989 2.40435 1.97768 2.41502 1.95747 2.42647L2.30968 3.04788C1.95747 2.42647 1.95666 2.42694 1.95583 2.42741L1.95413 2.42838L1.95064 2.43039L1.94326 2.43474L1.92686 2.44474C1.91521 2.45201 1.90217 2.46049 1.88786 2.47031C1.8592 2.48995 1.82553 2.51485 1.78767 2.54594C1.71181 2.60824 1.62006 2.69464 1.51876 2.81219C1.3158 3.04771 1.07862 3.40347 0.853064 3.93304C0.429008 4.92864 0.0422208 6.54699 0.000244141 9.17189H9.10746V0.108826ZM0.0791055 10.9576C0.44511 13.7848 1.98286 15.803 3.80381 17.212C5.54868 18.5622 7.56634 19.3669 9.10746 19.8359V10.9576H0.0791055ZM10.8932 19.8912C12.4486 19.4302 14.5205 18.6144 16.2962 17.2069C18.0775 15.7949 19.5679 13.7775 19.9231 10.9576H10.8932V19.8912ZM19.9998 9.17189H10.8932V0.108909C12.1888 0.283336 13.7537 0.772473 15.0352 1.22955C15.8515 1.52069 16.5861 1.81138 17.1164 2.02915C17.3818 2.13814 17.5965 2.22911 17.7455 2.29307C17.8201 2.32504 17.8781 2.35028 17.9179 2.36767L17.9635 2.38771L17.9756 2.39305L17.9789 2.39449L17.9799 2.39492C17.9799 2.39497 17.9804 2.39512 17.6904 3.04788C18.0425 2.42647 18.0434 2.42694 18.0442 2.42741L18.0459 2.42838L18.0494 2.43039L18.0568 2.43474L18.0732 2.44474C18.0848 2.45201 18.0978 2.46049 18.1122 2.47031C18.1408 2.48995 18.1745 2.51485 18.2124 2.54594C18.2882 2.60824 18.3799 2.69464 18.4812 2.81219C18.6842 3.04771 18.9214 3.40347 19.1469 3.93304C19.5711 4.92864 19.9578 6.54699 19.9998 9.17189ZM17.6904 3.04788L18.0425 2.42647C18.0224 2.41502 18.0012 2.40435 17.9799 2.39492L17.6904 3.04788Z" />
      </g>
    </svg>
  );
}

export function LightningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={iconClass} aria-hidden="true">
      <g opacity="0.5" fill="currentColor">
        <path d="M11.25 0.625L3.75 11.25H9.375L8.125 19.375L16.875 7.5H10.625L11.25 0.625Z" />
      </g>
    </svg>
  );
}

export function SlackAppDirectoryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={iconClass} aria-hidden="true">
      <g fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.65689 0.686515C5.69502 0.472444 7.82352 0.357117 9.99979 0.357117C12.1714 0.357117 14.2625 0.47953 16.2995 0.690157C17.8252 0.847908 19.0818 2.00209 19.3019 3.5454C19.5186 5.0642 19.6426 6.64696 19.6426 8.26147C19.6426 9.86736 19.5066 11.4236 19.2944 12.927C19.0736 14.4905 17.8038 15.6733 16.2502 15.831C14.2886 16.0303 12.2632 16.159 10.1698 16.1655C8.70482 17.8053 7.49113 18.679 5.48476 19.5801C5.26373 19.6794 5.00746 19.6598 4.80405 19.5283C4.60063 19.3965 4.47782 19.1708 4.47782 18.9285V15.8381L4.15689 15.8083L3.84579 15.7793C2.27276 15.6328 0.905386 14.4745 0.678439 12.8443C0.471919 11.3608 0.356934 9.83406 0.356934 8.26147C0.356934 6.63626 0.471722 5.03572 0.693276 3.50139C0.913238 1.97809 2.15375 0.844394 3.65689 0.686515ZM14.1711 5.3616C14.5364 5.03029 14.5638 4.46563 14.2325 4.1004C13.9012 3.73517 13.3366 3.70769 12.9713 4.03899C11.7845 5.11556 10.8931 6.08309 10.1405 7.25766C9.59251 8.11306 9.13115 9.05806 8.67941 10.2034L7.06935 8.54303C6.72606 8.18902 6.16081 8.18032 5.80681 8.5236C5.45281 8.86687 5.44411 9.43213 5.78738 9.78615L8.38478 12.4647C8.60043 12.6871 8.91596 12.7818 9.21845 12.715C9.52092 12.6481 9.76715 12.4293 9.86899 12.1367C10.4693 10.4122 11.0023 9.2228 11.6441 8.22099C12.2824 7.22467 13.0526 6.37626 14.1711 5.3616Z" />
      </g>
    </svg>
  );
}

export const landingHeroBadges = [
  { label: "$100 in free credits", icon: <CoinIcon /> },
  { label: "No credit card required", icon: <CreditCardIcon /> },
  { label: "SOC 2 compliant", icon: <Soc2Icon /> },
] as const;

export const enterpriseHeroBadges = [
  { label: "Slack App Directory", icon: <SlackAppDirectoryIcon /> },
  { label: "$100 in free credits", icon: <CoinIcon /> },
  { label: "No credit card required", icon: <CreditCardIcon /> },
  { label: "Free pilot credits", icon: <CoinIcon /> },
  { label: "SOC 2 compliant", icon: <Soc2Icon /> },
] as const;

export const pricingHeroBadges = [
  { label: "Start free with $100 in credits", icon: <CoinIcon /> },
  { label: "No credit card, no strings", icon: <CreditCardIcon /> },
  { label: "Upgrade when you're ready", icon: <LightningIcon /> },
] as const;

function BadgeItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center text-white gap-4.5 ${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

export function HeroBadgeItem({
  icon,
  label,
  variant = "plain",
  className,
}: {
  icon: ReactNode;
  label: string;
  variant?: "plain" | "circle";
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-sm ${className ?? ""}`}>
      {variant === "circle" ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white">
          {icon}
        </span>
      ) : (
        icon
      )}
      <span>{label}</span>
    </div>
  );
}

const HERO_BADGE_INTERVAL_MS = 3000;

function EnterpriseHeroPoint({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-4">
      <span className="inline-flex text-[#1B182A33]">{icon}</span>
      <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.4] text-primitive-main-dark">
        {label}
      </p>
    </div>
  );
}

export function EnterpriseHeroPoints({
  badges = enterpriseHeroBadges,
}: {
  badges?: readonly { label: string; icon: ReactNode }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((i) => (i + 1) % badges.length),
      HERO_BADGE_INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, [badges.length]);

  const activeBadge = badges[activeIndex];

  return (
    <div className="flex w-full max-w-[706px] flex-col justify-center gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-8">
      <div aria-hidden="true" className="relative h-12 w-full shrink-0 overflow-hidden sm:hidden">
        <div className="h-12 overflow-hidden">
          <div key={activeIndex} className="flex h-12 min-h-12 w-full animate-logo-slide-up items-center justify-center gap-4">
            <span className="inline-flex text-[#1B182A33]">{activeBadge.icon}</span>
            <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.4] text-primitive-main-dark">
              {activeBadge.label}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden flex-row flex-wrap items-center justify-center gap-6 sm:flex sm:gap-8">
        {badges.map((badge) => (
          <EnterpriseHeroPoint key={badge.label} icon={badge.icon} label={badge.label} />
        ))}
      </div>
    </div>
  );
}

export function HeroBadges({ badges = landingHeroBadges }: { badges?: readonly { label: string; icon: ReactNode }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((i) => (i + 1) % badges.length),
      HERO_BADGE_INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, [badges.length]);

  const activeBadge = badges[activeIndex];

  return (
    <>
      <div className="md:hidden mt-16 pb-3 flex justify-center text-white/85 text-sm">
        <div className="h-5 overflow-hidden">
          <BadgeItem key={activeIndex} className="animate-logo-slide-up">
            {activeBadge.icon}
            <span>{activeBadge.label}</span>
          </BadgeItem>
        </div>
      </div>

      <div className="hidden md:flex mt-20 pb-3 flex-wrap justify-center items-center gap-8 text-white/85 text-sm">
        {badges.map((badge) => (
          <BadgeItem key={badge.label}>
            {badge.icon}
            <span>{badge.label}</span>
          </BadgeItem>
        ))}
      </div>
    </>
  );
}
