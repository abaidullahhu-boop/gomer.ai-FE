import { NavLink } from "react-router-dom";
import { CircleHelp, Gift, ShieldCheck, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";
import {
  AccountIcon,
  BillingIcon,
  HomeIcon,
  IntegrationIcon,
  ScheduledTasksIcon,
  SettingsIcon,
  SpacesIcon,
  TeamIcon,
  UsageIcon,
  WrenchIcon,
} from "./NavIcons";
import { ProfileMenu } from "./ProfileMenu";
import { GomerLogo } from "./GomerLogo";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { useSession } from "@/lib/session";

type NavIcon = LucideIcon | ((props: SVGProps<SVGSVGElement>) => React.ReactNode);

type NavItem = {
  label: string;
  to: string;
  icon: NavIcon;
  end?: boolean;
};

const mainNav: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: HomeIcon, end: true },
  { label: "Integrations", to: "/dashboard/integrations", icon: IntegrationIcon },
  { label: "Skills", to: "/dashboard/skills", icon: WrenchIcon },
  { label: "Spaces", to: "/dashboard/spaces", icon: SpacesIcon },
  { label: "Scheduled Tasks", to: "/dashboard/tasks", icon: ScheduledTasksIcon },
  { label: "Team", to: "/dashboard/team", icon: TeamIcon },
  { label: "Usage", to: "/dashboard/usage", icon: UsageIcon },
  { label: "Billing", to: "/dashboard/billing", icon: BillingIcon },
  { label: "Account", to: "/dashboard/account", icon: AccountIcon },
  { label: "Settings", to: "/dashboard/settings", icon: SettingsIcon },
];

/** Shown only to workspace admins, between Billing and Account. */
const adminNavItem: NavItem = { label: "Admin", to: "/dashboard/admin", icon: ShieldCheck };

function NavItemLink({
  label,
  to,
  icon: Icon,
  end,
  onNavigate,
}: NavItem & { onNavigate?: () => void }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "gomer-focus-ring flex items-center gap-3 rounded-[7px] px-3 py-2.5 text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-sidebar-accent text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary-foreground",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`size-md shrink-0 ${isActive ? "opacity-100" : "opacity-50"}`}
            strokeWidth={isActive && label === "Dashboard" ? 0 : 1.5}
            fill={isActive && label === "Dashboard" ? "currentColor" : "none"}
          />
          {label}
        </>
      )}
    </NavLink>
  );
}

function SecondaryButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="gomer-focus-ring font-body flex w-full cursor-pointer items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-sm font-medium text-sidebar-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-primary-foreground"
    >
      <Icon className="size-[18px] shrink-0 opacity-50" strokeWidth={1.5} />
      {label}
    </button>
  );
}

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  onGetFreeCredits?: () => void;
  onInviteTeammates?: () => void;
};

function MobileMenuIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <path
        d="M0 1H20M0 5H20M0 9H20M0 13H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MobileMenuButton({ open, onClick }: { open?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className="gomer-focus-ring flex size-10 cursor-pointer items-center justify-center text-foreground"
    >
      {open ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 2L12 12M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <MobileMenuIcon />
      )}
    </button>
  );
}

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
  onGetFreeCredits,
  onInviteTeammates,
}: SidebarProps) {
  const { user } = useSession();
  const nav =
    user?.role === "admin"
      ? [
          ...mainNav.slice(0, mainNav.length - 2),
          adminNavItem,
          ...mainNav.slice(mainNav.length - 2),
        ]
      : mainNav;
  return (
    <aside
      className={[
        "fixed z-50 flex h-full w-[220px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar-background [--font-sans:Gellix,ui-sans-serif,sans-serif] font-sans transition-transform duration-200 ease-in-out md:relative md:z-auto md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      <div className="shrink-0 px-5 pt-6 pb-4">
        <GomerLogo />
      </div>

      <div className="px-3 pb-2">
        <WorkspaceSwitcher />
      </div>

      <div className="sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden pt-1">
        <nav className="flex-1 space-y-0.5 px-3">
          {nav.map((item) => (
            <NavItemLink key={item.to} {...item} onNavigate={onMobileClose} />
          ))}
        </nav>

        <div className="mx-5 my-2 border-t border-dotted border-border" />

        <div className="space-y-0.5 px-3 pb-2">
          <NavLink
            to="/support"
            onClick={onMobileClose}
            className={({ isActive }) =>
              [
                "gomer-focus-ring flex items-center gap-3 rounded-[7px] px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary-foreground",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <CircleHelp
                  className={`size-[18px] shrink-0 ${isActive ? "opacity-100" : "opacity-50"}`}
                  strokeWidth={1.5}
                />
                Support
              </>
            )}
          </NavLink>
          <SecondaryButton
            label="Get free credits"
            icon={Gift}
            onClick={() => {
              onMobileClose?.();
              onGetFreeCredits?.();
            }}
          />
          <SecondaryButton
            label="Invite teammates"
            icon={UserPlus}
            onClick={() => {
              onMobileClose?.();
              onInviteTeammates?.();
            }}
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-sidebar-border px-3 pt-3 pb-4">
        <ProfileMenu />
      </div>
    </aside>
  );
}
