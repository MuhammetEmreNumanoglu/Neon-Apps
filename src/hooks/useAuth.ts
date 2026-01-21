import { useAuthStore } from '../stores/auth';

export function useHasRole(requiredRole: 'Admin' | 'Employee'): boolean {
  const { user } = useAuthStore();
  if (!user) return false;
  if (requiredRole === 'Admin') return user.role === 'Admin';
  return true; // Employee role allows access to employee features
}

export function useCanAccessSettings(): boolean {
  return useHasRole('Admin');
}

export function useCanManageUsers(): boolean {
  return useHasRole('Admin');
}

export function useIsAuthenticated() {
  return useAuthStore((state) => state.isAuthenticated);
}

export function useAuthHydrated() {
  return useAuthStore((state) => state.hydrated);
}