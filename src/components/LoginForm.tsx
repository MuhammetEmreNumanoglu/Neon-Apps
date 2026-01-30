"use client"
import { useState } from 'react';
import { z } from 'zod';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authenticateUser } from '../lib/auth';
import { useAuthStore } from '../stores/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';

const loginSchema = z.object({
    email: z.string()
        .email('Geçersiz email')
        .refine(e => e.endsWith('@neonapps.com'), 'Sadece @neonapps.com kabul edilir'),

    password: z.string()
        .min(8, 'Şifre en az 8 karakter olmalı')
        // En az bir büyük harf kontrolü
        .regex(/[A-Z]/, 'En az bir büyük harf içermeli')
        // En az bir özel karakter kontrolü (semboller)
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'En az bir özel karakter içermeli'),
});
export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({}); // Hataları sıfırla

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Zod ile Doğrulama
        const result = loginSchema.safeParse(data);

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: formattedErrors.email?.[0],
                password: formattedErrors.password?.[0]
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await authenticateUser(result.data);
            if (response.success && response.user) {
                login(response.user);
                toast.success(`Hoş geldin, ${response.user.name}!`);
                router.push('/');
            } else {
                toast.error(response.message || 'Giriş başarısız');
            }
        } catch {
            toast.error('Bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Hoş Geldin</h1>
                <p className="text-muted-foreground">Hesabına giriş yap</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input name="email" type="email" placeholder="emre@neonapps.com" className="pl-10" />
                    </div>
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Şifre</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input name="password" type={showPassword ? 'text' : 'password'} className="pl-10 pr-10" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Giriş Yap'}
                </Button>
            </form>
        </div>
    );
}