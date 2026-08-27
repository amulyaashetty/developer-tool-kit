import { createFileRoute, notFound } from "@tanstack/react-router";
import { ToolLayout, faqJsonLd } from "@/components/site/ToolLayout";
import { TOOL_COMPONENTS } from "@/components/tools/registry";
import { TOOL_MAP } from "@/lib/tools";

export const Route = createFileRoute("/tools/$slug")({
  // Only the slug is returned from the loader (not the ToolMeta object) —
  // ToolMeta carries a Lucide icon component, which cannot be serialized for
  // SSR hydration. The full metadata is looked up client-side from TOOL_MAP,
  // which is already part of the JS bundle.
  loader: ({ params }) => {
    if (!TOOL_MAP[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const tool = TOOL_MAP[params.slug];
    if (!tool) return {};
    return {
      meta: [
        { title: tool.seoTitle },
        { name: "description", content: tool.seoDescription },
        { property: "og:title", content: tool.seoTitle },
        { property: "og:description", content: tool.seoDescription },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: faqJsonLd(tool),
        },
      ],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { slug } = Route.useLoaderData();
  const tool = TOOL_MAP[slug];
  if (!tool) return null;
  const Tool = TOOL_COMPONENTS[slug];

  return (
    <ToolLayout tool={tool}>
      {Tool ? <Tool /> : <p className="text-muted-foreground">This tool is coming soon.</p>}
    </ToolLayout>
  );
}
