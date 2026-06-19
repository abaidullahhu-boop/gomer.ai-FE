/**
 * API client for the Spaces runtime — the deployed end-user app at `/s/:slug`.
 *
 * This is intentionally separate from `lib/api.ts`: the runtime authenticates a
 * Space end-user with a space-scoped session token (one per slug), never the
 * workspace/dashboard session. Tokens are namespaced in localStorage by slug.
 */

import { API_URL } from "@/lib/auth";
import type { PublicSpace, SpaceRecord, SpaceSession } from "./types";

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

export function deleteRecord(slug: string, entity: string, recordId: string): Promise<void> {
  return spaceFetch(slug, `/spaces/${slug}/data/${encodeURIComponent(entity)}/${recordId}`, {
    method: "DELETE",
  });
}
