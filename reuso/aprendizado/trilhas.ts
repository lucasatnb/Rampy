/* Trilhas: criar, remover, concluir e escolher a atual. */
import { trilhaBase, trilhasBase, type AulaBase } from "@/data";
import { acender } from "./gamificacao";
import { progressoDe } from "./progresso";
import { estado, salvar, type Trilha } from "./storage";

function uid(): string {
  return "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
}

export function montar(presetId: string, quando?: number, idFixo?: string): Trilha {
  const base = trilhaBase(presetId);
  if (!base) throw new Error("trilha desconhecida: " + presetId);
  return {
    id: idFixo || uid(),
    preset: presetId,
    nome: base.nome,
    projeto: base.projeto,
    descricao: base.descricao,
    icone: base.icone,
    estrelas: base.estrelas.slice(),
    jaAcesas: (base.jaAcesas || []).slice(),
    aulas: JSON.parse(JSON.stringify(base.aulas)) as AulaBase[],
    criadaEm: quando || Date.now(),
    concluidaEm: null,
  };
}

export function achar(id: string | null): Trilha | null {
  return estado.trilhas.find((t) => t.id === id) || null;
}

export function atualObj(): Trilha | null {
  return achar(estado.atual) || estado.trilhas[0] || null;
}

export function setAtual(id: string): void {
  if (!achar(id)) return;
  estado.atual = id;
  salvar();
}

export function criar(presetId: string): Trilha | null {
  if (!trilhasBase[presetId]) return null;
  const t = montar(presetId, Date.now());
  estado.trilhas.unshift(t);
  estado.atual = t.id;
  salvar();
  return t;
}

export function acharPorPreset(presetId: string): Trilha | null {
  return estado.trilhas.find((t) => t.preset === presetId) || null;
}

export function remover(id: string): void {
  const i = estado.trilhas.findIndex((t) => t.id === id);
  if (i < 0) return;
  estado.trilhas.splice(i, 1);
  delete estado.progresso[id];
  Object.keys(estado.codigo).forEach((k) => {
    if (k.startsWith(id + ":")) delete estado.codigo[k];
  });
  if (estado.atual === id) estado.atual = estado.trilhas[0] ? estado.trilhas[0].id : null;
  salvar();
}

export function concluir(id: string): number {
  const t = achar(id);
  if (!t) return 0;
  let novas = 0;
  t.estrelas.forEach((s) => {
    if (acender(s)) novas++;
  });
  t.concluidaEm = t.concluidaEm || Date.now();
  salvar();
  return novas;
}

/* Acha a aula que ensina essa habilidade: trilha atual primeiro, depois as
   outras; se nenhuma tiver, cria a trilha-modelo que tem. */
export function acharAulaPorSkill(skillId: string): { trilha: Trilha; idx: number } | null {
  const ordem: Trilha[] = [];
  const atual = atualObj();
  if (atual) ordem.push(atual);
  estado.trilhas.forEach((t) => {
    if (t !== atual) ordem.push(t);
  });
  for (const t of ordem) {
    const i = t.aulas.findIndex((a) => a.skill === skillId);
    if (i >= 0) return { trilha: t, idx: i };
  }
  const preset = Object.keys(trilhasBase).find((k) =>
    trilhasBase[k].aulas.some((a) => a.skill === skillId),
  );
  if (!preset) return null;
  const t = criar(preset);
  if (!t) return null;
  return { trilha: t, idx: t.aulas.findIndex((a) => a.skill === skillId) };
}

export function progressoTrilha(id: string): { feitas: number; total: number; pct: number } {
  const t = achar(id);
  if (!t) return { feitas: 0, total: 0, pct: 0 };
  const p = progressoDe(id);
  const feitas = t.aulas.reduce((n, _a, i) => n + (p[i] && p[i].editor ? 1 : 0), 0);
  return {
    feitas,
    total: t.aulas.length,
    pct: t.aulas.length ? Math.round((feitas / t.aulas.length) * 100) : 0,
  };
}
