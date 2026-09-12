import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { relatedTools, type ToolMeta } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

export function AdPlaceholder() {
  return (
    <aside
      aria-hidden
      className="my-10 flex h-24 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground/60"
    >
      Advertisement space
    </aside>
  );
}

export function ToolLayout({ tool, children }: { tool: ToolMeta; children: ReactNode }) {
  const related = relatedTools(tool.slug);
  const Icon = tool.icon;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden />
          <li>
            <Link to="/tools" className="hover:text-foreground">
              Tools
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden />
          <li aria-current="page" className="text-foreground">
            {tool.name}
          </li>
        </ol>
      </nav>

      <header className="mb-8 flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-muted/60 text-primary">
          <Icon className="size-6" aria-hidden />
        </span>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{tool.short}</p>
        </div>
      </header>

      <div className="space-y-4">{children}</div>

      <AdPlaceholder />

      <section className="prose-none max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">About {tool.name}</h2>
        {tool.about.map((p) => (
          <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-7 text-muted-foreground">
            {p}
          </p>
        ))}
      </section>

      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">How to use {tool.name}</h2>
          <ol className="mt-4 space-y-3">
            {tool.howToUse.map((step, i) => (
              <li key={i} className="flex gap-4 text-[15px] leading-7 text-muted-foreground">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-foreground">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {tool.examples && tool.examples.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Example</h2>
          {tool.examples.map((example) => (
            <div key={example.title} className="mt-6">
              <h3 className="text-sm font-semibold text-foreground">{example.title}</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-xs font-medium text-muted-foreground">Input</p>
                  <pre className="mt-2 overflow-x-auto text-[13px] leading-5 text-foreground">
                    <code>{example.input}</code>
                  </pre>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-xs font-medium text-muted-foreground">Output</p>
                  <pre className="mt-2 overflow-x-auto text-[13px] leading-5 text-foreground">
                    <code>{example.output}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {tool.useCases && tool.useCases.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">When to use {tool.name}</h2>
          <ul className="mt-4 space-y-2">
            {tool.useCases.map((useCase, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {useCase}
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool.commonErrors && tool.commonErrors.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Common errors & troubleshooting</h2>
          <div className="mt-4 space-y-4">
            {tool.commonErrors.map((error, i) => (
              <div
                key={i}
                className="rounded-lg border border-amber-200/30 bg-amber-50/30 p-4 dark:border-amber-500/20 dark:bg-amber-500/10"
              >
                <div className="flex gap-3">
                  <AlertCircle className="size-5 shrink-0 text-amber-600 dark:text-amber-500" aria-hidden />
                  <div className="flex-1">
                    <p className="font-medium text-amber-900 dark:text-amber-200">{error.problem}</p>
                    <p className="mt-2 text-[15px] leading-6 text-amber-800/80 dark:text-amber-300/80">
                      {error.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tool.limitations && tool.limitations.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Limitations & details</h2>
          <ul className="mt-4 space-y-2">
            {tool.limitations.map((limitation, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" aria-hidden />
                {limitation}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          {tool.faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-[15px]">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-7 text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {tool.relatedGuides && tool.relatedGuides.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Related guides</h2>
          <ul className="mt-4 space-y-2">
            {tool.relatedGuides.map((guide) => (
              <li key={guide.slug} className="flex gap-3 text-[15px] leading-7">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <Link
                  to={`/guides/${guide.slug}`}
                  className="text-primary hover:underline"
                >
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Related tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((t) => (
            <div key={t.slug} className="relative">
              <ToolCard tool={t} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function faqJsonLd(tool: ToolMeta) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}
