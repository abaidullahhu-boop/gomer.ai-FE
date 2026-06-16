/**
 * Minimal authenticated client for the gomer.ai backend.
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

/** A connected account owned by the current workspace. */
export type ConnectedIntegration = {
  id: string;
  appName: string;
  appSlug: string;
  accountName: string | null;
  iconUrl: string | null;
  externalAccountId: string | null;
  isActive: boolean;
  connectedAt: string;
  userId: string;
  userName: string | null;
};

/** An app from the Pipedream catalogue, shaped for the connect UI. */
export type CatalogApp = {
  name: string;
  nameSlug: string;
  iconUrl: string;
  description?: string;
};

type CatalogAppRaw = {
  name: string;
  nameSlug: string;
  imgSrc: string;
  description?: string;
};

/** The single-use token returned by `tokens.create`, consumed by the browser SDK. */
export type ConnectTokenResponse = {
  token: string;
  expiresAt: string;
  connectLinkUrl: string;
};

export function fetchConnectedIntegrations(): Promise<ConnectedIntegration[]> {
  return apiFetch<ConnectedIntegration[]>("/integrations");
}

/** Route to the per-app configure view. Namespaced so non-Pipedream providers can be added later. */
export function integrationConfigurePath(appSlug: string): string {
  return `/dashboard/integrations/configure/pipedream-${appSlug}`;
}

/** Inverse of {@link integrationConfigurePath}: extract the app slug from a route param. */
export function parseConfigureProvider(provider: string): string | null {
  return provider.startsWith("pipedream-") ? provider.slice("pipedream-".length) : null;
}

export async function fetchIntegrationApps(
  query?: string,
  after?: string,
): Promise<{ apps: CatalogApp[]; after?: string }> {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (after) params.set("after", after);
  const qs = params.toString();
  const result = await apiFetch<{ apps: CatalogAppRaw[]; after?: string }>(
    `/integrations/apps${qs ? `?${qs}` : ""}`,
  );
  return {
    after: result.after,
    apps: result.apps.map((app) => ({
      name: app.name,
      nameSlug: app.nameSlug,
      iconUrl: app.imgSrc,
      description: app.description,
    })),
  };
}

export function createConnectToken(): Promise<ConnectTokenResponse> {
  return apiFetch<ConnectTokenResponse>("/integrations/connect-token", { method: "POST" });
}

export function confirmIntegration(
  accountId: string,
  appSlug: string,
): Promise<ConnectedIntegration> {
  return apiFetch<ConnectedIntegration>("/integrations/confirm", {
    method: "POST",
    body: JSON.stringify({ accountId, appSlug }),
  });
}

export async function disconnectIntegration(id: string): Promise<void> {
  await apiFetch<{ success: boolean }>(`/integrations/${id}`, { method: "DELETE" });
}

/** An action an app exposes — what Gomer can do with it. */
export type AppTool = {
  key: string;
  name: string;
  description?: string;
};

/** List the actions/tools an app exposes, for the "what can Gomer do?" panel. */
export async function fetchIntegrationTools(
  appSlug: string,
  after?: string,
): Promise<{ tools: AppTool[]; after?: string }> {
  const qs = after ? `?after=${encodeURIComponent(after)}` : "";
  return apiFetch<{ tools: AppTool[]; after?: string }>(
    `/integrations/${encodeURIComponent(appSlug)}/tools${qs}`,
  );
}
