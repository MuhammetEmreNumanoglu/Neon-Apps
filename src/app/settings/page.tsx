'use client';

import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Home, Users, Settings } from 'lucide-react';

const menuItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Staff', href: '/staff', permissions: ['staff'], icon: Users },
  { label: 'Settings', href: '/settings', permissions: ['settings'], icon: Settings },
];

export default function SettingsPage() {
  return (
    <ProtectedRoute requiredRole="Admin">
      <div className="flex h-screen">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl text-black font-bold  mb-4">
                Settings
              </h1>
              <p className="text-lg text-black mb-6">
                Admin settings
              </p>
              <div className="p-4 border rounded-lg text-black">
                <p>Settings page content here</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}