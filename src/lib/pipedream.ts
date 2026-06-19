import { useCallback } from "react";
import {
  createFrontendClient,
  type CreateTokenResponse,
  type ProjectEnvironment,
} from "@pipedream/sdk/browser";
import {
  confirmIntegration,
  createConnectToken,
  type ConnectedIntegration,
  type IntegrationAccessLevel,
} from "./api";
import { useSession } from "./session";

const ENVIRONMENT = (import.meta.env.VITE_PIPEDREAM_ENVIRONMENT ??
  "development") as ProjectEnvironment;

/** Options chosen in the connect modal before the Pipedream popup opens. */
export type ConnectOptions = {
  accessLevel: IntegrationAccessLevel;
  nickname?: string;
};

/**
 * The Pipedream `external_user_id` a connection lives under, mirroring the
 * backend: the workspace id for `team` accounts (shared) and a per-user
 * namespace for `private` ones. Must match the scope the backend mints the
 * token under, or Pipedream rejects the token.
 */
function externalUserIdFor(
  accessLevel: IntegrationAccessLevel,
  userId: string,
  workspaceId: string,
): string {
  return accessLevel === "private" ? `u:${userId}` : workspaceId;
}

/**
 * Drives the Pipedream Connect popup. A fresh browser client is built per
 * connect so its `externalUserId` and minted token match the chosen access
 * level (team → workspace scope, private → the member's own scope). On success
 * we tell the backend to persist the connection with that same access level.
 */
export function usePipedreamConnect() {
  const { user } = useSession();
  const ready = Boolean(user?.id && user?.workspaceId);

  const connect = useCallback(
    (appSlug: string, options: ConnectOptions = { accessLevel: "team" }) =>
      new Promise<ConnectedIntegration>((resolve, reject) => {
        if (!user?.id || !user?.workspaceId) {
          reject(new Error("Session not ready"));
          return;
        }
        const { accessLevel, nickname } = options;
        const client = createFrontendClient({
          externalUserId: externalUserIdFor(accessLevel, user.id, user.workspaceId),
          projectEnvironment: ENVIRONMENT,
          // The wire response serializes `expiresAt` as an ISO string; the SDK
          // only reads `token`, so the shape is compatible at runtime.
          tokenCallback: async () =>
            (await createConnectToken(accessLevel)) as unknown as CreateTokenResponse,
        });
        void client.connectAccount({
          app: appSlug,
          onSuccess: ({ id }) => {
            confirmIntegration(id, appSlug, accessLevel, nickname).then(resolve).catch(reject);
          },
          onError: (err: Error) => reject(err),
        });
      }),
    [user?.id, user?.workspaceId],
  );

  return { connect, ready };
}
