import { useState } from "react";
import { CheckCircle2, ClipboardCheck, FileQuestion, Play, Target } from "lucide-react";
import { avaliacoesConcluidas, avaliacoesPendentes } from "@/dados/funcionario-internas";
import { ChipEstado } from "@/components/componentes/chip-estado";
import { Filtros } from "@/components/componentes/filtros";
import { LinhaKpis } from "@/components/componentes/cartao-kpi";
import { PaginaInterna } from "@/components/componentes/pagina-interna";

const abas = [
  { id: "pendentes", rotulo: "Pendentes", contagem: 6 },
  { id: "concluidas", rotulo: "Concluídas", contagem: 12 },
  { id: "todas", rotulo: "Todas", contagem: 18 },
];

export function AvaliacoesFuncionario() {
  const [aba, setAba] = useState("pendentes");
  const mostrarPendentes = aba !== "concluidas";
  const mostrarConcluidas = aba !== "pendentes";

  return (
    <PaginaInterna
      perfil="funcionario"
      titulo="Avaliações das Trilhas"
      subtitulo="Realize as atividades e avaliações dos seus treinamentos para avançar nas trilhas."
    >
      <LinhaKpis
        itens={[
          { rotulo: "Avaliações pendentes", valor: "6", icone: FileQuestion },
          { rotulo: "Avaliações concluídas", valor: "12", icone: CheckCircle2 },
          { rotulo: "Média geral", valor: "85%", icone: ClipboardCheck },
          { rotulo: "Trilhas com 100%", valor: "3", icone: Target },
        ]}
      />

      <Filtros opcoes={abas} valor={aba} onChange={setAba} className="mb-4" />

      <div className="grid gap-4">
        {mostrarPendentes
          ? avaliacoesPendentes.map((item) => (
              <article
                key={item.titulo}
                className="sombra-card flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-icon bg-primary-soft text-primary-on-soft">
                  <FileQuestion size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-base font-semibold text-text">{item.titulo}</h2>
                  <p className="text-sm text-text-dim">Trilha: {item.trilha}</p>
                  <p className="mt-1 text-xs text-text-dim">{item.prazo}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary-soft px-5 text-sm font-semibold text-primary-on-soft"
                >
                  <Play size={16} fill="currentColor" aria-hidden="true" /> Iniciar
                </button>
              </article>
            ))
          : null}

        {mostrarConcluidas
          ? avaliacoesConcluidas.map((item) => (
              <article
                key={item.titulo}
                className="sombra-card flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface-raised p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-success-soft text-success-fg">
                  <CheckCircle2 size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-base font-semibold text-text">{item.titulo}</h2>
                  <p className="text-sm text-text-dim">Trilha: {item.trilha}</p>
                  <p className="mt-1 text-xs text-text-dim">{item.nota}</p>
                </div>
                <ChipEstado status="Concluída" />
                <button type="button" className="min-h-11 rounded-pill border border-border px-5 text-sm font-semibold text-text">
                  Ver resultado
                </button>
              </article>
            ))
          : null}
      </div>
    </PaginaInterna>
  );
}
