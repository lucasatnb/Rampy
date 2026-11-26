/* Plano da trilha: chama /api/montar-trilha, revalida e monta o plano local. */
import {
  catalogo,
  estrela as estrelaCatalogo,
  skillDaEstrela,
  skillPorId,
  trilhasBase,
} from "@/data";
import { ler, estado, gravar, salvar, type AulaTrilha, type Trilha } from "./storage";
import { CHAVES } from "./storage";
import { sessao } from "./sessao";

export type Nivel = "nunca_programei" | "sei_o_basico" | "ja_programo";

export interface EtapaPlano {
  estrela: string;
  porque?: string;
  entrega?: string;
}

export interface MarcoPlano {
  titulo?: string;
  descricao?: string;
  entrega?: string;
  etapas?: EtapaPlano[];
}

export interface Jornada {
  projeto?: string;
  resumo?: string;
  pergunta?: string | null;
  aviso?: string | null;
  marcos: MarcoPlano[];
}

export type ResultadoPlano =
  | { tipo: "plano"; jornada: Jornada; local: boolean }
  | { tipo: "recado"; mensagem: string; pergunta: boolean };

const CATALOGO = new Map(catalogo.map((e) => [e.id, e]));

const limpar = (v: unknown, limite: number): string =>
  String(v == null ? "" : v)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limite);

const semAcento = (v: string): string =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Ids de estrelas que a pessoa já acendeu (o estado guarda ids de habilidade). */
export function estrelasAcesas(): string[] {
  const ids: string[] = [];
  estado.acesas.forEach((skillId) => {
    const star = skillPorId(skillId)?.star;
    if (star && !ids.includes(star)) ids.push(star);
  });
  return ids;
}

/** Pré-requisitos diretos e indiretos, da raiz até o pai (sem incluir a estrela). */
export function ancestraisDe(estrela: string): string[] {
  const cadeia: string[] = [];
  let atual = CATALOGO.get(estrela)?.pai || null;
  let voltas = 0;
  while (atual && voltas < 60 && !cadeia.includes(atual)) {
    cadeia.push(atual);
    atual = CATALOGO.get(atual)?.pai || null;
    voltas += 1;
  }
  return cadeia.reverse();
}

function conhecidas(acesas: string[]): Set<string> {
  const s = new Set<string>();
  acesas.forEach((id) => {
    if (!CATALOGO.has(id)) return;
    s.add(id);
    ancestraisDe(id).forEach((p) => s.add(p));
  });
  return s;
}

const porquePadrao = (id: string): string => {
  const nome = CATALOGO.get(id)?.nome || "esta base";
  return `${nome} é uma base do seu projeto.`;
};

const entregaPadrao = (id: string): string => {
  const nome = CATALOGO.get(id)?.nome || "a base";
  return `Um trecho do seu projeto usando ${nome.toLowerCase()}.`;
};

/**
 * Descarta ids inválidos/acesas, junta duplicatas, insere pré-requisitos que
 * faltam antes de cada estrela e limita a 30 etapas.
 */
export function normalizarJornada(jornada: Jornada, acesas = estrelasAcesas()): Jornada {
  const jaSei = conhecidas(acesas);
  const marcos = Array.isArray(jornada?.marcos) ? jornada.marcos : [];
  const textos = new Map<string, EtapaPlano>();
  const ordem: Array<{ marco: number; estrela: string }> = [];
  const vistos = new Set<string>();

  marcos.forEach((marco, mi) => {
    const etapas = Array.isArray(marco?.etapas) ? marco.etapas : [];
    etapas.forEach((etapa) => {
      const id = limpar(etapa?.estrela, 8);
      if (!CATALOGO.has(id) || jaSei.has(id)) return;
      const porque = limpar(etapa?.porque, 140);
      const entrega = limpar(etapa?.entrega, 100);
      const anterior = textos.get(id);
      if (anterior) {
        if (!anterior.porque && porque) anterior.porque = porque;
        if (!anterior.entrega && entrega) anterior.entrega = entrega;
      } else {
        textos.set(id, { estrela: id, porque, entrega });
      }
      if (!vistos.has(id)) {
        vistos.add(id);
        ordem.push({ marco: mi, estrela: id });
      }
    });
  });

  const finais: Array<{ marco: number; estrela: string }> = [];
  const colocadas = new Set<string>();
  const colocar = (marco: number, id: string) => {
    if (colocadas.has(id) || jaSei.has(id) || !CATALOGO.has(id)) return;
    colocadas.add(id);
    finais.push({ marco, estrela: id });
  };

  for (const item of ordem) {
    ancestraisDe(item.estrela).forEach((p) => colocar(item.marco, p));
    colocar(item.marco, item.estrela);
    if (finais.length >= 30) break;
  }

  const saida = marcos
    .map((marco, mi) => {
      const etapas = finais
        .filter((f) => f.marco === mi)
        .map((f) => {
          const texto = textos.get(f.estrela);
          return {
            estrela: f.estrela,
            porque: texto?.porque || porquePadrao(f.estrela),
            entrega: texto?.entrega || entregaPadrao(f.estrela),
          } satisfies EtapaPlano;
        });
      return {
        titulo: limpar(marco?.titulo, 80) || undefined,
        descricao: limpar(marco?.descricao, 200) || undefined,
        entrega: limpar(marco?.entrega, 120) || undefined,
        etapas,
      } satisfies MarcoPlano;
    })
    .filter((marco) => !!marco.etapas?.length);

  return {
    projeto: limpar(jornada.projeto, 120) || undefined,
    resumo: limpar(jornada.resumo, 400) || undefined,
    pergunta: jornada.pergunta ? limpar(jornada.pergunta, 300) : null,
    aviso: jornada.aviso ? limpar(jornada.aviso, 300) : null,
    marcos: saida,
  };
}

