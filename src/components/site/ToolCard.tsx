import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ToolMeta } from "@/lib/tools";

export function ToolCard({ tool }: { tool: ToolMeta }) {
  const Icon = tool.icon;
  return (
    <article className="panel group flex h-full flex-col p-5 transition-colors hover:border-border-strong">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-muted/60 text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold leading-tight">
            <Link
              to="/tools/$slug"
              params={{ slug: tool.slug }}
              className="outline-none after:absolute after:inset-0 focus-visible:underline"
            >
              {tool.name}
            </Link>
          </h3>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {tool.category}
          </p>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{tool.short}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Open Tool
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </article>
  );
}

export function ToolCardGrid({ tools }: { tools: ToolMeta[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <div key={tool.slug} className="relative">
          <ToolCard tool={tool} />
        </div>
      ))}
    </div>
  );
}
