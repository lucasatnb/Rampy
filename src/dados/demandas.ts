import { useSyncExternalStore } from "react";

export type StatusDemanda = "Pendente" | "Entregue" | "Em revisão" | "Aprovada";

export type Demanda = {
  id: string;
  titulo: string;
  descricao: string;
  destinatario: string;
  prazo: string;
  criadaEm: string;
  status: StatusDemanda;
  entrega?: string;
  nota?: string;
};

export const colaboradoresDemandas = [
  "Lucas Oliveira",
  "Ana Souza",
  "Pedro Lima",
  "Filipe Rocha",
  "Carla Mendes",
];

const sementes: Demanda[] = [
  {
    id: "d-1",
    titulo: "Revisar a documentação do Docker",
    descricao:
      "Atualize o guia de instalação com os comandos mais recentes e envie o link do documento.",
    destinatario: "Lucas Oliveira",
    prazo: "2026-11-29",
    criadaEm: "2026-11-24",
    status: "Pendente",
  },
  {
    id: "d-2",
    titulo: "Preparar resumo da aula de Git",
    descricao:
      "Escreva um resumo curto sobre os comandos vistos na aula e compartilhe com a equipe.",
    destinatario: "Lucas Oliveira",
    prazo: "2026-11-30",
    criadaEm: "2026-11-25",
    status: "Entregue",
    entrega:
      "Resumo pronto: cobre clone, commit, push e pull. Compartilhei no canal da equipe.",
  },
  {
    id: "d-3",
    titulo: "Levantar dúvidas sobre LGPD",
    descricao:
      "Liste as principais dúvidas da equipe sobre privacidade para o próximo treinamento.",
    destinatario: "Ana Souza",
    prazo: "2026-12-02",
    criadaEm: "2026-11-20",
    status: "Em revisão",
    entrega: "Levantei 6 dúvidas, mas falta confirmar o item sobre retenção de dados.",
    nota: "Detalhe melhor o item sobre retenção de dados antes de aprovar.",
  },
  {
    id: "d-4",
    titulo: "Compartilhar boas práticas de código",
    descricao:
      "Publique um exemplo de padronização de código para o time de desenvolvimento.",
    destinatario: "Lucas Oliveira",
    prazo: "2026-11-22",
    criadaEm: "2026-11-15",
    status: "Aprovada",
    entrega: "Publiquei o exemplo no guia da equipe com nomenclatura e estrutura de pastas.",
  },
  {
    id: "d-5",
    titulo: "Testar o novo fluxo de onboarding",
    descricao:
      "Percorra a trilha de onboarding e aponte onde o texto ainda não está claro.",
    destinatario: "Pedro Lima",
    prazo: "2026-12-05",
    criadaEm: "2026-11-26",
    status: "Pendente",
  },
];

const CHAVE = "rampy_demandas";
const ouvintes = new Set<() => void>();
let cache: Demanda[] | null = null;

function ler(): Demanda[] {
  if (cache) return cache;
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) {
      const dados: unknown = JSON.parse(bruto);
      if (Array.isArray(dados)) {
        cache = dados as Demanda[];
        return cache;
      }
    }
  } catch {
    // armazenamento indisponível: usa os exemplos desta sessão
  }
  cache = sementes;
  return cache;
}

function gravar(lista: Demanda[]) {
  cache = lista;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    // sem persistência: a mudança ainda vale para esta sessão
  }
  ouvintes.forEach((ouvinte) => ouvinte());
}

function inscrever(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export function useDemandas(): Demanda[] {
  return useSyncExternalStore(inscrever, ler, ler);
}

export function criarDemanda(dados: {
  titulo: string;
  descricao: string;
  destinatario: string;
  prazo: string;
}) {
  const hoje = new Date().toISOString().slice(0, 10);
  gravar([
    ...ler(),
    {
      ...dados,
      id: `d-${Date.now()}`,
      criadaEm: hoje,
      status: "Pendente",
    },
  ]);
}

export function entregarDemanda(id: string, entrega: string) {
  gravar(
    ler().map((demanda) =>
      demanda.id === id
        ? { ...demanda, entrega, status: "Entregue" as const, nota: undefined }
        : demanda,
    ),
  );
}

export function avaliarDemanda(id: string, aprovada: boolean, nota?: string) {
  gravar(
    ler().map((demanda) =>
      demanda.id === id
        ? {
            ...demanda,
            status: (aprovada ? "Aprovada" : "Em revisão") as StatusDemanda,
            nota: aprovada ? undefined : nota,
          }
        : demanda,
    ),
  );
}

export function formatarPrazo(iso: string) {
  const meses = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  const [ano, mes, dia] = iso.split("-");
  const indice = Number(mes) - 1;
  if (!ano || !dia || !meses[indice]) return iso;
  return `${Number(dia)} ${meses[indice]}. ${ano}`;
}
