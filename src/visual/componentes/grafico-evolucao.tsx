import { evolucao } from "@/dados/gestor";

const L = 620;
const A = 220;
const esquerda = 42;
const direita = 16;
const topo = 12;
const base = 188;

const x = (i: number) =>
  esquerda + (i * (L - esquerda - direita)) / (evolucao.valores.length - 1);
const y = (v: number) => base - (v / 100) * (base - topo);
const pontos = evolucao.valores.map((v, i) => `${x(i)},${y(v)}`);
const linha = `M ${pontos.join(" L ")}`;
const area = `${linha} L ${x(evolucao.valores.length - 1)},${base} L ${x(0)},${base} Z`;

export function GraficoEvolucao() {
  const ultimo = evolucao.valores.length - 1;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${L} ${A}`}
        className="h-auto min-w-[420px] w-full"
        role="img"
        aria-label={`Evolução da equipe: ${evolucao.meses
          .map((m, i) => `${m} ${evolucao.valores[i]}%`)
          .join(", ")}`}
      >
        <defs>
          <linearGradient id="rampy-evolucao" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 20, 40, 60, 80, 100].map((v) => (
          <g key={v}>
            <line
              x1={esquerda}
              x2={L - direita}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--divider)"
              strokeWidth="1"
            />
            <text
              x={esquerda - 10}
              y={y(v) + 4}
              textAnchor="end"
              fill="var(--text-dim)"
              fontSize="12"
            >
              {v}%
            </text>
          </g>
        ))}

        <path d={area} fill="url(#rampy-evolucao)" />
        <path
          d={linha}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {pontos.map((ponto, i) => {
          const [px, py] = ponto.split(",");
          return (
            <circle
              key={evolucao.meses[i]}
              cx={px}
              cy={py}
              r={i === ultimo ? 6 : 4}
              fill="var(--surface)"
              stroke="var(--primary)"
              strokeWidth="3"
            />
          );
        })}

        <text
          x={x(ultimo)}
          y={y(evolucao.valores[ultimo]) - 14}
          textAnchor="middle"
          fill="var(--primary-on-soft)"
          fontSize="13"
          fontWeight="700"
        >
          {evolucao.valores[ultimo]}%
        </text>

        {evolucao.meses.map((mes, i) => (
          <text
            key={mes}
            x={x(i)}
            y={A - 8}
            textAnchor="middle"
            fill="var(--text-dim)"
            fontSize="13"
          >
            {mes}
          </text>
        ))}
      </svg>
    </div>
  );
}
