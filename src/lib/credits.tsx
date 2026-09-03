/**
 * The workspace's credit position, fetched once for the whole dashboard shell.
 *
 * Three places show credits — the sidebar profile menu, the home page tile and
 * the billing page — and they must never disagree. One fetch behind a context
 * keeps them consistent and spares the API two duplicate calls per page view.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ApiError, fetchBillingSummary, type BillingSummary } from "./api";

type CreditsContextValue = {
  summary: BillingSummary | null;
  loading: boolean;
  error: string | null;
  /** Re-read the balance — after a top-up returns, or on an explicit refresh. */
  refresh: () => Promise<void>;
};

const CreditsContext = createContext<CreditsContextValue | null>(null);

/**
 * A gateway-rewritten status carries no useful body, so our own wording beats
 * surfacing "Request failed (504)" where a credit balance should be.
 */
function describeError(err: unknown): string {
  const status = err instanceof ApiError ? err.status : 0;
  if (status >= 500 || status === 0) return "Credit balance is unavailable right now.";
  return err instanceof ApiError ? err.message : "Credit balance is unavailable right now.";
}

export function CreditsProvider({ children }: { children: ReactNode }) {
  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setSummary(await fetchBillingSummary());
    } catch (err) {
      setError(describeError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<CreditsContextValue>(
    () => ({ summary, loading, error, refresh }),
    [summary, loading, error, refresh],
  );

  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
}

export function useCredits(): CreditsContextValue {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }
  return context;
}
