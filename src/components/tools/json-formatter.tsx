import { useMemo, useState } from "react";
import {
  ClearButton,
  CodeArea,
  CopyButton,
  FieldLabel,
  Panel,
  StatusNote,
  ToolGrid,
} from "@/components/tools/primitives";
import { Button } from "@/components/ui/button";
import { formatJson, minifyJson } from "@/lib/json-utils";

const SAMPLE = `{"name":"John","age":25,"skills":["Python","AWS"]}`;

export function JsonFormatterTool() {
  const [input, setInput] = useState(SAMPLE);
  const [mode, setMode] = useState<"format" | "minify">("format");

  const result = useMemo(
    () => (mode === "format" ? formatJson(input) : minifyJson(input)),
    [input, mode],
  );
  const output = result.ok ? result.value : "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => setMode("format")}
          variant={mode === "format" ? "default" : "outline"}
        >
          Format
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => setMode("minify")}
          variant={mode === "minify" ? "default" : "outline"}
        >
          Minify
        </Button>
      </div>

      <ToolGrid>
        <Panel title="Input" actions={<ClearButton onClear={() => setInput("")} />}>
          <FieldLabel htmlFor="json-input">JSON input</FieldLabel>
          <CodeArea
            id="json-input"
            label="JSON input"
            value={input}
            onChange={setInput}
            invalid={!result.ok}
          />
        </Panel>
        <Panel title="Output" actions={<CopyButton value={output} />}>
          <FieldLabel htmlFor="json-output">Result</FieldLabel>
          <CodeArea id="json-output" label="Result" value={output} readOnly />
        </Panel>
      </ToolGrid>

      {!result.ok && <StatusNote kind="error">{result.error.message}</StatusNote>}
      {result.ok && <StatusNote kind="success">Valid JSON.</StatusNote>}
    </div>
  );
}
