import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth';
import { useTheme } from 'next-themes';
import { useHasRole } from '../hooks/useAuth';
import { Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export interface MenuItem {
  label: string;
  href: string;
  roles?: ('Admin' | 'Employee')[];
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

  const filteredMenuItems = menuItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.some(role => useHasRole(role));
  });

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-2xl text-black dark:text-white font-semibold">NeonApps</h2>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-black dark:text-inherit"
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-black dark:text-white font-medium">Theme</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative w-12 h-6 rounded-full p-1"
          >
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${
              theme === 'dark' ? 'translate-x-6 bg-yellow-400' : 'bg-gray-400'
            }`}>
              {theme === 'dark' ? (
                <Moon className="w-3 h-3 m-0.5" />
              ) : (
                <Sun className="w-3 h-3 m-0.5" />
              )}
            </div>
          </Button>
        </div>

        {user && (
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
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