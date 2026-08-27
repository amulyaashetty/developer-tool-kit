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
import { parseJson } from "@/lib/json-utils";
import { toCsv } from "@/lib/csv";

const SAMPLE = `[
  {"name":"John","age":25},
  {"name":"Jane","age":30}
]`;

export function JsonToCsvTool() {
  const [input, setInput] = useState(SAMPLE);

  const result = useMemo(() => {
    const parsed = parseJson(input);
    if (!parsed.ok) return parsed;
    if (!Array.isArray(parsed.value)) {
      return { ok: false as const, error: { message: "Input must be a JSON array of objects." } };
    }
    if (!parsed.value.every((v) => typeof v === "object" && v !== null && !Array.isArray(v))) {
      return { ok: false as const, error: { message: "Every array item must be a JSON object." } };
    }
    return { ok: true as const, value: toCsv(parsed.value as Record<string, unknown>[]) };
  }, [input]);

  const output = result.ok ? result.value : "";

  return (
    <div className="space-y-4">
      <ToolGrid>
        <Panel title="JSON input" actions={<ClearButton onClear={() => setInput("")} />}>
          <FieldLabel htmlFor="json-csv-input">JSON array input</FieldLabel>
          <CodeArea
            id="json-csv-input"
            label="JSON array input"
            value={input}
            onChange={setInput}
            invalid={!result.ok}
          />
        </Panel>
        <Panel
          title="CSV output"
          actions={
            <>
              <CopyButton value={output} />
              <DownloadButton value={output} filename="converted.csv" mime="text/csv" />
            </>
          }
        >
          <FieldLabel htmlFor="json-csv-output">CSV output</FieldLabel>
          <CodeArea id="json-csv-output" label="CSV output" value={output} readOnly />
        </Panel>
      </ToolGrid>
      {!result.ok && <StatusNote kind="error">{result.error.message}</StatusNote>}
    </div>
  );
}
