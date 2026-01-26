'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Admin' | 'Employee';
  requiredPermissions?: string[];
}

export function ProtectedRoute({ children, requiredRole, requiredPermissions }: ProtectedRouteProps) {
  const { isAuthenticated, user, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (hydrated && user) {
      if (requiredRole) {
        const hasRole = user.role === requiredRole;
        if (!hasRole) {
          router.push('/');
          return;
        }
      }

      if (requiredPermissions && requiredPermissions.length > 0) {
        const hasPermission = user.permissions?.some(permission =>
          requiredPermissions.includes(permission)
        );
        if (!hasPermission) {
          router.push('/');
          return;
        }
      }
    }
  }, [isAuthenticated, user, requiredRole, requiredPermissions, router, hydrated]);

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

  if (user) {
    if (requiredRole) {
      const hasRole = user.role === requiredRole;
      if (!hasRole) {
        return null;
      }
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasPermission = user.permissions?.some(permission =>
        requiredPermissions.includes(permission)
      );
      if (!hasPermission) {
        return null;
      }
    }
  }

  return <>{children}</>;
}