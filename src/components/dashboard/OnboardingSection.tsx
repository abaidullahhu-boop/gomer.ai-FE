import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Ellipsis, Eye, Puzzle, RefreshCw, X } from "lucide-react";
import gettingSayHi from "@/assets/images/getting.png";
import gettingConnectTools from "@/assets/images/getting2.png";
import gettingInstallSkills from "@/assets/images/getting-started-install-skills.png";

const TOTAL_TASKS = 4;

type OnboardingTask = {
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
  href?: string;
  badge?: string;
  completed?: boolean;
};

const tasks: OnboardingTask[] = [
  {
    title: "Send Gomer your first task",
    description:
      "DM Gomer or @mention him in any channel — ask a question, kick off a workflow, or just say hi.",
    image: gettingSayHi,
    buttonLabel: "Message Gomer",
    completed: true,
  },
  {
    title: "Connect 5 integrations",
    description:
      "Give Gomer enough access to work across your stack. Connect five integrations to unlock the full setup.",
    image: gettingConnectTools,
    buttonLabel: "Browse Integrations",
    href: "/dashboard/integrations",
    badge: "0 / 5 integrations",
  },
  {
    title: "Teach Gomer new skills",
    description:
      "Skills are prebuilt workflows — from drafting emails to pulling reports. Browse the directory and install what fits.",
    image: gettingInstallSkills,
    buttonLabel: "Browse Skills",
    href: "/dashboard/skills",
  },
];

function SecondaryButton({ label, href }: { label: string; href?: string }) {
  const className =
    "inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[7px] border-0 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 select-none hover:bg-secondary/80 active:scale-[0.98] md:w-auto";

  if (href) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {label}
    </button>
  );
}

export function OnboardingSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCompletedSteps, setShowCompletedSteps] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const tasksDone = tasks.filter((task) => task.completed).length;
  const progressPercent = (tasksDone / TOTAL_TASKS) * 100;
  const visibleTasks = showCompletedSteps
    ? tasks
    : tasks.filter((task) => !task.completed);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  if (dismissed) return null;

  return (
    <div className="rounded-2xl border bg-card">
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight">Get Gomer up to speed</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete the core setup steps so Gomer is fully ready for your workspace.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="cursor-pointer gomer-focus-ring rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none"
              aria-label="Refresh progress"
            >
              <RefreshCw className="size-4" strokeWidth={1.5} />
            </button>
            <div ref={menuRef} className="relative">
              <button
                type="button"
                className="cursor-pointer gomer-focus-ring rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="More options"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <Ellipsis className="size-4" strokeWidth={1.5} />
              </button>

              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute top-full right-0 z-50 mt-1 min-w-[220px] overflow-hidden rounded-[7px] border border-border bg-popover py-1 shadow-[0_4px_16px_rgba(26,24,43,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setShowCompletedSteps((prev) => !prev);
                      setMenuOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    <Eye className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                    Show completed steps
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setDismissed(true);
                      setMenuOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    <X className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                    Dismiss onboarding
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="w-full max-w-[640px]">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              aria-valuetext={`${progressPercent}%`}
            >
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full rounded-r-none bg-highlight"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1.5 text-sm tabular-nums text-muted-foreground">
            <Puzzle className="size-4 text-highlight" strokeWidth={1.5} />
            {tasksDone} / {TOTAL_TASKS} tasks done
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {visibleTasks.map((task) => (
          <div key={task.title} className="px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:gap-5">
                <div className="w-full shrink-0 md:w-[200px]">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                    <img
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      src={task.image}
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-medium">{task.title}</span>
                    {task.badge && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-highlight/10 px-2 py-1 text-xs font-medium text-highlight">
                        <Puzzle className="size-3.5" strokeWidth={1.5} />
                        {task.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                </div>
              </div>
              <div className="shrink-0 md:ml-auto md:self-center">
                <SecondaryButton label={task.buttonLabel} href={task.href} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
