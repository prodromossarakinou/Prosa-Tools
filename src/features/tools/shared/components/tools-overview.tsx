import { AppShell } from "@/components/layout/app-shell";
import { ToolCard } from "@/features/tools/shared/components/tool-card";
import { toolRegistry } from "@/features/tools/shared/data/tool-registry";

type ToolsOverviewProps = {
  heading: string;
  description: string;
};

export function ToolsOverview({ heading, description }: ToolsOverviewProps) {
  return (
    <AppShell>
      <section className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Platform</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{heading}</h2>
        <p className="max-w-3xl text-sm text-slate-600 sm:text-base">{description}</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {toolRegistry.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </section>
    </AppShell>
  );
}
