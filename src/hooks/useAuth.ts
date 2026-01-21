import { useAuthStore } from '../stores/auth';

export function useHasPermission(permission: string): boolean {
  const { user } = useAuthStore();
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

export function useHasRole(role: 'Admin' | 'Employee'): boolean {
  const { user } = useAuthStore();
  return !!user && user.role === role;
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