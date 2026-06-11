import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import comparisonTabActiveBg from "@/assets/images/download (1).svg";
import viktorAvatar from "@/assets/images/viktor-marketplace-avatar.svg";
import { SlackReactions } from "@/components/site/SlackReactions";

const sarahAvatar =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80";

const TAB_SHADOW =
  "inset 2.7px 2.7px 1.35px -2.7px white, inset -2.7px -2.7px 1.35px -2.7px white, inset 0 0 8px rgb(255 255 255 / 50%), inset 0 0 43px #f2f2f2";

const LOGO_CLASS = "block h-auto max-h-10 w-auto max-w-10 object-contain object-center lg:max-h-12 lg:max-w-12";

type TabId = "connectors" | "integrations" | "builds";

type CapabilityTab = {
  id: TabId;
  label: string;
  panelId: string;
  tabId: string;
  icon: ReactNode;
  title: string;
  body: string;
  footnote: string;
};

function ConnectorsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 17.1454 20" fill="none" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.04464 0C5.63638 0 6.11607 0.479694 6.11607 1.07143V4.75199C6.95472 4.71757 7.80355 4.69447 8.57171 4.69447C9.34055 4.69447 10.1902 4.71761 11.0296 4.75209V1.07143C11.0296 0.479694 11.5093 0 12.101 0C12.6927 0 13.1724 0.479694 13.1724 1.07143V4.8621C13.2915 4.8693 13.4083 4.8765 13.5224 4.88369C15.216 4.9903 16.6454 6.16671 16.9543 7.7855C17.4321 10.2906 16.9873 12.3665 15.9203 13.9567C14.9575 15.3914 13.5253 16.3764 11.9352 16.9354C11.9116 17.3089 11.8827 17.6749 11.8547 18.029L11.8543 18.0341C11.8273 18.3753 11.8013 18.7049 11.7807 19.0277C11.7589 19.369 11.4981 19.647 11.1588 19.6906C10.929 19.7201 10.6925 19.759 10.4369 19.8011L10.414 19.8049C9.86354 19.8956 9.23028 20 8.57271 20C7.91517 20 7.28195 19.8956 6.73155 19.8049L6.70852 19.8011C6.45291 19.759 6.21644 19.7201 5.98662 19.6906C5.64735 19.647 5.38658 19.369 5.36475 19.0277C5.34411 18.7049 5.3181 18.3753 5.29115 18.0341L5.29077 18.0291C5.26277 17.6747 5.23384 17.3086 5.21015 16.9349C3.62078 16.3757 2.18895 15.3909 1.2263 13.9566C0.159281 12.3668 -0.286163 10.2916 0.190109 7.78724C0.498124 6.16759 1.92804 4.99026 3.62224 4.88361C3.73668 4.87641 3.8538 4.86919 3.97321 4.86197V1.07143C3.97321 0.479694 4.45291 0 5.04464 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IntegrationsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 15.7207 20.0058" fill="none" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9205 1.53962C10.9889 0.496322 9.92199 -0.361731 8.88398 0.154436C5.35869 1.90742 2.33961 5.61293 0.277837 9.30163C-0.560277 10.8011 0.616723 12.4766 2.22044 12.4766H4.64225C4.23911 14.4048 4.02272 16.4544 3.89722 18.4654C3.81889 19.7206 5.25034 20.4607 6.23568 19.695C11.1134 15.9044 14.0954 11.7542 15.4873 9.10618C16.1173 7.90774 15.4133 6.49944 14.0793 6.27054C13.0124 6.08751 11.8045 5.97868 10.6333 5.91768L10.9205 1.53962Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BuildsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 19.2916 19.2837" fill="none" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.37025 5.37572C2.39243 5.16607 2.4345 4.96172 2.49452 4.76462H16.7971C16.8571 4.96172 16.8991 5.16607 16.9214 5.37572C17.2245 8.24135 17.2245 11.0423 16.9214 13.908C16.7565 15.4651 15.4942 16.7301 13.9332 16.9022C11.0499 17.2204 8.24165 17.2204 5.3584 16.9022C3.79726 16.7301 2.53499 15.4651 2.37025 13.908C2.06706 11.0423 2.06706 8.24135 2.37025 5.37572ZM5.12342 0.251492C8.16285 -0.0838307 11.1287 -0.0838307 14.1681 0.251492C16.7255 0.533636 18.7811 2.58691 19.0522 5.15027C19.3714 8.16578 19.3714 11.1179 19.0522 14.1334C18.7811 16.6968 16.7255 18.7501 14.1681 19.0322C11.1287 19.3675 8.16285 19.3675 5.12342 19.0322C2.566 18.7501 0.510487 16.6968 0.239282 14.1334C-0.0797598 11.1179 -0.0797612 8.16578 0.239282 5.15027C0.510486 2.58691 2.566 0.533636 5.12342 0.251492ZM4.29508 13.7901C4.07455 13.349 4.25332 12.8127 4.69436 12.5922C5.36188 12.2584 6.05212 11.6236 6.49506 10.9578C6.05213 10.2919 5.36188 9.65707 4.69436 9.32331C4.25332 9.10278 4.07455 8.56647 4.29508 8.12541C4.51559 7.68437 5.05192 7.5056 5.49296 7.72613C6.63898 8.29913 7.7523 9.41245 8.3253 10.5585C8.45098 10.8099 8.45098 11.1057 8.32529 11.3571C7.75229 12.5031 6.63898 13.6164 5.49296 14.1894C5.05192 14.41 4.51559 14.2311 4.29508 13.7901ZM9.70339 10.9578C9.70339 10.4646 10.1031 10.0649 10.5962 10.0649H14.1974C14.6905 10.0649 15.0902 10.4646 15.0902 10.9578C15.0902 11.4509 14.6905 11.8506 14.1974 11.8506H10.5962C10.1031 11.8506 9.70339 11.4509 9.70339 10.9578Z"
        fill="currentColor"
      />
    </svg>
  );
}

