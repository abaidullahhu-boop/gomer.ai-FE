import { Link, useSearchParams } from "react-router-dom";
import { Calendar, ChevronDown, Settings } from "lucide-react";
import { scheduledTaskRows } from "@/data/usage";

export function ScheduledTasksTable() {
  const [searchParams] = useSearchParams();
  const period = searchParams.get("period") ?? "last_30_days";

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <button
          type="button"
          className="gomer-focus-ring inline-flex min-h-10 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98] sm:w-auto"
        >
          <Calendar className="size-4 shrink-0" strokeWidth={1.5} />
          Show system tasks only
        </button>

        <div className="min-w-0 sm:w-1/4">
          <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-[7px] border border-border bg-muted px-3 py-[5px]">
            <input
              type="text"
              name="usage-scheduled-tasks-user-filter"
              placeholder="All users"
              autoComplete="off"
              className="h-7 min-w-[80px] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <div className="relative flex min-w-[916px] flex-col">
          <div className="flex items-stretch border-b border-border text-sm font-medium text-secondary-foreground">
            <div className="flex min-w-0 flex-1 items-center px-4 py-3">
              <span className="leading-5">Scheduled Task Name</span>
            </div>
            <button
              type="button"
              aria-sort="none"
              className="group flex w-[120px] shrink-0 items-center gap-1.5 px-4 py-3 text-left transition-colors hover:text-foreground"
            >
              <span className="whitespace-nowrap leading-5">Total Runs</span>
              <ChevronDown className="size-3 opacity-30 transition-opacity group-hover:opacity-70" />
            </button>
            <button
              type="button"
              aria-sort="none"
              className="group flex w-[160px] shrink-0 items-center gap-1.5 px-4 py-3 text-left transition-colors hover:text-foreground"
            >
              <span className="whitespace-nowrap leading-5">Last activity</span>
              <ChevronDown className="size-3 opacity-30 transition-opacity group-hover:opacity-70" />
            </button>
            <div className="flex w-[200px] shrink-0 items-center px-4 py-3">
              <span className="leading-5">Created by</span>
            </div>
            <button
              type="button"
              aria-sort="descending"
              className="group flex w-[160px] shrink-0 items-center gap-1.5 px-4 py-3 text-left text-foreground transition-colors hover:text-foreground"
            >
              <span className="whitespace-nowrap leading-5">Total credits used</span>
              <ChevronDown className="size-3 opacity-100" />
            </button>
            <div className="w-[56px] shrink-0" aria-hidden="true" />
          </div>

          {scheduledTaskRows.map((task) => {
            const activityHref = `/dashboard/usage/activity?period=${period}&crons=${encodeURIComponent(JSON.stringify([task.cronPath]))}&kind=scheduled_task`;

            return (
              <Link
                key={task.id}
                to={activityHref}
                className="flex h-14 items-stretch border-b border-border text-sm transition-colors last:border-b-0 hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none"
              >
                <div className="flex min-w-0 flex-1 items-center px-4 py-3">
                  <span className="truncate font-medium text-foreground">{task.name}</span>
                </div>
                <div className="flex w-[120px] shrink-0 items-center px-4 py-3">
                  <span className="whitespace-nowrap tabular-nums text-secondary-foreground">
                    {task.totalRuns}
                  </span>
                </div>
                <div className="flex w-[160px] shrink-0 items-center px-4 py-3">
                  <span className="whitespace-nowrap text-muted-foreground">{task.lastActivity}</span>
                </div>
                <div className="flex w-[200px] shrink-0 items-center gap-2 px-4 py-3">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-highlight/15">
                    <img
                      alt=""
                      className="size-full object-cover"
                      src={task.createdBy.avatarUrl}
                    />
                  </span>
                  <span className="truncate font-medium text-secondary-foreground">
                    {task.createdBy.name}
                  </span>
                </div>
                <div className="flex w-[160px] shrink-0 items-center px-4 py-3">
                  <span className="whitespace-nowrap font-medium tabular-nums text-secondary-foreground">
                    {task.totalCredits} credits
                  </span>
                </div>
                <div className="flex w-[56px] shrink-0 items-center justify-center px-2 py-3">
                  <button
                    type="button"
                    aria-label={`Manage task: ${task.name}`}
                    title="Manage task"
                    onClick={(event) => event.preventDefault()}
                    className="gomer-focus-ring flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Settings className="size-4" />
                  </button>
                </div>
              </Link>
            );
          })}

          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-14 border-b border-border last:border-b-0" />
          ))}
        </div>
      </div>
    </div>
  );
}
