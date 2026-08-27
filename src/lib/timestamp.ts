export interface TimestampBreakdown {
  local: string;
  utc: string;
  iso: string;
  relative: string;
}

export function describeTimestamp(ms: number): TimestampBreakdown {
  const date = new Date(ms);
  const local = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  const utc = date.toUTCString();
  const iso = date.toISOString();
  const relative = relativeTime(ms);
  return { local, utc, iso, relative };
}

function relativeTime(ms: number): string {
  const diffSeconds = Math.round((ms - Date.now()) / 1000);
  const abs = Math.abs(diffSeconds);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  for (const [unit, secondsInUnit] of units) {
    if (abs >= secondsInUnit || unit === "second") {
      const value = Math.round(diffSeconds / secondsInUnit);
      return rtf.format(value, unit);
    }
  }
  return rtf.format(0, "second");
}

export type ParsedTimestamp = { ok: true; ms: number } | { ok: false; error: string };

export function parseTimestampInput(input: string): ParsedTimestamp {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: "Enter a Unix timestamp to convert." };
  if (!/^-?\d+$/.test(trimmed)) {
    return {
      ok: false,
      error: "Timestamp must be an integer (seconds or milliseconds since epoch).",
    };
  }
  const value = Number(trimmed);
  // 10-digit numbers are seconds, 13-digit numbers are milliseconds.
  const ms = Math.abs(value) < 1e11 ? value * 1000 : value;
  if (!Number.isFinite(ms)) return { ok: false, error: "Timestamp is out of range." };
  return { ok: true, ms };
}
