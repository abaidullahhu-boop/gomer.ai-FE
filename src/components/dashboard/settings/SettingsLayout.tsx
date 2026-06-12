import { NavLink, Outlet } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";

const tabs = [
  { label: "General", to: "/dashboard/settings", end: true },
  { label: "Permissions", to: "/dashboard/settings/permissions", end: false },
] as const;

export function SettingsLayout() {
  return (
    <>
      <PageMeta title="Settings — Viktor" description="Manage workspace settings." />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-5 py-8"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl leading-8 font-bold text-foreground">Settings</h1>
              </div>
            </div>

            <div role="tablist" aria-label="Settings sections" className="flex items-center gap-1">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  end={tab.end}
                  role="tab"
                  className={({ isActive }) =>
                    [
                      "viktor-focus-ring inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-[7px] border-0 px-4 py-2 text-sm font-medium whitespace-nowrap transition-[background-color,border-color,transform] duration-200 select-none active:scale-[0.98]",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-transparent text-muted-foreground hover:bg-accent",
                    ].join(" ")
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
