import { useCallback, useMemo } from "react";
import {
  createFrontendClient,
  type CreateTokenResponse,
  type ProjectEnvironment,
} from "@pipedream/sdk/browser";
import { confirmIntegration, createConnectToken, type ConnectedIntegration } from "./api";
import { useSession } from "./session";

const ENVIRONMENT = (import.meta.env.VITE_PIPEDREAM_ENVIRONMENT ??
  "development") as ProjectEnvironment;

/**
 * Drives the Pipedream Connect popup. The browser client authenticates via a
 * `tokenCallback` that mints a single-use token from our backend (scoped to the
 * current workspace). On success we tell the backend to persist the connection.
 */
export function usePipedreamConnect() {
  const { user } = useSession();
  const externalUserId = user?.workspaceId ?? "";

  const client = useMemo(() => {
    if (!externalUserId) return null;
    return createFrontendClient({
      externalUserId,
      projectEnvironment: ENVIRONMENT,
      // The wire response serializes `expiresAt` as an ISO string; the SDK only
      // reads `token`, so the shape is compatible at runtime.
      tokenCallback: async () => (await createConnectToken()) as unknown as CreateTokenResponse,
    });
  }, [externalUserId]);

  const connect = useCallback(
    (appSlug: string) =>
      new Promise<ConnectedIntegration>((resolve, reject) => {
        if (!client) {
          reject(new Error("Session not ready"));
          return;
        }
        void client.connectAccount({
          app: appSlug,
          onSuccess: ({ id }) => {
            confirmIntegration(id, appSlug).then(resolve).catch(reject);
          },
          onError: (err: Error) => reject(err),
        });
      }),
    [client],
  );

  return { connect, ready: Boolean(client) };
}
