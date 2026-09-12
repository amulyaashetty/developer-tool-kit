import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, ShieldCheck, Sparkles, UserX, Zap, Code2, Lock, Gauge } from "lucide-react";
import { ToolCardGrid } from "@/components/site/ToolCard";
import { CATEGORIES, POPULAR_TOOLS, TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevToolkit – Free Developer Tools Online" },
      {
        name: "description",
        content:
          "20 free, fast developer tools for formatting, converting, encoding and validating. JSON, JWT, Base64, Regex, SQL and more – all in your browser with zero signup.",
      },
      { property: "og:title", content: "DevToolkit – Free Developer Tools Online" },
      {
        property: "og:description",
        content:
          "20 free, fast developer tools for formatting, converting, encoding and validating. All in your browser.",
      },
    ],
  }),
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

const BENEFITS = [
  {
    icon: Gauge,
    title: "No Installation Needed",
    body: "Access tools instantly from any browser without installing software or plugins. Perfect for quick tasks on any device.",
  },
  {
    icon: Lock,
    title: "Your Data Stays Private",
    body: "Browser-based processing means your data never leaves your device. No servers, no logging, no tracking.",
  },
  {
    icon: Code2,
    title: "Works with Your Workflow",
    body: "Generate, format, validate and convert data in seconds. Integrate results directly into your code or configs.",
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
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">What is DevToolkit?</h2>
        <p className="mt-2 text-muted-foreground">
          Every developer has a shortlist of tiny utilities they reach for constantly.
        </p>
        <div className="mt-8 space-y-6 max-w-3xl">
          <p className="text-[15px] leading-7 text-muted-foreground">
            Formatting JSON, decoding a JWT, generating a UUID, testing a regex, validating SQL—these are
            the tasks that interrupt your workflow a dozen times a day. DevToolkit brings twenty of the
            most useful utilities together in one clean, fast place.
          </p>
          <p className="text-[15px] leading-7 text-muted-foreground">
            The project focuses on tools that solve real problems for developers. Each tool is built to do
            one job well, with sensible defaults, clear error messages, and no unnecessary friction.
          </p>
          <p className="text-[15px] leading-7 text-muted-foreground">
            Best of all: DevToolkit has no accounts, no paywalls, and no dark patterns. All core tools are
            free and will remain free.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Why use browser-based tools?</h2>
        <p className="mt-2 text-muted-foreground">
          Quick, private, and always accessible—no setup required.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((item) => (
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

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">How DevToolkit works</h2>
        <div className="mt-8 space-y-6 max-w-3xl">
          <p className="text-[15px] leading-7 text-muted-foreground">
            Most DevToolkit tools process your input entirely in your browser using JavaScript APIs and
            standards. When you paste JSON into the formatter, your browser's built-in JSON parser handles
            the work. When you decode a JWT, the base64 decoding and signature parsing happen on your device.
          </p>
          <p className="text-[15px] leading-7 text-muted-foreground">
            This approach means tools run instantly without waiting for a server, and your data never leaves
            your machine. It's the right approach for data transformation tasks where security and speed matter.
          </p>
          <p className="text-[15px] leading-7 text-muted-foreground">
            For tools that require computation (like cron parsing or regex testing), the work still happens
            on your device using open-source libraries. Nothing is logged, cached, or analyzed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Developer tool categories</h2>
        <p className="mt-2 text-muted-foreground">Browse tools grouped by what they help you do.</p>
        <div className="mt-8 space-y-8">
          {[
            {
              name: "Formatters",
              description:
                "Clean up and indent messy data. JSON, SQL, XML and other formats become readable and easier to parse.",
              icon: "📝",
            },
            {
              name: "Converters",
              description:
                "Transform data between formats. Encode to Base64, convert between JSON and YAML, parse timestamps, and more.",
              icon: "🔄",
            },
            {
              name: "Validators",
              description:
                "Check whether data is valid. Validate JSON syntax, check if a string matches a regex pattern, verify URLs.",
              icon: "✓",
            },
            {
              name: "Security & Inspection",
              description:
                "Decode tokens, inspect certificates, check password strength, generate secure identifiers and keys.",
              icon: "🔐",
            },
            {
              name: "Developer Utilities",
              description:
                "Generate test data, calculate hashes, convert colors, test cron expressions, and handle other everyday dev tasks.",
              icon: "⚙️",
            },
          ].map((category) => (
            <div key={category.name}>
              <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{category.description}</p>
              <Link
                to="/tools"
                search={{ category: category.name }}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Explore {category.name}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Categories</h2>
        <p className="mt-2 text-muted-foreground">Quick access to all our tools by category.</p>
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
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Why choose DevToolkit?</h2>
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

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-8 space-y-6 max-w-3xl">
          {[
            {
              q: "Are DevToolkit tools really free?",
              a: "Yes. Every tool is free to use with no limits, no signup, and no paywalls. We may introduce premium features in the future, but core tools will always remain free.",
            },
            {
              q: "Is my data private?",
              a: "Yes. Tools that can run in your browser do so entirely on your device. Your input is never sent to our servers. Tools that require server-side processing will inform you before processing.",
            },
            {
              q: "Do I need to create an account?",
              a: "No. Start using any tool immediately without signing up or providing an email address.",
            },
            {
              q: "What if I find a bug?",
              a: "Please report it to devstoolkitorg@gmail.com. Include the tool name, what you were doing, and what happened instead.",
            },
            {
              q: "Can I suggest a new tool?",
              a: "Absolutely. Email us at devstoolkitorg@gmail.com with your idea. We actively consider suggestions from users.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-foreground">{faq.q}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View all guides & tutorials
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold">Get started now</h2>
            <p className="mt-2 text-muted-foreground">
              Start using the tools you need. No signup, no installation.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Browse all tools
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
              >
                Read developer guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
