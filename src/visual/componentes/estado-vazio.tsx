import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

export function EstadoVazio({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao: string;
  acao?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-surface-raised px-6 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary-on-soft">
        <Inbox size={22} aria-hidden="true" />
      </span>
      <p className="font-display text-base font-semibold text-text">{titulo}</p>
      <p className="max-w-md text-sm text-text-dim">{descricao}</p>
      {acao}
    </div>
  );
}
