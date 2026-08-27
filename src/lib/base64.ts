export type Base64Result = { ok: true; value: string } | { ok: false; error: string };

export function encodeBase64(text: string): Base64Result {
  try {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { ok: true, value: btoa(binary) };
  } catch {
    return { ok: false, error: "Could not encode this input to Base64." };
  }
}

export function decodeBase64(value: string): Base64Result {
  const trimmed = value.trim();
  if (!trimmed) return { ok: false, error: "Input is empty. Paste some Base64 to continue." };
  if (!/^[A-Za-z0-9+/=\s]+$/.test(trimmed)) {
    return { ok: false, error: "Invalid Base64: contains characters outside the Base64 alphabet." };
  }
  try {
    const binary = atob(trimmed.replace(/\s+/g, ""));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return { ok: true, value: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return {
      ok: false,
      error: "Invalid Base64: the input is not correctly padded or is not valid UTF-8.",
    };
  }
}
