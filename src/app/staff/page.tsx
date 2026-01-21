'use client';

import { staffData } from '../../data/staff';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Home, Users, Settings } from 'lucide-react';

const menuItems = [
  { label: 'Home', href: '/', roles: ['Admin' as const, 'Employee' as const], icon: Home },
  { label: 'Staff', href: '/staff', roles: ['Admin' as const, 'Employee' as const], icon: Users },
  { label: 'Settings', href: '/settings', roles: ['Admin' as const], icon: Settings },
];

export default function StaffPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Staff Management
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Manage staff members
              </p>
              <div className="grid grid-cols-1 gap-4">
                {staffData.members.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-sm">{member.dept}</p>
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