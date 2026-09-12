import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Heart, Terminal, BookOpen, Code2, Shield } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About DevToolkit | Free Developer Tools" },
      {
        name: "description",
        content:
          "Learn about DevToolkit: a free collection of practical developer tools focused on solving real problems with speed, privacy, and simplicity.",
      },
      { property: "og:title", content: "About DevToolkit" },
      {
        property: "og:description",
        content:
          "DevToolkit is a free collection of practical developer tools focused on solving real problems.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Terminal className="size-6" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        About DevToolkit
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        DevToolkit is a free collection of fast, simple and privacy-conscious tools designed to make
        everyday developer tasks easier.
      </p>

      <div className="mt-10 space-y-6 text-[15px] leading-7 text-muted-foreground">
        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-foreground">What is DevToolkit?</h2>
          <p>
            Every developer has a shortlist of tiny utilities they reach for constantly: formatting a
            blob of JSON, decoding a JWT, generating a UUID, testing a regex. DevToolkit brings twenty
            of those utilities together in one fast, distraction-free place.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-foreground">Who is it for?</h2>
          <p>
            DevToolkit is built for working developers who spend their days writing code, debugging,
            and deploying. If you use APIs, work with configuration files, handle authentication tokens,
            or need to validate and format data, these tools will save you time.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-foreground">Our approach</h2>
          <p>
            The project is focused on useful, everyday utilities rather than trying to be everything at
            once. Each tool is built to do one job well, with sensible defaults, clear error messages
            and no unnecessary friction between you and the result you need.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-foreground">Privacy and security</h2>
          <p>
            Wherever a task can be done entirely on your device, it is — most tools run only in your
            browser and never send your input to a server. That means faster results and fewer reasons
            to worry about what happens to the data you paste in.
          </p>
          <p className="mt-3">
            We never log, cache, or analyze user input. We don't use tracking cookies or analytics that
            identify you personally. Your usage of these tools remains private to you.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-foreground">No accounts or paywalls</h2>
          <p>
            DevToolkit has no accounts, no paywalls and no dark patterns. It is, and will remain, free
            to use for the tools available today. Start using any tool immediately without signing up or
            providing an email address.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-foreground">How it's built</h2>
          <p>
            Most DevToolkit tools process your input entirely in your browser using JavaScript APIs and
            open-source libraries. The JSON formatter uses your browser's built-in JSON parser. Base64
            encoding uses standard libraries. Regex testing uses JavaScript's native regex engine.
          </p>
          <p className="mt-3">
            This architecture means tools run instantly, your data stays on your device, and we have
            minimal server costs — savings we pass along to you as a free service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-foreground">Educational resources</h2>
          <p>
            Beyond the tools themselves, DevToolkit includes practical{" "}
            <Link to="/guides" className="font-medium text-primary hover:underline">
              developer guides
            </Link>
            {" "}that explain the concepts behind the tools. Learn about JSON, Base64 encoding, JWTs,
            regular expressions, and more — whether or not you use our tools.
          </p>
        </section>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="panel p-5">
          <span className="grid size-10 place-items-center rounded-lg border border-border bg-muted/60 text-primary">
            <Code2 className="size-5" aria-hidden />
          </span>
          <h3 className="mt-3 font-display font-semibold">Built for developers</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            By developers who understand the daily frustrations and time-consuming micro-tasks.
          </p>
        </div>

        <div className="panel p-5">
          <span className="grid size-10 place-items-center rounded-lg border border-border bg-muted/60 text-primary">
            <Shield className="size-5" aria-hidden />
          </span>
          <h3 className="mt-3 font-display font-semibold">Privacy-first</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your data stays in your browser. No tracking, no analytics, no servers.
          </p>
        </div>

        <div className="panel p-5">
          <span className="grid size-10 place-items-center rounded-lg border border-border bg-muted/60 text-primary">
            <BookOpen className="size-5" aria-hidden />
          </span>
          <h3 className="mt-3 font-display font-semibold">Educational</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Learn the concepts and best practices behind the tools.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Explore all tools
        </Link>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Heart className="size-4 text-primary" aria-hidden />
          Built for developers, by developers.
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Github className="size-4" aria-hidden />
        Open to feedback and tool suggestions via{" "}
        <a href="mailto:devstoolkitorg@gmail.com" className="text-primary hover:underline">
          email
        </a>
        .
      </div>
    </div>
  );
}
