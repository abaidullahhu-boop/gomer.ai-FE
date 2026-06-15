export type ReasoningLevel = "none" | "low" | "medium" | "high";
export type ModelProvider = "preset" | "anthropic" | "openai" | "google" | "other";

export type ModelBadge =
  | { type: "recommended" }
  | { type: "discount"; value: string }
  | { type: "premium"; value: string }
  | { type: "beta" }
  | { type: "deprecated" };

export type ModelDefinition = {
  id: string;
  name: string;
  description: string;
  provider: ModelProvider;
  presetLabel?: string;
  presetColor?: "success" | "violet";
  badges?: ModelBadge[];
  reasoning: ReasoningLevel | "label";
  reasoningLabel?: string;
  disabled?: boolean;
  recommended?: boolean;
};

export const personalityOptions = [
  { value: "standard", label: "Standard" },
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "concise", label: "Concise" },
] as const;

export const models: ModelDefinition[] = [
  {
    id: "smartest",
    name: "Smartest",
    description: "Uses Claude Opus 4.6. Most capable model — ideal for complex, high-stakes work.",
    provider: "preset",
    presetLabel: "Preset",
    presetColor: "success",
    badges: [{ type: "recommended" }],
    reasoning: "label",
    reasoningLabel: "HIGH",
    recommended: true,
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Uses Claude Sonnet 4.6. Cheaper but makes more mistakes. Great for routine tasks.",
    provider: "preset",
    presetLabel: "Preset",
    presetColor: "violet",
    badges: [{ type: "discount", value: "−50%" }],
    reasoning: "label",
    reasoningLabel: "MEDIUM",
  },
  {
    id: "claude-fable-5",
    name: "Claude Fable 5",
    description: "Anthropic's most capable model for demanding reasoning and long-running autonomous work.",
    provider: "anthropic",
    badges: [{ type: "premium", value: "+100%" }],
    reasoning: "high",
  },
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    description: "Most capable model. Ideal for complex, high-stakes workflows.",
    provider: "anthropic",
    reasoning: "high",
  },
  {
    id: "gpt-5-5",
    name: "GPT-5.5",
    description:
      "OpenAI's frontier model. Higher base intelligence and needs fewer tokens than 5.4. Harder to prompt and makes more mistakes compared to Opus 4.7.",
    provider: "openai",
    badges: [{ type: "discount", value: "−20%" }],
    reasoning: "medium",
  },
  {
    id: "claude-opus-4-8",
    name: "Claude Opus 4.8",
    description: "Newest and strongest Opus model for coding, agents, and complex workflows.",
    provider: "anthropic",
    badges: [{ type: "premium", value: "+35%" }],
    reasoning: "high",
  },
  {
    id: "claude-opus-4-7",
    name: "Claude Opus 4.7",
    description: "Higher-token usage than Opus 4.6 with comparable performance.",
    provider: "anthropic",
    badges: [{ type: "beta" }, { type: "premium", value: "+35%" }],
    reasoning: "high",
  },
  {
    id: "gpt-5-4",
    name: "GPT-5.4",
    description:
      "Capable OpenAI model, but harder to prompt and makes more mistakes. Cheaper per token than GPT-5.5 but needs more reasoning.",
    provider: "openai",
    badges: [{ type: "discount", value: "−50%" }],
    reasoning: "medium",
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    description: "Cheaper, but makes more mistakes. Good for routine tasks.",
    provider: "anthropic",
    badges: [{ type: "discount", value: "−50%" }],
    reasoning: "medium",
  },
  {
    id: "gemini-flash-3",
    name: "Gemini Flash 3",
    description: "Deprecated model. Makes too many mistakes to be usable as a default for Gomer.",
    provider: "google",
    badges: [{ type: "deprecated" }],
    reasoning: "low",
    disabled: true,
  },
  {
    id: "kimi-k2-6",
    name: "Kimi K2.6",
    description: "Deprecated model. Makes too many mistakes to be usable as a default for Gomer.",
    provider: "other",
    badges: [{ type: "deprecated" }],
    reasoning: "label",
    reasoningLabel: "MEDIUM",
    disabled: true,
  },
];
