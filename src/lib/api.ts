/**
 * Minimal authenticated client for the hektor.ai backend.
 *
 * Attaches the stored access token as a Bearer header and transparently
 * retries once after refreshing an expired token. A failed refresh clears
 * the stored tokens so route guards can bounce the user to `/sign-in`.
 */

import { API_URL, clearTokens, getAccessToken, getRefreshToken, storeTokens } from "./auth";

export type AuthUser = {
  id: string;
  workspaceId: string;
  slackUserId: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
  role: "admin" | "member";
};

export type Workspace = {
  id: string;
  name: string;
  slackTeamId: string;
  credits: number;
};

export type WorkspaceMembership = {
  workspaceId: string;
  name: string;
  slackTeamId: string;
  role: "admin" | "member";
  isCurrent: boolean;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function refreshTokens(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearTokens();
    return false;
  }

  const tokens = (await response.json()) as { accessToken: string; refreshToken: string };
  storeTokens(tokens.accessToken, tokens.refreshToken);
  return true;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  async function request(): Promise<Response> {
    return fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
        Authorization: `Bearer ${getAccessToken() ?? ""}`,
      },
    });
  }

  let response = await request();

  if (response.status === 401 && (await refreshTokens())) {
    response = await request();
  }

  if (!response.ok) {
    if (response.status === 401) clearTokens();
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new ApiError(response.status, body?.message ?? `Request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export function fetchMe(): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/me");
}

export function fetchCurrentWorkspace(): Promise<Workspace> {
  return apiFetch<Workspace>("/workspaces/me");
}

export function fetchWorkspaces(): Promise<WorkspaceMembership[]> {
  return apiFetch<WorkspaceMembership[]>("/auth/workspaces");
}

/** Swaps the session over to another workspace and stores the new tokens. */
export async function switchWorkspace(workspaceId: string): Promise<void> {
  const tokens = await apiFetch<{ accessToken: string; refreshToken: string }>(
    "/auth/switch-workspace",
    { method: "POST", body: JSON.stringify({ workspaceId }) },
  );
  storeTokens(tokens.accessToken, tokens.refreshToken);
}

export async function logout(): Promise<void> {
  try {
    await apiFetch<{ success: boolean }>("/auth/logout", { method: "POST" });
  } finally {
    clearTokens();
  }
}
