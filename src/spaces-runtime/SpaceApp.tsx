import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import {
  clearSpaceToken,
  createRecord,
  deleteRecord,
  fetchPublicSpace,
  getSpaceToken,
  listRecords,
  requestMagicLink,
  storeSpaceToken,
  verifyMagicLink,
} from "./client";
import type { EntitySpec, FieldSpec, PublicSpace, SpaceRecord, ViewSpec } from "./types";

export default function SpaceApp() {
  const { slug = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [space, setSpace] = useState<PublicSpace | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(() => Boolean(getSpaceToken(slug)));
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchPublicSpace(slug)
      .then(setSpace)
      .catch((err: Error) => setError(err.message));
  }, [slug]);

  // Redeem a magic-link token if the URL carries one, then strip it.
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;
    setVerifying(true);
    verifyMagicLink(slug, token)
      .then((session) => {
        storeSpaceToken(slug, session.token);
        setAuthed(true);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => {
        setVerifying(false);
        searchParams.delete("token");
        setSearchParams(searchParams, { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  function signOut() {
    clearSpaceToken(slug);
    setAuthed(false);
  }

  if (error) {
    return <Centered>{error}</Centered>;
  }
  if (!space || verifying) {
    return <Centered>Loading…</Centered>;
  }
  if (!authed) {
    return <SpaceLogin space={space} />;
  }
  return <SpaceShell space={space} onSignOut={signOut} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 font-sans text-sm text-muted-foreground">
      {children}
    </div>
  );
}

// ---- Login -----------------------------------------------------------------

function SpaceLogin({ space }: { space: PublicSpace }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [devLink, setDevLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const result = await requestMagicLink(space.slug, email);
      setDevLink(result.devLink ?? null);
      setStatus("sent");
    } catch (err) {
      setError((err as Error).message);
      setStatus("idle");
    }
  }

  return (
    <>
      <PageMeta title={space.name} />
      <div className="flex min-h-screen items-center justify-center bg-background p-6 font-sans">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
          <h1 className="text-xl font-bold text-foreground">{space.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue.</p>

          {status === "sent" ? (
            <div className="mt-6 space-y-3 text-sm">
              <p className="text-foreground">Check your email for a sign-in link.</p>
              {devLink && (
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Dev mode link:</p>
                  <a className="break-all text-xs text-primary underline" href={devLink}>
                    {devLink}
                  </a>
                </div>
              )}
              <button
                type="button"
                className="text-xs text-muted-foreground underline"
                onClick={() => setStatus("idle")}
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Email me a sign-in link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

// ---- App shell -------------------------------------------------------------

function SpaceShell({ space, onSignOut }: { space: PublicSpace; onSignOut: () => void }) {
  const [activeView, setActiveView] = useState(0);
  // Bumped whenever data changes so every view refetches.
  const [dataVersion, setDataVersion] = useState(0);
  const view = space.spec.views[activeView];

  return (
    <>
      <PageMeta title={space.name} />
      <div className="flex min-h-screen bg-background font-sans text-foreground">
        <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-card p-4">
          <div className="mb-4 truncate text-base font-bold">{space.name}</div>
          <nav className="flex flex-col gap-1">
            {space.spec.views.map((v, i) => (
              <button
                key={`${v.type}-${i}`}
                type="button"
                onClick={() => setActiveView(i)}
                className={`rounded-lg px-3 py-2 text-left text-sm ${
                  i === activeView
                    ? "bg-primary/10 font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {v.title}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={onSignOut}
            className="mt-auto rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
          >
            Sign out
          </button>
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto p-8">
          <div className="mx-auto w-full max-w-3xl">
            {view && (
              <ViewRenderer
                slug={space.slug}
                spec={space.spec}
                view={view}
                dataVersion={dataVersion}
                onChanged={() => setDataVersion((v) => v + 1)}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

// ---- Views -----------------------------------------------------------------

interface ViewProps {
  slug: string;
  spec: PublicSpace["spec"];
  view: ViewSpec;
  dataVersion: number;
  onChanged: () => void;
}

function ViewRenderer(props: ViewProps) {
  if (props.view.type === "form") return <FormView {...props} view={props.view} />;
  if (props.view.type === "table") return <TableView {...props} view={props.view} />;
  return <DashboardView {...props} view={props.view} />;
}

function entityOf(spec: PublicSpace["spec"], name: string): EntitySpec | undefined {
  return spec.entities.find((e) => e.name === name);
}

/** Records for an entity, refetched whenever `version` changes. */
function useRecords(slug: string, entity: string | undefined, version: number) {
  const [records, setRecords] = useState<SpaceRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!entity) return;
    listRecords(slug, entity)
      .then(setRecords)
      .catch((err: Error) => setError(err.message));
  }, [slug, entity, version]);
  return { records, error };
}

function displayLabel(entity: EntitySpec | undefined, record: SpaceRecord): string {
  const labelField = entity?.fields.find((f) => f.type === "string" || f.type === "text");
  const value = labelField ? record.data[labelField.name] : undefined;
  return value != null && value !== "" ? String(value) : record.id.slice(0, 8);
}

function FormView({
  slug,
  spec,
  view,
  onChanged,
}: ViewProps & { view: { entity: string; title: string; fields?: string[] } }) {
  const entity = entityOf(spec, view.entity);
  const fields = useMemo(() => {
    if (!entity) return [];
    return view.fields?.length
      ? (view.fields
          .map((n) => entity.fields.find((f) => f.name === n))
          .filter(Boolean) as FieldSpec[])
      : entity.fields;
  }, [entity, view.fields]);

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  if (!entity) return <p className="text-sm text-destructive">Unknown entity “{view.entity}”.</p>;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      await createRecord(slug, view.entity, values);
      setValues({});
      setSaved(true);
      onChanged();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">{view.title}</h2>
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-6">
        {fields.map((field) => (
          <FieldControl
            key={field.name}
            slug={slug}
            spec={spec}
            field={field}
            value={values[field.name]}
            onChange={(v) => setValues((current) => ({ ...current, [field.name]: v }))}
          />
        ))}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {saved && <p className="text-sm text-green-600">Saved.</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}

function TableView({
  slug,
  spec,
  view,
  dataVersion,
  onChanged,
}: ViewProps & { view: { entity: string; title: string; columns?: string[] } }) {
  const entity = entityOf(spec, view.entity);
  const { records, error } = useRecords(slug, view.entity, dataVersion);
  const columns = useMemo(() => {
    if (!entity) return [];
    return view.columns?.length
      ? (view.columns
          .map((n) => entity.fields.find((f) => f.name === n))
          .filter(Boolean) as FieldSpec[])
      : entity.fields;
  }, [entity, view.columns]);

  if (!entity) return <p className="text-sm text-destructive">Unknown entity “{view.entity}”.</p>;

  async function remove(id: string) {
    await deleteRecord(slug, view.entity, id);
    onChanged();
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">{view.title}</h2>
      {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-muted-foreground">
            <tr>
              {columns.map((c) => (
                <th key={c.name} className="px-4 py-2 font-medium">
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No records yet.
                </td>
              </tr>
            )}
            {records.map((record) => (
              <tr key={record.id} className="border-b border-border/60 last:border-0">
                {columns.map((c) => (
                  <td key={c.name} className="px-4 py-2 text-foreground">
                    {formatCell(c, record.data[c.name])}
                  </td>
                ))}
                <td className="px-4 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => remove(record.id)}
                    className="text-xs text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DashboardView({
  slug,
  spec,
  view,
  dataVersion,
}: ViewProps & {
  view: {
    title: string;
    widgets: { kind: string; label: string; entity: string; field?: string }[];
  };
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">{view.title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {view.widgets.map((widget, i) => (
          <Widget key={i} slug={slug} spec={spec} widget={widget} dataVersion={dataVersion} />
        ))}
      </div>
    </div>
  );
}

function Widget({
  slug,
  spec,
  widget,
  dataVersion,
}: {
  slug: string;
  spec: PublicSpace["spec"];
  widget: { kind: string; label: string; entity: string; field?: string };
  dataVersion: number;
}) {
  const entity = entityOf(spec, widget.entity);
  const { records } = useRecords(slug, widget.entity, dataVersion);

  if (widget.kind === "sum") {
    const total = records.reduce((acc, r) => acc + (Number(r.data[widget.field ?? ""]) || 0), 0);
    return <StatCard label={widget.label} value={String(total)} />;
  }
  if (widget.kind === "list") {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 text-sm font-medium text-muted-foreground">{widget.label}</div>
        <ul className="space-y-1 text-sm text-foreground">
          {records.slice(0, 5).map((r) => (
            <li key={r.id} className="truncate">
              {displayLabel(entity, r)}
            </li>
          ))}
          {records.length === 0 && <li className="text-muted-foreground">Nothing yet.</li>}
        </ul>
      </div>
    );
  }
  return <StatCard label={widget.label} value={String(records.length)} />;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 text-3xl font-bold text-foreground">{value}</div>
    </div>
  );
}

// ---- Field rendering -------------------------------------------------------

function FieldControl({
  slug,
  spec,
  field,
  value,
  onChange,
}: {
  slug: string;
  spec: PublicSpace["spec"];
  field: FieldSpec;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const refEntity = field.type === "reference" ? entityOf(spec, field.refEntity ?? "") : undefined;
  const { records } = useRecords(slug, refEntity?.name, 0);
  const baseClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-foreground">
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </span>
      {field.type === "boolean" ? (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
      ) : field.type === "text" ? (
        <textarea
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          rows={3}
        />
      ) : field.type === "select" ? (
        <select
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        >
          <option value="">Select…</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.type === "reference" ? (
        <select
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        >
          <option value="">Select…</option>
          {records.map((r) => (
            <option key={r.id} value={r.id}>
              {displayLabel(refEntity, r)}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={inputType(field.type)}
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        />
      )}
    </label>
  );
}

function inputType(type: FieldSpec["type"]): string {
  switch (type) {
    case "number":
      return "number";
    case "date":
      return "date";
    case "datetime":
      return "datetime-local";
    default:
      return "text";
  }
}

function formatCell(field: FieldSpec, value: unknown): string {
  if (value == null || value === "") return "—";
  if (field.type === "boolean") return value ? "Yes" : "No";
  return String(value);
}
