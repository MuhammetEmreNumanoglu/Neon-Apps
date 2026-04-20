'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth';
import type { ProtectedRouteProps } from '@/types/ui';

export function ProtectedRoute({ children, requiredPermissions }: ProtectedRouteProps) {
    const { isAuthenticated, user, hydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (hydrated && !isAuthenticated) {
            router.push('/login');
            return;
        }

        if (hydrated && user && requiredPermissions && requiredPermissions.length > 0) {
            const hasPermission = user.permissions?.some(permission =>
                requiredPermissions.includes(permission)
            );
            if (!hasPermission) {
                router.push('/');
                return;
            }
        }
    }, [isAuthenticated, user, requiredPermissions, router, hydrated]);

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

    if (user && requiredPermissions && requiredPermissions.length > 0) {
        const hasPermission = user.permissions?.some(permission =>
            requiredPermissions.includes(permission)
        );
        if (!hasPermission) {
            return null;
        }
    }

    return <>{children}</>;
}