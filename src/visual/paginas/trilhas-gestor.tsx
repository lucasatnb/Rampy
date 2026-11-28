import { useState } from "react";
import { BarChart3, FileEdit, Layers, Plus, Users } from "lucide-react";
import { trilhasGestor } from "@/dados/gestor-internas";
import { CartaoTabela } from "@/components/componentes/cartao-tabela";
import { ChipEstado } from "@/components/componentes/chip-estado";
import { BarraProgresso } from "@/components/componentes/progresso";
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
  { id: "todas", rotulo: "Todas", contagem: 15 },
  { id: "ativas", rotulo: "Ativas", contagem: 12 },
  { id: "rascunhos", rotulo: "Rascunhos", contagem: 3 },
  { id: "arquivadas", rotulo: "Arquivadas", contagem: 0 },
];

export function TrilhasGestor() {
  const [aba, setAba] = useState("todas");
  const visiveis = trilhasGestor.filter((t) => {
    if (aba === "ativas") return t.status === "Ativa";
    if (aba === "rascunhos") return t.status === "Rascunho";
    if (aba === "arquivadas") return false;
    return true;
  });

  return (
    <PaginaInterna
      perfil="gestor"
      titulo="Trilhas de Treinamento"
      subtitulo="Crie, organize e gerencie trilhas de desenvolvimento para sua equipe."
      acao={
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-5 text-sm font-semibold text-primary-fg hover:brightness-95 motion-reduce:transition-none"
        >
          <Plus size={18} aria-hidden="true" /> Nova trilha
        </button>
      }
    >
      <LinhaKpis
        itens={[
          { rotulo: "Trilhas ativas", valor: "12", icone: Layers },
          { rotulo: "Em rascunho", valor: "3", icone: FileEdit },
          { rotulo: "Atribuições", valor: "284", icone: Users },
          { rotulo: "Conclusão média", valor: "78%", icone: BarChart3 },
        ]}
      />

      <Filtros opcoes={abas} valor={aba} onChange={setAba} className="mb-4" />

      <CartaoTabela>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trilha</TableHead>
              <TableHead>Colaboradores</TableHead>
              <TableHead>Progresso médio</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atualizada em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visiveis.map((trilha) => (
              <TableRow key={trilha.nome}>
                <TableCell>
                  <span className="block font-medium text-text">{trilha.nome}</span>
                  <span className="block text-xs text-text-dim">{trilha.descricao}</span>
                </TableCell>
                <TableCell className="text-text-dim">{trilha.pessoas}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <BarraProgresso valor={trilha.progresso} className="w-24" />
                    <span className="text-xs font-semibold tabular-nums">{trilha.progresso}%</span>
                  </div>
                </TableCell>
                <TableCell><ChipEstado status={trilha.status} /></TableCell>
                <TableCell className="text-text-dim">{trilha.atualizada}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CartaoTabela>
    </PaginaInterna>
  );
}
