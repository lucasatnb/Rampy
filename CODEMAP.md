# CODEMAP — Rampy (treinamento interno)

## Regra de escopo

Este diretório é o produto novo. Não renomear conceitos do Lunox para fingir que são
corporativos: programas, módulos, funcionários, equipes, permissões e certificados serão
modelados nas próximas sessões.

## Base ativa

- `src/visual/estilos.css`: tokens, tipografia, Tailwind e tema visual reutilizável.
- `src/visual/ui/`: Button, Card, Sheet, Skeleton e Sonner.
- `src/visual/chip.tsx`: etiquetas de status e categoria.
- `src/visual/campo.ts`: campo visual reutilizável.
- `src/visual/tela.tsx`: estrutura de tela e estatísticas.
- `src/visual/utils.ts`: composição de classes.
- `src/App.tsx`: entrada provisória; deve evoluir para o dashboard do funcionário.
- `src/main.tsx`: entrada React.

## Fora da base ativa

`reuso/` é arquivo histórico, não deve ser importado automaticamente. Mascote, imagens do
mascote, editor de código, mapa de estrelas, constelações, exercícios de programação,
gamificação, ofensiva, trilhas do Lunox, linguagens e dados JSON antigos foram removidos da
base ativa por não pertencerem ao novo escopo. O projeto original em Downloads continua
intacto.

## Próximos módulos do produto

`features/dashboard`, `features/catalogo`, `features/programas`, `features/modulos`,
`features/avaliacoes`, `features/certificados`, `features/perfil` e
`features/administracao`. Criar primeiro os tipos de domínio e os fluxos de funcionário,
gestor e administrador; só depois conectar backend e persistência.
