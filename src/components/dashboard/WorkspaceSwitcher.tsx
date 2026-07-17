import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useSession } from "@/lib/session";

function WorkspaceTile({ name }: { name: string }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-sidebar-border bg-[#1a182b] text-xs font-bold text-white">
      {name.charAt(0).toUpperCase() || "?"}
    </span>
  );
}

export function WorkspaceSwitcher() {
  const { user, workspaces, currentWorkspace, loading, switchToWorkspace, addWorkspace } =
    useSession();
  const [open, setOpen] = useState(false);
  const [switchingTo, setSwitchingTo] = useState<string | null>(null);
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

  const currentName = currentWorkspace?.name ?? (loading ? "Loading…" : "No workspace");

  async function handleSwitch(workspaceId: string) {
    if (switchingTo || workspaceId === currentWorkspace?.workspaceId) {
      setOpen(false);
      return;
    }
    setSwitchingTo(workspaceId);
    try {
      await switchToWorkspace(workspaceId);
      setOpen(false);
    } catch (error) {
      console.error("Failed to switch workspace", error);
    } finally {
      setSwitchingTo(null);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Switch workspace"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        className="gomer-focus-ring group flex w-full cursor-pointer items-center gap-2.5 rounded-[7px] border border-sidebar-border bg-sidebar-background/40 px-2.5 py-2 text-left text-foreground transition-colors hover:bg-sidebar-accent"
      >
        <WorkspaceTile name={currentName} />
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{currentName}</span>
        <ChevronsUpDown className="size-[18px] shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Workspaces"
          className="absolute top-[calc(100%+4px)] right-0 left-0 z-50 overflow-hidden rounded-[7px] border border-border bg-popover py-1 shadow-[0_4px_16px_rgba(26,24,43,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          {workspaces.map((workspace) => {
            const isCurrent = workspace.workspaceId === currentWorkspace?.workspaceId;
            return (
              <button
                key={workspace.workspaceId}
                type="button"
                role="menuitem"
                aria-current={isCurrent || undefined}
                disabled={switchingTo !== null}
                onClick={() => void handleSwitch(workspace.workspaceId)}
                className="gomer-focus-ring flex w-full cursor-pointer items-center gap-2.5 px-2.5 py-2 text-left transition-colors hover:bg-[#F4F4F5] disabled:cursor-wait"
              >
                <WorkspaceTile name={workspace.name} />
                <div className="min-w-0 flex-1">
                  <div
                    className={`truncate text-sm text-foreground ${isCurrent ? "font-semibold" : "font-medium"}`}
                  >
                    {switchingTo === workspace.workspaceId ? "Switching…" : workspace.name}
                  </div>
                  {isCurrent ? (
                    <div className="truncate text-xs text-muted-foreground">
                      {user?.email ?? ""}
                    </div>
                  ) : null}
                </div>
                {isCurrent ? (
                  <Check className="size-4 shrink-0 text-highlight" strokeWidth={2.5} aria-hidden />
                ) : null}
              </button>
            );
          })}

          <div className="mx-2.5 border-t border-border" />

          <button
            type="button"
            role="menuitem"
            onClick={addWorkspace}
            className="gomer-focus-ring flex w-full cursor-pointer items-center gap-2.5 px-2.5 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
