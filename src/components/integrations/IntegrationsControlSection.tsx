import type { ReactNode } from "react";
import soc2Badge from "@/assets/images/soc2.svg";
import gdprBadge from "@/assets/images/gdpr.svg";
import ccpaBadge from "@/assets/images/ccpa.svg";
import casaTier3Badge from "@/assets/images/casa-tier-3.svg";

const controlCardShadow =
  "shadow-[inset_2.702px_2.702px_1.351px_-2.702px_white,inset_-2.702px_-2.702px_1.351px_-2.702px_white,inset_0_0_8.106px_0_rgb(255_255_255/50%),inset_0_0_43.232px_0_#f2f2f2]";

const securityBadges = [
  { src: soc2Badge, alt: "AICPA SOC" },
  { src: gdprBadge, alt: "GDPR" },
  { src: ccpaBadge, alt: "CCPA" },
  { src: casaTier3Badge, alt: "CASA Tier 3 certified" },
];

const controlCards: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <FingerprintIcon />,
    title: "OAuth, not passwords.",
    body: "Viktor authenticates through official OAuth flows. We never see or store your passwords. Disconnect any integration with one click.",
  },
  {
    icon: <ShieldSecurityIcon />,
    title: "SOC 2 compliant.",
    body: "SOC 2 Type 1 certified. Your data never trains AI models. Enterprise-grade security from day one.",
  },
  {
    icon: <ReceiptCheckIcon />,
    title: "Approval before action.",
    body: "Viktor asks before doing anything risky. Sensitive actions require your explicit approval. You're always in control.",
  },
  {
    icon: <KeyholeShieldIcon />,
    title: "Per-tool permissions.",
    body: "Connect only what you need. Each integration has granular scopes. Viktor only accesses what you authorize.",
  },
];

function ControlCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <article
      className={`relative flex min-h-[15.75rem] flex-col gap-8 overflow-hidden rounded-section bg-white py-8 pr-10 pl-8 ${controlCardShadow} sm:pr-16`}
    >
      {icon}
      <div className="flex flex-col gap-3">
        <h3 className="body-medium text-primary">{title}</h3>
        <p className="body-main text-secondary">{body}</p>
      </div>
    </article>
  );
}

