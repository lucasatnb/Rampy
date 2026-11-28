import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AlternadorTema } from "@/components/alternador-tema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Perfil } from "./navegacao";
import { TrocaPerfil } from "./troca-perfil";

export function Cabecalho({
  perfil,
  aoAbrirMenu,
}: {
  perfil: Perfil;
  aoAbrirMenu: () => void;
}) {
  const busca =
    perfil === "gestor"
      ? "Buscar colaboradores, trilhas, relatórios..."
      : "Buscar trilhas, aulas ou competências...";

  return (
    <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
      <button
        type="button"
        onClick={aoAbrirMenu}
        aria-label="Abrir menu"
        className="grid size-11 shrink-0 place-items-center rounded-pill text-text hover:bg-surface-raised lg:hidden"
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      <label className="relative min-w-0 flex-1 sm:max-w-xl">
        <span className="sr-only">Buscar</span>
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-text-dim"
        />
        <input
          type="search"
          placeholder={busca}
          className="h-11 w-full rounded-pill border border-border bg-surface-raised pr-4 pl-11 text-sm text-text placeholder:text-text-dim"
        />
      </label>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <TrocaPerfil perfil={perfil} className="hidden sm:flex" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Notificações"
              className="relative grid size-11 place-items-center rounded-pill text-text hover:bg-surface-raised"
            >
              <Bell size={20} aria-hidden="true" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-surface" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <p className="px-2 py-4 text-sm text-text-dim">
              Nenhuma nova notificação.
            </p>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlternadorTema />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Abrir perfil"
              className="flex min-h-11 items-center gap-1 rounded-pill px-1 hover:bg-surface-raised"
            >
              <span className="grid size-9 place-items-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary-on-soft">
                LS
              </span>
              <ChevronDown size={16} className="text-text-dim" aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Lucas Souza</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {perfil === "funcionario" ? (
              <DropdownMenuItem asChild>
                <NavLink to="/funcionario/perfil">Meu Perfil</NavLink>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem asChild>
              <NavLink to={`/${perfil}/configuracoes`}>Configurações</NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
