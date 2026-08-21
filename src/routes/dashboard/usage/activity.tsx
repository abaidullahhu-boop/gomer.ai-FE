import { useSearchParams } from "react-router-dom";
import { useUsageContext } from "@/components/dashboard/usage/useUsageAnalytics";

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

export default function UsageActivity() {
  const [searchParams] = useSearchParams();
  const { analytics, loading } = useUsageContext();
  // The scheduled-tasks table links here with ?task=<id> to drill into one task.
  const taskFilter = searchParams.get("task");
  const all = analytics?.topTasks ?? [];
  const rows = taskFilter ? all.filter((task) => task.taskId === taskFilter) : all;

  if (!loading && analytics && rows.length === 0) {
    return (
      <div className="rounded-lg border border-border px-4 py-10 text-center text-sm text-muted-foreground">
        No scheduled task spent credits in this period.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-medium text-secondary-foreground">
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3">Last activity</th>
              <th className="px-4 py-3">Created by</th>
              <th className="px-4 py-3 text-right">Runs</th>
              <th className="px-4 py-3 text-right">Credits used</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((task) => (
              <tr key={task.taskId} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3">
                  <span className="font-medium text-foreground">{task.name}</span>
                  {!task.isActive && (
                    <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      paused
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{relativeTime(task.lastRun)}</td>
                <td className="px-4 py-3 font-medium text-secondary-foreground">
                  {task.createdByName ?? "—"}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                  {task.runs.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums text-secondary-foreground">
                  {task.credits.toLocaleString()} credits
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
