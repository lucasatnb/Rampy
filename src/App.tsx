import { Chip } from "@/components/chip";
import { AlternadorTema } from "@/components/alternador-tema";

export function App() {
  return (
    <main className="min-h-dvh bg-bg p-6 text-text">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Rampy</h1>
        <AlternadorTema />
      </header>
      <div className="mx-auto mt-6 max-w-5xl">
        <Chip>Base pronta</Chip>
      </div>
    </main>
  );
}
