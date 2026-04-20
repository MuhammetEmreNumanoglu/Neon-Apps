/**
 * QueryProvider
 * 
 * TanStack React Query provider yapılandırması.
 * Uygulamanın en üst seviyesinde kullanılır.
 */
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    // QueryClient'ı state içinde tutarak her render'da yeniden oluşmasını engelliyoruz
    // ve client-side navigation sırasında cache'i koruyoruz.
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // Default staleTime: 1 dakika
                staleTime: 60 * 1000,
                // Error retry logic
                retry: 1,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
