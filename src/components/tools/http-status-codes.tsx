import { useMemo, useState } from "react";
import { SearchBar } from "@/components/site/SearchBar";
import { Panel } from "@/components/tools/primitives";
import { cn } from "@/lib/utils";
import { HTTP_STATUS_CODES, statusClass } from "@/lib/http-status";

function classColor(cls: string) {
  if (cls.startsWith("2")) return "text-success";
  if (cls.startsWith("3")) return "text-primary";
  if (cls.startsWith("4") || cls.startsWith("5")) return "text-destructive";
  return "text-muted-foreground";
}

export function HttpStatusCodesTool() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    () => HTTP_STATUS_CODES.find((s) => s.code === 200) ?? HTTP_STATUS_CODES[0]!,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HTTP_STATUS_CODES;
    return HTTP_STATUS_CODES.filter(
      (s) =>
        String(s.code).includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by code, name or description..."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Panel title={`Status codes (${filtered.length})`}>
          <div className="max-h-[28rem] space-y-1 overflow-y-auto pr-1">
            {filtered.map((s) => (
              <button
                key={s.code}
                type="button"
                onClick={() => setSelected(s)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border border-transparent px-3 py-2 text-left transition-colors hover:bg-muted",
                  selected.code === s.code && "border-border bg-muted",
                )}
              >
                <span
                  className={cn(
                    "w-12 shrink-0 font-mono text-sm font-semibold",
                    classColor(statusClass(s.code)),
                  )}
                >
                  {s.code}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{s.name}</span>
                  <span className="block text-xs text-muted-foreground">{statusClass(s.code)}</span>
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-sm text-muted-foreground">No matches.</p>
            )}
          </div>
        </Panel>

        <Panel title="Details">
          <div className="flex items-baseline gap-3">
            <span
              className={cn("font-mono text-3xl font-bold", classColor(statusClass(selected.code)))}
            >
              {selected.code}
            </span>
            <span className="text-lg font-semibold">{selected.name}</span>
          </div>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {statusClass(selected.code)}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">{selected.description}</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{selected.detail}</p>
        </Panel>
      </div>
    </div>
  );
}
