const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ORDINAL_SUFFIXES = ["th", "st", "nd", "rd"];

const ordinal = (n: number) => {
  const v = n % 100;
  const suffix =
    ORDINAL_SUFFIXES[(v - 20) % 10] ?? ORDINAL_SUFFIXES[v] ?? ORDINAL_SUFFIXES[0] ?? "";
  return `${n}${suffix}`;
};

function validateField(field: string, min: number, max: number, name: string): string | null {
  if (field === "*") return null;
  for (const part of field.split(",")) {
    const [range = "", step] = part.split("/");
    if (step !== undefined && (!/^\d+$/.test(step) || Number(step) === 0)) {
      return `Invalid step "${step}" in the ${name} field.`;
    }
    if (range === "*") continue;
    const bounds = range.split("-");
    if (bounds.length > 2) return `Invalid range "${range}" in the ${name} field.`;
    for (const b of bounds) {
      if (!/^\d+$/.test(b) || Number(b) < min || Number(b) > max) {
        return `Invalid value "${b}" in the ${name} field (allowed ${min}-${max}).`;
      }
    }
  }
  return null;
}

export function validateCron(expression: string): string | null {
  const fields = expression.trim().split(/\s+/);
  if (fields.length !== 5) {
    return `A cron expression needs exactly 5 fields, found ${fields.length}.`;
  }
  const [minute = "", hour = "", dom = "", month = "", dow = ""] = fields;
  return (
    validateField(minute, 0, 59, "minute") ??
    validateField(hour, 0, 23, "hour") ??
    validateField(dom, 1, 31, "day of month") ??
    validateField(month, 1, 12, "month") ??
    validateField(dow, 0, 7, "day of week")
  );
}

function describeList(field: string, format: (n: number) => string): string {
  return field
    .split(",")
    .map((part) => {
      const [range = "", step] = part.split("/");
      if (step) {
        const base = range === "*" ? "" : ` from ${range.replace("-", " through ")}`;
        return `every ${step} units${base}`;
      }
      if (range.includes("-")) {
        const [a = "0", b = "0"] = range.split("-");
        return `${format(Number(a))} through ${format(Number(b))}`;
      }
      return format(Number(range));
    })
    .join(", ");
}

export function explainCron(expression: string): string {
  const error = validateCron(expression);
  if (error) return error;
  const [minute = "", hour = "", dom = "", month = "", dow = ""] = expression.trim().split(/\s+/);

  let time: string;
  if (minute === "*" && hour === "*") time = "Runs every minute";
  else if (minute.startsWith("*/") && hour === "*") time = `Runs every ${minute.slice(2)} minutes`;
  else if (hour === "*") time = `Runs at minute ${describeList(minute, String)} of every hour`;
  else if (minute === "*") time = `Runs every minute during hour ${describeList(hour, String)}`;
  else if (hour.startsWith("*/"))
    time = `Runs every ${hour.slice(2)} hours at minute ${describeList(minute, String)}`;
  else {
    const h = Number(hour.split(",")[0]?.split("-")[0] ?? "");
    const m = Number(minute.split(",")[0]?.split("-")[0] ?? "");
    const clock =
      !Number.isNaN(h) && !Number.isNaN(m) && !hour.includes(",") && !minute.includes(",")
        ? ` (${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")})`
        : "";
    time = `Runs at hour ${describeList(hour, String)}, minute ${describeList(minute, String)}${clock}`;
  }

  const parts: string[] = [];
  if (dom !== "*") parts.push(`on the ${describeList(dom, (n) => ordinal(n))} of the month`);
  if (month !== "*") parts.push(`in ${describeList(month, (n) => MONTHS[(n - 1) % 12] ?? "")}`);
  if (dow !== "*") parts.push(`on ${describeList(dow, (n) => DAYS[n % 7] ?? "")}`);
  if (dom === "*" && dow === "*" && month === "*") parts.push("every day");

  return `${time} ${parts.join(", ")}.`.replace(/\s+/g, " ");
}

export interface CronPreset {
  label: string;
  expression: string;
}

export const CRON_PRESETS: CronPreset[] = [
  { label: "Every minute", expression: "* * * * *" },
  { label: "Every 5 minutes", expression: "*/5 * * * *" },
  { label: "Every 15 minutes", expression: "*/15 * * * *" },
  { label: "Every hour", expression: "0 * * * *" },
  { label: "Every day at midnight", expression: "0 0 * * *" },
  { label: "Every weekday at 09:00", expression: "0 9 * * 1-5" },
  { label: "Every Sunday at 03:00", expression: "0 3 * * 0" },
  { label: "First day of the month", expression: "0 0 1 * *" },
];
