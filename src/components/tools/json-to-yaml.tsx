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
import { jsonToYaml } from "@/lib/yaml";

const SAMPLE = `{
  "name": "John",
  "age": 25,
  "skills": ["Python", "AWS"]
}`;

export function JsonToYamlTool() {
  const [input, setInput] = useState(SAMPLE);
  const result = useMemo(() => jsonToYaml(input), [input]);
  const output = result.ok ? result.value : "";

  return (
    <div className="space-y-4">
      <ToolGrid>
        <Panel title="JSON input" actions={<ClearButton onClear={() => setInput("")} />}>
          <FieldLabel htmlFor="json-yaml-input">JSON input</FieldLabel>
          <CodeArea
            id="json-yaml-input"
            label="JSON input"
            value={input}
            onChange={setInput}
            invalid={!result.ok}
          />
        </Panel>
        <Panel
          title="YAML output"
          actions={
            <>
              <CopyButton value={output} />
              <DownloadButton value={output} filename="converted.yaml" mime="application/yaml" />
            </>
          }
        >
          <FieldLabel htmlFor="json-yaml-output">YAML output</FieldLabel>
          <CodeArea id="json-yaml-output" label="YAML output" value={output} readOnly />
        </Panel>
      </ToolGrid>
      {!result.ok && <StatusNote kind="error">{result.error.message}</StatusNote>}
    </div>
  );
}
