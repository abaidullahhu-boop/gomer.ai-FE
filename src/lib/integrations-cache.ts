/**
 * In-memory cache for the Integrations page so navigating to it repeatedly
 * doesn't refetch the same data. Module-level (survives route unmount/remount
 * for the life of the tab); cleared on full reload, which is the desired
 * freshness boundary.
 *
 * Two things are cached:
 *  - how far the catalogue grid was scrolled, so a revisit restores at the same
 *    depth (the catalogue itself is local — see `integration-catalog.ts`);
 *  - the workspace's connected integrations, with in-flight de-duplication.
 */
import { fetchConnectedIntegrations, type ConnectedIntegration } from "./api";

let catalogVisibleCount: number | null = null;

let connectedCache: ConnectedIntegration[] | null = null;
let connectedInflight: Promise<ConnectedIntegration[]> | null = null;

/** How many catalogue cards were revealed last visit, if the page was open before. */
export function getCatalogVisibleCount(): number | null {
  return catalogVisibleCount;
}

export function setCatalogVisibleCount(count: number): void {
  catalogVisibleCount = count;
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
