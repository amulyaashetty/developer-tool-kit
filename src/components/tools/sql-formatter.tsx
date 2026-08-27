import { useState } from "react";
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
import { formatSql, minifySql } from "@/lib/sql";

const SAMPLE = `select id, name, email from users where active = 1 and created_at > '2024-01-01' order by created_at desc;`;

export function SqlFormatterTool() {
  const [input, setInput] = useState(SAMPLE);
  const initial = formatSql(SAMPLE);
  const [output, setOutput] = useState(initial.ok ? initial.value : "");
  const [error, setError] = useState<string | null>(initial.ok ? null : initial.error);

  const run = (fn: typeof formatSql) => {
    const result = fn(input);
    if (result.ok) {
      setOutput(result.value);
      setError(null);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={() => run(formatSql)}>
          Format SQL
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => run(minifySql)}>
          Minify SQL
        </Button>
      </div>

      <ToolGrid>
        <Panel title="SQL input" actions={<ClearButton onClear={() => setInput("")} />}>
          <FieldLabel htmlFor="sql-input">SQL input</FieldLabel>
          <CodeArea id="sql-input" label="SQL input" value={input} onChange={setInput} />
        </Panel>
        <Panel title="Output" actions={<CopyButton value={output} />}>
          <FieldLabel htmlFor="sql-output">Output</FieldLabel>
          <CodeArea id="sql-output" label="Output" value={output} readOnly />
        </Panel>
      </ToolGrid>
      {error && <StatusNote kind="error">{error}</StatusNote>}
    </div>
  );
}
