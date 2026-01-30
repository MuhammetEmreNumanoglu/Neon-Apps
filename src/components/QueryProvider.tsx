'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import type { QueryProviderProps } from '@/types/ui';

/**
 * @param children - QueryProvider içine alınacak component'ler
 * @returns QueryClientProvider ile sarmalanmış children
 */
export function QueryProvider({ children }: QueryProviderProps) {

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {

                        staleTime: 5 * 60 * 1000,

                        gcTime: 10 * 60 * 1000,


                        refetchOnWindowFocus: false,

                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
