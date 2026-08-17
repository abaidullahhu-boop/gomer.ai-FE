import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import {
  ApiError,
  fetchMemoryFacts,
  fetchRoasSnapshots,
  fetchRuleActions,
  fetchRules,
  fetchScheduledExports,
  type AdRule,
  type AdRuleAction,
  type RoasSnapshot,
  type ScheduledExportRow,
  type WorkspaceMemoryFact,
} from "@/lib/api";

type Tab = "rules" | "reports" | "memory" | "roas";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "rules", label: "Rules" },
  { id: "reports", label: "Reports" },
  { id: "memory", label: "Memory" },
  { id: "roas", label: "Verified ROAS" },
];

const METRIC_LABELS: Record<AdRule["metric"], string> = {
  spend: "Spend",
  cpa: "CPA",
  roas: "ROAS",
  verified_roas: "Verified ROAS",
  ctr: "CTR",
  cpc: "CPC",
};

const COMPARATOR_LABELS: Record<AdRule["comparator"], string> = {
  gt: ">",
  gte: "≥",
  lt: "<",
  lte: "≤",
};

const DATASET_LABELS: Record<string, string> = {
  campaign_performance: "Campaign performance",
  verified_roas: "Verified ROAS",
  rule_actions: "Rule activity",
};

function when(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function number(value: string | null, digits = 2): string {
  if (value === null) return "—";
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed.toFixed(digits) : "—";
}

/** A rule stated the way it was described in chat, e.g. "CPA > 40 over 3 days". */
function describe(rule: AdRule): string {
  const metric = METRIC_LABELS[rule.metric] ?? rule.metric;
  const comparator = COMPARATOR_LABELS[rule.comparator] ?? rule.comparator;
  return `${metric} ${comparator} ${number(rule.threshold)} over ${rule.windowDays} day${
    rule.windowDays === 1 ? "" : "s"
  }`;
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  const tones = {
    neutral: "bg-secondary text-secondary-foreground",
    good: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
    warn: "bg-amber-500/12 text-amber-700 dark:text-amber-400",
    bad: "bg-red-500/12 text-red-600 dark:text-red-400",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="min-w-0 rounded-[7px] border border-border bg-card p-5">{children}</div>;
}

function Empty({ title, hint }: { title: string; hint: string }) {
  return (
    <Card>
      <p className="font-body text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </Card>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[7px] border border-border bg-card">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border text-left font-medium text-secondary-foreground">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default function DashboardAutomations() {
  const [tab, setTab] = useState<Tab>("rules");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rules, setRules] = useState<AdRule[]>([]);
  const [actions, setActions] = useState<AdRuleAction[]>([]);
  const [exports, setExports] = useState<ScheduledExportRow[]>([]);
  const [facts, setFacts] = useState<WorkspaceMemoryFact[]>([]);
  const [snapshots, setSnapshots] = useState<RoasSnapshot[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [r, a, e, m, s] = await Promise.all([
        fetchRules(),
        fetchRuleActions(50),
        fetchScheduledExports(),
        fetchMemoryFacts(),
        fetchRoasSnapshots(20),
      ]);
      setRules(r);
      setActions(a);
      setExports(e);
      setFacts(m);
      setSnapshots(s);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load automations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <>
      <PageMeta
        title="Automations — Gomer"
        description="Rules, reports, memory and verified ROAS."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 py-8 sm:px-12"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-bold leading-8 text-foreground">Automations</h1>
              <button
                type="button"
                onClick={() => void load()}
                className="gomer-focus-ring flex min-h-9 cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
            <p className="mb-6 max-w-[65ch] text-sm text-muted-foreground">
              What Gomer is running unattended. Set these up by asking Gomer in Slack — this page
              reports on them.
            </p>

            <div className="mb-6 flex gap-1 rounded-md border border-border bg-card p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={[
                    "gomer-focus-ring inline-flex min-h-9 flex-1 cursor-pointer items-center justify-center rounded-[5px] px-3 py-1.5 text-sm font-medium transition-colors",
                    tab === t.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-transparent text-muted-foreground hover:bg-accent",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {error ? (
              <div className="mb-4 rounded-[7px] border border-red-500/30 bg-red-500/8 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : null}

            {loading ? (
              <Card>
                <p className="text-sm text-muted-foreground">Loading…</p>
              </Card>
            ) : (
              <div className="flex min-w-0 flex-col gap-4">
                {tab === "rules" ? <RulesTab rules={rules} actions={actions} /> : null}
                {tab === "reports" ? <ReportsTab rows={exports} /> : null}
                {tab === "memory" ? <MemoryTab facts={facts} /> : null}
                {tab === "roas" ? <RoasTab snapshots={snapshots} /> : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function RulesTab({ rules, actions }: { rules: AdRule[]; actions: AdRuleAction[] }) {
  return (
    <>
      {rules.length === 0 ? (
        <Empty
          title="No rules yet"
          hint='Ask Gomer in Slack, e.g. "every night at 2am pause any campaign whose CPA over the last 3 days is above 40".'
        />
      ) : (
        <Table head={["Rule", "Condition", "Action", "Schedule", "Last run", "Status"]}>
          {rules.map((rule) => (
            <tr key={rule.id} className="border-b border-border last:border-b-0">
              <td className="px-4 py-3">
                <div className="font-medium text-foreground">{rule.name}</div>
                <div className="text-xs text-muted-foreground">
                  {rule.scope} · {rule.adAccountId}
                </div>
              </td>
              <td className="px-4 py-3 tabular-nums text-secondary-foreground">{describe(rule)}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Pill tone={rule.action === "alert" ? "neutral" : "warn"}>
                    {rule.action === "scale" && rule.scalePct !== null
                      ? `scale ${rule.scalePct > 0 ? "+" : ""}${rule.scalePct}%`
                      : rule.action}
                  </Pill>
                  {rule.action !== "alert" && !rule.autoExecute ? (
                    <Pill tone="neutral">alert only</Pill>
                  ) : null}
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                <div className="font-mono">{rule.cronExpression}</div>
                {rule.timezone ? <div>{rule.timezone}</div> : null}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-secondary-foreground">
                {when(rule.lastRun)}
              </td>
              <td className="px-4 py-3">
                {rule.isActive ? <Pill tone="good">Active</Pill> : <Pill>Paused</Pill>}
              </td>
            </tr>
          ))}
        </Table>
      )}

      <div>
        <h2 className="mb-2 font-body text-base font-medium text-foreground">Recent activity</h2>
        {actions.length === 0 ? (
          <Empty
            title="Nothing has triggered yet"
            hint="Actions appear here when a rule's threshold is crossed. An empty list means nothing has breached."
          />
        ) : (
          <Table head={["When", "Rule", "Target", "Measured", "Did", "Result"]}>
            {actions.map((action) => (
              <tr key={action.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 whitespace-nowrap text-secondary-foreground">
                  {when(action.createdAt)}
                </td>
                <td className="px-4 py-3 text-foreground">{action.rule?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="text-foreground">
                    {action.entityName ?? action.entityId ?? "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">{action.entityType}</div>
                </td>
                <td className="px-4 py-3 tabular-nums text-secondary-foreground">
                  {number(action.metricValue)}
                </td>
                <td className="px-4 py-3">
                  <Pill>{action.action}</Pill>
                  {action.detail ? (
                    <div className="mt-1 text-xs text-muted-foreground">{action.detail}</div>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  {action.success ? (
                    <Pill tone="good">Done</Pill>
                  ) : (
                    <>
                      <Pill tone="bad">Failed</Pill>
                      {action.error ? (
                        <div className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {action.error}
                        </div>
                      ) : null}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>
    </>
  );
}

function ReportsTab({ rows }: { rows: ScheduledExportRow[] }) {
  if (rows.length === 0) {
    return (
      <Empty
        title="No scheduled reports"
        hint={`Ask Gomer, e.g. "every Monday at 8am put last week's campaign performance in that sheet".`}
      />
    );
  }
  return (
    <Table head={["Report", "Destination", "Schedule", "Last run", "Rows", "Status"]}>
      {rows.map((row) => (
        <tr key={row.id} className="border-b border-border last:border-b-0">
          <td className="px-4 py-3">
            <div className="font-medium text-foreground">{row.name}</div>
            <div className="text-xs text-muted-foreground">
              {DATASET_LABELS[row.dataset] ?? row.dataset} · last {row.windowDays}d
            </div>
          </td>
          <td className="px-4 py-3">
            {row.spreadsheetUrl ? (
              <a
                href={row.spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
                className="gomer-focus-ring text-highlight underline underline-offset-2"
              >
                {row.spreadsheetTitle ?? "Open sheet"}
              </a>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
            <div className="text-xs text-muted-foreground">tab: {row.sheetTitle}</div>
          </td>
          <td className="px-4 py-3 text-xs text-muted-foreground">
            <div className="font-mono">{row.cronExpression}</div>
            {row.timezone ? <div>{row.timezone}</div> : null}
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-secondary-foreground">
            {when(row.lastRun)}
          </td>
          <td className="px-4 py-3 tabular-nums text-secondary-foreground">
            {row.lastRowCount ?? "—"}
          </td>
          <td className="px-4 py-3">
            {row.lastError ? (
              <>
                <Pill tone="bad">Failed</Pill>
                <div className="mt-1 max-w-[22ch] text-xs text-red-600 dark:text-red-400">
                  {row.lastError}
                </div>
              </>
            ) : row.isActive ? (
              <Pill tone="good">Active</Pill>
            ) : (
              <Pill>Paused</Pill>
            )}
          </td>
        </tr>
      ))}
    </Table>
  );
}

function MemoryTab({ facts }: { facts: WorkspaceMemoryFact[] }) {
  if (facts.length === 0) {
    return (
      <Empty
        title="Nothing remembered yet"
        hint='Tell Gomer something durable, e.g. "our target ROAS is 3" or "remember our alerts channel is #ads-alerts".'
      />
    );
  }
  return (
    <>
      <Table head={["Fact", "Value", "Updated"]}>
        {facts.map((fact) => (
          <tr key={fact.id} className="border-b border-border last:border-b-0">
            <td className="px-4 py-3 align-top font-mono text-xs text-secondary-foreground">
              {fact.key}
            </td>
            <td className="px-4 py-3 text-foreground">{fact.value}</td>
            <td className="px-4 py-3 whitespace-nowrap align-top text-secondary-foreground">
              {when(fact.updatedAt)}
            </td>
          </tr>
        ))}
      </Table>
      <p className="text-sm text-muted-foreground">
        Gomer uses these in every conversation. To change or drop one, just tell it — e.g. “forget
        our target ROAS”.
      </p>
    </>
  );
}

function RoasTab({ snapshots }: { snapshots: RoasSnapshot[] }) {
  if (snapshots.length === 0) {
    return (
      <Empty
        title="No verified checks yet"
        hint={`Ask Gomer "what's our real ROAS for the last 7 days?" with Stripe connected, and the result is recorded here.`}
      />
    );
  }
  return (
    <>
      <Table
        head={[
          "Checked",
          "Ad account",
          "Window",
          "Ad spend",
          "Stripe revenue",
          "Verified ROAS",
          "CPA",
        ]}
      >
        {snapshots.map((snap) => (
          <tr key={snap.id} className="border-b border-border last:border-b-0">
            <td className="px-4 py-3 whitespace-nowrap text-secondary-foreground">
              {when(snap.createdAt)}
            </td>
            <td className="px-4 py-3 font-mono text-xs text-secondary-foreground">
              {snap.adAccountId}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
              {snap.sinceDate} → {snap.untilDate}
            </td>
            <td className="px-4 py-3 tabular-nums text-secondary-foreground">
              {number(snap.metaSpend)} {snap.spendCurrency ?? ""}
            </td>
            <td className="px-4 py-3 tabular-nums text-secondary-foreground">
              {number(snap.stripeRevenue)} {snap.revenueCurrency ?? ""}
            </td>
            <td className="px-4 py-3 tabular-nums font-medium text-foreground">
              {number(snap.roas)}
            </td>
            <td className="px-4 py-3 tabular-nums text-secondary-foreground">{number(snap.cpa)}</td>
          </tr>
        ))}
      </Table>
      <p className="max-w-[65ch] text-sm text-muted-foreground">
        Stripe revenue is <strong>blended</strong> — it includes money from customers who never saw
        an ad. Verified ROAS is a reality check on the platform&apos;s own figure, not a
        per-campaign attribution model.
      </p>
    </>
  );
}
