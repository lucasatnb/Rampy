import { useState, type ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Cabecalho } from "./cabecalho";
import type { Perfil } from "./navegacao";
import { Sidebar } from "./sidebar";

export function AppShell({
  perfil,
  children,
}: {
  perfil: Perfil;
  children: ReactNode;
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-dvh bg-bg">
      <div className="ceu" aria-hidden="true" />
      <div className="relative flex">
        <aside className="sticky top-0 hidden h-dvh w-[220px] shrink-0 border-r border-divider lg:block">
          <Sidebar perfil={perfil} />
        </aside>

        <div className="min-w-0 flex-1">
          <header className="vidro sticky top-0 z-20 border-b border-divider">
            <Cabecalho
              perfil={perfil}
              aoAbrirMenu={() => setMenuAberto(true)}
            />
          </header>
          <main className="mx-auto w-full max-w-[1220px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>

      <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
        <SheetContent side="left" className="w-[280px] border-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Menu principal</SheetTitle>
          <Sidebar perfil={perfil} aoNavegar={() => setMenuAberto(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
