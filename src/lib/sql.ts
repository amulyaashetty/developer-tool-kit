import { format } from "sql-formatter";

export type SqlResult = { ok: true; value: string } | { ok: false; error: string };

export function formatSql(text: string): SqlResult {
  if (!text.trim()) return { ok: false, error: "Input is empty. Paste some SQL to continue." };
  try {
    return {
      ok: true,
      value: format(text, { language: "sql", keywordCase: "upper", tabWidth: 2 }),
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Could not format this SQL." };
  }
}

export function minifySql(text: string): SqlResult {
  if (!text.trim()) return { ok: false, error: "Input is empty. Paste some SQL to continue." };
  const minified = text
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();
  return { ok: true, value: minified };
}
