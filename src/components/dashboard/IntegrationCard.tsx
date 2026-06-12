import { Loader2 } from "lucide-react";
import { IntegrationIcon } from "./IntegrationIcon";

type IntegrationCardProps = {
  name: string;
  iconUrl?: string;
  /** Secondary line under the name, e.g. "2 accounts connected". */
  subtitle?: string;
  connected?: boolean;
  busy?: boolean;
  onClick?: () => void;
};

export function IntegrationCard({
  name,
  iconUrl,
  subtitle,
  connected = false,
  busy = false,
  onClick,
}: IntegrationCardProps) {
  const hasImageIcon = iconUrl || name in BUILTIN_ICON_NAMES;

  return (
    <button
      type="button"
      disabled={busy}
      onClick={onClick}
      className="gomer-focus-ring flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-sm border border-border bg-card p-3 text-left transition-[background-color,border-color,transform] duration-150 hover:bg-accent active:scale-[0.98] disabled:cursor-default disabled:opacity-70"
    >
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-card ${hasImageIcon ? "p-1" : ""}`}
      >
        <IntegrationIcon name={name} iconUrl={iconUrl} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-5 text-foreground">{name}</p>
        {subtitle && (
          <span className="flex items-center gap-1.5 text-xs leading-4 text-muted-foreground">
            {connected && <span className="size-1.5 shrink-0 rounded-full bg-highlight" />}
            <span className="truncate">{subtitle}</span>
          </span>
        )}
      </div>

      {busy && (
        <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden />
      )}
    </button>
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
