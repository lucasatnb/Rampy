import { motion, useReducedMotion } from "motion/react";

interface Props {
  valor: number;
  meta: number;
  tamanho?: number;
  mostrarTexto?: boolean;
  className?: string;
}

/** Anel da meta diária: enche com spring; sem animação quando reduced-motion. */
export function AnelMeta({ valor, meta, tamanho = 96, mostrarTexto = true, className = "" }: Props) {
  const reduzir = useReducedMotion();
  const seguro = Math.max(1, meta);
  const pct = Math.min(1, Math.max(0, valor / seguro));
  const espessura = Math.max(5, Math.round(tamanho * 0.08));
  const raio = (tamanho - espessura - 8) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const alvo = circunferencia * (1 - pct);
  const centro = tamanho / 2;

  return (
    <div
      role="img"
      aria-label={`Meta do dia: ${Math.min(valor, meta)} de ${meta} ${meta === 1 ? "aula" : "aulas"}`}
      className={`relative inline-grid shrink-0 place-items-center ${className}`}
      style={{ width: tamanho, height: tamanho }}
    >
      <svg width={tamanho} height={tamanho} className="-rotate-90" aria-hidden="true">
        <circle
          cx={centro}
          cy={centro}
          r={raio}
          fill="none"
          strokeWidth={espessura}
          className="stroke-surface-3"
        />
        <motion.circle
          cx={centro}
          cy={centro}
          r={raio}
          fill="none"
          strokeWidth={espessura}
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          className="stroke-reward"
          initial={reduzir ? false : { strokeDashoffset: circunferencia }}
          animate={{ strokeDashoffset: alvo }}
          transition={reduzir ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
        />
      </svg>
      {mostrarTexto ? (
        <div className="absolute text-center" aria-hidden="true">
          <p className={`font-display font-semibold text-text ${tamanho < 64 ? "text-sm" : "text-xl"}`}>
            {Math.min(valor, meta)}/{meta}
          </p>
          {tamanho >= 64 ? (
            <p className="text-sm tracking-[0.12em] text-text-faint uppercase">meta</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
