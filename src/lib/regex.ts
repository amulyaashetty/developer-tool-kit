export interface RegexMatch {
  match: string;
  index: number;
  groups: (string | undefined)[];
  namedGroups?: Record<string, string | undefined>;
}

export type RegexResult = { ok: true; matches: RegexMatch[] } | { ok: false; error: string };

export function runRegex(pattern: string, flags: string, input: string): RegexResult {
  if (!pattern) return { ok: false, error: "Enter a regex pattern to test." };
  let re: RegExp;
  try {
    re = new RegExp(pattern, flags.includes("g") ? flags : `${flags}g`);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Invalid regular expression." };
  }

  const matches: RegexMatch[] = [];
  let m: RegExpExecArray | null;
  let guard = 0;
  while ((m = re.exec(input)) !== null) {
    matches.push({
      match: m[0],
      index: m.index,
      groups: m.slice(1),
      ...(m.groups !== undefined ? { namedGroups: m.groups } : {}),
    });
    if (m[0] === "") re.lastIndex++;
    guard++;
    if (guard > 5000) break; // safety net against pathological patterns
  }
  return { ok: true, matches };
}

export interface RegexExample {
  label: string;
  pattern: string;
  flags: string;
}

export const REGEX_EXAMPLES: RegexExample[] = [
  { label: "Email", pattern: "[\\w.+-]+@[\\w-]+\\.[\\w.-]+", flags: "g" },
  { label: "URL", pattern: "https?:\\/\\/[^\\s]+", flags: "g" },
  { label: "Numbers", pattern: "-?\\d+(\\.\\d+)?", flags: "g" },
  { label: "Phone number", pattern: "\\+?\\d[\\d\\s-]{7,}\\d", flags: "g" },
  { label: "Whitespace", pattern: "\\s+", flags: "g" },
];
