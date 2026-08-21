import { useSearchParams } from "react-router-dom";
import { useUsageActivity } from "@/components/dashboard/usage/useUsageAnalytics";
import type { UsageActivityEntry } from "@/lib/api";

/** "3 hours ago" style label; the table has no room for a full timestamp. */
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

/** Two letters for an avatar fallback; unattended work gets a fixed mark. */
function initialsFor(entry: UsageActivityEntry): string {
  if (!entry.user) return "SYS";
  return entry.user.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export default function UsageActivity() {
  const [searchParams] = useSearchParams();
  // The scheduled-tasks table links here with ?task=<id> to drill into one task.
  const taskFilter = searchParams.get("task") ?? undefined;
  const { entries, loading, error } = useUsageActivity(taskFilter);

  if (error) {
    return (
      <div className="rounded-lg border border-border px-4 py-10 text-center text-sm text-muted-foreground">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border px-4 py-10 text-center text-sm text-muted-foreground">
        Loading activity…
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-border px-4 py-10 text-center text-sm text-muted-foreground">
        {taskFilter
          ? "This task has not spent any credits yet."
          : "No credits have been spent in this workspace yet."}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-medium text-secondary-foreground">
              <th className="px-4 py-3">Activity</th>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3 text-right">Credits used</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3">
                  <span className="font-medium text-foreground">{entry.sourceName}</span>
                  {entry.task && (
                    <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {entry.task.name}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{relativeTime(entry.createdAt)}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    {entry.user?.avatarUrl ? (
                      <span className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-highlight/15">
                        <img alt="" className="size-full object-cover" src={entry.user.avatarUrl} />
                      </span>
                    ) : (
                      <span
                        className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${
                          entry.user ? "bg-teal-500" : "bg-highlight"
                        }`}
                      >
                        {initialsFor(entry)}
                      </span>
                    )}
                    <span className="truncate font-medium text-secondary-foreground">
                      {/* Spend with no user is the schedulers acting for the
                          workspace, not a person. */}
                      {entry.user?.name ?? "System (rules & tasks)"}
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{entry.model}</td>
                <td className="px-4 py-3 text-right font-medium tabular-nums text-secondary-foreground">
                  {entry.credits.toLocaleString()} credits
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
