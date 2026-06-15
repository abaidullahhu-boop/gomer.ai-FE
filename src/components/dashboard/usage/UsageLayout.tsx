import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { Dropdown } from "@/components/dashboard/Dropdown";
import { PageMeta } from "@/components/PageMeta";
import { usagePeriods, type UsagePeriod } from "@/data/usage";

type UsageTab = {
  label: string;
  to: string;
  end?: boolean;
};

const tabs: UsageTab[] = [
  { label: "Overview", to: "/dashboard/usage", end: true },
  { label: "Team", to: "/dashboard/usage/team" },
  { label: "Activity", to: "/dashboard/usage/activity" },
  { label: "Scheduled Tasks", to: "/dashboard/usage/scheduled-tasks" },
];

function periodQuery(period: UsagePeriod) {
  return `?period=${period}`;
}

export function UsageLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const period = (searchParams.get("period") as UsagePeriod) ?? "last_30_days";
  return (
    <>
      <PageMeta title="Usage — Gomer" description="Track workspace credit usage." />
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-8 sm:px-12"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full min-w-0 max-w-[1000px]">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Usage</h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Dropdown
                  aria-label="Usage period"
                  value={period}
                  options={usagePeriods}
                  onChange={(nextPeriod) => {
                    const next = new URLSearchParams(searchParams);
                    next.set("period", nextPeriod);
                    setSearchParams(next);
                  }}
                  className="relative ml-auto w-fit min-w-[140px] sm:min-w-[160px]"
                />
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-4">
              <div
                role="tablist"
                aria-label="Usage sections"
                className="-mx-4 flex gap-1 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-0 sm:px-0 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
              >
                {tabs.map((tab) => (
                  <NavLink
                    key={tab.to}
                    to={`${tab.to}${periodQuery(period)}`}
                    end={tab.end}
                    role="tab"
                    className={({ isActive }) =>
                      [
                        "gomer-focus-ring inline-flex min-h-10 shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-[7px] border-0 px-4 py-2 text-sm font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]",
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

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
