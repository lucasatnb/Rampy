import { BarChart3, Clock, Layers, TriangleAlert } from "lucide-react";
import {
  atividades,
  kpisGestor,
  pendencias,
  progressoTrilhas,
} from "@/dados/gestor";
import { CabecalhoPagina } from "@/components/componentes/cabecalho-pagina";
import { Cartao } from "@/components/componentes/cartao";
import { GraficoEvolucao } from "@/components/componentes/grafico-evolucao";
import { BarraProgresso } from "@/components/componentes/progresso";
import { AppShell } from "@/components/layout/app-shell";

const linkAcao = (texto: string) => (
  <button
    type="button"
    className="min-h-11 rounded-pill px-3 text-sm font-semibold text-primary-on-soft hover:bg-primary-soft"
  >
    {texto} →
  </button>
);

export function GestorInicio() {
  return (
    <AppShell perfil="gestor">
      <CabecalhoPagina
        data="Quarta-feira, 26 de novembro"
        titulo="Olá, Gestor."
        subtitulo="Acompanhe o desenvolvimento da sua equipe na Rampy."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpisGestor.map((kpi) => (
          <article
            key={kpi.rotulo}
            className="sombra-card rounded-card border border-border bg-surface p-5"
          >
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
              <p className="mt-4 text-xs font-semibold text-success-fg">
                ↑ {kpi.delta}
              </p>
            ) : null}
            {kpi.progresso !== undefined ? (
              <BarraProgresso valor={kpi.progresso} className="mt-5" />
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <Cartao
          titulo="Evolução da equipe"
          icone={BarChart3}
          acao={linkAcao("Ver relatório")}
        >
          <GraficoEvolucao />
        </Cartao>

        <Cartao
          titulo="Progresso por trilha"
          icone={Layers}
          acao={linkAcao("Ver todas")}
        >
          <ul className="divide-y divide-divider">
            {progressoTrilhas.map((trilha) => (
              <li key={trilha.nome} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-icon bg-primary-soft text-primary-on-soft">
                  <Layers size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text">{trilha.nome}</p>
                  <BarraProgresso valor={trilha.valor} className="mt-2" />
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-text">
                  {trilha.valor}%
                </span>
              </li>
            ))}
          </ul>
        </Cartao>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Cartao titulo="Atividades recentes" icone={Clock}>
          <ul className="divide-y divide-divider">
            {atividades.map((item) => (
              <li key={item.texto} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-icon bg-primary-soft text-primary-on-soft">
                  <item.icone size={18} aria-hidden="true" />
                </span>
                <p className="min-w-0 flex-1 text-sm text-text">{item.texto}</p>
                <time className="shrink-0 text-xs text-text-dim">{item.quando}</time>
              </li>
            ))}
          </ul>
        </Cartao>

        <Cartao titulo="Pendências de gestão" icone={TriangleAlert}>
          <ul className="divide-y divide-divider">
            {pendencias.map((item) => (
              <li key={item.texto} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <item.icone size={18} className="shrink-0 text-primary-on-soft" aria-hidden="true" />
                <p className="min-w-0 flex-1 text-sm text-text">{item.texto}</p>
                <button
                  type="button"
                  className="min-h-11 shrink-0 rounded-pill border border-border px-4 text-xs font-semibold text-text hover:bg-surface-raised"
                >
                  {item.acao}
                </button>
              </li>
            ))}
          </ul>
        </Cartao>
      </div>
    </AppShell>
  );
}
