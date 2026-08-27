import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  ClearButton,
  CodeArea,
  CopyButton,
  FieldLabel,
  Panel,
} from "@/components/tools/primitives";
import { parseJson } from "@/lib/json-utils";

const SAMPLE = `{"name":"John","age":25,"skills":["Python","AWS"]}`;

export function JsonValidatorTool() {
  const [input, setInput] = useState(SAMPLE);
  const result = useMemo(() => parseJson(input), [input]);

  return (
    <div className="space-y-4">
      <Panel
        title="JSON to validate"
        actions={
          <>
            <CopyButton value={input} />
            <ClearButton onClear={() => setInput("")} />
          </>
        }
      >
        <FieldLabel htmlFor="json-validate-input">JSON input</FieldLabel>
        <CodeArea
          id="json-validate-input"
          label="JSON input"
          value={input}
          onChange={setInput}
          rows={16}
          invalid={!result.ok}
        />
      </Panel>

      <div
        role="status"
        className={`flex items-center gap-2 rounded-lg border px-4 py-3 font-mono text-sm ${
          result.ok
            ? "border-success/40 bg-success/10 text-success"
            : "border-destructive/40 bg-destructive/10 text-destructive"
        }`}
      >
        {result.ok ? (
          <>
            <CheckCircle2 className="size-5 shrink-0" aria-hidden />
            Valid JSON
          </>
        ) : (
          <>
            <XCircle className="size-5 shrink-0" aria-hidden />
            <span>
              Invalid JSON
              {result.error.line
                ? ` — line ${result.error.line}, column ${result.error.column}`
                : ""}
              : {result.error.message}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
