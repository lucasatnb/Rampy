import { BarChart3, BookOpen, ChevronRight, Container, Layers, Play, Trophy } from "lucide-react";
import { aluno, evolucaoAluno } from "@/dados/funcionario";
import { CabecalhoPagina } from "@/components/componentes/cabecalho-pagina";
import { BarraProgresso } from "@/components/componentes/progresso";
import { AppShell } from "@/components/layout/app-shell";

const icones = [BookOpen, Layers, Trophy];

export function FuncionarioInicio() {
  return (
    <AppShell perfil="funcionario">
      <CabecalhoPagina
        data="Quarta-feira, 26 de novembro"
        titulo={`Bom dia, ${aluno.nome}.`}
        subtitulo="Continue evoluindo na sua jornada profissional."
      />

      <article className="sombra-card flex flex-col gap-5 rounded-card border border-border bg-surface p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="relative grid h-36 w-full shrink-0 place-items-center overflow-hidden rounded-icon bg-[#101c22] sm:h-28 sm:w-48">
          <div className="absolute -top-10 -right-10 size-32 rounded-full bg-primary/25 blur-2xl" aria-hidden="true" />
          <Container size={54} className="text-[#22d3d8]" aria-hidden="true" />
          <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-white text-[#06302f] shadow-md">
            <Play size={17} fill="currentColor" aria-hidden="true" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-2 rounded-pill bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-on-soft">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Em andamento
          </span>
          <h2 className="mt-2 font-display text-lg font-semibold text-text">
            {aluno.curso}
          </h2>
          <p className="mt-1 text-sm text-text-dim">Trilha: {aluno.trilha}</p>
          <div className="mt-4 flex items-center gap-3">
            <BarraProgresso valor={aluno.progresso} />
            <span className="shrink-0 text-sm font-semibold tabular-nums text-text">
              {aluno.progresso}%
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label={`Continuar ${aluno.curso}`}
          className="grid size-12 shrink-0 place-items-center rounded-icon bg-primary text-primary-fg transition-colors hover:brightness-95 motion-reduce:transition-none"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </article>

      <section className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-text">
          <BarChart3 size={20} className="text-primary" aria-hidden="true" />
          Sua evolução
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {evolucaoAluno.map((stat, i) => {
            const Icone = icones[i];
            return (
              <article
                key={stat.titulo}
                className="sombra-card rounded-card border border-border bg-surface p-5"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-icon bg-primary-soft text-primary-on-soft">
                    <Icone size={22} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-3xl font-bold text-text">{stat.rotulo}</p>
                    <p className="text-sm text-text-dim">{stat.titulo}</p>
                  </div>
                </div>
                {stat.delta ? (
                  <p className="mt-4 text-xs font-semibold text-success-fg">
                    ↑ {stat.delta}
                  </p>
                ) : null}
                {stat.progresso !== undefined ? (
                  <BarraProgresso valor={stat.progresso} className="mt-5" />
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
