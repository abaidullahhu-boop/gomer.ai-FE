/**
 * The Pipedream app catalogue, served from a snapshot that ships with the app
 * instead of the live `/integrations/apps` proxy. Pipedream's own list call
 * costs ~3s per 48-app page, which the Integrations tab used to pay on first
 * paint, on every scroll page, and on every search keystroke.
 *
 * The snapshot is a dynamic import so it lands in its own chunk — nothing is
 * downloaded until someone opens the Integrations tab, and the chunk is
 * content-hashed, so a regenerated catalogue can never be served stale.
 *
 * Regenerate with `npm run catalog:build` in the backend repo. Apps added to
 * Pipedream since the last build are still reachable: the page falls back to
 * the live search endpoint when a query has no local match.
 */
import type { CatalogApp } from "./api";

/** `[name, nameSlug, appId | full icon URL]`, mirroring the generator's format. */
type CatalogEntry = [string, string, string];

type CatalogFile = {
  generatedAt: string;
  count: number;
  apps: CatalogEntry[];
};

/** Keep in sync with `scripts/build-integration-catalog.ts` in the backend. */
const iconUrlFor = (icon: string) =>
  icon.startsWith("https://") ? icon : `https://assets.pipedream.net/s.v0/${icon}/logo/orig`;

let catalogCache: CatalogApp[] | null = null;
let catalogInflight: Promise<CatalogApp[]> | null = null;

/** The catalogue if it has already been loaded, for synchronous first render. */
export function getLoadedCatalog(): CatalogApp[] | null {
  return catalogCache;
}

/**
 * Load the bundled catalogue, keeping the parsed result for the life of the
 * tab. Concurrent callers share one import; a failure clears the in-flight
 * promise so a retry can genuinely retry.
 */
export function loadIntegrationCatalog(): Promise<CatalogApp[]> {
  if (catalogCache) return Promise.resolve(catalogCache);
  if (!catalogInflight) {
    catalogInflight = import("@/data/integrations-catalog.json")
      .then((module) => {
        const file = module.default as CatalogFile;
        catalogCache = file.apps.map(([name, nameSlug, icon]) => ({
          name,
          nameSlug,
          iconUrl: iconUrlFor(icon),
        }));
        return catalogCache;
      })
      .finally(() => {
        catalogInflight = null;
      });
  }
  return catalogInflight;
}

/**
 * Rank-ordered local search over the catalogue. Name prefix beats a match at a
 * later word, which beats a match anywhere in the name or slug — so "sheets"
 * surfaces "Google Sheets" ahead of "Spreadsheets by Example". Ties keep the
 * catalogue's featured ordering, since the ranks are assigned in that order.
 */
export function searchCatalog(apps: CatalogApp[], query: string): CatalogApp[] {
  const q = query.trim().toLowerCase();
  if (!q) return apps;

  const ranked: { app: CatalogApp; rank: number }[] = [];
  for (const app of apps) {
    const name = app.name.toLowerCase();
    const slug = app.nameSlug.toLowerCase();
    let rank: number;
    if (name.startsWith(q) || slug.startsWith(q)) rank = 0;
    else if (name.includes(` ${q}`) || name.includes(`(${q}`)) rank = 1;
    else if (name.includes(q) || slug.includes(q)) rank = 2;
    else continue;
    ranked.push({ app, rank });
  }
  // Stable sort: equal ranks stay in catalogue (featured-weight) order.
  return ranked.sort((a, b) => a.rank - b.rank).map((entry) => entry.app);
}
