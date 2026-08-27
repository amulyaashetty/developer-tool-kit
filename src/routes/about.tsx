import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Heart, Terminal } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About DevToolkit | Free Developer Tools" },
      {
        name: "description",
        content:
          "DevToolkit is a free collection of fast, simple and privacy-conscious tools designed to make everyday developer tasks easier.",
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
        <p>
          Every developer has a shortlist of tiny utilities they reach for constantly: formatting a
          blob of JSON, decoding a JWT, generating a UUID, testing a regex. DevToolkit brings twenty
          of those utilities together in one fast, distraction-free place.
        </p>
        <p>
          The project is focused on useful, everyday utilities rather than trying to be everything
          at once. Each tool is built to do one job well, with sensible defaults, clear error
          messages and no unnecessary friction between you and the result you need.
        </p>
        <p>
          Wherever a task can be done entirely on your device, it is — most tools run only in your
          browser and never send your input to a server. That means faster results and fewer reasons
          to worry about what happens to the data you paste in.
        </p>
        <p>
          DevToolkit has no accounts, no paywalls and no dark patterns. It is, and will remain, free
          to use for the tools available today.
        </p>
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
        Open to feedback and tool suggestions.
      </div>
    </div>
  );
}
