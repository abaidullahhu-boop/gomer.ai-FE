import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToHash } from "@/components/ScrollToHash";
import { NotFound } from "@/components/NotFound";
import Index from "@/routes/index";
import BlogPage from "@/routes/blog";
import BlogPostPage from "@/routes/blog.post";
import ResearchPage from "@/routes/research";
import ResearchPostPage from "@/routes/research.post";
import BrandPage from "@/routes/brand";
import CaseStudiesPage from "@/routes/case-studies";
import ChangelogPage from "@/routes/changelog";
import ComparePage from "@/routes/compare.viktor-vs-chatgpt";
import CompareOpenClawPage from "@/routes/compare.viktor-vs-openclaw";
import CompareClaudeInSlackPage from "@/routes/compare.viktor-vs-claude-in-slack";
import CompareTaskletPage from "@/routes/compare.viktor-vs-tasklet";
import CreatorsPage from "@/routes/creators";
import DocsPage from "@/routes/docs";
import EnterprisePage from "@/routes/enterprise";
import GetStarted from "@/routes/get-started";
import SignIn from "@/routes/sign-in";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import DashboardHome from "@/routes/dashboard/index";
import DashboardTasks from "@/routes/dashboard/tasks";
import DashboardTeam from "@/routes/dashboard/team";
import DashboardTeamEdit from "@/routes/dashboard/team-edit";
import DashboardBilling from "@/routes/dashboard/billing";
import DashboardAccount from "@/routes/dashboard/account";
import { SettingsLayout } from "@/components/dashboard/settings/SettingsLayout";
import SettingsGeneral from "@/routes/dashboard/settings/general";
import SettingsPermissions from "@/routes/dashboard/settings/permissions";
import DashboardIntegrations from "@/routes/dashboard/integrations";
import DashboardIntegrationConfigure from "@/routes/dashboard/integration-configure";
import DashboardSkills from "@/routes/dashboard/skills";
import DashboardSpaces from "@/routes/dashboard/spaces";
import { UsageLayout } from "@/components/dashboard/usage/UsageLayout";
import UsageOverview from "@/routes/dashboard/usage/overview";
import UsageTeam from "@/routes/dashboard/usage/team";
import UsageActivity from "@/routes/dashboard/usage/activity";
import UsageScheduledTasks from "@/routes/dashboard/usage/scheduled-tasks";
import AuthCallback from "@/routes/auth.callback";
import ImpressumPage from "@/routes/impressum";
import IntegrationsPage from "@/routes/integrations";
import LandingPage from "@/routes/landing";
import PricingPage from "@/routes/pricing";
import ProductPage from "@/routes/product";
import SecurityPage from "@/routes/security";
import PrivacyPage from "@/routes/privacy";
import SupportPage from "@/routes/support";
import TermsPage from "@/routes/terms";
import UseCasesPage from "@/routes/use-cases";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/:slug" element={<ResearchPostPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/compare/viktor-vs-chatgpt" element={<ComparePage />} />
        <Route path="/compare/viktor-vs-openclaw" element={<CompareOpenClawPage />} />
        <Route path="/compare/viktor-vs-claude-in-slack" element={<CompareClaudeInSlackPage />} />
        <Route path="/compare/viktor-vs-tasklet" element={<CompareTaskletPage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="integrations" element={<DashboardIntegrations />} />
          <Route
            path="integrations/configure/:provider"
            element={<DashboardIntegrationConfigure />}
          />
          <Route path="skills" element={<DashboardSkills />} />
          <Route path="skills/installed" element={<DashboardSkills />} />
          <Route path="skills/installed/library" element={<DashboardSkills />} />
          <Route path="spaces" element={<DashboardSpaces />} />
          <Route path="tasks" element={<DashboardTasks />} />
          <Route path="team" element={<DashboardTeam />} />
          <Route path="team/edit" element={<DashboardTeamEdit />} />
          <Route path="usage" element={<UsageLayout />}>
            <Route index element={<UsageOverview />} />
            <Route path="team" element={<UsageTeam />} />
            <Route path="activity" element={<UsageActivity />} />
            <Route path="scheduled-tasks" element={<UsageScheduledTasks />} />
          </Route>
          <Route path="billing" element={<DashboardBilling />} />
          <Route path="account" element={<DashboardAccount />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<SettingsGeneral />} />
            <Route path="permissions" element={<SettingsPermissions />} />
          </Route>
        </Route>
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
