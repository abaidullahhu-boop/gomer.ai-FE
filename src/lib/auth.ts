/**
 * Auth helpers for the Slack OAuth flow.
 *
 * The backend (gomer.ai) owns the OAuth exchange:
 *   1. We send the browser to `${API_URL}/auth/slack/install`.
 *   2. Slack bounces back to the backend callback, which provisions the
 *      user/workspace and redirects here to `/auth/callback` with the
 *      issued tokens as query params.
 *
 * Microsoft Teams login is planned but not yet implemented on the backend.
 */

const ACCESS_TOKEN_KEY = "gomer_access_token";
const REFRESH_TOKEN_KEY = "gomer_refresh_token";

/** Storage key for the session hint; exported so tabs can watch it for sign-out. */
export const SESSION_HINT_KEY = "gomer_session_hint";

/**
 * Cached echo of the signed-in workspace. Not authoritative — it only lets the
 * marketing nav render "Continue as <workspace>" immediately, before (or
 * without) an API round trip. The API is still the source of truth.
 */
export type SessionHint = { workspaceId: string; workspaceName: string };

/** Base URL of the gomer.ai backend. */
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

/** Kick off the Slack OAuth flow by handing the browser to the backend. */
export function startSlackLogin(): void {
  window.location.href = `${API_URL}/auth/slack/install`;
}

export function storeTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(SESSION_HINT_KEY);
}

/** True when tokens are on hand — the user has signed in at some point. */
export function hasSession(): boolean {
  return getAccessToken() !== null;
}

export function storeSessionHint(hint: SessionHint): void {
  localStorage.setItem(SESSION_HINT_KEY, JSON.stringify(hint));
}

export function getSessionHint(): SessionHint | null {
  const raw = localStorage.getItem(SESSION_HINT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<SessionHint>;
    if (!parsed.workspaceId || !parsed.workspaceName) return null;
    return { workspaceId: parsed.workspaceId, workspaceName: parsed.workspaceName };
  } catch {
    return null;
  }
}
