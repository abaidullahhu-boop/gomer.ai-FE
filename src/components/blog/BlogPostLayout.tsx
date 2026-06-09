import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import type { BlogPost } from "@/data/blog-posts";

function buildCopyForAIText(post: BlogPost): string {
  const lines: string[] = [
    `# ${post.title}`,
    "",
    post.subtitle,
    "",
    `Published: ${post.date}${post.author ? ` · ${post.author}` : ""}`,
    "",
    "## Key Takeaways",
    ...post.keyTakeaways.map((item) => `- ${item}`),
    "",
    ...post.intro,
    "",
  ];

  for (const section of post.sections) {
    lines.push(`## ${section.title}`, "");
    if (section.paragraphs) lines.push(...section.paragraphs, "");
    if (section.bullets) lines.push(...section.bullets.map((b) => `- ${b}`), "");
    if (section.subsections) {
      for (const sub of section.subsections) {
        lines.push(`### ${sub.title}`, "", ...sub.paragraphs, "");
      }
    }
  }

  lines.push("## Frequently Asked Questions", "");
  for (const faq of post.faqs) {
    lines.push(`### ${faq.q}`, "", faq.a, "");
  }

  return lines.join("\n").trim();
}

function CopyForAIButton({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(buildCopyForAIText(post));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/90 transition"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copied!" : "Copy for AI"}
    </button>
  );
}

export function BlogPostLayout({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title={`${post.title} — Viktor`}
        description={post.excerpt}
        ogTitle={post.title}
        ogDescription={post.excerpt}
      />

      <section className="relative bg-hero pt-6 pb-20 md:pb-28 overflow-hidden rounded-b-[40px]">
        <Nav />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 md:pt-32">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-full border border-white/60 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Back to Blog
              </Link>
              <CopyForAIButton post={post} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  {post.date}
                </span>
                {post.author && (
                  <span className="text-sm text-white/80">· {post.author}</span>
                )}
              </div>
              <h1 className="mt-8 font-display text-white text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
                {post.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <ArticleSection title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-3 text-foreground/90 font-medium leading-relaxed">
            {post.keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ArticleSection>

        {post.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-5 first:mt-10 text-foreground/90 font-medium leading-relaxed">
            {paragraph}
          </p>
        ))}

        {post.sections.map((section, index) => (
          <ArticleSection key={section.title} title={section.title} className={index === 0 ? "mt-14" : "mt-14"}>
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 first:mt-0 text-foreground/90 leading-relaxed">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 list-disc pl-5 space-y-2 text-foreground/90 leading-relaxed">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {section.subsections?.map((sub) => (
              <div key={sub.title}>
                <h3 className="mt-8 font-display text-xl text-foreground">{sub.title}</h3>
                {sub.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-3 text-foreground/90 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
            {section.table && (
              <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[32rem] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/60">
                      {section.table.headers.map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-border last:border-b-0">
                        {row.map((cell, i) => (
                          <td
                            key={`${row[0]}-${i}`}
                            className={`px-4 py-3 align-top ${i === 0 ? "font-medium text-foreground" : "text-foreground/80"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {section.codeBlock && (
              <div className="mt-6 rounded-2xl bg-[#1a182b] p-5 md:p-6 overflow-x-auto">
                <pre className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap font-mono">
                  {section.codeBlock}
                </pre>
              </div>
            )}
          </ArticleSection>
        ))}

        <ArticleSection title="Frequently Asked Questions" className="mt-14">
          <div className="space-y-8">
            {post.faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-display text-lg text-foreground">{faq.q}</h3>
                <p className="mt-2 text-foreground/90 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </ArticleSection>

        
      </main>

      <Footer />
    </div>
  );
}

function ArticleSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="font-display text-2xl md:text-3xl text-foreground tracking-tight">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
