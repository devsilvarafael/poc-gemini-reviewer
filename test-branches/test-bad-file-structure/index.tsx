// ❌ VIOLAÇÃO: Usando index.tsx como nome de componente
// O arquivo deveria se chamar SettingsPanel.tsx

import React from 'react';

export default function SettingsPanel(): React.ReactElement {
  return (
    <div className="settings">
      <h2>Configurações</h2>
      <p>Painel de configurações</p>
    </div>
  );
}
