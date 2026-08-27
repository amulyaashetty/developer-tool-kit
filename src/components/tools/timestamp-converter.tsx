import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton, FieldLabel, Panel, StatusNote } from "@/components/tools/primitives";
import { describeTimestamp, parseTimestampInput } from "@/lib/timestamp";

export function TimestampConverterTool() {
  const [tsInput, setTsInput] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState(() => new Date().toISOString().slice(0, 16));
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");

  const parsed = useMemo(() => parseTimestampInput(tsInput), [tsInput]);
  const breakdown = useMemo(() => (parsed.ok ? describeTimestamp(parsed.ms) : null), [parsed]);

  const dateMs = useMemo(() => {
    const ms = new Date(dateInput).getTime();
    return Number.isFinite(ms) ? ms : null;
  }, [dateInput]);
  const dateToTimestamp =
    dateMs === null ? "" : String(unit === "seconds" ? Math.floor(dateMs / 1000) : dateMs);

  return (
    <div className="space-y-6">
      <Panel
        title="Unix Timestamp → Date"
        actions={
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => setTsInput(String(Math.floor(Date.now() / 1000)))}
          >
            <RefreshCw className="size-3.5" aria-hidden />
            Use current timestamp
          </Button>
        }
      >
        <FieldLabel htmlFor="ts-input">Unix timestamp (seconds or milliseconds)</FieldLabel>
        <Input
          id="ts-input"
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          inputMode="numeric"
          className="font-mono"
          aria-invalid={!parsed.ok}
        />
        {!parsed.ok ? (
          <div className="mt-3">
            <StatusNote kind="error">{parsed.error}</StatusNote>
          </div>
        ) : (
          breakdown && (
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["Local", breakdown.local],
                  ["UTC", breakdown.utc],
                  ["ISO 8601", breakdown.iso],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border bg-code px-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1 flex items-center justify-between gap-2 font-mono text-[13px]">
                    <span className="min-w-0 break-words">{value}</span>
                    <CopyButton value={value} size="sm" variant="ghost" />
                  </dd>
                </div>
              ))}
            </dl>
          )
        )}
      </Panel>

      <Panel title="Date → Unix Timestamp">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <FieldLabel htmlFor="date-input">Date and time</FieldLabel>
            <Input
              id="date-input"
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>
          <div className="flex items-end gap-2">
            <Button
              type="button"
              size="sm"
              variant={unit === "seconds" ? "default" : "outline"}
              onClick={() => setUnit("seconds")}
            >
              Seconds
            </Button>
            <Button
              type="button"
              size="sm"
              variant={unit === "milliseconds" ? "default" : "outline"}
              onClick={() => setUnit("milliseconds")}
            >
              Milliseconds
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-border bg-code px-3 py-2.5">
          <span className="font-mono text-sm">{dateToTimestamp || "—"}</span>
          <CopyButton value={dateToTimestamp} size="sm" />
        </div>
      </Panel>
    </div>
  );
}
