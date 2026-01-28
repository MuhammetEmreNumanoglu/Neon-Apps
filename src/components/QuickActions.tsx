/**
 * QuickActions Component
 * 
 * Hızlı erişim buton listesi. CVA (class-variance-authority) ile
 * kullanıcı rolüne göre stillendirilmiş aksiyonlar sunar.
 * 
 * Özellikler:
 * - Admin/Employee rol bazlı styling (CVA variants)
 * - Admin-only action filtering
 * - İkonlu butonlar
 * - Hover ve aktif efektler
 */
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { LucideIcon } from "lucide-react";

/**
 * CVA button variants - Kullanıcı rolüne göre farklı renkler
 * 
 * Admin: Mor tema (purple-600)
 * Employee: Mavi tema (blue-600)
 */
const actionButtonVariants = cva(
    // Temel stil - Tüm butonlar için ortak
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all hover:shadow-md active:scale-95 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            // Role varyantları - Admin ve Employee için farklı renkler
            role: {
                Admin: "bg-purple-600 hover:bg-purple-700 focus-visible:ring-purple-500/50",      // Admin - Mor
                Employee: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500/50",        // Employee - Mavi
            },
        },
        defaultVariants: {
            role: "Employee", // Varsayılan rol: Employee
        },
    }
);

// QuickAction veri yapısı
interface QuickAction {
    id: string;              // Benzersiz action ID
    label: string;           // Buton metni
    icon: LucideIcon;        // Lucide icon component'i
    onClick: () => void;     // Tıklama handler'ı
    adminOnly?: boolean;     // Sadece admin'ler görebilir mi? (opsiyonel)
}

// Component prop tanımları
interface QuickActionsProps {
    actions: QuickAction[];           // Gösterilecek action listesi
    userRole: "Admin" | "Employee";   // Mevcut kullanıcının rolü
    className?: string;                // Ekstra CSS class'lar (opsiyonel)
}

/**
 * QuickActions component'i - Hızlı erişim butonları
 * @param actions - Gösterilecek aksiyonlar
 * @param userRole -Kullanıcının rolü (Admin veya Employee)
 * @param className - Ekstra CSS class'lar
 * @returns QuickActions button listesi
 */
export function QuickActions({ actions, userRole, className }: QuickActionsProps) {
    /**
     * Action filtreleme - Admin-only actionları filtrele
     * Eğer action.adminOnly true ise ve userRole Admin değilse, gösterme
     */
    const visibleActions = actions.filter(
        (action) => !action.adminOnly || userRole === "Admin"
    );

    return (
        // Ana container - Flex wrap ile çok buton olursa alt satıra geç
        <div className={cn("flex flex-wrap items-center gap-3", className)}>
            {/* Her visible action için buton oluştur */}
            {visibleActions.map((action) => {
                const Icon = action.icon; // Icon component'ini al

                return (
                    // Action butonu - CVA ile rolüne göre stillendirilmiş
                    <button
                        key={action.id}
                        onClick={action.onClick}
                        // CVA variants kullanarak rol bazlı stil uygula
                        className={actionButtonVariants({ role: userRole })}
                    >
                        {/* İkon */}
                        <Icon className="size-4" />
                        {/* Buton metni */}
                        {action.label}
                    </button>
                );
            })
            }
        </div>
    );
}

// QuickAction tipini export et (dışarıda kullanım için)
export type { QuickAction };
