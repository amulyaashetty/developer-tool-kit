import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, Download, Eraser, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyText, downloadText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  label = "Copy",
  size = "sm",
  variant = "outline",
  className,
}: {
  value: string;
  label?: string;
  size?: "sm" | "default";
  variant?: "outline" | "secondary" | "ghost" | "default";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => (timer.current ? clearTimeout(timer.current) : undefined), []);

  const onCopy = useCallback(async () => {
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }, [value]);

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={onCopy}
      disabled={!value}
      aria-live="polite"
      className={cn("gap-1.5", className)}
    >
      {copied ? (
        <Check className="size-4 text-success" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      {copied ? "Copied!" : label}
    </Button>
  );
}

export function DownloadButton({
  value,
  filename,
  mime = "text/plain",
  label = "Download",
}: {
  value: string;
  filename: string;
  mime?: string;
  label?: string;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="gap-1.5"
      disabled={!value}
      onClick={() => downloadText(filename, value, mime)}
    >
      <Download className="size-4" aria-hidden />
      {label}
    </Button>
  );
}

export function ClearButton({ onClear, label = "Clear" }: { onClear: () => void; label?: string }) {
  return (
    <Button type="button" size="sm" variant="ghost" className="gap-1.5" onClick={onClear}>
      <Eraser className="size-4" aria-hidden />
      {label}
    </Button>
  );
}

export function Panel({
  title,
  actions,
  children,
  className,
}: {
  title: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel flex min-w-0 flex-col overflow-hidden", className)}>
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h2>
        <div className="flex flex-wrap items-center gap-1.5">{actions}</div>
      </header>
      <div className="min-w-0 flex-1 p-3">{children}</div>
    </section>
  );
}

export function CodeArea({
  value,
  onChange,
  placeholder,
  readOnly,
  rows = 14,
  label,
  id,
  invalid,
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  label: string;
  id?: string;
  invalid?: boolean;
}) {
  return (
    <textarea
      id={id}
      aria-label={label}
      aria-invalid={invalid || undefined}
      spellCheck={false}
      autoComplete="off"
      readOnly={readOnly}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        "w-full resize-y rounded-lg border border-border bg-code px-3 py-2.5 font-mono text-[13px] leading-relaxed text-foreground outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
        readOnly && "text-muted-foreground",
        invalid &&
          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
      )}
    />
  );
}

export function StatusNote({
  kind,
  children,
}: {
  kind: "error" | "success" | "info";
  children: ReactNode;
}) {
  const Icon = kind === "error" ? AlertTriangle : CheckCircle2;
  return (
    <p
      role={kind === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 rounded-lg border px-3 py-2 font-mono text-[13px]",
        kind === "error" && "border-destructive/40 bg-destructive/10 text-destructive",
        kind === "success" && "border-success/40 bg-success/10 text-success",
        kind === "info" && "border-border bg-muted/50 text-muted-foreground",
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span className="min-w-0 break-words">{children}</span>
    </p>
  );
}

export function ToolGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 lg:grid-cols-2">{children}</div>;
}

export function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-muted-foreground">
      {children}
    </label>
  );
}
