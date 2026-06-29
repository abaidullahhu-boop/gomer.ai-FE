import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, Pause, Play, Plus, Search } from "lucide-react";
import cronstrue from "cronstrue";
import { PageMeta } from "@/components/PageMeta";
import { TaskFormModal } from "@/components/dashboard/TaskFormModal";
import { modelLabel, taskModelOptions } from "@/lib/task-models";
import {
  createTask,
  deleteTask,
  fetchTasks,
  runTask,
  updateTask,
  type CreateTaskInput,
  type ScheduledTask,
} from "@/lib/api";

type TaskTab = "all" | "mine" | "system";

function describeCron(expression: string): string {
  try {
    return cronstrue.toString(expression, { verbose: false });
  } catch {
    return expression;
  }
}

/** Compact "3h ago" / "in 2d" style relative time from an ISO timestamp. */
function relativeTime(iso: string | null): string {
  if (!iso) return "Never";
  const diffMs = Date.now() - new Date(iso).getTime();
  const future = diffMs < 0;
  const abs = Math.abs(diffMs);
  const minutes = Math.round(abs / 60000);
  if (minutes < 1) return "just now";
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  let value: string;
  if (minutes < 60) value = `${minutes}m`;
  else if (hours < 24) value = `${hours}h`;
  else value = `${days}d`;
  return future ? `in ${value}` : `${value} ago`;
}

function tabButtonClass(active: boolean) {
  return [
    "gomer-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 px-4 py-2 text-sm font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]",
    active
      ? "bg-secondary text-secondary-foreground hover:bg-secondary"
      : "bg-transparent text-muted-foreground hover:bg-accent",
  ].join(" ");
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="w-20 shrink-0 text-muted-foreground">{label}</span>
      <span className="text-foreground">{children}</span>
    </div>
  );
}

