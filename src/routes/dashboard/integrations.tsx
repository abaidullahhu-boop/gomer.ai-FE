import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { IntegrationCard } from "@/components/dashboard/IntegrationCard";
import { integrations } from "@/data/integrations";

type Tab = "all" | "popular";

const PAGE_SIZE = 120;

export default function DashboardIntegrations() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [connectedOnly, setConnectedOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return integrations.filter((integration) => {
      if (tab === "popular" && !integration.popular) return false;
      if (connectedOnly) return false;
      if (!query) return true;
      return integration.name.toLowerCase().includes(query);
    });
  }, [search, tab, connectedOnly]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length));
      setLoadingMore(false);
    }, 400);
  }, [filtered.length, hasMore, loadingMore]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, tab, connectedOnly]);

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

  const searchLabel = "Search from 3,000 integrations";

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
                    placeholder={searchLabel}
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
                <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                  <p className="text-sm text-muted-foreground">No connected integrations yet.</p>
                </div>
              ) : visible.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                  <p className="text-sm text-muted-foreground">No integrations match your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {visible.map((integration) => (
                    <IntegrationCard key={integration.name} integration={integration} />
                  ))}
                </div>
              )}

              {hasMore && !connectedOnly && (
                <div ref={loadMoreRef} className="flex justify-center py-4">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
