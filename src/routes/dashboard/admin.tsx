import { useCallback, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { useSession } from "@/lib/session";
import {
  ApiError,
  fetchAdminAnalytics,
  fetchAdminOverview,
  fetchAdminRevenue,
  fetchAdminUsers,
  setMemberActive,
  type AdminAnalytics,
  type AdminMember,
  type AdminOverview,
  type AdminRevenue,
} from "@/lib/api";

type AdminTab = "overview" | "analytics" | "revenue";

const TABS: Array<{ id: AdminTab; label: string }> = [
  { id: "overview", label: "Overview & Users" },
  { id: "analytics", label: "Analytics" },
  { id: "revenue", label: "Revenue" },
];

function dollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-[7px] border border-border bg-card p-5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="mt-1 text-2xl font-bold tracking-tight text-foreground">{value}</div>
      {hint ? <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-[7px] border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-body text-base font-medium text-foreground">{title}</h2>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function UsageBarChart({ daily }: { daily: AdminAnalytics["daily"] }) {
  const max = Math.max(...daily.map((d) => d.credits), 1);
  if (!daily.length) {
    return <p className="text-sm text-muted-foreground">No usage recorded in this window yet.</p>;
  }
  return (
    <div className="flex h-[180px] items-end gap-[2px]">
      {daily.map((d) => (
        <div
          key={d.day}
          title={`${d.day}: ${d.credits} credits (${d.events} runs)`}
          className="min-w-[3px] flex-1 rounded-t-sm bg-violet-300"
          style={{ height: `${Math.max((d.credits / max) * 100, 2)}%` }}
        />
      ))}
    </div>
  );
}

function MemberRow({
  member,
  isSelf,
  onToggle,
  saving,
}: {
  member: AdminMember;
  isSelf: boolean;
  onToggle: (next: boolean) => void;
  saving: boolean;
}) {
  return (
    <tr className="border-t border-border">
      <td className="px-3 py-2.5">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {member.name ?? member.email ?? member.id}
          </span>
          {member.email ? (
            <span className="truncate text-xs text-muted-foreground">{member.email}</span>
          ) : null}
        </div>
      </td>
      <td className="px-3 py-2.5 text-sm capitalize text-muted-foreground">{member.role}</td>
      <td className="px-3 py-2.5">
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
            member.isActive
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {member.isActive ? "Active" : "Deactivated"}
        </span>
      </td>
      <td className="px-3 py-2.5 text-right">
        <button
          type="button"
          disabled={saving || isSelf}
          title={isSelf ? "You cannot deactivate your own account" : undefined}
          onClick={() => onToggle(!member.isActive)}
          className="gomer-focus-ring min-h-8 cursor-pointer rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {member.isActive ? "Deactivate" : "Reactivate"}
        </button>
      </td>
    </tr>
  );
}

export default function DashboardAdmin() {
  const { user, loading: sessionLoading } = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = (searchParams.get("tab") as AdminTab) || "overview";

  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [revenue, setRevenue] = useState<AdminRevenue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [o, u, a, r] = await Promise.all([
        fetchAdminOverview(),
        fetchAdminUsers(),
        fetchAdminAnalytics(30),
        fetchAdminRevenue(),
      ]);
      setOverview(o);
      setMembers(u);
      setAnalytics(a);
      setRevenue(r);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") void load();
  }, [user?.role, load]);

  if (!sessionLoading && user && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  async function toggleMember(member: AdminMember, next: boolean) {
    setSavingId(member.id);
    try {
      const updated = await setMemberActive(member.id, next);
      setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update member");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <>
      <PageMeta title="Admin — Gomer" description="Workspace administration." />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 py-8 sm:px-12"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-bold leading-8 text-foreground">Admin</h1>
              <button
                type="button"
                onClick={() => void load()}
                className="gomer-focus-ring flex min-h-9 cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            <div className="mb-6 flex gap-1 rounded-md border border-border bg-card p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSearchParams({ tab: t.id })}
                  className={`gomer-focus-ring min-h-9 flex-1 cursor-pointer rounded-[5px] px-3 text-sm font-medium transition-colors ${
                    tab === t.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {error ? (
              <div className="mb-6 rounded-md border border-red-300/50 bg-red-500/5 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            {loading && !overview ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : null}

            {tab === "overview" && overview ? (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <StatCard
                    label="Members"
                    value={String(overview.members.total)}
                    hint={`${overview.members.active} active · ${overview.members.admins} admin${overview.members.admins === 1 ? "" : "s"}`}
                  />
                  <StatCard
                    label="Credits left"
                    value={overview.credits.balance.toLocaleString()}
                    hint={`≈ ${dollars(overview.credits.balance)}`}
                  />
                  <StatCard
                    label="Credits used"
                    value={overview.usage.totalCreditsUsed.toLocaleString()}
                    hint={`${overview.usage.eventCount.toLocaleString()} runs`}
                  />
                  <StatCard label="Connected accounts" value={String(overview.connectedAccounts)} />
                </div>

                <SectionCard title="Members">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse">
                      <thead>
                        <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          <th className="px-3 pb-2">Member</th>
                          <th className="px-3 pb-2">Role</th>
                          <th className="px-3 pb-2">Status</th>
                          <th className="px-3 pb-2" />
                        </tr>
                      </thead>
                      <tbody>
                        {members.map((member) => (
                          <MemberRow
                            key={member.id}
                            member={member}
                            isSelf={member.id === user?.id}
                            saving={savingId === member.id}
                            onToggle={(next) => void toggleMember(member, next)}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {tab === "analytics" && analytics ? (
              <div className="flex flex-col gap-6">
                <SectionCard title={`Credits used per day (last ${analytics.days} days)`}>
                  <UsageBarChart daily={analytics.daily} />
                </SectionCard>
                <SectionCard title="Top spenders">
                  {analytics.topSpenders.length ? (
                    <ul className="flex flex-col gap-2">
                      {analytics.topSpenders.map((row) => (
                        <li
                          key={row.userId ?? "system"}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <span className="truncate text-foreground">{row.name}</span>
                          <span className="shrink-0 tabular-nums text-muted-foreground">
                            {row.credits.toLocaleString()} credits · {row.events} runs
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No spend in this window yet.</p>
                  )}
                </SectionCard>
              </div>
            ) : null}

            {tab === "revenue" && revenue ? (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <StatCard label="Total paid" value={dollars(revenue.totalPaidCents)} />
                  <StatCard
                    label="Credits granted"
                    value={revenue.creditsGranted.toLocaleString()}
                  />
                  <StatCard
                    label="Credits consumed"
                    value={revenue.creditsConsumed.toLocaleString()}
                  />
                  <StatCard
                    label="Credits remaining"
                    value={revenue.creditsRemaining.toLocaleString()}
                  />
                </div>
                <SectionCard title="Grant history">
                  {revenue.recentGrants.length ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[520px] border-collapse">
                        <thead>
                          <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            <th className="px-3 pb-2">Date</th>
                            <th className="px-3 pb-2">Type</th>
                            <th className="px-3 pb-2">Credits</th>
                            <th className="px-3 pb-2">Paid</th>
                            <th className="px-3 pb-2">Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          {revenue.recentGrants.map((grant) => (
                            <tr key={grant.id} className="border-t border-border text-sm">
                              <td className="px-3 py-2.5 whitespace-nowrap text-muted-foreground">
                                {new Date(grant.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-3 py-2.5 capitalize text-foreground">
                                {grant.reason}
                              </td>
                              <td className="px-3 py-2.5 tabular-nums text-foreground">
                                {grant.credits.toLocaleString()}
                              </td>
                              <td className="px-3 py-2.5 tabular-nums text-muted-foreground">
                                {grant.amountCents != null ? dollars(grant.amountCents) : "—"}
                              </td>
                              <td className="px-3 py-2.5 text-muted-foreground">
                                {grant.note ?? ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No grants yet.</p>
                  )}
                </SectionCard>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
