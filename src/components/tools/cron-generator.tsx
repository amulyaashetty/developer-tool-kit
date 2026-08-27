import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ClearButton,
  CopyButton,
  FieldLabel,
  Panel,
  StatusNote,
} from "@/components/tools/primitives";
import { CRON_PRESETS, explainCron, validateCron } from "@/lib/cron";

const DEFAULTS = { minute: "0", hour: "0", dom: "*", month: "*", dow: "*" };

const FIELDS: { key: keyof typeof DEFAULTS; label: string }[] = [
  { key: "minute", label: "Minute" },
  { key: "hour", label: "Hour" },
  { key: "dom", label: "Day of Month" },
  { key: "month", label: "Month" },
  { key: "dow", label: "Day of Week" },
];

export function CronGeneratorTool() {
  const [mode, setMode] = useState<"build" | "explain">("build");
  const [fields, setFields] = useState(DEFAULTS);
  const [reverseInput, setReverseInput] = useState("0 0 * * *");

  const expression = `${fields.minute} ${fields.hour} ${fields.dom} ${fields.month} ${fields.dow}`;
  const error = useMemo(() => validateCron(expression), [expression]);
  const explanation = useMemo(() => (error ? null : explainCron(expression)), [expression, error]);

  const reverseError = useMemo(() => validateCron(reverseInput), [reverseInput]);
  const reverseExplanation = useMemo(
    () => (reverseError ? null : explainCron(reverseInput)),
    [reverseInput, reverseError],
  );

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={(v) => setMode(v as "build" | "explain")}>
        <TabsList>
          <TabsTrigger value="build">Build cron</TabsTrigger>
          <TabsTrigger value="explain">Explain cron</TabsTrigger>
        </TabsList>
      </Tabs>

      {mode === "build" ? (
        <>
          <Panel title="Fields">
            <div className="grid gap-4 sm:grid-cols-5">
              {FIELDS.map(({ key, label }) => (
                <div key={key}>
                  <FieldLabel htmlFor={`cron-${key}`}>{label}</FieldLabel>
                  <Input
                    id={`cron-${key}`}
                    value={fields[key]}
                    onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="font-mono"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {CRON_PRESETS.map((preset) => (
                <Button
                  key={preset.label}
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const [minute = "*", hour = "*", dom = "*", month = "*", dow = "*"] =
                      preset.expression.split(" ");
                    setFields({ minute, hour, dom, month, dow });
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </Panel>

          <Panel
            title="Cron expression"
            actions={
              <>
                <CopyButton value={expression} label="Copy Cron" />
                <ClearButton onClear={() => setFields(DEFAULTS)} />
              </>
            }
          >
            <p className="rounded-lg border border-border bg-code px-3 py-2.5 font-mono text-sm">
              {expression}
            </p>
            <div className="mt-3">
              {error ? (
                <StatusNote kind="error">{error}</StatusNote>
              ) : (
                <StatusNote kind="success">{explanation}</StatusNote>
              )}
            </div>
          </Panel>
        </>
      ) : (
        <Panel
          title="Cron expression → explanation"
          actions={<ClearButton onClear={() => setReverseInput("")} />}
        >
          <FieldLabel htmlFor="cron-reverse">Cron expression</FieldLabel>
          <Input
            id="cron-reverse"
            value={reverseInput}
            onChange={(e) => setReverseInput(e.target.value)}
            className="font-mono"
            aria-invalid={!!reverseError}
          />
          <div className="mt-3">
            {reverseError ? (
              <StatusNote kind="error">{reverseError}</StatusNote>
            ) : (
              <StatusNote kind="success">{reverseExplanation}</StatusNote>
            )}
          </div>
        </Panel>
      )}
    </div>
  );
}
