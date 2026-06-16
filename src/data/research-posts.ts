import type { BlogPost, BlogPostMeta } from "@/data/blog-posts";

export const researchPosts: BlogPost[] = [
  {
    slug: "how-we-built-gomer-around-prompt-caching",
    title: "How We Built Gomer Around Prompt Caching",
    excerpt:
      "A deep dive into how Gomer's SDK, thread engine, and prompt caching architecture work together to cut inference costs by up to 90% without sacrificing agent quality.",
    subtitle:
      "Engineering deep-dive on Gomer's prompt caching architecture — from SDK design to thread engines and real-world cost savings.",
    date: "June 8, 2024",
    author: "Toni Albert",
    keyTakeaways: [
      "Prompt caching shifts cost from repeated context to a one-time cache write — critical for long-running agent threads.",
      "Gomer's thread engine structures messages so cache breakpoints land on stable prefixes, not volatile tail content.",
      "The SDK exposes cache-aware composition so skills and tool definitions stay in the cached layer.",
      "Cache hit rates above 80% are achievable when system prompts, tool schemas, and conversation history are ordered correctly.",
      "Cost savings compound: a 10-turn thread with a 50k-token context can drop from dollars to cents per session.",
    ],
    intro: [
      "When we started building Gomer, we knew agents would run long threads — dozens of tool calls, megabytes of context, conversations that span days. Standard LLM pricing makes that economically impossible at scale.",
      "Anthropic's prompt caching gave us a path forward. But caching is not automatic: you have to architect your entire request pipeline around where breakpoints land, what stays stable, and what mutates every turn. This post walks through how we did that in Gomer.",
    ],
    sections: [
      {
        title: "Why prompt caching matters for agents",
        paragraphs: [
          "A typical Gomer session might include a 15k-token system prompt, 30k tokens of tool definitions, and a growing conversation history. Without caching, every turn re-processes the full context at input-token rates.",
          "With caching, stable prefixes are stored server-side after the first request. Subsequent turns only pay full price for new tokens — the cached prefix is billed at a fraction of the cost.",
        ],
        bullets: [
          "System prompts and tool schemas rarely change mid-thread — ideal cache candidates.",
          "Conversation history grows every turn — must sit after the cache breakpoint.",
          "Volatile content (timestamps, session IDs) must never appear before the breakpoint.",
        ],
      },
      {
        title: "Thread engine design",
        paragraphs: [
          "Gomer's thread engine maintains a structured message list with explicit cache control markers. On each turn, the engine assembles the request in a deterministic order: system → tools → stable context → conversation tail.",
          "The engine tracks which message blocks are immutable within a thread. When a skill is installed or a tool is added, the engine invalidates only the affected cache layer — not the entire thread history.",
        ],
        codeBlock: `// Simplified cache breakpoint placement
const request = {
  system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
  tools: toolSchemas.map(t => ({ ...t, cache_control: { type: "ephemeral" } })),
  messages: conversationHistory, // grows each turn, not cached
};`,
      },
      {
        title: "SDK-level cache awareness",
        paragraphs: [
          "We exposed cache semantics directly in the Gomer SDK so skill authors do not accidentally bust the cache. Skills declare whether their context is stable (cacheable) or dynamic (per-turn).",
          "The SDK validates composition at build time: if a dynamic block would appear before a cache breakpoint, it raises a warning. This caught dozens of cache-busting patterns during internal development.",
        ],
      },
      {
        title: "Results in production",
        paragraphs: [
          "After rolling out cache-aware threading, median input-token costs per session dropped by 87% for threads longer than 5 turns. Cache hit rates stabilize above 85% once the tool schema layer is warm.",
          "The savings are not just financial — faster cache hits mean lower latency on every turn after the first, which users perceive as snappier responses even on complex multi-tool workflows.",
        ],
        table: {
          headers: ["Metric", "Before caching", "After caching"],
          rows: [
            ["Median cost per 10-turn session", "$2.40", "$0.31"],
            ["P95 latency (turn 5+)", "4.2s", "2.1s"],
            ["Cache hit rate", "—", "87%"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "Does prompt caching work with all models Gomer supports?",
        a: "Caching is currently optimized for Claude models via Anthropic's API. Other providers have different caching semantics — we abstract the breakpoint logic so new providers can be added without changing skill or thread code.",
      },
      {
        q: "What invalidates the cache mid-thread?",
        a: "Changing the system prompt, adding or removing tools, or modifying skill definitions invalidates the cached prefix. The thread engine handles re-warming automatically on the next turn.",
      },
      {
        q: "Can I see cache performance for my workspace?",
        a: "Usage dashboards show cache hit rates and cost breakdowns per thread. Enterprise customers get per-team cache analytics in the usage panel.",
      },
    ],
  },
  {
    slug: "what-breaks-when-your-agent-has-100000-tools",
    title: "What Breaks When Your Agent Has 100,000 Tools",
    excerpt:
      "Tool selection at scale is not a search problem — it is an architecture problem. We explore context window limits, latency cliffs, and the routing patterns that actually work.",
    subtitle:
      "Why connecting thousands of integrations to an AI agent breaks naive tool-calling — and how Gomer routes, filters, and scopes tools in production.",
    date: "March 3, 2024",
    author: "Peter Albert",
    keyTakeaways: [
      "Dumping 100k tool schemas into a prompt is impossible — context limits and cost make it a non-starter.",
      "Tool selection must be hierarchical: namespace → category → action, not flat search.",
      "Embedding-based retrieval of tools introduces latency and recall problems at scale.",
      "Scoped tool sets per workspace, skill, and task keep the active tool surface under 200 tokens.",
      "The agent should never see tools it cannot authenticate — auth gates precede tool exposure.",
    ],
    intro: [
      "Gomer connects to over 3,000 integrations, each with dozens of actions. In theory, that is 100,000+ callable tools. In practice, sending even 1,000 tool definitions to an LLM degrades quality, blows context budgets, and makes the model worse at picking the right action.",
      "We learned this the hard way in early prototypes. This post documents what breaks and the architecture we built to fix it.",
    ],
    sections: [
      {
        title: "The context window cliff",
        paragraphs: [
          "A single Pipedream-style action schema averages 150–400 tokens. At 1,000 tools, that is 150k–400k tokens before the user says anything. No model can handle that, and no budget should.",
          "Even at 200 tools, we observed measurable degradation in tool selection accuracy. The model starts hallucinating tool names, combining parameters from different schemas, and picking semantically similar but wrong actions.",
        ],
      },
      {
        title: "Why flat retrieval fails",
        paragraphs: [
          "The obvious fix — embed all tool descriptions and retrieve top-k per query — introduces its own problems. Recall drops for multi-step workflows where the right tool only makes sense after a prior action. Latency adds 200–500ms per turn for embedding and search.",
          "Worse, retrieved tools lack structural context. The model sees 'create_deal' from three different integrations and cannot distinguish them without namespace metadata that retrieval strips away.",
        ],
        bullets: [
          "Top-k retrieval misses prerequisite tools in multi-step chains.",
          "Embedding search adds latency on every turn.",
          "Namespace collisions cause wrong-tool selection even with high recall.",
        ],
      },
      {
        title: "Hierarchical tool routing",
        paragraphs: [
          "Gomer scopes tools in layers. The workspace defines which integrations are connected and authenticated. Skills declare which integration categories they need. The thread engine activates only the relevant tool subset for the current task.",
          "At runtime, the agent sees a curated surface — typically 20–80 tools, not 100,000. When the task scope expands (e.g., user asks to also update the CRM), the engine promotes additional tool namespaces into the active set on the next turn.",
        ],
        subsections: [
          {
            title: "Auth-first exposure",
            paragraphs: [
              "Tools without valid OAuth tokens never enter the prompt. This is not just security — it prevents the model from attempting actions that will fail at execution time, which was a major source of retry loops in early builds.",
            ],
          },
          {
            title: "Skill-bound tool sets",
            paragraphs: [
              "Skills package a focused tool surface with domain context. A 'Sales outreach' skill exposes CRM and email tools. A 'Deploy dashboard' skill exposes hosting and database tools. The model operates within a coherent namespace.",
            ],
          },
        ],
      },
      {
        title: "What we measure",
        paragraphs: [
          "We track tool selection accuracy, execution success rate, and retry frequency per scoped surface size. Accuracy stays above 94% with scoped sets under 100 tools. It drops to ~71% at 500+ tools — confirming that less is more.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many tools does Gomer expose per turn?",
        a: "Typically 20–80, depending on active skills, connected integrations, and task scope. The thread engine dynamically expands the set when the conversation requires new capabilities.",
      },
      {
        q: "Can users call any of the 3,000+ integrations?",
        a: "Yes, but not all at once. Users connect integrations in their workspace. Only authenticated, relevant tools enter the agent's context for a given task.",
      },
      {
        q: "What happens when the agent needs a tool outside the current scope?",
        a: "The agent can request scope expansion — the engine promotes the needed integration namespace on the next turn. Users see this as the agent 'connecting' to a new tool mid-conversation.",
      },
    ],
  },
];

export const researchPostsBySlug = Object.fromEntries(researchPosts.map((p) => [p.slug, p]));

export function getResearchPost(slug: string): BlogPost | undefined {
  return researchPostsBySlug[slug];
}

export const researchPostMetas: BlogPostMeta[] = researchPosts.map(
  ({ slug, title, excerpt, date, author, tags }) => ({ slug, title, excerpt, date, author, tags }),
);
