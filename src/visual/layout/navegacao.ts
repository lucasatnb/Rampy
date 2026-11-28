import {
  BarChart3,
  BookOpen,
  Building2,
  ClipboardCheck,
  HelpCircle,
  House,
  Layers,
  Library,
  Settings,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Perfil = "gestor" | "funcionario";
export type ItemNav = { rotulo: string; to: string; icone: LucideIcon };

export const navegacao: Record<Perfil, ItemNav[]> = {
  gestor: [
    { rotulo: "Início", to: "/gestor", icone: House },
    { rotulo: "Colaboradores", to: "/gestor/colaboradores", icone: Users },
    { rotulo: "Trilhas", to: "/gestor/trilhas", icone: Layers },
    { rotulo: "Avaliações", to: "/gestor/avaliacoes", icone: ClipboardCheck },
    { rotulo: "Relatórios", to: "/gestor/relatorios", icone: BarChart3 },
    { rotulo: "Conteúdo", to: "/gestor/conteudo", icone: Library },
    { rotulo: "Empresa", to: "/gestor/empresa", icone: Building2 },
  ],
  funcionario: [
    { rotulo: "Início", to: "/funcionario", icone: House },
    { rotulo: "Minhas Trilhas", to: "/funcionario/trilhas", icone: Layers },
    { rotulo: "Biblioteca", to: "/funcionario/biblioteca", icone: BookOpen },
    { rotulo: "Avaliações", to: "/funcionario/avaliacoes", icone: ClipboardCheck },
    { rotulo: "Meu Perfil", to: "/funcionario/perfil", icone: UserRound },
  ],
};

export const itensInferiores: ItemNav[] = [
  { rotulo: "Ajuda e Suporte", to: "/ajuda", icone: HelpCircle },
  { rotulo: "Configurações", to: "/configuracoes", icone: Settings },
];

export const rotulosSecao: Record<string, string> = {
  colaboradores: "Colaboradores",
  trilhas: "Trilhas",
  avaliacoes: "Avaliações",
  relatorios: "Relatórios",
  conteudo: "Conteúdo",
  empresa: "Empresa",
  biblioteca: "Biblioteca",
  perfil: "Meu Perfil",
  ajuda: "Ajuda e Suporte",
  configuracoes: "Configurações",
};
