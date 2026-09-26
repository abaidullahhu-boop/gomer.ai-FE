/**
 * API client for the Spaces runtime — the deployed end-user app at `/s/:slug`.
 *
 * This is intentionally separate from `lib/api.ts`: the runtime authenticates a
 * Space end-user with a space-scoped session token (one per slug), never the
 * workspace/dashboard session. Tokens are namespaced in localStorage by slug.
 * The one exception is {@link openWithWorkspaceSession}, which spends the
 * dashboard session once to obtain a space token for a member of the team.
 */

import { apiFetch } from "@/lib/api";
import { API_URL } from "@/lib/auth";
import type { PageDocument, PublicSpace, SpaceRecord, SpaceSession } from "./types";

const tokenKey = (slug: string) => `gomer_space_session:${slug}`;

export function getSpaceToken(slug: string): string | null {
  return localStorage.getItem(tokenKey(slug));
}

export function storeSpaceToken(slug: string, token: string): void {
  localStorage.setItem(tokenKey(slug), token);
}

export function clearSpaceToken(slug: string): void {
  localStorage.removeItem(tokenKey(slug));
}

async function readError(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as {
    message?: string | string[];
    errors?: string[];
  } | null;
  const message = Array.isArray(body?.message) ? body?.message.join(", ") : body?.message;
  return message ?? `Request failed (${response.status})`;
}

async function publicFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as T;
}

async function spaceFetch<T>(slug: string, path: string, init: RequestInit = {}): Promise<T> {
  const token = getSpaceToken(slug);
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  if (response.status === 401) {
    clearSpaceToken(slug);
    throw new Error("Your session expired — please sign in again.");
  }
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as T;
}

export function fetchPublicSpace(slug: string): Promise<PublicSpace> {
  return publicFetch<PublicSpace>(`/spaces/public/${encodeURIComponent(slug)}`);
}

export function requestMagicLink(
  slug: string,
  email: string,
): Promise<{ sent: boolean; devLink?: string }> {
  return publicFetch(`/spaces/${encodeURIComponent(slug)}/auth/request-link`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/**
 * Exchange the Gaspo dashboard session for a session in this app, so the team
 * that owns it walks straight in. Fails (404) for an app from another workspace.
 */
export function openWithWorkspaceSession(slug: string): Promise<SpaceSession> {
  return apiFetch<SpaceSession>(`/spaces/${encodeURIComponent(slug)}/auth/workspace-session`, {
    method: "POST",
  });
}

export function verifyMagicLink(slug: string, token: string): Promise<SpaceSession> {
  return publicFetch<SpaceSession>(
    `/spaces/${encodeURIComponent(slug)}/auth/verify?token=${encodeURIComponent(token)}`,
  );
}

export function listRecords(slug: string, entity: string): Promise<SpaceRecord[]> {
  return spaceFetch<SpaceRecord[]>(slug, `/spaces/${slug}/data/${encodeURIComponent(entity)}`);
}

export function createRecord(
  slug: string,
  entity: string,
  data: Record<string, unknown>,
): Promise<SpaceRecord> {
  return spaceFetch<SpaceRecord>(slug, `/spaces/${slug}/data/${encodeURIComponent(entity)}`, {
    method: "POST",
    body: JSON.stringify({ data }),
  });
}

/** Replace a record's data; the backend re-validates the whole row. */
export function updateRecord(
  slug: string,
  entity: string,
  recordId: string,
  data: Record<string, unknown>,
): Promise<SpaceRecord> {
  return spaceFetch<SpaceRecord>(
    slug,
    `/spaces/${slug}/data/${encodeURIComponent(entity)}/${recordId}`,
    { method: "PUT", body: JSON.stringify({ data }) },
  );
}

export function deleteRecord(slug: string, entity: string, recordId: string): Promise<void> {
  return spaceFetch(slug, `/spaces/${slug}/data/${encodeURIComponent(entity)}/${recordId}`, {
    method: "DELETE",
  });
}

export function fetchPage(slug: string): Promise<PageDocument> {
  return spaceFetch<PageDocument>(slug, `/spaces/${slug}/page`);
}

/**
 * Save one key of what a page remembers; `null` removes it. `keepalive` lets
 * the last save still go out while the tab is closing.
 */
export function savePageState(
  slug: string,
  key: string,
  value: unknown,
  keepalive = false,
): Promise<{ success: boolean }> {
  return spaceFetch(slug, `/spaces/${slug}/page/state`, {
    method: "PUT",
    body: JSON.stringify({ key, value }),
    keepalive,
  });
}
