import { PageMeta } from "@/components/PageMeta";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { BillingIcon, IntegrationIcon, ScheduledTasksIcon } from "@/components/dashboard/NavIcons";
import { OnboardingSection } from "@/components/dashboard/OnboardingSection";
import { WhatsNewCarousel } from "@/components/dashboard/WhatsNewCarousel";
import { useDashboardOverview } from "@/components/dashboard/useDashboardOverview";
import { useCredits } from "@/lib/credits";
import { figureLabel } from "@/lib/format";

export default function DashboardHome() {
  const { summary, error } = useCredits();
  const overview = useDashboardOverview();

  return (
    <>
      <PageMeta title="Dashboard — Gomer" description="Gomer dashboard" />
      <div className="mx-auto w-full max-w-5xl px-5 py-8">
        <h1 className="text-3xl font-bold leading-8 text-foreground">Dashboard</h1>

        <div className="mt-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              label="Credits available"
              value={figureLabel(summary?.balance.balance, error)}
              href="/dashboard/billing"
              linkLabel="Manage plan"
              icon={BillingIcon}
            />
            <MetricCard
              label="Scheduled tasks"
              value={figureLabel(overview.scheduledTasks)}
              href="/dashboard/tasks"
              linkLabel="Manage tasks"
              icon={ScheduledTasksIcon}
            />
            <MetricCard
              label="Connected integrations"
              value={figureLabel(overview.integrations)}
              href="/dashboard/integrations"
              linkLabel="Browse integrations"
              icon={IntegrationIcon}
            />
          </div>
        </div>

        <div className="mt-8">
          <OnboardingSection overview={overview} />
        </div>

        <div className="mt-8">
          <WhatsNewCarousel />
        </div>
      </div>
    </>
  );
}
