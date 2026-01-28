/**
 * Card Component (Unified)
 * 
 * Tum kart ihtiyaclari icin tek ve esnek bilesen.
 * Compound component pattern ve preset variant'lar kullanir.
 * 
 * Kullanim Sekilleri:
 * 1. Compound: <Card><Card.Header>...</Card.Header></Card>
 * 2. Stat Preset: <Card variant="stat" icon={...} value="..." label="..." change={...} />
 * 3. Staff Preset: <Card variant="staff" name="..." role="..." department="..." />
 * 4. User Preset: <Card variant="user" user={...} />
 */
"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { TrendingUp, TrendingDown, User, LucideIcon } from "lucide-react";
import { Badge } from "./ui/badge";

// --- Base Interface ---
interface BaseCardProps extends React.ComponentProps<"div"> {
    variant?: "default" | "stat" | "staff" | "user" | "post";
}

// --- Variant Interfaces ---
interface StatCardProps extends BaseCardProps {
    variant: "stat";
    icon?: React.ReactNode;
    value: string | number;
    label: string;
    change?: { value: string; type: "increase" | "decrease" | "neutral" };
}

interface StaffCardProps extends BaseCardProps {
    variant: "staff";
    name: string;
    department: string;
    zodiac?: string;
}

interface UserCardProps extends BaseCardProps {
    variant: "user";
    user: { name: string; email: string; role: string; status: string };
}

// Union Type
type UnifiedCardProps = BaseCardProps | StatCardProps | StaffCardProps | UserCardProps;

/**
 * Main Card Component
 */
function Card(props: UnifiedCardProps) {
    // 1. Stat Card Variant
    if (props.variant === "stat") {
        const { icon, value, label, change, className, ...rest } = props as StatCardProps;
        return (
            <BaseCard className={className} {...rest}>
                {icon && <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 mb-4">{icon}</div>}
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
                {change && (
                    <div className={cn(
                        "inline-flex items-center gap-1 text-xs mt-3 font-medium",
                        change.type === "increase" && "text-green-600",
                        change.type === "decrease" && "text-red-600",
                        change.type === "neutral" && "text-muted-foreground"
                    )}>
                        {change.type === "increase" && <TrendingUp className="size-4" />}
                        {change.type === "decrease" && <TrendingDown className="size-4" />}
                        {change.value}
                    </div>
                )}
            </BaseCard>
        );
    }

    // 2. Staff Card Variant
    if (props.variant === "staff") {
        const { name, department, zodiac, className, ...rest } = props as StaffCardProps;
        return (
            <BaseCard className={cn("hover:shadow-lg transition-shadow duration-300 text-center", className)} {...rest}>
                <div className="pb-3 border-b border-border/10 mb-3">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <Badge className={cn("mt-2 font-medium", getDeptColor(department))}>
                        {department}
                    </Badge>
                </div>
                {zodiac && (
                    <div className="text-sm">
                        <span className="text-muted-foreground">Burç: </span>
                        <span className="font-medium text-neon-purple">{zodiac}</span>
                    </div>
                )}
            </BaseCard>
        );
    }

    // 3. Default / Base Usage
    const { className, children, ...rest } = props as BaseCardProps;
    return (
        <BaseCard className={className} {...rest}>
            {children}
        </BaseCard>
    );
}

// --- Helper Functions ---
function BaseCard({ className, children, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("bg-card text-card-foreground rounded-xl border border-border/50 p-6 shadow-sm", className)} {...props}>
            {children}
        </div>
    );
}

function getDeptColor(dept: string) {
    // Basit renk haritalama
    if (dept.includes('Full Stack')) return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
    if (dept.includes('Flutter')) return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
    if (dept.includes('Design') || dept.includes('Tasarım')) return 'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20';
    return 'bg-secondary text-secondary-foreground';
}

// --- Export ---
export { Card };
