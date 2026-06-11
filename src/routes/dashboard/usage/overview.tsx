import { useSearchParams } from "react-router-dom";
import { CreditUsageChart } from "@/components/dashboard/usage/CreditUsageChart";
import { TopScheduledTasksCard } from "@/components/dashboard/usage/TopScheduledTasksCard";
import { TopUsersCard } from "@/components/dashboard/usage/TopUsersCard";
import { usageSummary } from "@/data/usage";

export default function UsageOverview() {
  const [searchParams] = useSearchParams();
  const periodQuery = searchParams.toString() ? `?${searchParams.toString()}` : "?period=last_30_days";

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <div className="flex min-w-0 divide-x divide-border rounded-[7px] border border-border bg-card">
        <div className="flex min-w-0 flex-1 flex-col gap-1 px-4 py-4 sm:px-5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Total spend
          </span>
          <span className="font-body text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            {usageSummary.totalSpend} credits
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 px-4 py-4 sm:px-5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Burn
          </span>
          <span className="font-body text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            {usageSummary.burnPerDay} credits / day
          </span>
        </div>
      </div>

      <CreditUsageChart />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TopUsersCard periodQuery={periodQuery} />
        <TopScheduledTasksCard periodQuery={periodQuery} />
      </div>
    </div>
  );
}
