import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { UsageSpender } from "@/lib/api";

type TopUsersCardProps = {
  periodQuery: string;
  /** Null until the window's figures arrive. */
  spenders: UsageSpender[] | null;
  /** Length of the window the figures cover, for the header label. */
  days?: number;
};

/** Initials for the avatar chip; unattributed system spend gets a gear glyph. */
function initialsFor(spender: UsageSpender): string {
  if (!spender.userId) return "\u2699";
  const parts = spender.name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function TopUsersCard({ periodQuery, spenders, days }: TopUsersCardProps) {
  const rows = spenders ?? [];
  return (
    <div className="flex flex-1 flex-col rounded-[7px] border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-body text-base font-medium text-foreground">Top users</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Workspace members using the most credits
          </p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {days ? `Last ${days} days` : "\u2014"}
        </span>
      </div>

      {spenders && rows.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">
          No credits were spent in this period.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((spender) => (
            <li key={spender.userId ?? "system"} className="flex items-center gap-3 px-5 py-3.5">
              {spender.avatarUrl ? (
                <span className="inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-highlight/15">
                  <img alt="" className="size-full object-cover" src={spender.avatarUrl} />
                </span>
              ) : (
                <span
                  className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
                    spender.userId ? "bg-teal-500" : "bg-highlight"
                  }`}
                >
                  {initialsFor(spender)}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                {spender.name}
              </span>
              <span className="shrink-0 text-sm font-medium tabular-nums text-secondary-foreground">
                {spender.credits.toLocaleString()} credits
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto border-t border-border px-5 py-3">
        <Link
          to={`/dashboard/usage/team${periodQuery}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all users
          <ArrowRight className="size-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
