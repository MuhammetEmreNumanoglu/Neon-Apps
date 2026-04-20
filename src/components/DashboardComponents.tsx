/**
 * DashboardComponents
 * 
 * Dashboard sayfasi icin yardimci bilesenler:
 * - ActivityFeed: Aktivite akisi
 * - QuickActions: Hizli islem butonlari
 */
"use client";

import { useMemo } from "react";
import { cn } from "../lib/utils";
import { User, FolderOpen, Settings, Bell, LucideIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cva } from "class-variance-authority";

// --- Activity Feed ---

export interface ActivityEvent {
    id: string;
    type: "user" | "project" | "system" | "announcement";
    title: string;
    description: string;
    timestamp: Date;
    user?: string;
}

const eventStyles = {
    user: { icon: User, bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
    project: { icon: FolderOpen, bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400" },
    system: { icon: Settings, bg: "bg-gray-100 dark:bg-gray-900/30", text: "text-gray-600 dark:text-gray-400" },
    announcement: { icon: Bell, bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
};

export function ActivityFeed({ events, className, maxItems }: { events: ActivityEvent[], className?: string, maxItems?: number }) {
    const sortedEvents = useMemo(() => {
        const sorted = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return maxItems ? sorted.slice(0, maxItems) : sorted;
    }, [events, maxItems]);

    if (sortedEvents.length === 0) return <div className="text-center py-8 text-muted-foreground">No recent activity</div>;

    return (
        <div className={cn("space-y-4", className)}>
            {sortedEvents.map((event, index) => {
                const style = eventStyles[event.type];
                const Icon = style.icon;
                const isLast = index === sortedEvents.length - 1;

                return (
                    <div key={event.id} className="relative flex gap-3">
                        {!isLast && <div className="absolute left-5 top-11 bottom-0 w-px bg-border" />}
                        <div className={cn("relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full", style.bg)}>
                            <Icon className={cn("size-4", style.text)} />
                        </div>
                        <div className="flex-1 space-y-1 pt-1">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-sm font-medium leading-none">{event.title}</p>
                                    {event.user && <p className="text-xs text-muted-foreground mt-0.5">by {event.user}</p>}
                                </div>
                                <time className="text-xs text-muted-foreground shrink-0">
                                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                                </time>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// --- Quick Actions ---

export interface QuickAction {
    id: string;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    adminOnly?: boolean;
}

const actionVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all hover:shadow-md active:scale-95 disabled:pointer-events-none",
    {
        variants: {
            role: {
                Admin: "bg-purple-600 hover:bg-purple-700",
                Employee: "bg-blue-600 hover:bg-blue-700",
            },
        },
        defaultVariants: { role: "Employee" },
    }
);

export function QuickActions({ actions, userRole, className }: { actions: QuickAction[], userRole: "Admin" | "Employee", className?: string }) {
    const visibleActions = actions.filter(action => !action.adminOnly || userRole === "Admin");

    return (
        <div className={cn("flex flex-wrap items-center gap-3", className)}>
            {visibleActions.map(action => (
                <button key={action.id} onClick={action.onClick} className={actionVariants({ role: userRole })}>
                    <action.icon className="size-4" />
                    {action.label}
                </button>
            ))}
        </div>
    );
}
