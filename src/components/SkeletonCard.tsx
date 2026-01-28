/**
 * SkeletonCard Component
 * 
 * Veri yüklenirken gösterilen loading skeleton bileşeni.
 * Gerçek kart yapısını taklit eder ve kullanıcıya içerik yüklendiğini gösterir.
 * 
 * Özellikler:
 * - Avatar skeleton (dairesel)
 * - Başlık ve alt başlık skeleton'ları
 * - Açıklama satırları (2 satır)
 * - Badge skeleton
 * - Pulse animasyonu (loading efekti)
 */
export function SkeletonCard() {
    return (
        // Ana kart container - gerçek kart ile aynı stil
        <div className="rounded-lg border bg-card p-6 shadow-sm">

            {/* Üst bölüm - Avatar ve başlık skeleton'ları */}
            <div className="flex items-start gap-4">
                {/* Avatar skeleton - Dairesel, pulse animasyonlu */}
                <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />

                {/* Başlık alanı skeleton'ları */}
                <div className="flex-1 space-y-3">
                    {/* Başlık skeleton - Kısa çubuk */}
                    <div className="h-5 w-32 bg-muted animate-pulse rounded" />

                    {/* Alt başlık skeleton - Orta uzunlukta çubuk */}
                    <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                </div>
            </div>

            {/* Açıklama bölümü - İçerik skeleton'ları */}
            <div className="mt-4 space-y-3">
                {/* Birinci satır - Tam genişlik */}
                <div className="h-4 w-full bg-muted animate-pulse rounded" />

                {/* İkinci satır - %75 genişlik (daha doğal görünüm için) */}
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            </div>

            {/* Badge/Etiket skeleton'ı */}
            <div className="mt-4">
                {/* Küçük pill şeklinde skeleton */}
                <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            </div>
        </div>
    );
}
