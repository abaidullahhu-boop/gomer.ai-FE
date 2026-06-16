import { ComparePageLayout } from "@/components/compare/ComparePageLayout";
import { chatgptCompareConfig } from "@/data/compare/chatgpt";

export default function ComparePage() {
  return <ComparePageLayout config={chatgptCompareConfig} />;
}
