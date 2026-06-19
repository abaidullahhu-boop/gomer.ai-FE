import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import spacesEmptyState from "@/assets/images/spaces-empty-state.png";
import { deleteSpace, fetchSpaces, spacePath, type Space } from "@/lib/api";

export default function DashboardSpaces() {
  const [spaces, setSpaces] = useState<Space[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(() => {
    fetchSpaces()
      .then(setSpaces)
      .catch((err: Error) => setError(err.message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(space: Space) {
    if (!window.confirm(`Delete "${space.name}"? This removes the app and all its data.`)) {
      return;
    }
    setDeletingId(space.id);
    try {
      await deleteSpace(space.id);
      setSpaces((current) => current?.filter((s) => s.id !== space.id) ?? null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <PageMeta
        title="Spaces — Gomer"
        description="View and manage web applications created by Gomer."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Spaces</h1>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                View and manage web applications created by Gomer. Each space has its own database,
                authentication, and hosting.
              </p>

              {error && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {spaces === null && !error && (
                <div className="rounded-xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
                  Loading…
                </div>
              )}

              {spaces !== null && spaces.length === 0 && (
                <div className="rounded-xl border border-border bg-card p-10 text-center">
                  <div className="flex flex-col items-center gap-5">
                    <img
                      src={spacesEmptyState}
                      alt=""
                      aria-hidden
                      className="h-24 w-auto select-none"
                      draggable={false}
                    />
                    <div className="space-y-2">
                      <h3 className="font-medium text-foreground">No Spaces yet</h3>
                      <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Ask Gomer to create a web app for you and it will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {spaces !== null && spaces.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {spaces.map((space) => (
                    <li
                      key={space.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-medium text-foreground">{space.name}</h3>
                          <span className="rounded-full border border-border px-2 py-0.5 text-xs capitalize text-muted-foreground">
                            {space.status}
                          </span>
                        </div>
                        {space.description && (
                          <p className="mt-1 truncate text-sm text-muted-foreground">
                            {space.description}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">
                          {space.entityCount} {space.entityCount === 1 ? "entity" : "entities"} ·{" "}
                          {space.viewCount} {space.viewCount === 1 ? "view" : "views"}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Link
                          to={spacePath(space.slug)}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
                        >
                          Open
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(space)}
                          disabled={deletingId === space.id}
                          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
                        >
                          {deletingId === space.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
