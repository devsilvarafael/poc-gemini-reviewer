#!/bin/bash
# =============================================================================
# Abre todos os PRs de teste de uma vez
# Execute após rodar o setup.sh e instalar o Gemini Code Assist
# =============================================================================

set -e

echo "🔄 Abrindo PRs de teste..."
echo ""

gh pr create --base main --head test/wrong-component-names \
  --title "[TEST] Componentes com nomes errados" \
  --body "## Objetivo
Validar se o Gemini detecta:
- Nomes de arquivo em kebab-case e camelCase (deveria ser PascalCase)
- Nome do componente diferente do nome do arquivo
- Props inline ao invés de interface separada
- Handlers sem prefixo \`handle\`

## Arquivos modificados
- \`src/components/shared/user-card.tsx\`
- \`src/components/shared/navigationBar.tsx\`

## Resultado esperado
O Gemini deve comentar sobre TODAS as violações acima."

echo "  ✅ PR 1/6 criado"

gh pr create --base main --head test/typescript-any \
  --title "[TEST] Uso de any no TypeScript" \
  --body "## Objetivo
Validar se o Gemini detecta:
- Uso de \`any\` em parâmetros, retornos e variáveis
- Falta de tipagem explícita em services

## Arquivos modificados
- \`src/hooks/useFetchData.ts\`
- \`src/services/apiService.ts\`

## Resultado esperado
O Gemini deve apontar cada uso de \`any\` e sugerir tipos concretos."

echo "  ✅ PR 2/6 criado"

gh pr create --base main --head test/console-logs \
  --title "[TEST] Console.log em produção" \
  --body "## Objetivo
Validar se o Gemini detecta:
- \`console.log\` em código de produção
- \`console.error\` e \`console.warn\` sem logger adequado

## Arquivos modificados
- \`src/features/dashboard/components/DashboardStats.tsx\`

## Resultado esperado
O Gemini deve flaggar todos os console.* e sugerir remoção ou uso de logger."

echo "  ✅ PR 3/6 criado"

gh pr create --base main --head test/business-logic-in-component \
  --title "[TEST] Lógica de negócios no componente" \
  --body "## Objetivo
Validar se o Gemini detecta:
- Fetch de dados direto no componente
- Lógica de filtragem/ordenação no componente
- Cálculos de negócio no componente
- Formatação no componente (deveria ser em utils)

## Arquivos modificados
- \`src/features/dashboard/components/ProductList.tsx\`

## Resultado esperado
O Gemini deve sugerir extração para hooks, services e utils."

echo "  ✅ PR 4/6 criado"

gh pr create --base main --head test/bad-file-structure \
  --title "[TEST] Estrutura de arquivos incorreta" \
  --body "## Objetivo
Validar se o Gemini detecta:
- Componente de feature em \`shared/\` (deveria estar em \`features/auth/\`)
- Uso de \`index.tsx\` como nome de componente

## Arquivos modificados
- \`src/components/shared/ResetPasswordForm.tsx\` (local errado)
- \`src/components/shared/index.tsx\` (nome proibido)

## Resultado esperado
O Gemini deve sugerir mover o arquivo e renomear o index.tsx."

echo "  ✅ PR 5/6 criado"

gh pr create --base main --head test/mixed-violations \
  --title "[TEST] Múltiplas violações combinadas" \
  --body "## Objetivo
Teste final que combina TODAS as violações:
- Nome de arquivo errado (kebab-case)
- Nome de componente em camelCase
- Sem sufixo Page
- Imports relativos
- Props inline
- Uso de \`any\`
- \`var\` ao invés de \`const\`
- \`console.log\` e \`console.error\`
- Lógica de negócios no componente
- Index como key em listas
- Handlers sem prefixo \`handle\`

## Arquivos modificados
- \`src/pages/settings-page.tsx\`

## Resultado esperado
O Gemini deve detectar e comentar sobre a MAIORIA das violações."

echo "  ✅ PR 6/6 criado"

echo ""
echo "=========================================="
echo " ✅ Todos os PRs foram criados!"
echo "=========================================="
echo ""
echo " Aguarde ~5 minutos para o Gemini revisar."
echo " Use 'gh pr list' para ver os PRs."
echo " Use 'gh pr view <numero> --web' para abrir no navegador."
echo ""
