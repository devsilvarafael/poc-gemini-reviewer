// ❌ VIOLAÇÃO: Arquivo deveria se chamar NavigationBar.tsx
// ❌ VIOLAÇÃO: Componente exportado como navigationBar (deveria ser PascalCase)

import React, { useState } from 'react';

// ❌ VIOLAÇÃO: camelCase no nome do componente
export default function navigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  // ❌ VIOLAÇÃO: handler sem prefixo "handle"
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <button onClick={toggleMenu}>Menu</button>
      {isOpen && (
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      )}
    </nav>
  );
}
