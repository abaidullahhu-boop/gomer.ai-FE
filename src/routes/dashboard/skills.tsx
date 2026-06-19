import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "@/components/dashboard/Dropdown";
import { PageMeta } from "@/components/PageMeta";
import { SkillBundleCard } from "@/components/dashboard/SkillBundleCard";
import { SkillCard } from "@/components/dashboard/SkillCard";
import { Toast } from "@/components/dashboard/Toast";
import { skillBundles } from "@/data/skills";
import {
  fetchSkills,
  installSkill as installSkillApi,
  uninstallSkill as uninstallSkillApi,
  type Skill,
  type SkillCategory,
} from "@/lib/api";

type Tab = "library" | "installed";

export default function DashboardSkills() {
  const location = useLocation();
  const tab: Tab = location.pathname.includes("/installed") ? "installed" : "library";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchSkills()
      .then((result) => {
        if (active) setSkills(result);
      })
      .catch(() => {
        if (active) setError("Failed to load skills. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Categories the catalogue actually uses, plus an "all" option, for the filter.
  const categories = useMemo<SkillCategory[]>(() => {
    const seen = new Map<string, string>();
    for (const skill of skills) seen.set(skill.category.slug, skill.category.label);
    const derived = Array.from(seen, ([slug, label]) => ({ slug, label })).sort((a, b) =>
      a.label.localeCompare(b.label),
    );
    return [{ slug: "all", label: "All categories" }, ...derived];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    const query = search.trim().toLowerCase();

    return skills.filter((skill) => {
      if (tab === "installed" && !skill.installed) return false;
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
  }, [category, search, skills, tab]);

  const installedCount = useMemo(
    () => skills.filter((skill) => skill.installed).length,
    [skills],
  );

  const setInstalled = useCallback((id: string, installed: boolean) => {
    setSkills((current) =>
      current.map((skill) => (skill.id === id ? { ...skill, installed } : skill)),
    );
  }, []);

  const handleInstall = useCallback(
    async (skill: Skill) => {
      setBusyId(skill.id);
      try {
        const updated = await installSkillApi(skill.id);
        setInstalled(skill.id, updated.installed);
        setToast(`Installed "${skill.title}"`);
      } catch {
        setToast(`Could not install "${skill.title}"`);
      } finally {
        setBusyId(null);
      }
    },
    [setInstalled],
  );

  const handleUninstall = useCallback(
    async (skill: Skill) => {
      setBusyId(skill.id);
      try {
        const updated = await uninstallSkillApi(skill.id);
        setInstalled(skill.id, updated.installed);
        setToast(`Uninstalled "${skill.title}"`);
      } catch {
        setToast(`Could not uninstall "${skill.title}"`);
      } finally {
        setBusyId(null);
      }
    },
    [setInstalled],
  );

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
                        placeholder="Search skills by name, description, category, tag, or author"
                        className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="shrink-0 sm:w-[190px]">
                  <Dropdown
                    aria-label="Category"
                    value={category}
                    options={categories.map((item) => ({
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
                      {tab === "installed" ? "Installed skills" : "All skills"}
                    </h2>
                  </div>
                  {!loading && !error ? (
                    <p className="text-xs text-muted-foreground">
                      {tab === "installed"
                        ? `${installedCount} skills`
                        : `${skills.length} skills`}
                    </p>
                  ) : null}
                </div>

                {loading ? (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-12 text-muted-foreground">
                    <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
                  </div>
                ) : error ? (
                  <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                ) : filteredSkills.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                      {tab === "installed"
                        ? "You haven't installed any skills yet."
                        : "No skills match your search."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {filteredSkills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        busy={busyId === skill.id}
                        onInstall={handleInstall}
                        onUninstall={handleUninstall}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </>
  );
}
