export type BlogPostSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: { title: string; paragraphs: string[] }[];
  table?: { headers: string[]; rows: string[][] };
  codeBlock?: string;
};

export type BlogPostFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  subtitle: string;
  date: string;
  author: string;
  tags?: string[];
  keyTakeaways: string[];
  intro: string[];
  sections: BlogPostSection[];
  faqs: BlogPostFaq[];
};

export type BlogPostMeta = Pick<BlogPost, "slug" | "title" | "excerpt" | "date" | "author" | "tags">;

function faqs(topic: string): BlogPostFaq[] {
  return [
    {
      q: `Do I need prior experience to get started with ${topic}?`,
      a: "No. Gomer is designed so engineers can describe what they need in plain language and iterate from a working starting point. You can go from idea to a shareable app in a single session.",
    },
    {
      q: "Can my whole team use the same workflow?",
      a: "Yes. Apps and automations built in Gomer can be shared across your workspace with permissions, versioning, and audit trails so the whole team works from one source of truth.",
    },
    {
      q: "How does Gomer connect to our existing tools?",
      a: "Gomer integrates with 3,000+ apps through managed authentication. Connect your stack once and Gomer can read, write, and orchestrate work across your tools from Slack or Teams.",
    },
    {
      q: "Is this suitable for production engineering work?",
      a: "Yes. Teams use Gomer for client deliverables, internal calculations, reports, and production deployments — with review-first defaults and SOC 2 compliant infrastructure.",
    },
  ];
}

