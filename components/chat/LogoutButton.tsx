'use client';
import { Button } from '../ui/button';
import { deleteSession } from '@/actions/sessions';

export function LogoutButton() {
  return (
    <Button
      className="w-[80%] hover:scale-105 hover:font-bold transition-all "
      onClick={() => deleteSession()}
    >
      Log out
    </Button>
  );
}
