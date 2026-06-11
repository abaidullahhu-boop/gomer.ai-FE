import { ArrowDownToLine, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { SkillBundle } from "@/data/skills";

type SkillBundleCardProps = {
  bundle: SkillBundle;
};

function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-medium text-muted-foreground">
      {initials}
    </div>
  );
}

export function SkillBundleCard({ bundle }: SkillBundleCardProps) {
  return (
    <Link
      to={`/dashboard/skills/bundle/${bundle.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-border/80"
    >
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
        <img alt="" className="size-full object-cover" src={bundle.image} />
        <div className="absolute left-3 top-3">
          <span className="inline-flex h-5 items-center justify-center gap-1 rounded bg-[linear-gradient(to_right,#d1c2f4,#edc2e7,#ffdc61)] px-1.5 py-1 text-xs font-medium text-zinc-900">
            Bundle
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <h3 className="text-xl font-semibold leading-8 text-foreground">{bundle.title}</h3>
            {bundle.verified ? (
              <BadgeCheck className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            ) : null}
          </div>
          <p className="line-clamp-4 text-sm leading-5 text-secondary-foreground">{bundle.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <AuthorAvatar name={bundle.author} />
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-5 text-foreground">{bundle.author}</span>
            <span className="text-xs leading-4 text-muted-foreground">{bundle.authorTitle}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{bundle.skillCount} skills included</span>
          <button
            type="button"
            onClick={(event) => event.preventDefault()}
            className="viktor-focus-ring inline-flex min-h-8 cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-btn-primary px-3 py-2 text-xs font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            <ArrowDownToLine className="size-3.5 shrink-0" strokeWidth={1.5} />
            Install bundle
          </button>
        </div>
      </div>
    </Link>
  );
}
