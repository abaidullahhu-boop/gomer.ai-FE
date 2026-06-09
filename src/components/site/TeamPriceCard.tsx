import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ConicPriceCardShell } from "@/components/site/ConicPriceCardShell";
import { GetStartedButton } from "@/components/site/GetStartedButton";

const teamFeatures = [
  "Slack-native agent in threads + mentions",
  "Persistent workspace context",
  "Integrations + tool execution",
  "Scheduled tasks & crons (reports, audits, proactive check-ins)",
  "Drafts + artifacts (updates, tickets/docs where supported)",
];

type CreditOption = {
  id: string;
  label: string;
  price: number;
};

type CreditTier =
  | { type: "option"; option: CreditOption }
  | { type: "header"; label: string };

const creditTiers: CreditTier[] = [
  { type: "option", option: { id: "20k", label: "20,000 credits monthly", price: 50 } },
  { type: "option", option: { id: "30k", label: "30,000 credits monthly", price: 75 } },
  { type: "option", option: { id: "40k", label: "40,000 credits monthly", price: 100 } },
  { type: "option", option: { id: "80k", label: "80,000 credits monthly", price: 200 } },
  { type: "header", label: "SMALL-SIZED COMPANIES" },
  { type: "option", option: { id: "125k", label: "125,000 credits monthly", price: 300 } },
  { type: "option", option: { id: "250k", label: "250,000 credits monthly", price: 600 } },
  { type: "option", option: { id: "500k", label: "500,000 credits monthly", price: 1200 } },
];

const creditOptions = creditTiers
  .filter((tier): tier is Extract<CreditTier, { type: "option" }> => tier.type === "option")
  .map((tier) => tier.option);

const DROPDOWN_ANIM_MS = 220;

function PricingCheckIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="10" cy="10" r="10" fill={`url(#${gradientId})`} />
      <path
        d="M4.72949 9.13671L8.55569 12.9629L15.2684 4.51221"
        stroke="white"
        strokeWidth="2.155"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.72"
      />
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(12.1144 19.8937 -24.9614 15.2009 5.83333 0.625)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBB98" />
          <stop offset="0.43" stopColor="#9E84FF" />
          <stop offset="0.74" stopColor="#6E47FF" />
          <stop offset="1" stopColor="#150079" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function CreditsDropdown({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (option: CreditOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [panelAnimated, setPanelAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = creditOptions.find((option) => option.id === selectedId) ?? creditOptions[0];

  useEffect(() => {
    if (open) {
      setPanelVisible(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelAnimated(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setPanelAnimated(false);
    const timer = window.setTimeout(() => setPanelVisible(false), DROPDOWN_ANIM_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer flex w-full items-center justify-between rounded-full border border-[#d8d0ff] bg-white px-5 py-3.5 text-left text-sm font-medium text-primitive-main-dark transition-[border-color,box-shadow] duration-200 hover:border-[#c4b8ff] focus:outline-none focus:ring-2 focus:ring-primitive-purple-500/20"
      >
        <span>{selected.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-primitive-main-grey transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {panelVisible && (
        <div
          role="listbox"
          aria-label="Shared workspace credits"
          className={`credits-dropdown-scroll credits-dropdown-panel absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[280px] overflow-y-auto rounded-[20px] bg-white p-2 shadow-[0_8px_32px_rgba(26,24,43,0.12)] ring-1 ring-black/[0.04] ${panelAnimated ? "credits-dropdown-panel-open" : "credits-dropdown-panel-closed"}`}
        >
          {creditTiers.map((tier, index) => {
            if (tier.type === "header") {
              return (
                <div
                  key={tier.label}
                  className={`px-3 pb-1.5 pt-3 text-[10px] font-semibold tracking-[0.08em] text-primitive-main-grey ${index > 0 ? "mt-1" : ""}`}
                >
                  {tier.label}
                </div>
              );
            }

            const { option } = tier;
            const isSelected = option.id === selectedId;

            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[#f3f0ff] text-primitive-purple-500"
                    : "text-primitive-main-dark hover:bg-[#faf9ff]"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {isSelected && <PricingCheckIcon />}
                </span>
                <span className="flex-1 font-medium">{option.label}</span>
                <span className={`shrink-0 tabular-nums ${isSelected ? "text-primitive-main-grey" : "text-primitive-main-grey"}`}>
                  ${option.price}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TeamPriceCard() {
  const [selectedId, setSelectedId] = useState(creditOptions[0].id);
  const selected = creditOptions.find((option) => option.id === selectedId) ?? creditOptions[0];

  return (
    <ConicPriceCardShell className="gap-4 text-sm text-primitive-main-dark" contentClassName="flex flex-col gap-4 p-8">
      <div className="text-sm font-semibold text-primitive-purple-500">Team</div>

      <div className="flex items-end gap-1">
        <span className="font-display text-5xl leading-none tracking-tight">${selected.price}</span>
        <span className="mb-1.5 text-sm text-primitive-main-grey">/ month</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-primitive-main-grey">Shared workspace credits</span>
        <CreditsDropdown
          selectedId={selectedId}
          onSelect={(option) => setSelectedId(option.id)}
        />
      </div>

      <GetStartedButton variant="team" fullWidth className="py-3.5" />

      <ul className="flex flex-col gap-3.5 pt-1">
        {teamFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-primitive-main-dark">
            <PricingCheckIcon className="mt-0.5 size-5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </ConicPriceCardShell>
  );
}
