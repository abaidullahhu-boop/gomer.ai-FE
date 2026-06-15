import { PageMeta } from "@/components/PageMeta";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { BillingIcon, IntegrationIcon, ScheduledTasksIcon } from "@/components/dashboard/NavIcons";
import { OnboardingSection } from "@/components/dashboard/OnboardingSection";
import { WhatsNewCarousel } from "@/components/dashboard/WhatsNewCarousel";
import { billingData } from "@/data/billing";

export default function DashboardHome() {
  return (
    <>
      <PageMeta title="Dashboard — Gomer" description="Gomer dashboard" />
      <div className="mx-auto w-full max-w-5xl px-5 py-8">
        <h1 className="text-3xl font-bold leading-8 text-foreground">Dashboard</h1>

        <div className="mt-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              label="Credits available"
              value={billingData.credits.available}
              href="/dashboard/billing"
              linkLabel="Manage plan"
              icon={BillingIcon}
            />
            <MetricCard
              label="Scheduled tasks"
              value="0"
              href="/dashboard/tasks"
              linkLabel="Manage tasks"
              icon={ScheduledTasksIcon}
            />
            <MetricCard
              label="Connected integrations"
              value="0"
              href="/dashboard/integrations"
              linkLabel="Browse integrations"
              icon={IntegrationIcon}
            />
          </div>
        </div>

        <div className="mt-8">
          <OnboardingSection />
        </div>

        <div className="mt-8">
          <WhatsNewCarousel />
        </div>
      </div>
    </>
  );
}
