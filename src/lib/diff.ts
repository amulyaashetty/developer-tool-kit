export type DiffType = "equal" | "added" | "removed";

export interface DiffLine {
  type: DiffType;
  text: string;
  leftNumber?: number;
  rightNumber?: number;
}

export function diffLines(a: string, b: string): DiffLine[] {
  const left = a.split("\n");
  const right = b.split("\n");
  const n = left.length;
  const m = right.length;

  // Bounds below are always within [0, n] / [0, m] by construction, so the
  // non-null assertions are safe even with noUncheckedIndexedAccess enabled.
  const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const row = lcs[i]!;
      row[j] =
        left[i] === right[j] ? lcs[i + 1]![j + 1]! + 1 : Math.max(lcs[i + 1]![j]!, lcs[i]![j + 1]!);
    }
  }

  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    const leftLine = left[i]!;
    const rightLine = right[j]!;
    if (leftLine === rightLine) {
      out.push({ type: "equal", text: leftLine, leftNumber: i + 1, rightNumber: j + 1 });
      i++;
      j++;
    } else if (lcs[i + 1]![j]! >= lcs[i]![j + 1]!) {
      out.push({ type: "removed", text: leftLine, leftNumber: i + 1 });
      i++;
    } else {
      out.push({ type: "added", text: rightLine, rightNumber: j + 1 });
      j++;
    }
  }
  while (i < n) out.push({ type: "removed", text: left[i]!, leftNumber: ++i });
  while (j < m) out.push({ type: "added", text: right[j]!, rightNumber: ++j });
  return out;
}

export function diffStats(lines: DiffLine[]) {
  return {
    added: lines.filter((l) => l.type === "added").length,
    removed: lines.filter((l) => l.type === "removed").length,
    unchanged: lines.filter((l) => l.type === "equal").length,
  };
}

export function diffToText(lines: DiffLine[]): string {
  return lines
    .map((l) => `${l.type === "added" ? "+" : l.type === "removed" ? "-" : " "} ${l.text}`)
    .join("\n");
}
