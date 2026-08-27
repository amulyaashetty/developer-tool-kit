export function parseCsv(text: string, delimiter = ","): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
    } else if (char === delimiter) {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => !(r.length === 1 && (r[0] ?? "").trim() === ""));
}

export function csvEscape(value: string, delimiter = ","): string {
  if (value.includes('"') || value.includes(delimiter) || /[\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function toCsv(rows: Record<string, unknown>[], delimiter = ","): string {
  const columns: string[] = [];
  for (const row of rows) {
    for (const key of Object.keys(row)) if (!columns.includes(key)) columns.push(key);
  }
  const cell = (value: unknown) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return csvEscape(JSON.stringify(value), delimiter);
    return csvEscape(String(value), delimiter);
  };
  const lines = [columns.map((c) => csvEscape(c, delimiter)).join(delimiter)];
  for (const row of rows) lines.push(columns.map((c) => cell(row[c])).join(delimiter));
  return lines.join("\n");
}
