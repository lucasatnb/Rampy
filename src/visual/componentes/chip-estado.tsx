import { Chip } from "@/components/chip";

const mapa: Record<string, "neutro" | "acao" | "recompensa" | "sucesso" | "erro"> = {
  Ativa: "sucesso",
  Ativo: "sucesso",
  Concluída: "sucesso",
  Concluído: "sucesso",
  Aprovada: "sucesso",
  Entregue: "acao",
  "Em revisão": "erro",
  "Em andamento": "recompensa",
  Rascunho: "recompensa",
  Pendente: "recompensa",
  Intermediário: "acao",
  Atribuída: "acao",
  Avançado: "sucesso",
  "Aguardando correção": "erro",
};

export function ChipEstado({ status }: { status: string }) {
  return (
    <Chip variant={mapa[status] ?? "neutro"}>
      <span className="size-2 shrink-0 rounded-full bg-current" aria-hidden="true" />
      {status}
    </Chip>
  );
}
