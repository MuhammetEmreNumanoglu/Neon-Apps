'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Admin' | 'Employee';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (hydrated && requiredRole && user) {
      const hasAccess = user.role === requiredRole;
      if (!hasAccess) {
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, user, requiredRole, router, hydrated]);

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

  if (requiredRole && user) {
    const hasAccess = user.role === requiredRole;
    if (!hasAccess) {
      return null;
    }
  }

  return <>{children}</>;
}