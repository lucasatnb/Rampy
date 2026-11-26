/* Revisão do Lunox: só comenta o código. Nunca aprova nem mexe no progresso. */
import { cabecalho } from "@/lib/conta";
import { sessao } from "@/lib/sessao";

export interface Revisao {
  resumo: string;
  pontos: string[];
  proximo_passo: string;
}

export interface PedidoRevisao {
  codigo: string;
  enunciado: string;
  requisitos: string[];
  testes: string;
  trilha: string;
  aula: string;
  skill: string;
  linguagem: string;
  pedido?: string;
}

const texto = (v: unknown, n = 600): string =>
  String(v == null ? "" : v)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, n);

export async function pedirRevisao(p: PedidoRevisao): Promise<{ ok: boolean; revisao?: Revisao; erro?: string }> {
  try {
    const r = await fetch("/api/ia-codigo", {
      method: "POST",
      headers: cabecalho(),
      body: JSON.stringify({
        modo: "revisao",
        codigo: p.codigo,
        enunciado: p.enunciado,
        requisitos: p.requisitos.slice(0, 8),
        testes: p.testes,
        trilha: p.trilha,
        aula: p.aula,
        skill: p.skill,
        linguagem: p.linguagem,
        pedido: p.pedido || "",
        session: sessao(),
      }),
    });
    const dados = (await r.json().catch(() => null)) as {
      ok?: boolean;
      dados?: { resumo?: unknown; pontos?: unknown; proximo_passo?: unknown };
      texto?: unknown;
    } | null;

    if (!r.ok || !dados || !dados.ok) {
      return {
        ok: false,
        erro: texto(dados?.texto) || "Não deu para revisar agora. Tente de novo em instantes.",
      };
    }

    const d = dados.dados || {};
    return {
      ok: true,
      revisao: {
        resumo: texto(d.resumo, 900) || "Seu código foi enviado para revisão.",
        pontos: Array.isArray(d.pontos)
          ? d.pontos.map((x) => texto(x, 300)).filter(Boolean).slice(0, 8)
          : [],
        proximo_passo: texto(d.proximo_passo, 400),
      },
    };
  } catch {
    return { ok: false, erro: "Sem conexão com a revisão. Tente de novo em instantes." };
  }
}
