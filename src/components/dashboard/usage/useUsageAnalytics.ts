import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ApiError, fetchUsageAnalytics, type UsageAnalytics } from "@/lib/api";
import type { UsagePeriod } from "@/data/usage";

export type UsageAnalyticsState = {
  analytics: UsageAnalytics | null;
  loading: boolean;
  error: string | null;
};

/**
 * Trailing-day window for each period the dropdown offers.
 *
 * The API takes a number of days back from now, so the two calendar-month
 * options are the imperfect fit. "This month" is exact — days since the 1st is
 * genuinely a trailing window. "Last month" is not: a trailing 30 days is the
 * closest this endpoint can express, and it overlaps the current month. Making
 * it exact needs a from/to range on the API rather than a day count.
 */
export function daysForPeriod(period: UsagePeriod): number {
  const now = new Date();
  switch (period) {
    case "today":
      return 1;
    case "last_7_days":
      return 7;
    case "this_month":
      return now.getDate();
    case "last_month":
      return 30;
    case "last_30_days":
    default:
      return 30;
  }
}

/** Fetches the workspace's usage for a window, refetching when it changes. */
export function useUsageAnalytics(days: number): UsageAnalyticsState {
  const [analytics, setAnalytics] = useState<UsageAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUsageAnalytics(days)
      .then((result) => {
        if (cancelled) return;
        setAnalytics(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        // A gateway rewrote status carries no useful body, so prefer our own
        // wording over "Request failed (504)".
        const status = err instanceof ApiError ? err.status : 0;
        setError(
          status >= 502 || status === 0
            ? "Usage data is unavailable right now."
            : err instanceof Error
              ? err.message
              : "Usage data is unavailable right now.",
        );
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [days]);

  return { analytics, loading, error };
}

/** The layout fetches once; the tabs below it read the result from here. */
export function useUsageContext(): UsageAnalyticsState {
  return useOutletContext<UsageAnalyticsState>();
}
