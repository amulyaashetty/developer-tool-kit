import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
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
        <h2 className="font-display text-2xl font-semibold">About the {tool.name}</h2>
        {tool.about.map((p) => (
          <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-7 text-muted-foreground">
            {p}
          </p>
        ))}
      </section>

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
