import type { ComparePageConfig } from "@/components/compare/types";
import claudeIcon from "@/assets/images/claude.svg";

const claudeWhenChooseGradient =
  "radial-gradient(139.85% 104.66% at 52.06% -4.35%, rgb(255, 180, 150) 0%, rgb(217, 119, 87) 6.43%, rgb(255, 210, 190) 35.97%, rgb(250, 200, 180) 80.07%, rgb(217, 119, 87) 100%)";

export const claudeInSlackCompareConfig: ComparePageConfig = {
  meta: {
    title: "Viktor vs Claude in Slack — Coworker vs Assistant",
    description:
      "Compare Viktor and Claude in Slack. Claude drafts and summarizes. Viktor connects to 3,200+ tools and ships real work autonomously.",
    ogTitle: "Viktor vs Claude in Slack — Coworker vs Assistant",
    ogDescription:
      "How Viktor and Claude in Slack stack up on actions, integrations, deliverables, pricing, and team workflows.",
  },
  hero: {
    titleLine1: "Viktor vs Claude in Slack:",
    titleLine2: "Coworker vs Assistant",
    subtitle:
      "Claude in Slack helps you draft and summarize. Viktor connects to your tools, runs your reports, and delivers real outputs. One assists. The other executes.",
    lastUpdated: "Last updated: June 2026",
  },
  competitor: {
    name: "Claude in Slack",
    icon: claudeIcon,
    iconAlt: "Claude",
    heroDescription: [
      "Claude in Slack brings Anthropic's AI assistant into your workspace for drafting, summarizing threads, research, and coding tasks via Claude Code.",
      "Choose Claude in Slack for conversational assistance and writing help within your existing Slack workflow.",
    ],
    heroChooseWhen: "Choose Claude in Slack for drafting, summarizing, and research assistance.",
    badges: ["Anthropic AI", "Thread summaries", "Claude Code beta"],
    whenChooseHeaderGradient: claudeWhenChooseGradient,
  },
  rows: [
    {
      feature: "What it is",
      viktor:
        "Autonomous AI employee that connects to 3,200+ business tools and does real work: reports, CRM updates, ad management, code commits, and more.",
      competitor:
        "AI assistant in Slack for drafting responses, summarizing threads, research, and routing coding tasks to Claude Code on the web.",
    },
    {
      feature: "Where it lives",
      viktor: "Inside Slack and Microsoft Teams. @mention Viktor like a colleague with full team access.",
      competitor:
        "Inside Slack via DMs, the AI assistant header panel, and thread @mentions. Requires paid Slack plan and admin approval.",
    },
    {
      feature: "Integrations",
      viktor:
        "3,200+ managed OAuth integrations with read/write access. Stripe, HubSpot, Meta Ads, Google Ads, Notion, Linear, GitHub, and more.",
      competitor:
        "Web search and tool connections you've enabled in Claude. Slack connector (Team/Enterprise) lets Claude search workspace channels and files for context.",
    },
    {
      feature: "Deliverables",
      viktor:
        "Board-ready PDFs, Excel spreadsheets, PowerPoint decks, full-stack web applications (Viktor Spaces), code commits, and pull requests.",
      competitor:
        "Drafted text responses for review. Claude Code (beta) can create PRs from coding sessions on claude.com/code, but general business deliverables are text-based.",
    },
    {
      feature: "Pricing",
      viktor: "Free starter ($100 credits) · Team $50/mo per workspace — not per seat",
      competitor:
        "Requires Claude subscription (Team/Enterprise) plus paid Slack plan. Per-user pricing on both sides.",
    },
    {
      feature: "Memory",
      viktor:
        "Persistent company memory shared across your workspace. Learns tools, preferences, team structure, and processes over time.",
      competitor:
        "Conversation context within threads and sessions. Slack connector adds workspace search, but no persistent company-wide operational memory.",
    },
    {
      feature: "Scheduled tasks",
      viktor:
        "Built-in cron system. Daily reports, weekly audits, monthly reconciliations run autonomously without prompting.",
      competitor: "Not available. You must manually start each conversation or @mention.",
    },
    {
      feature: "Team features",
      viktor:
        "Multi-user by default. Shared context, shared automations, shared memory across the entire workspace.",
      competitor:
        "Each user authenticates with their Claude account. Shared thread context, but no shared operational automations or company memory.",
    },
    {
      feature: "Actions",
      viktor:
        "Real actions: creates Linear issues, updates CRM records, sends emails, manages ad campaigns, deploys web apps, submits pull requests.",
      competitor:
        "Drafts responses for your review. Claude Code can investigate code and create PRs, but business tool actions require manual execution.",
    },
    {
      feature: "Security",
      viktor:
        "SOC 2 Type 1 certified. GDPR aligned. CCPA compliant. CASA Tier 3 certified. Credentials stored server-side only.",
      competitor:
        "Anthropic enterprise security policies. Slack conversation data retained per Anthropic's privacy policy. Admin controls for app approval.",
    },
    {
      feature: "Setup",
      viktor: "Install from Slack App Directory. Connect integrations via OAuth. Takes under 5 minutes. Free to start.",
      competitor:
        "Slack admin approves Claude app from marketplace. Each user authenticates with Claude login. Slack connector requires Team/Enterprise plan.",
    },
  ],
  featureSections: [
    {
      title: "Viktor executes. Claude assists.",
      paragraphs: [
        "Ask Viktor to audit your ad spend and you get a polished PDF with live data from Meta Ads, Google Ads, and Stripe — delivered in your Slack thread in minutes. Viktor pulled the data, ran the analysis, and formatted the report.",
        "Ask Claude in Slack the same question and you'll get a well-written draft analysis — but you'll still need to pull the data yourself, create the report, and share it with your team.",
        "Both use frontier AI models. The difference is authorization and connection. Viktor is wired into your tools and empowered to act. Claude is wired into your conversations and empowered to advise.",
      ],
    },
    {
      title: "Shared team AI vs. individual assistant accounts.",
      paragraphs: [
        "Viktor is one AI employee for your whole workspace. When it learns your Stripe billing patterns, that knowledge is available to everyone who asks. When it automates a weekly report, the whole channel sees it.",
        "Claude in Slack requires each team member to authenticate with their own Claude account. Conversations are helpful, but there's no shared operational memory or autonomous workflows running for the team.",
        "For teams that want one AI coworker doing real work — not four individual assistants drafting text — Viktor's shared workspace model is the better fit.",
      ],
    },
    {
      title: "3,200+ business integrations vs. workspace search.",
      paragraphs: [
        "Viktor connects to Stripe, HubSpot, Meta Ads, Google Ads, Notion, Linear, GitHub, and 3,200+ more with managed OAuth. One message can read revenue, update a CRM, and create a Linear issue.",
        "Claude's Slack connector lets it search your channels, DMs, and files for context — useful for meeting prep and research. But it can't update your CRM, manage ad campaigns, or deploy web applications.",
        "If your workflows require touching business tools — not just reading Slack messages — Viktor's integration depth is what you need.",
      ],
    },
  ],
  whenToChoose: {
    title: "When to choose Claude in Slack vs Viktor",
    competitorChooseLabel: "Choose Claude in Slack if:",
    viktorWhen: [
      "You need an AI that connects to business tools and takes real actions autonomously",
      "You want one shared AI employee with company-wide memory and automations",
      "You need professional deliverables: PDFs, Excel reports, PowerPoint decks, web applications",
      "You want scheduled tasks running without anyone prompting the AI",
      "You need cross-tool workflows: ad management, CRM updates, codebase contributions",
      "You want per-workspace pricing instead of per-user Claude + Slack subscriptions",
    ],
    competitorWhen: [
      "You need help drafting responses, summarizing threads, or writing content in Slack",
      "You already have Claude Team/Enterprise and want AI assistance where you work",
      "You want Claude Code for development tasks routed from Slack to the web",
      "You primarily need research and writing help, not autonomous business operations",
    ],
  },
  testimonials: [
    {
      name: "Tobias Giesen",
      role: "CEO, Growably",
      quote:
        "Claude in Slack was great for drafting. Viktor is what we needed to actually run our weekly ops reports automatically.",
    },
    {
      name: "Sam Kopelman",
      role: "CEO, Givr",
      quote:
        "We had Claude helping us write. Viktor started doing — updating CRM, pulling metrics, shipping PDFs.",
    },
    {
      name: "Antonín Štětina",
      role: "CEO, KULINA Group",
      quote:
        "One Viktor workspace replaced the copy-paste loop between Claude drafts and our actual business tools.",
    },
  ],
  faqs: [
    {
      q: "Can I use both Claude in Slack and Viktor?",
      a: "Yes. Many teams use Claude for drafting and writing assistance, and Viktor for operational workflows that touch business tools. They complement each other.",
    },
    {
      q: "How is Claude Code different from Viktor?",
      a: "Claude Code (beta) routes coding tasks from Slack to claude.com/code for investigation and PRs. Viktor handles both coding and business operations — CRM, ads, reports, web apps — natively in Slack.",
    },
    {
      q: "Do I need separate Claude and Slack subscriptions for Viktor?",
      a: "No. Viktor is a standalone product. One workspace subscription covers your whole team.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. Viktor is SOC 2 compliant with workspace controls, audit logs, and least-privilege access to every integration you connect.",
    },
  ],
};
