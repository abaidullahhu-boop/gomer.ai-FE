import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Search } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { IntegrationCard } from "@/components/dashboard/IntegrationCard";
import { Toast } from "@/components/dashboard/Toast";
import {
  fetchIntegrationApps,
  integrationConfigurePath,
  type CatalogApp,
  type ConnectedIntegration,
} from "@/lib/api";
import {
  getCachedConnected,
  getCatalogSnapshot,
  loadConnected,
  setCatalogSnapshot,
} from "@/lib/integrations-cache";
import { usePipedreamConnect } from "@/lib/pipedream";

type Tab = "all" | "popular";

// How many cards to reveal at a time. We render a growing window over the
// loaded apps and only fetch the next server page once the window catches up,
// so the grid starts small and lazy-loads as the user scrolls to the end.
const PAGE_SIZE = 48;

const accountsLabel = (count: number) => `${count} account${count === 1 ? "" : "s"} connected`;

export default function DashboardIntegrations() {
  const { connect, ready } = usePipedreamConnect();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [connectedOnly, setConnectedOnly] = useState(false);

  // Seed from the cached default view so a revisit restores instantly with no
  // network call; falls back to a fresh load when the cache is cold.
  const cachedCatalog = getCatalogSnapshot();
  const [apps, setApps] = useState<CatalogApp[]>(() => cachedCatalog?.apps ?? []);
  const [cursor, setCursor] = useState<string | undefined>(() => cachedCatalog?.cursor);
  const [visibleCount, setVisibleCount] = useState(() => cachedCatalog?.visibleCount ?? PAGE_SIZE);
  const [loading, setLoading] = useState(() => !cachedCatalog);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [connected, setConnected] = useState<ConnectedIntegration[]>(
    () => getCachedConnected() ?? [],
  );
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Connected accounts grouped by app slug — an app can have several accounts.
  const connectedGroups = useMemo(() => {
    const map = new Map<string, ConnectedIntegration[]>();
    for (const integration of connected) {
      const group = map.get(integration.appSlug) ?? [];
      group.push(integration);
      map.set(integration.appSlug, group);
    }
    return map;
  }, [connected]);

  // One representative entry per connected app, for the "connected only" view.
  const connectedApps = useMemo(
    () => Array.from(connectedGroups.values(), (group) => group[0]),
    [connectedGroups],
  );

  const goToConfigure = useCallback(
    (appSlug: string) => navigate(integrationConfigurePath(appSlug)),
    [navigate],
  );

  // `force` refetches after a connect/disconnect; otherwise the cached list is
  // reused so revisiting the page makes no extra call.
  const refreshConnected = useCallback(async (force = false) => {
    try {
      setConnected(await loadConnected(force));
    } catch (error) {
      console.error("Failed to load connected integrations", error);
    }
  }, []);

  useEffect(() => {
    void refreshConnected();
  }, [refreshConnected]);

  // Debounce the search box.
  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(id);
  }, [search]);

  // Load the first page whenever the query changes (or a retry is requested).
  // The default (no-search) view is served from the cached snapshot when warm.
  useEffect(() => {
    let cancelled = false;
    if (debouncedSearch === "") {
      const snapshot = getCatalogSnapshot();
      if (snapshot) {
        setApps(snapshot.apps);
        setCursor(snapshot.cursor);
        setVisibleCount(snapshot.visibleCount);
        setError(null);
        setLoading(false);
        return;
      }
    }
    setLoading(true);
    setError(null);
    setVisibleCount(PAGE_SIZE);
    fetchIntegrationApps(debouncedSearch)
      .then((result) => {
        if (cancelled) return;
        setApps(result.apps);
        setCursor(result.after);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load integration catalogue", err);
        setApps([]);
        setCursor(undefined);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Could not load integrations from Pipedream.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, reloadKey]);

  // Keep the cached snapshot in sync with the default view (including pages
  // revealed by scrolling), so a later revisit restores at the same depth.
  useEffect(() => {
    if (debouncedSearch === "" && !loading && !error) {
      setCatalogSnapshot({ apps, cursor, visibleCount });
    }
  }, [apps, cursor, visibleCount, debouncedSearch, loading, error]);

  // On the Popular tab we cap to the first page of (popularity-ordered) apps; the
  // All tab keeps revealing more and fetching further server pages on scroll.
  const cap = tab === "popular" ? PAGE_SIZE : visibleCount;
  const visibleApps = apps.slice(0, cap);
  const hasMore =
    !connectedOnly && tab === "all" && (visibleCount < apps.length || Boolean(cursor));

  const loadMore = useCallback(() => {
    if (loadingMore) return;
    // Reveal already-loaded apps first; only hit the server once the window
    // reaches the end of what we have.
    if (visibleCount < apps.length) {
      setVisibleCount((count) => count + PAGE_SIZE);
      return;
    }
    if (!cursor) return;
    setLoadingMore(true);
    fetchIntegrationApps(debouncedSearch, cursor)
      .then((result) => {
        setApps((prev) => [...prev, ...result.apps]);
        setCursor(result.after);
        setVisibleCount((count) => count + PAGE_SIZE);
      })
      .catch((error) => console.error("Failed to load more integrations", error))
      .finally(() => setLoadingMore(false));
  }, [apps.length, cursor, debouncedSearch, loadingMore, visibleCount]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const handleConnect = useCallback(
    async (app: CatalogApp) => {
      if (!ready) return;
      setBusySlug(app.nameSlug);
      try {
        await connect(app.nameSlug);
        await refreshConnected(true);
        setToast(`Successfully connected your ${app.name} account!`);
      } catch (error) {
        console.error(`Failed to connect ${app.name}`, error);
      } finally {
        setBusySlug(null);
      }
    },
    [connect, ready, refreshConnected],
  );

  return (
    <>
      <PageMeta title="Integrations — Gomer" description="Connect the tools you use with Gomer." />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-2 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Integrations</h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="gomer-focus-ring inline-flex min-h-8 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-transparent px-3 py-2 text-xs font-medium text-muted-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                >
                  <Plus className="size-4 shrink-0" strokeWidth={1.5} />
                  Add Custom MCP
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6">
              <p className="text-sm text-secondary-foreground">
                Connect the tools you use and let Gomer perform tasks across various apps.
              </p>

              <div className="flex w-full flex-col gap-1.5">
                <div className="flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm leading-5 transition-colors outline-none hover:border-border/80 focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2">
                  <div className="flex shrink-0 items-center text-muted-foreground">
                    <Search className="size-4" strokeWidth={1.5} aria-hidden />
                  </div>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search from 3,000 integrations"
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <div className="scrollbar-hide flex justify-end gap-0.5 overflow-x-auto sm:justify-start">
                  <button
                    type="button"
                    onClick={() => setTab("all")}
                    className={[
                      "gomer-focus-ring inline-flex min-h-10 shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 px-4 py-2 text-sm font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]",
                      tab === "all"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-transparent text-muted-foreground hover:bg-accent",
                    ].join(" ")}
                  >
                    All integrations
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("popular")}
                    className={[
                      "gomer-focus-ring inline-flex min-h-10 shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 px-4 py-2 text-sm font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]",
                      tab === "popular"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-transparent text-muted-foreground hover:bg-accent",
                    ].join(" ")}
                  >
                    Popular integrations
                  </button>
                </div>

                <label className="flex shrink-0 cursor-pointer select-none items-center gap-2 self-end sm:self-auto">
                  <span className="whitespace-nowrap text-sm text-secondary-foreground opacity-50">
                    Show connected only
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={connectedOnly}
                    onClick={() => setConnectedOnly((value) => !value)}
                    className={[
                      "gomer-focus-ring relative inline-flex w-10.5 cursor-pointer rounded-full border border-border p-1 transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                      connectedOnly ? "border-highlight bg-highlight" : "bg-secondary",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "size-4 rounded-full bg-muted-foreground transition-all duration-150",
                        connectedOnly ? "translate-x-4 bg-primary-foreground" : "",
                      ].join(" ")}
                    />
                  </button>
                </label>
              </div>

              {connectedOnly ? (
                connectedApps.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                    <p className="text-sm text-muted-foreground">No connected integrations yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {connectedApps.map((integration) => (
                      <IntegrationCard
                        key={integration.appSlug}
                        name={integration.appName}
                        iconUrl={integration.iconUrl ?? undefined}
                        connected
                        subtitle={accountsLabel(
                          connectedGroups.get(integration.appSlug)?.length ?? 1,
                        )}
                        onClick={() => goToConfigure(integration.appSlug)}
                      />
                    ))}
                  </div>
                )
              ) : loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <button
                    type="button"
                    onClick={() => setReloadKey((key) => key + 1)}
                    className="gomer-focus-ring inline-flex min-h-8 cursor-pointer select-none items-center justify-center rounded-[7px] bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground transition-[background-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                  >
                    Retry
                  </button>
                </div>
              ) : visibleApps.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    No integrations match your search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {visibleApps.map((app) => {
                    const group = connectedGroups.get(app.nameSlug);
                    return (
                      <IntegrationCard
                        key={app.nameSlug || app.name}
                        name={app.name}
                        iconUrl={app.iconUrl || undefined}
                        connected={Boolean(group)}
                        subtitle={group ? accountsLabel(group.length) : undefined}
                        busy={busySlug === app.nameSlug}
                        onClick={
                          group ? () => goToConfigure(app.nameSlug) : () => handleConnect(app)
                        }
                      />
                    );
                  })}
                </div>
              )}

              {hasMore && (
                <div ref={loadMoreRef} className="flex justify-center py-4">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