function standardSections(topic: string, bullets: string[]): BlogPostSection[] {
  return [
    {
      title: "The short answer",
      paragraphs: [
        `${topic} is one of the highest-leverage ways engineering teams are using Gomer today. Instead of rebuilding the same workflow in spreadsheets or one-off scripts, you package the logic once and let Gomer run it on demand — or on a schedule — from Slack.`,
        "The practical win is speed without sacrificing rigor: your calculations stay auditable, your outputs stay formatted for clients, and your team stops copying data between tools by hand.",
      ],
      bullets: bullets,
    },
    {
      title: "How it works in Gomer",
      subsections: [
        {
          title: "Describe the workflow",
          paragraphs: [
            "Start in Slack or the Gomer App Builder. Describe the inputs, the calculation or extraction logic, and the output you need — a PDF, a dashboard, a web app, or a data export.",
          ],
        },
        {
          title: "Connect your tools",
          paragraphs: [
            "Wire up the files, APIs, and databases your workflow depends on. Gomer handles authentication and keeps credentials out of prompts.",
          ],
        },
        {
          title: "Ship and share",
          paragraphs: [
            "Publish to your workspace, set permissions, and let teammates run the same workflow with consistent results every time.",
          ],
        },
      ],
    },
    {
      title: "What teams ship with this",
      paragraphs: [
        "Teams typically go from a manual process that takes hours to an app or automation that runs in minutes. The output is client-ready, version-controlled, and easy to hand off to colleagues who were not in the original conversation.",
      ],
      codeBlock: `@Gomer run the ${topic.toLowerCase()} workflow on the latest project files
and post the results to #engineering for review before sending to the client.`,
    },
    {
      title: "When to use this approach",
      bullets: [
        "The workflow repeats weekly or monthly and small errors are expensive.",
        "Multiple tools or file formats are involved and handoffs create bottlenecks.",
        "You need a shareable artifact — not just an answer in a chat window.",
        "Judgment matters: you want drafts and review before anything goes external.",
      ],
    },
  ];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-coworker-vs-ai-agent",
    title: "AI Coworker vs AI Agent: What Is the Difference?",
    excerpt:
      "An AI agent is the technology. An AI coworker is how that technology shows up at work. Learn the practical difference and which one your team needs.",
    subtitle:
      "Analyze the differences between AI coworkers and AI agents to understand the implications for business operations and workforce dynamics.",
    date: "Jun 09, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "An AI agent is the technology. An AI coworker is how that technology shows up at work.",
      "The difference is not the model — it is the posture: presence, review-first action, and accountability.",
      "Coworkers live in Slack or Teams; agents are often scripts you trigger.",
      "Review-first is the dividing line that makes delegation safe near real customers.",
      "You manage a coworker; you invoke an agent.",
    ],
    intro: [
      '"AI agent" and "AI coworker" get used as if they were the same thing. They are not. An AI agent plans and acts toward a goal. An AI coworker packages that capability with an operating contract about where it lives, how it acts, and who it reports to.',
      "If you are evaluating tools, the distinction is practical. It tells you whether you are buying something you trigger and babysit, or something you delegate to and manage.",
    ],
    sections: [
      {
        title: "The short answer",
        paragraphs: [
          "An AI agent is software that plans and acts toward a goal with some degree of autonomy. An AI coworker is an AI agent given a job description: a persistent place to work, a review-first default, and accountability to a human.",
        ],
        bullets: [
          "Agent: invoked for a goal, often task-scoped, optimized for autonomy.",
          "Coworker: assigned a role, present in the team channel, optimized for trust and review.",
        ],
      },
      {
        title: "Side by side",
        paragraphs: ["Compare them on what actually matters when you put one to work on a Tuesday."],
        table: {
          headers: ["Dimension", "Bare AI agent", "AI coworker"],
          rows: [
            ["Where it runs", "A script, an API call, a dashboard you open", "In Slack or Microsoft Teams"],
            ["How you start it", "You trigger it with a defined input", "You @mention it in plain language"],
            ["Default to action", "Acts autonomously toward the goal", "Drafts first, waits for approval, then acts"],
            ["Memory", "Often stateless between runs", "Persistent across days and conversations"],
            ["Accountability", "Answers to whoever wrote the script", "Answers to a person, takes feedback"],
          ],
        },
      },
      {
        title: "Why the operating contract matters",
        paragraphs: [
          "The better model does not always win. What decides whether AI is useful at work is the operating contract — the defaults that govern behavior around real data and real customers.",
        ],
        subsections: [
          {
            title: "Same model, different outcome",
            paragraphs: [
              'Give both the task: "Email the churned customer and offer a discount." A bare agent sends it. A coworker drafts it in the thread and waits. Same capability, completely different risk profile.',
            ],
          },
        ],
      },
      {
        title: "When you want each",
        bullets: [
          "Bare agent: narrow, high-volume, low-stakes tasks — reclassify tickets, resize images, move rows.",
          "Coworker: multi-tool work that needs judgment — investor updates, pipeline triage, month-end reconciliation.",
          "Most teams need both; a coworker can orchestrate narrow agents underneath.",
        ],
        codeBlock: `@Gomer every Friday at 4pm, pull this week's closed-won deals from HubSpot
and new signups from our database, draft a short wins recap for #team, and
post it for me to review before it goes out.`,
      },
    ],
    faqs: [
      {
        q: "Is an AI coworker just an AI agent with better marketing?",
        a: "No. A coworker is an agent constrained by an operating contract: it lives where the team works, drafts before it acts, remembers context, and answers to a person.",
      },
      {
        q: "Do they run on the same model?",
        a: "They can. The difference is posture built around the model: presence, review-first action, persistent memory, and accountability.",
      },
      {
        q: 'Is "review-first" just a slower agent?',
        a: "It is slower at first and faster over a quarter. Review-first earns trust without shipping mistakes to customers.",
      },
      {
        q: "Which one does my team need?",
        a: "Narrow, low-stakes, high-volume work suits a bare agent. Cross-tool, judgment-heavy work suits a coworker.",
      },
    ],
  },
  {
    slug: "build-engineering-apps-claude-code-gomer-sdk",
    title: "Build engineering apps with Claude Code + Gomer SDK, and share them safely on the Gomer platform",
    excerpt:
      "Learn how to build a real engineering app with Claude Code and the Gomer SDK, from setup and development to debugging and visualization.",
    subtitle:
      "A practical guide to building, debugging, and sharing engineering apps with Claude Code and the Gomer SDK.",
    date: "Jun 01, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Claude Code and the Gomer SDK let you go from prompt to production app without leaving your editor.",
      "The SDK handles auth, deployment, and workspace sharing so you focus on engineering logic.",
      "Apps built this way inherit Gomer's permissions, versioning, and review workflows.",
      "Visualization and debugging tools are built in — you see outputs as you iterate.",
      "Sharing safely means governance by default, not an afterthought.",
    ],
    intro: [
      "Engineering teams no longer need a separate web team to ship internal tools. With Claude Code and the Gomer SDK, you describe the calculation or workflow, iterate in code, and publish to your workspace in one flow.",
      "This post walks through setup, development, debugging, and how to share apps across your organization without exposing credentials or losing version control.",
    ],
    sections: standardSections("Claude Code + Gomer SDK apps", [
      "Use Claude Code for fast iteration on app logic and UI.",
      "Use the Gomer SDK for deployment, integrations, and workspace APIs.",
      "Publish to Gomer when the app is ready for teammates.",
    ]),
    faqs: faqs("Claude Code + Gomer SDK"),
  },
  {
    slug: "4-engineering-workflows-automate-ai-gomer",
    title: "4 Engineering workflows you can easily automate with AI in Gomer",
    excerpt:
      "Discover 4 practical ways engineers can use AI inside Gomer apps, from extracting borehole data and reading PDFs to querying IFC models.",
    subtitle:
      "Four real engineering workflows — borehole extraction, PDF parsing, IFC queries, and report generation — automated with AI in Gomer.",
    date: "May 19, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Borehole log extraction turns scanned PDFs into structured data your footing design app can consume.",
      "PDF specification parsing eliminates manual re-keying of legacy documents.",
      "IFC model queries let you ask questions about BIM data without opening a desktop viewer.",
      "Automated report generation packages calculations into client-ready deliverables.",
      "Each workflow runs from Slack with review before anything goes external.",
    ],
    intro: [
      "Engineers spend a surprising amount of time moving data between formats — PDFs to spreadsheets, borehole logs to design inputs, IFC files to quantity takeoffs. Gomer automates those bridges with AI that understands engineering context.",
      "Here are four workflows teams ship in the first week.",
    ],
    sections: [
      {
        title: "The four workflows",
        bullets: [
          "Extract borehole data from scanned logs and PDFs into structured tables.",
          "Parse legacy PDF specifications into calculable app inputs.",
          "Query IFC models for elements, quantities, and clashes in plain language.",
          "Generate formatted engineering reports from calculation outputs.",
        ],
      },
      ...standardSections("engineering workflow automation", [
        "Start with the workflow that costs the most manual hours.",
        "Connect source files and destination tools once.",
        "Run on demand or schedule from Slack.",
      ]),
    ],
    faqs: faqs("engineering workflow automation"),
  },
  {
    slug: "claude-code-to-production-engineering-teams",
    title: "From Claude Code to Production: How Engineering Teams Scale AI Automation with Gomer",
    excerpt:
      "Engineering firms are starting to combine Claude Code and Gomer to automate engineering workflows faster and at larger scale.",
    subtitle:
      "How engineering firms move from prototype automations to production-grade workflows with Claude Code and Gomer.",
    date: "May 14, 2026",
    author: "Gomer",
    keyTakeaways: [
      "Prototypes in Claude Code become production apps on Gomer with one publish step.",
      "Scaling means permissions, versioning, and audit trails — not more scripts on laptops.",
      "Teams keep engineering logic in code while Gomer handles infra and integrations.",
      "Scheduled jobs and Slack triggers replace manual 'run this script' handoffs.",
      "Production does not mean sacrificing the speed of vibe coding.",
    ],
    intro: [
      "The gap between a working prototype and something your whole firm can rely on is where most AI automation projects stall. Gomer closes that gap by giving engineering teams a path from Claude Code experiments to managed production apps.",
    ],
    sections: standardSections("Claude Code to production", [
      "Prototype locally with Claude Code.",
      "Publish to Gomer for managed deployment.",
      "Share, schedule, and govern from your workspace.",
    ]),
    faqs: faqs("production AI automation"),
  },
  {
    slug: "whats-new-gomer-may-2026",
    title: "What's new in Gomer (May 2026)",
    excerpt:
      "Gomer's May 2026 updates make it easier to build, manage, and collaborate on engineering apps. From new App Builder capabilities to smarter app management.",
    subtitle:
      "May 2026 release notes: App Builder improvements, smarter app management, and faster collaboration for engineering teams.",
    date: "May 12, 2026",
    author: "Gomer",
    keyTakeaways: [
      "App Builder now supports richer parametric UIs with less boilerplate.",
      "App management includes bulk permissions and workspace-wide search.",
      "Collaboration improvements: inline comments and version diffing.",
      "Faster cold starts for long-running engineering calculations.",
      "New integrations for common civil and structural tooling.",
    ],
    intro: [
      "May was a big month for teams building and sharing engineering apps on Gomer. Here is what shipped and how to use it.",
    ],
    sections: [
      {
        title: "App Builder",
        bullets: [
          "New parametric input components for engineering dimensions and units.",
          "Improved 3D viewer embedding for structural and geotech apps.",
          "Faster preview cycles when iterating with AI.",
        ],
      },
      {
        title: "App management",
        bullets: [
          "Bulk permission updates across app collections.",
          "Workspace search now indexes app descriptions and tags.",
          "Rollback to any published version in two clicks.",
        ],
      },
      {
        title: "Collaboration",
        paragraphs: [
          "Teammates can comment on specific app versions and compare outputs side by side — so design reviews happen in Gomer, not in email threads.",
        ],
      },
    ],
    faqs: faqs("Gomer May 2026 updates"),
  },
  {
    slug: "5-python-libraries-structural-engineering",
    title: "5 Python Libraries for Automating Structural Engineering Workflows (with AI)",
    excerpt:
      "Discover 5 Python libraries that help structural engineers automate analysis, modeling, and design workflows.",
    subtitle:
      "Five Python libraries structural engineers use inside Gomer apps — from analysis APIs to parametric modeling.",
    date: "May 11, 2026",
    author: "Luis Maldonado",
    tags: ["Civil", "Structural"],
    keyTakeaways: [
      "NumPy and SciPy remain the foundation for numerical structural calculations.",
      "Structural analysis APIs integrate with commercial solvers for code-check workflows.",
      "Parametric modeling libraries power flexible design exploration.",
      "Pandas bridges spreadsheet workflows into auditable Python pipelines.",
      "Gomer wraps these libraries in shareable apps your whole team can run.",
    ],
    intro: [
      "Python is the lingua franca of structural automation. These five libraries show up in nearly every Gomer app we see from structural teams — and AI makes wiring them together faster than ever.",
    ],
    sections: [
      {
        title: "The five libraries",
        table: {
          headers: ["Library", "Use case", "In Gomer"],
          rows: [
            ["NumPy / SciPy", "Matrix math and solvers", "Core calculation engines"],
            ["Pandas", "Tabular loads and results", "Import/export from Excel"],
            ["Analysis APIs", "FEA and code checks", "Connect to your licensed solver"],
            ["Parametric libs", "Geometry and sections", "Drive interactive app UIs"],
            ["Plotting", "Charts and diagrams", "Embed in PDF reports"],
          ],
        },
      },
      ...standardSections("structural Python automation", [
        "Pick the library that matches your solver and code standard.",
        "Wrap logic in a Gomer app for sharing and review.",
        "Schedule recurring analysis runs from Slack.",
      ]),
    ],
    faqs: faqs("structural Python libraries"),
  },
  {
    slug: "infraspace-gomer-infrastructure-planning",
    title: "How InfraSpace and Gomer improve early-stage infrastructure planning with AI",
    excerpt:
      "Combining route optimization with engineering analysis for roads, transmission lines, and heavy transport projects.",
    subtitle:
      "Route optimization meets engineering analysis — how InfraSpace and Gomer accelerate early-stage infrastructure planning.",
    date: "May 07, 2026",
    author: "Gomer",
    keyTakeaways: [
      "Early-stage planning benefits from combining GIS route data with engineering constraints.",
      "InfraSpace handles corridor optimization; Gomer runs the engineering checks.",
      "Teams compare alternatives faster without rebuilding models by hand.",
      "Outputs feed directly into client presentations and permit packages.",
      "AI coordinates the handoff between optimization and analysis tools.",
    ],
    intro: [
      "Infrastructure projects live or die in early planning. Combining InfraSpace's route optimization with Gomer's engineering analysis gives teams a single workflow from corridor selection to design validation.",
    ],
    sections: standardSections("infrastructure planning with InfraSpace", [
      "Export route alternatives from InfraSpace.",
      "Run engineering checks in Gomer against your standards.",
      "Package results for stakeholders in one report.",
    ]),
    faqs: faqs("infrastructure planning"),
  },
  {
    slug: "geotechnical-ai-agents-borehole-logs",
    title: "How to build geotechnical AI agents in Gomer for borehole logs and footing design",
    excerpt:
      "Learn how to build geotechnical AI agents to extract data from borehole logs and reports, automate footing design inputs.",
    subtitle:
      "Build geotechnical AI agents that extract borehole data and automate footing design inputs in Gomer.",
    date: "May 04, 2026",
    author: "Alejandro Duarte",
    keyTakeaways: [
      "Scanned borehole logs can be parsed into structured stratigraphy tables.",
      "Extracted data feeds directly into footing design calculations.",
      "Human review catches OCR edge cases before design runs.",
      "Agents remember project-specific soil classifications and preferences.",
      "The same agent handles updates when new logs arrive mid-project.",
    ],
    intro: [
      "Geotechnical engineers still re-type borehole data from PDFs into design spreadsheets. Gomer agents read the logs, structure the data, and hand it to your footing design app — with review at every step.",
    ],
    sections: standardSections("geotechnical borehole agents", [
      "Upload or connect borehole PDFs from your document store.",
      "Review extracted layers and SPT values in Slack.",
      "Push approved data into your footing design workflow.",
    ]),
    faqs: faqs("geotechnical AI agents"),
  },
  {
    slug: "pdf-to-app-workflow-scales",
    title: "The PDF to App Workflow that Actually Scales",
    excerpt:
      "Turn legacy PDF specifications into living, calculable applications without rewriting the underlying logic.",
    subtitle:
      "Turn legacy PDF specifications into living, calculable Gomer apps — without rewriting your engineering logic.",
    date: "Apr 29, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "PDF specs encode decades of engineering knowledge — but are not calculable.",
      "AI extraction maps tables and formulas into structured app inputs.",
      "You keep the engineering logic; Gomer handles the UI and deployment.",
      "Updates to the spec propagate through versioned apps.",
      "Teams stop maintaining parallel spreadsheet copies.",
    ],
    intro: [
      "Every engineering firm has shelves of PDF specifications that teams still re-key into Excel. The PDF-to-app workflow turns those documents into living applications your whole organization can run.",
    ],
    sections: standardSections("PDF to app", [
      "Parse the PDF into structured inputs and rules.",
      "Build the calculation layer in Python or Gomer's App Builder.",
      "Publish and version as the spec evolves.",
    ]),
    faqs: faqs("PDF to app workflows"),
  },
  {
    slug: "excel-to-web-engineering-calculations",
    title: "From Excel to Web: Modernizing engineering calculations",
    excerpt:
      "Move spreadsheet-bound calculation tools to robust, shareable, web-based apps without losing fidelity.",
    subtitle:
      "Modernize spreadsheet-bound engineering calculations into shareable web apps without losing fidelity.",
    date: "Apr 24, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Excel tools break when shared — wrong versions, broken links, no audit trail.",
      "Web apps preserve calculation logic with proper versioning and permissions.",
      "Migration does not mean rewriting from scratch; import and validate first.",
      "Client-facing outputs improve with consistent formatting and branding.",
      "Your engineers keep working in familiar units and notation.",
    ],
    intro: [
      "The spreadsheet that only one person understands is a liability. Moving to web does not mean throwing away years of validated logic — it means packaging that logic so the whole team can trust it.",
    ],
    sections: standardSections("Excel to web migration", [
      "Audit the spreadsheet for hidden dependencies and edge cases.",
      "Rebuild logic in Gomer with side-by-side validation.",
      "Retire the spreadsheet once outputs match.",
    ]),
    faqs: faqs("Excel to web migration"),
  },
  {
    slug: "why-engineering-teams-adopting-ai-coworkers",
    title: "Why Engineering Teams Are Adopting AI Coworkers",
    excerpt:
      "A practical look at how AI assistants are reshaping daily engineering work, from analysis to documentation.",
    subtitle:
      "Why engineering teams are adopting AI coworkers for analysis, documentation, and cross-tool workflows.",
    date: "Apr 18, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Engineers lose hours to documentation and data gathering — not design.",
      "AI coworkers draft reports, extract data, and chase inputs across tools.",
      "Review-first defaults make adoption safe in regulated environments.",
      "Memory across projects reduces repetitive briefing.",
      "The ROI shows up in the first month on recurring workflows.",
    ],
    intro: [
      "Engineering teams are not adopting AI for novelty. They adopt it because the work around the work — reports, data entry, status updates — consumes the time that should go to judgment and design.",
    ],
    sections: standardSections("AI coworkers for engineering", [
      "Start with one recurring report or data extraction workflow.",
      "Run in Slack so adoption does not require a new tool.",
      "Expand to cross-tool automations as trust builds.",
    ]),
    faqs: faqs("AI coworkers for engineering"),
  },
  {
    slug: "vibe-coding-gomer-tutorial",
    title: "Vibe coding in Gomer: a hands-on tutorial",
    excerpt:
      "A new way to prototype engineering tools — describe what you want, iterate with AI, and ship in hours not weeks.",
    subtitle:
      "Hands-on tutorial: describe what you want, iterate with AI, and ship an engineering tool in hours.",
    date: "Apr 12, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Vibe coding means describing outcomes, not writing boilerplate first.",
      "Gomer's App Builder turns prompts into working UIs you refine in conversation.",
      "You ship a shareable app in one session — not a slide deck of requirements.",
      "Iteration is cheap: change the prompt, see the app update.",
      "Production hardening comes after the prototype proves value.",
    ],
    intro: [
      "Vibe coding is prototyping engineering tools by describing what you want and iterating with AI until it works. This tutorial walks through building a real calculable app from a single prompt.",
    ],
    sections: standardSections("vibe coding in Gomer", [
      "Describe the inputs, calculation, and output format.",
      "Iterate on the UI and logic in the App Builder.",
      "Publish to your workspace when teammates can use it.",
    ]),
    faqs: faqs("vibe coding"),
  },
  {
    slug: "best-practices-sharing-apps-teams",
    title: "Best Practices for Sharing Apps Across Teams",
    excerpt:
      "Governance, versioning, and permissions for engineering apps that scale beyond a single team.",
    subtitle:
      "Governance, versioning, and permissions for engineering apps that scale beyond a single team.",
    date: "Apr 08, 2026",
    author: "Gomer",
    keyTakeaways: [
      "Permissions should mirror how your firm already governs calculations.",
      "Version every publish — clients and auditors will ask what changed.",
      "Tag apps by discipline, project type, and code standard.",
      "Review workflows prevent unaudited apps from reaching external stakeholders.",
      "A central app catalog beats scattered links in Slack threads.",
    ],
    intro: [
      "The first Gomer app is easy. The tenth requires governance — who can edit, who can run, what version went to the client. These practices keep shared apps trustworthy as adoption spreads.",
    ],
    sections: standardSections("sharing apps across teams", [
      "Define roles: builder, reviewer, runner.",
      "Require review before external-facing apps go live.",
      "Maintain a tagged catalog in your workspace.",
    ]),
    faqs: faqs("app sharing governance"),
  },
  {
    slug: "civil-engineers-automate-reports",
    title: "How Civil Engineers Use Gomer to Automate Reports",
    excerpt:
      "From design checks to fully formatted client deliverables in a fraction of the time.",
    subtitle:
      "From design checks to fully formatted client deliverables — how civil engineers automate reports with Gomer.",
    date: "Apr 03, 2026",
    author: "Gomer Team",
    tags: ["Civil"],
    keyTakeaways: [
      "Report automation starts with templating your firm's standard sections.",
      "Gomer pulls calculation results and inserts them into branded PDFs.",
      "Review in Slack before anything goes to the client.",
      "Recurring reports — monthly progress, inspection summaries — run on schedule.",
      "Engineers spend time on judgment, not copy-paste.",
    ],
    intro: [
      "Civil engineers produce enormous documentation load. Gomer automates the assembly — pulling numbers from calculations, formatting to your template, and routing for review.",
    ],
    sections: standardSections("civil engineering reports", [
      "Template your standard report sections once.",
      "Connect calculation apps as data sources.",
      "Schedule or trigger reports from Slack.",
    ]),
    faqs: faqs("civil report automation"),
  },
  {
    slug: "visualizing-3d-models-gomer-app",
    title: "Visualizing 3D models in your Gomer app",
    excerpt:
      "A walk-through of Gomer's 3D viewer and how to integrate it with parametric models.",
    subtitle:
      "Walk-through of Gomer's 3D viewer and integrating it with parametric engineering models.",
    date: "Mar 28, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Gomer's 3D viewer embeds directly in App Builder UIs.",
      "Parametric inputs drive geometry updates in real time.",
      "Teams use it for structural, geotech, and infrastructure visualization.",
      "Export snapshots for reports and client presentations.",
      "No separate desktop viewer required for review.",
    ],
    intro: [
      "3D visualization helps engineers and clients understand designs faster than tables alone. Gomer's built-in viewer connects to your parametric models inside shareable apps.",
    ],
    sections: standardSections("3D visualization in Gomer", [
      "Connect your geometry source or generate parametrically.",
      "Embed the viewer component in your app UI.",
      "Export views for reports and presentations.",
    ]),
    faqs: faqs("3D visualization"),
  },
  {
    slug: "engineers-guide-api-integrations-gomer",
    title: "The Engineer's Guide to API integrations in Gomer",
    excerpt:
      "Connect Gomer apps to your favorite engineering tools and external services with minimal glue code.",
    subtitle:
      "Connect Gomer apps to engineering tools and external services with minimal glue code.",
    date: "Mar 23, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Gomer manages OAuth and API keys — credentials never enter prompts.",
      "3,000+ integrations cover most engineering and business stacks.",
      "Custom APIs work through the SDK when you need something bespoke.",
      "Integrations are workspace-scoped with audit logs.",
      "Start read-only, promote to write after review.",
    ],
    intro: [
      "API integrations are how Gomer apps become part of your real workflow — pulling live data from HubSpot, pushing results to SharePoint, triggering analysis on your solver cluster.",
    ],
    sections: standardSections("API integrations", [
      "Connect integrations at the workspace level.",
      "Use read-only access first for new workflows.",
      "Promote to write actions on the trust ladder.",
    ]),
    faqs: faqs("API integrations"),
  },
  {
    slug: "deploy-first-gomer-app-production",
    title: "How to deploy your first Gomer app to production",
    excerpt:
      "A step-by-step guide from local development to a fully managed deployment with versioning and rollback.",
    subtitle:
      "Step-by-step: from local development to managed production deployment with versioning and rollback.",
    date: "Mar 18, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Production deployment is one click from the App Builder.",
      "Versioning captures every publish with rollback support.",
      "Permissions control who can run vs. edit.",
      "Monitoring shows usage and errors across your workspace.",
      "Staging environments let you validate before firm-wide rollout.",
    ],
    intro: [
      "Deploying your first Gomer app to production is simpler than traditional web hosting — no servers to manage, no CI pipeline to wire up. This guide covers the path from prototype to firm-wide rollout.",
    ],
    sections: standardSections("first production deployment", [
      "Validate outputs against your reference calculations.",
      "Publish v1 with reviewer-only access.",
      "Roll out to the broader team after sign-off.",
    ]),
    faqs: faqs("production deployment"),
  },
  {
    slug: "parametric-design-patterns-engineers",
    title: "Parametric design patterns every engineer should know",
    excerpt:
      "A practical catalog of patterns for designing flexible, reusable parametric models.",
    subtitle:
      "A practical catalog of parametric design patterns for flexible, reusable engineering models.",
    date: "Mar 12, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Separation of inputs, logic, and presentation keeps models maintainable.",
      "Constraint-driven geometry beats hard-coded dimensions.",
      "Configuration objects let one app serve multiple project types.",
      "Validation layers catch impossible inputs before calculation.",
      "Patterns reuse across disciplines — structures, geotech, MEP.",
    ],
    intro: [
      "Parametric models power the best Gomer apps. These patterns — drawn from production apps across civil, structural, and infrastructure teams — help you build models that scale.",
    ],
    sections: standardSections("parametric design patterns", [
      "Separate inputs, logic, and output formatting.",
      "Use configuration profiles for project variants.",
      "Validate inputs before running expensive calculations.",
    ]),
    faqs: faqs("parametric design"),
  },
  {
    slug: "spreadsheets-to-scalable-apps-30-days",
    title: "From spreadsheets to scalable apps in 30 days",
    excerpt:
      "A real-world case study of migrating a fleet of internal spreadsheets to managed Gomer applications.",
    subtitle:
      "Case study: migrating a fleet of internal spreadsheets to managed Gomer apps in 30 days.",
    date: "Mar 06, 2026",
    author: "Gomer",
    keyTakeaways: [
      "Week 1: inventory and prioritize spreadsheets by usage and risk.",
      "Week 2: migrate the highest-value tool with side-by-side validation.",
      "Week 3: onboard early adopters and gather feedback.",
      "Week 4: retire the spreadsheet and expand to the next tool.",
      "Executive sponsorship accelerates adoption more than perfect apps.",
    ],
    intro: [
      "One mid-size engineering firm migrated twelve business-critical spreadsheets to Gomer apps in thirty days. Here is the playbook they used — and what they would do differently.",
    ],
    sections: standardSections("spreadsheet migration case study", [
      "Inventory spreadsheets by hours saved and error risk.",
      "Migrate one high-value tool first as a proof point.",
      "Expand weekly with a fixed validation checklist.",
    ]),
    faqs: faqs("spreadsheet migration"),
  },
  {
    slug: "working-ifc-bim-data-gomer",
    title: "Working with IFC and BIM data in Gomer",
    excerpt:
      "Open, parse, and manipulate BIM models with Gomer's BIM toolkit.",
    subtitle:
      "Open, parse, and manipulate IFC and BIM models with Gomer's BIM toolkit.",
    date: "Mar 01, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "IFC files parse into queryable element trees inside Gomer apps.",
      "Quantity takeoffs and clash checks run without desktop BIM software.",
      "AI queries let you ask natural-language questions about the model.",
      "Results export to reports and downstream calculation apps.",
      "Large models stream efficiently — you do not load everything at once.",
    ],
    intro: [
      "BIM data is only useful when engineers can query it without opening a heavyweight desktop viewer. Gomer's BIM toolkit makes IFC models accessible inside shareable apps and Slack workflows.",
    ],
    sections: standardSections("IFC and BIM in Gomer", [
      "Upload or connect IFC from your project repository.",
      "Query elements, properties, and quantities in apps or Slack.",
      "Feed results into calculations and reports.",
    ]),
    faqs: faqs("IFC and BIM"),
  },
  {
    slug: "digital-twin-gomer-azure",
    title: "Building a digital twin with Gomer and Azure",
    excerpt:
      "Combine sensor data with parametric models for true real-time digital twins.",
    subtitle:
      "Combine sensor data with parametric models for real-time digital twins on Gomer and Azure.",
    date: "Feb 24, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Digital twins need live sensor feeds and engineering models in one place.",
      "Azure IoT Hub streams data Gomer apps consume in real time.",
      "Parametric models update dashboards as conditions change.",
      "Alerts route to Slack when thresholds are breached.",
      "Historical data supports forensic analysis after events.",
    ],
    intro: [
      "Digital twins bridge the gap between physical assets and engineering models. Gomer and Azure together let teams build twins that update live — without custom infrastructure teams.",
    ],
    sections: standardSections("digital twins with Azure", [
      "Connect Azure IoT Hub to your Gomer workspace.",
      "Map sensor streams to parametric model inputs.",
      "Build dashboards and alerts in App Builder.",
    ]),
    faqs: faqs("digital twins"),
  },
  {
    slug: "whats-new-gomer-february-2026",
    title: "What's new in Gomer (February 2026)",
    excerpt:
      "New views, better collaboration, and faster apps — here's a roundup of February's releases.",
    subtitle:
      "February 2026 release notes: new views, better collaboration, and faster apps.",
    date: "Feb 18, 2026",
    author: "Gomer",
    keyTakeaways: [
      "New table and chart views for engineering dashboards.",
      "Faster app load times for calculation-heavy workloads.",
      "Improved Slack threading for multi-step workflows.",
      "Workspace analytics show which apps save the most time.",
      "SDK updates for custom integration development.",
    ],
    intro: [
      "February focused on speed and visibility — faster apps, better views, and analytics that help admins see which automations deliver ROI.",
    ],
    sections: [
      {
        title: "Performance",
        bullets: [
          "40% faster cold starts for Python calculation apps.",
          "Improved caching for repeated parametric runs.",
        ],
      },
      {
        title: "Views and collaboration",
        bullets: [
          "New chart types for time-series sensor data.",
          "Threaded Slack replies keep multi-step workflows in context.",
        ],
      },
      {
        title: "Analytics",
        paragraphs: [
          "Workspace admins can now see run counts, time saved estimates, and error rates per app — useful for prioritizing the next automation project.",
        ],
      },
    ],
    faqs: faqs("Gomer February 2026 updates"),
  },
  {
    slug: "ai-assisted-code-review-engineering-apps",
    title: "AI-assisted code review for engineering apps",
    excerpt:
      "How Gomer's AI reviewer catches calculation errors before they reach production.",
    subtitle:
      "How Gomer's AI reviewer catches calculation errors before engineering apps reach production.",
    date: "Feb 12, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "AI review catches unit mismatches, edge cases, and common calculation errors.",
      "Review runs automatically on every publish request.",
      "Findings surface in Slack with suggested fixes.",
      "Human reviewers focus on engineering judgment, not syntax.",
      "Audit trail records what the AI flagged and what changed.",
    ],
    intro: [
      "Engineering apps carry real liability when calculations are wrong. Gomer's AI reviewer acts as a first pass — catching errors that are easy to miss in manual review.",
    ],
    sections: standardSections("AI code review", [
      "Enable AI review on apps before production publish.",
      "Address flagged issues in the App Builder or SDK.",
      "Require human sign-off for external-facing apps.",
    ]),
    faqs: faqs("AI code review"),
  },
  {
    slug: "best-practices-unit-testing-engineering",
    title: "Best practices for unit testing engineering logic",
    excerpt:
      "Confidence in your numbers starts with disciplined test coverage. Here's how.",
    subtitle:
      "Confidence in your numbers starts with disciplined unit test coverage for engineering logic.",
    date: "Feb 06, 2026",
    author: "Gomer Team",
    keyTakeaways: [
      "Golden-file tests compare outputs against validated reference cases.",
      "Boundary tests catch edge cases at min/max inputs.",
      "Regression tests run on every publish automatically.",
      "Test data should come from real projects, anonymized.",
      "Gomer's SDK integrates with standard Python test runners.",
    ],
    intro: [
      "Unit tests are how engineering teams sleep at night. These practices — used by firms running production Gomer apps — keep calculation logic trustworthy as apps evolve.",
    ],
    sections: standardSections("unit testing engineering logic", [
      "Build a reference case library from validated projects.",
      "Automate tests on every publish via the SDK.",
      "Block production deploys when tests fail.",
    ]),
    faqs: faqs("unit testing"),
  },
  {
    slug: "future-engineering-automation-collaborative",
    title: "The future of engineering automation is collaborative",
    excerpt:
      "Why the best automations come from engineers + AI, not AI alone.",
    subtitle:
      "Why the best engineering automations come from engineers and AI working together — not AI alone.",
    date: "Feb 01, 2026",
    author: "Gomer",
    keyTakeaways: [
      "AI accelerates drafting; engineers provide judgment and accountability.",
      "Collaborative automation means review-first, not fully autonomous.",
      "The best workflows encode engineer expertise into reusable apps.",
      "Teams that pair domain experts with AI ship faster than either alone.",
      "The goal is more engineering capacity — not fewer engineers.",
    ],
    intro: [
      "The narrative that AI replaces engineers misses the point. The firms winning with automation are pairing engineer expertise with AI execution — and building workflows that get better every time a human reviews an output.",
    ],
    sections: standardSections("collaborative engineering automation", [
      "Engineers define standards and review outputs.",
      "AI handles gathering, drafting, and formatting.",
      "Trust builds through repeated successful reviews.",
    ]),
    faqs: faqs("collaborative automation"),
  },
];

export const blogPostsBySlug = Object.fromEntries(blogPosts.map((p) => [p.slug, p]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPostsBySlug[slug];
}

export const blogPostMetas: BlogPostMeta[] = blogPosts.map(
  ({ slug, title, excerpt, date, author, tags }) => ({ slug, title, excerpt, date, author, tags }),
);
