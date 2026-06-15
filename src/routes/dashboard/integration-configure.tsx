import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRight, Loader2, Plus, Search, Users, Zap } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { IntegrationIcon } from "@/components/dashboard/IntegrationIcon";
import { Toast } from "@/components/dashboard/Toast";
import {
  disconnectIntegration,
  fetchConnectedIntegrations,
  fetchIntegrationTools,
  parseConfigureProvider,
  type AppTool,
  type ConnectedIntegration,
} from "@/lib/api";
import { usePipedreamConnect } from "@/lib/pipedream";

export default function DashboardIntegrationConfigure() {
  const { provider = "" } = useParams();
  const appSlug = parseConfigureProvider(provider);
  const navigate = useNavigate();
  const { connect, ready } = usePipedreamConnect();

  const [accounts, setAccounts] = useState<ConnectedIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [tools, setTools] = useState<AppTool[]>([]);
  const [toolsLoading, setToolsLoading] = useState(true);
  const [toolsError, setToolsError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!appSlug) return;
    try {
      const all = await fetchConnectedIntegrations();
      setAccounts(all.filter((account) => account.appSlug === appSlug));
    } catch (error) {
      console.error("Failed to load connected accounts", error);
    } finally {
      setLoading(false);
    }
  }, [appSlug]);

  useEffect(() => {
    void load();
  }, [load]);

  // The actions this app exposes — what Gomer can actually do with it.
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

  // The app's display name/icon come from any of its connected accounts.
  const app = accounts[0];

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return accounts;
    return accounts.filter((account) =>
      (account.accountName ?? account.externalAccountId ?? "").toLowerCase().includes(query),
    );
  }, [accounts, search]);

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tools;
    return tools.filter((tool) =>
      `${tool.name} ${tool.description ?? ""}`.toLowerCase().includes(query),
    );
  }, [tools, search]);

  const handleAddAccount = useCallback(async () => {
    if (!appSlug || !ready) return;
    setAdding(true);
    try {
      await connect(appSlug);
      await load();
      setToast(`Successfully connected your ${app?.appName ?? appSlug} account!`);
    } catch (error) {
      console.error("Failed to connect account", error);
    } finally {
      setAdding(false);
    }
  }, [app?.appName, appSlug, connect, load, ready]);

  const handleDisconnect = useCallback(
    async (account: ConnectedIntegration) => {
      setBusyId(account.id);
      try {
        await disconnectIntegration(account.id);
        const remaining = await fetchConnectedIntegrations();
        const stillHere = remaining.filter((entry) => entry.appSlug === appSlug);
        if (stillHere.length === 0) {
          navigate("/dashboard/integrations");
          return;
        }
        setAccounts(stillHere);
      } catch (error) {
        console.error("Failed to disconnect account", error);
      } finally {
        setBusyId(null);
      }
    },
    [appSlug, navigate],
  );

  // Bad route param, or every account was disconnected elsewhere — go back.
  useEffect(() => {
    if (!appSlug) navigate("/dashboard/integrations", { replace: true });
  }, [appSlug, navigate]);

  if (!appSlug) return null;

  const appName = app?.appName ?? appSlug;

  return (
    <>
      <PageMeta
        title={`${appName} — Integrations`}
        description={`Manage your ${appName} accounts.`}
      />
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
              <span className="text-foreground">{appName}</span>
            </nav>

            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-card p-1">
                  <IntegrationIcon name={appName} iconUrl={app?.iconUrl ?? undefined} />
                </div>
                <h1 className="truncate text-3xl font-bold leading-8 text-foreground">{appName}</h1>
              </div>
              <button
                type="button"
                onClick={handleAddAccount}
                disabled={adding || !ready}
                className="gomer-focus-ring inline-flex min-h-9 shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,transform] duration-200 hover:bg-accent active:scale-[0.98] disabled:cursor-default disabled:opacity-70"
              >
                {adding ? (
                  <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden />
                ) : (
                  <Plus className="size-4 shrink-0" strokeWidth={1.5} />
                )}
                Add another account
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
              </div>
            ) : (
              <div className="flex w-full flex-col gap-4">
                <div className="flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm leading-5 transition-colors outline-none hover:border-border/80 focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2">
                  <Search
                    className="size-4 shrink-0 text-muted-foreground"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search accounts and actions"
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  {accounts.length} account{accounts.length === 1 ? "" : "s"} connected
                </p>

                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border text-xs font-medium text-muted-foreground">
                        <th className="px-4 py-3">Account label</th>
                        <th className="px-4 py-3">Access</th>
                        <th className="px-4 py-3">Added by</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                            No accounts match your search.
                          </td>
                        </tr>
                      ) : (
                        filtered.map((account) => (
                          <tr
                            key={account.id}
                            className="border-b border-border last:border-b-0 text-foreground"
                          >
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-2">
                                <span
                                  className={`size-2 shrink-0 rounded-full ${account.isActive ? "bg-highlight" : "bg-muted-foreground"}`}
                                />
                                <span className="truncate font-medium">
                                  {account.accountName || account.externalAccountId || "Account"}
                                </span>
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <Users className="size-3.5" strokeWidth={1.5} aria-hidden />
                                Workspace
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              <span className="inline-flex items-center gap-2">
                                <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-medium uppercase text-secondary-foreground">
                                  {(account.userName ?? "?").trim().charAt(0)}
                                </span>
                                {account.userName ?? "—"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleDisconnect(account)}
                                disabled={busyId === account.id}
                                className="gomer-focus-ring inline-flex cursor-pointer items-center gap-1 rounded-[7px] px-2 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/15 disabled:cursor-default disabled:opacity-60"
                              >
                                {busyId === account.id ? (
                                  <Loader2 className="size-3.5 animate-spin" aria-hidden />
                                ) : null}
                                Disconnect
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* What Gomer can do with this app — the live MCP tool list. */}
                <div className="mt-2 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Zap
                      className="size-4 shrink-0 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <h2 className="text-sm font-semibold text-foreground">
                      What Gomer can do with {appName}
                    </h2>
                    {!toolsLoading && !toolsError && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {tools.length}
                      </span>
                    )}
                  </div>

                  {toolsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
                    </div>
                  ) : toolsError ? (
                    <p className="rounded-xl border border-border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
                      {toolsError}
                    </p>
                  ) : tools.length === 0 ? (
                    <p className="rounded-xl border border-border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
                      This app doesn’t expose any actions Gomer can use yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {filteredTools.length === 0 ? (
                        <p className="col-span-full px-1 py-4 text-sm text-muted-foreground">
                          No actions match your search.
                        </p>
                      ) : (
                        filteredTools.map((tool) => (
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
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
