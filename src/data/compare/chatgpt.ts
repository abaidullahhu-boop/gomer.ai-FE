import type { ComparePageConfig } from "@/components/compare/types";
import chatgptIcon from "@/assets/images/chatgpt.svg";

const chatgptWhenChooseGradient =
  "radial-gradient(139.85% 104.66% at 52.06% -4.35%, rgb(141, 206, 250) 0%, rgb(134, 203, 250) 6.43%, rgb(215, 236, 255) 35.97%, rgb(211, 234, 253) 80.07%, rgb(132, 203, 250) 100%)";

export const chatgptCompareConfig: ComparePageConfig = {
  meta: {
    title: "Viktor vs ChatGPT — The AI That Does the Work",
    description:
      "Compare Viktor and ChatGPT side-by-side. Viktor connects to 3,000+ tools and ships real work in Slack — ChatGPT talks about it.",
    ogTitle: "Viktor vs ChatGPT — The AI That Does the Work",
    ogDescription:
      "How Viktor and ChatGPT stack up on integrations, deployment, pricing, security, and reliability.",
  },
  hero: {
    titleLine1: "Viktor vs ChatGPT:",
    titleLine2: "The AI That Does the Work",
    subtitle:
      "ChatGPT answers your questions. Viktor connects to your tools, runs your reports, and delivers real outputs. One is a chatbot. The other is a coworker.",
    lastUpdated: "Last updated: March 2026",
  },
  competitor: {
    name: "ChatGPT",
    icon: chatgptIcon,
    iconAlt: "ChatGPT",
    heroDescription: [
      "ChatGPT is a general-purpose AI chatbot for ad-hoc questions, writing, and brainstorming.",
      "Choose ChatGPT for individual conversations.",
    ],
    heroChooseWhen: "Choose ChatGPT for individual conversations.",
    whenChooseHeaderGradient: chatgptWhenChooseGradient,
  },
  rows: [
    {
      feature: "What it is",
      viktor:
        "AI employee that lives in your Slack workspace. Connects to your tools and does real work autonomously.",
      competitor:
        "AI chatbot accessed through a separate web app or mobile app. Generates text responses to prompts.",
    },
    {
      feature: "Where it lives",
      viktor: "Inside your Slack (or Microsoft Teams). You @mention Viktor like a colleague.",
      competitor: "Separate app at chat.openai.com. You leave your workspace to use it.",
    },
    {
      feature: "Integrations",
      viktor:
        "3,200+ managed integrations with real read/write access. Connects to Stripe, HubSpot, Meta Ads, Google Ads, GitHub, Notion, Linear, and more via one-click OAuth.",
      competitor:
        "Limited. Some GPT-4 plugins and web browsing. No managed OAuth connections to your business tools.",
    },
    {
      feature: "Deliverables",
      viktor:
        "Board-ready PDFs, Excel spreadsheets, PowerPoint decks, full-stack web applications (Viktor Spaces), code commits, and more.",
      competitor:
        "Text responses. Can generate code snippets and basic files, but no polished professional documents or deployed applications.",
    },
    {
      feature: "Pricing",
      viktor: "Free starter ($100 credits) · Team $50/mo per workspace — not per seat",
      competitor: "Free tier (limited) · Plus $20/mo · Pro $200/mo — per user",
    },
    {
      feature: "Memory",
      viktor:
        "Persistent company memory. Viktor learns your tools, preferences, team structure, and processes. Gets smarter about your business every week.",
      competitor:
        "Limited conversation memory. Can reference recent chats, but no persistent company knowledge across sessions.",
    },
    {
      feature: "Scheduled tasks",
      viktor:
        "Built-in cron system. Daily reports, weekly audits, monthly reconciliations run autonomously without prompting.",
      competitor: "Not available. You must manually start each conversation.",
    },
    {
      feature: "Team features",
      viktor:
        "Multi-user. Everyone in your Slack workspace can @mention Viktor. Shared context, shared automations, shared memory.",
      competitor:
        "Primarily single-user. Team plans exist, but each user has separate conversations with no shared context.",
    },
    {
      feature: "Actions",
      viktor:
        "Real actions: creates Linear issues, updates CRM records, sends emails, manages ad campaigns, deploys web apps, submits pull requests.",
      competitor: "Generates text about what you could do. You still copy-paste and execute manually.",
    },
    {
      feature: "Security",
      viktor:
        "SOC 2 Type 1 certified. GDPR aligned. CCPA compliant. CASA Tier 3 certified. Credentials stored server-side only.",
      competitor: "SOC 2 certified. Enterprise data policies available on Team/Enterprise plans.",
    },
    {
      feature: "Setup",
      viktor: "Install from Slack App Directory. Connect integrations via OAuth. Takes under 5 minutes. Free to start.",
      competitor: "Sign up at openai.com. No business tool connections to configure.",
    },
  ],
  featureSections: [
    {
      title: "Viktor does the work. ChatGPT talks about it.",
      paragraphs: [
        "ChatGPT generates text responses. Viktor generates results. When you ask Viktor to audit your ad spend, it pulls live data from Meta Ads and Google Ads, cross-references with Stripe revenue, analyzes trends vs. last month, and delivers a polished PDF report with charts, tables, and an executive summary. That PDF is in your Slack thread in under 5 minutes.",
        "With ChatGPT, you'd describe your data in the chat, get a text analysis back, then manually create the report yourself.",
        "The difference isn't intelligence. Both use frontier AI models. The difference is that Viktor is connected to your tools and authorized to act. ChatGPT can think. Viktor can think and do.",
      ],
    },
    {
      title: "A teammate in Slack, not a tab in your browser.",
      paragraphs: [
        "Viktor lives where your team already works. You @mention it in a channel or DM it directly, just like messaging a colleague. It sees the conversation context, knows who's asking, and remembers what you discussed last week.",
        "ChatGPT lives in a separate browser tab. Every conversation starts from scratch. You provide the context manually every time, and whatever ChatGPT produces, you still have to bring it back to your team in Slack.",
        "Viktor's integration into Slack means your entire team benefits. When Viktor automates a weekly report, everyone in the channel sees it. When Viktor learns something about your Stripe account, that knowledge is available to everyone who asks. There's no copy-pasting between apps.",
      ],
    },
    {
      title: "3,200+ integrations vs. copy-paste.",
      paragraphs: [
        "Viktor connects to your business tools with managed OAuth. One click to connect Stripe, HubSpot, Meta Ads, Google Ads, Notion, Linear, GitHub, and thousands more. Viktor can read and write data across all of them in a single request.",
        "Pull our Stripe revenue this month, compare it to our Meta Ads spend, and create a Linear issue if ROAS dropped below 3x. That's one message. Three tools. Real actions taken.",
        "ChatGPT has limited integrations through plugins and can browse the web, but it can't connect to your Stripe account, update your CRM, or manage your ad campaigns. You describe what you want, ChatGPT suggests what to do, and you go execute it yourself across each tool.",
      ],
    },
  ],
  whenToChoose: {
    title: "When to choose ChatGPT vs Viktor",
    competitorChooseLabel: "Choose ChatGPT if:",
    viktorWhen: [
      "You need an AI that connects to your business tools and takes real actions",
      "You want your team to share one AI employee with shared context and memory",
      "You need professional deliverables: PDFs, Excel reports, PowerPoint decks, web applications",
      "You want automated, scheduled tasks running without manual prompting",
      "You want an AI that proactively suggests automations based on your team's work patterns",
      "You need ad campaign management, cross-tool analytics, or codebase contributions",
    ],
    competitorWhen: [
      "You need a general-purpose AI for brainstorming, writing, and one-off questions",
      "You work primarily solo and don't need team-wide AI capabilities",
      "You don't need your AI connected to business tools like Stripe, HubSpot, or ad platforms",
      "You want a free or low-cost option for personal use",
    ],
  },
  testimonials: [
    {
      name: "Tobias Giesen",
      role: "CEO, Growably",
      quote:
        "We replaced four different ChatGPT seats with one Viktor workspace. The team actually uses it because it lives where they already work.",
    },
    {
      name: "Sam Kopelman",
      role: "CEO, Givr",
      quote: "ChatGPT was helpful. Viktor is operational. It runs the work, not just the answers.",
    },
    {
      name: "Antonín Štětina",
      role: "CEO, KULINA Group",
      quote:
        "Mindblowing all-in-one AI which does everything in a single solution — no more tab-switching between ten different products.",
    },
  ],
  faqs: [
    {
      q: "Is Viktor a replacement for ChatGPT?",
      a: "For team workflows — yes. For personal Q&A in a browser tab, ChatGPT still wins. Many of our customers run both.",
    },
    {
      q: "Do I have to move my team off ChatGPT to use Viktor?",
      a: "No. Viktor lives in Slack and Teams next to your existing tools. Try it on one workflow first and grow from there.",
    },
    {
      q: "How is pricing different from a ChatGPT subscription?",
      a: "Viktor charges per task that runs, not per seat. Invite the whole company; you only pay for the work that ships.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. Viktor is SOC 2 compliant with workspace controls, audit logs, and least-privilege access to every integration you connect.",
    },
  ],
};
