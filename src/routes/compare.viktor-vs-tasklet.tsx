import { ComparePageLayout } from "@/components/compare/ComparePageLayout";
import { taskletCompareConfig } from "@/data/compare/tasklet";

export default function CompareTaskletPage() {
  return <ComparePageLayout config={taskletCompareConfig} />;
}
