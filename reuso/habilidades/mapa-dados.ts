/* Geometria e visibilidade do céu de estrelas (porta de habilidades.js 68–125). */
import { catalogo, constelacao, skillPorId, type EstrelaCatalogo } from "@/data";

export const MAPA_W = 2600;
export const MAPA_H = 1560;

const RAIZES = Array.from(new Set(catalogo.map((e) => e.raiz))).sort();
export const NIVEL_MIN = Math.min(...catalogo.map((e) => e.nivel));
const NIVEL_MAX = Math.max(...catalogo.map((e) => e.nivel));

export interface NoEstrela extends EstrelaCatalogo {
  x: number;
  y: number;
  cor: string;
}

export interface LinhaEstrela {
  de: string;
  para: string;
  cor: string;
}

const porId = new Map(catalogo.map((e) => [e.id, e]));
const filhos = new Map<string, string[]>();
catalogo.forEach((e) => {
  if (!e.pai) return;
  const lista = filhos.get(e.pai) || [];
  lista.push(e.id);
  filhos.set(e.pai, lista);
});

const coluna = (MAPA_W - 220) / Math.max(1, RAIZES.length);
const alturaNivel = (MAPA_H - 200) / Math.max(1, NIVEL_MAX - NIVEL_MIN);

export const nos: NoEstrela[] = catalogo.map((e) => {
  const ir = RAIZES.indexOf(e.raiz);
  const mesmoNivel = catalogo.filter((o) => o.raiz === e.raiz && o.nivel === e.nivel);
  const pos = mesmoNivel.findIndex((o) => o.id === e.id);
  const espaco = Math.min(58, (coluna - 40) / Math.max(1, mesmoNivel.length));
  return {
    ...e,
    x: 110 + ir * coluna + coluna / 2 + (pos - (mesmoNivel.length - 1) / 2) * espaco,
    y: 100 + (e.nivel - NIVEL_MIN) * alturaNivel,
    cor: constelacao(e.raiz)?.cor || "#ece9fb",
  };
});

export const noPorId = new Map(nos.map((n) => [n.id, n]));

export const linhas: LinhaEstrela[] = catalogo
  .filter((e) => e.pai && porId.has(e.pai))
  .map((e) => ({ de: e.pai as string, para: e.id, cor: constelacao(e.raiz)?.cor || "#9a93bd" }));

/** Ids de estrela (não de habilidade) já acesas. */
export function acesasDoJogo(acer: Set<string>): Set<string> {
  const out = new Set<string>();
  acer.forEach((skillId) => {
    const star = skillPorId(skillId)?.star;
    if (star && noPorId.has(star)) out.add(star);
  });
  return out;
}

/** Regra original: chão do céu + caminho até as acesas + raio de descoberta. */
export function calcularVisiveis(acesas: Set<string>): Set<string> {
  const vis = new Set<string>();
  catalogo.forEach((e) => {
    const pai = e.pai ? porId.get(e.pai) : null;
    if (e.nivel === NIVEL_MIN || (pai && pai.nivel === NIVEL_MIN)) vis.add(e.id);
  });

  acesas.forEach((id) => {
    let atual = porId.get(id);
    while (atual && atual.pai) {
      vis.add(atual.pai);
      atual = porId.get(atual.pai);
    }
  });

  const raio = acesas.size >= 9 ? 3 : acesas.size >= 6 ? 2 : 1;
  const fila: Array<[string, number]> = Array.from(acesas, (id) => [id, 0]);
  while (fila.length) {
    const [id, dist] = fila.shift() as [string, number];
    vis.add(id);
    if (dist >= raio) continue;
    (filhos.get(id) || []).forEach((k) => {
      if (vis.has(k)) return;
      vis.add(k);
      fila.push([k, dist + 1]);
    });
  }
  return vis;
}
