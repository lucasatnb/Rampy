/* Execução das aulas: Python e Java no Judge0; outras linguagens ficam indisponíveis. */
import { rodarRemoto, rodarTestesPython } from "@/lib/linguagens";

export interface ResultadoTeste {
  nome: string;
  ok: boolean;
  detalhe?: string;
}

export interface ResultadoAula {
  ok: boolean;
  resultados: ResultadoTeste[];
  erro?: string;
  motivo?: string;
  livre?: boolean;
  indisponivel?: boolean;
}

const SUPORTADAS = new Set(["python", "java"]);

export function linguaSuportada(linguagem: string): boolean {
  return SUPORTADAS.has(linguagem);
}

const linha = (v: unknown): string =>
  String(v == null ? "" : v)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

/** O teste que falhou, em uma linha — sem pilha de erro e sem jargão. */
export function motivoFalha(r: ResultadoAula): string {
  if (r.indisponivel) return "Esta linguagem ainda não pode ser executada aqui.";
  const falha = r.resultados.find((t) => !t.ok);
  if (falha) return linha(falha.detalhe || `teste “${falha.nome}” não passou`);
  return linha(r.erro || r.motivo || "A verificação não passou.");
}

function normalizar(r: {
  ok: boolean;
  resultados?: ResultadoTeste[];
  erro?: string;
  livre?: boolean;
}): ResultadoAula {
  const resultados = r.resultados || [];
  const falha = resultados.find((t) => !t.ok);
  return {
    ok: r.ok,
    resultados,
    erro: r.erro ? linha(r.erro) : undefined,
    motivo: falha ? linha(falha.detalhe || falha.nome) : undefined,
    livre: r.livre,
  };
}

/** Mesmo contrato de antes: {ok, resultados, logs, erro} vira resumo curto. */
export async function executarExercicio(pedido: {
  linguagem: string;
  codigo: string;
  testes: string;
  chave: string;
}): Promise<ResultadoAula> {
  if (!linguaSuportada(pedido.linguagem)) {
    return {
      ok: false,
      resultados: [],
      indisponivel: true,
      erro: "linguagem indisponível nesta aula",
    };
  }
  try {
    if (pedido.linguagem === "python") {
      const r = pedido.testes.trim()
        ? await rodarTestesPython(pedido.codigo, pedido.testes)
        : await rodarRemoto("python", pedido.codigo, pedido.chave || "variaveis");
      return normalizar(r);
    }
    // Java roda no modo livre: compilar e executar sem erro conta como teste.
    return normalizar(await rodarRemoto("java", pedido.codigo, ""));
  } catch (e) {
    return { ok: false, resultados: [], erro: linha((e as Error).message) };
  }
}
