import { ComparePageLayout } from "@/components/compare/ComparePageLayout";
import { claudeInSlackCompareConfig } from "@/data/compare/claude-in-slack";

export default function CompareClaudeInSlackPage() {
  return <ComparePageLayout config={claudeInSlackCompareConfig} />;
}
