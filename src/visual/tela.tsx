import type { ComponentType, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Tela({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1100px] px-4 pt-6 pb-4 sm:px-6 md:pt-10 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function Cabecalho({
  sobretitulo,
  titulo,
  descricao,
  acao,
}: {
  sobretitulo: string;
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4 md:mb-8">
      <div className="max-w-[62ch]">
        <p className="mb-2 font-display text-sm font-semibold tracking-[0.18em] text-primary-on-soft uppercase">
          {sobretitulo}
        </p>
        <h1 className="text-[28px] font-semibold text-text md:text-[34px]">{titulo}</h1>
        {descricao ? <p className="mt-2 text-[15px] text-text-dim md:text-base">{descricao}</p> : null}
      </div>
      {acao ? <div className="shrink-0">{acao}</div> : null}
    </header>
  );
}

export function EstadoVazio({
  icone: Icone,
  titulo,
  descricao,
  acao,
  className,
}: {
  icone: ComponentType<{ className?: string }>;
  titulo: string;
  descricao: string;
  acao?: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center gap-3 rounded-card border-border bg-surface px-6 py-10 text-center",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-full border border-primary/30 bg-primary-soft text-primary-on-soft">
        <Icone className="size-5" />
      </span>
      <h2 className="font-display text-xl font-semibold text-text">{titulo}</h2>
      <p className="max-w-[42ch] text-sm text-text-dim">{descricao}</p>
      {acao ? <div className="mt-2">{acao}</div> : null}
    </Card>
  );
}

export function LinhaEstatistica({
  rotulo,
  valor,
  icone: Icone,
}: {
  rotulo: string;
  valor: ReactNode;
  icone: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-surface-raised px-2 py-3 sm:gap-3 sm:px-3">
      <span className="hidden size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-on-soft sm:grid">
        <Icone className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm tracking-wide text-text-dim uppercase">{rotulo}</p>
        <p className="font-display text-lg font-semibold text-text">{valor}</p>
      </div>
    </div>
  );
}
