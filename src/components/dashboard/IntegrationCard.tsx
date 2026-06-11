import type { Integration } from "@/data/integrations";
import { IntegrationIcon } from "./IntegrationIcon";

type IntegrationCardProps = {
  integration: Integration;
  onClick?: () => void;
};

export function IntegrationCard({ integration, onClick }: IntegrationCardProps) {
  const hasImageIcon = integration.iconUrl || integration.name in BUILTIN_ICON_NAMES;

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="viktor-focus-ring flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-sm border border-border bg-card p-3 text-left transition-[background-color,border-color,transform] duration-150 hover:bg-accent active:scale-[0.98]"
      >
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-white ${hasImageIcon ? "p-1" : ""}`}
        >
          <IntegrationIcon name={integration.name} iconUrl={integration.iconUrl} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-5 text-foreground">{integration.name}</p>
        </div>
      </button>
    </div>
  );
}

const BUILTIN_ICON_NAMES = new Set([
  "Google Ads",
  "Linear",
  "PostHog",
  "PostHog (EU)",
  "Sentry",
  "Google Drive",
  "GitHub (Git & CLI, Read-only)",
  "GitHub (Git & CLI)",
  "GitHub",
  "Jira & Confluence",
  "Salesforce",
  "Stripe",
  "Webflow",
  "OneDrive",
  "PayPal",
  "DeepWiki",
]);
