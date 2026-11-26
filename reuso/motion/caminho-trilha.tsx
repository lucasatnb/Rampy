import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Check, Lock, Star } from "lucide-react";
import { estrela as estrelaCatalogo, skillPorId } from "@/data";
import { Chip } from "@/components/chip";
import { aulaOk } from "@/lib/progresso";
import type { Trilha } from "@/lib/storage";
import { cn } from "@/lib/utils";

/** Caminho vertical: feitas em dourado, atual em violeta, futuras bloqueadas. */
export function CaminhoTrilha({ trilha }: { trilha: Trilha }) {
  const reduzir = useReducedMotion();
  const feitas = trilha.aulas.map((_, i) => aulaOk(trilha.id, i));
  const atual = feitas.findIndex((v) => !v);

  return (
    <ol className="flex flex-col">
      {trilha.aulas.map((aula, i) => {
        const feita = feitas[i];
        const agora = i === atual;
        const bloqueada = !feita && !agora;
        const star = skillPorId(aula.skill)?.star || aula.skill;
        const nome = estrelaCatalogo(star)?.nome || aula.titulo;
        const href = `/aula/${trilha.id}/${star}`;
        const conteudo = (
          <div
            className={cn(
              "min-w-0 flex-1 rounded-card border p-4 transition-colors",
              agora && "border-action/40 bg-action/10",
              feita && "border-border bg-surface-1/70",
              bloqueada && "border-border bg-surface-1/40",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm tracking-[0.12em] text-text-faint uppercase">
                  {nome}
                </p>
                <h3 className={cn("font-display text-base font-semibold", bloqueada && "text-text-dim")}>
                  {aula.titulo}
                </h3>
              </div>
              {feita ? <Chip variant="sucesso">Concluída</Chip> : null}
              {agora ? <Chip variant="acao">Agora</Chip> : null}
              {bloqueada ? <Chip>Depois</Chip> : null}
            </div>
            {aula.why ? (
              <p className="mt-2 text-sm text-text-dim">
                <span className="text-text-faint">Por que está aqui: </span>
                {aula.why}
              </p>
            ) : null}
            <p className={cn("mt-3 text-sm font-medium", bloqueada ? "text-text-faint" : "text-action-accent")}>
              {bloqueada ? "Abre depois da aula anterior" : feita ? "Rever aula →" : "Abrir aula →"}
            </p>
          </div>
        );

        return (
          <motion.li
            key={`${trilha.id}-${i}`}
            className="relative flex gap-3 pb-3 last:pb-0"
            initial={reduzir ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduzir ? 0 : 0.26, delay: reduzir ? 0 : Math.min(i, 8) * 0.05 }}
          >
            {i < trilha.aulas.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn("absolute top-10 bottom-0 left-5 w-px", feita ? "bg-reward/40" : "bg-border")}
              />
            ) : null}

            <span
              className={cn(
                "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border",
                agora && "border-action/60 bg-action/20 text-action-accent ring-2 ring-action/25",
                feita && "border-reward/40 bg-reward/10 text-reward",
                bloqueada && "border-border bg-surface-2 text-text-faint",
              )}
              aria-hidden="true"
            >
              {feita ? <Check className="size-5" /> : null}
              {agora ? <Star className="size-5 fill-current" /> : null}
              {bloqueada ? <Lock className="size-4" /> : null}
            </span>

            {bloqueada ? (
              <div className="flex min-w-0 flex-1">{conteudo}</div>
            ) : (
              <Link
                to={href}
                className="flex min-w-0 flex-1 rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reward focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                aria-current={agora ? "step" : undefined}
              >
                {conteudo}
              </Link>
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}
