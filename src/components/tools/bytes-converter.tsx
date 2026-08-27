import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyButton, FieldLabel, Panel } from "@/components/tools/primitives";
import { BYTE_UNITS, convertBytes, formatByteValue, type ByteUnit } from "@/lib/bytes";

export function BytesConverterTool() {
  const [value, setValue] = useState("1");
  const [unit, setUnit] = useState<ByteUnit>("GB");
  const [base, setBase] = useState<1024 | 1000>(1024);

  const numeric = Number(value);
  const results = useMemo(
    () => (Number.isFinite(numeric) ? convertBytes(numeric, unit, base) : null),
    [numeric, unit, base],
  );

  return (
    <div className="space-y-4">
      <Panel title="Value">
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
          <div>
            <FieldLabel htmlFor="bytes-value">Number</FieldLabel>
            <Input
              id="bytes-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              inputMode="decimal"
            />
          </div>
          <div>
            <FieldLabel htmlFor="bytes-unit">Unit</FieldLabel>
            <Select value={unit} onValueChange={(v) => setUnit(v as ByteUnit)}>
              <SelectTrigger id="bytes-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BYTE_UNITS.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button
              type="button"
              size="sm"
              variant={base === 1024 ? "default" : "outline"}
              onClick={() => setBase(1024)}
            >
              Binary (1024)
            </Button>
            <Button
              type="button"
              size="sm"
              variant={base === 1000 ? "default" : "outline"}
              onClick={() => setBase(1000)}
            >
              Decimal (1000)
            </Button>
          </div>
        </div>
      </Panel>

      <Panel title="Equivalent values">
        {results ? (
          <dl className="grid gap-2 sm:grid-cols-2">
            {BYTE_UNITS.map((u) => (
              <div
                key={u}
                className="flex items-center justify-between gap-2 rounded-lg border border-border bg-code px-3 py-2.5"
              >
                <dt className="text-sm text-muted-foreground">{u}</dt>
                <dd className="flex items-center gap-2 font-mono text-sm">
                  {formatByteValue(results[u])}
                  <CopyButton value={formatByteValue(results[u])} size="sm" variant="ghost" />
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">Enter a valid number to see conversions.</p>
        )}
      </Panel>
    </div>
  );
}
