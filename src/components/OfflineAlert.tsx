'use client';

import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

/**
 * OfflineAlert Component
 * 
 * İnternet bağlantısı durumunu izleyen ve kullanıcıya bildiren alert bileşeni.
 * 
 * Özellikler:
 * - Gerçek zamanlı internet bağlantısı izleme
 * - Bağlantı kesildiğinde otomatik uyarı gösterme
 * - Bağlantı geri geldiğinde bilgilendirme
 * - 3 saniye sonra başarı mesajını otomatik gizleme
 * - Animasyonlu ikonlar (pulse efekti)
 * - Dark mode desteği
 */
export function OfflineAlert() {
    // İnternet bağlantısının aktif olup olmadığını tutar
    const [isOnline, setIsOnline] = useState(true);

    // Alert'in gösterilip gösterilmeyeceğini kontrol eder
    // Offline olduktan sonra online olunca da 3 saniye gösterir
    const [showAlert, setShowAlert] = useState(false);

    /**
     * Component mount olduğunda ve unmount olduğunda çalışan effect
     * Online/offline event listener'ları ekler ve temizler
     */
    useEffect(() => {
        // İlk mount'ta mevcut durumu kontrol et
        setIsOnline(navigator.onLine);

        /**
         * İnternet bağlantısı geri geldiğinde çalışan handler
         * Online durumu günceller ve 3 saniye sonra alert'i gizler
         */
        const handleOnline = () => {
            setIsOnline(true);
            // 3 saniye sonra başarı mesajını gizle
            setTimeout(() => setShowAlert(false), 3000);
        };

        /**
         * İnternet bağlantısı kesildiğinde çalışan handler
         * Offline durumu günceller ve alert'i gösterir
         */
        const handleOffline = () => {
            setIsOnline(false);
            setShowAlert(true);
        };

        // Browser'ın online/offline event'lerini dinle
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Cleanup: Component unmount olduğunda listener'ları kaldır
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []); // Boş dependency array - sadece mount/unmount'ta çalışır

    // Online durumdaysa ve alert gizliyse hiçbir şey render etme
    if (isOnline && !showAlert) {
        return null;
    }

    return (
        // Sabit pozisyonlu, üstte ortalanmış alert container
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg border transition-all duration-300 ${isOnline
                    // Online durumu - Yeşil tema
                    ? 'bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-100'
                    // Offline durumu - Kırmızı tema
                    : 'bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-100'
                }`}
        >
            <div className="flex items-center gap-3">
                {/* Online/Offline durumuna göre ikon göster */}
                {isOnline ? (
                    // Online ikonu - Normal Wifi ikonu
                    <Wifi className="h-5 w-5" />
                ) : (
                    // Offline ikonu - Kesik Wifi ikonu + pulse animasyonu
                    <WifiOff className="h-5 w-5 animate-pulse" />
                )}

                {/* Durum mesajı */}
                <p className="font-medium">
                    {isOnline
                        ? 'Connection restored!' // Bağlantı geri geldi
                        : 'No internet connection. Some features may be unavailable.'} {/* Bağlantı yok */}
                </p>
            </div>
        </div>
    );
}
