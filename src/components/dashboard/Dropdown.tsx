import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  value: string;
  options: readonly DropdownOption[];
  onChange: (value: string) => void;
  "aria-label": string;
  className?: string;
};

export function Dropdown({
  value,
  options,
  onChange,
  "aria-label": ariaLabel,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const selectedIndex = options.findIndex((option) => option.value === value);
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [open, options, value]);

  function selectOption(option: DropdownOption) {
    onChange(option.value);
    setOpen(false);
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % options.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + options.length) % options.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) selectOption(option);
    }
  }

  return (
    <div ref={ref} className={["relative", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        className="gomer-focus-ring flex h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-[7px] border border-border bg-muted px-4 text-sm font-medium text-foreground transition-[border-color,box-shadow] duration-150 hover:border-border/80"
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={ariaLabel}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="absolute top-[calc(100%+4px)] right-0 left-0 z-50 overflow-hidden rounded-[7px] border border-border bg-popover py-1 shadow-[0_4px_16px_rgba(26,24,43,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
                className={[
                  "flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2 text-left text-sm text-foreground transition-colors",
                  isActive ? "bg-secondary" : "bg-popover",
                ].join(" ")}
              >
                <span className="truncate">{option.label}</span>
                {isSelected ? (
                  <Check className="size-4 shrink-0 text-foreground" strokeWidth={2} aria-hidden />
                ) : (
                  <span className="size-4 shrink-0" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
