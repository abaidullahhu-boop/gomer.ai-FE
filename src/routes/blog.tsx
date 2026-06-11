import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { blogPostMetas } from "@/data/blog-posts";

const featured = blogPostMetas[0];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-primitive-main-beige">
      <PageMeta
        title="Blog — Viktor"
        description="News, technical solutions, and background articles from the Viktor team."
        ogTitle="Blog — Viktor"
        ogDescription="News, technical solutions, and background articles from the Viktor team."
      />
      <div className="pt-6">
        <Nav heroTone="light" />
      </div>

      <main className="mx-auto max-w-6xl px-2 sm:px-12 pt-44 pb-24">
        <header className="text-left px-2 sm:px-24 mx-auto">
          <h1 className="font-display text-6xl md:text-7xl tracking-tight leading-[1]">Blog</h1>
          <p className="mt-6 text-primary font-medium text-lg">
            Insights, guides, and comparisons from the Viktor team.
          </p>
        </header>

        <Link
          to={`/blog/${featured.slug}`}
          className="block mt-28 rounded-[30px] overflow-hidden bg-hero py-12 px-12 md:p-14 text-white shadow-xl dark flex min-h-[22rem] flex-col justify-end gap-3 overflow-hidden p-8 text-contrast gradient-dark-2 transition-transform duration-300 hover:-translate-y-1 sm:min-h-[24rem] sm:p-12 lg:min-h-[29rem] lg:px-20 lg:py-16"
        >
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] max-w-2xl">
            {featured.title}
          </h2>
          <p className="mt-4 text-white max-w-xl text-lg leading-relaxed">{featured.excerpt}</p>
          <div className="mt-3 text-md text-white/70">
            {featured.date} · by {featured.author}
          </div>
        </Link>

        <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPostMetas.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="rounded-4xl bg-card p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <h3 className="font-medium text-xl leading-snug tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-secondary font-medium leading-relaxed line-clamp-3">
                {p.excerpt}
              </p>
              <div className="mt-5 pt-4 text-sm text-secondary">
                {p.date}
                {p.author && <> · by {p.author}</>}
              </div>
            </Link>
          ))}
        </section>

       
      </main>

      <Footer />
    </div>
  );
}
