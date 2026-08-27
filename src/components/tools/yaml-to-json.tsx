import { useMemo, useState } from "react";
import {
  ClearButton,
  CodeArea,
  CopyButton,
  DownloadButton,
  FieldLabel,
  Panel,
  StatusNote,
  ToolGrid,
} from "@/components/tools/primitives";
import { yamlToJson } from "@/lib/yaml";

const SAMPLE = `name: John\nage: 25\nskills:\n  - Python\n  - AWS\n`;

export function YamlToJsonTool() {
  const [input, setInput] = useState(SAMPLE);
  const result = useMemo(() => yamlToJson(input), [input]);
  const output = result.ok ? result.value : "";

  return (
    <div className="space-y-4">
      <ToolGrid>
        <Panel title="YAML input" actions={<ClearButton onClear={() => setInput("")} />}>
          <FieldLabel htmlFor="yaml-json-input">YAML input</FieldLabel>
          <CodeArea
            id="yaml-json-input"
            label="YAML input"
            value={input}
            onChange={setInput}
            invalid={!result.ok}
          />
        </Panel>
        <Panel
          title="JSON output"
          actions={
            <>
              <CopyButton value={output} />
              <DownloadButton value={output} filename="converted.json" mime="application/json" />
            </>
          }
        >
          <FieldLabel htmlFor="yaml-json-output">JSON output</FieldLabel>
          <CodeArea id="yaml-json-output" label="JSON output" value={output} readOnly />
        </Panel>
      </ToolGrid>
      {!result.ok && <StatusNote kind="error">{result.error.message}</StatusNote>}
    </div>
  );
}
