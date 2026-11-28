export const colaboradores = [
  { nome: "Lucas Oliveira", email: "lucas.oliveira@empresa.com", cargo: "Desenvolvedor Jr", trilhas: 3, progresso: 92, status: "Ativo" },
  { nome: "Ana Souza", email: "ana.souza@empresa.com", cargo: "Analista de Dados", trilhas: 2, progresso: 80, status: "Ativo" },
  { nome: "Pedro Lima", email: "pedro.lima@empresa.com", cargo: "QA Tester", trilhas: 4, progresso: 74, status: "Ativo" },
  { nome: "Filipe Rocha", email: "filipe.rocha@empresa.com", cargo: "Dev. Pleno", trilhas: 3, progresso: 88, status: "Ativo" },
  { nome: "Carla Mendes", email: "carla.mendes@empresa.com", cargo: "UX/UI Designer", trilhas: 2, progresso: 65, status: "Ativo" },
];

export const competenciasColaborador = [
  { nome: "Programação em Java", tipo: "Técnica", valor: 92, nivel: "Avançado" },
  { nome: "Computação em Nuvem", tipo: "Técnica", valor: 68, nivel: "Intermediário" },
  { nome: "Controle de Versão (Git)", tipo: "Técnica", valor: 76, nivel: "Intermediário" },
  { nome: "Trabalho em Equipe", tipo: "Comportamental", valor: 88, nivel: "Avançado" },
  { nome: "Comunicação", tipo: "Comportamental", valor: 70, nivel: "Intermediário" },
];

export const trilhasGestor = [
  { nome: "Onboarding da Empresa", descricao: "Integração e cultura organizacional", pessoas: 24, progresso: 92, status: "Ativa", atualizada: "26 nov, 2026" },
  { nome: "Boas Práticas de Dev", descricao: "Padrões, Git e código limpo", pessoas: 18, progresso: 76, status: "Ativa", atualizada: "24 nov, 2026" },
  { nome: "Segurança da Informação", descricao: "LGPD, senhas e boas práticas", pessoas: 42, progresso: 68, status: "Ativa", atualizada: "20 nov, 2026" },
  { nome: "Docker na Prática", descricao: "Containers e orquestração", pessoas: 16, progresso: 54, status: "Rascunho", atualizada: "26 nov, 2026" },
];

export const avaliacoesGestor = [
  { nome: "Containers e Imagens", tipo: "Prova", trilha: "Docker na Prática", atribuicoes: 16, conclusao: 100, nota: "9,5", status: "Concluída" },
  { nome: "Git e Versionamento", tipo: "Questionário", trilha: "Boas Práticas de Dev", atribuicoes: 18, conclusao: 83, nota: "8,0", status: "Em andamento" },
  { nome: "Segurança em Aplicações", tipo: "Prova", trilha: "Segurança da Informação", atribuicoes: 42, conclusao: 76, nota: "7,8", status: "Em andamento" },
  { nome: "Política de Empresa", tipo: "Atividade", trilha: "Onboarding da Empresa", atribuicoes: 24, conclusao: 92, nota: "9,1", status: "Concluída" },
];

export const conteudosGestor = [
  { nome: "Introdução ao Docker", tipo: "Aula em vídeo", trilhas: 3, atualizada: "26 nov, 2026" },
  { nome: "Guia de Git e GitHub", tipo: "Documento (PDF)", trilhas: 4, atualizada: "24 nov, 2026" },
  { nome: "Boas Práticas de Código", tipo: "Material", trilhas: 2, atualizada: "20 nov, 2026" },
  { nome: "Fundamentos da LGPD", tipo: "Aula em vídeo", trilhas: 1, atualizada: "18 nov, 2026" },
];

export const desempenhoGestor = [
  { nome: "Lucas Oliveira", progresso: 92, nota: "9,5", trilhas: 3, status: "Acima da meta" },
  { nome: "Ana Souza", progresso: 80, nota: "8,9", trilhas: 2, status: "Dentro da meta" },
];

export const empresa = {
  nome: "TechSolutions Ltda",
  cnpj: "12.345.678/0001-90",
  email: "contato@techsolutions.com",
  corPrincipal: "#00D6C5",
  corSecundaria: "#0F172A",
};
