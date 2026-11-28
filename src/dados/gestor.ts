import {
  BarChart3,
  ClipboardCheck,
  Layers,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Kpi = {
  rotulo: string;
  valor: string;
  delta?: string;
  icone: LucideIcon;
  progresso?: number;
};

export const kpisGestor: Kpi[] = [
  { rotulo: "Colaboradores ativos", valor: "42", delta: "+3 este mês", icone: Users },
  { rotulo: "Trilhas em andamento", valor: "12", delta: "+2 este mês", icone: Layers },
  { rotulo: "Avaliações realizadas", valor: "386", delta: "+18 esta semana", icone: ClipboardCheck },
  { rotulo: "Progresso médio da equipe", valor: "78%", icone: BarChart3, progresso: 78 },
];

export const progressoTrilhas = [
  { nome: "Introdução ao Docker", valor: 92 },
  { nome: "Git e Versionamento", valor: 76 },
  { nome: "Computação em Nuvem", valor: 68 },
];

export const evolucao = {
  meses: ["Jul", "Ago", "Set", "Out", "Nov"],
  valores: [30, 40, 48, 60, 78],
};

export const atividades = [
  {
    texto: "Novo colaborador adicionado: Ana Souza",
    quando: "Há 2 horas",
    icone: Users,
  },
  {
    texto: 'Avaliação "Containers e Imagens" publicada',
    quando: "Há 4 horas",
    icone: ClipboardCheck,
  },
  {
    texto: 'Trilha "DevOps na Prática" atualizada',
    quando: "Ontem",
    icone: Layers,
  },
];

export const pendencias = [
  { texto: "6 colaboradores com baixo progresso (< 50%)", acao: "Ver", icone: Users },
  { texto: "3 avaliações aguardando correção", acao: "Corrigir", icone: ClipboardCheck },
  { texto: "1 trilha sem colaboradores atribuídos", acao: "Atribuir", icone: Layers },
];
