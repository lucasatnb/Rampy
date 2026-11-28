import { useState } from "react";
import { FileText, FolderPlus, Library, Plus, Video } from "lucide-react";
import { conteudosGestor } from "@/dados/gestor-internas";
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

const abas = [
  { id: "todos", rotulo: "Todos", contagem: 142 },
  { id: "aulas", rotulo: "Aulas", contagem: 68 },
  { id: "materiais", rotulo: "Materiais", contagem: 34 },
  { id: "documentos", rotulo: "Documentos", contagem: 18 },
  { id: "links", rotulo: "Links", contagem: 12 },
  { id: "videos", rotulo: "Vídeos", contagem: 10 },
];

export function ConteudoGestor() {
  const [aba, setAba] = useState("todos");

  return (
    <PaginaInterna
      perfil="gestor"
      titulo="Biblioteca de Conteúdo"
      subtitulo="Gerencie aulas, materiais e recursos utilizados nas trilhas."
      acao={
        <div className="flex flex-wrap gap-2">
          <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-border px-5 text-sm font-semibold text-text">
            <FolderPlus size={18} aria-hidden="true" /> Organizar pastas
          </button>
          <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-5 text-sm font-semibold text-primary-fg">
            <Plus size={18} aria-hidden="true" /> Novo conteúdo
          </button>
        </div>
      }
    >
      <Filtros opcoes={abas} valor={aba} onChange={setAba} className="mb-4" />

      <CartaoTabela>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conteúdo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Uso em trilhas</TableHead>
              <TableHead>Atualizada em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conteudosGestor.map((item) => (
              <TableRow key={item.nome}>
                <TableCell>
                  <span className="flex items-center gap-3 font-medium text-text">
                    {item.tipo === "Aula em vídeo" ? (
                      <Video size={18} className="text-primary-on-soft" aria-hidden="true" />
                    ) : (
                      <FileText size={18} className="text-primary-on-soft" aria-hidden="true" />
                    )}
                    {item.nome}
                  </span>
                </TableCell>
                <TableCell className="text-text-dim">{item.tipo}</TableCell>
                <TableCell className="text-text-dim">{item.trilhas} trilhas</TableCell>
                <TableCell className="text-text-dim">{item.atualizada}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CartaoTabela>
      <p className="mt-4 flex items-center gap-2 text-xs text-text-dim">
        <Library size={15} aria-hidden="true" /> 142 itens na biblioteca da empresa.
      </p>
    </PaginaInterna>
  );
}
