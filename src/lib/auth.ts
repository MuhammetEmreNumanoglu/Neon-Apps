export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: 'Admin' | 'Employee';
    permissions: string[];
  };
}

import { staffData } from '../data/staff';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!credentials.email.endsWith('@neonapps.com')) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    if (credentials.password.length < 8) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    const user = staffData.members.find(member => member.email === credentials.email);

    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    return {
      success: true,
      user: {
        id: String(user.id),
        email: user.email,
        name: user.name,
        role: user.permissions.includes('admin') ? 'Admin' : 'Employee',
        permissions: user.permissions
      }
    };
  }
};