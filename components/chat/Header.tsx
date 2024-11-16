import React from 'react';
import { MobileMenu } from './MobileMenu';
import { ModelSelect } from './ModelSelect';

export function Header() {
  return (
    <header className="flex items-center p-2">
      {/* mobile menu area */}
      <MobileMenu />
      {/* select model area */}
      <ModelSelect />
    </header>
  );
}
