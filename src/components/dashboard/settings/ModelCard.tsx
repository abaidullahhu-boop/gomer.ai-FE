import type { ApiModel } from "@/lib/api";
import type { ModelBadge } from "@/data/models";
import { pricePerMillionOutput } from "@/data/models";
import { ProviderIcon } from "./ProviderIcon";

function Badge({ badge }: { badge: ModelBadge }) {
  switch (badge.type) {
    case "recommended":
      return (
        <span className="inline-flex items-center rounded-full border border-success-foreground/20 bg-success px-1.5 py-px text-xs leading-tight font-medium tracking-tight text-success-foreground">
          Recommended
        </span>
      );
    case "discount":
    case "premium":
      return (
        <span className="inline-flex items-center rounded-full border border-warning/30 bg-warning/10 px-1.5 py-px text-xs leading-tight font-medium tracking-tight text-warning">
          {badge.value}
        </span>
      );
    case "beta":
      return (
        <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-1.5 py-px text-xs leading-tight font-medium tracking-tight text-violet-600 dark:text-violet-400">
          Beta
        </span>
      );
    case "deprecated":
      return (
        <span className="inline-flex items-center rounded-full border border-border bg-muted px-1.5 py-px text-xs leading-tight font-medium tracking-tight text-muted-foreground">
          Deprecated
        </span>
      );
    default:
      return null;
  }
}

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative inline-block size-3.5 shrink-0 rounded-full border-[1.5px] transition-[background,border-color] duration-150",
        selected
          ? "border-success-foreground bg-transparent"
          : "border-muted-foreground/40 bg-transparent",
      ].join(" ")}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="absolute inset-[3px] rounded-full bg-success-foreground"
        />
      )}
    </span>
  );
}

type ModelCardProps = {
  model: ApiModel;
  selected: boolean;
  /** Admins only; members see the current choice but cannot change it. */
  readOnly?: boolean;
  onSelect: () => void;
};

export function ModelCard({ model, selected, readOnly, onSelect }: ModelCardProps) {
  // A model with no configured provider, or one that cannot call tools, would
  // fail on every request — show it greyed out with the reason rather than
  // hiding it, so the choice on offer is explainable.
  const disabled = !model.available || readOnly;
  const unavailableReason = !model.supportsTools
    ? "No tool support"
    : !model.available
      ? "Not configured"
      : null;

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={() => !disabled && onSelect()}
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onSelect();
        }
      }}
      className={[
        "relative flex min-h-[156px] w-full flex-col overflow-hidden rounded-[10px] border px-4 pt-3.5 pb-3 text-left outline-none transition-[background,border-color] duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        !model.available
          ? "cursor-not-allowed border-border bg-card/60 opacity-60"
          : selected
            ? "border-success-foreground bg-secondary"
            : "border-border bg-card",
        disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-accent/40",
      ].join(" ")}
    >
      <div className="mb-2 flex min-h-[18px] items-center justify-between">
        <ProviderIcon provider={model.provider} />

        <div className="flex items-center gap-2">
          {model.badges && model.badges.length > 0 && (
            <div className="flex items-center gap-1">
              {model.badges.map((badge, index) => (
                <Badge key={index} badge={badge} />
              ))}
            </div>
          )}
          <RadioIndicator selected={selected} />
        </div>
      </div>

      <div
        className={[
          "mb-0.5 text-sm leading-tight font-medium",
          model.available ? "text-foreground" : "text-muted-foreground",
        ].join(" ")}
      >
        {model.name}
      </div>

      <div
        className={[
          "mb-auto text-xs leading-normal",
          model.available ? "text-muted-foreground" : "text-muted-foreground/60",
        ].join(" ")}
      >
        {model.description}
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {unavailableReason ?? "Output"}
        </span>
        {!unavailableReason && (
          <span className="text-xs font-medium tracking-wider text-muted-foreground">
            {pricePerMillionOutput(model.outputPricePerMillion)}
          </span>
        )}
      </div>
    </div>
  );
}
