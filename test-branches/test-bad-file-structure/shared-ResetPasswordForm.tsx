// ❌ VIOLAÇÃO: Este é um componente específico de auth, mas está em components/shared/
// Deveria estar em: src/features/auth/components/ResetPasswordForm.tsx

import React, { useState } from 'react';

interface ResetPasswordFormProps {
  onReset: (email: string) => Promise<void>;
}

export default function ResetPasswordForm({ onReset }: ResetPasswordFormProps): React.ReactElement {
  const [email, setEmail] = useState('');

  const handleSubmit = async (): Promise<void> => {
    await onReset(email);
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Resetar Senha</button>
    </div>
  );
}
