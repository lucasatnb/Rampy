import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Cartao({
  titulo,
  icone: Icone,
  acao,
  children,
  className,
}: {
  titulo: string;
  icone?: LucideIcon;
  acao?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "sombra-card rounded-card border border-border bg-surface p-5 md:p-6",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold text-text">
          {Icone ? <Icone size={18} className="text-primary" aria-hidden="true" /> : null}
          {titulo}
        </h2>
        {acao}
      </div>
      {children}
    </section>
  );
}
