export type UrlEncodeResult = { ok: true; value: string } | { ok: false; error: string };

export function encodeUrl(text: string, mode: "component" | "full"): UrlEncodeResult {
  try {
    return { ok: true, value: mode === "component" ? encodeURIComponent(text) : encodeURI(text) };
  } catch {
    return { ok: false, error: "Could not encode this input." };
  }
}

export function decodeUrl(text: string, mode: "component" | "full"): UrlEncodeResult {
  if (!text.trim()) return { ok: false, error: "Input is empty. Paste some text to continue." };
  try {
    return { ok: true, value: mode === "component" ? decodeURIComponent(text) : decodeURI(text) };
  } catch {
    return {
      ok: false,
      error:
        "Invalid input: contains a malformed percent-encoded sequence (a % not followed by two hex digits).",
    };
  }
}
