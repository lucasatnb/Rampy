import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Plus,
  RotateCcw,
  Send,
} from "lucide-react";
import { area, campo } from "@/components/campo";
import {
  avaliarDemanda,
  colaboradoresDemandas,
  criarDemanda,
  formatarPrazo,
  useDemandas,
  type Demanda,
  type StatusDemanda,
} from "@/dados/demandas";
import { CartaoTabela } from "@/components/componentes/cartao-tabela";
import { ChipEstado } from "@/components/componentes/chip-estado";
import { EstadoVazio } from "@/components/componentes/estado-vazio";
import { Filtros, type OpcaoFiltro } from "@/components/componentes/filtros";
import { LinhaKpis } from "@/components/componentes/cartao-kpi";
import { PaginaInterna } from "@/components/componentes/pagina-interna";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DemandasGestor() {
  const demandas = useDemandas();
  const [filtro, setFiltro] = useState("todas");
  const [novaAberta, setNovaAberta] = useState(false);
  const [detalhe, setDetalhe] = useState<Demanda | null>(null);
  const [nota, setNota] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    destinatario: colaboradoresDemandas[0],
    prazo: "",
  });

  const contagem = (status: StatusDemanda) =>
    demandas.filter((d) => d.status === status).length;

  const opcoes: OpcaoFiltro[] = [
    { id: "todas", rotulo: "Todas", contagem: demandas.length },
    { id: "Pendente", rotulo: "Pendentes", contagem: contagem("Pendente") },
    { id: "Entregue", rotulo: "Entregues", contagem: contagem("Entregue") },
    { id: "Aprovada", rotulo: "Aprovadas", contagem: contagem("Aprovada") },
    { id: "Em revisão", rotulo: "Em revisão", contagem: contagem("Em revisão") },
  ];

  const visiveis =
    filtro === "todas" ? demandas : demandas.filter((d) => d.status === filtro);

  function enviar(event: FormEvent) {
    event.preventDefault();
    if (!form.titulo.trim() || !form.prazo) return;
    criarDemanda({
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim(),
      destinatario: form.destinatario,
      prazo: form.prazo,
    });
    setForm({
      titulo: "",
      descricao: "",
      destinatario: colaboradoresDemandas[0],
      prazo: "",
    });
    setNovaAberta(false);
  }

  function avaliar(aprovada: boolean) {
    if (!detalhe) return;
    avaliarDemanda(detalhe.id, aprovada, nota.trim() || undefined);
    setNota("");
    setDetalhe(null);
  }

  return (
    <PaginaInterna
      perfil="gestor"
      titulo="Demandas"
      subtitulo="Envie pequenas tarefas aos colaboradores e acompanhe as entregas."
      acao={
        <button
          type="button"
          onClick={() => setNovaAberta(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-5 text-sm font-semibold text-primary-fg hover:brightness-95 motion-reduce:transition-none"
        >
          <Plus size={18} aria-hidden="true" /> Nova demanda
        </button>
      }
    >
      <LinhaKpis
        itens={[
          { rotulo: "Pendentes", valor: String(contagem("Pendente")), icone: ClipboardList },
          { rotulo: "Entregues", valor: String(contagem("Entregue")), icone: Send },
          { rotulo: "Aprovadas", valor: String(contagem("Aprovada")), icone: CheckCircle2 },
          { rotulo: "Em revisão", valor: String(contagem("Em revisão")), icone: RotateCcw },
        ]}
      />

      <Filtros opcoes={opcoes} valor={filtro} onChange={setFiltro} className="mb-4" />

      {visiveis.length === 0 ? (
        <EstadoVazio
          titulo="Nenhuma demanda por aqui"
          descricao="Crie uma nova demanda para enviar uma tarefa a um colaborador."
        />
      ) : (
        <CartaoTabela>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Demanda</TableHead>
                <TableHead>Colaborador</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20 text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visiveis.map((demanda) => (
                <TableRow key={demanda.id}>
                  <TableCell>
                    <span className="block font-medium text-text">{demanda.titulo}</span>
                    <span className="block max-w-md truncate text-xs text-text-dim">
                      {demanda.descricao}
                    </span>
                  </TableCell>
                  <TableCell className="text-text-dim">{demanda.destinatario}</TableCell>
                  <TableCell className="text-text-dim">{formatarPrazo(demanda.prazo)}</TableCell>
                  <TableCell><ChipEstado status={demanda.status} /></TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setDetalhe(demanda);
                        setNota("");
                      }}
                      className="min-h-11 rounded-pill px-3 text-sm font-semibold text-primary-on-soft hover:bg-primary-soft"
                    >
                      Ver
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CartaoTabela>
      )}

      <Sheet open={novaAberta} onOpenChange={setNovaAberta}>
        <SheetContent
          side="right"
          className="w-full max-w-[440px] rounded-l-[24px] border-border bg-surface p-0"
        >
          <form onSubmit={enviar} className="flex h-full flex-col">
            <div className="border-b border-divider p-6">
              <SheetTitle className="font-display text-lg font-semibold text-text">
                Nova demanda
              </SheetTitle>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">Título</span>
                <input
                  required
                  className={campo}
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  placeholder="Ex.: Revisar o guia de instalação"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">Descrição</span>
                <textarea
                  className={area}
                  rows={4}
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  placeholder="O que o colaborador precisa entregar?"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">Colaborador</span>
                <select
                  className={campo}
                  value={form.destinatario}
                  onChange={(e) => setForm({ ...form, destinatario: e.target.value })}
                >
                  {colaboradoresDemandas.map((nome) => (
                    <option key={nome} value={nome}>{nome}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">Prazo</span>
                <input
                  type="date"
                  required
                  className={campo}
                  value={form.prazo}
                  onChange={(e) => setForm({ ...form, prazo: e.target.value })}
                />
              </label>
            </div>
            <div className="border-t border-divider p-6">
              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-pill bg-primary px-6 text-sm font-semibold text-primary-fg"
              >
                <Send size={17} aria-hidden="true" /> Enviar demanda
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <Sheet open={detalhe !== null} onOpenChange={(aberto) => !aberto && setDetalhe(null)}>
        <SheetContent
          side="right"
          className="w-full max-w-[440px] rounded-l-[24px] border-border bg-surface p-0"
        >
          {detalhe ? (
            <div className="flex h-full flex-col">
              <div className="border-b border-divider p-6">
                <SheetTitle className="font-display text-lg font-semibold text-text">
                  {detalhe.titulo}
                </SheetTitle>
                <div className="mt-3"><ChipEstado status={detalhe.status} /></div>
              </div>
              <div className="flex-1 space-y-5 overflow-y-auto p-6 text-sm">
                <p className="text-text-dim">{detalhe.descricao}</p>
                <dl className="grid grid-cols-2 gap-4 rounded-card bg-surface-raised p-4">
                  <div>
                    <dt className="text-xs text-text-dim">Colaborador</dt>
                    <dd className="font-medium text-text">{detalhe.destinatario}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text-dim">Prazo</dt>
                    <dd className="font-medium text-text">{formatarPrazo(detalhe.prazo)}</dd>
                  </div>
                </dl>
                {detalhe.entrega ? (
                  <div>
                    <p className="mb-2 font-display text-sm font-semibold text-text">
                      Entrega do colaborador
                    </p>
                    <p className="rounded-card border border-border bg-surface-raised p-4 text-text-dim">
                      {detalhe.entrega}
                    </p>
                  </div>
                ) : (
                  <p className="text-text-dim">
                    Ainda não houve entrega. O colaborador verá esta demanda ao entrar.
                  </p>
                )}
                {detalhe.nota ? (
                  <div>
                    <p className="mb-2 font-display text-sm font-semibold text-text">
                      Nota da revisão
                    </p>
                    <p className="rounded-card border border-error/30 bg-error-soft p-4 text-error-fg">
                      {detalhe.nota}
                    </p>
                  </div>
                ) : null}
                {detalhe.status === "Entregue" ? (
                  <label className="grid gap-2">
                    <span className="font-medium text-text">
                      Nota para o colaborador (opcional)
                    </span>
                    <textarea
                      className={area}
                      rows={3}
                      value={nota}
                      onChange={(e) => setNota(e.target.value)}
                      placeholder="O que precisa ser ajustado?"
                    />
                  </label>
                ) : null}
              </div>
              {detalhe.status === "Entregue" ? (
                <div className="flex gap-3 border-t border-divider p-6">
                  <button
                    type="button"
                    onClick={() => avaliar(false)}
                    className="min-h-11 flex-1 rounded-pill border border-border text-sm font-semibold text-text"
                  >
                    Pedir revisão
                  </button>
                  <button
                    type="button"
                    onClick={() => avaliar(true)}
                    className="min-h-11 flex-1 rounded-pill bg-primary px-4 text-sm font-semibold text-primary-fg"
                  >
                    Aprovar
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </PaginaInterna>
  );
}
