import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { Check, X } from "lucide-react";
import { ApiError, createBugReport, type BugSeverity } from "@/lib/api";
import { Dropdown, type DropdownOption } from "./Dropdown";

const SEVERITY_OPTIONS: readonly DropdownOption[] = [
  { value: "low", label: "Low — cosmetic or a small annoyance" },
  { value: "medium", label: "Medium — wrong, but I can work around it" },
  { value: "high", label: "High — a core flow is broken" },
  { value: "critical", label: "Critical — nobody can work" },
];

/** Matches the server's own floors, so the form refuses before the request does. */
const MIN_TITLE = 3;
const MIN_DESCRIPTION = 10;

const inputClass =
  "gaspo-focus-ring w-full rounded-[7px] border border-border bg-secondary px-3 py-2 text-sm text-foreground outline-0 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring placeholder:text-muted-foreground";

/**
 * Files a bug without leaving the dashboard.
 *
 * Replaces a `mailto:` on the marketing site that asked people to type out
 * their workspace name and what they were doing. Both are captured here
 * instead — the workspace from the session, the route from the router — so the
 * report arrives with the context that made it worth reading.
 */
export function ReportBugModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [severity, setSeverity] = useState<BugSeverity>("medium");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const stepsId = useId();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setDescription("");
    setSteps("");
    setSeverity("medium");
    setError(null);
    setSent(false);
    window.setTimeout(() => titleRef.current?.focus(), 0);
  }, [open]);

  if (!open) return null;

  const valid = title.trim().length >= MIN_TITLE && description.trim().length >= MIN_DESCRIPTION;

  async function submit() {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await createBugReport({
        title: title.trim(),
        description: description.trim(),
        stepsToReproduce: steps.trim() || undefined,
        severity,
        // The route, not the full href: a dashboard URL can carry ids in its
        // query string and the report is read by someone outside the tenant.
        pageUrl: location.pathname,
      });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.status === 429
            ? "You've sent us a lot of reports just now — please try again a little later."
            : err.message
          : "Could not send your report. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return createPortal(
    <div className="dashboard-shell fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-[opacity,backdrop-filter] duration-150"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Report a bug"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md border border-border bg-popover p-6 text-foreground outline-none transition-all duration-200 ease-out"
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="gaspo-focus-ring absolute top-4 right-4 inline-flex size-10 min-h-10 cursor-pointer select-none items-center justify-center rounded-[7px] border-0 bg-transparent text-muted-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="grid size-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Check className="size-6" strokeWidth={2} />
            </div>
            <div className="font-body text-lg font-medium text-foreground">Thanks — got it</div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Your report is in front of the team, with the page you were on and your workspace
              already attached. We&apos;ll dig in from here.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="gaspo-focus-ring mt-2 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-[7px] bg-btn-primary px-4 py-2 text-sm font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div>
              <div className="font-body text-lg font-medium leading-lg tracking-lg text-foreground">
                Report a bug
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;ll automatically include your workspace and the page you&apos;re on.
              </p>
            </div>

            {error ? (
              <div className="rounded-md border border-red-300/50 bg-red-500/5 px-3 py-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : null}

            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor={titleId}
                className="select-none text-xs font-medium leading-xs text-muted-foreground"
              >
                What went wrong?
              </label>
              <input
                ref={titleRef}
                id={titleId}
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Scheduled task ran twice this morning"
                maxLength={200}
                autoComplete="off"
                className={`${inputClass} h-10`}
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor={descriptionId}
                className="select-none text-xs font-medium leading-xs text-muted-foreground"
              >
                What happened, and what did you expect instead?
              </label>
              <textarea
                id={descriptionId}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                maxLength={10000}
                placeholder="My daily report posted to Slack twice, about a minute apart. I expected one message."
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor={stepsId}
                className="select-none text-xs font-medium leading-xs text-muted-foreground"
              >
                Steps to reproduce <span className="font-normal">(optional)</span>
              </label>
              <textarea
                id={stepsId}
                value={steps}
                onChange={(event) => setSteps(event.target.value)}
                rows={3}
                maxLength={10000}
                placeholder={"1. Create a daily task\n2. Wait for the morning run"}
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <span className="select-none text-xs font-medium leading-xs text-muted-foreground">
                How badly is this blocking you?
              </span>
              <Dropdown
                aria-label="How badly is this blocking you?"
                value={severity}
                options={SEVERITY_OPTIONS}
                onChange={(value) => setSeverity(value as BugSeverity)}
              />
            </div>

            <button
              type="button"
              disabled={!valid || submitting}
              onClick={() => void submit()}
              className="gaspo-focus-ring inline-flex min-h-10 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-btn-primary px-4 py-2 text-sm font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Send report"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
