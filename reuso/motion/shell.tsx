import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useOutlet } from "react-router-dom";
import { ABAS } from "@/app/navegacao";
import { useEstado } from "@/app/use-estado";
import { AnelMeta } from "@/features/trilha/anel-meta";
import { IndicadorSync } from "@/components/sync";
import { progressoTrilha, atualObj } from "@/lib/trilhas";
import { cn } from "@/lib/utils";

const mola = { type: "spring", stiffness: 360, damping: 30 } as const;

export function Shell() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const reduzir = useReducedMotion();
  useEstado();
  const atual = atualObj();
  const progresso = atual ? progressoTrilha(atual.id) : { feitas: 0, total: 0, pct: 0 };
  const metaValor = progresso.feitas > 0 ? 1 : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="min-h-dvh">
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-md bg-reward px-4 py-2 font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>

      <aside className="vidro fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border px-3 py-6 md:flex">
        <Link
          to="/"
          className="mb-9 flex items-center gap-3 rounded-md px-2 py-1 focus-visible:outline-reward"
          aria-label="Lunox, ir para a trilha"
        >
          <span className="grid size-10 place-items-center rounded-full border border-reward/30 bg-reward/10 text-reward">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
              <path
                d="M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9L12 18.5l-1.9-5.6L4.5 11l5.6-1.9L12 3.5z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>
            <span className="block font-display text-lg leading-tight font-semibold">Lunox</span>
            <span className="text-sm tracking-wide text-text-faint">acenda o seu céu</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="flex flex-col gap-1">
          {ABAS.map(({ para, rotulo, Icone, fim }) => (
            <NavLink
              key={para}
              to={para}
              end={fim}
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                  isActive ? "text-text" : "text-text-dim hover:bg-surface-2/70 hover:text-text",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <motion.span
                      layoutId="aba-lateral"
                      className="absolute inset-0 rounded-md border border-action/30 bg-action/15"
                      transition={mola}
                    />
                  ) : null}
                  <Icone
                    className={cn("relative size-5", isActive ? "text-action-accent" : "text-text-faint")}
                  />
                  <span className="relative">{rotulo}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-card border border-border bg-surface-2/60 p-4">
          <div className="flex items-center gap-3">
            <AnelMeta valor={metaValor} meta={1} tamanho={52} mostrarTexto={false} />
            <div className="min-w-0">
              <p className="text-sm tracking-[0.12em] text-text-faint uppercase">Meta do dia</p>
              <p className="mt-0.5 font-display text-lg font-semibold text-text">
                {metaValor ? "Aula feita" : "Falta 1 aula"}
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-text-dim">
            {atual ? `${progresso.feitas} de ${progresso.total} aulas nesta trilha.` : "Monte a sua primeira trilha."}
          </p>
          <IndicadorSync className="mt-3" />
        </div>
      </aside>

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="conteudo"
          key={pathname}
          className="min-h-dvh pb-28 md:pl-60 md:pb-10"
          initial={reduzir ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduzir ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduzir ? 0.12 : 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>

      <nav
        aria-label="Navegação principal"
        className="vidro fixed inset-x-0 bottom-0 z-40 border-t border-border pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <div className="grid grid-cols-4">
          {ABAS.map(({ para, rotulo, Icone, fim }) => (
            <NavLink
              key={para}
              to={para}
              end={fim}
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-16 flex-col items-center justify-center gap-1 text-sm font-medium",
                  isActive ? "text-action-accent" : "text-text-faint",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <motion.span
                      layoutId="aba-inferior"
                      className="absolute top-0 h-0.5 w-9 rounded-full bg-action-accent"
                      transition={mola}
                    />
                  ) : null}
                  <Icone className="size-5" />
                  <span>{rotulo}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
