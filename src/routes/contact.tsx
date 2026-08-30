import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquareText } from "lucide-react";

const CONTACT_EMAIL = "devstoolkitorg@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact DevToolkit | Free Developer Tools" },
      {
        name: "description",
        content:
          "Have a suggestion, found a bug, or want to report an issue with DevToolkit? Get in touch.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Mail className="size-6" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Contact DevToolkit
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Have a suggestion, found a bug, or want to report an issue? Contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <div className="mt-10 space-y-6 text-[15px] leading-7 text-muted-foreground">
        <p>
          DevToolkit is built and maintained directly, so every message is read. Bug reports, tool
          requests and general feedback are all welcome.
        </p>
        <p>
          If you're reporting a bug, it helps to include the tool you were using, what you entered,
          and what you expected to happen instead.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Mail className="size-4" aria-hidden />
          Email us
        </a>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MessageSquareText className="size-4 text-primary" aria-hidden />
          We aim to respond within a few days.
        </span>
      </div>
    </div>
  );
}
