// ❌ VIOLAÇÃO: Arquivo deveria se chamar UserCard.tsx (PascalCase)
// ❌ VIOLAÇÃO: Nome do componente não bate com o arquivo

import React from 'react';

// ❌ VIOLAÇÃO: Props inline ao invés de interface separada
export default function userCard(props: { name: string; email: string; role: string }) {
  return (
    <div className="user-card">
      <h3>{props.name}</h3>
      <p>{props.email}</p>
      <span>{props.role}</span>
    </div>
  );
}
