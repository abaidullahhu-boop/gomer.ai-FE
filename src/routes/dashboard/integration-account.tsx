import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRight, Loader2, Lock, Search, Users, Zap } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { IntegrationIcon } from "@/components/dashboard/IntegrationIcon";
import { Toast } from "@/components/dashboard/Toast";
import {
  disconnectIntegration,
  fetchIntegrationTools,
  integrationConfigurePath,
  parseConfigureProvider,
  updateIntegration,
  type AppTool,
  type ConnectedIntegration,
  type IntegrationAccessLevel,
} from "@/lib/api";
import { loadConnected } from "@/lib/integrations-cache";

type Tab = "tools" | "access" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "tools", label: "Tools" },
  { id: "access", label: "Access" },
  { id: "settings", label: "Settings" },
];

const accountLabelOf = (account: ConnectedIntegration) =>
  account.nickname || account.accountName || account.externalAccountId || "Account";

export default function DashboardIntegrationAccount() {
  const { provider = "", accountId = "" } = useParams();
  const appSlug = parseConfigureProvider(provider);
  const navigate = useNavigate();

  const [account, setAccount] = useState<ConnectedIntegration | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("tools");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [tools, setTools] = useState<AppTool[]>([]);
  const [toolsLoading, setToolsLoading] = useState(true);
  const [toolsError, setToolsError] = useState<string | null>(null);
  const [toolSearch, setToolSearch] = useState("");

  const [label, setLabel] = useState("");

  // Load the specific account from the shared connected-accounts cache.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const all = await loadConnected();
        if (cancelled) return;
        const found = all.find((entry) => entry.id === accountId) ?? null;
        setAccount(found);
        setLabel(found?.nickname ?? "");
      } catch (error) {
        console.error("Failed to load account", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [accountId]);

  // The actions this app exposes — what Gomer can do with it.
  useEffect(() => {
    if (!appSlug) return;
    let cancelled = false;
    setToolsLoading(true);
    setToolsError(null);
    fetchIntegrationTools(appSlug)
      .then((result) => {
        if (!cancelled) setTools(result.tools);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load app tools", error);
        setToolsError(
          error instanceof Error && error.message
            ? error.message
            : "Could not load this app's actions.",
        );
      })
      .finally(() => {
        if (!cancelled) setToolsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [appSlug]);

  // Bad route param — bounce back to the integrations list.
  useEffect(() => {
    if (!appSlug) navigate("/dashboard/integrations", { replace: true });
  }, [appSlug, navigate]);

  const filteredTools = useMemo(() => {
    const query = toolSearch.trim().toLowerCase();
    if (!query) return tools;
    return tools.filter((tool) =>
      `${tool.name} ${tool.description ?? ""}`.toLowerCase().includes(query),
    );
  }, [tools, toolSearch]);

  // Persist a field change, refresh the shared cache, and reflect it locally.
  const persist = useCallback(
    async (patch: {
      nickname?: string;
      accessLevel?: IntegrationAccessLevel;
      isActive?: boolean;
    }) => {
      if (!account) return;
      setSaving(true);
      try {
        const updated = await updateIntegration(account.id, patch);
        setAccount(updated);
        setLabel(updated.nickname ?? "");
        await loadConnected(true);
        setToast("Saved");
      } catch (error) {
        console.error("Failed to update integration", error);
        setToast("Could not save changes. Please try again.");
      } finally {
        setSaving(false);
      }
    },
    [account],
  );

  const handleDisconnect = useCallback(async () => {
    if (!account) return;
    setSaving(true);
    try {
      await disconnectIntegration(account.id);
      await loadConnected(true);
      navigate(appSlug ? integrationConfigurePath(appSlug) : "/dashboard/integrations");
    } catch (error) {
      console.error("Failed to disconnect", error);
      setToast("Could not disconnect. Please try again.");
      setSaving(false);
    }
  }, [account, appSlug, navigate]);

  if (!appSlug) return null;

  const appName = account?.appName ?? appSlug;
  const title = account ? accountLabelOf(account) : appName;

  return (
    <>
      <PageMeta title={`${title} — Integrations`} description={`Manage your ${appName} account.`} />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-2 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
              <Link to="/dashboard/integrations" className="hover:text-foreground">
                Integrations
              </Link>
              <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden />
              <Link to={integrationConfigurePath(appSlug)} className="hover:text-foreground">
                {appName}
              </Link>
              <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden />
              <span className="text-foreground">{title}</span>
            </nav>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
              </div>
            ) : !account ? (
              <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                <p className="text-sm text-muted-foreground">This account no longer exists.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-card p-1">
                    <IntegrationIcon name={appName} iconUrl={account.iconUrl ?? undefined} />
                  </div>
                  <h1 className="truncate text-3xl font-bold leading-8 text-foreground">
                    {appName} - {title}
                  </h1>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex gap-0.5">
                  {TABS.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setTab(entry.id)}
                      className={[
                        "gomer-focus-ring inline-flex min-h-9 cursor-pointer select-none items-center justify-center rounded-[7px] border-0 px-4 py-2 text-sm font-medium transition-[background-color,transform] duration-200 active:scale-[0.98]",
                        tab === entry.id
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-transparent text-muted-foreground hover:bg-accent",
                      ].join(" ")}
                    >
                      {entry.label}
                    </button>
                  ))}
                </div>

                {tab === "tools" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm leading-5 transition-colors focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2">
                      <Search
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <input
                        value={toolSearch}
                        onChange={(event) => setToolSearch(event.target.value)}
                        placeholder="Search tools"
                        className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Zap
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <h2 className="text-sm font-semibold text-foreground">
                        What Gomer can do for you
                      </h2>
                      {!toolsLoading && !toolsError && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          {tools.length}
                        </span>
                      )}
                    </div>

                    {toolsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2
                          className="size-5 animate-spin text-muted-foreground"
                          aria-hidden
                        />
                      </div>
                    ) : toolsError ? (
                      <p className="rounded-xl border border-border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
                        {toolsError}
                      </p>
                    ) : tools.length === 0 ? (
                      <p className="rounded-xl border border-border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
                        This app doesn’t expose any actions Gomer can use yet.
                      </p>
                    ) : filteredTools.length === 0 ? (
                      <p className="px-1 py-4 text-sm text-muted-foreground">
                        No actions match your search.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {filteredTools.map((tool) => (
                          <div
                            key={tool.key}
                            className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3"
                          >
                            <span className="truncate text-sm font-medium text-foreground">
                              {tool.name}
                            </span>
                            {tool.description && (
                              <span className="line-clamp-2 text-xs leading-4 text-muted-foreground">
                                {tool.description}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {tab === "access" && (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Who should have access?
                    </p>
                    {[
                      {
                        value: "team" as const,
                        icon: Users,
                        title: "Team-only",
                        desc: "Everyone in your workspace can use this account.",
                      },
                      {
                        value: "private" as const,
                        icon: Lock,
                        title: "Private (Invite only)",
                        desc: "Only you can see and use this account.",
                      },
                    ].map((option) => {
                      const selected = account.accessLevel === option.value;
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          disabled={saving || selected}
                          onClick={() => void persist({ accessLevel: option.value })}
                          className={[
                            "gomer-focus-ring flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors disabled:cursor-default",
                            selected
                              ? "border-highlight bg-highlight/10"
                              : "border-border bg-card hover:bg-accent",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "flex size-4 shrink-0 items-center justify-center rounded-full border",
                              selected ? "border-highlight" : "border-muted-foreground",
                            ].join(" ")}
                          >
                            {selected && <span className="size-2 rounded-full bg-highlight" />}
                          </span>
                          <Icon
                            className="size-4 shrink-0 text-muted-foreground"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                          <span className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">
                              {option.title}
                            </span>
                            <span className="text-xs text-muted-foreground">{option.desc}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {tab === "settings" && (
                  <div className="flex flex-col divide-y divide-border">
                    <div className="flex flex-col gap-2 pb-6">
                      <label
                        className="text-sm font-medium text-foreground"
                        htmlFor="account-label"
                      >
                        Account label
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Gomer uses the label to tell your connections apart
                      </p>
                      <div className="flex gap-2">
                        <input
                          id="account-label"
                          value={label}
                          onChange={(event) => setLabel(event.target.value)}
                          placeholder={account.accountName ?? "Account label"}
                          className="h-10 flex-1 rounded-[7px] border border-border bg-muted px-3 text-sm text-foreground outline-none focus:outline-2 focus:outline-ring focus:outline-offset-2"
                        />
                        <button
                          type="button"
                          disabled={saving || label === (account.nickname ?? "")}
                          onClick={() => void persist({ nickname: label })}
                          className="gomer-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center rounded-[7px] bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,transform] duration-200 hover:bg-accent active:scale-[0.98] disabled:cursor-default disabled:opacity-60"
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          Enable integration
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Allow Gomer to use this {appName} connection
                        </span>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={account.isActive}
                        disabled={saving}
                        onClick={() => void persist({ isActive: !account.isActive })}
                        className={[
                          "gomer-focus-ring relative inline-flex w-10.5 shrink-0 cursor-pointer rounded-full border border-border p-1 transition-colors duration-150 outline-none disabled:cursor-default",
                          account.isActive ? "border-highlight bg-highlight" : "bg-secondary",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "size-4 rounded-full bg-muted-foreground transition-all duration-150",
                            account.isActive ? "translate-x-4 bg-primary-foreground" : "",
                          ].join(" ")}
                        />
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 pt-6">
                      <span className="text-sm font-medium text-destructive">
                        Disconnect integration
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Remove this connection and revoke Gomer’s access. Your other {appName}{" "}
                        connections are not affected.
                      </span>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => void handleDisconnect()}
                        className="gomer-focus-ring mt-1 inline-flex min-h-9 w-fit cursor-pointer select-none items-center gap-2 rounded-[7px] border border-border px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/15 disabled:cursor-default disabled:opacity-60"
                      >
                        {saving ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
                        Disconnect integration
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
