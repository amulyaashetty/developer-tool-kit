import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Tool Categories | DevToolkit" },
      {
        name: "description",
        content:
          "Browse DevToolkit's free developer tools by category: Converters, Formatters, Security, Developer Utilities and Web Tools.",
      },
    ],
  }),
  component: CategoriesPage,
});

const CATEGORY_DESCRIPTIONS: Record<(typeof CATEGORIES)[number], string> = {
  Converters: "Turn data from one format into another — JSON, YAML, CSV, bytes and timestamps.",
  Formatters: "Beautify, validate and minify JSON and SQL so it's readable and correct.",
  Security: "Inspect tokens and encoded values without sending anything to a server.",
  "Developer Utilities": "Everyday helpers for testing regex, generating IDs and comparing text.",
  "Web Tools": "Work with URLs, HTTP status codes, MIME types and API requests.",
};

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Categories</h1>
        <p className="mt-3 text-muted-foreground">
          All 20 DevToolkit tools, grouped into five categories so you can find the right one fast.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {CATEGORIES.map((category) => {
          const tools = TOOLS.filter((t) => t.category === category);
          return (
            <section key={category} className="panel p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-semibold">{category}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {CATEGORY_DESCRIPTIONS[category]}
                  </p>
                </div>
                <Link
                  to="/tools"
                  search={{ category }}
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View all
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      to="/tools/$slug"
                      params={{ slug: tool.slug }}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <tool.icon className="size-4 shrink-0 text-primary" aria-hidden />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
