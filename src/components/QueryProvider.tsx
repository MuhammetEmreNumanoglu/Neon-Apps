/**
 * QueryProvider Component
 * 
 * React Query için provider bileşeni. Tüm uygulamayı sarmalayarak
 * React Query konfigürasyonunu ve QueryClient instance'ını sağlar.
 * 
 * Konfigürasyon:
 * - staleTime: 5 dakika - Veri ne kadar süre "fresh" kabul edilir
 * - gcTime: 10 dakika - Cache'de ne kadar süre saklanır
 * - refetchOnWindowFocus: false - Pencere odağa geldiğinde otomatik refetch yapma
 * - retry: 1 - Hata durumunda 1 kez daha dene
 */
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// Component prop tanımları
interface QueryProviderProps {
    children: React.ReactNode; // Sarmalanacak child component'ler
}

/**
 * QueryProvider component'i - React Query için global provider
 * @param children - QueryProvider içine alınacak component'ler
 * @returns QueryClientProvider ile sarmalanmış children
 */
export function QueryProvider({ children }: QueryProviderProps) {
    /**
     * QueryClient instance'ı - Component lifecycle boyunca sabit kalmalı
     * useState lazy initialization kullanarak sadece ilk render'da oluşturulur
     * Bu, her render'da yeni instance oluşturulmasını önler
     */
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Veri 5 dakika boyunca fresh (güncel) kabul edilir
                        // Bu süre içinde yeniden fetch yapılmaz
                        staleTime: 5 * 60 * 1000, // 5 dakika = 300.000ms

                        // Garbage collection zamanı - Kullanılmayan cache 10 dakika sonra temizlenir
                        gcTime: 10 * 60 * 1000, // 10 dakika = 600.000ms

                        // Pencere odağa geldiğinde otomatik refetch yapma
                        // UX için disable - kullanıcı manuel refetch yapabilir
                        refetchOnWindowFocus: false,

                        // Başarısız request'lerde 1 kez daha dene
                        retry: 1,
                    },
                },
            })
    );

    return (
        // QueryClient'ı tüm child component'lere sağla
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
