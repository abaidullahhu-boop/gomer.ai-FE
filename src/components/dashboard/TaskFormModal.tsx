import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Clock, X } from "lucide-react";
import cronstrue from "cronstrue";
import type { CreateTaskInput, ScheduledTask } from "@/lib/api";

type TaskFormModalProps = {
  open: boolean;
  /** When set, the form edits this task; otherwise it creates a new one. */
  task?: ScheduledTask | null;
  submitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (input: CreateTaskInput) => void;
};

type Pattern = "daily" | "weekdays" | "weekly" | "monthly" | "hourly" | "custom";

const patternOptions: { value: Pattern; label: string }[] = [
  { value: "daily", label: "Daily at time" },
  { value: "weekdays", label: "Weekdays at time" },
  { value: "weekly", label: "Weekly on day" },
  { value: "monthly", label: "Monthly on day" },
  { value: "hourly", label: "Hourly" },
  { value: "custom", label: "Custom (cron)" },
];

const weekdays = [
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
  { value: "0", label: "Sunday" },
];

const inputClass =
  "w-full rounded-[7px] border border-border bg-muted px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-ring focus:outline-2 focus:outline-offset-2 focus:outline-ring";

const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

type ScheduleState = {
  pattern: Pattern;
  time: string; // "HH:MM" (24h)
  dayOfWeek: string; // "0".."6"
  dayOfMonth: string; // "1".."31"
  minute: string; // "0".."59"
  custom: string; // raw cron
};

const defaultSchedule: ScheduleState = {
  pattern: "daily",
  time: "09:00",
  dayOfWeek: "1",
  dayOfMonth: "1",
  minute: "0",
  custom: "0 9 * * *",
};

/** Build a 5-field cron expression from the schedule builder state. */
function buildCron(s: ScheduleState): string {
  const [h, m] = s.time.split(":").map((part) => parseInt(part, 10) || 0);
  switch (s.pattern) {
    case "daily":
      return `${m} ${h} * * *`;
    case "weekdays":
      return `${m} ${h} * * 1-5`;
    case "weekly":
      return `${m} ${h} * * ${s.dayOfWeek}`;
    case "monthly":
      return `${m} ${h} ${s.dayOfMonth} * *`;
    case "hourly":
      return `${parseInt(s.minute, 10) || 0} * * * *`;
    case "custom":
      return s.custom.trim();
  }
}

/** Best-effort reverse of {@link buildCron} so editing reopens the right builder. */
function parseCron(cron: string): ScheduleState {
  const base = { ...defaultSchedule, custom: cron };
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return { ...base, pattern: "custom" };
  const [m, h, dom, mon, dow] = parts;
  const time = `${String(parseInt(h, 10)).padStart(2, "0")}:${String(parseInt(m, 10)).padStart(2, "0")}`;
  const numeric = (value: string) => /^\d+$/.test(value);

  if (mon === "*" && numeric(h) && numeric(m)) {
    if (dom === "*" && dow === "*") return { ...base, pattern: "daily", time };
    if (dom === "*" && dow === "1-5") return { ...base, pattern: "weekdays", time };
    if (dom === "*" && /^[0-6]$/.test(dow))
      return { ...base, pattern: "weekly", time, dayOfWeek: dow };
    if (numeric(dom) && dow === "*") return { ...base, pattern: "monthly", time, dayOfMonth: dom };
  }
  if (h === "*" && dom === "*" && mon === "*" && dow === "*" && numeric(m)) {
    return { ...base, pattern: "hourly", minute: m };
  }
  return { ...base, pattern: "custom" };
}

function describeCron(cron: string): { text: string; valid: boolean } {
  if (!cron) return { text: "Set a schedule", valid: false };
  try {
    return { text: cronstrue.toString(cron, { verbose: false }), valid: true };
  } catch {
    return { text: "Not a valid cron expression", valid: false };
  }
}

export function TaskFormModal({
  open,
  task,
  submitting,
  error,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState<ScheduleState>(defaultSchedule);

  // Reset the form whenever it opens (or the edited task changes).
  useEffect(() => {
    if (!open) return;
    setTitle(task?.name ?? "");
    setDescription(task?.prompt ?? "");
    setSchedule(task ? parseCron(task.cronExpression) : defaultSchedule);
  }, [open, task]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const cron = useMemo(() => buildCron(schedule), [schedule]);
  const described = useMemo(() => describeCron(cron), [cron]);
  const timezone = task?.timezone ?? browserTimezone;
  const canSubmit = title.trim() && description.trim() && described.valid && !submitting;

  if (!open) return null;

  function set<K extends keyof ScheduleState>(key: K, value: ScheduleState[K]) {
    setSchedule((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      name: title.trim(),
      prompt: description.trim(),
      cronExpression: cron,
      timezone,
    });
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <form
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-card text-foreground shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {task ? "Edit scheduled task" : "Create scheduled task"}
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Gomer runs the description on the schedule you set.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="gomer-focus-ring rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
          {error && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Morning standup reminder"
              className={inputClass}
              autoFocus
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What should Gomer do on each run?"
              rows={5}
              className={`${inputClass} resize-y`}
            />
          </label>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">Schedule</span>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Pattern</span>
              <select
                value={schedule.pattern}
                onChange={(event) => set("pattern", event.target.value as Pattern)}
                className={inputClass}
              >
                {patternOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-wrap gap-3">
              {schedule.pattern === "weekly" && (
                <label className="flex flex-1 flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">Day</span>
                  <select
                    value={schedule.dayOfWeek}
                    onChange={(event) => set("dayOfWeek", event.target.value)}
                    className={inputClass}
                  >
                    {weekdays.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {schedule.pattern === "monthly" && (
                <label className="flex flex-1 flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">Day of month</span>
                  <select
                    value={schedule.dayOfMonth}
                    onChange={(event) => set("dayOfMonth", event.target.value)}
                    className={inputClass}
                  >
                    {Array.from({ length: 31 }, (_, index) => String(index + 1)).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {schedule.pattern === "hourly" && (
                <label className="flex flex-1 flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">At minute</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={schedule.minute}
                    onChange={(event) => set("minute", event.target.value)}
                    className={inputClass}
                  />
                </label>
              )}

              {schedule.pattern === "custom" ? (
                <label className="flex flex-1 flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">Cron expression</span>
                  <input
                    value={schedule.custom}
                    onChange={(event) => set("custom", event.target.value)}
                    placeholder="0 9 * * *"
                    spellCheck={false}
                    className={inputClass}
                  />
                </label>
              ) : (
                schedule.pattern !== "hourly" && (
                  <label className="flex flex-1 flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">At time</span>
                    <input
                      type="time"
                      value={schedule.time}
                      onChange={(event) => set("time", event.target.value)}
                      className={inputClass}
                    />
                  </label>
                )
              )}
            </div>

            <div
              className={[
                "flex items-center justify-between gap-3 rounded-[7px] border px-3 py-2.5 text-sm",
                described.valid
                  ? "border-border bg-muted text-foreground"
                  : "border-destructive/40 bg-destructive/10 text-destructive",
              ].join(" ")}
            >
              <span className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                {described.text}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{timezone}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {submitting ? "Saving…" : task ? "Save changes" : "Create task"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
