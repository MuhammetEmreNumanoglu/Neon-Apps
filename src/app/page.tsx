"use client";

import { StaffCard } from '../components/StaffCard';
import { staffData } from '../data/staff';
import { Button } from '../components/ui/button';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Office Staff Directory
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Meet our talented team members
          </p>
          {mounted && (
            <div className="flex gap-4 justify-center mb-8">
              <Button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                variant="outline"
              >
                Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </Button>
              <Button
                onClick={() => router.push('/login')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Button>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staffData.members.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
