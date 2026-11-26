// Componente único do mascote. Nenhuma outra tela importa PNG do mascote.
import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
import { imagemDoMascote, mascote, type EstadoMascote } from "./mascote.config";

// Só transform/opacity (DESIGN.md). Reações = movimento, não troca de imagem.
const movimentos: Record<EstadoMascote, TargetAndTransition> = {
  neutro: { y: [0, -4, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
  celebrar: { y: [0, -14, 0], rotate: [0, -6, 6, 0], transition: { duration: 0.8 } },
  curioso: { rotate: [0, -8, 0], transition: { duration: 0.6 } },
  dormir: { scale: [1, 1.02, 1], opacity: 0.8, transition: { duration: 5, repeat: Infinity } },
} as const;

interface Props {
  estrelasAcesas: number;
  estado?: EstadoMascote;
  tamanho?: number; // px
  className?: string;
}

export function Mascote({ estrelasAcesas, estado = "neutro", tamanho = 96, className = "" }: Props) {
  const reduzir = useReducedMotion();
  // Imagem com fundo embutido (RGB, sem transparência) vai dentro de um cartão.
  const moldura = mascote.fundo === "embutido" ? "rounded-3xl border border-white/10" : "";
  return (
    <motion.img
      src={imagemDoMascote(estrelasAcesas, estado)}
      alt={mascote.alt}
      width={tamanho}
      height={tamanho}
      draggable={false}
      animate={reduzir ? undefined : movimentos[estado]}
      className={`${moldura} ${className}`.trim()}
    />
  );
}
