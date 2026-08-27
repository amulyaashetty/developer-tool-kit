import { load, dump } from "js-yaml";
import { parseJson, type ParseResult } from "./json-utils";

export function jsonToYaml(text: string): ParseResult<string> {
  const parsed = parseJson(text);
  if (!parsed.ok) return parsed;
  try {
    return { ok: true, value: dump(parsed.value, { indent: 2, lineWidth: -1 }) };
  } catch (err) {
    return {
      ok: false,
      error: { message: err instanceof Error ? err.message : "Could not convert to YAML." },
    };
  }
}

export function yamlToJson(text: string, indent = 2): ParseResult<string> {
  if (!text.trim()) {
    return { ok: false, error: { message: "Input is empty. Paste some YAML to continue." } };
  }
  try {
    const value = load(text);
    return { ok: true, value: JSON.stringify(value, null, indent) };
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    const lineMatch = /line (\d+)/i.exec(raw);
    const line = lineMatch ? Number(lineMatch[1]) + 1 : undefined;
    return {
      ok: false,
      error: { message: `Invalid YAML: ${raw}`, ...(line !== undefined ? { line } : {}) },
    };
  }
}
