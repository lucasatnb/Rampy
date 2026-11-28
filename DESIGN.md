# DESIGN — Rampy

Fonte da verdade visual do **Rampy** (repo `Documents\novo projeto`). Substitui os tokens
escuros trazidos do `reuso/` e o tema padrão do shadcn. O `DESIGN.md` da raiz do Lunox
continua valendo **somente para o Lunox**.

Base: `referencias/` — logo, pacote do app do gestor e telas do funcionário. Os arquivos de
`03_Modulos_de_Gestao` são recortes de uma montagem: valem como layout, não como tela
implementada. Nomes e números nas imagens são ilustrativos.

## 1. Marca

- Símbolo: silhueta de pessoa correndo sobre linha de gráfico com seta, em degradê
  `#2FE3DE → #12B5C9`.
- Wordmark "Rampy" em script, com traço de seta atravessando o "y"; barra vertical fina
  separa símbolo e wordmark.
- Usar sempre o arquivo do logo. Não recriar a fonte script nem importar PNG diretamente
  em componentes — centralizar em um único componente de marca.
- Logo aparece **só na sidebar**. No header: busca, sino com ponto de notificação e avatar.
- Selo "Gestor" (pill ciano-claro, texto escuro) fica abaixo do logo **apenas no perfil gestor**.

## 2. Tema e paleta

Tema **claro** por padrão (`color-scheme: light`). O fundo preto do material do logo não é
tema da aplicação. Há uma mancha difusa de ciano no topo-direito (`--bg-glow`), discreta,
sem partículas.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F7FAFB` | fundo da página |
| `--bg-glow` | `#D6FBFA` | brilho difuso no topo |
| `--surface` | `#FFFFFF` | cards, sidebar, header |
| `--text` | `#0B1B21` | títulos e corpo |
| `--text-dim` | `#5F7077` | texto secundário (ajustado do `#6E7F86` da ref. para ≥4,5:1) |
| `--text-faint` | `#9AA9AF` | só decoração / texto ≥18px |
| `--primary` | `#22D3D8` | acento, barras, links, item ativo |
| `--primary-soft` | `#E4FAFB` | fundo de item ativo, quadrado de ícone, aba ativa |
| `--primary-fg` | `#06302F` | texto sobre ciano |
| `--success` / `--success-soft` | `#22C55E` / `#E7F8EE` | Ativa, Concluída, Avançado, Ativo |
| `--warning` / `--warning-soft` | `#E0A11B` / `#FFF4DE` | Rascunho, Em andamento |
| `--info` / `--info-soft` | `#3A7BD5` / `#E9F1FE` | Intermediário |
| `--error` / `--error-soft` | `#DC2626` / `#FEECEC` | **proposto** — não aparece na referência |
| `--border` | `#E6ECEF` | borda de cards, inputs, botões secundários |
| `--divider` | `#EFF3F5` | linhas de tabela e lista |
| `--track` | `#EAF0F2` | trilha das barras de progresso |

Mapeamento shadcn (via `cssVariables`): `--background: var(--bg)`, `--foreground: var(--text)`,
`--card: var(--surface)`, `--primary: var(--primary)`, `--primary-foreground: var(--primary-fg)`,
`--muted: var(--surface)`, `--muted-foreground: var(--text-dim)`, `--accent: var(--primary-soft)`,
`--accent-foreground: var(--text)`, `--secondary: var(--bg)`, `--destructive: var(--error)`,
`--input: var(--border)`, `--ring: var(--primary)`.

## 3. Tipografia

Família da referência é sans geométrica arredondada (Poppins / Plus Jakarta Sans). **Não
instalar fonte nova sem aprovação**: usar `Sora Variable` para títulos/KPIs e `Inter Variable`
para corpo (já no `package.json`). A script do logo vem do arquivo, não de fonte.

| Nível | Tamanho / peso | Cor |
|---|---|---|
| Título de página | 30–32px / 700 | `--text` |
| Eyebrow (breadcrumb) | 12px / 600, maiúsculas, `letter-spacing: .08em` | `--primary-fg` |
| Subtítulo da página | 14px / 400 | `--text-dim` |
| Título de card | 15–16px / 600, ícone 18px à esquerda | `--text` |
| Corpo e tabela | 14px / 400 (nome 500–600) | `--text` |
| Rótulo / cabeçalho de tabela | 12px / 500–600 | `--text-dim` |
| Número de KPI | 28–32px / 700 | `--text` |

