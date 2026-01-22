"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { LucideIcon } from "lucide-react";

const actionButtonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all hover:shadow-md active:scale-95 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            role: {
                Admin: "bg-purple-600 hover:bg-purple-700 focus-visible:ring-purple-500/50",
                Employee: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500/50",
            },
        },
        defaultVariants: {
            role: "Employee",
        },
    }
);

interface QuickAction {
    id: string;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    adminOnly?: boolean;
}

interface QuickActionsProps {
    actions: QuickAction[];
    userRole: "Admin" | "Employee";
    className?: string;
}

export function QuickActions({ actions, userRole, className }: QuickActionsProps) {
    // Filter actions based on user role
    const visibleActions = actions.filter(
        (action) => !action.adminOnly || userRole === "Admin"
    );

    return (
        <div className={cn("flex flex-wrap items-center gap-3", className)}>
            {visibleActions.map((action) => {
                const Icon = action.icon;
                return (
                    <button
                        key={action.id}
                        onClick={action.onClick}
                        className={actionButtonVariants({ role: userRole })}
                    >
                        <Icon className="size-4" />
                        {action.label}
                    </button>
                );
            })}
        </div>
    );
}

export type { QuickAction };

