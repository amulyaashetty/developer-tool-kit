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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseCsv } from "@/lib/csv";

const SAMPLE = `name,age\nJohn,25\nJane,30`;

const DELIMITERS: { label: string; value: string }[] = [
  { label: "Comma (,)", value: "," },
  { label: "Tab", value: "\t" },
  { label: "Semicolon (;)", value: ";" },
  { label: "Pipe (|)", value: "|" },
];

export function CsvToJsonTool() {
  const [input, setInput] = useState(SAMPLE);
  const [hasHeader, setHasHeader] = useState(true);
  const [delimiter, setDelimiter] = useState(",");

  const result = useMemo(() => {
    if (!input.trim())
      return { ok: false as const, error: "Input is empty. Paste some CSV to continue." };
    try {
      const rows = parseCsv(input, delimiter);
      if (rows.length === 0) return { ok: false as const, error: "No rows found." };
      const firstRow = rows[0] ?? [];
      const header = hasHeader ? firstRow : firstRow.map((_, i) => `field_${i + 1}`);
      const dataRows = hasHeader ? rows.slice(1) : rows;
      const objects = dataRows.map((row) =>
        Object.fromEntries(header.map((key, i) => [key, row[i] ?? ""])),
      );
      return { ok: true as const, value: JSON.stringify(objects, null, 2) };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Could not parse this CSV.",
      };
    }
  }, [input, delimiter, hasHeader]);

  const output = result.ok ? result.value : "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={hasHeader} onCheckedChange={(v) => setHasHeader(v === true)} />
          Has header row
        </label>
        <div className="flex items-center gap-2">
          <FieldLabel htmlFor="csv-delimiter">Delimiter</FieldLabel>
          <Select value={delimiter} onValueChange={setDelimiter}>
            <SelectTrigger id="csv-delimiter" className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DELIMITERS.map((d) => (
                <SelectItem key={d.label} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ToolGrid>
        <Panel title="CSV input" actions={<ClearButton onClear={() => setInput("")} />}>
          <FieldLabel htmlFor="csv-json-input">CSV input</FieldLabel>
          <CodeArea
            id="csv-json-input"
            label="CSV input"
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
          <FieldLabel htmlFor="csv-json-output">JSON output</FieldLabel>
          <CodeArea id="csv-json-output" label="JSON output" value={output} readOnly />
        </Panel>
      </ToolGrid>
      {!result.ok && <StatusNote kind="error">{result.error}</StatusNote>}
    </div>
  );
}
