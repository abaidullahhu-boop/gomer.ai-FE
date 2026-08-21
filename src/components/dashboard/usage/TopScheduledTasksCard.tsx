import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import type { UsageTaskSpend } from "@/lib/api";

type TopScheduledTasksCardProps = {
  periodQuery: string;
  /** Null until the window's figures arrive. */
  tasks: UsageTaskSpend[] | null;
  /** Length of the window the figures cover, for the header label. */
  days?: number;
};

export function TopScheduledTasksCard({ periodQuery, tasks, days }: TopScheduledTasksCardProps) {
  const rows = tasks ?? [];
  return (
    <div className="flex flex-1 flex-col rounded-[7px] border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-body text-base font-medium text-foreground">Top scheduled tasks</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Recurring tasks using the most credits
          </p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {days ? `Last ${days} days` : "\u2014"}
        </span>
      </div>

      {tasks && rows.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">
          No scheduled task spent credits in this period.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((task) => (
            <li key={task.taskId} className="flex items-center gap-3 px-5 py-3.5">
              <Calendar className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                {task.name}
              </span>
              <span className="shrink-0 text-sm font-medium tabular-nums text-secondary-foreground">
                {task.credits.toLocaleString()} credits
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto border-t border-border px-5 py-3">
        <Link
          to={`/dashboard/usage/scheduled-tasks${periodQuery}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all scheduled tasks
          <ArrowRight className="size-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
