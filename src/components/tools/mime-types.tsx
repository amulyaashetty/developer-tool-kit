import { useMemo, useState } from "react";
import { SearchBar } from "@/components/site/SearchBar";
import { CopyButton, Panel } from "@/components/tools/primitives";
import { searchMime } from "@/lib/mime";

export function MimeTypesTool() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchMime(query), [query]);

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by extension or MIME type..."
        />
      </div>

      <Panel title={`MIME types (${results.length})`}>
        <div className="max-h-[32rem] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Extension</th>
                <th className="px-3 py-2 font-medium">MIME type</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {results.map((entry) => (
                <tr key={entry.extension} className="border-t border-border">
                  <td className="px-3 py-2 font-mono">{entry.extension}</td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{entry.mime}</td>
                  <td className="px-3 py-2 text-right">
                    <CopyButton value={entry.mime} size="sm" variant="ghost" />
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-muted-foreground">
                    No matches.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