const CAPABILITY_TABS: CapabilityTab[] = [
  {
    id: "connectors",
    label: "Connectors",
    panelId: "connectors-comparison-panel",
    tabId: "connectors-comparison-tab",
    icon: <ConnectorsIcon className="size-5 shrink-0" />,
    title: "3,200+ via Managed Connectors",
    body: "Beyond the 27 native integrations, Viktor connects to 3,200+ tools through managed connectors. CRM, project management, finance, communication, analytics. If your team uses it, Viktor can reach it.",
    footnote:
      "Most connectors are one-click OAuth - pick a tool, authorize, done. Some use API keys. Either way, Viktor handles authentication and starts working. No webhooks, no Zapier zaps.",
  },
  {
    id: "integrations",
    label: "Integrations",
    panelId: "integrations-comparison-panel",
    tabId: "integrations-comparison-tab",
    icon: <IntegrationsIcon className="size-5 shrink-0" />,
    title: "27 Native Deep Integrations",
    body: "Purpose-built connections with full read/write access for tools like Stripe, GitHub, Linear, Notion, and Google Ads.",
    footnote: "Native integrations ship with deeper actions, richer context, and tighter approval flows than generic connectors.",
  },
  {
    id: "builds",
    label: "Builds Its Own",
    panelId: "builds-comparison-panel",
    tabId: "builds-comparison-tab",
    icon: <BuildsIcon className="size-5 shrink-0" />,
    title: "Viktor Builds Its Own",
    body: "Tool not in the catalog? Viktor can build a custom integration from API docs or use its browser directly.",
    footnote: "Custom connectors usually ship within a day — Viktor reads the docs, handles auth, and starts working.",
  },
];

