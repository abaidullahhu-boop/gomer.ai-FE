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
}
