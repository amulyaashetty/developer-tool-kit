export interface DecodedJwt {
  header: unknown;
  payload: unknown;
  signature: string;
}

export type JwtResult = { ok: true; value: DecodedJwt } | { ok: false; error: string };

function base64UrlDecode(segment: string): string {
  const padded = segment
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(segment.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export function decodeJwt(token: string): JwtResult {
  const trimmed = token.trim();
  if (!trimmed) return { ok: false, error: "Paste a JWT to decode it." };

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return {
      ok: false,
      error: `A JWT needs 3 dot-separated parts (header.payload.signature); found ${parts.length}.`,
    };
  }

  try {
    const [rawHeader, rawPayload, signature] = parts as [string, string, string];
    const header = JSON.parse(base64UrlDecode(rawHeader));
    const payload = JSON.parse(base64UrlDecode(rawPayload));
    return { ok: true, value: { header, payload, signature } };
  } catch {
    return {
      ok: false,
      error: "Could not decode this token. Header and payload must be Base64URL-encoded JSON.",
    };
  }
}
