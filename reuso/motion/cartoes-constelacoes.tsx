/* Cartões por constelação: só as estrelas já reveladas aparecem. */
import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { constelacoes } from "@/data";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/chip";
import { cn } from "@/lib/utils";
import { nos, type NoEstrela } from "./mapa-dados";

const TOTAL_POR_RAIZ = nos.reduce<Record<string, number>>((acc, no) => {
  acc[no.raiz] = (acc[no.raiz] || 0) + 1;
  return acc;
}, {});

interface Props {
  acesas: Set<string>;
  visiveis: Set<string>;
  selecionada: string | null;
  aoSelecionar: (id: string) => void;
}

export function CartoesConstelacoes({ acesas, visiveis, selecionada, aoSelecionar }: Props) {
  const reduzir = useReducedMotion();

  const grupos = useMemo(() => {
    const porRaiz = new Map<string, NoEstrela[]>();
    nos.forEach((no) => {
      if (!acesas.has(no.id) && !visiveis.has(no.id)) return;
      const lista = porRaiz.get(no.raiz) || [];
      lista.push(no);
      porRaiz.set(no.raiz, lista);
    });
    return Array.from(porRaiz, ([raiz, lista]) => ({
      raiz,
      nome: constelacoes[raiz]?.nome || raiz,
      cor: constelacoes[raiz]?.cor || "#9a93bd",
      total: TOTAL_POR_RAIZ[raiz] || 0,
      acesas: lista.filter((no) => acesas.has(no.id)).length,
      estrelas: [...lista].sort((a, b) => a.nivel - b.nivel || a.nome.localeCompare(b.nome, "pt-BR")),
    })).sort(
      (a, b) => b.acesas - a.acesas || b.estrelas.length - a.estrelas.length || a.nome.localeCompare(b.nome, "pt-BR"),
    );
  }, [acesas, visiveis]);

  return (
    <div className="flex flex-col gap-3">
      {grupos.map((grupo, indice) => (
        <motion.div
          key={grupo.raiz}
          initial={reduzir ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduzir ? 0 : 0.24, delay: reduzir ? 0 : Math.min(indice * 0.04, 0.2) }}
        >
          <Card className="gap-3 rounded-card border-border bg-surface-1/70 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: grupo.cor }} aria-hidden="true" />
              <h2 className="font-display text-base font-semibold text-text">{grupo.nome}</h2>
              <Chip variant={grupo.acesas ? "recompensa" : "neutro"} className="ml-auto">
                {grupo.acesas} de {grupo.total} acesas
              </Chip>
            </div>
            <div className="flex flex-wrap gap-2">
              {grupo.estrelas.map((no) => {
                const acesa = acesas.has(no.id);
                return (
                  <button
                    key={no.id}
                    type="button"
                    onClick={() => aoSelecionar(no.id)}
                    aria-label={`${no.nome}, ${acesa ? "acesa" : "pronta para estudar"}`}
                    title={`${no.nome} · ${no.nivelNome}`}
                    className={cn(
                      "grid min-h-11 min-w-11 place-items-center rounded-full border transition-colors",
                      acesa
                        ? "brilho-estrela border-reward/50 bg-reward/15 text-reward"
                        : "border-action/40 bg-action/10 text-action-accent",
                      selecionada === no.id && "ring-2 ring-action/50",
                    )}
                  >
                    <Star className="size-4" fill={acesa ? "currentColor" : "none"} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
