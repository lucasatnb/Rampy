import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Tema = "claro" | "escuro";

const CHAVE = "rampy_tema";

function lerTema(): Tema {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === "claro" || salvo === "escuro") return salvo;
  } catch {
    // armazenamento indisponível: cai para a preferência do sistema
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
}

export function AlternadorTema() {
  const [tema, setTema] = useState<Tema>(lerTema);
  const escuro = tema === "escuro";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", escuro);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", escuro ? "#1B1C21" : "#F7FAFB");
    try {
      localStorage.setItem(CHAVE, tema);
    } catch {
      // sem persistência: o tema ainda vale para esta sessão
    }
  }, [tema, escuro]);

  return (
    <button
      type="button"
      onClick={() => setTema(escuro ? "claro" : "escuro")}
      aria-label={escuro ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={escuro}
      title={escuro ? "Ativar tema claro" : "Ativar tema escuro"}
      className="inline-flex size-11 items-center justify-center rounded-pill border border-border bg-surface text-text transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
    >
      {escuro ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
