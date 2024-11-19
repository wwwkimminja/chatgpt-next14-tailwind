'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useSheetStore } from '@/store/sheet';

export function MobileMenu({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSheetStore();

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
