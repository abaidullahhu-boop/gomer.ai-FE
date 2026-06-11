import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { topScheduledTasks } from "@/data/usage";

type TopScheduledTasksCardProps = {
  periodQuery: string;
};

export function TopScheduledTasksCard({ periodQuery }: TopScheduledTasksCardProps) {
  return (
    <div className="flex flex-1 flex-col rounded-[7px] border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-body text-base font-medium text-foreground">Top scheduled tasks</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Recurring tasks using the most credits
          </p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">Last 30 days</span>
      </div>

      <ul className="divide-y divide-border">
        {topScheduledTasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3 px-5 py-3.5">
            <Calendar className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
              {task.name}
            </span>
            <span className="shrink-0 text-sm font-medium tabular-nums text-secondary-foreground">
              {task.credits} credits
            </span>
          </li>
        ))}
      </ul>

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
