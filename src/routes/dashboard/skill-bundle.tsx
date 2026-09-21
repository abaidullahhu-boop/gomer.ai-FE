import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, BadgeCheck, Check, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { AuthorAvatar } from "@/components/dashboard/SkillBundleCard";
import { SkillCard } from "@/components/dashboard/SkillCard";
import { Toast } from "@/components/dashboard/Toast";
import { findSkillBundle } from "@/data/skills";
import {
  fetchSkills,
  installSkill as installSkillApi,
  uninstallSkill as uninstallSkillApi,
  type Skill,
} from "@/lib/api";

/**
 * A bundle's detail page: what it contains, and a way to install all of it.
 * The bundle cards on the Skills library link here. The backend has no bundle
 * model, so membership is "every catalogue skill in the bundle's category".
 */
export default function DashboardSkillBundle() {
  const { slug = "" } = useParams();
  const bundle = findSkillBundle(slug);
  const navigate = useNavigate();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [installingAll, setInstallingAll] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Unknown bundle slug: back to the library rather than a dead page.
  useEffect(() => {
    if (!bundle) navigate("/dashboard/skills", { replace: true });
  }, [bundle, navigate]);

  useEffect(() => {
    if (!bundle) return;
    let active = true;
    setLoading(true);
    setError(null);
    fetchSkills()
      .then((result) => {
        if (active) setSkills(result);
      })
      .catch(() => {
        if (active) setError("Failed to load this bundle's skills. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [bundle]);

  const bundleSkills = useMemo(
    () => (bundle ? skills.filter((skill) => skill.category.slug === bundle.categorySlug) : []),
    [bundle, skills],
  );

  const installedCount = useMemo(
    () => bundleSkills.filter((skill) => skill.installed).length,
    [bundleSkills],
  );
  const allInstalled = bundleSkills.length > 0 && installedCount === bundleSkills.length;

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

  // Installs whatever is not installed yet. Each skill is its own request, so a
  // partial failure leaves the rest installed and the toast says how many made it.
  const handleInstallBundle = useCallback(async () => {
    if (!bundle) return;
    const pending = bundleSkills.filter((skill) => !skill.installed);
    if (pending.length === 0) return;
    setInstallingAll(true);
    const results = await Promise.allSettled(
      pending.map(async (skill) => {
        const updated = await installSkillApi(skill.id);
        setInstalled(skill.id, updated.installed);
      }),
    );
    setInstallingAll(false);
    const failed = results.filter((result) => result.status === "rejected").length;
    setToast(
      failed === 0
        ? `Installed "${bundle.title}"`
        : `Installed ${pending.length - failed} of ${pending.length} skills — try again for the rest`,
    );
  }, [bundle, bundleSkills, setInstalled]);

  if (!bundle) return null;

  const skillCount = loading || error ? bundle.skillCount : bundleSkills.length;

  return (
    <>
      <PageMeta title={`${bundle.title} — Skills — Gaspo`} description={bundle.description} />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
              <Link to="/dashboard/skills" className="hover:text-foreground">
                Skills
              </Link>
              <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden />
              <span className="text-foreground">{bundle.title}</span>
            </nav>

            <div className="flex flex-col gap-6">
              <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative h-40 w-full overflow-hidden bg-muted sm:h-56">
                  <img alt="" className="size-full object-cover" src={bundle.image} />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex h-5 items-center justify-center gap-1 rounded border border-border bg-card/90 px-1.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                      Bundle
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-5 p-5 sm:p-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold leading-8 text-foreground">
                        {bundle.title}
                      </h1>
                      {bundle.verified ? (
                        <BadgeCheck
                          className="size-5 shrink-0 text-muted-foreground"
                          aria-label="Verified"
                        />
                      ) : null}
                    </div>
                    <p className="text-base leading-6 text-secondary-foreground">
                      {bundle.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <AuthorAvatar name={bundle.author} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-5 text-foreground">
                          {bundle.author}
                        </span>
                        <span className="text-xs leading-4 text-muted-foreground">
                          {bundle.authorTitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {skillCount} skills included
                        {!loading && !error && installedCount > 0
                          ? ` · ${installedCount} installed`
                          : ""}
                      </span>
                      {allInstalled ? (
                        <span className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground">
                          <Check className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                          Bundle installed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => void handleInstallBundle()}
                          disabled={
                            loading || !!error || installingAll || bundleSkills.length === 0
                          }
                          className="gaspo-focus-ring inline-flex min-h-9 cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-btn-primary px-3 py-2 text-sm font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {installingAll ? (
                            <Loader2 className="size-4 shrink-0 animate-spin" strokeWidth={1.5} />
                          ) : (
                            <ArrowDownToLine className="size-4 shrink-0" strokeWidth={1.5} />
                          )}
                          {installedCount > 0 ? "Install the rest" : "Install bundle"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-end justify-between gap-3">
                  <h2 className="text-lg font-semibold">Skills in this bundle</h2>
                  {!loading && !error ? (
                    <p className="text-xs text-muted-foreground">{bundleSkills.length} skills</p>
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
                ) : bundleSkills.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                      This bundle&apos;s skills aren&apos;t in the catalogue yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {bundleSkills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        busy={installingAll || busyId === skill.id}
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
