/**
 * Authentication Type Definitions
 */

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    user?: AuthUser;
    message?: string;
}

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: 'Admin' | 'Employee';
    permissions?: string[];
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    hydrated: boolean;
    login: (user: AuthUser) => void;
    logout: () => void;
    setHydrated: () => void;
}
