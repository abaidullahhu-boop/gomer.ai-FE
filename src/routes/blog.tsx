import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Viktor" },
      { name: "description", content: "News, technical solutions, and background articles from the Viktor team." },
      { property: "og:title", content: "Blog — Viktor" },
      { property: "og:description", content: "News, technical solutions, and background articles from the Viktor team." },
    ],
  }),
  component: BlogPage,
});

type Post = {
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  tags?: string[];
};

const featured = {
  title: "AI Is for Everyone, or It Is for Nobody.",
  excerpt:
    "Why access to AI shouldn't be a privilege for a few — and what that means for the future of engineering teams.",
  date: "June 03, 2026",
  author: "Viktor Team",
};

const posts: Post[] = [
  { title: "Build engineering apps with Claude Code + Viktor SDK, and share them safely on the Viktor platform", excerpt: "Learn how to build a real engineering app with Claude Code and the Viktor SDK, from setup and development to debugging and visualization.", date: "Jun 01, 2026", author: "Viktor Team" },
  { title: "4 Engineering workflows you can easily automate with AI in Viktor", excerpt: "Discover 4 practical ways engineers can use AI inside Viktor apps, from extracting borehole data and reading PDFs to querying IFC models.", date: "May 19, 2026", author: "Viktor Team" },
  { title: "From Claude Code to Production: How Engineering Teams Scale AI Automation with Viktor", excerpt: "Engineering firms are starting to combine Claude Code and Viktor to automate engineering workflows faster and at larger scale.", date: "May 14, 2026", author: "Viktor" },
  { title: "What's new in Viktor (May 2026)", excerpt: "Viktor's May 2026 updates make it easier to build, manage, and collaborate on engineering apps. From new App Builder capabilities to smarter app management.", date: "May 12, 2026", author: "Viktor" },
  { title: "5 Python Libraries for Automating Structural Engineering Workflows (with AI)", excerpt: "Discover 5 Python libraries that help structural engineers automate analysis, modeling, and design workflows.", date: "May 11, 2026", author: "Luis Maldonado", tags: ["Civil", "Structural"] },
  { title: "How InfraSpace and Viktor improve early-stage infrastructure planning with AI", excerpt: "Combining route optimization with engineering analysis for roads, transmission lines, and heavy transport projects.", date: "May 07, 2026", author: "Viktor" },
  { title: "How to build geotechnical AI agents in Viktor for borehole logs and footing design", excerpt: "Learn how to build geotechnical AI agents to extract data from borehole logs and reports, automate footing design inputs.", date: "May 04, 2026", author: "Alejandro Duarte" },
  { title: "The PDF to App Workflow that Actually Scales", excerpt: "Turn legacy PDF specifications into living, calculable applications without rewriting the underlying logic.", date: "Apr 29, 2026", author: "Viktor Team" },
  { title: "From Excel to Web: Modernizing engineering calculations", excerpt: "Move spreadsheet-bound calculation tools to robust, shareable, web-based apps without losing fidelity.", date: "Apr 24, 2026", author: "Viktor Team" },
  { title: "Why Engineering Teams Are Adopting AI Coworkers", excerpt: "A practical look at how AI assistants are reshaping daily engineering work, from analysis to documentation.", date: "Apr 18, 2026", author: "Viktor Team" },
  { title: "Vibe coding in Viktor: a hands-on tutorial", excerpt: "A new way to prototype engineering tools — describe what you want, iterate with AI, and ship in hours not weeks.", date: "Apr 12, 2026", author: "Viktor Team" },
  { title: "Best Practices for Sharing Apps Across Teams", excerpt: "Governance, versioning, and permissions for engineering apps that scale beyond a single team.", date: "Apr 08, 2026", author: "Viktor" },
  { title: "How Civil Engineers Use Viktor to Automate Reports", excerpt: "From design checks to fully formatted client deliverables in a fraction of the time.", date: "Apr 03, 2026", author: "Viktor Team", tags: ["Civil"] },
  { title: "Visualizing 3D models in your Viktor app", excerpt: "A walk-through of Viktor's 3D viewer and how to integrate it with parametric models.", date: "Mar 28, 2026", author: "Viktor Team" },
  { title: "The Engineer's Guide to API integrations in Viktor", excerpt: "Connect Viktor apps to your favorite engineering tools and external services with minimal glue code.", date: "Mar 23, 2026", author: "Viktor Team" },
  { title: "How to deploy your first Viktor app to production", excerpt: "A step-by-step guide from local development to a fully managed deployment with versioning and rollback.", date: "Mar 18, 2026", author: "Viktor Team" },
  { title: "Parametric design patterns every engineer should know", excerpt: "A practical catalog of patterns for designing flexible, reusable parametric models.", date: "Mar 12, 2026", author: "Viktor Team" },
  { title: "From spreadsheets to scalable apps in 30 days", excerpt: "A real-world case study of migrating a fleet of internal spreadsheets to managed Viktor applications.", date: "Mar 06, 2026", author: "Viktor" },
  { title: "Working with IFC and BIM data in Viktor", excerpt: "Open, parse, and manipulate BIM models with Viktor's BIM toolkit.", date: "Mar 01, 2026", author: "Viktor Team" },
  { title: "Building a digital twin with Viktor and Azure", excerpt: "Combine sensor data with parametric models for true real-time digital twins.", date: "Feb 24, 2026", author: "Viktor Team" },
  { title: "What's new in Viktor (February 2026)", excerpt: "New views, better collaboration, and faster apps — here's a roundup of February's releases.", date: "Feb 18, 2026", author: "Viktor" },
  { title: "AI-assisted code review for engineering apps", excerpt: "How Viktor's AI reviewer catches calculation errors before they reach production.", date: "Feb 12, 2026", author: "Viktor Team" },
  { title: "Best practices for unit testing engineering logic", excerpt: "Confidence in your numbers starts with disciplined test coverage. Here's how.", date: "Feb 06, 2026", author: "Viktor Team" },
  { title: "The future of engineering automation is collaborative", excerpt: "Why the best automations come from engineers + AI, not AI alone.", date: "Feb 01, 2026", author: "Viktor" },
];

