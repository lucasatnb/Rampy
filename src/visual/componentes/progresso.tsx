import { cn } from "@/lib/utils";

export function BarraProgresso({
  valor,
  className,
}: {
  valor: number;
  className?: string;
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={valor}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 w-full overflow-hidden rounded-pill bg-track", className)}
    >
      <div
        className="h-full rounded-pill bg-primary transition-[width] duration-500 motion-reduce:transition-none"
        style={{ width: `${valor}%` }}
      />
    </div>
  );
}
