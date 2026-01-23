'use client';

import { staffData } from '../../data/staff';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Home, Users, Settings, FileText } from 'lucide-react';

const menuItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Onboarding', href: '/onboarding', icon: FileText },
  { label: 'Staff', href: '/staff', permissions: ['staff'], icon: Users },
  { label: 'Settings', href: '/settings', permissions: ['settings'], icon: Settings },
];

export default function StaffPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto bg-background">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Staff Management
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Manage staff members
              </p>
              <div className="grid grid-cols-1 gap-4">
                {staffData.members.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg bg-card text-card-foreground">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-sm text-muted-foreground">{member.dept}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}