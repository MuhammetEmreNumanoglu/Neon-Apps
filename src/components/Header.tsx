/**
 * Header Component
 * 
 * Uygulamanın üst kısmı - Kullanıcı bilgisi ve logout
 */
'use client';

import { useAuthStore } from '../stores/auth';
import { useRouter } from 'next/navigation';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  // Isimden bas harfleri al
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <header className="border-b border-white/10 bg-black h-16 px-6 flex items-center justify-between">
      <h1 className="text-xl text-white font-semibold">Dashboard</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/10">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
            <div className="hidden md:flex flex-col items-start text-white">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-white/60">{user.role}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}