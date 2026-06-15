/**
 * In-memory cache for the Integrations page so navigating to it repeatedly
 * doesn't refetch the same data. Module-level (survives route unmount/remount
 * for the life of the tab); cleared on full reload, which is the desired
 * freshness boundary.
 *
 * Two things are cached:
 *  - the default (no-search) catalogue view, including any pages revealed by
 *    scrolling, so the grid restores instantly at the same depth;
 *  - the workspace's connected integrations, with in-flight de-duplication.
 *
 * Searches are never cached — only the default view is restored.
 */
import { fetchConnectedIntegrations, type CatalogApp, type ConnectedIntegration } from "./api";

export type CatalogSnapshot = {
  apps: CatalogApp[];
  cursor?: string;
  visibleCount: number;
};

let catalogSnapshot: CatalogSnapshot | null = null;

let connectedCache: ConnectedIntegration[] | null = null;
let connectedInflight: Promise<ConnectedIntegration[]> | null = null;

export function getCatalogSnapshot(): CatalogSnapshot | null {
  return catalogSnapshot;
}

export function setCatalogSnapshot(snapshot: CatalogSnapshot): void {
  catalogSnapshot = snapshot;
}

export function getCachedConnected(): ConnectedIntegration[] | null {
  return connectedCache;
}

/**
 * Resolve the connected integrations, serving the cache when present. Pass
 * `force` after a connect/disconnect to refetch and refresh the cache.
 * Concurrent callers share one in-flight request.
 */
export function loadConnected(force = false): Promise<ConnectedIntegration[]> {
  if (connectedCache && !force) return Promise.resolve(connectedCache);
  if (!connectedInflight) {
    connectedInflight = fetchConnectedIntegrations()
      .then((list) => {
        connectedCache = list;
        return list;
      })
      .finally(() => {
        connectedInflight = null;
      });
  }
  return connectedInflight;
}
