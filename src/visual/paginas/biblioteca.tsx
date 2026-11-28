import { useState } from "react";
import { BookOpen, Download, FileText, Play, Search, Star } from "lucide-react";
import { materiaisDestaque, materiaisTabela } from "@/dados/funcionario-internas";
import { CartaoTabela } from "@/components/componentes/cartao-tabela";
import { Filtros } from "@/components/componentes/filtros";
import { PaginaInterna } from "@/components/componentes/pagina-interna";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const filtros = [
  { id: "todos", rotulo: "Todos", contagem: 124 },
  { id: "livros", rotulo: "Livros", contagem: 42 },
  { id: "apostilas", rotulo: "Apostilas", contagem: 28 },
  { id: "simulados", rotulo: "Simulados", contagem: 18 },
  { id: "templates", rotulo: "Templates", contagem: 12 },
];

export function Biblioteca() {
  const [filtro, setFiltro] = useState("todos");

  return (
    <PaginaInterna
      perfil="funcionario"
      titulo="Biblioteca de Apoio"
      subtitulo="Livros, materiais complementares, simulados e conteúdos para aprofundar seu aprendizado."
    >
      <Filtros opcoes={filtros} valor={filtro} onChange={setFiltro} className="mb-4" />

      <div className="mb-6 flex flex-wrap gap-3">
        <label className="relative min-w-56 flex-1">
          <span className="sr-only">Buscar na biblioteca</span>
          <Search size={18} aria-hidden="true" className="absolute top-1/2 left-4 -translate-y-1/2 text-text-dim" />
          <input
            type="search"
            placeholder="Buscar na biblioteca..."
            className="h-11 w-full rounded-pill border border-border bg-surface pr-4 pl-11 text-sm text-text placeholder:text-text-dim"
          />
        </label>
        <span className="inline-flex min-h-11 items-center rounded-pill border border-border bg-surface px-4 text-sm text-text-dim">
          Tipo: Todos
        </span>
        <span className="inline-flex min-h-11 items-center rounded-pill border border-border bg-surface px-4 text-sm text-text-dim">
          Trilha: Todas
        </span>
        <span className="inline-flex min-h-11 items-center rounded-pill border border-border bg-surface px-4 text-sm text-text-dim">
          Ordenar por: Mais recentes
        </span>
      </div>

      <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-text">
        <Star size={19} className="text-primary" aria-hidden="true" /> Materiais em destaque
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {materiaisDestaque.map((item) => (
          <article key={item.titulo} className="sombra-card flex flex-col rounded-card border border-border bg-surface p-5">
            <span className="grid size-11 place-items-center rounded-icon bg-primary-soft text-primary-on-soft">
              {item.tipo === "Simulado" ? (
                <Play size={20} aria-hidden="true" />
              ) : (
                <BookOpen size={20} aria-hidden="true" />
              )}
            </span>
            <h3 className="mt-4 font-display text-base font-semibold text-text">{item.titulo}</h3>
            <p className="mt-1 flex-1 text-sm text-text-dim">{item.descricao}</p>
            <button
              type="button"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-border text-sm font-semibold text-text"
            >
              {item.acao === "Baixar" ? (
                <Download size={16} aria-hidden="true" />
              ) : (
                <Play size={16} aria-hidden="true" />
              )}
              {item.acao}
            </button>
          </article>
        ))}
      </div>

      <h2 className="mt-8 mb-4 font-display text-lg font-semibold text-text">
        Todos os materiais (124)
      </h2>
      <CartaoTabela>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Trilha</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Publicado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materiaisTabela.map((item) => (
              <TableRow key={item.titulo}>
                <TableCell>
                  <span className="flex items-center gap-2 font-medium text-text">
                    <FileText size={16} className="text-primary-on-soft" aria-hidden="true" />
                    {item.titulo}
                  </span>
                </TableCell>
                <TableCell className="text-text-dim">{item.tipo}</TableCell>
                <TableCell className="text-text-dim">{item.trilha}</TableCell>
                <TableCell className="tabular-nums text-text-dim">{item.tamanho}</TableCell>
                <TableCell className="text-text-dim">{item.data}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CartaoTabela>
    </PaginaInterna>
  );
}
