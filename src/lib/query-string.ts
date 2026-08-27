export interface QueryParam {
  id: string;
  key: string;
  value: string;
}

let counter = 0;
function nextId(): string {
  counter += 1;
  return `qp-${counter}-${Date.now()}`;
}

export function parseQueryInput(input: string): { base: string; params: QueryParam[] } {
  const trimmed = input.trim();
  const qIndex = trimmed.indexOf("?");
  const hasUrl = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) || trimmed.includes("/");
  const base = qIndex >= 0 ? trimmed.slice(0, qIndex) : hasUrl ? trimmed : "";
  const queryPart =
    qIndex >= 0 ? trimmed.slice(qIndex + 1) : qIndex === -1 && !hasUrl ? trimmed : "";

  const params: QueryParam[] = [];
  if (queryPart) {
    for (const pair of queryPart.split("&")) {
      if (!pair) continue;
      const [rawKey = "", ...rest] = pair.split("=");
      const rawValue = rest.join("=");
      try {
        params.push({
          id: nextId(),
          key: decodeURIComponent(rawKey.replace(/\+/g, " ")),
          value: decodeURIComponent(rawValue.replace(/\+/g, " ")),
        });
      } catch {
        params.push({ id: nextId(), key: rawKey, value: rawValue });
      }
    }
  }
  return { base, params };
}

export function createEmptyParam(): QueryParam {
  return { id: nextId(), key: "", value: "" };
}

export function buildQueryString(params: QueryParam[]): string {
  return params
    .filter((p) => p.key)
    .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
    .join("&");
}

export function buildFullUrl(base: string, params: QueryParam[]): string {
  const qs = buildQueryString(params);
  if (!base) return qs ? `?${qs}` : "";
  return qs ? `${base}?${qs}` : base;
}
