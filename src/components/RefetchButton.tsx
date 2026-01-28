/**
 * RefetchButton Component
 * 
 * Manuel veri yenileme butonu. React Query ile kullanılmak üzere tasarlanmıştır.
 * 
 * Özellikler:
 * - Spinning icon animasyonu (refetch sırasında)
 * - Loading state desteği
 * - Disabled state desteği
 * - Outline buton stili
 */
'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

// Component prop tanımları
interface RefetchButtonProps {
    onRefetch: () => void;      // Tıklandığında çalışacak refetch fonksiyonu
    isRefetching: boolean;       // Şu anda refetch işlemi yapılıyor mu?
    disabled?: boolean;          // Buton disabled mi olmalı? (opsiyonel)
}

/**
 * RefetchButton component'i - Veriyi manuel olarak yenilemek için kullanılır
 * @param onRefetch - Butona tıklandığında çağrılacak fonksiyon
 * @param isRefetching - Refetch işleminin devam edip etmediği (loading state)
 * @param disabled - Butonun disabled olup olmayacağı (opsiyonel)
 * @returns Refetch butonu JSX elementi
 */
export function RefetchButton({ onRefetch, isRefetching, disabled }: RefetchButtonProps) {
    return (
        <Button
            onClick={onRefetch}
            // Buton disabled olmalı eğer:
            // 1. Prop olarak disabled true geldiyse VEYA
            // 2. Şu anda refetch işlemi yapılıyorsa (çift tıklama önlemi)
            disabled={disabled || isRefetching}
            variant="outline"
            className="gap-2"
        >
            {/* Refresh ikonu - Refetch sırasında döner (animate-spin) */}
            <RefreshCw
                className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`}
            />

            {/* Buton metni - Duruma göre değişir */}
            {isRefetching ? 'Refetching...' : 'Refresh Data'}
        </Button>
    );
}
