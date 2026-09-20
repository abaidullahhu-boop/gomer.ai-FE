import { useCallback, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Bug, ChevronRight, RefreshCw, Search } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { useSession } from "@/lib/session";
import {
  ApiError,
  fetchPlatformBugs,
  fetchPlatformGrowth,
  fetchPlatformOverview,
  fetchPlatformWorkspace,
  fetchPlatformWorkspaces,
  updatePlatformBug,
  type BugStatus,
  type PlatformBugReport,
  type PlatformGrowth,
  type PlatformOverview,
  type PlatformWorkspace,
  type PlatformWorkspaceDetail,
  type WorkspaceSort,
} from "@/lib/api";

type Tab = "overview" | "customers" | "bugs";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "customers", label: "Customers" },
  { id: "bugs", label: "Bug Reports" },
];

const SORTS: Array<{ id: WorkspaceSort; label: string }> = [
  { id: "created", label: "Newest" },
  { id: "members", label: "Most people" },
  { id: "activity", label: "Last active" },
  { id: "name", label: "Name" },
];

/** How many biggest-team rows the overview lists. */
const TOP_TEAMS = 5;

const BUG_STATUSES: Array<{ id: BugStatus; label: string }> = [
  { id: "open", label: "Open" },
  { id: "in_progress", label: "In progress" },
  { id: "resolved", label: "Resolved" },
  { id: "dismissed", label: "Dismissed" },
];

