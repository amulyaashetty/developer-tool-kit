import { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import {
  ClearButton,
  CodeArea,
  CopyButton,
  FieldLabel,
  Panel,
  StatusNote,
  ToolGrid,
} from "@/components/tools/primitives";
import { decodeJwt } from "@/lib/jwt";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export function JwtDecoderTool() {
  const [input, setInput] = useState(SAMPLE);
  const result = useMemo(() => decodeJwt(input), [input]);

  const header = result.ok ? JSON.stringify(result.value.header, null, 2) : "";
  const payload = result.ok ? JSON.stringify(result.value.payload, null, 2) : "";

  return (
    <div className="space-y-4">
      <Panel title="JWT" actions={<ClearButton onClear={() => setInput("")} />}>
        <FieldLabel htmlFor="jwt-input">Token</FieldLabel>
        <CodeArea
          id="jwt-input"
          label="JWT"
          value={input}
          onChange={setInput}
          rows={6}
          invalid={!result.ok}
        />
      </Panel>

      <StatusNote kind="info">
        Decoded locally in your browser. Do not paste sensitive production tokens.
      </StatusNote>

      {!result.ok && <StatusNote kind="error">{result.error}</StatusNote>}

      {result.ok && (
        <>
          <ToolGrid>
            <Panel title="Header" actions={<CopyButton value={header} />}>
              <FieldLabel htmlFor="jwt-header">Header</FieldLabel>
              <CodeArea id="jwt-header" label="Header" value={header} readOnly rows={10} />
            </Panel>
            <Panel title="Payload" actions={<CopyButton value={payload} />}>
              <FieldLabel htmlFor="jwt-payload">Payload</FieldLabel>
              <CodeArea id="jwt-payload" label="Payload" value={payload} readOnly rows={10} />
            </Panel>
          </ToolGrid>

          <Panel title="Signature">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
              <div>
                <p className="break-all font-mono text-xs text-foreground">
                  {result.value.signature}
                </p>
                <p className="mt-2">
                  This is the raw signature segment. It is not verified — no signing key was
                  provided, and this tool never claims to validate a signature it can't check.
                </p>
              </div>
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}
