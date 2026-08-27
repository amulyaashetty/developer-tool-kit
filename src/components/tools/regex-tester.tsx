import { Fragment, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ClearButton,
  CodeArea,
  FieldLabel,
  Panel,
  StatusNote,
} from "@/components/tools/primitives";
import { cn } from "@/lib/utils";
import { REGEX_EXAMPLES, runRegex } from "@/lib/regex";

const FLAGS = ["g", "i", "m", "s", "u"] as const;

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("[\\w.+-]+@[\\w-]+\\.[\\w.-]+");
  const [flags, setFlags] = useState<string[]>(["g", "i"]);
  const [text, setText] = useState("Contact us at hello@devtoolkit.dev or support@example.com.");

  const result = useMemo(() => runRegex(pattern, flags.join(""), text), [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (!result.ok || result.matches.length === 0) return null;
    const parts: { text: string; match: boolean }[] = [];
    let cursor = 0;
    for (const m of result.matches) {
      if (m.index > cursor) parts.push({ text: text.slice(cursor, m.index), match: false });
      parts.push({ text: m.match, match: true });
      cursor = m.index + m.match.length;
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false });
    return parts;
  }, [result, text]);

  return (
    <div className="space-y-4">
      <Panel title="Pattern">
        <FieldLabel htmlFor="regex-pattern">Regex pattern</FieldLabel>
        <div className="flex items-center gap-2">
          <span className="font-mono text-muted-foreground">/</span>
          <Input
            id="regex-pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="font-mono"
            aria-invalid={!result.ok}
          />
          <span className="font-mono text-muted-foreground">/{flags.join("")}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {FLAGS.map((flag) => (
            <Button
              key={flag}
              type="button"
              size="sm"
              variant={flags.includes(flag) ? "default" : "outline"}
              onClick={() =>
                setFlags((prev) =>
                  prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag],
                )
              }
            >
              {flag}
            </Button>
          ))}
        </div>
      </Panel>

      <Panel title="Test string" actions={<ClearButton onClear={() => setText("")} />}>
        <FieldLabel htmlFor="regex-text">Test string</FieldLabel>
        <CodeArea id="regex-text" label="Test string" value={text} onChange={setText} rows={8} />
      </Panel>

      {!result.ok ? (
        <StatusNote kind="error">{result.error}</StatusNote>
      ) : (
        <Panel title={`Matches (${result.matches.length})`}>
          {highlighted && (
            <p className="mb-4 whitespace-pre-wrap break-words rounded-lg border border-border bg-code px-3 py-2.5 font-mono text-[13px] leading-relaxed">
              {highlighted.map((part, i) => (
                <Fragment key={i}>
                  {part.match ? (
                    <mark className="rounded bg-primary/25 text-foreground">{part.text}</mark>
                  ) : (
                    part.text
                  )}
                </Fragment>
              ))}
            </p>
          )}
          {result.matches.length === 0 ? (
            <p className="text-sm text-muted-foreground">No matches found.</p>
          ) : (
            <ul className="space-y-2">
              {result.matches.map((m, i) => (
                <li key={i} className="rounded-lg border border-border bg-code px-3 py-2.5 text-sm">
                  <div className="flex flex-wrap items-center gap-2 font-mono">
                    <span className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">
                      {m.match}
                    </span>
                    <span className="text-xs text-muted-foreground">at index {m.index}</span>
                  </div>
                  {m.groups.length > 0 && (
                    <p className={cn("mt-1.5 font-mono text-xs text-muted-foreground")}>
                      Groups: {m.groups.map((g) => g ?? "—").join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Panel>
      )}

      <Panel title="Common regex examples">
        <div className="flex flex-wrap gap-2">
          {REGEX_EXAMPLES.map((ex) => (
            <Button
              key={ex.label}
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setPattern(ex.pattern);
                setFlags(ex.flags.split(""));
              }}
            >
              {ex.label}
            </Button>
          ))}
        </div>
      </Panel>
    </div>
  );
}