const CONNECTOR_LOGOS: { name: string; icon: ReactNode }[] = [
  {
    name: "HubSpot",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} fill="#ff7a59" aria-hidden>
        <path d="M18.16 8.84V6.5a1.83 1.83 0 1 0-1.6 0v2.34a5.18 5.18 0 0 0-2.51.92L7.31 4.4a2.05 2.05 0 1 0-1.07 1.4l6.55 5.09a5.2 5.2 0 1 0 5.37-2.05Zm-1.6 7.92a2.6 2.6 0 1 1 2.6-2.6 2.6 2.6 0 0 1-2.6 2.6Z" />
      </svg>
    ),
  },
  {
    name: "Google Calendar",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="2" fill="#fff" stroke="#4285F4" strokeWidth="1.5" />
        <path d="M3 9h18" stroke="#4285F4" strokeWidth="1.5" />
        <rect x="7" y="2" width="2" height="4" rx="1" fill="#4285F4" />
        <rect x="15" y="2" width="2" height="4" rx="1" fill="#4285F4" />
        <rect x="7" y="12" width="3" height="3" rx="0.5" fill="#34A853" />
        <rect x="11" y="12" width="3" height="3" rx="0.5" fill="#FBBC04" />
        <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#EA4335" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className={`${LOGO_CLASS} max-w-14 lg:max-w-16`} aria-hidden>
        <rect x="2" y="6" width="20" height="12" rx="3" fill="#FF0000" />
        <path d="M10 9.5v5l5-2.5-5-2.5z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Airtable",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path d="M12 3 3 7.5v2.2L12 14l9-4.3V7.5L12 3z" fill="#FCB400" />
        <path d="M3 11.5V18l9 4.5 9-4.5v-6.5l-9 4.3-9-4.3z" fill="#18BFFF" />
        <path d="M12 14 3 9.7V18l9 4.5V14z" fill="#F82B60" opacity="0.85" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <defs>
          <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FD5949" />
            <stop offset="50%" stopColor="#D6249F" />
            <stop offset="100%" stopColor="#285AEB" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#ig)" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#0A66C2" />
        <path fill="#fff" d="M7 10v7H5v-7h2zm-1-2.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zM19 17v-4.2c0-2.2-1.2-3.2-2.8-3.2-1.3 0-1.9.7-2.2 1.4V10h-2v7h2v-3.8c0-1 .6-1.6 1.5-1.6 1 0 1.5.7 1.5 1.7V17H19z" />
      </svg>
    ),
  },
  {
    name: "Apollo",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.5 6.4 20.5l2.1-6.7L3 9.8h6.8L12 3z" fill="#F5C518" />
      </svg>
    ),
  },
  {
    name: "Attio",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <circle cx="8" cy="8" r="3" fill="#5B8DEF" />
        <circle cx="16" cy="8" r="3" fill="#7B61FF" />
        <circle cx="8" cy="16" r="3" fill="#FF6B6B" />
        <circle cx="16" cy="16" r="3" fill="#34D399" />
      </svg>
    ),
  },
  {
    name: "ClickUp",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path d="M6 5h12v3.5L12 14 6 8.5V5z" fill="#7B68EE" />
        <path d="M6 10.5 12 16l6-5.5V19H6v-8.5z" fill="#49CCF9" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <circle cx="14" cy="5" r="3" fill="#F24E1E" />
        <circle cx="14" cy="11" r="3" fill="#A259FF" />
        <circle cx="8" cy="11" r="3" fill="#1ABCFE" />
        <circle cx="14" cy="17" r="3" fill="#0ACF83" />
        <rect x="5" y="8" width="6" height="6" rx="3" fill="#FF7262" />
      </svg>
    ),
  },
  {
    name: "GitLab",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path d="M12 21 3 9l2.2-6.8h13.6L21 9 12 21z" fill="#E24329" />
        <path d="M12 21 8.5 9h7L12 21z" fill="#FC6D26" />
        <path d="M12 21 3 9h9l0 12z" fill="#FCA326" />
        <path d="M12 21 21 9H12l0 12z" fill="#FC6D26" />
      </svg>
    ),
  },
  {
    name: "Gmail",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path d="M4 6h16v12H4V6z" fill="#fff" />
        <path d="M4 6l8 6 8-6v12H4V6z" fill="#EA4335" opacity="0.15" />
        <path d="M4 6l8 6 8-6" stroke="#EA4335" strokeWidth="1.5" fill="none" />
        <path d="M4 6h7l1 1H4zm9-1h7v2l-8 6-1-1 8-6V5z" fill="#FBBC04" />
        <path d="M12 12l8-6v11H4V6l8 6z" fill="#34A853" opacity="0.2" />
      </svg>
    ),
  },
  {
    name: "Slack",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#E01E5A" d="M6 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm2 0a2 2 0 1 0 4 0V6a2 2 0 1 0-4 0v8z" />
        <path fill="#36C5F0" d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 2a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4h-8z" />
        <path fill="#2EB67D" d="M18 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm-2 0a2 2 0 1 0-4 0v8a2 2 0 1 0 4 0v-8z" />
        <path fill="#ECB22E" d="M14 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0-2a2 2 0 1 0 0-4H6a2 2 0 1 0 0 4h8z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#26A5E4" />
        <path d="M7 12.2 16.2 8 9.5 15.2l1.8-3 4.9-2.2-8.2 4.4z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Asana",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <circle cx="7" cy="12" r="4" fill="#F06A6A" />
        <circle cx="12" cy="12" r="4" fill="#FC636B" />
        <circle cx="17" cy="12" r="4" fill="#FF8A8F" />
      </svg>
    ),
  },
];

