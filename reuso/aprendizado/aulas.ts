/* Aulas das estrelas: normalização, grupos, exercícios e desafio. */
import {
  aulasVideo,
  constelacao,
  conteudoLocal,
  estrela,
  skillPorId,
  type ArquivoExercicio,
  type Conteudo,
  type Desafio,
  type EstrelaConteudo,
  type Exercicio,
  type Grupo,
  type Video,
} from "@/data";
import { estado, gravar, ler } from "./storage";

export const CHAVE_RASCUNHO = "lunox_conteudo_v1";

export const LIMITES = {
  titulo: 120,
  resumo: 300,
  enunciado: 1200,
  requisito: 160,
  dica: 300,
  codigo: 20000,
  arquivo: 60,
} as const;

const txt = (s: unknown, n?: number): string =>
  String(s == null ? "" : s)
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, n || 500);

const bloco = (s: unknown, n?: number): string =>
  String(s == null ? "" : s)
    .replace(/\r\n?/g, "\n")
    .slice(0, n || LIMITES.codigo);

/* ---------------- YouTube ---------------- */

export function ytId(fonte: unknown): string | null {
  const s = String(fonte || "");
  const m = s.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/|live\/|\/v\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(s.trim()) ? s.trim() : null;
}

export function ytInicio(fonte: unknown): number {
  const m = String(fonte || "").match(/[?&#](?:t|start)=(\d+)/);
  return m ? Number(m[1]) : 0;
}

export function normalizarVideo(v: unknown): Video | null {
  const obj = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  const bruto =
    typeof v === "string"
      ? v
      : (obj.yt as string) || (obj.url as string) || (obj.embed as string) || (obj.src as string) || "";
  const id = ytId(bruto);
  if (!id) return null;
  return {
    id,
    inicio: ytInicio(bruto),
    titulo: txt(obj.titulo, LIMITES.titulo),
    url: "https://www.youtube.com/watch?v=" + id,
  };
}

export function srcEmbed(video: Video): string {
  return (
    "https://www.youtube-nocookie.com/embed/" +
    video.id +
    "?rel=0&modestbranding=1" +
    (video.inicio ? "&start=" + video.inicio : "")
  );
}

/* ---------------- grupos ---------------- */

export function normalizarDesafio(d: unknown): Desafio | null {
  if (!d || typeof d !== "object") return null;
  const obj = d as Record<string, unknown>;
  const requisitos = (Array.isArray(obj.requisitos) ? obj.requisitos : [])
    .map((r) => txt(r, LIMITES.requisito))
    .filter((r): r is string => !!r)
    .slice(0, 8);
  const desafio: Desafio = {
    titulo: txt(obj.titulo, LIMITES.titulo),
    enunciado: String(obj.enunciado == null ? "" : obj.enunciado)
      .trim()
      .slice(0, LIMITES.enunciado),
    requisitos,
    dica: txt(obj.dica, LIMITES.dica),
  };
  return desafio.titulo || desafio.enunciado ? desafio : null;
}

/** Linguagem do exercício. O padrão novo é Python; o código antigo é detectado. */
export function linguagemDe(x: unknown): string {
  const obj = x && typeof x === "object" ? (x as Record<string, unknown>) : {};
  const bruta = String(obj.linguagem || "")
    .trim()
    .toLowerCase();
  if (bruta === "python" || bruta === "javascript" || bruta === "typescript" || bruta === "blocos") {
    return bruta;
  }
  const codigo = String(obj.starter || obj.solucao || "");
  if (/\bdef\s+solucao\s*\(/.test(codigo)) return "python";
  if (/\bfunction\s+solucao\s*\(/.test(codigo)) return "javascript";
  return "python";
}

/** Arquivos de apoio de um exercício (o principal é concatenado por último). */
function normalizarArquivos(lista: unknown, linguagem: string): ArquivoExercicio[] {
  if (!Array.isArray(lista) || linguagem === "blocos") return [];
  const ext = linguagem === "python" ? ".py" : linguagem === "typescript" ? ".ts" : ".js";
  const out = lista
    .slice(0, 6)
    .map((a, i) => {
      const bruto = a && typeof a === "object" ? (a as Record<string, unknown>) : {};
      return {
        nome: txt(bruto.nome, LIMITES.arquivo) || "arquivo" + (i + 1) + ext,
        principal: !!bruto.principal,
        starter: bloco(bruto.starter),
        solucao: bloco(bruto.solucao || bruto.starter),
      };
    })
    .filter((a) => a.starter || a.solucao);
  if (out.length && !out.some((a) => a.principal)) out[out.length - 1].principal = true;
  return out;
}

/**
 * Exercício de código ou escrito.
 * - com `testes`: o editor abre e corrige automaticamente;
 * - sem `testes`: a pessoa lê e marca como concluído na trilha.
 */
export function normalizarExercicio(x: unknown): Exercicio | null {
  if (!x || typeof x !== "object") return null;
  const obj = x as Record<string, unknown>;
  const requisitos = Array.isArray(obj.requisitos)
    ? obj.requisitos
    : String(obj.requisitos == null ? "" : obj.requisitos).split("\n");
  const linguagem = linguagemDe(x);
  const ex: Exercicio = {
    titulo: txt(obj.titulo, LIMITES.titulo),
    enunciado: String(obj.enunciado == null ? "" : obj.enunciado)
      .trim()
      .slice(0, LIMITES.enunciado),
    requisitos: requisitos
      .map((r) => txt(r, LIMITES.requisito))
      .filter((r): r is string => !!r)
      .slice(0, 8),
    dica: txt(obj.dica, LIMITES.dica),
    linguagem,
    starter: bloco(obj.starter),
    solucao: bloco(obj.solucao),
    testes: bloco(obj.testes),
    arquivos: normalizarArquivos(obj.arquivos, linguagem),
  };
  const temCodigo = !!(ex.starter.trim() || ex.solucao.trim() || ex.testes.trim());
  const temTexto = !!(ex.titulo || ex.enunciado);
  return temCodigo || temTexto ? ex : null;
}

/** Completa os testes com o helper `check` quando o autor escreveu só as verificações. */
export function testesComSuite(testes: unknown): string {
  const t = String(testes == null ? "" : testes).replace(/\r\n?/g, "\n");
  if (!t.trim() || /function\s+check\s*\(/.test(t)) return t;
  return (
    "var out = [];\n" +
    "function check(nome, fn) {\n" +
    "  try {\n" +
    "    var r = fn();\n" +
    '    out.push({ nome: nome, ok: r === true, detalhe: r === true ? "" : String(r || "falhou") });\n' +
    "  } catch (e) {\n" +
    '    out.push({ nome: nome, ok: false, detalhe: e.message });\n' +
    "  }\n" +
    "}\n" +
    t +
    "\nreturn out;"
  );
}

export function normalizarGrupo(g: unknown, indice: number): Grupo | null {
  if (!g || typeof g !== "object") return null;
  const obj = g as Record<string, unknown>;
  const fontes = ([] as unknown[]).concat(
    (obj.videos as unknown) || (obj.video as unknown) || (obj.yt as unknown) || [],
  );
  const videos = fontes.map(normalizarVideo).filter((v): v is Video => !!v);
  const grupo: Grupo = {
    id: txt(obj.id, 40) || "g" + (indice + 1),
    titulo: txt(obj.titulo, LIMITES.titulo) || "Aula " + (indice + 1),
    resumo: txt(obj.resumo, LIMITES.resumo),
    videos,
    desafio: normalizarDesafio(obj.desafio),
    exercicio: normalizarExercicio(obj.exercicio),
  };
  return grupo.videos.length || grupo.desafio || grupo.exercicio ? grupo : null;
}

/** Converte o formato antigo (aulas-yt.js) em grupos. */
export function gruposLegado(sid: string): Grupo[] {
  const bruto = aulasVideo[sid];
  if (!bruto) return [];
  if (typeof bruto === "string") {
    const g = normalizarGrupo({ videos: [bruto] }, 0);
    return g ? [g] : [];
  }
  if (Array.isArray(bruto)) {
    const g = normalizarGrupo({ videos: bruto }, 0);
    return g ? [g] : [];
  }
  const g = normalizarGrupo(bruto, 0);
  return g ? [g] : [];
}

/* ---------------- dados ---------------- */

function vazio(): Conteudo {
  return { versao: 1, atualizado: "", estrelas: {} };
}

function arquivo(): Conteudo {
  return conteudoLocal && typeof conteudoLocal === "object" && conteudoLocal.estrelas
    ? conteudoLocal
    : vazio();
}

function rascunho(): Conteudo | null {
  const d = ler<Conteudo | null>(CHAVE_RASCUNHO, null);
  return d && typeof d === "object" && d.estrelas ? d : null;
}

export function dados(): Conteudo {
  const r = rascunho();
  if (r) return r;
  const a = arquivo();
  return { versao: a.versao || 1, atualizado: a.atualizado || "", estrelas: a.estrelas || {} };
}

export function salvarRascunho(obj: { estrelas?: Record<string, EstrelaConteudo> }): Conteudo {
  const limpo: Conteudo = {
    versao: 1,
    atualizado: new Date().toISOString().slice(0, 10),
    estrelas: (obj && obj.estrelas) || {},
  };
  gravar(CHAVE_RASCUNHO, limpo);
  return limpo;
}

export function descartarRascunho(): void {
  try {
    localStorage.removeItem(CHAVE_RASCUNHO);
  } catch {
    /* ignore */
  }
}

export function temRascunho(): boolean {
  return !!rascunho();
}

/** Grupos publicados/editados de uma estrela (rascunho > arquivo > legado). */
export function gruposDe(sid: string): Grupo[] {
  const d = dados();
  const alvo = d.estrelas[sid];
  if (alvo && Array.isArray(alvo.grupos)) {
    const grupos = alvo.grupos.map(normalizarGrupo).filter((g): g is Grupo => !!g);
    if (grupos.length) return grupos;
  }
  return gruposLegado(sid);
}

/** Quantos grupos cada estrela tem (para os selos da admin). */
export function resumo(): Record<string, number> {
  const d = dados();
  const out: Record<string, number> = {};
  Object.keys(d.estrelas || {}).forEach((sid) => {
    const g = (d.estrelas[sid] && d.estrelas[sid].grupos) || [];
    const n = g.map(normalizarGrupo).filter(Boolean).length;
    if (n) out[sid] = n;
  });
  return out;
}

/** Exercício de um grupo (índice), já normalizado. */
export function exercicioDe(sid: string, indice: number): Exercicio | null {
  const grupo = gruposDe(sid)[indice];
  const ex = grupo ? grupo.exercicio : null;
  // a estrela FU1 (Lógica de programação) é sempre em blocos
  if (ex && sid === "FU1") ex.linguagem = "blocos";
  return ex;
}

/** Desafio final da estrela (opcional), já normalizado. */
export function desafioFinalDe(sid: string): Exercicio | null {
  const d = dados();
  const alvo = d.estrelas[sid];
  const ex = alvo ? normalizarExercicio(alvo.desafioFinal) : null;
  if (ex && sid === "FU1") ex.linguagem = "blocos";
  return ex;
}

export interface ExercicioResumo {
  chave: string;
  tipo: "grupo" | "final";
  indice: number;
  titulo: string;
  linguagem: string;
  codigo: boolean;
}

/**
 * Todos os exercícios que contam para acender a estrela.
 * Cada item: { chave, tipo: 'grupo'|'final', indice, titulo, linguagem, codigo }
 */
export function exerciciosDe(sid: string): ExercicioResumo[] {
  const out: ExercicioResumo[] = [];
  gruposDe(sid).forEach((g, i) => {
    if (!g.exercicio) return;
    out.push({
      chave: "g" + i,
      tipo: "grupo",
      indice: i,
      titulo: g.exercicio.titulo || g.titulo || "Exercício " + (i + 1),
      linguagem: g.exercicio.linguagem || "python",
      codigo: !!g.exercicio.testes.trim(),
    });
  });
  const final = desafioFinalDe(sid);
  if (final) {
    out.push({
      chave: "final",
      tipo: "final",
      indice: -1,
      titulo: final.titulo || "Desafio final",
      linguagem: final.linguagem || "python",
      codigo: !!final.testes.trim(),
    });
  }
  return out;
}

export function temExercicios(sid: string): boolean {
  return exerciciosDe(sid).length > 0;
}

/** Salva um desafio gerado dentro do grupo (rascunho). */
export function salvarDesafio(
  sid: string,
  indice: number,
  desafio: unknown,
  resumoGerado?: unknown,
): Conteudo | null {
  const d = JSON.parse(JSON.stringify(dados())) as Conteudo;
  d.estrelas = d.estrelas || {};
  const alvo = d.estrelas[sid] || (d.estrelas[sid] = { grupos: [] });
  if (!Array.isArray(alvo.grupos) || !alvo.grupos.length) {
    const legado = gruposLegado(sid);
    alvo.grupos = legado.length
      ? (JSON.parse(JSON.stringify(legado)) as unknown[])
      : [{ titulo: "Aula 1", videos: [] }];
  }
  const g = alvo.grupos[indice] as Record<string, unknown> | undefined;
  if (!g) return null;
  g.desafio = desafio;
  // o resumo da aula também vem da IA — só entra se ainda estiver vazio
  if (resumoGerado && !String(g.resumo || "").trim()) g.resumo = txt(resumoGerado, LIMITES.resumo);
  return salvarRascunho(d);
}

/** Tipo da estrela: 'codigo' (padrão) ou 'dissertativa'. */
export function tipoDe(sid: string): "codigo" | "dissertativa" {
  const d = dados();
  const alvo = d.estrelas[sid];
  return alvo && alvo.tipo === "dissertativa" ? "dissertativa" : "codigo";
}

/* ---------------- arquivo gerado ---------------- */

export function exportarArquivo(): string {
  const d = dados();
  const corpo = JSON.stringify(
    { versao: 1, atualizado: new Date().toISOString().slice(0, 10), estrelas: d.estrelas || {} },
    null,
    2,
  );
  return [
    "/* ============================================================",
    "   Conteúdo das estrelas — AULAS E DESAFIOS",
    "",
    "   Gerado pela página admin.html. Cada estrela pode ter vários grupos;",
    "   cada grupo tem um vídeo do YouTube, um desafio e, opcionalmente, um",
    "   exercício de código. A estrela também pode ter um desafio final.",
    "",
    "   A estrela só acende quando todos os exercícios forem resolvidos.",
    "   Substitua este arquivo pelo que a admin baixou e faça o deploy.",
    "   ============================================================ */",
    "window.LUNOX_CONTEUDO = " + corpo + ";",
    "",
  ].join("\n");
}

/* ---------------- IA ---------------- */

export const MOLDE_PADRAO = [
  "Um mini-exercício no nível da aula, que a pessoa resolve em 15–30 minutos.",
  "Use só o que as aulas anteriores e esta já ensinaram — nada de recursos que ela ainda não viu.",
  "Situação ligada ao projeto dela, depois o que precisa devolver.",
  "De 2 a 4 requisitos curtos e verificáveis.",
  "Uma dica que orienta sem entregar a solução.",
].join("\n");

/** Habilidades que a pessoa já acendeu (nomes), para a IA não pedir o que ela não sabe. */
export function habilidadesSabidas(): string[] {
  const out: string[] = [];
  estado.acesas.forEach((id) => {
    const s = skillPorId(id);
    if (s && s.nome) out.push(s.nome);
  });
  return out.slice(0, 40);
}

export interface PedidoDesafio {
  sid: string;
  objetivo?: unknown;
  contexto?: unknown;
  linguagem?: unknown;
  molde?: unknown;
  session?: string;
  tipo?: "codigo" | "dissertativa";
  grupo?: unknown;
  aulaResumo?: unknown;
}

export async function gerarDesafio(pedido: PedidoDesafio): Promise<{
  desafio: unknown;
  resumo: string;
  tipo: "codigo" | "dissertativa";
}> {
  const e = estrela(pedido.sid) || { id: pedido.sid, nome: pedido.sid, raiz: "" };
  const c = constelacao(e.raiz);
  const r = await fetch("/api/desafio-estrela", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session: pedido.session || "admin",
      estrela: { id: e.id, nome: e.nome, nivel: (e as { nivelNome?: string }).nivelNome || "", constelacao: (c && c.nome) || e.raiz || "" },
      objetivo: txt(pedido.objetivo, 400),
      contexto: txt(pedido.contexto, 400),
      linguagem: txt(pedido.linguagem, 40),
      molde: String(pedido.molde || "").slice(0, 600),
      tipo: pedido.tipo === "dissertativa" ? "dissertativa" : "codigo",
      grupo: txt(pedido.grupo, 120),
      aulaResumo: txt(pedido.aulaResumo, 400),
      sabidas: habilidadesSabidas(),
    }),
  });
  const data = (await r.json().catch(() => null)) as {
    desafio?: unknown;
    resumo?: unknown;
    tipo?: string;
    error?: { message?: string };
  } | null;
  if (!r.ok || !data || !data.desafio) {
    throw new Error((data && data.error && data.error.message) || "HTTP " + r.status);
  }
  return {
    desafio: data.desafio,
    resumo: txt(data.resumo, LIMITES.resumo),
    tipo: data.tipo === "dissertativa" ? "dissertativa" : "codigo",
  };
}

/* ---------------- prova (estrela com testes automáticos) ---------------- */

export function podeProvar(sid: string): boolean {
  return exerciciosDe(sid).some((e) => e.codigo);
}

export interface ProvaEscolhida extends ExercicioResumo {
  exercicio: Exercicio;
}

/**
 * Desafio final quando ele tem testes; senão o último exercício de grupo com
 * testes. A cada tentativa anda para o anterior, dando a volta na lista.
 */
export function escolherProva(sid: string, tentativa = 0): ProvaEscolhida | null {
  const comTestes = exerciciosDe(sid).filter((e) => e.codigo);
  if (!comTestes.length) return null;

  const final = comTestes.find((e) => e.tipo === "final");
  if (final) {
    const ex = desafioFinalDe(sid);
    return ex ? { ...final, exercicio: ex } : null;
  }

  const grupos = comTestes.filter((e) => e.tipo === "grupo");
  if (!grupos.length) return null;
  const n = Math.max(0, Math.floor(Number(tentativa) || 0));
  const alvo = grupos[(grupos.length - 1 - (n % grupos.length) + grupos.length) % grupos.length];
  const ex = exercicioDe(sid, alvo.indice);
  return ex ? { ...alvo, exercicio: ex } : null;
}
