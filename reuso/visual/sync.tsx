import { useState } from "react";
import { CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/chip";
import { cn } from "@/lib/utils";
import { useUI } from "@/app/estado-ui";
import { sincronizarAgora } from "@/app/sync";

export function IndicadorSync({ className }: { className?: string }) {
  const sincronizando = useUI((s) => s.sincronizando);
  const erro = useUI((s) => s.erroSync);
  if (sincronizando) return <Chip className={className}>Sincronizando…</Chip>;
  if (erro) return <Chip variant="erro" className={className}>Sem sincronizar</Chip>;
  return null;
}

export function BannerSync({ className }: { className?: string }) {
  const erro = useUI((s) => s.erroSync);
  const sincronizando = useUI((s) => s.sincronizando);
  const [tentando, setTentando] = useState(false);
  if (!erro) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mb-5 flex flex-wrap items-center gap-3 rounded-card border border-warn/30 bg-warn/10 px-4 py-3",
        className,
      )}
    >
      <CloudOff className="size-5 shrink-0 text-warn" aria-hidden="true" />
      <p className="min-w-[12rem] flex-1 text-sm text-text-dim">
        Sem conexão com o servidor agora. Seu progresso está salvo neste aparelho.
      </p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="min-h-11"
        disabled={tentando || sincronizando}
        onClick={async () => {
          setTentando(true);
          await sincronizarAgora();
          setTentando(false);
        }}
      >
        {tentando ? "Tentando…" : "Tentar de novo"}
      </Button>
    </div>
  );
}
