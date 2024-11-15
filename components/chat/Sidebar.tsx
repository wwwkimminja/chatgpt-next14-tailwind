import React from 'react';
import { Logo } from './Logo';
import { BASE_URL, CHAT_ROUTES } from '@/constants/routes';
import { MessageSquare, Plus } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { LogoutButton } from './LogoutButton';

const DUMMY_ITEMS = [
  {
    id: 'new',
    label: 'new chat',
    icon: <Plus />,
    href: BASE_URL,
  },
  {
    id: '1',
    label:
      'This is a looooooong chat.this is a looooooong chat.this is a looooooong chat.this is a looooooong chat.',
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/1`,
  },
  {
    id: '2',
    label:
      "Argument of type 'string' is not assignable to parameter of type 'AnyTable<{ name: string; }>'.",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/1`,
  },
];
export function Sidebar() {
  return (
    <nav className="h-full p-3 bg-black flex flex-col text-white">
      {/* logo + menu */}
      <div className="flex-1 overflow-y-auto ">
        <Logo />
        <div className="flex flex-col gap-2 mt-10">
          {DUMMY_ITEMS.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      {/* logout button area */}
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </nav>
  );
}