export function IntegrationsControlSection() {
  return (
    <section className="relative overflow-visible bg-primitive-main-beige py-14 sm:py-[7rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-11.625rem] left-1/2 h-[23.25rem] w-[min(73.8vw,66.5rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgb(110_71_255/0.34)_0%,rgb(158_132_255/0.24)_42%,rgb(250_245_241/0)_100%)] blur-[80px]"
      />
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16">
          <div className="flex w-full flex-col items-center gap-0 text-center font-heading h3 font-bold">
            <h2 className="text-primary">Your tools. Your data.</h2>
            <p className="text-integrations-hero-gradient">Your control.</p>
          </div>

          <div className="flex w-full flex-col items-center gap-5">
            <div className="grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {controlCards.map((card) => (
                <ControlCard key={card.title} {...card} />
              ))}
            </div>

            <div
              className="flex w-full flex-wrap items-center justify-center gap-6 overflow-hidden rounded-section p-8 sm:gap-16"
              aria-label="Compliance certifications"
            >
              {securityBadges.map((badge) => (
                <img
                  key={badge.alt}
                  alt={badge.alt}
                  loading="lazy"
                  width={48}
                  height={48}
                  decoding="async"
                  className="size-12 shrink-0 object-contain"
                  src={badge.src}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FingerprintIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8 shrink-0 object-contain">
      <g clipPath="url(#integrations-control-fingerprint-clip)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2143 0C8.96935 0 5.47813 1.50002 3.14037 4.49301C2.55755 5.23913 2.68997 6.31646 3.43611 6.89927C4.18224 7.48206 5.25957 7.34965 5.84238 6.6035C7.41774 4.58661 9.82729 3.42857 13.2143 3.42857C14.7788 3.42857 16.1253 3.67776 17.2666 4.12875C18.1472 4.47669 19.143 4.04494 19.4909 3.16441C19.8389 2.28389 19.4071 1.28803 18.5266 0.940096C16.9253 0.307353 15.142 0 13.2143 0ZM24.2475 5.91918C23.7742 5.09913 22.7259 4.81797 21.9059 5.29118C21.0858 5.76439 20.8047 6.81278 21.2779 7.6328C22.3657 9.51801 23 12.112 23 15.4477C23 16.328 22.9557 17.1591 22.8699 17.9406C22.7668 18.8817 23.4462 19.7283 24.3872 19.8315C25.3285 19.9348 26.1749 19.2555 26.2782 18.3144C26.3785 17.3986 26.4286 16.4423 26.4286 15.4477C26.4286 11.709 25.7218 8.47403 24.2475 5.91918ZM3.49874 13.5919C3.57275 12.648 2.86759 11.8228 1.92372 11.7488C0.979842 11.6748 0.154683 12.38 0.0806743 13.3238C0.0268306 14.0105 0 14.7188 0 15.4477C0 22.456 2.52585 27.7442 7.74551 29.8923C8.62105 30.2526 9.6229 29.835 9.9832 28.9593C10.3435 28.0839 9.92581 27.0821 9.05026 26.7216C5.6224 25.3111 3.42857 21.7112 3.42857 15.4477C3.42857 14.8027 3.45232 14.1841 3.49874 13.5919ZM14.948 14.0513C15.1258 13.1214 14.516 12.2235 13.586 12.0457C12.6561 11.868 11.7581 12.4778 11.5804 13.4078C11.4546 14.0659 11.3947 14.7639 11.3947 15.494C11.3947 16.3483 11.4768 17.1595 11.6508 17.9147C11.8634 18.8373 12.7837 19.4129 13.7063 19.2003C14.6289 18.9877 15.2044 18.0674 14.9918 17.1448C14.8848 16.6806 14.8232 16.132 14.8232 15.494C14.8232 14.9496 14.8681 14.4696 14.948 14.0513ZM12.0199 7.59605C12.3921 8.46661 11.9881 9.47403 11.1175 9.84622C10.0126 10.3186 9.16889 11.2838 8.75207 12.9771C8.52576 13.8964 7.59703 14.4582 6.67769 14.2319C5.75838 14.0056 5.19657 13.0769 5.42288 12.1575C6.04521 9.62949 7.49063 7.66802 9.76974 6.69367C10.6403 6.32149 11.6477 6.72549 12.0199 7.59605ZM14.4097 7.59605C14.7818 6.72549 15.7893 6.32149 16.6598 6.69367C19.918 8.08661 21.375 11.3978 21.375 15.4477C21.375 16.5317 21.2737 17.5525 21.0632 18.4972C20.8572 19.4213 19.9411 20.0034 19.017 19.7975C18.0929 19.5915 17.5107 18.6754 17.7167 17.7513C17.8645 17.0882 17.9464 16.3214 17.9464 15.4477C17.9464 12.1321 16.81 10.4866 15.3121 9.84622C14.4415 9.47403 14.0375 8.46661 14.4097 7.59605ZM6.65216 15.8166C7.58706 15.6673 8.46603 16.3041 8.61538 17.2391C8.65346 17.4775 8.69925 17.7038 8.75207 17.9184C9.06373 19.1844 9.61387 20.0263 10.288 20.5591C10.9604 21.0905 11.9039 21.4312 13.2148 21.4312C14.1987 21.4312 14.9723 21.2382 15.5733 20.9258C16.4133 20.4892 17.4483 20.8162 17.885 21.6563C18.3216 22.4963 17.9946 23.5314 17.1546 23.968C15.9835 24.5767 14.649 24.8599 13.2148 24.8599C11.2899 24.8599 9.55287 24.3481 8.16213 23.2489C6.77307 22.1512 5.87744 20.5844 5.42288 18.7379C5.34624 18.4266 5.28199 18.1071 5.22971 17.7799C5.08039 16.8449 5.71723 15.966 6.65216 15.8166ZM31.4375 22.2156C32.1387 21.5795 32.1915 20.4953 31.5554 19.7941C30.9193 19.0928 29.8352 19.0401 29.1339 19.6762C27.5611 21.1028 26.3584 22.4044 25.3394 23.9947C24.7291 24.9472 24.2018 25.9769 23.6997 27.1605L22.1765 25.5899C21.5175 24.9102 20.4322 24.8935 19.7525 25.5527C19.0728 26.2117 19.0561 27.2969 19.7152 27.9767L23.1115 31.4791C23.5255 31.9061 24.1314 32.088 24.7122 31.9595C25.2928 31.8313 25.7657 31.411 25.9611 30.8494C26.7397 28.6133 27.4199 27.1031 28.2263 25.8443C29.0261 24.5963 29.9959 23.5234 31.4375 22.2156Z"
          fill="url(#integrations-control-fingerprint-paint)"
        />
      </g>
      <defs>
        <radialGradient
          id="integrations-control-fingerprint-paint"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(2.91667 33.3926 -44.9053 12.3962 16.6583 -1.39259)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
        <clipPath id="integrations-control-fingerprint-clip">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ShieldSecurityIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8 shrink-0 object-contain">
      <g clipPath="url(#integrations-control-shield-security-clip)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.572 0.174316C12.4988 0.453284 9.99449 1.23604 7.94377 1.96748C6.63776 2.43331 5.46243 2.8984 4.61397 3.24684C4.18935 3.42122 3.84565 3.56677 3.60725 3.6691C3.48805 3.72025 3.39509 3.76064 3.33148 3.78846L3.2584 3.82053L3.23907 3.82908L3.23381 3.83139L3.2323 3.83207C3.23214 3.83214 3.23157 3.83239 3.69559 4.8768L3.2323 3.83207C3.19833 3.84716 3.16439 3.86423 3.13205 3.88254L3.69559 4.8768C3.13205 3.88254 3.13075 3.8833 3.12942 3.88405L3.1267 3.8856L3.12112 3.88883L3.10931 3.89577L3.08307 3.91177C3.06444 3.92341 3.04357 3.93699 3.02067 3.95269C2.97481 3.98412 2.92094 4.02396 2.86037 4.07369C2.739 4.17337 2.59219 4.31161 2.43011 4.49971C2.10538 4.87653 1.72589 5.44574 1.365 6.29305C0.686511 7.88601 0.0676509 10.4754 0.000488281 14.6752H14.572V0.174316ZM0.126666 17.5324C0.712273 22.0559 3.17267 25.285 6.0862 27.5394C8.87799 29.6996 12.1062 30.9872 14.572 31.7376V17.5324H0.126666ZM17.4292 31.826C19.9178 31.0884 23.2329 29.7833 26.074 27.5312C28.9241 25.272 31.3088 22.0442 31.877 17.5324H17.4292V31.826ZM31.9998 14.6752H17.4292V0.17445C19.5022 0.453533 22.006 1.23615 24.0564 1.96748C25.3625 2.43331 26.5378 2.8984 27.3863 3.24684C27.811 3.42122 28.1545 3.56677 28.3929 3.6691C28.5122 3.72025 28.605 3.76064 28.6688 3.78846L28.7417 3.82053L28.7611 3.82908L28.7664 3.83139L28.768 3.83207C28.768 3.83214 28.7687 3.83239 28.3047 4.8768C28.8681 3.88254 28.8695 3.8833 28.8708 3.88405L28.8736 3.8856L28.8791 3.88883L28.891 3.89577L28.9172 3.91177C28.9358 3.92341 28.9566 3.93699 28.9796 3.95269C29.0254 3.98412 29.0793 4.02396 29.1399 4.07369C29.2612 4.17337 29.408 4.31161 29.57 4.49971C29.8948 4.87653 30.2743 5.44574 30.6352 6.29305C31.3138 7.88601 31.9326 10.4754 31.9998 14.6752ZM28.3047 4.8768L28.8681 3.88254C28.8359 3.86423 28.802 3.84716 28.768 3.83207L28.3047 4.8768Z"
          fill="url(#integrations-control-shield-security-paint)"
        />
      </g>
      <defs>
        <radialGradient
          id="integrations-control-shield-security-paint"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(2.9166 33.0292 -44.9043 12.2613 16.6584 -1.20312)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
        <clipPath id="integrations-control-shield-security-clip">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ReceiptCheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8 shrink-0 object-contain">
      <g clipPath="url(#integrations-control-receipt-check-clip)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.98238 4.60953C3.41351 1.84041 5.83383 0 8.49568 0H23.538C26.1145 0 28.5031 1.73175 28.9694 4.43262C30.2103 11.6197 29.7364 20.783 28.7762 28.5047C28.4315 31.2779 25.1904 32.5063 23.0987 30.688L20.8865 28.7648L19.4088 30.429C17.5571 32.5145 14.338 32.5253 12.4729 30.4517L10.955 28.7643L8.84359 30.6185C6.7419 32.464 3.46999 31.2103 3.14348 28.4153C2.23106 20.6049 1.85184 11.8709 2.98238 4.60953ZM21.7234 11.6073C22.4247 10.9712 22.4775 9.88706 21.8413 9.18583C21.2052 8.48457 20.1211 8.43179 19.4198 9.06791C17.8789 10.4657 16.699 11.7423 15.6992 13.3028C15.1092 14.2236 14.5984 15.2179 14.1125 16.357L12.6595 14.8585C12.0004 14.1788 10.9151 14.1621 10.2354 14.8212C9.55571 15.4803 9.539 16.5656 10.1981 17.2453L13.5228 20.6739C13.9368 21.1009 14.5426 21.2827 15.1234 21.1544C15.7042 21.026 16.1769 20.6058 16.3724 20.0441C17.134 17.8565 17.7988 16.3812 18.5861 15.1523C19.3666 13.9341 20.3135 12.8863 21.7234 11.6073Z"
          fill="url(#integrations-control-receipt-check-paint)"
        />
      </g>
      <defs>
        <radialGradient
          id="integrations-control-receipt-check-paint"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(2.5004 33.3926 -38.4964 12.3962 16.5645 -1.39259)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
        <clipPath id="integrations-control-receipt-check-clip">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function KeyholeShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8 shrink-0 object-contain">
      <g clipPath="url(#integrations-control-keyhole-shield-clip)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.65008 0.924283C5.86569 0.698816 6.16409 0.571289 6.47604 0.571289H25.5237C25.8357 0.571289 26.134 0.698816 26.3496 0.924283C26.9738 1.57704 28.2625 2.92555 29.382 5.26711C30.5007 7.60651 31.4284 10.8882 31.4284 15.4081C31.4284 20.809 28.8618 24.5249 25.708 27.0122C22.5895 29.4714 18.8802 30.7514 16.4326 31.3912C16.2431 31.4408 16.044 31.4408 15.8544 31.3912C13.4121 30.7528 9.63442 29.4748 6.44596 27.0204C3.22345 24.5395 0.571289 20.8229 0.571289 15.4081C0.571289 10.8882 1.49905 7.60651 2.61762 5.26711C3.73719 2.92555 5.02587 1.57704 5.65008 0.924283ZM20.215 13.1426C20.215 15.3188 19.2272 16.7268 17.4288 17.1894V21.1426C17.4288 21.9316 16.7893 22.5712 16.0003 22.5712C15.2113 22.5712 14.5717 21.9316 14.5717 21.1426V17.1891C12.774 16.7262 11.7867 15.3184 11.7867 13.1426C11.7867 10.4455 13.3038 8.92843 16.0008 8.92843C18.6979 8.92843 20.215 10.4455 20.215 13.1426Z"
          fill="url(#integrations-control-keyhole-shield-paint)"
        />
      </g>
      <defs>
        <radialGradient
          id="integrations-control-keyhole-shield-paint"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(2.8125 32.1999 -43.3016 11.9535 16.6347 -0.771564)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB98" />
          <stop offset="0.0642857" stopColor="#FFBB98" />
          <stop offset="0.507143" stopColor="#9E84FF" />
          <stop offset="0.803571" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
        <clipPath id="integrations-control-keyhole-shield-clip">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
