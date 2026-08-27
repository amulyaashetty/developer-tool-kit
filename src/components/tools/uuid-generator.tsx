import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClearButton, CopyButton, Panel } from "@/components/tools/primitives";
import { generateUuids } from "@/lib/uuid";

export function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>(() => generateUuids(1));

  return (
    <div className="space-y-4">
      <Panel
        title="UUID v4"
        actions={
          <>
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              onClick={() => setUuids(generateUuids(1))}
            >
              <RefreshCw className="size-3.5" aria-hidden />
              Generate UUID
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setUuids(generateUuids(5))}
            >
              Generate 5
            </Button>
            <CopyButton value={uuids.join("\n")} />
            <ClearButton onClear={() => setUuids([])} />
          </>
        }
      >
        {uuids.length > 0 ? (
          <ul className="space-y-2">
            {uuids.map((id, i) => (
              <li
                key={`${id}-${i}`}
                className="flex items-center justify-between gap-2 rounded-lg border border-border bg-code px-3 py-2.5"
              >
                <span className="min-w-0 truncate font-mono text-sm">{id}</span>
                <CopyButton value={id} size="sm" variant="ghost" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            Generate one or more UUIDs to see them here.
          </p>
        )}
      </Panel>
    </div>
  );
}
