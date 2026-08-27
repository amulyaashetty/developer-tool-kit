import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SearchBar } from "@/components/site/SearchBar";
import { CategoryFilter } from "@/components/site/CategoryFilter";
import { ToolCardGrid } from "@/components/site/ToolCard";
import { CATEGORIES, searchTools } from "@/lib/tools";

const searchSchema = z.object({
  category: z
    .enum([...CATEGORIES, "All"])
    .catch("All")
    .optional()
    .default("All"),
  q: z.string().catch("").optional().default(""),
});

export const Route = createFileRoute("/tools/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Developer Tools | DevToolkit" },
      {
        name: "description",
        content:
          "Browse all free DevToolkit utilities: formatters, converters, encoders, generators and validators for developers. Search or filter by category.",
      },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(search.q);

  const results = useMemo(() => searchTools(query, search.category), [query, search.category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">All Tools</h1>
        <p className="mt-3 text-muted-foreground">
          {results.length} {results.length === 1 ? "tool" : "tools"} available. Search by name or
          filter by category to find exactly what you need.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-sm">
          <SearchBar
            value={query}
            onChange={(value) => {
              setQuery(value);
              navigate({ search: (prev) => ({ ...prev, q: value }) });
            }}
          />
        </div>
        <CategoryFilter
          value={search.category}
          onChange={(category) => navigate({ search: (prev) => ({ ...prev, category }) })}
        />
      </div>

      <div className="mt-10">
        {results.length > 0 ? (
          <ToolCardGrid tools={results} />
        ) : (
          <div className="panel p-10 text-center text-muted-foreground">
            No tools match "{query}". Try a different search term or category.
          </div>
        )}
      </div>
    </div>
  );
}
