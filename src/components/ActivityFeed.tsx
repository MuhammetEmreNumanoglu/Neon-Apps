/**
 * ActivityFeed Component
 * 
 * Kullanıcı aktivitelerini, proje güncellemelerini, sistem bildirimlerini ve duyuruları
 * kronolojik sırayla gösteren dinamik bir feed bileşeni.
 * 
 * Özellikler:
 * - Farklı event türleri için özelleştirilmiş ikonlar ve renkler
 * - Otomatik tarihlendirme (date-fns kullanarak)
 * - Maksimum gösterilecek öğe sayısı kontrolü
 * - Zamana göre otomatik sıralama (en yeni en üstte)
 * - Timeline çizgisi (son öğe hariç)
 */
"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { User, FolderOpen, Settings, Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Aktivite event'inin veri yapısı
export interface ActivityEvent {
    id: string;                                                    // Benzersiz event ID
    type: "user" | "project" | "system" | "announcement";         // Event tipi
    title: string;                                                 // Event başlığı
    description: string;                                           // Event açıklaması
    timestamp: Date;                                               // Event zamanı
    user?: string;                                                 // Event'i oluşturan kullanıcı (opsiyonel)
}

// Component prop tanımları
interface ActivityFeedProps {
    events: ActivityEvent[];  // Gösterilecek event listesi
    className?: string;       // Ekstra CSS class'ları (opsiyonel)
    maxItems?: number;       // Maksimum gösterilecek öğe sayısı (opsiyonel)
}

/**
 * Event tiplerine göre görsel konfigürasyon
 * Her event tipi için icon, arka plan rengi ve icon rengi tanımlanır
 */
const eventTypeConfig = {
    // Kullanıcı aktiviteleri - Mavi tema
    user: {
        icon: User,
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    // Proje aktiviteleri - Yeşil tema
    project: {
        icon: FolderOpen,
        bgColor: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
    },
    // Sistem aktiviteleri - Gri tema
    system: {
        icon: Settings,
        bgColor: "bg-gray-100 dark:bg-gray-900/30",
        iconColor: "text-gray-600 dark:text-gray-400",
    },
    // Duyurular - Mor tema
    announcement: {
        icon: Bell,
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
    },
};

/**
 * ActivityFeed component'i - Aktivite akışını gösterir
 * @param events - Gösterilecek event listesi
 * @param className - Ekstra CSS class'lar
 * @param maxItems - Maksimum kaç öğe gösterilecek (opsiyonel)
 * @returns Activity feed JSX elementi
 */
export function ActivityFeed({ events, className, maxItems }: ActivityFeedProps) {
    /**
     * Memoized event listesi - Sıralama ve filtreleme
     * useMemo ile performans optimizasyonu - events veya maxItems değişmedikçe yeniden hesaplanmaz
     */
    const sortedEvents = React.useMemo(() => {
        // Event'leri zamana göre sırala (en yeni en üstte)
        const sorted = [...events].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        // maxItems belirtilmişse sadece ilk N öğeyi al
        return maxItems ? sorted.slice(0, maxItems) : sorted;
    }, [events, maxItems]); // Dependency array - bu değerler değişince yeniden hesapla

    // Eğer gösterilecek event yoksa boş durum göster
    if (sortedEvents.length === 0) {
        return (
            <div className={cn("text-center py-8 text-muted-foreground", className)}>
                No recent activity
            </div>
        );
    }

    return (
        // Ana feed container
        <div className={cn("space-y-4", className)}>
            {/* Her event için kart oluştur */}
            {sortedEvents.map((event, index) => {
                // Event tipine göre konfigürasyon al
                const config = eventTypeConfig[event.type];
                const Icon = config.icon;

                // Son öğe mi? (timeline çizgisi için)
                const isLast = index === sortedEvents.length - 1;

                return (
                    // Event kartı - göreceli pozisyon (timeline çizgisi için)
                    <div key={event.id} className="relative flex gap-3">
                        {/* Timeline çizgisi - Son öğe hariç göster */}
                        {!isLast && (
                            <div className="absolute left-5 top-11 bottom-0 w-px bg-border" />
                        )}

                        {/* Event ikonu - Dairesel container */}
                        <div
                            className={cn(
                                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
                                config.bgColor
                            )}
                        >
                            <Icon className={cn("size-4", config.iconColor)} strokeWidth={2} />
                        </div>

                        {/* Event içeriği */}
                        <div className="flex-1 space-y-1 pt-1">
                            {/* Başlık ve zaman - Üstte */}
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    {/* Event başlığı */}
                                    <p className="text-sm font-medium leading-none">{event.title}</p>

                                    {/* Kullanıcı bilgisi - Varsa göster */}
                                    {event.user && (
                                        <p className="text-xs text-muted-foreground mt-0.5">by {event.user}</p>
                                    )}
                                </div>

                                {/* Göreceli zaman - "2 hours ago" formatında */}
                                <time className="text-xs text-muted-foreground shrink-0">
                                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                                </time>
                            </div>

                            {/* Event açıklaması */}
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
