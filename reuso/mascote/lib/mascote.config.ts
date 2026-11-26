// ÚNICO ponto do app que conhece o mascote atual. Para trocar de mascote,
// edite manifest.json e as imagens em public/mascote/ (veja MASCOTE.md).
import manifesto from "./manifest.json";

export type EstadoMascote = "neutro" | "celebrar" | "curioso" | "dormir";

export interface FaixaNivel {
  de: number;
  ate: number | null; // null = sem limite
  imagem: string; // arquivo dentro de public/mascote/
}

export interface Manifesto {
  id: string;
  nome: string;
  alt: string;
  temporario?: boolean;
  fundo: "embutido" | "transparente";
  niveis: FaixaNivel[];
  // Opcional: imagem própria por reação. Sem ela, a reação é só movimento.
  poses?: Partial<Record<EstadoMascote, string>>;
}

export const mascote = manifesto as Manifesto;

/** Use em textos da interface em vez de escrever o nome ou "gato". */
export const nomeMascote = mascote.nome;

export function imagemDoMascote(
  estrelasAcesas: number,
  estado: EstadoMascote = "neutro",
): string {
  const pose = mascote.poses?.[estado];
  if (pose) return `/mascote/${pose}`;
  const faixa =
    mascote.niveis.find(
      (n) => estrelasAcesas >= n.de && (n.ate === null || estrelasAcesas <= n.ate),
    ) ?? mascote.niveis[0];
  return `/mascote/${faixa.imagem}`;
}
