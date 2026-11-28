import type { ReactNode } from "react";
import { CabecalhoPagina } from "@/components/componentes/cabecalho-pagina";
import { AppShell } from "@/components/layout/app-shell";
import type { Perfil } from "@/components/layout/navegacao";

export function PaginaInterna({
  perfil,
  titulo,
  subtitulo,
  acao,
  data = "Quarta-feira, 26 de novembro",
  children,
}: {
  perfil: Perfil;
  titulo: string;
  subtitulo: string;
  acao?: ReactNode;
  data?: string;
  children: ReactNode;
}) {
  return (
    <AppShell perfil={perfil}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <CabecalhoPagina data={data} titulo={titulo} subtitulo={subtitulo} />
        {acao}
      </div>
      {children}
    </AppShell>
  );
}
