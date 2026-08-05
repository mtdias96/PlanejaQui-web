<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PlanejaQui Web — Regras Invioláveis de Design Tokens & UI

1. **Não renomear nem remover os slots semânticos do shadcn.** `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1..5`, `--sidebar-*` continuam existindo. Só trocamos os valores.
2. **Tokens de marca são aditivos**, em namespace próprio (`--surface-*`, `--content-*`, `--free-*`, `--intention-*`, `--warning-*`, `--danger-*`, `--track-*`, `--bank-*`).
3. **Zero hex/rgba dentro de componentes.** Sempre usar utilitários respaldados por tokens.
4. **Não criar um `theme.ts` de runtime consumido na renderização para estilizar.**
5. **Não criar `tailwind.config.js`.** Tailwind v4 é CSS-first.
6. **Não sobrescrever escalas core do Tailwind** (`--text-xs/sm/base/lg`, `--spacing`). Adicionar papeis ao lado.
7. **Manter `cn()`, `data-slot`, `asChild`/`Slot` e os aliases de `components.json`.**

# PlanejaQui Web — Regras Invioláveis de Arquitetura Feature-Driven

1. **Direção de dependência:** `app` → `features` → `components/ui` → `lib`. Só desce, nunca sobe. `components/ui` não importa de `features`. `lib` não importa de ninguém acima.
2. **`app/` só contém arquivos de convenção do Next** (`page`, `layout`, `loading`, `error`, `not-found`, `route`, `template`, `default`). Zero componente solto, zero `_components`. Página é composição, não implementação.
3. **Feature não importa feature.** Se `transacoes` precisa de algo de `envelopes`, esse algo sobe: visual vai para `components/ui`, lógica vai para `lib`. Exceção honesta: `features/auth/session.ts` (ler/validar sessão no server).
4. **Componente não faz I/O.** Quem busca é `page.tsx` ou `queries.ts`. Quem escreve é `actions.ts`.
5. **Server Component por padrão.** `"use client"` só na folha que realmente precisa de estado/evento (`Money`, `Card`, `StatTile` continuam server).
6. **Anatomia de feature sob demanda:** `queries.ts` (leitura), `actions.ts` ("use server"), `schema.ts` (validação), `types.ts` (contrato), `compute.ts` (derivação pura sem I/O), `components/` (componentes do domínio) e `use-*.ts` (hooks client).
7. **Convenções de nomes:** Arquivos em `kebab-case`. Componentes em `PascalCase`. Pastas de feature no singular/plural do domínio em PT-BR (`envelopes`, `transacoes`, `contas`, `metas`).

