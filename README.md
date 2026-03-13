# 🧪 POC — Gemini Code Assist Review Agent

Repositório de teste para validar o **Gemini Code Assist** como agente automatizado de code review no GitHub.

## Objetivo

Testar se o Gemini Code Assist consegue:

- ✅ Detectar nomes de componentes fora do padrão (PascalCase)
- ✅ Identificar arquivos com nomenclatura incorreta
- ✅ Apontar uso de `any` no TypeScript
- ✅ Flaggar `console.log` em código de produção
- ✅ Verificar estrutura de imports
- ✅ Detectar lógica de negócios dentro de componentes
- ✅ Sugerir correções com código commitável

## Stack

- React 19
- TypeScript 5
- Vite
- Tailwind CSS 4

## Estrutura do Projeto

```
src/
├── components/
│   └── shared/          # Componentes reutilizáveis
├── features/
│   ├── auth/
│   │   └── components/  # Componentes da feature de auth
│   └── dashboard/
│       └── components/  # Componentes da feature de dashboard
├── hooks/               # Hooks customizados
├── services/            # Serviços e integrações
├── types/               # Tipos TypeScript globais
├── utils/               # Utilitários
└── pages/               # Páginas da aplicação
```

## Setup do Gemini Code Assist

1. Instale o [Gemini Code Assist](https://github.com/marketplace/gemini-code-assist) no repositório
2. As regras customizadas estão em `.gemini/styleguide.md`
3. A configuração do agente está em `.gemini/config.yaml`

## Como Testar

Cada branch `test/*` contém violações propositais para validar as regras:

| Branch | Violação | Regra testada |
|--------|----------|---------------|
| `test/wrong-component-names` | Nomes em camelCase/kebab-case | PascalCase obrigatório |
| `test/typescript-any` | Uso de `any` em tipagens | TypeScript estrito |
| `test/console-logs` | console.log em produção | Sem logs em produção |
| `test/bad-file-structure` | Arquivos no lugar errado | Estrutura de pastas |
| `test/business-logic-in-component` | Lógica no componente | Separação de concerns |
| `test/mixed-violations` | Múltiplas violações | Teste completo |

### Workflow

```bash
# 1. Crie uma branch de teste
git checkout -b test/wrong-component-names

# 2. Adicione os arquivos com violações (veja /test-branches/)
# 3. Faça push e abra um PR para main

git push origin test/wrong-component-names
# Abra o PR no GitHub → Gemini fará review automaticamente em ~5 min
```

## Resultados

Documente os resultados de cada PR na seção de [Issues](../../issues) do repositório.
