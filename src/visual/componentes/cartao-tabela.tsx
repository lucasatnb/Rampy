import type { ReactNode } from "react";

export function CartaoTabela({
  children,
  rodape,
}: {
  children: ReactNode;
  rodape?: ReactNode;
}) {
  return (
    <div className="sombra-card overflow-hidden rounded-card border border-border bg-surface">
      <div className="overflow-x-auto">{children}</div>
      {rodape}
    </div>
  );
}
