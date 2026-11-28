import { useState } from "react";
import { Camera, Check, Languages, Lock, Bell, UserRound, Palette } from "lucide-react";
import { campo } from "@/components/campo";
import { Cartao } from "@/components/componentes/cartao";
import { EstadoVazio } from "@/components/componentes/estado-vazio";
import { PaginaInterna } from "@/components/componentes/pagina-interna";
import { cn } from "@/lib/utils";
import type { Perfil } from "@/components/layout/navegacao";

const secoes = [
  { id: "conta", rotulo: "Conta", icone: UserRound },
  { id: "notificacoes", rotulo: "Notificações", icone: Bell },
  { id: "aparencia", rotulo: "Aparência", icone: Palette },
  { id: "idioma", rotulo: "Idioma", icone: Languages },
  { id: "seguranca", rotulo: "Segurança", icone: Lock },
];

export function Configuracoes({ perfil }: { perfil: Perfil }) {
  const [secao, setSecao] = useState("conta");
  const [nome, setNome] = useState("Lucas Oliveira");
  const [email, setEmail] = useState("lucas.oliveira@empresa.com");

  return (
    <PaginaInterna
      perfil={perfil}
      titulo="Configurações"
      subtitulo="Gerencie sua conta, preferências e notificações da Rampy."
    >
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Seções de configuração" className="flex gap-2 overflow-x-auto lg:flex-col">
          {secoes.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={secao === item.id ? "page" : undefined}
              onClick={() => setSecao(item.id)}
              className={cn(
                "flex min-h-11 shrink-0 items-center gap-3 rounded-pill px-4 text-sm font-medium",
                secao === item.id
                  ? "bg-primary-soft text-primary-on-soft"
                  : "text-text-dim hover:bg-surface-raised",
              )}
            >
              <item.icone size={18} aria-hidden="true" /> {item.rotulo}
            </button>
          ))}
        </nav>

        {secao === "conta" ? (
          <Cartao titulo="Conta">
            <p className="mb-5 text-sm text-text-dim">
              Atualize seus dados pessoais e informações da sua conta.
            </p>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="relative grid size-16 place-items-center rounded-full bg-primary-soft font-display text-xl font-bold text-primary-on-soft">
                LO
                <span className="absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full border-2 border-surface bg-primary text-primary-fg">
                  <Camera size={14} aria-hidden="true" />
                </span>
              </span>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="min-h-11 rounded-pill border border-border px-4 text-sm font-semibold text-text">Alterar foto</button>
                <button type="button" className="min-h-11 rounded-pill border border-border px-4 text-sm font-semibold text-text">Remover</button>
              </div>
              <p className="w-full text-xs text-text-dim">Formato: JPG, PNG ou WEBP. Tamanho máximo: 5 MB.</p>
            </div>

            <form
              className="grid gap-5 sm:grid-cols-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">Nome completo</span>
                <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">Cargo</span>
                <input className={campo} value="Funcionário em Treinamento" disabled />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">E-mail</span>
                <input type="email" className={campo} value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-text">Empresa / Equipe</span>
                <input className={campo} value="Tecnologia da Informação (TI)" disabled />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center gap-2 justify-self-end rounded-pill bg-primary px-6 text-sm font-semibold text-primary-fg sm:col-span-2"
              >
                <Check size={17} aria-hidden="true" /> Salvar alterações
              </button>
            </form>
          </Cartao>
        ) : (
          <EstadoVazio
            titulo={`${secoes.find((s) => s.id === secao)?.rotulo ?? "Seção"}`}
            descricao="Esta seção ainda está sendo preparada."
          />
        )}
      </div>
    </PaginaInterna>
  );
}
