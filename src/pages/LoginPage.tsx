import React from 'react';

import LoginForm from '@/features/auth/components/LoginForm';

export default function LoginPage(): React.ReactElement {
  return (
    <main className="login-page">
      <div className="login-container">
        <h1>Bem-vindo</h1>
        <LoginForm />
      </div>
    </main>
  );
}
