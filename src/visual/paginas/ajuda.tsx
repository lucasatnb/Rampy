import { LifeBuoy, Mail, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import { Cartao } from "@/components/componentes/cartao";
import { PaginaInterna } from "@/components/componentes/pagina-interna";
import type { Perfil } from "@/components/layout/navegacao";

const perguntas = [
  {
    pergunta: "Como atribuo uma trilha a um colaborador?",
    resposta:
      "Abra Colaboradores, selecione a pessoa e escolha Atribuir trilha no painel lateral.",
  },
  {
    pergunta: "Como acompanho o progresso da equipe?",
    resposta:
      "O início do gestor mostra o progresso médio e os resultados por trilha.",
  },
  {
    pergunta: "O que acontece quando uma avaliação é corrigida?",
    resposta:
      "O resultado aparece no histórico do colaborador e nas pendências de gestão.",
  },
];

export function Ajuda({ perfil }: { perfil: Perfil }) {
  const [aberta, setAberta] = useState<string | null>(null);

  return (
    <PaginaInterna
      perfil={perfil}
      titulo="Ajuda e Suporte"
      subtitulo="Encontre respostas rápidas ou fale com a nossa equipe."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Cartao titulo="Perguntas frequentes" icone={MessageCircleQuestion}>
          <ul className="divide-y divide-divider">
            {perguntas.map((item) => (
              <li key={item.pergunta} className="py-2 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setAberta(aberta === item.pergunta ? null : item.pergunta)}
                  aria-expanded={aberta === item.pergunta}
                  className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-sm font-medium text-text"
                >
                  {item.pergunta}
                  <span aria-hidden="true" className="text-primary">
                    {aberta === item.pergunta ? "−" : "+"}
                  </span>
                </button>
                {aberta === item.pergunta ? (
                  <p className="pb-3 text-sm text-text-dim">{item.resposta}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Cartao>

        <Cartao titulo="Fale com o suporte" icone={LifeBuoy}>
          <p className="text-sm text-text-dim">
            Não encontrou o que procurava? Envie uma mensagem e respondemos em até um dia útil.
          </p>
          <a
            href="mailto:suporte@rampy.com.br"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-6 text-sm font-semibold text-primary-fg hover:brightness-95 motion-reduce:transition-none"
          >
            <Mail size={18} aria-hidden="true" />
            Enviar mensagem
          </a>
        </Cartao>
      </div>
    </PaginaInterna>
  );
}
