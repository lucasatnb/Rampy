/* Tipos dos DADOS extraídos dos .js antigos (ver scripts/extrair-dados.mjs). */

export interface Skill {
  id: string;
  nome: string;
  star: string;
  root: string;
  icon: string;
  item: string;
}

export interface EstrelaCatalogo {
  id: string;
  nome: string;
  raiz: string;
  nivel: number;
  nivelNome: string;
  pai: string | null;
}

export interface Constelacao {
  nome: string;
  cor: string;
}

export interface AulaBase {
  titulo: string;
  skill: string;
  ex?: string;
  texto?: string;
  passos?: string[];
  why?: string;
}

export interface TrilhaBase {
  nome: string;
  projeto: string;
  descricao: string;
  icone: string;
  estrelas: string[];
  jaAcesas?: string[];
  aulas: AulaBase[];
  oculta?: boolean;
}

export interface Video {
  id: string;
  inicio: number;
  titulo: string;
  url: string;
}

export interface Desafio {
  titulo: string;
  enunciado: string;
  requisitos: string[];
  dica: string;
}

export interface ArquivoExercicio {
  nome: string;
  principal: boolean;
  starter: string;
  solucao: string;
}

export interface Exercicio {
  titulo: string;
  enunciado: string;
  requisitos: string[];
  dica: string;
  linguagem: string;
  starter: string;
  solucao: string;
  testes: string;
  arquivos: ArquivoExercicio[];
}

export interface Grupo {
  id: string;
  titulo: string;
  resumo: string;
  videos: Video[];
  desafio: Desafio | null;
  exercicio: Exercicio | null;
}

export interface EstrelaConteudo {
  grupos?: unknown[];
  desafioFinal?: unknown;
  tipo?: "codigo" | "dissertativa";
}

export interface Conteudo {
  versao: number;
  atualizado: string;
  estrelas: Record<string, EstrelaConteudo>;
}

export interface ExercicioProgramar {
  titulo: string;
  enunciado: string;
  reqs: string[];
  dica: string;
  starter: string;
  solucao: string;
  testes: string;
}

export type CasoProva = [nome: string, argumentos: unknown[], esperado: unknown];

export interface EstrelasExtras {
  exercicios: Record<string, ExercicioProgramar>;
  casos: Record<string, CasoProva[]>;
}
