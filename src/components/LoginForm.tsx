/**
 * LoginForm Component
 * 
 * Kullanıcı giriş formu bileşeni. React Hook Form ve Zod validation kullanır.
 * 
 * Özellikler:
 * - Email ve şifre doğrulama (@neonapps.com zorunluluğu)
 * - Şifre görünürlük toggle (göster/gizle)
 * - Otomatik email inputu odaklama
 * - Loading state ile kullanıcı geri bildirimi
 * - Toast bildirimleri (başarılı/başarısız giriş)
 * - Auth store entegrasyonu
 * - Başarılı girişte ana sayfaya yönlendirme
 * 
 * Validasyon Kuralları:
 * - Email: @neonapps.com ile bitmeli
 * - Şifre: En az 8 karakter, 1 büyük harf, 1 özel karakter içermeli
 */
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { toast } from 'sonner';

import { authService, type LoginCredentials } from '../lib/auth';
import { useAuthStore } from '../stores/auth';

// Login form için Zod validasyon şeması
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .refine((email) => email.endsWith('@neonapps.com'), {
      message: 'Email must end with @neonapps.com',
    }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const response = await authService.login(data);

      if (response.success && response.user) {
        login(response.user);
        toast.success('Login successful!', {
          description: `Welcome back, ${response.user.name}!`,
        });
        router.push('/');
      } else {
        toast.error('Login failed', {
          description: response.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      toast.error('Login failed', {
        description: 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your NeonApps account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      ref={emailRef}
                      type="email"
                      placeholder="your.name@neonapps.com"
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}