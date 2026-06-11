import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { accountData } from "@/data/account";

const workspace = {
  name: accountData.slack.workspaceName,
  email: accountData.email.allowedEmails[0],
  avatar: accountData.slack.avatar,
};

export function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Switch workspace"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        className="viktor-focus-ring group flex w-full cursor-pointer items-center gap-2.5 rounded-[7px] border border-sidebar-border bg-sidebar-background/40 px-2.5 py-2 text-left text-foreground transition-colors hover:bg-sidebar-accent"
      >
        <img
          alt={workspace.name}
          className="size-6 shrink-0 rounded-[7px] border border-sidebar-border bg-sidebar-background object-cover"
          loading="lazy"
          src={workspace.avatar}
        />
        <span className="min-w-0 flex-1 truncate text-sm font-medium">{workspace.name}</span>
        <ChevronsUpDown className="size-[18px] shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Workspaces"
          className="absolute top-[calc(100%+4px)] right-0 left-0 z-50 overflow-hidden rounded-[7px] border border-border bg-white py-1 shadow-[0_4px_16px_rgba(26,24,43,0.08)]"
        >
          <div
            role="menuitem"
            aria-current="true"
            className="flex items-center gap-2.5 px-2.5 py-2"
          >
            <img
              alt={workspace.name}
              className="size-6 shrink-0 rounded-[7px] border border-sidebar-border bg-sidebar-background object-cover"
              loading="lazy"
              src={workspace.avatar}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">{workspace.name}</div>
              <div className="truncate text-xs text-muted-foreground">{workspace.email}</div>
            </div>
            <Check className="size-4 shrink-0 text-highlight" strokeWidth={2.5} aria-hidden />
          </div>

          <div className="mx-2.5 border-t border-border" />

          <button
            type="button"
            role="menuitem"
            className="viktor-focus-ring flex w-full cursor-pointer items-center gap-2.5 px-2.5 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-[#F4F4F5]"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-dashed border-border">
              <Plus className="size-3.5 text-muted-foreground" strokeWidth={2} aria-hidden />
            </span>
            Add workspace
          </button>
        </div>
      ) : null}
    </div>
  );
}
