import { useEffect, useState } from "react";
import { fetchModels, type ApiModel } from "@/lib/api";

/** Sentinel for "use the workspace default model" (a null model on the task). */
export const TEAM_DEFAULT_MODEL = "";

/**
 * The models this deployment can run. Cached at module scope so the several
 * places that show a model picker share one request per page load.
 */
let cached: Promise<ApiModel[]> | null = null;

function loadModels(): Promise<ApiModel[]> {
  cached ??= fetchModels().catch((error: Error) => {
    // Don't cache a failure, so a transient error can be retried on remount.
    cached = null;
    throw error;
  });
  return cached;
}

/** Models a task may be pinned to: anything this deployment can actually run. */
export function useSelectableModels(): ApiModel[] {
  const [models, setModels] = useState<ApiModel[]>([]);

  useEffect(() => {
    let active = true;
    loadModels()
      .then((all) => {
        if (active) setModels(all.filter((model) => model.available));
      })
      .catch(() => {
        // A failed catalog load leaves the picker showing "Team default" only,
        // which is a safe fallback — the run resolves the model server-side.
      });
    return () => {
      active = false;
    };
  }, []);

  return models;
}

/** Human label for a task's model id; null/empty resolves to the team default. */
export function modelLabel(models: ApiModel[], modelId: string | null): string {
  if (!modelId) return "Team default";
  return models.find((model) => model.id === modelId)?.name ?? modelId;
}
