import type { ComparePageConfig } from "@/components/compare/types";
import taskletIcon from "@/assets/images/tasklet.svg";

const taskletWhenChooseGradient =
  "radial-gradient(139.85% 104.66% at 52.06% -4.35%, rgb(165, 180, 252) 0%, rgb(99, 102, 241) 6.43%, rgb(199, 210, 254) 35.97%, rgb(180, 190, 250) 80.07%, rgb(99, 102, 241) 100%)";

export const taskletCompareConfig: ComparePageConfig = {
  meta: {
    title: "Gomer vs Tasklet — Slack Coworker vs Cloud Agent",
    description:
      "Compare Gomer and Tasklet. Gomer lives in Slack and ships work where your team already is. Tasklet runs cloud agents you manage from a web app.",
    ogTitle: "Gomer vs Tasklet — Slack Coworker vs Cloud Agent",
    ogDescription:
      "How Gomer and Tasklet stack up on Slack-native workflows, integrations, deliverables, pricing, and team collaboration.",
  },
  hero: {
    titleLine1: "Gomer vs Tasklet:",
    titleLine2: "Slack Coworker vs Cloud Agent",
    subtitle:
      "Tasklet builds cloud agents from plain English. Gomer is an AI employee that lives in Slack, connects to 3,200+ tools, and ships work where your team already is.",
    lastUpdated: "Last updated: June 2026",
  },
  competitor: {
    name: "Tasklet",
    icon: taskletIcon,
    iconAlt: "Tasklet",
    heroDescription: [
      "Tasklet is a cloud agent platform where you describe workflows in plain English. Agents run 24/7 with triggers for schedules, emails, Slack events, and webhooks.",
      "Choose Tasklet for building automated workflows from a web-based chat interface.",
    ],
    heroChooseWhen: "Choose Tasklet for cloud-based workflow automation you configure from a web app.",
    badges: ["Plain English setup", "Cloud agents", "Y Combinator backed"],
    whenChooseHeaderGradient: taskletWhenChooseGradient,
  },
  rows: [
    {
      feature: "What it is",
      gomer:
        "AI employee that lives in your Slack workspace. Connects to 3,200+ tools and does real work autonomously — reports, CRM updates, ad management, and more.",
      competitor:
        "Cloud agent platform where you describe automations in plain English. Agents run 24/7 with triggers but are managed from a web app, not Slack conversations.",
    },
    {
      feature: "Where it lives",
      gomer: "Inside Slack and Microsoft Teams. @mention Gomer like a colleague. Work happens where your team already is.",
      competitor:
        "Primary interface is a web app chat. Slack is a trigger/notification channel — not a conversational workspace for iterating on tasks.",
    },
    {
      feature: "Integrations",
      gomer:
        "3,200+ managed OAuth integrations with read/write access. One-click connect to Stripe, HubSpot, Meta Ads, Google Ads, Notion, Linear, GitHub, and more.",
      competitor:
        "Thousands of pre-built integrations plus HTTP API fallback, MCP servers, and browser automation for unsupported services.",
    },
    {
      feature: "Deliverables",
      gomer:
        "Board-ready PDFs, Excel spreadsheets, PowerPoint decks, full-stack web applications (Gomer Spaces), code commits, and pull requests.",
      competitor:
        "Generates reports, summaries, and data outputs. Can build UIs on the fly and run code in cloud sandboxes, but deliverables are primarily data and text.",
    },
    {
      feature: "Pricing",
      gomer: "Free starter ($100 credits) · Team $50/mo per workspace — not per seat",
      competitor: "Free tier available · Pro $29/mo · Team plans with shared agents and centralized billing",
    },
    {
      feature: "Memory",
      gomer:
        "Persistent company memory shared across your workspace. Learns tools, preferences, team structure, and processes over time.",
      competitor:
        "Long-lived agents maintain context within their scope. Shared team knowledge available on team plans with centralized control.",
    },
    {
      feature: "Scheduled tasks",
      gomer:
        "Built-in cron system. Daily reports, weekly audits, monthly reconciliations run autonomously without prompting.",
      competitor:
        "Strong trigger system: schedules, email events, Slack messages, webhooks, Google Calendar, and 14+ event sources.",
    },
    {
      feature: "Team features",
      gomer:
        "Multi-user by default. Everyone @mentions Gomer in Slack with shared context, automations, and memory.",
      competitor:
        "Team plans share tools, knowledge, skills, and agents with centralized billing. Interaction still primarily through the web app.",
    },
    {
      feature: "Actions",
      gomer:
        "Real actions via Slack: creates Linear issues, updates CRM records, sends emails, manages ad campaigns, deploys web apps, submits pull requests.",
      competitor:
        "Real actions via cloud agents: CRM updates, email triage, data processing, browser automation. Triggered from web app or event sources.",
    },
    {
      feature: "Security",
      gomer:
        "SOC 2 Type 1 certified. GDPR aligned. CCPA compliant. CASA Tier 3 certified. Credentials stored server-side only.",
      competitor: "Cloud-native agent runtime with credential management. Check Tasklet's security documentation for compliance details.",
    },
    {
      feature: "Setup",
      gomer: "Install from Slack App Directory. Connect integrations via OAuth. Takes under 5 minutes. Free to start.",
      competitor:
        "Sign up at tasklet.ai, describe your workflow in plain English. Agent configures itself in seconds. Connect Slack as a trigger channel separately.",
    },
  ],
  featureSections: [
    {
      title: "Gomer works in Slack. Tasklet works from a dashboard.",
      paragraphs: [
        "With Gomer, you @mention it in a channel: Pull our Stripe revenue, compare to Meta Ads spend, and post a PDF summary here. Five minutes later, the report is in the thread. Your whole team sees it.",
        "With Tasklet, you describe the same workflow in the web app chat. The agent runs on a schedule and posts results to Slack — but iterating, refining, and collaborating happen in Tasklet's interface, not in your team's conversation flow.",
        "Both automate real work. Gomer keeps the human-AI collaboration where your team already lives. Tasklet centralizes it in a separate product.",
      ],
    },
    {
      title: "One AI coworker vs. a fleet of cloud agents.",
      paragraphs: [
        "Gomer is one AI employee for your workspace. Shared memory, shared context, shared automations. When someone asks about last week's numbers, Gomer already knows — because it ran the report for someone else yesterday.",
        "Tasklet lets you create multiple specialized agents — one for CRM hygiene, one for daily briefings, one for bug triage. Powerful, but each agent is a separate entity you manage from the web app.",
        "For teams that want simplicity — one coworker in Slack who does everything — Gomer's model wins. For teams that want granular agent specialization, Tasklet's multi-agent approach has merit.",
      ],
    },
    {
      title: "Professional deliverables vs. data outputs.",
      paragraphs: [
        "Gomer delivers board-ready PDFs with charts, formatted Excel spreadsheets, PowerPoint decks, and even full-stack web applications (Gomer Spaces). These aren't raw data dumps — they're polished outputs your team can present.",
        "Tasklet excels at operational automation: daily briefings, CRM lead scoring, GitHub bug triage, invoice reminders. It generates reports and summaries, and can build UIs on the fly when needed.",
        "If your team needs presentation-quality deliverables shipped directly in Slack, Gomer's output layer is built for that. If you need lightweight recurring automations configured in plain English, Tasklet is strong there too.",
      ],
    },
  ],
  whenToChoose: {
    title: "When to choose Tasklet vs Gomer",
    competitorChooseLabel: "Choose Tasklet if:",
    gomerWhen: [
      "You want your AI to live in Slack where your team already works",
      "You need one shared AI employee with company-wide memory and context",
      "You want professional deliverables: PDFs, Excel reports, PowerPoint decks, web applications",
      "You prefer @mentioning an AI coworker over managing agents in a web dashboard",
      "You need ad campaign management, cross-tool analytics, or codebase contributions from Slack",
      "You want SOC 2 certified security with managed OAuth for 3,200+ integrations",
    ],
    competitorWhen: [
      "You want to describe automations in plain English and let AI configure them",
      "You prefer managing multiple specialized agents from a central web interface",
      "You need strong event triggers: email, calendar, Slack messages, webhooks",
      "You want browser automation as a fallback for services without APIs",
      "You're automating recurring ops tasks and don't need Slack-native collaboration",
    ],
  },
  testimonials: [
    {
      name: "Tobias Giesen",
      role: "CEO, Growably",
      quote:
        "Tasklet was great for automations, but our team kept forgetting to check the dashboard. Gomer lives where we already are — in Slack.",
    },
    {
      name: "Sam Kopelman",
      role: "CEO, Givr",
      quote:
        "We had Tasklet agents running reports. Gomer turned those reports into board-ready PDFs delivered in our channels.",
    },
    {
      name: "Antonín Štětina",
      role: "CEO, KULINA Group",
      quote:
        "One Gomer in Slack replaced three Tasklet agents and the context-switching between apps.",
    },
  ],
  faqs: [
    {
      q: "Can Tasklet and Gomer do similar things?",
      a: "Yes — both connect to business tools and automate workflows. The difference is where you interact: Gomer in Slack conversations, Tasklet in a web app dashboard.",
    },
    {
      q: "Does Tasklet work in Slack?",
      a: "Tasklet can trigger on Slack events and post results to channels, but you configure and iterate on agents in the Tasklet web app — not through Slack conversations.",
    },
    {
      q: "Which is better for non-technical teams?",
      a: "Both are designed for plain-English setup. Gomer has the edge for teams that want zero context switching — everything happens in Slack.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. Gomer is SOC 2 compliant with workspace controls, audit logs, and least-privilege access to every integration you connect.",
    },
  ],
};
