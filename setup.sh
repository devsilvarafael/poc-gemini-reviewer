#!/bin/bash
# =============================================================================
# POC Gemini Code Assist — Setup Script
# =============================================================================
# Este script cria o repositório no GitHub e as branches de teste.
#
# Pré-requisitos:
#   - GitHub CLI (gh) instalado e autenticado: https://cli.github.com/
#   - Git configurado com nome e email
#
# Uso:
#   chmod +x setup.sh
#   ./setup.sh
# =============================================================================

set -e

# ---------------------
# Configurações
# ---------------------
REPO_NAME="poc-gemini-review"
REPO_VISIBILITY="public"   # Mude para "private" se preferir

echo "=========================================="
echo " POC Gemini Code Assist — Setup"
echo "=========================================="
echo ""

# ---------------------
# 1. Inicializar Git e criar repositório
# ---------------------
echo "📁 Inicializando repositório Git..."
git init
git add .
git commit -m "feat: setup inicial do projeto com style guide do Gemini"

echo ""
echo "🌐 Criando repositório no GitHub..."
gh repo create "$REPO_NAME" --"$REPO_VISIBILITY" --source=. --push

echo ""
echo "✅ Repositório criado: https://github.com/$(gh api user --jq .login)/$REPO_NAME"

# ---------------------
# 2. Criar branches de teste
# ---------------------
echo ""
echo "🔀 Criando branches de teste..."

# --- Branch: test/wrong-component-names ---
echo "  → test/wrong-component-names"
git checkout -b test/wrong-component-names
cp test-branches/test-wrong-component-names/user-card.tsx src/components/shared/user-card.tsx
cp test-branches/test-wrong-component-names/navigationBar.tsx src/components/shared/navigationBar.tsx
git add .
git commit -m "feat: adiciona componentes UserCard e NavigationBar"
git push origin test/wrong-component-names
git checkout main

# --- Branch: test/typescript-any ---
echo "  → test/typescript-any"
git checkout -b test/typescript-any
cp test-branches/test-typescript-any/useFetchData.ts src/hooks/useFetchData.ts
cp test-branches/test-typescript-any/apiService.ts src/services/apiService.ts
git add .
git commit -m "feat: adiciona hook useFetchData e apiService"
git push origin test/typescript-any
git checkout main

# --- Branch: test/console-logs ---
echo "  → test/console-logs"
git checkout -b test/console-logs
cp test-branches/test-console-logs/DashboardStats.tsx src/features/dashboard/components/DashboardStats.tsx
git add .
git commit -m "feat: adiciona componente DashboardStats"
git push origin test/console-logs
git checkout main

# --- Branch: test/business-logic-in-component ---
echo "  → test/business-logic-in-component"
git checkout -b test/business-logic-in-component
cp test-branches/test-business-logic-in-component/ProductList.tsx src/features/dashboard/components/ProductList.tsx
git add .
git commit -m "feat: adiciona componente ProductList"
git push origin test/business-logic-in-component
git checkout main

# --- Branch: test/bad-file-structure ---
echo "  → test/bad-file-structure"
git checkout -b test/bad-file-structure
cp test-branches/test-bad-file-structure/shared-ResetPasswordForm.tsx src/components/shared/ResetPasswordForm.tsx
cp test-branches/test-bad-file-structure/index.tsx src/components/shared/index.tsx
git add .
git commit -m "feat: adiciona ResetPasswordForm e SettingsPanel"
git push origin test/bad-file-structure
git checkout main

# --- Branch: test/mixed-violations ---
echo "  → test/mixed-violations"
git checkout -b test/mixed-violations
cp test-branches/test-mixed-violations/settings-page.tsx src/pages/settings-page.tsx
git add .
git commit -m "feat: adiciona página de configurações"
git push origin test/mixed-violations
git checkout main

# ---------------------
# 3. Próximos passos
# ---------------------
GITHUB_USER=$(gh api user --jq .login)

echo ""
echo "=========================================="
echo " ✅ Setup completo!"
echo "=========================================="
echo ""
echo "📋 Próximos passos:"
echo ""
echo "  1. Instale o Gemini Code Assist no repositório:"
echo "     https://github.com/marketplace/gemini-code-assist"
echo ""
echo "  2. Abra PRs para cada branch de teste:"
echo ""
echo "     gh pr create --base main --head test/wrong-component-names \\"
echo "       --title '[TEST] Componentes com nomes errados' \\"
echo "       --body 'Testando detecção de nomes fora do padrão PascalCase'"
echo ""
echo "     gh pr create --base main --head test/typescript-any \\"
echo "       --title '[TEST] Uso de any no TypeScript' \\"
echo "       --body 'Testando detecção de uso de any'"
echo ""
echo "     gh pr create --base main --head test/console-logs \\"
echo "       --title '[TEST] Console.log em produção' \\"
echo "       --body 'Testando detecção de console.log'"
echo ""
echo "     gh pr create --base main --head test/business-logic-in-component \\"
echo "       --title '[TEST] Lógica de negócios no componente' \\"
echo "       --body 'Testando detecção de lógica no componente'"
echo ""
echo "     gh pr create --base main --head test/bad-file-structure \\"
echo "       --title '[TEST] Estrutura de arquivos incorreta' \\"
echo "       --body 'Testando detecção de arquivos no lugar errado'"
echo ""
echo "     gh pr create --base main --head test/mixed-violations \\"
echo "       --title '[TEST] Múltiplas violações combinadas' \\"
echo "       --body 'Teste final com todas as violações juntas'"
echo ""
echo "  3. Aguarde ~5 minutos para o Gemini revisar cada PR."
echo ""
echo "  4. Veja os comentários do gemini-code-assist[bot] nos PRs."
echo ""
echo "  Dica: Use '/gemini review' em um comentário para forçar re-review."
echo ""
