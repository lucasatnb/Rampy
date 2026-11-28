import { NavLink } from "react-router-dom";
import { Marca } from "@/components/marca";
import { cn } from "@/lib/utils";
import { itensInferiores, navegacao, type Perfil } from "./navegacao";
import { TrocaPerfil } from "./troca-perfil";

const classeItem = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex min-h-11 items-center gap-3 rounded-pill px-3 text-sm transition-colors motion-reduce:transition-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    isActive
      ? "bg-primary-soft font-semibold text-primary-on-soft"
      : "text-text-dim hover:bg-surface-raised hover:text-text",
  );

export function Sidebar({
  perfil,
  aoNavegar,
}: {
  perfil: Perfil;
  aoNavegar?: () => void;
}) {
  const itens = navegacao[perfil];
  const base = `/${perfil}`;

  return (
    <nav
      aria-label="Menu principal"
      className="flex h-full flex-col bg-sidebar px-4 py-5"
    >
      <div className="px-1">
        <Marca />
        {perfil === "gestor" ? (
          <span className="mt-3 inline-flex rounded-pill bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-on-soft">
            Gestor
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-1">
        {itens.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === base}
            onClick={aoNavegar}
            className={classeItem}
          >
            <item.icone size={20} aria-hidden="true" />
            {item.rotulo}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1 border-t border-divider pt-4">
        {itensInferiores.map((item) => (
          <NavLink
            key={item.to}
            to={`/${perfil}${item.to}`}
            onClick={aoNavegar}
            className={classeItem}
          >
            <item.icone size={20} aria-hidden="true" />
            {item.rotulo}
          </NavLink>
        ))}
        <TrocaPerfil perfil={perfil} className="mt-4 lg:hidden" />
      </div>
    </nav>
  );
}