const NATIVE_LOGOS: { name: string; icon: ReactNode }[] = [
  {
    name: "Stripe",
    icon: (
      <svg viewBox="0 0 60 25" className={`${LOGO_CLASS} max-w-14 lg:max-w-16`} aria-hidden>
        <path fill="#635BFF" d="M54.6 11.2c0-1.8-1.5-2.5-4-2.5-3.6 0-8.2 1.1-11.8 3V2.4C43.4.9 47.6 0 52.2 0 61.2 0 66 3.4 66 10.2 0 24.8-9.2 20.6-9.2 23.4c0 .9.8 1.2 1.9 1.2 1.6 0 3.6-.6 5.2-1.5v4.6c-1.7.7-3.4 1-5.2 1-4.1 0-6.8-2.1-6.8-5.7 0-5.8 7.4-4.8 7.4-7.1z" transform="scale(0.85) translate(2,2)" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className={`${LOGO_CLASS} brightness-0`} fill="#111" aria-hidden>
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    name: "Linear",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#5E6AD2" d="M3 17.3 17.3 3l3.7 3.7L6.7 21 3 17.3zm0-6.6L10.7 3l3.7 3.7L6.7 14.4 3 10.7z" />
      </svg>
    ),
  },
  {
    name: "Notion",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#000" d="M4.5 3.2 12 1.5l7.5 1.7v15.1L12 21.5 4.5 18.4V3.2zm1.4 1.5v12.6l5.1 2.2V6.9L5.9 4.7zm6.5 2.2v11.8l5.1-2.2V6.9l-5.1-2.2z" />
      </svg>
    ),
  },
  {
    name: "Google Ads",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#FBBC04" d="M12 2.5 3.5 17h5.5l3-5.2 3 5.2H20.5L12 2.5z" />
        <circle cx="6.5" cy="18.5" r="2.5" fill="#4285F4" />
        <circle cx="17.5" cy="18.5" r="2.5" fill="#34A853" />
      </svg>
    ),
  },
  {
    name: "Google Drive",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#4285F4" d="M8.4 3 1.2 15.5h6.8L15.2 3H8.4z" />
        <path fill="#0F9D58" d="M8.4 3 1.2 15.5h14.4L22.8 3H8.4z" />
        <path fill="#FFBA00" d="M1.2 15.5 8.4 3l6.8 12.5H1.2z" />
      </svg>
    ),
  },
  {
    name: "PostHog",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#F54E00" d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
      </svg>
    ),
  },
  {
    name: "Meta",
    icon: (
      <svg viewBox="0 0 60 34" className="h-auto max-h-10 w-auto max-w-[4.75rem] object-contain lg:max-h-12 lg:max-w-[5.25rem]" aria-hidden>
        <path fill="#0081FB" d="M7.5 19.5c-3.2 0-5.5-2.6-5.5-6.2 0-4.2 2.8-7.3 6.2-7.3 2.5 0 4.1 1.5 4.8 3.5.7-2 2.3-3.5 4.8-3.5 3.4 0 6.2 3.1 6.2 7.3 0 3.6-2.3 6.2-5.5 6.2-2.6 0-4.2-1.8-5-4.2-.8 2.4-2.4 4.2-5 4.2z" />
      </svg>
    ),
  },
  {
    name: "Salesforce",
    icon: (
      <svg viewBox="0 0 48 32" className={LOGO_CLASS} aria-hidden>
        <path fill="#00A1E0" d="M14 8c-2 0-3.8 1-4.9 2.5C7.8 9.5 6 8.5 4 8.5 1.8 8.5 0 10.3 0 12.5S1.8 16.5 4 16.5c2 0 3.8-1 4.9-2.5 1.1 1.5 2.9 2.5 4.9 2.5 3.3 0 6-2.7 6-6s-2.7-6-6-6zm20 0c-2 0-3.8 1-4.9 2.5C27.8 9.5 26 8.5 24 8.5c-2.2 0-4 1.8-4 4s1.8 4 4 4c2 0 3.8-1 4.9-2.5 1.1 1.5 2.9 2.5 4.9 2.5 3.3 0 6-2.7 6-6s-2.7-6-6-6z" />
      </svg>
    ),
  },
  {
    name: "Sentry",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#362D59" d="M12 2 2 20h7.5l2.5-4.5L12 20l5-8.5L20 20h2L12 2z" />
      </svg>
    ),
  },
  {
    name: "Square",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="3" fill="#000" />
        <rect x="9" y="9" width="6" height="6" rx="1" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Webflow",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#146EF5" d="M4 6h4.5l2 9.5L13 6h3.5l-1.5 7.5L18 6H22l-4 12h-4l1.5-7-2.5 7H9L4 6z" />
      </svg>
    ),
  },
  {
    name: "Wix",
    icon: (
      <svg viewBox="0 0 48 20" className={LOGO_CLASS} aria-hidden>
        <text x="0" y="16" fill="#000" fontSize="14" fontWeight="700" fontFamily="sans-serif">
          Wix
        </text>
      </svg>
    ),
  },
  {
    name: "Monday",
    icon: (
      <svg viewBox="0 0 48 20" className={LOGO_CLASS} aria-hidden>
        <circle cx="8" cy="10" r="5" fill="#FF3D57" />
        <circle cx="20" cy="10" r="5" fill="#FFCB00" />
        <circle cx="32" cy="10" r="5" fill="#00CA72" />
      </svg>
    ),
  },
  {
    name: "Microsoft OneDrive",
    icon: (
      <svg viewBox="0 0 24 24" className={LOGO_CLASS} aria-hidden>
        <path fill="#0078D4" d="M6 16h14a3 3 0 0 0 .2-6 4.5 4.5 0 0 0-8.6-1.5A3.5 3.5 0 0 0 6 16z" />
        <path fill="#28A8EA" d="M4 17.5A4 4 0 0 1 3 10a4.5 4.5 0 0 1 8.8-1.2A3.8 3.8 0 0 1 17 16H6.5A2.5 2.5 0 0 1 4 17.5z" opacity="0.85" />
      </svg>
    ),
  },
];

