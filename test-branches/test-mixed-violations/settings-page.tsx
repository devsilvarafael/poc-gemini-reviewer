// ❌ VIOLAÇÃO: Arquivo deveria se chamar UserSettings.tsx (não settings-page.tsx)
// ❌ VIOLAÇÃO: É uma página mas não tem sufixo Page

import React, { useState, useEffect } from 'react';
// ❌ VIOLAÇÃO: Import relativo ao invés de absoluto com @/
import { User } from '../../types/User.types';

// ❌ VIOLAÇÃO: Props inline, não em interface separada
// ❌ VIOLAÇÃO: Nome do componente em camelCase
export default function settingsPage(props: { userId: string }) {
  // ❌ VIOLAÇÃO: any
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ❌ VIOLAÇÃO: var ao invés de const/let
  var apiUrl = '/api/settings';

  useEffect(() => {
    // ❌ VIOLAÇÃO: Lógica de fetch no componente
    const loadSettings = async () => {
      try {
        const response = await fetch(`${apiUrl}/${props.userId}`);
        // ❌ VIOLAÇÃO: any
        const data: any = await response.json();

        // ❌ VIOLAÇÃO: console.log
        console.log('Settings loaded:', data);

        // ❌ VIOLAÇÃO: Transformação de dados no componente
        const processed = {
          ...data,
          lastUpdated: new Date(data.updatedAt).toLocaleDateString('pt-BR'),
          displayName: `${data.firstName} ${data.lastName}`.trim(),
        };

        setSettings(processed);
      } catch (error) {
        // ❌ VIOLAÇÃO: console.error
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [props.userId]);

  // ❌ VIOLAÇÃO: handler sem prefixo "handle"
  const saveSettings = async (): Promise<void> => {
    // ❌ VIOLAÇÃO: console.log
    console.log('Saving settings:', settings);

    // ❌ VIOLAÇÃO: Lógica de negócios no componente
    const payload = {
      ...settings,
      updatedAt: new Date().toISOString(),
      version: (settings.version || 0) + 1,
    };

    await fetch(`${apiUrl}/${props.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="settings-page">
      <h1>Configurações</h1>

      {/* ❌ VIOLAÇÃO: Usando index como key */}
      {settings?.preferences?.map((pref: any, index: number) => (
        <div key={index} className="pref-item">
          <label>{pref.label}</label>
          <input
            type="checkbox"
            checked={pref.enabled}
            onChange={() => {
              // ❌ VIOLAÇÃO: Mutação direta + lógica no JSX
              pref.enabled = !pref.enabled;
              setSettings({ ...settings });
            }}
          />
        </div>
      ))}

      <button onClick={saveSettings}>Salvar</button>
    </div>
  );
}
