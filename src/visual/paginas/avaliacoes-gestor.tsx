import { useState } from "react";
import { ClipboardCheck, FileQuestion, Plus, Star } from "lucide-react";
import { avaliacoesGestor } from "@/dados/gestor-internas";
import { CartaoTabela } from "@/components/componentes/cartao-tabela";
import { ChipEstado } from "@/components/componentes/chip-estado";
import { Filtros } from "@/components/componentes/filtros";
import { LinhaKpis } from "@/components/componentes/cartao-kpi";
import { PaginaInterna } from "@/components/componentes/pagina-interna";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const abas = [
  { id: "todas", rotulo: "Todas", contagem: 28 },
  { id: "provas", rotulo: "Provas", contagem: 10 },
  { id: "questionarios", rotulo: "Questionários", contagem: 12 },
  { id: "atribuidas", rotulo: "Atribuídas", contagem: 6 },
];

export function AvaliacoesGestor() {
  const [aba, setAba] = useState("todas");
  const visiveis = avaliacoesGestor.filter((a) => {
    if (aba === "provas") return a.tipo === "Prova";
    if (aba === "questionarios") return a.tipo === "Questionário";
    return true;
  });

  return (
    <PaginaInterna
      perfil="gestor"
      titulo="Avaliações e Provas"
      subtitulo="Crie, gerencie e acompanhe o desempenho da sua equipe."
      acao={
        <div className="flex flex-wrap gap-2">
          <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-border px-5 text-sm font-semibold text-text">
            <FileQuestion size={18} aria-hidden="true" /> Banco de questões
          </button>
          <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-5 text-sm font-semibold text-primary-fg">
            <Plus size={18} aria-hidden="true" /> Nova avaliação
          </button>
        </div>
      }
    >
      <LinhaKpis
        itens={[
          { rotulo: "Avaliações aplicadas", valor: "28", icone: ClipboardCheck },
          { rotulo: "Concluídas", valor: "21", icone: ClipboardCheck },
          { rotulo: "Pendentes", valor: "4", icone: FileQuestion },
          { rotulo: "Nota média", valor: "8,6", icone: Star },
        ]}
      />

      <Filtros opcoes={abas} valor={aba} onChange={setAba} className="mb-4" />

      <CartaoTabela>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avaliação</TableHead>
              <TableHead>Trilha vinculada</TableHead>
              <TableHead>Atribuições</TableHead>
              <TableHead>Conclusão</TableHead>
              <TableHead>Nota média</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visiveis.map((a) => (
              <TableRow key={a.nome}>
                <TableCell>
                  <span className="block font-medium text-text">{a.nome}</span>
                  <span className="text-xs text-text-dim">{a.tipo}</span>
                </TableCell>
                <TableCell className="text-text-dim">{a.trilha}</TableCell>
                <TableCell className="text-text-dim">{a.atribuicoes}</TableCell>
                <TableCell className="tabular-nums text-text-dim">{a.conclusao}%</TableCell>
                <TableCell className="font-semibold tabular-nums text-text">{a.nota}</TableCell>
                <TableCell><ChipEstado status={a.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CartaoTabela>
    </PaginaInterna>
  );
}
