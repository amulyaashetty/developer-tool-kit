import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ClearButton,
  CodeArea,
  CopyButton,
  FieldLabel,
  Panel,
  StatusNote,
  ToolGrid,
} from "@/components/tools/primitives";
import { decodeUrl, encodeUrl } from "@/lib/url-encode";

export function UrlEncoderTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [scope, setScope] = useState<"component" | "full">("component");
  const [input, setInput] = useState("hello world & special/chars?");

  const result = useMemo(
    () => (mode === "encode" ? encodeUrl(input, scope) : decodeUrl(input, scope)),
    [input, mode, scope],
  );
  const output = result.ok ? result.value : "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={mode} onValueChange={(v) => setMode(v as "encode" | "decode")}>
          <TabsList>
            <TabsTrigger value="encode">Encode URL</TabsTrigger>
            <TabsTrigger value="decode">Decode URL</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant={scope === "component" ? "default" : "outline"}
            onClick={() => setScope("component")}
          >
            Component
          </Button>
          <Button
            type="button"
            size="sm"
            variant={scope === "full" ? "default" : "outline"}
            onClick={() => setScope("full")}
          >
            Full URI
          </Button>
        </div>
      </div>

      <ToolGrid>
        <Panel title="Input" actions={<ClearButton onClear={() => setInput("")} />}>
          <FieldLabel htmlFor="url-input">Input</FieldLabel>
          <CodeArea
            id="url-input"
            label="Input"
            value={input}
            onChange={setInput}
            rows={8}
            invalid={!result.ok}
          />
        </Panel>
        <Panel title="Output" actions={<CopyButton value={output} />}>
          <FieldLabel htmlFor="url-output">Output</FieldLabel>
          <CodeArea id="url-output" label="Output" value={output} readOnly rows={8} />
        </Panel>
      </ToolGrid>
      {!result.ok && <StatusNote kind="error">{result.error}</StatusNote>}
    </div>
  );
}
