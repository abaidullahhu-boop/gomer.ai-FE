import { ArrowDownToLine, Loader2, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import type { Skill } from "@/lib/api";

type SkillCardProps = {
  skill: Skill;
  busy?: boolean;
  onInstall?: (skill: Skill) => void;
  onUninstall?: (skill: Skill) => void;
};

export function SkillCard({ skill, busy = false, onInstall, onUninstall }: SkillCardProps) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-3">
      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <h3 className="min-w-0 text-base font-medium leading-6">
              <Link
                to={`/dashboard/skills/${skill.slug}`}
                className="gomer-focus-ring rounded-sm hover:underline"
              >
                {skill.title}
              </Link>
            </h3>
            <div className="flex shrink-0 items-center gap-1">
              {skill.installed ? (
                <>
                  <button
                    type="button"
                    onClick={() => onUninstall?.(skill)}
                    disabled={busy || !onUninstall}
                    className="cursor-pointer group inline-flex min-h-8 min-w-[84px] select-none items-center justify-center gap-2 rounded-md border-0 bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {busy ? (
                      <Loader2 className="size-3.5 shrink-0 animate-spin" strokeWidth={1.5} />
                    ) : (
                      <>
                        <span className="group-hover:hidden">Installed</span>
                        <span className="hidden group-hover:inline">Uninstall</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Skill options"
                    className="gomer-focus-ring inline-flex size-8 min-h-8 cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-transparent text-muted-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                  >
                    <MoreVertical className="size-4 shrink-0" strokeWidth={1.5} />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onInstall?.(skill)}
                  disabled={busy || !onInstall}
                  className="gomer-focus-ring inline-flex min-h-8 min-w-[84px] cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-btn-primary px-3 py-2 text-xs font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? (
                    <Loader2 className="size-3.5 shrink-0 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <>
                      <ArrowDownToLine className="size-3.5 shrink-0" strokeWidth={1.5} />
                      Install
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          <Link
            to={`/dashboard/skills/category/${skill.category.slug}`}
            className="mt-1 inline-flex self-start"
          >
            <span className="inline-flex h-5 items-center justify-center gap-1 rounded bg-accent px-1.5 py-1 text-xs font-medium text-secondary-foreground">
              {skill.category.label}
            </span>
          </Link>
        </div>

        <p className="line-clamp-4 h-20 text-sm leading-5 text-muted-foreground">{skill.description}</p>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {skill.tags.map((tag) => (
              <Link key={tag} to={`/dashboard/skills/tag/${tag}`} className="inline-flex">
                <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-sm leading-5 text-secondary-foreground transition-colors hover:bg-accent">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
          {skill.author ? (
            <div className="text-xs text-muted-foreground">
              By <span className="font-medium">{skill.author}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
