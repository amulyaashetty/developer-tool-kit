import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ChevronRight, Clock } from "lucide-react";
import { GUIDE_MAP } from "@/lib/guides";
import { TOOL_MAP } from "@/lib/tools";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    if (!GUIDE_MAP[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const guide = GUIDE_MAP[params.slug];
    if (!guide) return {};
    return {
      meta: [
        { title: guide.seoTitle },
        { name: "description", content: guide.seoDescription },
        { property: "og:title", content: guide.seoTitle },
        { property: "og:description", content: guide.seoDescription },
      ],
    };
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useLoaderData();
  const guide = GUIDE_MAP[slug];

  if (!guide) return null;

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-4 py-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden />
          <li>
            <Link to="/guides" className="hover:text-foreground">
              Guides
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden />
          <li aria-current="page" className="text-foreground">
            {guide.title}
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-4xl px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BookOpen className="size-4" aria-hidden />
            <span>{guide.category}</span>
            <span>•</span>
            <Clock className="size-4" aria-hidden />
            <span>{guide.readTime} min read</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{guide.description}</p>
        </header>

        <div className="prose prose-sm max-w-none dark:prose-invert prose-p:text-[15px] prose-p:leading-7 prose-p:text-muted-foreground prose-headings:font-display prose-headings:font-semibold prose-headings:text-foreground prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-base prose-strong:text-foreground prose-strong:font-semibold prose-code:text-[13px] prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-foreground prose-code:font-mono prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:overflow-x-auto prose-pre:p-4 prose-pre:text-[13px] prose-pre:leading-6 prose-ul:my-4 prose-ul:pl-4 prose-li:my-1 prose-li:text-muted-foreground">
          {guide.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              const title = line.slice(3);
              return (
                <h2 key={i} className="mt-8 mb-4 text-xl">
                  {title}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              const title = line.slice(4);
              return (
                <h3 key={i} className="mt-6 mb-3 text-base">
                  {title}
                </h3>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <ul key={i} className="my-4 pl-4">
                  <li className="my-1 text-muted-foreground">{line.slice(2)}</li>
                </ul>
              );
            }
            if (line.startsWith("```")) {
              return null;
            }
            if (line.trim() === "") {
              return <br key={i} />;
            }
            return (
              <p key={i} className="my-4 text-[15px] leading-7 text-muted-foreground">
                {line}
              </p>
            );
          })}
        </div>

        <div className="mt-12 space-y-8 border-t border-border pt-8">
          {guide.relatedTools && guide.relatedTools.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold">Related tools</h2>
              <ul className="mt-4 space-y-2">
                {guide.relatedTools.map((tool) => (
                  <li key={tool.slug} className="flex gap-3 text-[15px]">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <Link
                      to={`/tools/${tool.slug}`}
                      className="text-primary hover:underline"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {guide.relatedGuides && guide.relatedGuides.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold">Related guides</h2>
              <ul className="mt-4 space-y-2">
                {guide.relatedGuides.map((relatedGuide) => (
                  <li key={relatedGuide.slug} className="flex gap-3 text-[15px]">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <Link
                      to={`/guides/${relatedGuide.slug}`}
                      className="text-primary hover:underline"
                    >
                      {relatedGuide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold">Practice with DevToolkit</h2>
            <p className="mt-2 text-muted-foreground">
              Use the tools to apply what you've learned from this guide.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Explore tools
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
              >
                Back to guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
