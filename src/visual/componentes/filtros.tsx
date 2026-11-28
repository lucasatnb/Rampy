import { cn } from "@/lib/utils";

export type OpcaoFiltro = { id: string; rotulo: string; contagem?: number };

export function Filtros({
  opcoes,
  valor,
  onChange,
  className,
}: {
  opcoes: OpcaoFiltro[];
  valor: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Filtrar lista"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {opcoes.map((opcao) => (
        <button
          key={opcao.id}
          type="button"
          aria-pressed={valor === opcao.id}
          onClick={() => onChange(opcao.id)}
          className={cn(
            "flex min-h-11 items-center gap-2 rounded-pill border px-4 text-sm font-medium transition-colors motion-reduce:transition-none",
            valor === opcao.id
              ? "border-primary/40 bg-primary-soft text-primary-on-soft"
              : "border-border bg-surface text-text-dim hover:bg-surface-raised hover:text-text",
          )}
        >
          {opcao.rotulo}
          {opcao.contagem !== undefined ? (
            <span className="text-xs tabular-nums opacity-70">({opcao.contagem})</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
