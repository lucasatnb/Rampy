import { useState } from "react";
import { CheckCircle2, Layers, Play, TrendingUp } from "lucide-react";
import { trilhasAluno } from "@/dados/funcionario-internas";
import { BarraProgresso } from "@/components/componentes/progresso";
import { Filtros } from "@/components/componentes/filtros";
import { LinhaKpis } from "@/components/componentes/cartao-kpi";
import { PaginaInterna } from "@/components/componentes/pagina-interna";

const abas = [
  { id: "andamento", rotulo: "Em andamento", contagem: 3 },
  { id: "concluidas", rotulo: "Concluídas", contagem: 1 },
  { id: "nao-iniciadas", rotulo: "Não iniciadas", contagem: 2 },
];

export function MinhasTrilhas() {
  const [aba, setAba] = useState("andamento");

  return (
    <PaginaInterna
      perfil="funcionario"
      titulo="Minhas Trilhas"
      subtitulo="Acompanhe suas trilhas de aprendizado, avance nas etapas e desenvolva novas competências."
    >
      <LinhaKpis
        itens={[
          { rotulo: "Trilhas ativas", valor: "3", icone: Layers },
          { rotulo: "Progresso médio", valor: "72%", icone: TrendingUp },
          { rotulo: "Trilha concluída", valor: "1", icone: CheckCircle2 },
        ]}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Filtros opcoes={abas} valor={aba} onChange={setAba} />
        <span className="text-sm text-text-dim">Mais recentes</span>
      </div>

      {aba !== "andamento" ? (
        <div className="sombra-card rounded-card border border-border bg-surface px-6 py-12 text-center text-sm text-text-dim">
          Nenhuma trilha nesta lista por enquanto.
        </div>
      ) : (
        <div className="grid gap-4">
          {trilhasAluno.map((trilha) => (
            <article
              key={trilha.nome}
              className="sombra-card grid gap-5 rounded-card border border-border bg-surface p-5 lg:grid-cols-[1fr_auto]"
            >
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                <span className="grid h-20 w-full shrink-0 place-items-center rounded-icon bg-track sm:w-28">
                  <Layers size={32} className="text-primary" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg font-semibold text-text">{trilha.nome}</h2>
                  <p className="text-sm text-text-dim">Trilha: {trilha.trilha}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <BarraProgresso valor={trilha.progresso} />
                    <span className="text-sm font-semibold tabular-nums">{trilha.progresso}%</span>
                  </div>
                  <div className="mt-4 border-t border-divider pt-3 text-sm">
                    <span className="block text-xs text-text-dim">Próxima aula</span>
                    <span className="font-medium text-text">{trilha.proxima}</span>
                    <span className="ml-2 text-text-dim">{trilha.duracao}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill bg-primary-soft px-6 text-sm font-semibold text-primary-on-soft"
              >
                <Play size={16} fill="currentColor" aria-hidden="true" /> Continuar
              </button>
            </article>
          ))}
        </div>
      )}
    </PaginaInterna>
  );
}