/* ---------------- plano local (sem IA) ---------------- */

const INTENCOES: Array<{ preset: string; termos: RegExp[] }> = [
  { preset: "bot-discord", termos: [/discord/, /bot/, /automacao/, /raspagem|scrap/, /mensage/] },
  {
    preset: "crud-alunos",
    termos: [/crud/, /aluno/, /escola/, /cadastro/, /receita/, /api/, /back.?end/, /servidor/],
  },
  { preset: "portfolio-web", termos: [/portfolio/, /site/, /landing/, /curriculo/, /calculadora/, /formulario/] },
  { preset: "jogo", termos: [/jogo/, /game/, /2d/] },
  { preset: "const-MO", termos: [/celular/, /mobile/, /android/, /ios/, /flutter/, /app/] },
  { preset: "const-IA", termos: [/inteligencia/, /machine/, /classificador/, /dados/, /foto/, /imagem/, /modelo/] },
  { preset: "const-SE", termos: [/seguranca/, /cripto/, /senha/, /autentica/] },
  { preset: "const-EM", termos: [/arduino/, /sensor/, /iot/, /embarcado/, /placa/] },
  { preset: "const-DO", termos: [/deploy/, /nuvem/, /cloud/, /docker/, /infra/] },
  { preset: "const-JG", termos: [/jogos/] },
  { preset: "const-ES", termos: [/teste/, /qualidade/, /refatora/, /arquitetura/] },
  { preset: "const-DB", termos: [/banco/, /sql/, /postgres/] },
  { preset: "const-BE", termos: [/back.?end/, /endpoint/] },
  { preset: "const-FE", termos: [/front.?end/, /html/, /css/, /interface/] },
  { preset: "const-FU", termos: [/logica/, /programacao/, /fundamento/, /comecar/, /zero/] },
];

function presetLocal(projeto: string): string {
  const texto = semAcento(projeto);
  let melhor = "";
  let nota = 0;
  INTENCOES.forEach(({ preset, termos }) => {
    const pontos = termos.reduce((n, re) => n + (re.test(texto) ? 1 : 0), 0);
    if (pontos > nota) {
      nota = pontos;
      melhor = preset;
    }
  });
  if (melhor) return melhor;
  if (/site|web|pagina|app/.test(texto)) return "portfolio-web";
  return "const-FU";
}

const TITULOS = [
  "O primeiro passo",
  "Ganhando forma",
  "Deixando funcionando",
  "Últimos detalhes",
  "Para fechar",
];

function etapasDoPreset(presetId: string): EtapaPlano[] {
  const base = trilhasBase[presetId];
  if (!base) return [];
  const etapas: EtapaPlano[] = [];
  base.aulas.forEach((aula) => {
    const star = skillPorId(aula.skill)?.star;
    if (!star) return;
    etapas.push({
      estrela: star,
      porque: limpar(aula.why || aula.texto, 140) || porquePadrao(star),
      entrega: limpar(aula.titulo, 100),
    });
  });
  return etapas;
}

/** Plano B por palavras-chave quando a IA falha ou demora. */
export function planoLocal(projeto: string, _nivel: Nivel = "nunca_programei"): Jornada {
  const presetId = presetLocal(projeto);
  const base = trilhasBase[presetId];
  const etapas = etapasDoPreset(presetId);
  const marcos: MarcoPlano[] = [];
  const tamanho = Math.max(2, Math.ceil(etapas.length / 3));
  for (let i = 0; i < etapas.length; i += tamanho) {
    marcos.push({
      titulo: TITULOS[marcos.length] || `Etapa ${marcos.length + 1}`,
      descricao: undefined,
      etapas: etapas.slice(i, i + tamanho),
    });
  }
  return normalizarJornada(
    {
      projeto: limpar(projeto, 120) || "Seu projeto",
      resumo: base?.descricao || "Um caminho curto até o seu projeto funcionando.",
      marcos,
    },
    estrelasAcesas(),
  );
}

/* ---------------- resposta da IA ---------------- */

function objeto(valor: unknown): Record<string, unknown> | null {
  return valor && typeof valor === "object" ? (valor as Record<string, unknown>) : null;
}

function lerJson(valor: unknown): unknown {
  if (typeof valor !== "string") return valor;
  try {
    return JSON.parse(valor);
  } catch {
    return null;
  }
}

