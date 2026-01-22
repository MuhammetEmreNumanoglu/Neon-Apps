"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { User, FolderOpen, Settings, Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface ActivityEvent {
    id: string;
    type: "user" | "project" | "system" | "announcement";
    title: string;
    description: string;
    timestamp: Date;
    user?: string;
}

interface ActivityFeedProps {
    events: ActivityEvent[];
    className?: string;
    maxItems?: number;
}

const eventTypeConfig = {
    user: {
        icon: User,
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    project: {
        icon: FolderOpen,
        bgColor: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
    },
    system: {
        icon: Settings,
        bgColor: "bg-gray-100 dark:bg-gray-900/30",
        iconColor: "text-gray-600 dark:text-gray-400",
    },
    announcement: {
        icon: Bell,
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
    },
};

export function ActivityFeed({ events, className, maxItems }: ActivityFeedProps) {
    // Sort events by timestamp (newest first)
    const sortedEvents = React.useMemo(() => {
        const sorted = [...events].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        return maxItems ? sorted.slice(0, maxItems) : sorted;
    }, [events, maxItems]);

    if (sortedEvents.length === 0) {
        return (
            <div className={cn("text-center py-8 text-muted-foreground", className)}>
                No recent activity
            </div>
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            {sortedEvents.map((event, index) => {
                const config = eventTypeConfig[event.type];
                const Icon = config.icon;
                const isLast = index === sortedEvents.length - 1;

                return (
                    <div key={event.id} className="relative flex gap-3">
                        {/* Timeline line */}
                        {!isLast && (
                            <div className="absolute left-5 top-11 bottom-0 w-px bg-border" />
                        )}

                        {/* Icon */}
                        <div
                            className={cn(
                                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
                                config.bgColor
                            )}
                        >
                            <Icon className={cn("size-4", config.iconColor)} strokeWidth={2} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1 pt-1">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-sm font-medium leading-none">{event.title}</p>
                                    {event.user && (
                                        <p className="text-xs text-muted-foreground mt-0.5">by {event.user}</p>
                                    )}
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
