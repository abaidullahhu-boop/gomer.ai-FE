import type { ComparePageConfig } from "@/components/compare/types";
import openclawIcon from "@/assets/images/openclaw-app-icon-color.avif";

const openclawWhenChooseGradient =
  "radial-gradient(139.85% 104.66% at 52.06% -4.35%, rgb(255, 140, 90) 0%, rgb(255, 107, 53) 6.43%, rgb(255, 180, 140) 35.97%, rgb(255, 160, 120) 80.07%, rgb(255, 107, 53) 100%)";

export const openclawCompareConfig: ComparePageConfig = {
  meta: {
    title: "Gomer vs OpenClaw — Managed AI Employee vs DIY Agent",
    description:
      "Compare Gomer and OpenClaw side-by-side. Gomer is production-ready in Slack with 3,200+ integrations. OpenClaw requires self-hosting or managed setup.",
    ogTitle: "Gomer vs OpenClaw — Managed AI Employee vs DIY Agent",
    ogDescription:
      "How Gomer and OpenClaw stack up on setup, integrations, security, deliverables, and team workflows.",
  },
  hero: {
    titleLine1: "Gomer vs OpenClaw:",
    titleLine2: "From DIY Agent to AI Employee",
    subtitle:
      "OpenClaw proved the world wants AI agents that do real work. Gomer is what happens when you want it to just work.",
    lastUpdated: "Last updated: June 2026",
  },
  competitor: {
    name: "OpenClaw",
    icon: openclawIcon,
    iconAlt: "OpenClaw",
    heroDescription: [
      "OpenClaw is an open-source local agent for technical users who want full control over models, runtime, and deployment.",
      "Choose OpenClaw when you prioritize DIY flexibility and self-hosting over managed operations for your team.",
    ],
    heroChooseWhen: "Choose OpenClaw if you want to self-host and customize every layer of your agent stack.",
    badges: ["Open source", "Self-hosted option", "Developer-focused"],
    whenChooseHeaderGradient: openclawWhenChooseGradient,
  },
  rows: [
    {
      feature: "What it is",
      gomer:
        "Managed AI employee that lives in Slack. Connects to 3,200+ tools and delivers real work autonomously — no infrastructure to manage.",
      competitor:
        "Open-source AI agent framework. You configure channels, tokens, integrations, and hosting yourself — or use a managed wrapper like SlackClaw.",
    },
    {
      feature: "Where it lives",
      gomer: "Inside your Slack (or Microsoft Teams). @mention Gomer like a colleague. Zero context switching.",
      competitor:
        "Can connect to Slack via Socket Mode or HTTP webhooks. Self-hosted setup typically takes hours to days; managed SlackClaw takes under 5 minutes.",
    },
    {
      feature: "Integrations",
      gomer:
        "3,200+ managed OAuth integrations with read/write access. One-click connect to Stripe, HubSpot, Meta Ads, Google Ads, Notion, Linear, GitHub, and more.",
      competitor:
        "800+ integrations via managed SlackClaw, or build your own connections in self-hosted mode. Custom integrations require developer time.",
    },
    {
      feature: "Deliverables",
      gomer:
        "Board-ready PDFs, Excel spreadsheets, PowerPoint decks, full-stack web applications (Gomer Spaces), code commits, and more.",
      competitor:
        "Generates text responses and can take actions via connected tools. No built-in professional document generation or deployed web app builder.",
    },
    {
      feature: "Pricing",
      gomer: "Free starter ($100 credits) · Team $50/mo per workspace — not per seat",
      competitor:
        "Self-hosted: free (plus VPS/hosting costs) · SlackClaw managed: ~$39/mo · TryOpenClaw.ai: $39/mo after $1 trial",
    },
    {
      feature: "Memory",
      gomer:
        "Persistent company memory shared across your entire workspace. Gomer learns your tools, team structure, and processes over time.",
      competitor:
        "Persistent memory on dedicated instances (SlackClaw). Self-hosted memory depends on your configuration and storage setup.",
    },
    {
      feature: "Scheduled tasks",
      gomer:
        "Built-in cron system. Daily reports, weekly audits, monthly reconciliations run autonomously without prompting.",
      competitor:
        "Supports scheduled skills and background agents in managed mode. Self-hosted cron requires manual configuration.",
    },
    {
      feature: "Team features",
      gomer:
        "Multi-user by default. Everyone in your Slack workspace can @mention Gomer with shared context, automations, and memory.",
      competitor:
        "Slack-native in managed mode. Self-hosted setups may require per-channel configuration and permission management.",
    },
    {
      feature: "Actions",
      gomer:
        "Real actions: creates Linear issues, updates CRM records, sends emails, manages ad campaigns, deploys web apps, submits pull requests.",
      competitor:
        "Can take actions via connected integrations. Action breadth depends on which tools you've configured and your OAuth scope setup.",
    },
    {
      feature: "Security",
      gomer:
        "SOC 2 Type 1 certified. GDPR aligned. CCPA compliant. CASA Tier 3 certified. Credentials stored server-side only.",
      competitor:
        "Self-hosted: security is your responsibility. Managed services vary — check each provider's compliance certifications.",
    },
    {
      feature: "Setup",
      gomer: "Install from Slack App Directory. Connect integrations via OAuth. Takes under 5 minutes. Free to start.",
      competitor:
        "Self-hosted: 4–8+ hours (Slack app creation, tokens, scopes, hosting, SSL). Managed SlackClaw: under 5 minutes.",
    },
  ],
  featureSections: [
    {
      title: "Your credentials stay out of the model's reach.",
      paragraphs: [
        "When you ask Gomer to audit your ad spend, it pulls live data from Meta Ads and Google Ads, cross-references with Stripe revenue, and delivers a polished PDF in your Slack thread — in under 5 minutes. No configuration files. No webhook debugging.",
        "OpenClaw is powerful for teams that want to build custom agent behavior from scratch. But that power comes with setup complexity: Slack app creation, bot tokens, app-level tokens for Socket Mode, OAuth scopes, and ongoing maintenance.",
        "Gomer gives you the outcomes without the ops burden. OpenClaw gives you the building blocks if you have engineers to assemble them.",
      ],
    },
    {
      title: "Slack-native from install, not after a weekend of DevOps.",
      paragraphs: [
        "Gomer installs from the Slack App Directory in one click. Your team @mentions it immediately — no Gateway URLs, no signing secrets, no VPS provisioning.",
        "OpenClaw's self-hosted Slack integration requires creating a Slack app, configuring Socket Mode or HTTP Request URLs, managing token rotation, and maintaining a running Gateway instance. Even experienced teams report 15+ setup steps.",
        "Managed options like SlackClaw close the gap on setup time, but Gomer was built as a managed product from day one — with enterprise security, professional deliverables, and 3,200+ integrations included.",
      ],
    },
    {
      title: "3,200+ managed integrations vs. build-your-own connections.",
      paragraphs: [
        "Gomer connects to your business tools with managed OAuth. One click to connect Stripe, HubSpot, Meta Ads, Google Ads, Notion, Linear, GitHub, and thousands more.",
        "OpenClaw's managed SlackClaw offers 800+ integrations with one-click OAuth. Self-hosted OpenClaw requires you to configure each integration manually — or write custom skills in plain English and hope the agent can figure out the API.",
        "For business teams that need cross-tool workflows today — not after a sprint of integration work — Gomer's managed connection layer is the faster path to value.",
      ],
    },
  ],
  whenToChoose: {
    title: "When to choose OpenClaw vs Gomer",
    competitorChooseLabel: "Choose OpenClaw if:",
    gomerWhen: [
      "You want a production-ready AI employee with zero DevOps overhead",
      "You need 3,200+ managed integrations with one-click OAuth",
      "You want professional deliverables: PDFs, Excel reports, PowerPoint decks, web applications",
      "You need SOC 2 certified security out of the box",
      "Your team needs shared context and memory across the whole workspace",
      "You want scheduled automations running without manual configuration",
    ],
    competitorWhen: [
      "You want full control over your agent's source code and infrastructure",
      "You have engineers who can manage Slack app tokens, hosting, and OAuth scopes",
      "You prefer open-source software you can audit and customize",
      "You're building a highly custom agent workflow that doesn't fit a managed product",
    ],
  },
  testimonials: [
    {
      name: "Tobias Giesen",
      role: "CEO, Growably",
      quote:
        "We tried self-hosting an agent framework first. Gomer got us to production in a day — with better deliverables and zero ops.",
    },
    {
      name: "Sam Kopelman",
      role: "CEO, Givr",
      quote:
        "OpenClaw is impressive if you have a dev team to run it. Gomer is impressive if you have a business to run.",
    },
    {
      name: "Antonín Štětina",
      role: "CEO, KULINA Group",
      quote:
        "We didn't want to become an AI infrastructure company. Gomer let us focus on our actual work.",
    },
  ],
  faqs: [
    {
      q: "Is Gomer based on OpenClaw?",
      a: "No. Gomer is a fully managed AI employee built for business teams. It shares the goal of autonomous agents in Slack, but with a different architecture optimized for production deliverables and enterprise security.",
    },
    {
      q: "Can I migrate from OpenClaw to Gomer?",
      a: "Yes. Connect your integrations via OAuth, describe your existing workflows to Gomer, and it will replicate them — often with better deliverables and less maintenance.",
    },
    {
      q: "What about OpenClaw's open-source flexibility?",
      a: "If you need to modify agent source code or run on your own hardware, OpenClaw is the right choice. If you need an AI employee that ships work today, Gomer is faster.",
    },
    {
      q: "Is my data safe with Gomer vs self-hosted OpenClaw?",
      a: "Gomer is SOC 2 Type 1 certified with workspace controls and audit logs. Self-hosted OpenClaw security depends entirely on your team's infrastructure practices.",
    },
  ],
};
