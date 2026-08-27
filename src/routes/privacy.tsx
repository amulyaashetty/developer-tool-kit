import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | DevToolkit" },
      {
        name: "description",
        content:
          "How DevToolkit handles your data: most tools process input locally in your browser and nothing is intentionally stored.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
        <ShieldCheck className="size-6" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">Privacy</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Most DevToolkit tools process your data locally in the browser and don't intentionally store
        your input.
      </p>

      <div className="mt-10 space-y-8 text-[15px] leading-7 text-muted-foreground">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            How your data is handled
          </h2>
          <p className="mt-3">
            The formatters, converters, encoders and generators on DevToolkit run entirely as
            JavaScript in your browser. Text you paste into a tool — JSON, YAML, CSV, a JWT, a
            regex, a URL — is processed on your device and is not sent to a DevToolkit server as
            part of the tool's normal operation.
          </p>
          <p className="mt-3">
            We don't intentionally log, store or transmit the content you type or paste into any
            tool. Standard web infrastructure (such as hosting and CDN providers) may still see
            connection metadata like IP address and request timing as part of normal web traffic,
            which is outside our direct control.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            What we can't guarantee
          </h2>
          <p className="mt-3">
            We avoid making absolute claims we can't technically back up. Browser extensions,
            network intermediaries, or misconfigured environments could in theory observe data on
            your own device outside of our control. DevToolkit itself does not add tracking scripts
            or send tool input to third parties.
          </p>
        </section>

        <section className="panel flex items-start gap-3 p-5">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
          <div>
            <h2 className="font-display text-base font-semibold text-foreground">
              A note on sensitive tools
            </h2>
            <p className="mt-2">
              Tools like the JWT Decoder work entirely client-side, but you should still avoid
              pasting secrets, passwords, API keys or production credentials into any online tool —
              including this one — as a general security practice.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Cookies and analytics
          </h2>
          <p className="mt-3 flex items-start gap-2">
            <Lock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            DevToolkit does not use tracking scripts. A single local storage entry remembers your
            light/dark theme preference; it never leaves your browser.
          </p>
        </section>
      </div>
    </div>
  );
}
