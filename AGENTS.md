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
6. **A fronteira client desce até o ponto mais profundo possível.** `"use client"` é contagioso: tudo que o arquivo marcado importa entra no bundle do client junto. Por isso a diretiva nunca vai no componente mais ao topo — vai no componente folha que de fato precisa de estado, evento ou API de browser.
   - Se o pai é server, ele **continua** server. O pedaço interativo é extraído para um componente client à parte e o pai só o renderiza.
   - Nunca marcar `page.tsx`, `layout.tsx` ou um container de seção como client só porque um filho é interativo.
   - Ao encontrar um `"use client"` alto demais, empurrar para baixo: quebrar o componente e mover a diretiva para a folha.
   - Conteúdo estático que vive dentro de um componente client deve entrar via `children`/props (composição), para permanecer renderizado no server.
   ```
   ❌ SectionCard ("use client")        ✅ SectionCard (server)
        └── Header (vira client)             ├── Header (server)
        └── Chart  (vira client)             ├── Chart  (server)
        └── Toggle (precisa de estado)       └── Toggle ("use client") ← só aqui
   ```
7. **Anatomia de feature em pastas por assunto.** Cada feature agrupa seus arquivos em pastas — nunca soltos na raiz da feature. Pastas sob demanda: só cria a que precisar.
   - **`data/`** — tudo que fala com o backend: `api.ts` (transporte HTTP), `queries.ts` (leitura), `actions.ts` (`"use server"`, escrita).
   - **`model/`** — contrato e regra pura, sem I/O: `types.ts`, `schema.ts` (zod), `compute.ts` (derivação) e os testes co-locados (`*.test.ts`).
   - **`session/`** — sessão e proteção de rota: `session.ts` (cookies + estado), `guard.ts` (consumido pelo `proxy.ts`). Exclusiva de `auth`.
   - **`components/`** — componentes do domínio e `use-*.ts` (hooks client).
   ```
   features/auth/
   ├── data/        api.ts · queries.ts · actions.ts
   ├── model/       types.ts · schema.ts · compute.ts · *.test.ts
   ├── session/     session.ts · guard.ts
   └── components/  login-form.tsx · sign-out-button.tsx · auth-showcase.tsx
   ```
8. **Convenções de nomes:** Arquivos em `kebab-case`. Componentes em `PascalCase`. Pastas de feature no singular/plural do domínio em PT-BR (`envelopes`, `transacoes`, `contas`, `metas`).
9. **Camadas base e layout:** `config/` é a camada base (env). `components/layout/` guarda primitivos de composição de página (`Screen`, `Section`). Direção completa: `app → features → components → lib → config`.
10. **Fronteira RHF:** `components/ui/form.tsx` é a **única** fronteira sancionada do react-hook-form. Nenhuma feature importa RHF direto.
11. **Ausência de barrels em features:** **Proibido barrel `index.ts` em `features/`** — mistura `server-only` com `"use server"` e vaza código de servidor para o bundle do client. A superfície pública se documenta aqui, não se centraliza em arquivo.
12. **Validação em schema.ts:** Validação de formulário e de resposta de API mora em `schema.ts`, com zod. Mensagens sempre em PT-BR; nunca repassar texto de erro do backend.
13. **`src/proxy.ts` é convenção do Next, não código solto.** O arquivo *precisa* estar na raiz de `src/`, no mesmo nível de `app/` — é onde o framework procura, e movê-lo faz o guard parar de rodar **em silêncio**. Só um por projeto. Mas a **lógica** não mora nele: cada domínio expõe seu módulo (`features/auth/guard.ts`) e o `proxy.ts` só acopla e exporta o `matcher`.


