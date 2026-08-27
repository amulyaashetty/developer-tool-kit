export interface ParseFailure {
  message: string;
  line?: number;
  column?: number;
}

export type ParseResult<T> = { ok: true; value: T } | { ok: false; error: ParseFailure };

function positionFromMessage(text: string, message: string) {
  const posMatch = /position (\d+)/i.exec(message);
  if (!posMatch) return {};
  const index = Number(posMatch[1]);
  const upTo = text.slice(0, index);
  const lines = upTo.split("\n");
  return { line: lines.length, column: (lines[lines.length - 1]?.length ?? 0) + 1 };
}

export function parseJson(text: string): ParseResult<unknown> {
  if (!text.trim()) {
    return { ok: false, error: { message: "Input is empty. Paste some JSON to continue." } };
  }
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    const { line, column } = positionFromMessage(text, raw);
    const cleaned = raw.replace(/^JSON\.parse:\s*/, "").replace(/\s*in JSON at position.*$/, "");
    const suffix = line ? ` at line ${line}, column ${column}.` : ".";
    return {
      ok: false,
      error: {
        message: `Invalid JSON: ${cleaned}${suffix}`,
        ...(line !== undefined ? { line } : {}),
        ...(column !== undefined ? { column } : {}),
      },
    };
  }
}

export function formatJson(text: string, indent = 2): ParseResult<string> {
  const parsed = parseJson(text);
  if (!parsed.ok) return parsed;
  return { ok: true, value: JSON.stringify(parsed.value, null, indent) };
}

export function minifyJson(text: string): ParseResult<string> {
  const parsed = parseJson(text);
  if (!parsed.ok) return parsed;
  return { ok: true, value: JSON.stringify(parsed.value) };
}
