import type { LoginCredentials, AuthResponse, AuthUser } from '@/types';
import { staffData } from '@/data/staff';

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // staffData'dan kullanıcıyı bul
    const staffMember = staffData.members.find(m => m.email === credentials.email);

    if (!staffMember) {
        return { success: false, message: 'User not found' };
    }

    // Şifre kontrolü yok - LoginForm.tsx'teki Zod validation kurallarını sağlayan herhangi bir şifre kabul edilir
    // (En az 8 karakter, bir büyük harf ve bir özel karakter gerekli)

    // AuthUser formatına çevir
    const user: AuthUser = {
        id: staffMember.id.toString(),
        email: staffMember.email,
        name: staffMember.name,
        role: staffMember.permissions.includes('admin') ? 'Admin' : 'Employee',
        permissions: staffMember.permissions
    };

    return { success: true, user };
}