export default function DashboardTasks() {
  const [tasks, setTasks] = useState<ScheduledTask[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TaskTab>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [busyId, setBusyId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ScheduledTask | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const load = useCallback(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err: Error) => setError(err.message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const list = tasks ?? [];
    return {
      all: list.filter((task) => !task.isSystem).length,
      mine: list.filter((task) => !task.isSystem && task.authorIsCurrentUser).length,
      system: list.filter((task) => task.isSystem).length,
    };
  }, [tasks]);

  const tabs: { id: TaskTab; label: string; count: number; countMuted?: boolean }[] = [
    { id: "all", label: "All tasks", count: counts.all },
    { id: "mine", label: "My tasks", count: counts.mine },
    { id: "system", label: "System tasks", count: counts.system, countMuted: true },
  ];

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (tasks ?? []).filter((task) => {
      if (tab === "all" && task.isSystem) return false;
      if (tab === "mine" && (task.isSystem || !task.authorIsCurrentUser)) return false;
      if (tab === "system" && !task.isSystem) return false;
      if (!query) return true;
      return task.name.toLowerCase().includes(query);
    });
  }, [tasks, search, tab]);

  function toggleExpanded(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /** Replace a task in local state with the server's updated copy. */
  function applyUpdate(updated: ScheduledTask) {
    setTasks(
      (current) => current?.map((task) => (task.id === updated.id ? updated : task)) ?? null,
    );
  }

  function openCreate() {
    setEditing(null);
    setModalError(null);
    setModalOpen(true);
  }

  function openEdit(task: ScheduledTask) {
    setEditing(task);
    setModalError(null);
    setModalOpen(true);
  }

  async function handleSubmit(input: CreateTaskInput) {
    setSubmitting(true);
    setModalError(null);
    try {
      if (editing) {
        applyUpdate(await updateTask(editing.id, input));
      } else {
        const created = await createTask(input);
        setTasks((current) => [created, ...(current ?? [])]);
      }
      setModalOpen(false);
    } catch (err) {
      setModalError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  async function withBusy(id: string, action: () => Promise<void>) {
    setBusyId(id);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  function handleTogglePause(task: ScheduledTask) {
    return withBusy(task.id, async () => {
      applyUpdate(await updateTask(task.id, { isActive: !task.isActive }));
    });
  }

  function handleModelChange(task: ScheduledTask, model: string) {
    return withBusy(task.id, async () => {
      applyUpdate(await updateTask(task.id, { model: model || null }));
    });
  }

  function handleRun(task: ScheduledTask) {
    return withBusy(task.id, async () => {
      applyUpdate(await runTask(task.id));
    });
  }

  async function handleDelete(task: ScheduledTask) {
    if (!window.confirm(`Delete "${task.name}"? This can't be undone.`)) return;
    await withBusy(task.id, async () => {
      await deleteTask(task.id);
      setTasks((current) => current?.filter((t) => t.id !== task.id) ?? null);
    });
  }

  return (
    <>
      <PageMeta
        title="Scheduled Tasks — Gomer"
        description="Manage scheduled tasks for your Gomer workspace."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h1 className="text-3xl font-bold leading-8 text-foreground">Scheduled Tasks</h1>
              <button
                type="button"
                onClick={openCreate}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="size-4" strokeWidth={2} />
                Create task
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-base leading-6 text-muted-foreground">
                Create a task above, or by talking to Gomer in chat.
              </p>

              <div className="flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm transition-colors outline-none hover:border-border/80 focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2">
                <Search
                  className="size-4 shrink-0 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tasks"
                  className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                />
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
                    <span
                      className={[
                        "text-xs tabular-nums",
                        item.countMuted ? "text-muted-foreground/60" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {tasks === null && !error && (
                <p className="py-6 text-center text-sm text-muted-foreground">Loading…</p>
              )}

              {tasks !== null && filtered.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">No tasks to show.</p>
              )}

              <div className="flex flex-col gap-2.5">
                {filtered.map((task) => {
                  const isOpen = expanded.has(task.id);
                  const busy = busyId === task.id;
                  return (
                    <div
                      key={task.id}
                      className="overflow-hidden rounded-xl border border-border bg-card"
                    >
                      <div className="flex items-center gap-3 p-4">
                        <button
                          type="button"
                          onClick={() => toggleExpanded(task.id)}
                          className="gomer-focus-ring flex min-w-0 flex-1 items-center gap-3 text-left"
                          aria-expanded={isOpen}
                        >
                          <ChevronDown
                            className={[
                              "size-4 shrink-0 text-muted-foreground transition-transform",
                              isOpen ? "rotate-0" : "-rotate-90",
                            ].join(" ")}
                            strokeWidth={2}
                          />
                          <span className="min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="truncate font-semibold text-foreground">
                                {task.name}
                              </span>
                              {!task.isActive && (
                                <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                                  Paused
                                </span>
                              )}
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {describeCron(task.cronExpression)}
                              {task.oneTime ? " · one-time" : ""}
                            </span>
                          </span>
                        </button>

                        <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                          {task.isSystem ? "Team default" : modelLabel(task.model)}
                        </span>

                        {!task.isSystem && (
                          <button
                            type="button"
                            onClick={() => handleTogglePause(task)}
                            disabled={busy}
                            className="gomer-focus-ring rounded-full border border-border p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
                            aria-label={task.isActive ? "Pause task" : "Resume task"}
                            title={task.isActive ? "Pause task" : "Resume task"}
                          >
                            {task.isActive ? (
                              <Pause className="size-4" strokeWidth={1.5} />
                            ) : (
                              <Play className="size-4" strokeWidth={1.5} />
                            )}
                          </button>
                        )}
                      </div>

                      {isOpen && (
                        <div className="border-t border-border px-4 py-4">
                          <div className="flex flex-col gap-1.5">
                            <MetaRow label="Last run">{relativeTime(task.lastRun)}</MetaRow>
                            {!task.isSystem && (
                              <MetaRow label="Next run">{relativeTime(task.nextRun)}</MetaRow>
                            )}
                            <MetaRow label="Created">{relativeTime(task.createdAt)}</MetaRow>
                            <MetaRow label="Author">
                              {task.authorIsCurrentUser ? "You" : (task.authorName ?? "System")}
                            </MetaRow>
                            <MetaRow label="Model">
                              {task.isSystem ? (
                                "Team default"
                              ) : (
                                <select
                                  value={task.model ?? ""}
                                  onChange={(event) => handleModelChange(task, event.target.value)}
                                  disabled={busy}
                                  className="rounded-md border border-border bg-muted px-2 py-1 text-sm text-foreground outline-none focus:border-ring disabled:opacity-50"
                                >
                                  <option value="">Team default</option>
                                  {taskModelOptionsForSelect()}
                                </select>
                              )}
                            </MetaRow>
                          </div>

                          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                            {task.prompt || task.description}
                          </p>

                          {!task.isSystem && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => openEdit(task)}
                                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRun(task)}
                                disabled={busy}
                                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50"
                              >
                                {busy ? "Working…" : "Run now"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(task)}
                                disabled={busy}
                                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TaskFormModal
        open={modalOpen}
        task={editing}
        submitting={submitting}
        error={modalError}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

// Rendered options for the inline model <select> on each task card.
function taskModelOptionsForSelect() {
  return taskModelOptions.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ));
}
