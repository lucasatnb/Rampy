/* Estado e persistência — mesmas chaves e mesmo JSON do app antigo. */
import { marcarSujo } from "./conta";
import { normalizarOfensiva, type Ofensiva } from "./ofensiva";

export const CHAVES = {
  stars: "lunox_demo_stars",
  trilhas: "lunox_trilhas",
  atual: "lunox_trilha_atual",
  progresso: "lunox_progresso",
  codigo: "lunox_codigo",
  exercicios: "lunox_exercicios_ok",
  ofensiva: "lunox_ofensiva",
  jornada: "lunox_jornada",
  ia: "lunox_ia_mode",
  chat: "lunox_chat_historico",
  anim: "lunox_anim_pendente",
} as const;

export interface AulaTrilha {
  titulo: string;
  skill: string;
  ex?: string;
  texto?: string;
  passos?: string[];
  why?: string;
}

export interface Trilha {
  id: string;
  preset: string;
  nome: string;
  projeto: string;
  descricao: string;
  icone: string;
  estrelas: string[];
  jaAcesas: string[];
  aulas: AulaTrilha[];
  criadaEm: number;
  concluidaEm: number | null;
}

export interface Estado {
  trilhas: Trilha[];
  acesas: Set<string>;
  atual: string | null;
  progresso: Record<string, Record<string, Record<string, boolean>>>;
  codigo: Record<string, string>;
  exercicios: Record<string, Record<string, boolean>>;
  ofensiva: Ofensiva;
  ia: boolean;
  anim: string[];
}

export function ler<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto == null ? padrao : (JSON.parse(bruto) as T);
  } catch {
    return padrao;
  }
}

export function gravar(chave: string, valor: unknown): void {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* sem localStorage */
  }
}

export function carregar(): Estado {
  let trilhas = ler<Trilha[] | null>(CHAVES.trilhas, null);
  const acesas = new Set(ler<string[]>(CHAVES.stars, []));
  const progresso = ler<Estado["progresso"] | null>(CHAVES.progresso, null) || {};
  const codigo = ler<Estado["codigo"] | null>(CHAVES.codigo, null) || {};
  const exercicios = ler<Estado["exercicios"] | null>(CHAVES.exercicios, null) || {};
  const ofensiva = normalizarOfensiva(ler<unknown>(CHAVES.ofensiva, null));
  let atual = ler<string | null>(CHAVES.atual, null);
  const ia = !!ler(CHAVES.ia, false);
  let anim = ler<unknown>(CHAVES.anim, []);
  if (!Array.isArray(anim)) anim = [];

  if (!Array.isArray(trilhas)) {
    trilhas = [];
    atual = null;
    gravar(CHAVES.trilhas, trilhas);
    gravar(CHAVES.atual, atual);
  }
  if (trilhas.length && !trilhas.some((t) => t.id === atual)) atual = trilhas[0].id;
  if (!trilhas.length) atual = null;

  return {
    trilhas,
    acesas,
    atual,
    progresso,
    codigo,
    exercicios,
    ofensiva,
    ia,
    anim: anim as string[],
  };
}

export const estado: Estado = carregar();

/* Assinatura leve para a interface: toda gravação avisa as telas. */
let versao = 0;
const ouvintes = new Set<() => void>();

export function versaoEstado(): number {
  return versao;
}

export function assinarEstado(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

function notificar(): void {
  versao += 1;
  ouvintes.forEach((ouvinte) => ouvinte());
}

/** Relê o localStorage no mesmo objeto (usado depois de login/troca de conta). */
export function recarregarEstado(): void {
  Object.assign(estado, carregar());
  notificar();
}

export function salvar(): void {
  gravar(CHAVES.trilhas, estado.trilhas);
  gravar(CHAVES.atual, estado.atual);
  gravar(CHAVES.stars, Array.from(estado.acesas));
  gravar(CHAVES.progresso, estado.progresso);
  gravar(CHAVES.codigo, estado.codigo);
  gravar(CHAVES.exercicios, estado.exercicios);
  gravar(CHAVES.ofensiva, estado.ofensiva);
  gravar(CHAVES.ia, estado.ia);
  gravar(CHAVES.anim, estado.anim);
  notificar();
  marcarSujo();
}
