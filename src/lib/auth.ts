import type { LoginCredentials, AuthResponse, AuthUser } from '@/types';

const MOCK_USERS: AuthUser[] = [
    { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'Admin', permissions: ['staff', 'settings'] },
    { id: '2', email: 'emp@example.com', name: 'Employee User', role: 'Employee', permissions: [] }
];

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(u => u.email === credentials.email);

    if (!user) {
        return { success: false, message: 'User not found' };
    }

    if (credentials.password !== 'password') {
        return { success: false, message: 'Invalid password' };
    }

    return { success: true, user };
}