function GlassBorderLayers() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background: "radial-gradient(100% 100%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(-56deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.6) 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(5px)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, rgb(255, 255, 255) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "4px",
          }}
        />
      </div>
    </>
  );
}

function GlassIconTile({ name, icon }: { name: string; icon: ReactNode }) {
  return (
    <div className="relative aspect-square w-full max-w-[86px] justify-self-center rounded-section sm:max-w-[98px] lg:max-w-[117px] lg:rounded-section">
      <div className="relative size-full overflow-hidden rounded-[inherit] bg-white/4 backdrop-blur-sm">
        <GlassBorderLayers />
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <div className="flex size-full items-center justify-center p-3">
            {icon}
            <span className="sr-only">{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoGrid({ logos, label }: { logos: { name: string; icon: ReactNode }[]; label: string }) {
  return (
    <div className="flex w-full justify-center">
      <div
        className="mx-auto grid w-fit max-w-full grid-cols-[repeat(3,minmax(0,5.375rem))] justify-center gap-2 sm:grid-cols-[repeat(5,minmax(0,6.125rem))] lg:grid-cols-[repeat(5,minmax(0,7.3125rem))]"
        aria-label={label}
      >
        {logos.map((logo) => (
          <GlassIconTile key={logo.name} name={logo.name} icon={logo.icon} />
        ))}
      </div>
    </div>
  );
}

function FadeStack({ activeIndex, children }: { activeIndex: number; children: ReactNode[] }) {
  return (
    <div className="grid grid-cols-1">
      {children.map((child, index) => (
        <div
          key={index}
          aria-hidden={index !== activeIndex}
          inert={index !== activeIndex ? true : undefined}
          className={[
            "col-start-1 row-start-1 transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            index === activeIndex
              ? "z-10 opacity-100 blur-0 motion-reduce:blur-0"
              : "pointer-events-none z-0 opacity-0 blur-md motion-reduce:blur-0",
          ].join(" ")}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

type TabIndicator = { left: number; width: number };

function ComparisonTabActiveBackground({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <img aria-hidden alt="" src={comparisonTabActiveBg} className={className} style={style} />;
}

function BuildsSlackPreview() {
  return (
    <div className="relative w-full rounded-section">
      <div className="relative size-full min-h-[inherit] overflow-hidden rounded-[inherit] bg-white">
        <GlassBorderLayers />
        <div className="relative z-[2] flex h-full w-full flex-col justify-between">
          <div className="slack-on-light min-h-full">
            <div className="flex w-full min-w-0 flex-col justify-end gap-2 p-3 sm:p-4">
              <div className="relative isolate flex w-full gap-2 rounded-lg border border-solid border-transparent bg-transparent px-[var(--slack-message-pad-x)] py-0 text-left">
                <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primitive-purple-100">
                  <img alt="Sarah Chen" loading="lazy" width={36} height={36} className="size-full object-cover" src={sarahAvatar} />
                </div>
                <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                    <span className="body-small font-medium text-slack">Sarah Chen</span>
                    <span className="text-xs font-normal text-slack-secondary">8:03 AM</span>
                  </div>
                  <div className="body-main font-normal text-slack">
                    <span className="inline-block rounded-sm bg-slack-mention px-1 py-0.5 align-baseline whitespace-nowrap text-sm leading-snug text-slack-mention">
                      @Viktor
                    </span>
                    I need data from [obscure internal tool]. Here&apos;s the API docs:{" "}
                    <span className="text-slack-mention underline decoration-solid">[link]</span>
                  </div>
                  <SlackReactions initial={[{ emoji: "⏳", count: 1 }]} />
                </div>
              </div>

              <div
                data-variant="viktor"
                data-highlighted="true"
                className="relative isolate flex w-full gap-2 overflow-hidden px-[var(--slack-message-pad-x)] py-[var(--slack-message-pad-y)] text-left slack-message-viktor"
              >
                <div aria-hidden="true" className="slack-viktor-bg-mount">
                  <div className="slack-viktor-layer-glass-stack" />
                  <div className="slack-viktor-layer-inner-depth-soft" />
                  <div className="slack-viktor-layer-inner-glow-overlay" />
                  <div className="slack-viktor-layer-feather-blur" />
                  <div className="slack-viktor-layer-white-sheet" />
                </div>
                <div className="relative z-[1] flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-transparent">
                  <img alt="Viktor" loading="lazy" width={36} height={36} className="size-full object-cover" src={viktorAvatar} />
                </div>
                <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-0">
                  <div className="mb-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0">
                    <span className="body-small font-medium text-slack">
                      <span className="inline-flex items-center gap-1.5">
                        <span>Viktor</span>
                        <span className="inline-flex items-center rounded-sm bg-slack-app-badge px-1 py-px text-[12px] leading-tight font-normal tracking-wide text-slack-app-badge uppercase">
                          APP
                        </span>
                      </span>
                    </span>
                    <span className="text-xs font-normal text-slack-secondary">8:04 AM</span>
                  </div>
                  <div className="body-main font-normal text-slack">
                    Got it. I&apos;ve built a custom connector for [tool]. I can now pull and push data. Want me to set up a daily sync?
                  </div>
                  <SlackReactions
                    initial={[
                      { emoji: "✅", count: 2 },
                      { emoji: "🚀", count: 1 },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityVisual({ tabId }: { tabId: TabId }) {
  if (tabId === "builds") return <BuildsSlackPreview />;
  if (tabId === "integrations") return <LogoGrid logos={NATIVE_LOGOS} label="Native integration examples" />;
  return <LogoGrid logos={CONNECTOR_LOGOS} label="Connector examples" />;
}

export function IntegrationsCapabilitiesSection() {
  const [active, setActive] = useState(0);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const desktopTabsRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef(new Map<number, HTMLButtonElement>());
  const desktopTabRefs = useRef(new Map<number, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<TabIndicator | null>(null);

  const updateIndicator = useCallback(() => {
    const container = desktopTabsRef.current;
    const button = desktopTabRefs.current.get(active);
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    setIndicator({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    });
  }, [active]);

  useLayoutEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

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

  const activeTab = CAPABILITY_TABS[active];

  return (
    <section className="bg-primitive-main-beige pt-14 sm:pt-[7rem] pb-14 sm:pb-[7rem]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:gap-16">
          <h2 className="max-w-5xl text-center font-heading h3 text-balance text-primary">
            If it exists, Viktor connects to it.
            <br />
            If it doesn&apos;t, Viktor builds it.
          </h2>

          <div className="flex w-full flex-col gap-10">
            {/* Mobile tabs */}
            <div className="relative overflow-hidden py-1 md:hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10"
                style={{
                  background: "linear-gradient(90deg, var(--primitive-main-beige) 0%, transparent 100%)",
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10"
                style={{
                  background: "linear-gradient(270deg, var(--primitive-main-beige) 0%, transparent 100%)",
                }}
              />
              <div
                ref={mobileTabsRef}
                className="flex w-full gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Integration capabilities"
              >
                {CAPABILITY_TABS.map((tab, index) => {
                  const isActive = active === index;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      ref={(node) => {
                        if (node) mobileTabRefs.current.set(index, node);
                        else mobileTabRefs.current.delete(index);
                      }}
                      aria-pressed={isActive}
                      aria-controls={tab.panelId}
                      onClick={() => setActive(index)}
                      className={[
                        "relative flex shrink-0 items-center justify-center gap-4 rounded-full text-center whitespace-nowrap transition-[background,border-color,color] duration-300 h-12 px-[18px] body-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                        isActive ? "text-white" : "text-primary bg-secondary",
                      ].join(" ")}
                    >
                      {isActive && (
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                          <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                        </span>
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        <span
                          className={`transition-[color,opacity] duration-300 ${isActive ? "text-white opacity-100 font-medium" : "text-primitive-main-grey font-medium opacity-45"}`}
                        >
                          {tab.icon}
                        </span>
                        <span>{tab.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop tabs */}
            <div className="-m-3 hidden overflow-x-auto p-3 md:block">
              <div
                ref={desktopTabsRef}
                role="tablist"
                aria-label="Integration capabilities"
                className="relative isolate mx-auto grid w-full max-w-[846px] min-w-[640px] grid-cols-3 overflow-visible rounded-full bg-white p-1"
                style={{ boxShadow: TAB_SHADOW }}
              >
                {indicator && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1 bottom-1 z-0 overflow-hidden rounded-full transition-[left,width] duration-500 ease-out"
                    style={{ left: indicator.left, width: indicator.width }}
                  >
                    <ComparisonTabActiveBackground className="block h-full w-full object-fill" />
                  </span>
                )}
                {CAPABILITY_TABS.map((tab, index) => {
                  const isActive = active === index;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      id={tab.tabId}
                      aria-selected={isActive}
                      aria-controls={tab.panelId}
                      tabIndex={isActive ? 0 : -1}
                      ref={(node) => {
                        if (node) desktopTabRefs.current.set(index, node);
                        else desktopTabRefs.current.delete(index);
                      }}
                      onClick={() => setActive(index)}
                      className={[
                        "relative z-10 flex items-center justify-center gap-4 rounded-full bg-transparent text-center whitespace-nowrap transition-[border-color,color] duration-300 h-12 body-main px-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primitive-purple-500",
                        isActive ? "text-white font-medium" : "text-primary font-medium",
                      ].join(" ")}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        <span
                          className={`transition-[color,opacity] duration-300 ${isActive ? "text-white opacity-50 font-medium" : "text-primitive-main-grey font-medium opacity-50"}`}
                        >
                          {tab.icon}
                        </span>
                        <span className="font-medium">{tab.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="touch-pan-y">
              <article
                role="tabpanel"
                id={activeTab.panelId}
                aria-labelledby={activeTab.tabId}
                className="dark flex flex-col gap-8 overflow-hidden rounded-section p-6 text-white bg-hero sm:p-10 lg:min-h-[583px] lg:flex-row lg:justify-between lg:gap-10 lg:p-16"
              >
                <div className="relative max-w-[458px] flex-1 lg:min-h-[455px]">
                  <FadeStack activeIndex={active}>
                    {CAPABILITY_TABS.map((tab) => (
                      <div
                        key={tab.id}
                        className="flex flex-col gap-5 lg:justify-between lg:gap-10"
                      >
                        <h3 className="max-w-[374px] font-heading h4 text-white">{tab.title}</h3>
                        <p className="max-w-[349px] body-main text-white/75">{tab.body}</p>
                      </div>
                    ))}
                  </FadeStack>
                </div>

                <div className="relative w-full max-w-[619px] flex-1 lg:min-h-[455px]">
                  <FadeStack activeIndex={active}>
                    {CAPABILITY_TABS.map((tab) => (
                      <div
                        key={tab.id}
                        className="flex flex-col gap-8 lg:min-h-[455px] lg:justify-between lg:gap-10"
                      >
                        <CapabilityVisual tabId={tab.id} />
                      </div>
                    ))}
                  </FadeStack>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
