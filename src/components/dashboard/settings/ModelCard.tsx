import type { ModelBadge, ModelDefinition, ReasoningLevel } from "@/data/models";
import { ProviderIcon } from "./ProviderIcon";

const reasoningLevels: { key: ReasoningLevel; label: string }[] = [
  { key: "none", label: "N" },
  { key: "low", label: "L" },
  { key: "medium", label: "M" },
  { key: "high", label: "H" },
];

function Badge({ badge }: { badge: ModelBadge }) {
  switch (badge.type) {
    case "recommended":
      return (
        <span className="inline-flex items-center rounded-full border border-success-foreground/20 bg-success px-1.5 py-px text-xs leading-tight font-medium tracking-tight text-success-foreground">
          Recommended
        </span>
      );
    case "discount":
      return (
        <span className="inline-flex items-center rounded-full border border-warning/30 bg-warning/10 px-1.5 py-px text-xs leading-tight font-medium tracking-tight text-warning">
          {badge.value}
        </span>
      );
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
  }
}

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative inline-block size-3.5 shrink-0 rounded-full border-[1.5px] transition-[background,border-color] duration-150",
        selected ? "border-success-foreground bg-transparent" : "border-muted-foreground/40 bg-transparent",
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

function ReasoningSelector({
  value,
  disabled,
}: {
  value: ReasoningLevel;
  disabled?: boolean;
}) {
  return (
    <div className="inline-flex gap-0.5">
      {reasoningLevels.map((level) => {
        const isActive = value === level.key;
        return (
          <button
            key={level.key}
            type="button"
            disabled={disabled}
            aria-pressed={isActive}
            aria-label={`${level.label === "N" ? "None" : level.label === "L" ? "Low" : level.label === "M" ? "Medium" : "High"} reasoning`}
            className={[
              "rounded-md border px-2 py-[3px] text-xs font-medium tracking-wide outline-none transition-[background,color,border-color] duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
              disabled
                ? "cursor-not-allowed opacity-50"
                : isActive
                  ? "cursor-pointer border-border bg-accent text-foreground"
                  : "cursor-pointer border-transparent text-muted-foreground hover:border-border/60 hover:bg-accent/40 hover:text-foreground",
            ].join(" ")}
          >
            {level.label}
          </button>
        );
      })}
    </div>
  );
}

type ModelCardProps = {
  model: ModelDefinition;
  selected: boolean;
  onSelect: () => void;
};

export function ModelCard({ model, selected, onSelect }: ModelCardProps) {
  const isPreset = model.provider === "preset";
  const presetColorClass =
    model.presetColor === "success"
      ? "text-success-foreground"
      : "text-violet-600 dark:text-violet-400";
  const topBarClass =
    model.presetColor === "success"
      ? "bg-success-foreground opacity-100"
      : model.presetColor === "violet"
        ? "bg-violet-500 opacity-50"
        : "opacity-0";

  return (
    <div
      role="button"
      tabIndex={model.disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={model.disabled}
      onClick={() => !model.disabled && onSelect()}
      onKeyDown={(event) => {
        if (!model.disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onSelect();
        }
      }}
      className={[
        "relative flex min-h-[156px] w-full flex-col overflow-hidden rounded-[10px] border px-4 pt-3.5 pb-3 text-left outline-none transition-[background,border-color] duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        model.disabled
          ? "cursor-not-allowed border-border bg-card/60 opacity-60"
          : selected
            ? "cursor-pointer border-success-foreground bg-secondary"
            : "cursor-pointer border-border bg-card hover:bg-accent/40",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute inset-x-0 top-0 h-0.5 transition-opacity duration-150",
          isPreset ? topBarClass : "opacity-0",
        ].join(" ")}
      />

      <div className="mb-2 flex min-h-[18px] items-center justify-between">
        {isPreset ? (
          <span className={`text-xs font-semibold tracking-widest uppercase ${presetColorClass}`}>
            ★ {model.presetLabel}
          </span>
        ) : (
          <ProviderIcon provider={model.provider} />
        )}

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
          model.disabled ? "text-muted-foreground" : "text-foreground",
        ].join(" ")}
      >
        {model.name}
      </div>

      <div
        className={[
          "mb-auto text-xs leading-normal",
          model.disabled ? "text-muted-foreground/60" : "text-muted-foreground",
        ].join(" ")}
      >
        {model.description}
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          REASONING
        </span>
        {model.reasoning === "label" ? (
          <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {model.reasoningLabel}
          </span>
        ) : (
          <ReasoningSelector value={model.reasoning} disabled={model.disabled} />
        )}
      </div>
    </div>
  );
}
