import { Link, useSearchParams } from "react-router-dom";
import { Calendar, ChevronDown, Settings } from "lucide-react";
import { useUsageContext } from "./useUsageAnalytics";

/** "3 hours ago" style label; the row has no room for a full timestamp. */
function relativeTime(iso: string | null): string {
  if (!iso) return "Never";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "Never";
  const minutes = Math.round((Date.now() - then) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/** Initials chip, since the API returns a name rather than an avatar URL. */
function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function ScheduledTasksTable() {
  const [searchParams] = useSearchParams();
  const period = searchParams.get("period") ?? "last_30_days";
  const { analytics, loading } = useUsageContext();
  const rows = analytics?.topTasks ?? [];

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

          {rows.map((task) => {
            const activityHref = `/dashboard/usage/activity?period=${period}&task=${encodeURIComponent(task.taskId)}`;

            return (
              <Link
                key={task.taskId}
                to={activityHref}
                className="flex h-14 items-stretch border-b border-border text-sm transition-colors last:border-b-0 hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none"
              >
                <div className="flex min-w-0 flex-1 items-center px-4 py-3">
                  <span className="truncate font-medium text-foreground">{task.name}</span>
                </div>
                <div className="flex w-[120px] shrink-0 items-center px-4 py-3">
                  <span className="whitespace-nowrap tabular-nums text-secondary-foreground">
                    {task.runs.toLocaleString()}
                  </span>
                </div>
                <div className="flex w-[160px] shrink-0 items-center px-4 py-3">
                  <span className="whitespace-nowrap text-muted-foreground">
                    {relativeTime(task.lastRun)}
                  </span>
                </div>
                <div className="flex w-[200px] shrink-0 items-center gap-2 px-4 py-3">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-highlight text-[10px] font-semibold text-white">
                    {task.createdByName ? initialsFor(task.createdByName) : "\u2699"}
                  </span>
                  <span className="truncate font-medium text-secondary-foreground">
                    {task.createdByName ?? "System"}
                  </span>
                </div>
                <div className="flex w-[160px] shrink-0 items-center px-4 py-3">
                  <span className="whitespace-nowrap font-medium tabular-nums text-secondary-foreground">
                    {task.credits.toLocaleString()} credits
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

          {!loading && analytics && rows.length === 0 && (
            <div className="flex h-32 items-center justify-center px-4 text-sm text-muted-foreground">
              No scheduled task spent credits in this period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
