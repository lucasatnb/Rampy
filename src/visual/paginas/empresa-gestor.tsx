import { useState } from "react";
import { Building2, Palette, Pencil, Users } from "lucide-react";
import { empresa } from "@/dados/gestor-internas";
import { Cartao } from "@/components/componentes/cartao";
import { EstadoVazio } from "@/components/componentes/estado-vazio";
import { Filtros } from "@/components/componentes/filtros";
import { PaginaInterna } from "@/components/componentes/pagina-interna";

const abas = [
  { id: "geral", rotulo: "Geral" },
  { id: "equipes", rotulo: "Equipes e Cargos" },
  { id: "permissoes", rotulo: "Permissões" },
  { id: "personalizacao", rotulo: "Personalização" },
  { id: "integracoes", rotulo: "Integrações" },
  { id: "plano", rotulo: "Plano" },
];

export function EmpresaGestor() {
  const [aba, setAba] = useState("geral");

  return (
    <PaginaInterna
      perfil="gestor"
      titulo="Configurações da Empresa"
      subtitulo="Gerencie as informações, equipes e regras da sua organização."
    >
      <Filtros opcoes={abas} valor={aba} onChange={setAba} className="mb-4" />

      {aba !== "geral" ? (
        <EstadoVazio
          titulo={`${abas.find((a) => a.id === aba)?.rotulo ?? "Área"} em preparação`}
          descricao="Esta seção ainda não está disponível nesta versão."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Cartao
            titulo="Informações da empresa"
            icone={Building2}
            acao={
              <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-5 text-sm font-semibold text-primary-fg">
                <Pencil size={16} aria-hidden="true" /> Editar
              </button>
            }
          >
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="text-xs text-text-dim">Nome da empresa</dt>
                <dd className="font-medium text-text">{empresa.nome}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-dim">CNPJ</dt>
                <dd className="font-medium text-text">{empresa.cnpj}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-dim">E-mail de contato</dt>
                <dd className="font-medium text-text">{empresa.email}</dd>
              </div>
            </dl>
          </Cartao>

          <Cartao titulo="Identidade visual" icone={Palette}>
            <p className="text-sm text-text-dim">
              Personaliza a plataforma com a identidade da sua empresa.
            </p>
            <div className="mt-5 grid gap-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-text-dim">
                  <Users size={16} aria-hidden="true" /> Logo da empresa
                </span>
                <span className="flex gap-2">
                  <button type="button" className="min-h-11 rounded-pill border border-border px-4 text-xs font-semibold text-text">Alterar</button>
                  <button type="button" className="min-h-11 rounded-pill border border-border px-4 text-xs font-semibold text-text">Remover</button>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dim">Cor principal</span>
                <span className="font-mono text-text">{empresa.corPrincipal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dim">Cor secundária</span>
                <span className="font-mono text-text">{empresa.corSecundaria}</span>
              </div>
            </div>
          </Cartao>
        </div>
      )}
    </PaginaInterna>
  );
}
