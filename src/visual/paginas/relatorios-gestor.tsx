import { Award, Download, Target, TrendingUp, Users } from "lucide-react";
import { desempenhoGestor } from "@/dados/gestor-internas";
import { Cartao } from "@/components/componentes/cartao";
import { CartaoTabela } from "@/components/componentes/cartao-tabela";
import { ChipEstado } from "@/components/componentes/chip-estado";
import { Donut } from "@/components/componentes/donut";
import { GraficoEvolucao } from "@/components/componentes/grafico-evolucao";
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

function exportarCsv() {
  const linhas = [
    "Colaborador,Progresso,Nota média,Trilhas,Status",
    ...desempenhoGestor.map((d) =>
      [d.nome, `${d.progresso}%`, d.nota, d.trilhas, d.status].join(","),
    ),
  ];
  const url = URL.createObjectURL(new Blob([linhas.join("\n")], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "desempenho-rampy.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export function RelatoriosGestor() {
  return (
    <PaginaInterna
      perfil="gestor"
      titulo="Relatórios e Desempenho"
      subtitulo="Acompanhe os resultados e evolução da sua equipe."
      acao={
        <button
          type="button"
          onClick={exportarCsv}
          className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-5 text-sm font-semibold text-primary-fg"
        >
          <Download size={18} aria-hidden="true" /> Exportar
        </button>
      }
    >
      <LinhaKpis
        itens={[
          { rotulo: "Progresso geral", valor: "78%", icone: TrendingUp },
          { rotulo: "Taxa de conclusão", valor: "92%", icone: Target },
          { rotulo: "Nota média", valor: "8,6", icone: Award },
          { rotulo: "Colaboradores ativos", valor: "24", icone: Users },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <Cartao titulo="Evolução dos treinamentos" icone={TrendingUp}>
          <GraficoEvolucao />
        </Cartao>
        <Cartao titulo="Status das trilhas" icone={Target}>
          <div className="flex flex-wrap items-center gap-6">
            <Donut valor={78} rotulo="das trilhas" />
            <div className="grid gap-3 text-sm">
              <span className="flex justify-between gap-8">
                <span className="text-text-dim">Concluídas</span><strong>50%</strong>
              </span>
              <span className="flex justify-between gap-8">
                <span className="text-text-dim">Em andamento</span><strong>33%</strong>
              </span>
              <span className="flex justify-between gap-8">
                <span className="text-text-dim">Não iniciadas</span><strong>17%</strong>
              </span>
              <p className="text-xs text-text-dim">12 trilhas no total</p>
            </div>
          </div>
        </Cartao>
      </div>

      <div className="mt-4">
        <Cartao titulo="Desempenho por colaborador" icone={Users}>
          <CartaoTabela>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Nota média</TableHead>
                  <TableHead>Trilhas</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {desempenhoGestor.map((d) => (
                  <TableRow key={d.nome}>
                    <TableCell className="font-medium text-text">{d.nome}</TableCell>
                    <TableCell className="tabular-nums">{d.progresso}%</TableCell>
                    <TableCell className="font-semibold tabular-nums">{d.nota}</TableCell>
                    <TableCell className="text-text-dim">{d.trilhas}</TableCell>
                    <TableCell><ChipEstado status={d.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CartaoTabela>
          <button type="button" className="mt-4 min-h-11 rounded-pill px-3 text-sm font-semibold text-primary-on-soft hover:bg-primary-soft">
            Ver completo →
          </button>
        </Cartao>
      </div>
    </PaginaInterna>
  );
}
