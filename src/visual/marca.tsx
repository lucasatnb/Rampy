import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Marca centralizada. Substituir o bloco ciano pelo arquivo do logo assim que
 * chegar a versão em modo claro (hoje só existe a de fundo preto).
 */
export function Marca({
  compacta = false,
  className,
}: {
  compacta?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="grid size-10 shrink-0 place-items-center rounded-icon bg-gradient-to-br from-[#2FE3DE] to-[#12B5C9] text-white shadow-sm">
        <ArrowUpRight size={22} strokeWidth={2.5} aria-hidden="true" />
      </span>
      {compacta ? null : (
        <span className="font-display text-[22px] font-bold tracking-tight text-text">
          Rampy
        </span>
      )}
    </span>
  );
}
