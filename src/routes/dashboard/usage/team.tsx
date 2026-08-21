import { useUsageContext } from "@/components/dashboard/usage/useUsageAnalytics";
import type { UsageSpender } from "@/lib/api";

/** Initials for the avatar chip; unattributed system spend gets a gear glyph. */
function initialsFor(spender: UsageSpender): string {
  if (!spender.userId) return "⚙";
  const parts = spender.name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export default function UsageTeam() {
  const { analytics, loading } = useUsageContext();
  const rows = analytics?.topSpenders ?? [];

  if (!loading && analytics && rows.length === 0) {
    return (
      <div className="rounded-lg border border-border px-4 py-10 text-center text-sm text-muted-foreground">
        No credits were spent in this period.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-medium text-secondary-foreground">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3 text-right">Runs</th>
              <th className="px-4 py-3 text-right">Total credits used</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((spender) => (
              <tr
                key={spender.userId ?? "system"}
                className="border-b border-border last:border-b-0"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
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
                    <span className="font-medium text-foreground">{spender.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                  {spender.events.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums text-secondary-foreground">
                  {spender.credits.toLocaleString()} credits
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
