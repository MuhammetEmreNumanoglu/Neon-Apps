/**
 * UI Component Type Definitions
 */

import { LucideIcon } from 'lucide-react';

export interface MenuItem {
    label: string;
    href: string;
    icon: LucideIcon;
    permissions?: string[];
}

export interface SidebarProps {
    menuItems: MenuItem[];
}

export interface AppLayoutProps {
    children: React.ReactNode;
}

export interface QueryProviderProps {
    children: React.ReactNode;
}

export interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredPermissions?: string[];
}

// Card Components
export interface BaseCardProps extends React.ComponentProps<"div"> {
    variant?: 'default' | 'stat' | 'staff' | 'user';
}

export interface StatCardProps extends BaseCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    change?: { value: string; type: 'increase' | 'decrease' | 'neutral' };
}

export interface StaffCardProps extends BaseCardProps {
    member: {
        id: number;
        name: string;
        email: string;
        dept: string;
        zodiac: string;
    };
}

export interface UserCardProps extends BaseCardProps {
    user: {
        id: number;
        name: string;
        email: string;
        company?: { name: string };
        zodiacSign?: string;
        department?: string;
    };
    selected?: boolean;
    onToggleSelect?: (id: number) => void;
}

// Page Props
export interface AnnouncementPageProps {
    params: {
        id: string;
    };
}

// Statistics
export interface ZodiacDistributionItem {
    name: string;
    count: number;
    color: string;
}

export interface DeptZodiacDistributionItem extends ZodiacDistributionItem {
    dept: string;
}
