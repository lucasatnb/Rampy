import type { LucideIcon } from "lucide-react";
import type { Kpi } from "@/dados/gestor";
import { BarraProgresso } from "@/components/componentes/progresso";

export function CartaoKpi({ kpi }: { kpi: Kpi }) {
  return (
    <article className="sombra-card rounded-card border border-border bg-surface p-5">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-icon bg-primary-soft text-primary-on-soft">
          <kpi.icone size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-3xl font-bold text-text">{kpi.valor}</p>
          <p className="text-sm text-text-dim">{kpi.rotulo}</p>
        </div>
      </div>
      {kpi.delta ? (
        <p className="mt-4 text-xs font-semibold text-success-fg">↑ {kpi.delta}</p>
      ) : null}
      {kpi.progresso !== undefined ? (
        <BarraProgresso valor={kpi.progresso} className="mt-5" />
      ) : null}
    </article>
  );
}

export function LinhaKpis({
  itens,
}: {
  itens: { rotulo: string; valor: string; icone: LucideIcon }[];
}) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {itens.map((item) => (
        <CartaoKpi key={item.rotulo} kpi={item} />
      ))}
    </div>
  );
}
