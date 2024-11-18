import React from 'react';
import { Logo } from './Logo';
import { BASE_URL, CHAT_ROUTES } from '@/constants/routes';
import { MessageSquare, Plus } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { LogoutButton } from './LogoutButton';
import { getConversationByUser } from '@/data/user';

const NEW_SIDEBAR_ITEM = {
  id: 'new',
  label: 'new chat',
  icon: <Plus />,
  href: BASE_URL,
};

export async function Sidebar() {
  const conversations = await getConversationByUser();

  const formattedItems = [
    NEW_SIDEBAR_ITEM,
    ...conversations.map((conversation) => ({
      id: conversation.id || '',
      label: conversation.name || '',
      icon: <MessageSquare />,
      href: `${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`,
    })),
  ];
  return (
    <nav className="h-full p-3 bg-black flex flex-col text-white">
      {/* logo + menu */}
      <div className="flex-1 overflow-y-auto ">
        <Logo />
        <div className="flex flex-col gap-2 mt-10">
          {formattedItems.map((item) => (
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
