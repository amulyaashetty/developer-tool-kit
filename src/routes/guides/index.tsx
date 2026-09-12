import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { GUIDES } from "@/lib/guides";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "Developer Guides – Learn Web Development | DevToolkit" },
      {
        name: "description",
        content:
          "Free, practical developer guides on JSON, Base64, JWTs, regex, and more. Learn the concepts behind DevToolkit tools.",
      },
      { property: "og:title", content: "Developer Guides – Learn Web Development" },
      {
        property: "og:description",
        content: "Free, practical developer guides on JSON, Base64, JWTs, regex, and more.",
      },
    ],
  }),
  component: GuidesPage,
});

const CATEGORIES = ["JSON", "Encoding", "Security", "Databases", "Web", "Formats", "Regex"] as const;

function GuidesPage() {
  const grouped = GUIDES.reduce(
    (acc, guide) => {
      const cat = guide.category as (typeof CATEGORIES)[number];
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(guide);
      return acc;
    },
    {} as Record<(typeof CATEGORIES)[number], typeof GUIDES>
  );

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-backdrop absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground">
            <BookOpen className="size-3.5 text-primary" aria-hidden />
            Learn the concepts behind your tools
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Developer Guides & Tutorials
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
            Free, practical guides on JSON, encoding, authentication, databases and more. Understand
            the concepts, not just the tools.
          </p>
          <div className="mt-8">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Back to Tools
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {CATEGORIES.map((category) => {
          const guides = grouped[category];
          if (!guides || guides.length === 0) return null;

          return (
            <section key={category} className="mb-16">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">{category}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/guides/${guide.slug}`}
                    className="panel group flex flex-col justify-between p-5 transition-colors hover:border-border-strong"
                  >
                    <div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-[15px] text-muted-foreground">{guide.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Clock className="size-3" aria-hidden />
                        {guide.readTime} min read
                      </span>
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold">Ready to dive deeper?</h2>
            <p className="mt-2 text-muted-foreground">
              Use the tools to practice what you've learned.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Explore all tools
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
