import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClearButton,
  CodeArea,
  CopyButton,
  FieldLabel,
  Panel,
  StatusNote,
  ToolGrid,
} from "@/components/tools/primitives";
import { decodeBase64, encodeBase64 } from "@/lib/base64";

export function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello, DevToolkit!");

  const result = useMemo(
    () => (mode === "encode" ? encodeBase64(input) : decodeBase64(input)),
    [input, mode],
  );
  const output = result.ok ? result.value : "";

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={(v) => setMode(v as "encode" | "decode")}>
        <TabsList>
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
      </Tabs>

      <ToolGrid>
        <Panel
          title={mode === "encode" ? "Text" : "Base64"}
          actions={<ClearButton onClear={() => setInput("")} />}
        >
          <FieldLabel htmlFor="base64-input">
            {mode === "encode" ? "Text input" : "Base64 input"}
          </FieldLabel>
          <CodeArea
            id="base64-input"
            label={mode === "encode" ? "Text input" : "Base64 input"}
            value={input}
            onChange={setInput}
            invalid={!result.ok}
          />
        </Panel>
        <Panel
          title={mode === "encode" ? "Base64" : "Text"}
          actions={<CopyButton value={output} />}
        >
          <FieldLabel htmlFor="base64-output">
            {mode === "encode" ? "Base64 output" : "Text output"}
          </FieldLabel>
          <CodeArea id="base64-output" label="Output" value={output} readOnly />
        </Panel>
      </ToolGrid>
      {!result.ok && <StatusNote kind="error">{result.error}</StatusNote>}
    </div>
  );
}
