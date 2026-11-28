import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  ClipboardList,
  RotateCcw,
  Send,
} from "lucide-react";
import { area } from "@/components/campo";
import {
  entregarDemanda,
  formatarPrazo,
  useDemandas,
  type Demanda,
  type StatusDemanda,
} from "@/dados/demandas";
import { ChipEstado } from "@/components/componentes/chip-estado";
import { EstadoVazio } from "@/components/componentes/estado-vazio";
import { Filtros, type OpcaoFiltro } from "@/components/componentes/filtros";
import { LinhaKpis } from "@/components/componentes/cartao-kpi";
import { PaginaInterna } from "@/components/componentes/pagina-interna";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const COLABORADOR = "Lucas Oliveira";

export function DemandasFuncionario() {
  const demandas = useDemandas();
  const minhas = demandas.filter((d) => d.destinatario === COLABORADOR);
  const [filtro, setFiltro] = useState("todas");
  const [entrega, setEntrega] = useState<Demanda | null>(null);
  const [texto, setTexto] = useState("");

  const contagem = (status: StatusDemanda) =>
    minhas.filter((d) => d.status === status).length;

  const opcoes: OpcaoFiltro[] = [
    { id: "todas", rotulo: "Todas", contagem: minhas.length },
    { id: "Pendente", rotulo: "Pendentes", contagem: contagem("Pendente") },
    { id: "Em revisão", rotulo: "Em revisão", contagem: contagem("Em revisão") },
    { id: "Entregue", rotulo: "Entregues", contagem: contagem("Entregue") },
    { id: "Aprovada", rotulo: "Aprovadas", contagem: contagem("Aprovada") },
  ];

  const visiveis =
    filtro === "todas" ? minhas : minhas.filter((d) => d.status === filtro);

  function enviar(event: FormEvent) {
    event.preventDefault();
    if (!entrega || !texto.trim()) return;
    entregarDemanda(entrega.id, texto.trim());
    setEntrega(null);
    setTexto("");
  }

  return (
    <PaginaInterna
      perfil="funcionario"
      titulo="Minhas Demandas"
      subtitulo="Veja o que foi solicitado pelo gestor e envie suas entregas."
    >
      <LinhaKpis
        itens={[
          { rotulo: "Pendentes", valor: String(contagem("Pendente")), icone: ClipboardList },
          { rotulo: "Em revisão", valor: String(contagem("Em revisão")), icone: RotateCcw },
          { rotulo: "Entregues", valor: String(contagem("Entregue")), icone: Send },
          { rotulo: "Aprovadas", valor: String(contagem("Aprovada")), icone: CheckCircle2 },
        ]}
      />

      <Filtros opcoes={opcoes} valor={filtro} onChange={setFiltro} className="mb-4" />

      {visiveis.length === 0 ? (
        <EstadoVazio
          titulo="Nenhuma demanda nesta lista"
          descricao="Quando o gestor enviar uma tarefa, ela aparece aqui."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visiveis.map((demanda) => (
            <article
              key={demanda.id}
              className="sombra-card flex flex-col rounded-card border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-display text-base font-semibold text-text">
                    {demanda.titulo}
                  </h2>
                  <p className="mt-1 text-xs text-text-dim">
                    Prazo: {formatarPrazo(demanda.prazo)}
                  </p>
                </div>
                <ChipEstado status={demanda.status} />
              </div>

              <p className="mt-3 flex-1 text-sm text-text-dim">{demanda.descricao}</p>

              {demanda.status === "Em revisão" && demanda.nota ? (
                <div className="mt-4 rounded-card border border-error/30 bg-error-soft p-3 text-sm text-error-fg">
                  <strong className="mb-1 block font-semibold">Nota do gestor</strong>
                  {demanda.nota}
                </div>
              ) : null}

              {demanda.status === "Aprovada" && demanda.entrega ? (
                <div className="mt-4 rounded-card bg-success-soft p-3 text-sm text-success-fg">
                  <strong className="mb-1 block font-semibold">Sua entrega</strong>
                  {demanda.entrega}
                </div>
              ) : null}

              <div className="mt-5 flex min-h-11 items-center">
                {demanda.status === "Pendente" || demanda.status === "Em revisão" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEntrega(demanda);
                      setTexto(demanda.entrega ?? "");
                    }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary-soft px-5 text-sm font-semibold text-primary-on-soft"
                  >
                    <Send size={16} aria-hidden="true" />
                    {demanda.status === "Em revisão" ? "Reenviar entrega" : "Enviar entrega"}
                  </button>
                ) : (
                  <span className="text-sm text-text-dim">
                    {demanda.status === "Entregue"
                      ? "Aguardando avaliação do gestor"
                      : "Entrega aprovada"}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <Sheet open={entrega !== null} onOpenChange={(aberto) => !aberto && setEntrega(null)}>
        <SheetContent
          side="right"
          className="w-full max-w-[440px] rounded-l-[24px] border-border bg-surface p-0"
        >
          <form onSubmit={enviar} className="flex h-full flex-col">
            <div className="border-b border-divider p-6">
              <SheetTitle className="font-display text-lg font-semibold text-text">
                Enviar entrega
              </SheetTitle>
              {entrega ? (
                <p className="mt-2 text-sm text-text-dim">{entrega.titulo}</p>
              ) : null}
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {entrega ? (
                <p className="mb-5 rounded-card bg-surface-raised p-4 text-sm text-text-dim">
                  {entrega.descricao}
                </p>
              ) : null}
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">Sua entrega</span>
                <textarea
                  required
                  className={area}
                  rows={7}
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Escreva o que você fez e envie o link do material, se houver."
                />
              </label>
            </div>
            <div className="border-t border-divider p-6">
              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-pill bg-primary px-6 text-sm font-semibold text-primary-fg"
              >
                <Send size={17} aria-hidden="true" /> Enviar entrega
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </PaginaInterna>
  );
}
