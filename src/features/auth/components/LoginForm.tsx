import React, { useState } from 'react';

import Button from '@/components/shared/Button';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (): Promise<void> => {
    setError(null);

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Senha"
      />

      <Button
        label="Entrar"
        onClick={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