## 4. Geometria e densidade

- Raios: card 16px, quadrado de ícone 12px, drawer 24px nos cantos esquerdos,
  botões/chips/abas/campo de busca **pill** (9999px).
- Borda 1px; sombra curta e difusa: `0 1px 2px rgba(11,27,33,.04), 0 8px 24px rgba(11,27,33,.05)`.
- Espaçamento: 4 / 8 / 12 / 16 / 24px (`--space-1..6`). Gap de cards 16px; padding interno
  20–24px; margem da página 24px.
- Header 64px; sidebar ~220px em desktop; linha de tabela 54px.
- Grid: 4 KPIs por linha (gap 16px); abaixo, duas colunas ~60/40 (gráfico + lista lateral).
- Densidade: arejada nos cards, compacta nas tabelas.

## 5. Componentes

- **Botão primário**: pill ciano, texto `--primary-fg`, ícone à esquerda. **Um por tela**.
- **Botão secundário**: pill branco, borda 1px, texto escuro. Terciário: pill claro com seta.
- **Card de KPI**: ícone em quadrado ciano-claro, número grande, rótulo em duas linhas,
  variação em verde opcional.
- **Abas**: pills em linha com contagem; ativa com `--primary-soft`.
- **Tabela**: checkbox, avatar 28–32px, nome + e-mail, barra de progresso 6px com %, chip de
  status, data, menu "…". Seleção tinta ciano-clara; barra inferior com ações desabilitadas.
- **Chips de status**: pill pastel com ponto colorido — verde/âmbar/azul conforme a paleta.
- **Barras e anéis de progresso**: trilha `--track`, preenchimento `--primary`.
- **Gráficos**: área/linha ciano com degradê para transparente, grade clara, etiqueta final;
  roca com número central e legenda.
- **Drawer**: painel direito ~400px, cantos esquerdos 24px, fundo escurecido; cabeçalho com
  avatar e ações, abas internas, KPIs com divisor, rodapé fixo com secundário + primário.
- **Header**: busca pill com placeholder contextual por tela; sino; avatar com chevron.
- **Estados vazios e de erro**: não aparecem na referência. Definir com ilustração simples,
  texto curto e **um** botão primário; erro inline, sem punição.

## 6. Navegação e vocabulário

| | Gestor | Funcionário |
|---|---|---|
| Sidebar | Início, Colaboradores, Trilhas, Avaliações, Relatórios, Conteúdo, Empresa | Início, Minhas Trilhas, Biblioteca, Avaliações, Meu Perfil |
| Rodapé da sidebar | Ajuda e Suporte, Configurações | Ajuda e Suporte, Configurações |
| Foco | dados agregados, pendências, ações sobre terceiros | identidade, conquistas, sequência, evolução |

Termos: Trilhas · Avaliações · Relatórios · Conteúdo · Empresa · Colaboradores · Competências ·
Conquistas · Sequência de estudos · Banco de questões · Visão geral da empresa ·
Atribuir trilha · Definir metas · Enviar mensagem · Rascunho · Ativa · Em andamento ·
Concluída · Avançado · Intermediário. Português do Brasil, sem jargão técnico.

## 7. Acessibilidade

- Contraste ≥4,5:1 para texto (`--text-dim` foi escurecido; `--text-faint` nunca é corpo).
- Alvos tocáveis ≥44px, inclusive nos pills e no checkbox da tabela.
- Foco visível com `--ring` (ciano) em todo elemento interativo.
- `prefers-reduced-motion`: animações de entrada e gráficos viram estado estático.
- Referência usa 11px em eyebrow; aqui o mínimo é **12px**. Texto de corpo nunca abaixo de 14px.

## 8. Pendências

- Versão **clara** do logo não veio no pacote (só "Logo Rampy em Modo Escuro.png"): precisar
  do arquivo claro ou autorização para recolorir o wordmark.
- Cor de erro e estados vazios/erro são propostas, não observadas na referência.
- `src/visual/estilos.css` ainda traz o tema escuro antigo: precisa ser convertido para estes tokens.
