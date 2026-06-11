import { useSearchParams } from "react-router-dom";
import { scheduledTaskRows } from "@/data/usage";

export default function UsageActivity() {
  const [searchParams] = useSearchParams();
  const cronsParam = searchParams.get("crons");
  const kind = searchParams.get("kind");

  let filteredTasks = scheduledTaskRows;

  if (cronsParam && kind === "scheduled_task") {
    try {
      const crons = JSON.parse(cronsParam) as string[];
      filteredTasks = scheduledTaskRows.filter((task) => crons.includes(task.cronPath));
    } catch {
      filteredTasks = scheduledTaskRows;
    }
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
              <th className="px-4 py-3 text-right">Credits used</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 font-medium text-foreground">{task.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{task.lastActivity}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-highlight/15">
                      <img alt="" className="size-full object-cover" src={task.createdBy.avatarUrl} />
                    </span>
                    <span className="font-medium text-secondary-foreground">{task.createdBy.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums text-secondary-foreground">
                  {task.totalCredits} credits
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
