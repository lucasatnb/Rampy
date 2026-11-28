import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Perfil } from "./navegacao";

const perfis: { id: Perfil; rotulo: string }[] = [
  { id: "gestor", rotulo: "Gestor" },
  { id: "funcionario", rotulo: "Funcionário" },
];

export function TrocaPerfil({
  perfil,
  className,
}: {
  perfil: Perfil;
  className?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      role="group"
      aria-label="Perfil de demonstração"
      className={cn(
        "flex rounded-pill border border-border bg-surface-raised p-1",
        className,
      )}
    >
      {perfis.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => navigate(`/${p.id}`)}
          aria-pressed={perfil === p.id}
          className={cn(
            "min-h-11 flex-1 rounded-pill px-3 text-xs font-semibold transition-colors motion-reduce:transition-none",
            perfil === p.id
              ? "bg-primary-soft text-primary-on-soft"
              : "text-text-dim hover:text-text",
          )}
        >
          {p.rotulo}
        </button>
      ))}
    </div>
  );
}
