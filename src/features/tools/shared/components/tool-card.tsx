import Link from "next/link";

import type { ToolDefinition } from "@/features/tools/shared/types";

type ToolCardProps = {
  tool: ToolDefinition;
};

const statusStyles: Record<ToolDefinition["status"], string> = {
  planned: "bg-amber-100 text-amber-800",
  active: "bg-emerald-100 text-emerald-800",
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-500">{tool.category}</p>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[tool.status]}`}>
          {tool.status}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{tool.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{tool.summary}</p>
      {tool.href ? (
        <Link
          href={tool.href}
          className="mt-4 inline-flex rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Open Tool
        </Link>
      ) : null}
    </article>
  );
}