function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-6">
        <Nav />
      </div>

      <main className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="font-display text-6xl md:text-7xl tracking-tight leading-[1]">Blog</h1>
          <p className="mt-4 text-muted-foreground text-base">
            Insights, product news, and how teams use Viktor to ship engineering work faster.
          </p>
        </header>

        {/* Featured */}
        <a
          href="#"
          className="block mt-12 rounded-3xl overflow-hidden bg-hero p-10 md:p-14 text-white shadow-xl"
        >
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] max-w-2xl">
            {featured.title}
          </h2>
          <p className="mt-5 text-white/80 max-w-xl text-sm leading-relaxed">
            {featured.excerpt}
          </p>
          <div className="mt-6 text-xs text-white/70">
            {featured.date} · by {featured.author}
          </div>
        </a>

        {/* Grid */}
        <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl bg-card border border-border p-6 flex flex-col hover:shadow-md transition"
            >
              {p.tags && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="font-display text-lg leading-snug tracking-tight group-hover:text-violet-700 transition">
                <a href="#">{p.title}</a>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {p.excerpt}
              </p>
              <div className="mt-5 pt-4 border-t border-border text-[11px] text-muted-foreground">
                {p.date}
                {p.author && <> · by {p.author}</>}
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <nav className="mt-14 flex items-center justify-center gap-2 text-sm">
          <button className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground">
            Prev
          </button>
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={`w-9 h-9 rounded-full font-semibold ${
                n === 1
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {n}
            </button>
          ))}
          <span className="px-1 text-muted-foreground">…</span>
          <button className="w-9 h-9 rounded-full text-muted-foreground hover:bg-secondary font-semibold">
            39
          </button>
          <button className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground">
            Next
          </button>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
