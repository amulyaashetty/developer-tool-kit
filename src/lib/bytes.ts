export const BYTE_UNITS = ["Bytes", "KB", "MB", "GB", "TB", "PB"] as const;
export type ByteUnit = (typeof BYTE_UNITS)[number];

export function convertBytes(
  value: number,
  unit: ByteUnit,
  base: 1024 | 1000,
): Record<ByteUnit, number> {
  const index = BYTE_UNITS.indexOf(unit);
  const bytes = value * base ** index;
  const result = {} as Record<ByteUnit, number>;
  BYTE_UNITS.forEach((u, i) => {
    result[u] = bytes / base ** i;
  });
  return result;
}

export function formatByteValue(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.abs(value) >= 1 ? Number(value.toFixed(6)) : value;
  return rounded.toLocaleString(undefined, { maximumFractionDigits: 6 });
}