/** Aceita `{jornada}`, a jornada direta ou `choices[0].message.content`. */
export function extrairJornada(corpo: unknown): Jornada | null {
  let obj = objeto(lerJson(corpo));
  if (!obj) return null;

  const escolha = Array.isArray(obj.choices) ? objeto(obj.choices[0]) : null;
  const mensagem = escolha ? objeto(escolha.message) : null;
  if (mensagem && typeof mensagem.content === "string") {
    obj = objeto(lerJson(mensagem.content));
  }
  if (!obj) return null;

  const jornada = objeto(obj.jornada);
  if (jornada) obj = jornada;
  if (!Array.isArray(obj.marcos)) return null;
  return obj as unknown as Jornada;
}

/** Chama a rota; qualquer falha cai no plano local (sem mensagem técnica). */
export async function pedirPlano(
  entrada: { projeto: string; nivel: Nivel; detalhes?: string },
  limiteMs = 70000,
): Promise<ResultadoPlano> {
  const acesas = estrelasAcesas();
  const projeto = limpar(entrada.projeto, 400);
  const detalhes = limpar(entrada.detalhes, 200);
  const controlador = new AbortController();
  const relogio = setTimeout(() => controlador.abort(), limiteMs);

  let corpo: unknown = null;
  try {
    const r = await fetch("/api/montar-trilha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session: sessao(),
        projeto,
        nivel: entrada.nivel,
        acesas,
        detalhes: detalhes || undefined,
      }),
      signal: controlador.signal,
    });
    if (r.ok) corpo = await r.json().catch(() => null);
  } catch {
    /* sem rede, timeout ou resposta inválida: plano local */
  } finally {
    clearTimeout(relogio);
  }

  const jornada = extrairJornada(corpo);
  if (jornada) {
    if (!jornada.marcos.length) {
      if (jornada.pergunta) return { tipo: "recado", mensagem: jornada.pergunta, pergunta: true };
      if (jornada.aviso) return { tipo: "recado", mensagem: jornada.aviso, pergunta: false };
    }
    const pronta = normalizarJornada(jornada, acesas);
    if (pronta.marcos.length) return { tipo: "plano", jornada: pronta, local: false };
    if (jornada.aviso) return { tipo: "recado", mensagem: jornada.aviso, pergunta: false };
  }

  return { tipo: "plano", jornada: planoLocal(projeto, entrada.nivel), local: true };
}

/* ---------------- persistência ---------------- */

function novoId(): string {
  return "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
}

export function jornadaParaTrilha(jornada: Jornada, projeto = ""): Trilha | null {
  const pronta = normalizarJornada(jornada);
  const aulas: AulaTrilha[] = [];
  const estrelas: string[] = [];
  const vistas = new Set<string>();

  pronta.marcos.forEach((marco) => {
    (marco.etapas || []).forEach((etapa) => {
      if (vistas.has(etapa.estrela)) return;
      const skill = skillDaEstrela(etapa.estrela);
      if (!skill) return;
      const cat = estrelaCatalogo(etapa.estrela);
      vistas.add(etapa.estrela);
      estrelas.push(skill.id);
      aulas.push({
        titulo: cat?.nome || skill.nome,
        skill: skill.id,
        why: etapa.porque || porquePadrao(etapa.estrela),
        texto: etapa.entrega ? `Entrega: ${etapa.entrega}` : undefined,
        passos: etapa.entrega ? [etapa.entrega] : undefined,
      });
    });
  });

  if (!aulas.length) return null;
  const nome = limpar(pronta.projeto || projeto, 60) || "Sua trilha";
  return {
    id: novoId(),
    preset: "ia",
    nome,
    projeto: limpar(pronta.projeto || projeto, 160) || nome,
    descricao: pronta.resumo || "Uma trilha montada para o seu projeto.",
    icone: "Sparkles",
    estrelas,
    jaAcesas: [],
    aulas,
    criadaEm: Date.now(),
    concluidaEm: null,
  };
}

/** Salva a jornada e transforma em trilha ativa. Devolve null se não há etapas. */
export function salvarJornada(jornada: Jornada, projeto = ""): Trilha | null {
  const pronta = normalizarJornada(jornada);
  const trilha = jornadaParaTrilha(pronta, projeto);
  if (!trilha) return null;
  gravar(CHAVES.jornada, pronta);
  estado.trilhas.unshift(trilha);
  estado.atual = trilha.id;
  salvar();
  return trilha;
}

/** Migração única: quem já tem uma jornada antiga ganha a trilha correspondente. */
export function garantirTrilhaDeJornada(): boolean {
  if (estado.trilhas.length) return false;
  const antiga = ler<Jornada | null>(CHAVES.jornada, null);
  if (!antiga || !Array.isArray(antiga.marcos) || !antiga.marcos.length) return false;
  const trilha = jornadaParaTrilha(antiga, antiga.projeto || "");
  if (!trilha) return false;
  estado.trilhas.push(trilha);
  estado.atual = trilha.id;
  salvar();
  return true;
}
