/**
 * AppLayout Component
 * 
 * Uygulamanin ana yerlesim plani (Layout).
 * Sidebar ve Header bilesenlerini icerir.
 * Sayfa icerigini (children) sarmalar.
 */
"use client";

import { Header } from "./Header";
import { Sidebar, MenuItem } from "./Sidebar";
import { Home, Users, Settings, Database, ChevronsLeftRightEllipsis, FileText } from "lucide-react";

// Menu tanimlamalari - Merkezi yonetim
const MENU_ITEMS: MenuItem[] = [
    { label: "Home", href: "/", icon: Home },
    { label: "Onboarding", href: "/onboarding", icon: FileText },
    { label: "Staff", href: "/staff", permissions: ["staff"], icon: Users },
    { label: "Data", href: "/data-demo", icon: Database },
    { label: "Statistics", href: "/statistics", permissions: [], icon: ChevronsLeftRightEllipsis },
    { label: "Settings", href: "/settings", permissions: ["settings"], icon: Settings },
];

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen bg-background">
            {/* Sol Sidebar */}
            <Sidebar menuItems={MENU_ITEMS} />

            {/* Sag Ana Icerik Alani */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Ust Header */}
                <Header />

                {/* Sayfa Icerigi - Scroll edilebilir */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
