import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "@/components/dashboard/Dropdown";
import { PageMeta } from "@/components/PageMeta";
import { SkillBundleCard } from "@/components/dashboard/SkillBundleCard";
import { SkillCard } from "@/components/dashboard/SkillCard";
import { skillBundles, skillCategories, skills } from "@/data/skills";

type Tab = "library" | "installed";
type InstalledSubTab = "shared" | "library";

export default function DashboardSkills() {
  const location = useLocation();
  const tab: Tab = location.pathname.includes("/installed") ? "installed" : "library";
  const installedSubTab: InstalledSubTab = location.pathname.endsWith("/library")
    ? "library"
    : "shared";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredSkills = useMemo(() => {
    const query = search.trim().toLowerCase();

    return skills.filter((skill) => {
      if (tab === "installed") {
        if (!skill.installed) return false;
        const source = skill.installSource ?? "shared";
        if (installedSubTab === "shared" && source !== "shared") return false;
        if (installedSubTab === "library" && source !== "library") return false;
      }
      if (category !== "all" && skill.category.slug !== category) return false;
      if (!query) return true;

      const haystack = [
        skill.title,
        skill.description,
        skill.category.label,
        skill.author,
        ...skill.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [category, installedSubTab, search, tab]);

  const installedCount = useMemo(() => {
    return skills.filter((skill) => {
      if (!skill.installed) return false;
      const source = skill.installSource ?? "shared";
      return installedSubTab === "shared" ? source === "shared" : source === "library";
    }).length;
  }, [installedSubTab]);

  return (
    <>
      <PageMeta
        title="Skills — Gomer"
        description="Browse and install pre-built skills that extend Gomer's functionality."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Skills</h1>
                <nav className="flex items-center gap-0.5">
                  <Link
                    to="/dashboard/skills"
                    className={[
                      "rounded-[7px] px-4 py-2 text-sm font-medium transition-colors",
                      tab === "library"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    Library
                  </Link>
                  <Link
                    to="/dashboard/skills/installed"
                    className={[
                      "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                      tab === "installed"
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    Installed
                  </Link>
                </nav>
              </div>

              <p className="text-base leading-6 text-muted-foreground">
                Skills are pre-built capabilities that extend Gomer&apos;s functionality. Install them
                to give Gomer access to specialized knowledge and workflows.
              </p>

              {tab === "installed" ? (
                <nav className="flex items-center gap-0.5">
                  <Link
                    to="/dashboard/skills/installed"
                    className={[
                      "rounded-[7px] px-4 py-2 text-sm font-medium transition-colors",
                      installedSubTab === "shared"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    Shared Skills
                  </Link>
                  <Link
                    to="/dashboard/skills/installed/library"
                    className={[
                      "rounded-[7px] px-4 py-2 text-sm font-medium transition-colors",
                      installedSubTab === "library"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    Library Skills
                  </Link>
                </nav>
              ) : null}

              <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex w-full flex-col gap-1.5">
                    <div className="flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm leading-5 transition-colors outline-none hover:border-border/80 focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2">
                      <div className="flex shrink-0 items-center text-muted-foreground">
                        <Search className="size-4" strokeWidth={1.5} aria-hidden />
                      </div>
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search skills by name, description, category, tag, author, or source"
                        className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="shrink-0 sm:w-[190px]">
                  <Dropdown
                    aria-label="Category"
                    value={category}
                    options={skillCategories.map((item) => ({
                      value: item.slug,
                      label: item.label,
                    }))}
                    onChange={setCategory}
                    className="relative w-full"
                  />
                </div>
              </div>

              {tab === "library" ? (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-md">Skill bundles</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                    {skillBundles.map((bundle) => (
                      <SkillBundleCard key={bundle.slug} bundle={bundle} />
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="space-y-3">
                <div className="flex items-end justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">
                      {tab === "installed"
                        ? installedSubTab === "shared"
                          ? "Shared skills"
                          : "Library skills"
                        : "All skills"}
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tab === "installed" ? `${installedCount} skills` : `${skills.length} skills`}
                  </p>
                </div>

                {filteredSkills.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                      {tab === "installed"
                        ? installedSubTab === "shared"
                          ? "No shared skills match your filters."
                          : "No library skills match your filters."
                        : "No skills match your search."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {filteredSkills.map((skill) => (
                      <SkillCard key={skill.slug} skill={skill} />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
