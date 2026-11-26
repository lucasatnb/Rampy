/* Carregador único dos DADOS (nada de window.LUNOX*). */
import catalogoJson from "./catalogo.json";
import constelacoesJson from "./constelacoes.json";
import conteudoJson from "./estrelas-conteudo.json";
import extrasJson from "./estrelas-extras.json";
import estrelasJson from "./estrelas.json";
import exerciciosJson from "./exercicios.json";
import trilhasJson from "./trilhas-base.json";
import videosJson from "./aulas-video.json";
import type {
  CasoProva,
  Constelacao,
  Conteudo,
  EstrelaCatalogo,
  EstrelasExtras,
  ExercicioProgramar,
  Skill,
  TrilhaBase,
} from "./tipos";

export * from "./tipos";

export const skills = estrelasJson as unknown as Skill[];
export const catalogo = catalogoJson as unknown as EstrelaCatalogo[];
export const constelacoes = constelacoesJson as unknown as Record<string, Constelacao>;
export const trilhasBase = trilhasJson as unknown as Record<string, TrilhaBase>;
export const conteudoLocal = conteudoJson as unknown as Conteudo;
export const aulasVideo = videosJson as unknown as Record<string, unknown>;
export const exerciciosProgramar = exerciciosJson as unknown as Record<string, ExercicioProgramar>;
export const estrelasExtras = extrasJson as unknown as EstrelasExtras;

export const casosProva: Record<string, CasoProva[]> = estrelasExtras.casos;

const skillsPorId = new Map(skills.map((s) => [s.id, s]));
const estrelasPorId = new Map(catalogo.map((e) => [e.id, e]));

if (skillsPorId.size !== skills.length) throw new Error("estrelas.json tem ids repetidos");
if (estrelasPorId.size !== catalogo.length) throw new Error("catalogo.json tem ids repetidos");

export const skillPorId = (id: string): Skill | null => skillsPorId.get(id) ?? null;

export const skillDaEstrela = (star: string): Skill | null =>
  skills.find((s) => s.star === star) ?? null;

export const estrela = (id: string): EstrelaCatalogo | null => estrelasPorId.get(id) ?? null;

export const constelacao = (raiz: string): Constelacao | null => constelacoes[raiz] ?? null;

export const trilhaBase = (presetId: string): TrilhaBase | null => trilhasBase[presetId] ?? null;
