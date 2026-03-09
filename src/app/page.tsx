import { ToolsOverview } from "@/features/tools/components/tools-overview";

export default function HomePage() {
  return (
    <ToolsOverview
      heading="Your AI toolkit workspace"
      description="This repository is structured to scale from a single tool to many focused utilities with shared UI, provider-driven app state, and Next.js route handlers as your backend integration layer."
    />
  );
}
