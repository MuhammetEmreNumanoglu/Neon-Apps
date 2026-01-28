/**
 * Breadcrumb Component
 * 
 * Kullanıcının uygulamadaki mevcut konumunu göstermek için kullanılan navigasyon bileşeni.
 * URL path'ini otomatik olarak parse ederek breadcrumb trail'i oluşturur.
 * 
 * Özellikler:
 * - URL'den otomatik breadcrumb oluşturma
 * - Ana sayfa (Home) ikonu ile başlama
 * - Her path segmentini büyük harfle ve düzgün formatta gösterme
 * - Varsayılan veya özelleştirilebilir ayırıcı (separator)
 * - Mevcut sayfa vurgusu (son öğe tıklanamaz)
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../lib/utils";

// Component prop tanımları
interface BreadcrumbProps {
    className?: string;           // Ekstra CSS class'lar (opsiyonel)
    separator?: React.ReactNode;  // Özel ayırıcı elementi (opsiyonel)
    homeLabel?: string;           // Ana sayfa label'ı (default: "Home")
}

/**
 * Breadcrumb component'i - URL tabanlı navigasyon trail
 * @param className - Ekstra CSS class'lar
 * @param separator - Özel separator elementi (varsayılan: ChevronRight icon)
 * @param homeLabel - Ana sayfa için kullanılacak label
 * @returns Breadcrumb navigasyon elementi
 */
export function Breadcrumb({
    className,
    separator,
    homeLabel = "Home" // Default değer
}: BreadcrumbProps) {
    // Next.js'den mevcut pathname'i al (örn: "/products/electronics")
    const pathname = usePathname();

    /**
     * Memoized breadcrumb listesi - URL'den breadcrumb path'i oluştur
     * useMemo ile performans optimizasyonu - pathname veya homeLabel değişmedikçe yeniden hesaplanmaz
     */
    const breadcrumbs = React.useMemo(() => {
        // URL'i "/" karakterinden böl ve boş string'leri filtrele
        // Örnek: "/products/electronics" -> ["products", "electronics"]
        const paths = pathname.split("/").filter(Boolean);

        // Breadcrumb öğelerini oluştur
        const items = [
            // İlk öğe her zaman ana sayfa
            { label: homeLabel, href: "/", isHome: true },

            // Her path segmenti için breadcrumb öğesi oluştur
            ...paths.map((path, index) => {
                // Href: tüm önceki path'leri içerir
                // Örnek: index=1 için "/products/electronics"
                const href = `/${paths.slice(0, index + 1).join("/")}`;

                /**
                 * Path'i okunabilir label'a çevir
                 * - Tire'leri boşluğa çevir: "user-profile" -> "user profile"
                 * - Her kelimenin ilk harfini büyüt: "user profile" -> "User Profile"
                 */
                const label = path
                    .split("-")                                      // Tire'lerden ayır
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // İlk harfi büyüt
                    .join(" ");                                     // Boşlukla birleştir

                return { label, href, isHome: false };
            }),
        ];

        return items;
    }, [pathname, homeLabel]); // Dependency array

    // Varsayılan separator - ChevronRight ikonu
    const defaultSeparator = <ChevronRight className="size-4 text-muted-foreground" />;

    return (
        // Ana breadcrumb nav container - semantik nav element
        <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2", className)}>
            {/* Sıralı liste - SEO için semantik yapı */}
            <ol className="flex items-center gap-2">
                {/* Her breadcrumb öğesi için liste item */}
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;  // Son öğe mi?
                    const isFirst = index === 0;                       // İlk öğe mi?

                    return (
                        <li key={item.href} className="flex items-center gap-2">
                            {/* Separator - İlk öğe hariç göster */}
                            {!isFirst && (
                                <span className="select-none" aria-hidden="true">
                                    {separator || defaultSeparator}
                                </span>
                            )}

                            {/* Breadcrumb öğesi */}
                            {isLast ? (
                                // Son öğe - Mevcut sayfa (tıklanamaz)
                                <span
                                    className="text-sm font-medium text-foreground flex items-center gap-1.5"
                                    aria-current="page" // Accessibility için
                                >
                                    {/* Ana sayfaysa Home ikonu göster */}
                                    {item.isHome && <Home className="size-4" />}
                                    {item.label}
                                </span>
                            ) : (
                                // Diğer öğeler - Tıklanabilir link
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                                >
                                    {/* Ana sayfaysa Home ikonu göster */}
                                    {item.isHome && <Home className="size-4" />}
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
