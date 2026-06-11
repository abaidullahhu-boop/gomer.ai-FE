import { topUsers } from "@/data/usage";

export default function UsageTeam() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-medium text-secondary-foreground">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3 text-right">Total credits used</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
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
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums text-secondary-foreground">
                  {user.credits} credits
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
