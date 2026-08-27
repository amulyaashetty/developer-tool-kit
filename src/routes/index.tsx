import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, ShieldCheck, Sparkles, UserX, Zap } from "lucide-react";
import { ToolCardGrid } from "@/components/site/ToolCard";
import { CATEGORIES, POPULAR_TOOLS, TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHY = [
  {
    icon: Sparkles,
    title: "Free",
    body: "All core tools are free to use. No paywalls, no premium tiers.",
  },
  {
    icon: Zap,
    title: "Fast",
    body: "Most tools run entirely in your browser, so results appear instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Friendly",
    body: "Your data stays in your browser whenever possible — nothing is uploaded.",
  },
  {
    icon: UserX,
    title: "No Signup",
    body: "Start using any tool immediately. No account, no email required.",
  },
];

function categoryCount(category: (typeof CATEGORIES)[number]) {
  return TOOLS.filter((t) => t.category === category).length;
}

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-backdrop absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            20 free developer tools, zero signup
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Developer Tools. All in One Place.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
            Free, fast and privacy-friendly tools for developers. Format, convert, encode, validate
            and generate — directly in your browser.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Explore Tools
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
            >
              <Search className="size-4" aria-hidden />
              Search Tools
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Popular tools</h2>
            <p className="mt-2 text-muted-foreground">The tools developers reach for most.</p>
          </div>
          <Link
            to="/tools"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            View all tools
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8">
          <ToolCardGrid tools={POPULAR_TOOLS} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Categories</h2>
        <p className="mt-2 text-muted-foreground">Browse tools grouped by what they help you do.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              to="/tools"
              search={{ category }}
              className="panel group flex flex-col justify-between p-5 transition-colors hover:border-border-strong"
            >
              <h3 className="font-display text-lg font-semibold">{category}</h3>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>{categoryCount(category)} tools</span>
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Why DevToolkit?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item) => (
            <div key={item.title} className="panel p-5">
              <span className="grid size-10 place-items-center rounded-lg border border-border bg-muted/60 text-primary">
                <item.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
