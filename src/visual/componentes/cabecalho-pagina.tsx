import { ArrowUpRight } from "lucide-react";

export function CabecalhoPagina({
  data,
  titulo,
  subtitulo,
}: {
  data: string;
  titulo: string;
  subtitulo: string;
}) {
  return (
    <div className="mb-6 lg:mb-8">
      <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-text-dim uppercase">
        {data}
      </p>
      <h1 className="flex items-center gap-2 font-display text-[28px] font-bold text-text lg:text-[32px]">
        {titulo}
        <ArrowUpRight size={26} className="text-primary" aria-hidden="true" />
      </h1>
      <p className="mt-2 text-sm text-text-dim lg:text-base">{subtitulo}</p>
    </div>
  );
}
