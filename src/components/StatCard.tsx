/**
 * StatCard Compound Component
 * 
 * İstatistik kartları için esnek ve yeniden kullanılabilir compound component yapısı.
 * Compound pattern kullanarak farklı kombinasyonlarda stat kartları oluşturulabilir.
 * 
 * Ana Component: StatCard - Container
 * Alt Component'ler:
 * - StatCard.Icon - İstatistik ikonu
 * - StatCard.Value - Ana değer (büyük yazı)
 * - StatCard.Label - Açıklama metni
 * - StatCard.Change - Değişim göstergesi (+/- trend ikonları ile)
 * 
 * Özellikler:
 * - Glassmorphism efekti
 * - Hover animasyonu (scale + shadow)
 * - Compound component pattern
 * - Dark mode desteği
 * - Trend göstergeleri (increase/decrease/neutral)
 */
"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * StatCard - Ana container component
 * Tüm stat card elementlerini sarar
 * @param className - Ekstra CSS class'lar
 * @param children - Child component'ler (Icon, Value, Label, Change)
 * @returns Stat card container
 */
function StatCard({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        // Temel stil - Card arka planı ve backdrop blur (glassmorphism)
        "bg-card/80 backdrop-blur-sm text-card-foreground rounded-xl border border-border/50 p-6",
        // Animasyonlar - Shadow ve scale hover efektleri
        "shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]",
        // Dark mode - Blur kaldır, daha solid arka plan
        "dark:bg-card dark:backdrop-blur-none dark:border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * StatCardIcon - İkon container
 * İstatistik ikonunu sarmalayan renkli kutu
 * @param className - Ekstra CSS class'lar
 * @param children - İkon elementi (genellikle Lucide icon)
 * @returns İkon container
 */
function StatCardIcon({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        // İkon container - Hafif primary renkli arka plan, rounded
        "inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 mb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * StatCardValue - Ana istatistik değeri
 * Büyük, kalın yazı ile ana metriği gösterir
 * @param className - Ekstra CSS class'lar
 * @param children - Değer (örn: "1,234" veya "$50K")
 * @returns Değer elementi
 */
function StatCardValue({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-3xl font-bold tracking-tight", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * StatCardLabel - Açıklama metni
 * İstatistiğin ne olduğunu açıklar (örn: "Total Revenue")
 * @param className - Ekstra CSS class'lar
 * @param children - Label metni
 * @returns Label elementi
 */
function StatCardLabel({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-muted-foreground mt-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// StatCardChange prop'larının tip tanımı
interface StatCardChangeProps extends React.ComponentProps<"div"> {
  type?: "increase" | "decrease" | "neutral"; // Trend tipi
}

/**
 * StatCardChange - Trend göstergesi
 * Artış, azalış veya nötr değişimi gösterir
 * @param type - Trend tipi: increase (yeşil ↑), decrease (kırmızı ↓), neutral (gri)
 * @param className - Ekstra CSS class'lar
 * @param children - Değişim metni (örn: "+12.5%" veya "-3.2%")
 * @returns Trend göstergesi
 */
function StatCardChange({
  className,
  type = "neutral",
  children,
  ...props
}: StatCardChangeProps) {
  // Trend tipine göre ikon seç
  const Icon = type === "increase" ? TrendingUp : type === "decrease" ? TrendingDown : null;

  return (
    <div
      className={cn(
        // Temel stil - Küçük font, flex layout
        "inline-flex items-center gap-1 text-xs mt-3 font-medium",
        // Renk - Tip'e göre
        type === "increase" && "text-green-600 dark:text-green-500",   // Artış - Yeşil
        type === "decrease" && "text-red-600 dark:text-red-500",       // Azalış - Kırmızı
        type === "neutral" && "text-muted-foreground",                  // Nötr - Gri
        className
      )}
      {...props}
    >
      {/* İkon - Varsa göster (neutral'da yok) */}
      {Icon && <Icon className="size-4" />}
      {children}
    </div>
  );
}

/**
 * Compound component pattern - Alt component'leri ana component'e bağla
 * Kullanım: <StatCard><StatCard.Icon>...</StatCard.Icon></StatCard>
 */
StatCard.Icon = StatCardIcon;
StatCard.Value = StatCardValue;
StatCard.Label = StatCardLabel;
StatCard.Change = StatCardChange;

// Export - Named export olarak
export { StatCard };
