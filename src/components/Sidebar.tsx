import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth';
import { useTheme } from 'next-themes';
import { Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export interface MenuItem {
  label: string;
  href: string;
  // Örn: ['settings'], ['staff'], ['settings','staff']
  permissions?: string[];
  icon?: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

export function Sidebar({ menuItems }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (!user) return false;
    const userPermissions = user.permissions ?? [];

    // Menü item'ında izin tanımlı değilse herkes görebilsin (ör: Home)
    if (!item.permissions || item.permissions.length === 0) {
      return true;
    }

    // Admin her şeyi görebilsin
    if (userPermissions.includes('admin')) {
      return true;
    }

    // Örn: sadece 'settings' varsa sadece Settings, sadece 'staff' varsa sadece Staff
    return item.permissions.some((p) => userPermissions.includes(p));
  });

  return (
    <div className="flex h-screen w-64 flex-col bg-black border-r border-white/10">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <h2 className="text-2xl text-white font-bold drop-shadow-lg">NeonApps</h2>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/20 transition-all duration-200 text-white/90 hover:text-white backdrop-blur-sm"
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white font-medium">Theme</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative w-12 h-6 rounded-full p-1 bg-white/10 border-white/20 hover:bg-white/20"
          >
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform flex items-center justify-center ${theme === 'dark' ? 'translate-x-6 bg-yellow-400' : 'bg-gray-200'
              }`}>
              {theme === 'dark' ? (
                <Sun className="w-3 h-3 text-gray-800" />
              ) : (
                <Moon className="w-3 h-3 text-yellow-600" />
              )}
            </div>
          </Button>
        </div>

        {user && (
          <div className="border-t border-white/10 pt-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}