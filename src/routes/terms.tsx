import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms | DevToolkit" },
      {
        name: "description",
        content: "Terms of use for DevToolkit's free developer tools.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
        <FileText className="size-6" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">Terms</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Plain-language terms for using DevToolkit's free tools.
      </p>

      <div className="mt-10 space-y-8 text-[15px] leading-7 text-muted-foreground">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Using the tools</h2>
          <p className="mt-3">
            DevToolkit's tools are provided free of charge, without an account, for personal and
            professional use. You're responsible for the data you paste into any tool and for how
            you use the output.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">No warranty</h2>
          <p className="mt-3">
            Tools are provided "as is", without warranty of any kind. While we aim for accurate
            formatting, conversion and validation, you should verify results before relying on them
            for production systems, legal documents or anything where correctness is critical.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Acceptable use</h2>
          <p className="mt-3">
            Don't use DevToolkit to process data you don't have the right to handle, or in a way
            that disrupts the service for other users (for example, automated abuse or excessive
            scripted load).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Changes</h2>
          <p className="mt-3">
            Tools and content may change or be added over time as DevToolkit grows. Continued use of
            the site after changes means you accept the current terms.
          </p>
        </section>
      </div>
    </div>
  );
}
