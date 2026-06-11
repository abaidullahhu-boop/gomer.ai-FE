import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { topUsers } from "@/data/usage";

type TopUsersCardProps = {
  periodQuery: string;
};

export function TopUsersCard({ periodQuery }: TopUsersCardProps) {
  return (
    <div className="flex flex-1 flex-col rounded-[7px] border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-body text-base font-medium text-foreground">Top users</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Workspace members using the most credits
          </p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">Last 30 days</span>
      </div>

      <ul className="divide-y divide-border">
        {topUsers.map((user) => (
          <li key={user.id} className="flex items-center gap-3 px-5 py-3.5">
            {user.avatarUrl ? (
              <span className="inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-highlight/15">
                <img alt="" className="size-full object-cover" src={user.avatarUrl} />
              </span>
            ) : (
              <span
                className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${user.avatarColor}`}
              >
                {user.initials}
              </span>
            )}
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
              {user.name}
            </span>
            <span className="shrink-0 text-sm font-medium tabular-nums text-secondary-foreground">
              {user.credits} credits
            </span>
          </li>
        ))}
      </ul>

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
