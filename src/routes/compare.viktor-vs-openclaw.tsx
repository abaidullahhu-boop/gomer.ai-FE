import { ComparePageLayout } from "@/components/compare/ComparePageLayout";
import { openclawCompareConfig } from "@/data/compare/openclaw";

export default function CompareOpenClawPage() {
  return <ComparePageLayout config={openclawCompareConfig} />;
}
