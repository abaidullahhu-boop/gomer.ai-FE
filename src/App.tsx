import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "@/components/NotFound";
import Index from "@/routes/index";
import BlogPage from "@/routes/blog";
import BlogPostPage from "@/routes/blog.post";
import BrandPage from "@/routes/brand";
import CaseStudiesPage from "@/routes/case-studies";
import ChangelogPage from "@/routes/changelog";
import ComparePage from "@/routes/compare.viktor-vs-chatgpt";
import CreatorsPage from "@/routes/creators";
import DocsPage from "@/routes/docs";
import EnterprisePage from "@/routes/enterprise";
import GetStarted from "@/routes/get-started";
import ImpressumPage from "@/routes/impressum";
import IntegrationsPage from "@/routes/integrations";
import LandingPage from "@/routes/landing";
import PricingPage from "@/routes/pricing";
import ProductPage from "@/routes/product";
import SecurityPage from "@/routes/security";
import TermsPage from "@/routes/terms";
import UseCasesPage from "@/routes/use-cases";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/compare/viktor-vs-chatgpt" element={<ComparePage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
