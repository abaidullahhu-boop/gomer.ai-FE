import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ApiError,
  fetchMe,
  fetchWorkspaces,
  logout,
  switchWorkspace,
  type AuthUser,
  type WorkspaceMembership,
} from "./api";
import { getAccessToken, startSlackLogin } from "./auth";

type SessionContextValue = {
  /** The Slack-authenticated user, or null while loading / on error. */
  user: AuthUser | null;
  /** Every workspace the user belongs to. */
  workspaces: WorkspaceMembership[];
  /** The workspace the current session is scoped to. */
  currentWorkspace: WorkspaceMembership | null;
  loading: boolean;
  /** Re-issue tokens for another workspace and reload session data. */
  switchToWorkspace: (workspaceId: string) => Promise<void>;
  /** Kick off the Slack install flow to connect another workspace. */
  addWorkspace: () => void;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkspaceMembership[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [me, memberships] = await Promise.all([fetchMe(), fetchWorkspaces()]);
      setUser(me);
      setWorkspaces(memberships);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        navigate("/sign-in", { replace: true });
        return;
      }
      // Non-auth failure (e.g. backend down): keep the dashboard usable with placeholders.
      console.error("Failed to load session", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!getAccessToken()) {
      navigate("/sign-in", { replace: true });
      return;
    }
    void load();
  }, [load, navigate]);

  const switchToWorkspace = useCallback(
    async (workspaceId: string) => {
      await switchWorkspace(workspaceId);
      await load();
    },
    [load],
  );

  const signOut = useCallback(async () => {
    await logout();
    navigate("/sign-in", { replace: true });
  }, [navigate]);

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      workspaces,
      currentWorkspace: workspaces.find((workspace) => workspace.isCurrent) ?? null,
      loading,
      switchToWorkspace,
      addWorkspace: startSlackLogin,
      signOut,
    }),
    [user, workspaces, loading, switchToWorkspace, signOut],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
