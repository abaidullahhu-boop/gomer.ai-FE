import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ApiError,
  fetchUsageActivity,
  fetchUsageAnalytics,
  type UsageActivityEntry,
  type UsageAnalytics,
} from "@/lib/api";
import { periodToRange, type UsagePeriod } from "@/data/usage";

export type UsageAnalyticsState = {
  analytics: UsageAnalytics | null;
  loading: boolean;
  error: string | null;
};

/**
 * A gateway-rewritten status carries no useful body, so our own wording beats
 * surfacing "Request failed (504)" to someone looking at a spend chart.
 */
function describeError(err: unknown): string {
  const status = err instanceof ApiError ? err.status : 0;
  if (status >= 502 || status === 0) return "Usage data is unavailable right now.";
  return err instanceof Error ? err.message : "Usage data is unavailable right now.";
}

/**
 * Fetches the workspace's usage for a period, refetching when it changes.
 *
 * Takes the period rather than a resolved range: a range is an object, and a
 * fresh one every render would never compare equal as an effect dependency,
 * so the page would refetch in a loop. The period is a string, and the range
 * is derived from it inside the effect.
 */
export function useUsageAnalytics(period: UsagePeriod): UsageAnalyticsState {
  const [analytics, setAnalytics] = useState<UsageAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUsageAnalytics(periodToRange(period))
      .then((result) => {
        if (cancelled) return;
        setAnalytics(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(describeError(err));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [period]);

  return { analytics, loading, error };
}

export type UsageActivityState = {
  entries: UsageActivityEntry[];
  loading: boolean;
  error: string | null;
};

/** Recent spend for the activity feed, optionally narrowed to one task. */
export function useUsageActivity(taskId?: string): UsageActivityState {
  const [entries, setEntries] = useState<UsageActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUsageActivity(taskId ? { taskId } : {})
      .then((result) => {
        if (cancelled) return;
        setEntries(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(describeError(err));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [taskId]);

  return { entries, loading, error };
}

/** The layout fetches once; the tabs below it read the result from here. */
export function useUsageContext(): UsageAnalyticsState {
  return useOutletContext<UsageAnalyticsState>();
}
