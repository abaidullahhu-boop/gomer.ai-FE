import { PageMeta } from "@/components/PageMeta";

export function DashboardPlaceholder({ title }: { title: string }) {
  return (
    <>
      <PageMeta title={`${title} — Gomer`} description={`Gomer ${title.toLowerCase()}`} />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-muted-foreground">Coming soon.</p>
      </div>
    </>
  );
}
