import { models } from "@/data/models";

/** Sentinel for "use the workspace default model" (a null model on the task). */
export const TEAM_DEFAULT_MODEL = "";

/** Selectable models for a task: the real Anthropic models we can pin. */
export const taskModelOptions = models.filter(
  (model) => model.provider === "anthropic" && !model.disabled,
);

/** Human label for a task's model id; null/empty resolves to the team default. */
export function modelLabel(modelId: string | null): string {
  if (!modelId) return "Team default";
  return models.find((model) => model.id === modelId)?.name ?? modelId;
}
