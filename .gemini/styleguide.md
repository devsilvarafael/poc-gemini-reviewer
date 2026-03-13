# Style Guide — Padrões do Projeto React

## 1. Nomenclatura de Componentes

### Regras obrigatórias:

- **Componentes React** devem usar **export const**, **nome-componente.tsx** no nome do arquivo e **PascalCase** no nome do componente.
  - ✅ `UserProfile.tsx` → `export const UserProfile = () => {}`
  - ✅ `user-profile.tsx`
- **O nome do arquivo DEVE ser idêntico ao nome do componente exportado.**
  - ❌ Arquivo `card.tsx` exportando `ProductCard` — o arquivo deveria se chamar `ProductCard.tsx`
- **Componentes de página** devem ter sufixo `Page`:
  - ✅ `DashboardPage.tsx`, `LoginPage.tsx`
  - ❌ `Dashboard.tsx` (quando é uma página, não um componente)
- **Hooks customizados** devem começar com `use` em camelCase:
  - ✅ `useAuth.ts`, `useFetchData.ts`
  - ❌ `Auth.ts`, `fetchData.ts` (para hooks)
- **Arquivos de utilidade** devem usar camelCase:
  - ✅ `formatDate.ts`, `validateEmail.ts`
- **Arquivos de tipos** devem usar PascalCase com sufixo `.types.ts`:
  - ✅ `User.types.ts`, `Product.types.ts`

## 2. Estrutura de Pastas

### Regras obrigatórias:

- Componentes compartilhados ficam em `src/components/shared/`.
- Componentes específicos de feature ficam em `src/features/{feature}/components/`.
- **NÃO** colocar componentes de feature dentro de `src/components/shared/`.
- **NÃO** usar `index.tsx` como nome principal de componente. O arquivo deve ter o nome descritivo do componente.
  - ❌ `src/components/shared/index.tsx`
  - ✅ `src/components/shared/Button.tsx`
- Hooks ficam em `src/hooks/` (globais) ou `src/features/{feature}/hooks/` (específicos).
- Serviços de API ficam em `src/services/`.

## 3. TypeScript Estrito

### Regras obrigatórias:

- **PROIBIDO usar `any`**. Sempre tipar explicitamente.
  - ❌ `const data: any = await fetch(...)`
  - ✅ `const data: UserResponse = await fetch(...)`
- **Props** devem ser tipadas com `interface`, não com `type` inline.
  - ✅ `interface ButtonProps { label: string; onClick: () => void; }`
  - ❌ `function Button(props: { label: string; onClick: () => void })`
- **Evitar type assertions** (`as`) quando possível. Usar type guards.
- **Sempre definir tipos de retorno** em funções de serviço e hooks.

## 4. Padrões de Código React

### Regras obrigatórias:

- **Componentes devem ser funcionais** — proibido usar class components.
- **Proibido lógica de negócios dentro de componentes.**
  - Lógica de fetch de dados → extrair para hooks ou services.
  - Transformações de dados → extrair para utils.
  - Regras de negócio → extrair para services.
  - O componente deve apenas renderizar UI e orquestrar hooks.
- **Proibido `console.log`** em código de produção. Usar um logger ou remover.
- **Proibido `var`** — usar apenas `const` e `let`.
- **Handlers de evento** devem ter prefixo `handle`:
  - ✅ `handleClick`, `handleSubmit`, `handleChange`
  - ❌ `click`, `onButtonClick`, `submitForm`

## 5. Imports

### Regras obrigatórias:

- Usar **imports absolutos** com alias `@/`:
  - ✅ `import { Button } from '@/components/shared/Button'`
  - ❌ `import { Button } from '../../../components/shared/Button'`
- **Ordem de imports** (separados por linha em branco):
  1. Libs externas (`react`, `react-router-dom`, etc.)
  2. Componentes internos (`@/components/...`)
  3. Hooks, services, utils (`@/hooks/...`, `@/services/...`)
  4. Types (`@/types/...`)
  5. Styles e assets
- **Proibido imports cíclicos.**

## 6. Segurança e Boas Práticas

### Regras obrigatórias:

- **NUNCA commitar** arquivos `.env`, chaves de API ou secrets.
- **Sempre sanitizar** inputs do usuário.
- **Usar `key` única** em listas renderizadas — nunca usar index como key.
- **Proibido `dangerouslySetInnerHTML`** sem sanitização.
- **Tratamento de erros** obrigatório em chamadas assíncronas (try/catch ou error boundaries).
