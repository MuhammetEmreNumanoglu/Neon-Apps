"use client";

import { StaffCard } from '../components/StaffCard';
import { staffData } from '../data/staff';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Home, Users, Settings } from 'lucide-react';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const menuItems = [
  // Home: herkes görebilsin, o yüzden permissions tanımlamıyoruz
  { label: 'Home', href: '/', icon: Home },
  // Sadece 'staff' yetkisi olanlar (ve admin) görebilsin
  { label: 'Staff', href: '/staff', permissions: ['staff'], icon: Users },
  // Sadece 'settings' yetkisi olanlar (ve admin) görebilsin
  { label: 'Settings', href: '/settings', permissions: ['settings'], icon: Settings },
];

export default function HomePage() {
  const { isAuthenticated, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Office Staff Directory
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Meet our talented team members
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {staffData.members.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
