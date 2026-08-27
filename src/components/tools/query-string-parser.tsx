import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ClearButton,
  CodeArea,
  CopyButton,
  FieldLabel,
  Panel,
} from "@/components/tools/primitives";
import {
  buildFullUrl,
  buildQueryString,
  createEmptyParam,
  parseQueryInput,
  type QueryParam,
} from "@/lib/query-string";

const SAMPLE = "https://example.com/products?page=2&category=books&sort=price";

export function QueryStringParserTool() {
  const initial = useMemo(() => parseQueryInput(SAMPLE), []);
  const [base, setBase] = useState(initial.base);
  const [params, setParams] = useState<QueryParam[]>(initial.params);
  const [rawInput, setRawInput] = useState(SAMPLE);

  const queryString = useMemo(() => buildQueryString(params), [params]);
  const fullUrl = useMemo(() => buildFullUrl(base, params), [base, params]);

  const parseFromRaw = () => {
    const parsed = parseQueryInput(rawInput);
    setBase(parsed.base);
    setParams(parsed.params);
  };

  return (
    <div className="space-y-4">
      <Panel title="URL or query string" actions={<ClearButton onClear={() => setRawInput("")} />}>
        <FieldLabel htmlFor="qs-raw">Paste a URL or query string</FieldLabel>
        <div className="flex gap-2">
          <Input
            id="qs-raw"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            className="font-mono"
            placeholder="https://example.com/path?a=1&b=2"
          />
          <Button type="button" size="sm" onClick={parseFromRaw}>
            Parse
          </Button>
        </div>
      </Panel>

      <Panel
        title="Parameters"
        actions={
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => setParams((prev) => [...prev, createEmptyParam()])}
          >
            <Plus className="size-3.5" aria-hidden />
            Add parameter
          </Button>
        }
      >
        <FieldLabel htmlFor="qs-base">Base URL (without query string)</FieldLabel>
        <Input
          id="qs-base"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="mb-4 font-mono"
        />

        <div className="space-y-2">
          {params.map((p) => (
            <div key={p.id} className="flex gap-2">
              <Input
                value={p.key}
                placeholder="Key"
                onChange={(e) =>
                  setParams((prev) =>
                    prev.map((row) => (row.id === p.id ? { ...row, key: e.target.value } : row)),
                  )
                }
                className="font-mono"
              />
              <Input
                value={p.value}
                placeholder="Value"
                onChange={(e) =>
                  setParams((prev) =>
                    prev.map((row) => (row.id === p.id ? { ...row, value: e.target.value } : row)),
                  )
                }
                className="font-mono"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Remove parameter"
                onClick={() => setParams((prev) => prev.filter((row) => row.id !== p.id))}
              >
                <Trash2 className="size-4" aria-hidden />
              </Button>
            </div>
          ))}
          {params.length === 0 && (
            <p className="text-sm text-muted-foreground">No parameters yet.</p>
          )}
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Query string"
          actions={<CopyButton value={queryString} label="Copy query string" />}
        >
          <CodeArea id="qs-output" label="Query string" value={queryString} readOnly rows={4} />
        </Panel>
        <Panel title="Full URL" actions={<CopyButton value={fullUrl} />}>
          <CodeArea id="qs-url-output" label="Full URL" value={fullUrl} readOnly rows={4} />
        </Panel>
      </div>
    </div>
  );
}
