/* Ofensiva, pontos e estrelas acesas. */
import { skillPorId } from "@/data";
import { MAX_DIAS_OFENSIVA, diaAnterior, diaDe, type Ofensiva } from "./ofensiva";
import { podeAcender } from "./progresso";
import { estado, salvar } from "./storage";

export const PONTOS_EXERCICIO = 10;
export const PONTOS_FINAL = 30;

export function skill(id: string) {
  return skillPorId(id);
}

export function acesa(skillId: string): boolean {
  return estado.acesas.has(skillId);
}

export function alternarEstrela(skillId: string): boolean {
  if (!skill(skillId)) return false;
  if (estado.acesas.has(skillId)) estado.acesas.delete(skillId);
  else estado.acesas.add(skillId);
  salvar();
  return estado.acesas.has(skillId);
}

/* Acende a estrela e coloca na fila: o mapa toca a animação de desbloqueio
   na próxima vez que for aberto. Devolve true se a estrela era nova. */
export function acender(skillId: string): boolean {
  const s = skill(skillId);
  if (!s || estado.acesas.has(skillId)) return false;
  // estrela com exercícios só acende quando todos estiverem resolvidos
  if (s.star && !podeAcender(s.star)) return false;
  estado.acesas.add(skillId);
  if (estado.anim.indexOf(skillId) < 0) estado.anim.push(skillId);
  salvar();
  return true;
}

export function pendentesAnim(): string[] {
  return estado.anim.filter((id) => estado.acesas.has(id) && skill(id));
}

export function limparAnim(skillId: string): void {
  estado.anim = estado.anim.filter((id) => id !== skillId);
  salvar();
}

export function pontosDoExercicio(_sid: string, chave: string): number {
  return chave === "final" ? PONTOS_FINAL : PONTOS_EXERCICIO;
}

/** Pontos derivados do estado: nunca somam o mesmo exercício duas vezes. */
export function pontosTotais(): number {
  let total = 0;
  const ex = estado.exercicios || {};
  Object.keys(ex).forEach((sid) => {
    const mapa = ex[sid] || {};
    Object.keys(mapa).forEach((chave) => {
      if (mapa[chave]) total += pontosDoExercicio(sid, chave);
    });
  });
  // exercícios embutidos das aulas (marcados em progresso[id][aula].editor)
  const pr = estado.progresso || {};
  Object.keys(pr).forEach((id) => {
    if (id.indexOf("estrela:") === 0) return; // exercício avulso já contado acima
    const p = pr[id] || {};
    Object.keys(p).forEach((aula) => {
      if (p[aula] && p[aula].editor) total += PONTOS_EXERCICIO;
    });
  });
  return total;
}

/** Conta 1 visita por dia. Se ontem também veio, a sequência cresce. */
export function registrarVisita(): Ofensiva {
  const hoje = diaDe();
  const o = estado.ofensiva;
  if (o.ultimoDia === hoje) return o;
  const ontem = o.ultimoDia ? diaAnterior(hoje) : "";
  o.atual = o.ultimoDia && o.ultimoDia === ontem ? o.atual + 1 : 1;
  o.ultimoDia = hoje;
  o.recorde = Math.max(o.recorde || 0, o.atual);
  o.dias = (o.dias || []).filter((d) => d !== hoje).concat(hoje).slice(-MAX_DIAS_OFENSIVA);
  salvar();
  return o;
}

export function ofensiva(): Ofensiva {
  return registrarVisita();
}

export function nivelGato(): number {
  const n = estado.acesas.size;
  if (n >= 7) return 3;
  if (n >= 4) return 2;
  return 1;
}
