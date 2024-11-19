import { Header } from '@/components/chat/Header';
import { Sidebar } from '@/components/chat/Sidebar';
import { UserProvider } from '@/components/chat/userProvider';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="md:flex h-full">
        {/* side bar */}
        <div className="hidden md:block w-[300px]">
          <Sidebar />
        </div>
        {/* Header + char area */}
        <div className="flex flex-col flex-1 h-full overflow-y-auto">
          <Header />
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
