import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeArea, CopyButton, FieldLabel, Panel } from "@/components/tools/primitives";
import { toCurlCommand, toFetchSnippet, toPythonSnippet, type HeaderRow } from "@/lib/curl";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

let headerId = 0;
function newHeader(): HeaderRow & { id: number } {
  headerId += 1;
  return { id: headerId, key: "", value: "" };
}

export function CurlGeneratorTool() {
  const [method, setMethod] = useState<(typeof METHODS)[number]>("POST");
  const [url, setUrl] = useState("https://example.com/api");
  const [headers, setHeaders] = useState<(HeaderRow & { id: number })[]>(() => [
    { id: 0, key: "Content-Type", value: "application/json" },
  ]);
  const [body, setBody] = useState('{"name":"John"}');

  const request = useMemo(() => ({ method, url, headers, body }), [method, url, headers, body]);

  const curl = useMemo(() => toCurlCommand(request), [request]);
  const fetchSnippet = useMemo(() => toFetchSnippet(request), [request]);
  const pythonSnippet = useMemo(() => toPythonSnippet(request), [request]);

  return (
    <div className="space-y-4">
      <Panel title="Request">
        <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
          <div>
            <FieldLabel htmlFor="curl-method">Method</FieldLabel>
            <Select value={method} onValueChange={(v) => setMethod(v as (typeof METHODS)[number])}>
              <SelectTrigger id="curl-method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {METHODS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <FieldLabel htmlFor="curl-url">URL</FieldLabel>
            <Input
              id="curl-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <FieldLabel>Headers</FieldLabel>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => setHeaders((prev) => [...prev, newHeader()])}
            >
              <Plus className="size-3.5" aria-hidden />
              Add header
            </Button>
          </div>
          <div className="space-y-2">
            {headers.map((h) => (
              <div key={h.id} className="flex gap-2">
                <Input
                  value={h.key}
                  placeholder="Header name"
                  onChange={(e) =>
                    setHeaders((prev) =>
                      prev.map((row) => (row.id === h.id ? { ...row, key: e.target.value } : row)),
                    )
                  }
                  className="font-mono"
                />
                <Input
                  value={h.value}
                  placeholder="Value"
                  onChange={(e) =>
                    setHeaders((prev) =>
                      prev.map((row) =>
                        row.id === h.id ? { ...row, value: e.target.value } : row,
                      ),
                    )
                  }
                  className="font-mono"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Remove header"
                  onClick={() => setHeaders((prev) => prev.filter((row) => row.id !== h.id))}
                >
                  <Trash2 className="size-4" aria-hidden />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <FieldLabel htmlFor="curl-body">Request body</FieldLabel>
          <CodeArea id="curl-body" label="Request body" value={body} onChange={setBody} rows={5} />
        </div>
      </Panel>

      <Panel title="cURL" actions={<CopyButton value={curl} />}>
        <CodeArea id="curl-output" label="cURL command" value={curl} readOnly rows={6} />
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="JavaScript fetch" actions={<CopyButton value={fetchSnippet} />}>
          <CodeArea
            id="fetch-output"
            label="JavaScript fetch"
            value={fetchSnippet}
            readOnly
            rows={8}
          />
        </Panel>
        <Panel title="Python requests" actions={<CopyButton value={pythonSnippet} />}>
          <CodeArea
            id="python-output"
            label="Python requests"
            value={pythonSnippet}
            readOnly
            rows={8}
          />
        </Panel>
      </div>
    </div>
  );
}
