import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LogOut, Monitor } from "lucide-react";
import { billingData } from "@/data/billing";
import { themeLabels, useTheme } from "@/lib/theme";
import { useSession } from "@/lib/session";

const MENU_WIDTH = 260;
const MENU_GAP = 8;

type MenuPosition = {
  top: number;
  left: number;
};

export function ProfileMenu() {
  const { theme, cycleTheme } = useTheme();
  const { user, loading, signOut } = useSession();
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const name = user?.name ?? (loading ? "Loading…" : "Unknown user");
  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";

  function updateMenuPosition() {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setMenuPosition({
      top: rect.top - MENU_GAP,
      left: rect.left,
    });
  }

  useEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return;
    }

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
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

  const menu =
    open && menuPosition
      ? createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label="Profile menu"
            style={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
              width: MENU_WIDTH,
              transform: "translateY(-100%)",
            }}
            className="z-[100] overflow-hidden rounded-[7px] border border-border bg-popover shadow-[0_4px_16px_rgba(26,24,43,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
          >
            <div className="px-3.5 py-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Credits available</span>
                  <span className="text-sm text-foreground">{billingData.credits.available}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-[#FFDC61]"
                    style={{ width: `${billingData.credits.progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-0.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">Reward credits</span>
                  <span className="shrink-0 text-sm text-foreground">
                    {billingData.credits.reward}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">Reward credits never expire.</span>
              </div>
            </div>

            <div className="mx-3.5 border-t border-border" />

            <button
              type="button"
              role="menuitem"
              onClick={cycleTheme}
              className="viktor-focus-ring flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-sidebar-accent"
            >
              <Monitor className="size-[18px] shrink-0 opacity-50" strokeWidth={1.5} aria-hidden />
              Theme: {themeLabels[theme]}
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => void signOut()}
              className="viktor-focus-ring flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-[#F4F4F5]"
            >
              <LogOut className="size-[18px] shrink-0 opacity-50" strokeWidth={1.5} aria-hidden />
              Sign out
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "viktor-focus-ring flex w-full cursor-pointer items-center gap-3 rounded-[7px] px-3 py-2 text-foreground transition-all duration-150",
          open ? "bg-sidebar-accent" : "hover:bg-sidebar-accent",
        ].join(" ")}
      >
        {user?.avatarUrl ? (
          <img
            alt={name}
            src={user.avatarUrl}
            className="size-8 shrink-0 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0d9488] text-sm font-bold text-white">
            {initial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate text-left text-sm font-medium text-foreground">{name}</div>
          <div className="truncate text-left text-xs text-muted-foreground">
            {user?.email ?? ""}
          </div>
        </div>
      </button>
      {menu}
    </>
  );
}