function dollars(cents: number): string {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function usd(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function relativeDay(iso: string | null): string {
  if (!iso) return "Never";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function StatCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "positive" | "negative";
}) {
  const toneClass =
    tone === "positive"
      ? "text-foreground"
      : tone === "negative"
        ? "text-red-600 dark:text-red-400"
        : "text-foreground";
  return (
    <div className="rounded-[7px] border border-border bg-card p-5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className={`mt-1 text-2xl font-bold tracking-tight ${toneClass}`}>{value}</div>
      {hint ? <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-[7px] border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="font-body text-base font-medium text-foreground">{title}</h2>
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

/**
 * Signups and burn on one axis pair.
 *
 * Two series with different units, so the bars are credits (the continuous
 * quantity) and signups are dots above them — overlaying two bar scales would
 * imply a comparison that does not exist.
 */
function GrowthChart({ series }: { series: PlatformGrowth["series"] }) {
  const maxCredits = Math.max(...series.map((point) => point.credits), 1);
  const maxSignups = Math.max(...series.map((point) => point.signups), 1);
  if (!series.length) {
    return <p className="text-sm text-muted-foreground">Nothing in this window yet.</p>;
  }
  return (
    <div>
      <div className="flex h-[180px] items-end gap-[2px]">
        {series.map((point) => (
          <div
            key={point.day}
            title={`${point.day}: ${point.credits.toLocaleString()} credits · ${point.signups} signup${point.signups === 1 ? "" : "s"} · ${usd(point.costUsd)} cost`}
            // h-full is load-bearing: the bar below sizes itself as a
            // percentage, and a percentage height resolves against the parent's
            // *definite* height. Without it this column is content-sized, the
            // percentage resolves to zero, and every bar silently disappears.
            className="relative flex h-full min-w-[3px] flex-1 flex-col justify-end"
          >
            {point.signups > 0 ? (
              <div
                className="mx-auto mb-1 size-1.5 shrink-0 rounded-full bg-chart-2"
                style={{ opacity: 0.4 + (point.signups / maxSignups) * 0.6 }}
              />
            ) : null}
            <div
              className="w-full rounded-t-sm bg-chart-1"
              style={{ height: `${Math.max((point.credits / maxCredits) * 100, 1)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-chart-1" /> Credits burned
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-chart-2" /> New workspaces
        </span>
      </div>
    </div>
  );
}

/**
 * Workspaces bucketed by headcount, as one stacked bar.
 *
 * The bands answer the question the averages cannot: whether the platform is
 * carrying a few large teams or a long tail of one-person Slacks. Counts are
 * printed next to each band because a segment two pixels wide is unreadable on
 * its own, and a band at zero is dropped rather than rendered as a sliver.
 */
function TeamSizeBar({
  distribution,
  workspaces,
}: {
  distribution: PlatformOverview["teams"]["distribution"];
  workspaces: number;
}) {
  const bands = [
    { key: "solo", label: "Solo (0–1)", count: distribution.solo, fill: "bg-foreground/25" },
    { key: "small", label: "Small (2–5)", count: distribution.small, fill: "bg-foreground/45" },
    { key: "medium", label: "Team (6–20)", count: distribution.medium, fill: "bg-foreground/70" },
    { key: "large", label: "Large (21+)", count: distribution.large, fill: "bg-foreground" },
  ].filter((band) => band.count > 0);

  if (!workspaces || !bands.length) {
    return <p className="text-sm text-muted-foreground">No workspaces yet.</p>;
  }

  return (
    <div>
      <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
        {bands.map((band) => (
          <div
            key={band.key}
            className={band.fill}
            style={{ width: `${(band.count / workspaces) * 100}%` }}
            title={`${band.label}: ${band.count} workspace${band.count === 1 ? "" : "s"}`}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        {bands.map((band) => (
          <span key={band.key} className="flex items-center gap-1.5">
            <span className={`size-2 rounded-sm ${band.fill}`} />
            {band.label}
            <span className="font-medium tabular-nums text-foreground">{band.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** The workspaces carrying the most people, newest question first. */
function BiggestTeams({
  workspaces,
  onOpen,
}: {
  workspaces: PlatformWorkspace[];
  onOpen: (id: string) => void;
}) {
  if (!workspaces.length) {
    return <p className="text-sm text-muted-foreground">No workspaces yet.</p>;
  }
  const largest = Math.max(...workspaces.map((workspace) => workspace.members.total), 1);
  return (
    <ul className="flex flex-col">
      {workspaces.map((workspace) => (
        <li key={workspace.id}>
          <button
            type="button"
            onClick={() => onOpen(workspace.id)}
            className="gaspo-focus-ring flex w-full cursor-pointer items-center gap-3 rounded-md px-1 py-2 text-left transition-colors hover:bg-accent/50"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="truncate text-sm font-medium text-foreground">{workspace.name}</span>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-foreground"
                  style={{ width: `${(workspace.members.total / largest) * 100}%` }}
                />
              </div>
            </div>
            <span className="shrink-0 text-right text-xs tabular-nums text-muted-foreground">
              <span className="block text-sm font-medium text-foreground">
                {workspace.members.total}
              </span>
              {workspace.members.total === 1 ? "person" : "people"}
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </li>
      ))}
    </ul>
  );
}

function SeverityPill({ severity }: { severity: PlatformBugReport["severity"] }) {
  const styles: Record<PlatformBugReport["severity"], string> = {
    low: "bg-secondary text-muted-foreground",
    medium: "bg-foreground/8 text-foreground",
    high: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    critical: "bg-red-500/10 text-red-600 dark:text-red-400",
  };
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[severity]}`}
    >
      {severity}
    </span>
  );
}

/** One report, expandable into its full detail and triage controls. */
function BugRow({
  report,
  onChange,
}: {
  report: PlatformBugReport;
  onChange: (updated: PlatformBugReport) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState(report.resolutionNote ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function apply(changes: { status?: BugStatus; resolutionNote?: string | null }) {
    setSaving(true);
    setError(null);
    try {
      onChange(await updatePlatformBug(report.id, changes));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update this report");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border-t border-border first:border-t-0">
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        className="gaspo-focus-ring flex w-full cursor-pointer items-start gap-3 px-1 py-3 text-left transition-colors hover:bg-accent/50"
      >
        <SeverityPill severity={report.severity} />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium text-foreground">{report.title}</span>
          <span className="truncate text-xs text-muted-foreground">
            {report.workspace?.name ?? "Unknown workspace"} ·{" "}
            {report.reportedBy?.name ?? "Former member"} · {relativeDay(report.createdAt)}
          </span>
        </div>
        <span className="shrink-0 text-xs capitalize text-muted-foreground">
          {report.status.replace("_", " ")}
        </span>
      </button>

      {expanded ? (
        <div className="flex flex-col gap-4 px-1 pb-4">
          <div className="rounded-[7px] border border-border bg-secondary/40 p-3">
            <p className="whitespace-pre-wrap text-sm text-foreground">{report.description}</p>
            {report.stepsToReproduce ? (
              <>
                <div className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Steps to reproduce
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">
                  {report.stepsToReproduce}
                </p>
              </>
            ) : null}
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-xs text-muted-foreground sm:grid-cols-2">
              <div className="flex gap-2">
                <dt className="font-medium">Page</dt>
                <dd className="truncate">{report.pageUrl ?? "—"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">Reporter</dt>
                <dd className="truncate">{report.reportedBy?.email ?? "—"}</dd>
              </div>
              <div className="flex min-w-0 gap-2 sm:col-span-2">
                <dt className="shrink-0 font-medium">Browser</dt>
                <dd className="truncate">{report.userAgent ?? "—"}</dd>
              </div>
            </dl>
          </div>

          {error ? <div className="text-sm text-red-600 dark:text-red-400">{error}</div> : null}

          <div className="flex flex-wrap gap-1.5">
            {BUG_STATUSES.map((status) => (
              <button
                key={status.id}
                type="button"
                disabled={saving || report.status === status.id}
                onClick={() => void apply({ status: status.id })}
                className={`gaspo-focus-ring min-h-8 cursor-pointer rounded-md border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed ${
                  report.status === status.id
                    ? "border-transparent bg-secondary text-foreground opacity-100"
                    : "border-border text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Triage note{" "}
              <span className="font-normal">(internal — never shown to the reporter)</span>
            </label>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={2}
              maxLength={5000}
              placeholder="What was it, and what fixed it?"
              className="gaspo-focus-ring w-full resize-y rounded-[7px] border border-border bg-secondary px-3 py-2 text-sm text-foreground outline-0 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring placeholder:text-muted-foreground"
            />
            <div>
              <button
                type="button"
                disabled={saving || note === (report.resolutionNote ?? "")}
                onClick={() => void apply({ resolutionNote: note.trim() || null })}
                className="gaspo-focus-ring min-h-8 cursor-pointer rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save note"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** The drill-in: one customer, everything we know. */
function WorkspaceDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const [detail, setDetail] = useState<PlatformWorkspaceDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setDetail(null);
    setError(null);
    fetchPlatformWorkspace(id)
      .then((data) => {
        if (!cancelled) setDetail(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Failed to load this workspace");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return <div className="text-sm text-red-600 dark:text-red-400">{error}</div>;
  }
  if (!detail) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="gaspo-focus-ring flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" strokeWidth={1.5} />
        All customers
      </button>

      <div>
        <h2 className="text-2xl font-bold text-foreground">{detail.workspace.name}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Slack team {detail.workspace.slackTeamId} · customer since{" "}
          {new Date(detail.workspace.createdAt).toLocaleDateString()}
          {detail.workspace.defaultModel ? ` · ${detail.workspace.defaultModel}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Credits left"
          value={detail.credits.balance.toLocaleString()}
          hint={`${detail.credits.granted.toLocaleString()} granted · ${detail.credits.used.toLocaleString()} used`}
        />
        <StatCard
          label="Members"
          value={String(detail.members.length)}
          hint={`${detail.members.filter((member) => member.isActive).length} active`}
        />
        <StatCard
          label="Margin (30d)"
          value={usd(detail.cost.marginUsd)}
          tone={detail.cost.marginUsd >= 0 ? "positive" : "negative"}
          hint={`${usd(detail.cost.chargedUsd)} charged · ${usd(detail.cost.costUsd)} cost`}
        />
        <StatCard
          label="Connected accounts"
          value={String(detail.integrations.length)}
          hint={`${detail.bugReportCount} bug report${detail.bugReportCount === 1 ? "" : "s"}`}
        />
      </div>

      <SectionCard title="Subscription">
        {detail.subscription ? (
          <dl className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
            <div>
              <dt className="text-xs text-muted-foreground">Plan</dt>
              <dd className="font-medium capitalize text-foreground">
                {detail.subscription.planId}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Status</dt>
              <dd className="font-medium capitalize text-foreground">
                {detail.subscription.status.replace("_", " ")}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Seats</dt>
              <dd className="font-medium text-foreground">{detail.subscription.seats}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {detail.subscription.cancelAtPeriodEnd ? "Cancels" : "Renews"}
              </dt>
              <dd className="font-medium text-foreground">
                {new Date(detail.subscription.currentPeriodEnd).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">
            No subscription — this workspace is on trial or top-ups only.
          </p>
        )}
      </SectionCard>

      <SectionCard title="Members">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-3 pb-2">Member</th>
                <th className="px-3 pb-2">Role</th>
                <th className="px-3 pb-2">Status</th>
                <th className="px-3 pb-2">Last active</th>
              </tr>
            </thead>
            <tbody>
              {detail.members.map((member) => (
                <tr key={member.id} className="border-t border-border text-sm">
                  <td className="px-3 py-2.5">
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-medium text-foreground">{member.name}</span>
                      {member.email ? (
                        <span className="truncate text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 capitalize text-muted-foreground">{member.role}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        member.isActive
                          ? "bg-foreground/8 text-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {member.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-muted-foreground">
                    {relativeDay(member.lastActiveAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Credit grants">
        {detail.grants.length ? (
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
                {detail.grants.map((grant) => (
                  <tr key={grant.id} className="border-t border-border text-sm">
                    <td className="px-3 py-2.5 whitespace-nowrap text-muted-foreground">
                      {new Date(grant.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2.5 capitalize text-foreground">
                      {grant.reason.replace("_", " ")}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-foreground">
                      {grant.credits.toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-muted-foreground">
                      {grant.amountCents != null ? dollars(grant.amountCents) : "—"}
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">{grant.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No grants yet.</p>
        )}
      </SectionCard>

      <SectionCard title="Recent activity">
        {detail.recentActivity.length ? (
          <ul className="flex flex-col gap-2">
            {detail.recentActivity.slice(0, 12).map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-4 text-sm">
                <span className="truncate text-foreground">
                  {entry.sourceName}
                  <span className="ml-2 text-xs text-muted-foreground">{entry.model}</span>
                </span>
                <span className="shrink-0 tabular-nums text-xs text-muted-foreground">
                  {entry.credits.toLocaleString()} credits · {relativeDay(entry.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No runs recorded yet.</p>
        )}
      </SectionCard>
    </div>
  );
}

/**
 * The platform owner's panel.
 *
 * Guarded twice on purpose: this redirect keeps a non-owner from seeing the
 * shell, and every request it makes is re-checked server-side against the
 * allowlist. The redirect is a convenience, not the security boundary.
 */
export default function SuperAdmin() {
  const { user, loading: sessionLoading } = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = (searchParams.get("tab") as Tab) || "overview";
  const selectedWorkspace = searchParams.get("workspace");

  const [overview, setOverview] = useState<PlatformOverview | null>(null);
  const [growth, setGrowth] = useState<PlatformGrowth | null>(null);
  const [workspaces, setWorkspaces] = useState<PlatformWorkspace[]>([]);
  const [workspaceTotal, setWorkspaceTotal] = useState(0);
  const [topTeams, setTopTeams] = useState<PlatformWorkspace[]>([]);
  const [bugs, setBugs] = useState<PlatformBugReport[]>([]);
  const [bugFilter, setBugFilter] = useState<BugStatus | "all">("open");
  const [sort, setSort] = useState<WorkspaceSort>("created");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [o, g, w, t, b] = await Promise.all([
        fetchPlatformOverview(30),
        fetchPlatformGrowth(30),
        fetchPlatformWorkspaces({ search, sort }),
        // Asked for separately rather than sorted out of the page above: that
        // page is whatever the customer table is currently showing, and the
        // biggest teams on the platform are not necessarily on it.
        fetchPlatformWorkspaces({ sort: "members", limit: TOP_TEAMS }),
        fetchPlatformBugs(bugFilter === "all" ? undefined : bugFilter),
      ]);
      setOverview(o);
      setGrowth(g);
      setWorkspaces(w.rows);
      setWorkspaceTotal(w.total);
      setTopTeams(t.rows);
      setBugs(b);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load the panel");
    } finally {
      setLoading(false);
    }
  }, [search, sort, bugFilter]);

  useEffect(() => {
    if (user?.isSuperAdmin) void load();
  }, [user?.isSuperAdmin, load]);

  if (!sessionLoading && user && !user.isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  function setTab(next: Tab) {
    setSearchParams({ tab: next });
  }

  return (
    <>
      <PageMeta title="Super Admin — Gaspo" description="Platform overview." />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 py-8 sm:px-12"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold leading-8 text-foreground">Super Admin</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Every workspace on the platform. Signed in as {user?.email}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void load()}
                className="gaspo-focus-ring flex min-h-9 cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            <div className="mb-6 flex gap-1 rounded-md border border-border bg-card p-1">
              {TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`gaspo-focus-ring min-h-9 flex-1 cursor-pointer rounded-[5px] px-3 text-sm font-medium transition-colors ${
                    tab === item.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.id === "bugs" && overview && overview.bugs.open > 0 ? (
                    <span className="ml-2 inline-flex min-w-5 justify-center rounded-full bg-red-500/10 px-1.5 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400">
                      {overview.bugs.open}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            {error ? (
              <div className="mb-6 rounded-md border border-red-300/50 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : null}

            {loading && !overview ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : null}

            {tab === "overview" && overview && growth ? (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <StatCard
                    label="Workspaces"
                    value={overview.workspaces.total.toLocaleString()}
                    hint={`${overview.workspaces.newInWindow} new · ${overview.workspaces.activeInWindow} active in ${overview.days}d`}
                  />
                  <StatCard
                    label="People"
                    value={overview.teams.people.toLocaleString()}
                    hint={`${overview.teams.medianTeamSize.toLocaleString(undefined, { maximumFractionDigits: 1 })} per workspace, typically`}
                  />
                  <StatCard
                    label="Revenue"
                    value={dollars(overview.revenue.totalCents)}
                    hint={`${dollars(overview.revenue.windowCents)} in ${overview.days}d`}
                  />
                  <StatCard
                    label={`Margin (${overview.days}d)`}
                    value={usd(overview.margin.marginUsd)}
                    tone={overview.margin.marginUsd >= 0 ? "positive" : "negative"}
                    hint={`${usd(overview.margin.chargedUsd)} charged · ${usd(overview.margin.costUsd)} cost`}
                  />
                </div>

                {/* items-start so the shorter card keeps its own height rather
                    than being stretched to match the taller one. */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
                  <SectionCard
                    title="Workspaces and people"
                    action={
                      <span className="text-xs text-muted-foreground">
                        {overview.workspaces.total.toLocaleString()} workspace
                        {overview.workspaces.total === 1 ? "" : "s"} ·{" "}
                        {overview.teams.people.toLocaleString()}{" "}
                        {overview.teams.people === 1 ? "person" : "people"}
                      </span>
                    }
                  >
                    <div className="flex flex-col gap-5">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
                        <div>
                          <dt className="text-xs text-muted-foreground">Typical team</dt>
                          <dd className="font-medium tabular-nums text-foreground">
                            {overview.teams.medianTeamSize.toLocaleString(undefined, {
                              maximumFractionDigits: 1,
                            })}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted-foreground">Average</dt>
                          <dd className="font-medium tabular-nums text-foreground">
                            {overview.teams.meanTeamSize.toLocaleString(undefined, {
                              maximumFractionDigits: 1,
                            })}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted-foreground">Largest</dt>
                          <dd className="font-medium tabular-nums text-foreground">
                            {overview.teams.largestTeam.toLocaleString()}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted-foreground">Admins</dt>
                          <dd className="font-medium tabular-nums text-foreground">
                            {overview.users.admins.toLocaleString()}
                          </dd>
                        </div>
                      </dl>

                      <TeamSizeBar
                        distribution={overview.teams.distribution}
                        workspaces={overview.workspaces.total}
                      />

                      {overview.teams.people !== overview.teams.activePeople ? (
                        <p className="text-xs text-muted-foreground">
                          Includes{" "}
                          {(overview.teams.people - overview.teams.activePeople).toLocaleString()}{" "}
                          deactivated account
                          {overview.teams.people - overview.teams.activePeople === 1 ? "" : "s"}.
                        </p>
                      ) : null}
                    </div>
                  </SectionCard>

                  <SectionCard title="Biggest teams">
                    <BiggestTeams
                      workspaces={topTeams}
                      onOpen={(id) => setSearchParams({ tab: "customers", workspace: id })}
                    />
                  </SectionCard>
                </div>

                <SectionCard title={`Growth and burn (last ${growth.days} days)`}>
                  <GrowthChart series={growth.series} />
                </SectionCard>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <SectionCard title="Credits">
                    <dl className="flex flex-col gap-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Granted, all time</dt>
                        <dd className="tabular-nums text-foreground">
                          {overview.credits.granted.toLocaleString()}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Consumed, all time</dt>
                        <dd className="tabular-nums text-foreground">
                          {overview.credits.used.toLocaleString()}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Metered runs</dt>
                        <dd className="tabular-nums text-foreground">
                          {overview.credits.events.toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                  </SectionCard>

                  <SectionCard title="Bug reports">
                    <dl className="flex flex-col gap-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Open</dt>
                        <dd className="tabular-nums font-medium text-foreground">
                          {overview.bugs.open}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">In progress</dt>
                        <dd className="tabular-nums text-foreground">{overview.bugs.inProgress}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Filed, all time</dt>
                        <dd className="tabular-nums text-foreground">{overview.bugs.total}</dd>
                      </div>
                    </dl>
                  </SectionCard>
                </div>
              </div>
            ) : null}

            {tab === "customers" ? (
              selectedWorkspace ? (
                <WorkspaceDetail
                  id={selectedWorkspace}
                  onBack={() => setSearchParams({ tab: "customers" })}
                />
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search by workspace name or Slack team id"
                      className="gaspo-focus-ring h-10 w-full rounded-[7px] border border-border bg-card pr-3 pl-9 text-sm text-foreground outline-0 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 text-xs text-muted-foreground">Sort by</span>
                    {SORTS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSort(option.id)}
                        className={`gaspo-focus-ring min-h-8 cursor-pointer rounded-md border px-3 py-1 text-xs font-medium transition-colors ${
                          sort === option.id
                            ? "border-transparent bg-secondary text-foreground"
                            : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <SectionCard
                    title={
                      // The page size caps at 50, so the count shown and the
                      // count that exists are different questions once the
                      // platform outgrows one page.
                      workspaces.length === workspaceTotal
                        ? `${workspaceTotal} workspace${workspaceTotal === 1 ? "" : "s"}`
                        : `${workspaces.length} of ${workspaceTotal} workspaces`
                    }
                    action={
                      workspaces.length ? (
                        <span className="text-xs text-muted-foreground">
                          {workspaces
                            .reduce((sum, workspace) => sum + workspace.members.total, 0)
                            .toLocaleString()}{" "}
                          people listed
                        </span>
                      ) : null
                    }
                  >
                    {workspaces.length ? (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] border-collapse">
                          <thead>
                            <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              <th className="px-3 pb-2">Workspace</th>
                              <th className="px-3 pb-2">People</th>
                              <th className="px-3 pb-2">Plan</th>
                              <th className="px-3 pb-2">Credits left</th>
                              <th className="px-3 pb-2">Paid</th>
                              <th className="px-3 pb-2">Last active</th>
                            </tr>
                          </thead>
                          <tbody>
                            {workspaces.map((workspace) => (
                              <tr
                                key={workspace.id}
                                onClick={() =>
                                  setSearchParams({ tab: "customers", workspace: workspace.id })
                                }
                                className="cursor-pointer border-t border-border text-sm transition-colors hover:bg-accent/50"
                              >
                                <td className="px-3 py-2.5">
                                  <div className="flex min-w-0 flex-col">
                                    <span className="truncate font-medium text-foreground">
                                      {workspace.name}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                      {workspace.slackTeamId} · {workspace.connectedAccounts} app
                                      {workspace.connectedAccounts === 1 ? "" : "s"}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-2.5">
                                  <div className="flex flex-col">
                                    <span className="tabular-nums text-foreground">
                                      {workspace.members.total}
                                    </span>
                                    <span className="text-xs whitespace-nowrap text-muted-foreground">
                                      {workspace.members.admins} admin
                                      {workspace.members.admins === 1 ? "" : "s"}
                                      {workspace.members.active < workspace.members.total
                                        ? ` · ${workspace.members.total - workspace.members.active} off`
                                        : ""}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-2.5">
                                  {workspace.plan ? (
                                    <span className="capitalize text-foreground">
                                      {workspace.plan.planId}
                                      <span className="ml-1 text-xs text-muted-foreground">
                                        {workspace.plan.status.replace("_", " ")}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">Trial</span>
                                  )}
                                </td>
                                <td className="px-3 py-2.5 tabular-nums text-foreground">
                                  {workspace.credits.balance.toLocaleString()}
                                </td>
                                <td className="px-3 py-2.5 tabular-nums text-muted-foreground">
                                  {workspace.paidCents > 0 ? dollars(workspace.paidCents) : "—"}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap text-muted-foreground">
                                  {relativeDay(workspace.lastActivityAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {search ? "No workspace matches that search." : "No workspaces yet."}
                      </p>
                    )}
                  </SectionCard>
                </div>
              )
            ) : null}

            {tab === "bugs" ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {([{ id: "all", label: "All" }, ...BUG_STATUSES] as const).map((status) => (
                    <button
                      key={status.id}
                      type="button"
                      onClick={() => setBugFilter(status.id as BugStatus | "all")}
                      className={`gaspo-focus-ring min-h-8 cursor-pointer rounded-md border px-3 py-1 text-xs font-medium transition-colors ${
                        bugFilter === status.id
                          ? "border-transparent bg-secondary text-foreground"
                          : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>

                <SectionCard title={`${bugs.length} report${bugs.length === 1 ? "" : "s"}`}>
                  {bugs.length ? (
                    <div className="flex flex-col">
                      {bugs.map((report) => (
                        <BugRow
                          key={report.id}
                          report={report}
                          onChange={(updated) =>
                            setBugs((previous) =>
                              // A report that no longer matches the active filter
                              // drops out of the list, so triaging one moves it
                              // off the queue without a reload.
                              previous
                                .map((row) => (row.id === updated.id ? updated : row))
                                .filter((row) => bugFilter === "all" || row.status === bugFilter),
                            )
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-8 text-center">
                      <Bug className="size-8 text-muted-foreground opacity-40" strokeWidth={1.5} />
                      <p className="text-sm text-muted-foreground">
                        {bugFilter === "open"
                          ? "Nothing open. Everything reported has been dealt with."
                          : "No reports with this status."}
                      </p>
                    </div>
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
