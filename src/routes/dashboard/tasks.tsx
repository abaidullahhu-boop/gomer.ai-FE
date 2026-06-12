import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { scheduledTasks, taskCounts } from "@/data/tasks";

type TaskTab = "all" | "mine" | "system";

const tabs: { id: TaskTab; label: string; count?: number; countMuted?: boolean }[] = [
  { id: "all", label: "All tasks", count: taskCounts.all },
  { id: "mine", label: "My tasks" },
  { id: "system", label: "System tasks", count: taskCounts.system, countMuted: true },
];

function tabButtonClass(active: boolean) {
  return [
    "viktor-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 px-4 py-2 text-sm font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]",
    active
      ? "bg-secondary text-secondary-foreground hover:bg-secondary"
      : "bg-transparent text-muted-foreground hover:bg-accent",
  ].join(" ");
}

export default function DashboardTasks() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TaskTab>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return scheduledTasks.filter((task) => {
      if (tab === "all" && task.isSystem) return false;
      if (tab === "mine") return false;
      if (tab === "system" && !task.isSystem) return false;
      if (!query) return true;
      return task.name.toLowerCase().includes(query);
    });
  }, [search, tab]);

  return (
    <>
      <PageMeta
        title="Scheduled Tasks — Viktor"
        description="Manage scheduled tasks for your Viktor workspace."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Scheduled Tasks</h1>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-base leading-6 text-muted-foreground">
                Tasks can be created or modified by talking to Viktor in chat.
              </p>

              <div className="flex w-full flex-col gap-1.5">
                <div className="flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm transition-colors outline-none hover:border-border/80 focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2">
                  <div className="flex shrink-0 items-center text-muted-foreground">
                    <Search className="size-4" strokeWidth={1.5} aria-hidden />
                  </div>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tasks"
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-0.5">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={tabButtonClass(tab === item.id)}
                  >
                    {item.label}
                    {item.count !== undefined && (
                      <span
                        className={[
                          "text-xs tabular-nums",
                          item.countMuted ? "text-muted-foreground/60" : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                {filtered.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">No tasks to show.</p>
                ) : (
                  <div className="flex flex-col">
                    {filtered.map((task) => (
                      <div
                        key={task.id}
                        className="flex h-12 items-center border-b border-border text-sm last:border-b-0"
                      >
                        <span className="font-medium text-foreground">{task.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
