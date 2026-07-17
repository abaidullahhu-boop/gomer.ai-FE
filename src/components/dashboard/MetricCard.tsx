import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";

type MetricIcon = LucideIcon | ((props: SVGProps<SVGSVGElement>) => React.ReactNode);

type MetricCardProps = {
  label: string;
  value: string;
  href: string;
  linkLabel: string;
  icon: MetricIcon;
};

export function MetricCard({ label, value, href, linkLabel, icon: Icon }: MetricCardProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-sm border border-border bg-card px-4 py-4 sm:px-5">
      <div className="flex min-w-0 items-start justify-between gap-2">
        <span className="min-w-0 font-body text-[11px] font-medium uppercase leading-snug tracking-wider text-muted-foreground">
          {label}
        </span>
        <Icon className="size-4 shrink-0 text-muted-foreground/50" strokeWidth={1.5} />
      </div>
      <span className="text-xl font-semibold leading-tight tracking-tight text-foreground">
        {value}
      </span>
      <Link
        to={href}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {linkLabel}
        <ArrowRight className="size-3.5" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
