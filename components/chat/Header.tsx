import React from 'react';
import { MobileMenu } from './MobileMenu';
import { ModelSelect } from './ModelSelect';
import { Sidebar } from './Sidebar';

export function Header() {
  return (
    <header className="flex items-center p-2 sticky top-0 bg-white z-10">
      {/* mobile menu area */}
      <MobileMenu>
        <Sidebar />
      </MobileMenu>
      {/* select model area */}
      <ModelSelect />
    </header>
  );
}
