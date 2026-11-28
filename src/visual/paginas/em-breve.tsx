import { Link, useParams } from "react-router-dom";
import { CabecalhoPagina } from "@/components/componentes/cabecalho-pagina";
import { AppShell } from "@/components/layout/app-shell";
import { rotulosSecao, type Perfil } from "@/components/layout/navegacao";

export function EmBreve({ perfil }: { perfil: Perfil }) {
  const { secao = "" } = useParams();
  const titulo = rotulosSecao[secao] ?? "Área";

  return (
    <AppShell perfil={perfil}>
      <CabecalhoPagina
        data="Rampy"
        titulo={titulo}
        subtitulo="Esta área ainda está sendo preparada."
      />
      <div className="sombra-card rounded-card border border-border bg-surface px-6 py-14 text-center">
        <p className="font-display text-lg font-semibold text-text">Em breve.</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-dim">
          Enquanto isso, o início já mostra o panorama da sua conta.
        </p>
        <Link
          to={`/${perfil}`}
          className="mt-6 inline-flex min-h-11 items-center rounded-pill bg-primary px-6 text-sm font-semibold text-primary-fg hover:brightness-95 motion-reduce:transition-none"
        >
          Voltar ao início
        </Link>
      </div>
    </AppShell>
  );
}
