/**
 * Presentation types for the settings model picker.
 *
 * The models themselves come from the API (`GET /ai/models`) — the backend
 * catalog decides what exists, what it costs, and whether this deployment can
 * reach it, so the picker can never offer a model that would fail on use.
 */

export type ModelProvider = "anthropic" | "gateway";

export type ModelBadge = {
  type: "recommended" | "discount" | "premium" | "beta" | "deprecated" | string;
  value?: string;
};

export const personalityOptions = [
  { value: "standard", label: "Standard" },
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "concise", label: "Concise" },
] as const;

/** Longest an admin's workspace instructions may be; matches the API's limit. */
export const MAX_INSTRUCTIONS = 4000;

/**
 * What a workspace is charged for a million output tokens, in dollars. Output
 * dominates the cost of an agent run, so it is the honest number to compare
 * models on. Mirrors CREDIT_MARGIN in the backend catalog.
 */
const CREDIT_MARGIN = 5;

export function pricePerMillionOutput(outputPricePerMillion: number): string {
  const charged = outputPricePerMillion * CREDIT_MARGIN;
  return `$${charged % 1 === 0 ? charged.toFixed(0) : charged.toFixed(2)}/M`;
}
