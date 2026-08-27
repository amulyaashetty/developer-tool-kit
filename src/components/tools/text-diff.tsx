import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ClearButton,
  CodeArea,
  CopyButton,
  FieldLabel,
  Panel,
  ToolGrid,
} from "@/components/tools/primitives";
import { cn } from "@/lib/utils";
import { diffLines, diffStats, diffToText } from "@/lib/diff";

const SAMPLE_A = 'function greet(name) {\n  return "Hello " + name;\n}\n';
const SAMPLE_B = "function greet(name) {\n  return `Hello, ${name}!`;\n}\n";

export function TextDiffTool() {
  const [left, setLeft] = useState(SAMPLE_A);
  const [right, setRight] = useState(SAMPLE_B);
  const [compared, setCompared] = useState(true);

  const lines = useMemo(() => diffLines(left, right), [left, right]);
  const stats = useMemo(() => diffStats(lines), [lines]);
  const output = useMemo(() => diffToText(lines), [lines]);

  return (
    <div className="space-y-4">
      <ToolGrid>
        <Panel title="Original text" actions={<ClearButton onClear={() => setLeft("")} />}>
          <FieldLabel htmlFor="diff-left">Original text</FieldLabel>
          <CodeArea id="diff-left" label="Original text" value={left} onChange={setLeft} />
        </Panel>
        <Panel title="Modified text" actions={<ClearButton onClear={() => setRight("")} />}>
          <FieldLabel htmlFor="diff-right">Modified text</FieldLabel>
          <CodeArea id="diff-right" label="Modified text" value={right} onChange={setRight} />
        </Panel>
      </ToolGrid>

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" onClick={() => setCompared(true)}>
          Compare
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1.5"
          onClick={() => {
            setLeft(right);
            setRight(left);
          }}
        >
          <ArrowLeftRight className="size-3.5" aria-hidden />
          Swap inputs
        </Button>
        <CopyButton value={output} label="Copy result" />
        {compared && (
          <span className="ml-auto text-xs text-muted-foreground">
            <span className="text-success">+{stats.added}</span> ·{" "}
            <span className="text-destructive">-{stats.removed}</span> · {stats.unchanged} unchanged
          </span>
        )}
      </div>

      {compared && (
        <Panel title="Comparison">
          <div className="overflow-x-auto rounded-lg border border-border bg-code">
            <pre className="min-w-full font-mono text-[13px] leading-6">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3 px-3",
                    line.type === "added" && "bg-success/10 text-success",
                    line.type === "removed" && "bg-destructive/10 text-destructive",
                  )}
                >
                  <span className="w-4 shrink-0 select-none">
                    {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                  </span>
                  <span className="whitespace-pre-wrap break-all">{line.text || "\u00A0"}</span>
                </div>
              ))}
            </pre>
          </div>
        </Panel>
      )}
    </div>
  );
}
