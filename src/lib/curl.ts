export interface HeaderRow {
  key: string;
  value: string;
}

export interface CurlRequest {
  method: string;
  url: string;
  headers: HeaderRow[];
  body: string;
}

function shellEscape(value: string): string {
  return `'${value.replace(/'/g, "'\\''")}'`;
}

export function toCurlCommand(req: CurlRequest): string {
  const lines = [`curl -X ${req.method} ${shellEscape(req.url || "")}`];
  for (const h of req.headers) {
    if (!h.key) continue;
    lines.push(`  -H ${shellEscape(`${h.key}: ${h.value}`)}`);
  }
  if (req.body.trim() && req.method !== "GET") {
    lines.push(`  -d ${shellEscape(req.body)}`);
  }
  return lines.join(" \\\n");
}

export function toFetchSnippet(req: CurlRequest): string {
  const headerEntries = req.headers.filter((h) => h.key);
  const headersObj =
    headerEntries.length > 0
      ? `{\n${headerEntries.map((h) => `    ${JSON.stringify(h.key)}: ${JSON.stringify(h.value)},`).join("\n")}\n  }`
      : "{}";
  const hasBody = req.body.trim() && req.method !== "GET";
  const options = [`  method: ${JSON.stringify(req.method)}`, `  headers: ${headersObj}`];
  if (hasBody) options.push(`  body: ${JSON.stringify(req.body)}`);
  return `fetch(${JSON.stringify(req.url || "")}, {\n${options.join(",\n")}\n})\n  .then((res) => res.json())\n  .then(console.log);`;
}

export function toPythonSnippet(req: CurlRequest): string {
  const headerEntries = req.headers.filter((h) => h.key);
  const headersDict =
    headerEntries.length > 0
      ? `{\n${headerEntries.map((h) => `    ${JSON.stringify(h.key)}: ${JSON.stringify(h.value)},`).join("\n")}\n}`
      : "{}";
  const hasBody = req.body.trim() && req.method !== "GET";
  const args = [`    ${JSON.stringify(req.url || "")}`, `    headers=${headersDict}`];
  if (hasBody) args.push(`    data=${JSON.stringify(req.body)}`);
  return `import requests\n\nresponse = requests.${req.method.toLowerCase()}(\n${args.join(",\n")},\n)\nprint(response.json())`;
}
