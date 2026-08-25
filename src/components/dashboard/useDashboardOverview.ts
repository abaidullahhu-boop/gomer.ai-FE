import { useCallback, useEffect, useState } from "react";
import {
  fetchConnectedIntegrations,
  fetchInstalledSkills,
  fetchTasks,
  fetchUsageActivity,
} from "@/lib/api";

export type DashboardOverview = {
  /** Scheduled tasks the workspace has, mirroring what the tasks page lists. */
  scheduledTasks: number | null;
  /** Connected accounts visible to this member — team-wide plus their own private. */
  integrations: number | null;
  installedSkills: number | null;
  /** Whether Gomer has ever run anything here, which is how "first task" is proven. */
  hasRunATask: boolean | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

/** Unwrap a settled count, leaving a failed one null rather than inventing a zero. */
function count<T>(result: PromiseSettledResult<T[]>): number | null {
  return result.status === "fulfilled" ? result.value.length : null;
}

/**
 * The figures behind the home page: credit-free counts of what the workspace has
 * set up, plus whether Gomer has run at all.
 *
 * Settled rather than awaited together, so one failing endpoint costs its own
 * tile a number instead of blanking every tile on the page. A count that could
 * not be read stays null and renders as "—"; it never falls back to zero, which
 * would read as "you have none" — the opposite of "we could not tell".
 */
export function useDashboardOverview(): DashboardOverview {
  const [overview, setOverview] = useState<Omit<DashboardOverview, "loading" | "refresh">>({
    scheduledTasks: null,
    integrations: null,
    installedSkills: null,
    hasRunATask: null,
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [tasks, integrations, skills, activity] = await Promise.allSettled([
      fetchTasks(),
      fetchConnectedIntegrations(),
      fetchInstalledSkills(),
      fetchUsageActivity({ limit: 1 }),
    ]);

    setOverview({
      scheduledTasks: count(tasks),
      integrations: count(integrations),
      installedSkills: count(skills),
      hasRunATask: activity.status === "fulfilled" ? activity.value.length > 0 : null,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...overview, loading, refresh };
}
