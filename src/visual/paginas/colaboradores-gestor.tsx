import { ClipboardCheck, Layers, Mail, MessageSquare, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { colaboradores, competenciasColaborador } from "@/dados/gestor-internas";
import { ChipEstado } from "@/components/componentes/chip-estado";
import { Donut } from "@/components/componentes/donut";
import { EstadoVazio } from "@/components/componentes/estado-vazio";
import { Filtros } from "@/components/componentes/filtros";
import { BarraProgresso } from "@/components/componentes/progresso";
import { LinhaKpis } from "@/components/componentes/cartao-kpi";
import { PaginaInterna } from "@/components/componentes/pagina-interna";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const abas = [
  { id: "todos", rotulo: "Todos", contagem: 42 },
  { id: "ativos", rotulo: "Ativos", contagem: 42 },
  { id: "inativos", rotulo: "Inativos", contagem: 2 },
  { id: "convites", rotulo: "Convites", contagem: 3 },
];

export function ColaboradoresGestor() {
  const [aba, setAba] = useState("todos");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [atual, setAtual] = useState<(typeof colaboradores)[number] | null>(null);
  const [abaDrawer, setAbaDrawer] = useState("visao");

  const alternar = (email: string) =>
    setSelecionados((antes) =>
      antes.includes(email) ? antes.filter((e) => e !== email) : [...antes, email],
    );

  return (
    <PaginaInterna
      perfil="gestor"
      titulo="Colaboradores"
      subtitulo="Gerencie sua equipe, acompanhe o progresso e organize os acessos."
    >
      <LinhaKpis
        itens={[
          { rotulo: "Colaboradores ativos", valor: "42", icone: Users },
          { rotulo: "Convites pendentes", valor: "3", icone: Mail },
          { rotulo: "Inativos", valor: "2", icone: Users },
          { rotulo: "Conquistas da equipe", valor: "36", icone: Trophy },
        ]}
      />

      <Filtros opcoes={abas} valor={aba} onChange={setAba} className="mb-4" />

      {aba === "inativos" || aba === "convites" ? (
        <EstadoVazio
          titulo={aba === "inativos" ? "Nenhum colaborador inativo" : "Nenhum convite pendente"}
          descricao="Não há itens nesta lista no momento."
        />
      ) : (
        <div className="sombra-card overflow-hidden rounded-card border border-border bg-surface">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <span className="sr-only">Selecionar</span>
                  </TableHead>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Trilhas ativas</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colaboradores.map((pessoa) => (
                  <TableRow key={pessoa.email} className="cursor-pointer">
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selecionados.includes(pessoa.email)}
                        onChange={() => alternar(pessoa.email)}
                        aria-label={`Selecionar ${pessoa.nome}`}
                        className="size-5 accent-[var(--primary)]"
                      />
                    </TableCell>
                    <TableCell onClick={() => setAtual(pessoa)}>
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary-on-soft">
                          {pessoa.nome.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-text">{pessoa.nome}</span>
                          <span className="block text-xs text-text-dim">{pessoa.email}</span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-dim">{pessoa.cargo}</TableCell>
                    <TableCell className="text-text-dim">{pessoa.trilhas}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <BarraProgresso valor={pessoa.progresso} className="w-24" />
                        <span className="text-xs font-semibold tabular-nums">{pessoa.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ChipEstado status={pessoa.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-divider px-4 py-3">
            <span className="text-sm text-text-dim">{selecionados.length} selecionados</span>
            <button
              type="button"
              disabled={selecionados.length === 0}
              className="min-h-11 rounded-pill border border-border px-4 text-sm font-semibold text-text disabled:opacity-40"
            >
              Atribuir trilha
            </button>
            <button
              type="button"
              disabled={selecionados.length === 0}
              className="min-h-11 rounded-pill border border-border px-4 text-sm font-semibold text-text disabled:opacity-40"
            >
              Alterar status
            </button>
          </div>
        </div>
      )}

      <Sheet open={atual !== null} onOpenChange={(aberto) => !aberto && setAtual(null)}>
        <SheetContent
          side="right"
          className="w-full max-w-[440px] rounded-l-[24px] border-border bg-surface p-0"
        >
          {atual ? (
            <div className="flex h-full flex-col">
              <div className="border-b border-divider p-6">
                <SheetTitle className="flex items-start gap-3">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-soft font-display text-lg font-bold text-primary-on-soft">
                    {atual.nome.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-semibold text-text">{atual.nome}</span>
                    <span className="block text-sm text-text-dim">{atual.cargo}</span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-text-dim">
                      <Mail size={13} aria-hidden="true" /> {atual.email}
                    </span>
                  </span>
                </SheetTitle>
                <div className="mt-4">
                  <ChipEstado status={atual.status} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <Filtros
                  opcoes={[
                    { id: "visao", rotulo: "Visão geral" },
                    { id: "competencias", rotulo: "Competências" },
                    { id: "trilhas", rotulo: "Trilhas" },
                  ]}
                  valor={abaDrawer}
                  onChange={setAbaDrawer}
                />

                {abaDrawer === "visao" ? (
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-5 rounded-card border border-border bg-surface-raised p-4">
                      <Donut valor={atual.progresso} rotulo="de progresso geral" />
                      <div className="grid flex-1 gap-3 text-sm">
                        <span className="flex justify-between"><span className="text-text-dim">Trilhas ativas</span><strong>{atual.trilhas}</strong></span>
                        <span className="flex justify-between"><span className="text-text-dim">Avaliações concluídas</span><strong>8</strong></span>
                        <span className="flex justify-between"><span className="text-text-dim">Conquistas</span><strong>5</strong></span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-text">Trilhas em andamento (3)</h3>
                      <ul className="mt-3 space-y-3">
                        {["Introdução ao Docker", "Git e Versionamento", "Computação em Nuvem"].map((nome, i) => (
                          <li key={nome} className="flex items-center gap-3">
                            <Layers size={17} className="text-primary-on-soft" aria-hidden="true" />
                            <span className="min-w-0 flex-1 text-sm text-text">{nome}</span>
                            <BarraProgresso valor={[92, 76, 68][i]} className="w-20" />
                            <span className="text-xs font-semibold tabular-nums">{[92, 76, 68][i]}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-6 border-t border-divider pt-4 text-sm">
                      <span><span className="block text-xs text-text-dim">Último acesso</span>Hoje, 10:24</span>
                      <span><span className="block text-xs text-text-dim">Tempo na plataforma</span>28h 36min</span>
                    </div>
                  </div>
                ) : abaDrawer === "competencias" ? (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-5 rounded-card border border-border bg-surface-raised p-4">
                      <Donut valor={78} rotulo="de competências" />
                      <div className="text-sm">
                        <p className="font-display font-semibold text-text">Nível de competências</p>
                        <ChipEstado status="Intermediário" />
                        <p className="mt-2 text-xs text-text-dim">12 de 15 competências desenvolvidas</p>
                      </div>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-text">Competências do colaborador (15)</h3>
                    {competenciasColaborador.map((c) => (
                      <div key={c.nome} className="flex items-center gap-3">
                        <span className="min-w-0 flex-1 text-sm text-text">{c.nome}</span>
                        <BarraProgresso valor={c.valor} className="w-24" />
                        <span className="w-8 text-right text-xs font-semibold tabular-nums">{c.valor}%</span>
                        <ChipEstado status={c.nivel} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 flex items-start gap-3 rounded-card border border-border bg-surface-raised p-5 text-sm text-text-dim">
                    <ClipboardCheck size={20} className="shrink-0 text-primary-on-soft" aria-hidden="true" />
                    Trilhas atribuídas aparecem no histórico deste colaborador.
                  </div>
                )}
              </div>

              <div className="flex gap-3 border-t border-divider p-6">
                <button type="button" className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-border text-sm font-semibold text-text">
                  <MessageSquare size={17} aria-hidden="true" /> Enviar mensagem
                </button>
                <button type="button" className="min-h-11 flex-1 rounded-pill bg-primary px-4 text-sm font-semibold text-primary-fg">
                  Atribuir trilha
                </button>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </PaginaInterna>
  );
}
