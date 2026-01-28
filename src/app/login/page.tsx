// Bu direktif, bu component'in client-side'da render edileceğini belirtir
// Next.js App Router'da default olarak tüm component'ler server component'tir
// Ancak hooks (useState, useEffect, etc.) kullanmak için 'use client' gereklidir
'use client';

// Component ve custom hook import'ları
import { LoginForm } from '../../components/LoginForm'; // Login formu component'i
import { useAuthStore } from '../../stores/auth'; // Zustand authentication store'u
import { useRouter } from 'next/navigation'; // Next.js navigation hook'u
import { useEffect } from 'react'; // React effect hook'u

// Login sayfası component'i
// Bu sayfa, kullanıcının kimlik doğrulaması yapması için giriş noktasıdır
export default function LoginPage() {
  // Zustand auth store'undan authentication durumunu çekiyoruz
  // isAuthenticated: Kullanıcı giriş yapmış mı?
  // hydrated: Store client-side'da başarıyla yüklendi mi?
  const { isAuthenticated, hydrated } = useAuthStore();

  // Next.js router instance'ı - programatik navigasyon için kullanılır
  const router = useRouter();

  // Effect: Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
  // Dependencies: hydrated, isAuthenticated, router değiştiğinde çalışır
  useEffect(() => {
    // Hydration tamamlanmış VE kullanıcı authenticate edilmişse
    if (hydrated && isAuthenticated) {
      // Ana sayfaya (dashboard) yönlendir
      router.push('/');
      // Erken return ile component render'ını engellemeye çalışıyoruz
      return;
    }
  }, [hydrated, isAuthenticated, router]); // Dependency array

  // Eğer store henüz hydrate olmadıysa (client-side yükleme devam ediyorsa)
  // Loading spinner göster
  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* Dönen loading animasyonu */}
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Eğer kullanıcı authenticate edilmişse (ama redirect henüz gerçekleşmediyse)
  // Geçici loading göster - useEffect redirect yapacak
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* Redirect sırasında gösterilecek loading spinner */}
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Normal durum: Kullanıcı giriş yapmamış, login formunu göster
  return (
    // Full screen container: min-height viewport, centered, gradient background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      {/* LoginForm component'i - asıl form burada render edilir */}
      <LoginForm />
    </div>
  );
}
