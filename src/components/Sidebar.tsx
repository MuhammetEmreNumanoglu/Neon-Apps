/**
 * Sidebar Component
 * 
 * Sol menü bileşeni.
 * Navigation linkleri, tema değiştirme ve logout işlemlerini içerir.
 * Hydration sorunlarını önlemek için mounted kontrolü yapar.
 */
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuthStore } from '../stores/auth';
import { LucideIcon, Sun, Moon, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  permissions?: string[];
}

interface SidebarProps {
  menuItems: MenuItem[];
}

export function Sidebar({ menuItems }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration hatasını önlemek için client-side render kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter items based on user role/permissions (Mock logic)
  const filteredItems = menuItems.filter(item => {
    if (!item.permissions || item.permissions.length === 0) return true;
    if (user?.role === 'Admin') return true;
    return item.permissions.includes(user?.role.toLowerCase() || '');
  });

  const handleLogout = () => {
    try {
      logout();
      router.push('/login');
    } catch (e) {
      console.error(e);
    }
  };

  if (!mounted) {
    // Server-side render sırasında veya ilk yüklemede minimal sidebar (layout shift önlemek için)
    return (
      <aside className="w-64 bg-card border-r border-border flex flex-col transition-all duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            NeonApps
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Staff Management</p>
        </div>
      </aside>
    );
  }

  // Theme bilgisi ve toggle
  const currentTheme = theme === 'dark' ? 'dark' : 'light';
  const ThemeIcon = currentTheme === 'dark' ? Sun : Moon;

  const handleToggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col transition-all duration-300">
      {/* Brand */}
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          NeonApps
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Staff Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User & Theme Toggle */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-sm font-medium text-muted-foreground">Appearance</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleTheme}
            className="rounded-full w-8 h-8 p-0"
          >
            <ThemeIcon className={`w-4 h-4 ${currentTheme === 'dark' ? 'text-yellow-400' : 'text-slate-700'}`} />
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}