// Mock authentication service
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
  };
}

import { staffData } from '../data/staff';

// Mock auth service with simulated delay
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation - only allow emails ending with @neonapps.com
    if (!credentials.email.endsWith('@neonapps.com')) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    // Mock password validation (in real app, this would be server-side)
    // For demo purposes, accept any password that meets the client-side validation
    if (credentials.password.length < 8) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    // Mock user lookup from central staff data
    const user = staffData.members.find(member => member.email === credentials.email);

    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    // Mock successful login
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