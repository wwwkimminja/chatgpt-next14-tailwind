import { Header } from '@/components/chat/Header';
import { Sidebar } from '@/components/chat/Sidebar';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex h-full">
      {/* side bar */}
      <div className="hidden md:block w-[300px]">
        <Sidebar />
      </div>
      {/* Header + char area */}
      <div className="flex flex-col flex-1 h-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
