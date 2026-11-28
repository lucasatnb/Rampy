import { Award, BookOpen, BriefcaseBusiness, CheckCircle2, Flame, Layers, Pencil, Trophy } from "lucide-react";
import {
  atividadePerfil,
  competenciasAluno,
  conquistas,
} from "@/dados/funcionario-internas";
import { Cartao } from "@/components/componentes/cartao";
import { ChipEstado } from "@/components/componentes/chip-estado";
import { BarraProgresso } from "@/components/componentes/progresso";
import { LinhaKpis } from "@/components/componentes/cartao-kpi";
import { PaginaInterna } from "@/components/componentes/pagina-interna";

const dias = Array.from({ length: 35 }, (_, i) => i < 12);

export function MeuPerfil() {
  return (
    <PaginaInterna
      perfil="funcionario"
      titulo="Meu Perfil"
      subtitulo="Acompanhe sua evolução, conquistas e desenvolvimento na Rampy."
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Cartao titulo="Lucas Oliveira">
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-primary-soft font-display text-xl font-bold text-primary-on-soft">
              LO
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm text-text-dim">
                <BriefcaseBusiness size={16} aria-hidden="true" /> Funcionário em Treinamento
              </p>
              <div className="mt-2"><ChipEstado status="Ativo" /></div>
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-5 text-sm font-semibold text-primary-fg"
            >
              <Pencil size={16} aria-hidden="true" /> Editar perfil
            </button>
          </div>
        </Cartao>

        <Cartao titulo="Progresso geral" icone={Trophy}>
          <p className="font-display text-4xl font-bold text-text">72%</p>
          <p className="mt-1 text-sm text-text-dim">do treinamento concluído</p>
          <BarraProgresso valor={72} className="mt-5" />
        </Cartao>
      </div>

      <div className="mt-4">
        <LinhaKpis
          itens={[
            { rotulo: "Trilhas ativas", valor: "5", icone: Layers },
            { rotulo: "Avaliações concluídas", valor: "12", icone: CheckCircle2 },
            { rotulo: "Aulas concluídas", valor: "28", icone: BookOpen },
            { rotulo: "Conquistas", valor: "3", icone: Award },
          ]}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Cartao titulo="Competências" acao={<button type="button" className="min-h-11 rounded-pill px-3 text-sm font-semibold text-primary-on-soft">Ver todas →</button>}>
          <p className="mb-5 text-sm text-text-dim">Habilidades desenvolvidas ao longo das trilhas.</p>
          <div className="grid gap-4">
            {competenciasAluno.map((c) => (
              <div key={c.nome}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-text">{c.nome}</span>
                  <span className="font-semibold tabular-nums text-text">{c.valor}%</span>
                </div>
                <BarraProgresso valor={c.valor} />
              </div>
            ))}
          </div>
        </Cartao>

        <Cartao titulo="Conquistas">
          <p className="mb-5 text-sm text-text-dim">Reconhecimentos pelas suas entregas.</p>
          <div className="grid grid-cols-3 gap-3">
            {conquistas.map((nome) => (
              <div key={nome} className="flex flex-col items-center gap-2 rounded-card bg-surface-raised p-4 text-center">
                <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary-on-soft">
                  <Trophy size={22} aria-hidden="true" />
                </span>
                <span className="text-xs font-medium text-text">{nome}</span>
              </div>
            ))}
          </div>
        </Cartao>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Cartao titulo="Atividade recente">
          <p className="mb-5 text-sm text-text-dim">Suas últimas ações na plataforma.</p>
          <ul className="divide-y divide-divider">
            {atividadePerfil.map((item) => (
              <li key={item.texto} className="flex justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0">
                <span className="text-text">{item.texto}</span>
                <span className="shrink-0 text-xs text-text-dim">{item.quando}</span>
              </li>
            ))}
          </ul>
        </Cartao>

        <Cartao titulo="Sequência de estudos" icone={Flame}>
          <p className="mb-5 text-sm text-text-dim">Consistência de acesso nos últimos 30 dias.</p>
          <div className="grid w-fit grid-cols-7 gap-2" aria-hidden="true">
            {dias.map((ativo, i) => (
              <span
                key={i}
                className={`size-6 rounded-[6px] ${ativo ? "bg-primary" : "bg-track"}`}
              />
            ))}
          </div>
          <p className="mt-5 font-display text-2xl font-bold text-text">12 dias</p>
          <p className="text-sm text-text-dim">de sequência</p>
        </Cartao>
      </div>
    </PaginaInterna>
  );
}
