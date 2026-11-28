export function Donut({
  valor,
  rotulo,
}: {
  valor: number;
  rotulo?: string;
}) {
  const raio = 42;
  const circunferencia = 2 * Math.PI * raio;

  return (
    <div
      className="relative grid size-28 shrink-0 place-items-center"
      role="img"
      aria-label={`${valor}%${rotulo ? ` ${rotulo}` : ""}`}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={raio} fill="none" stroke="var(--track)" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={raio}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={circunferencia * (1 - valor / 100)}
        />
      </svg>
      <span className="absolute font-display text-xl font-bold text-text">{valor}%</span>
    </div>
  );
}
