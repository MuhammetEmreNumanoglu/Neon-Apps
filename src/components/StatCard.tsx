"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card/80 backdrop-blur-sm text-card-foreground rounded-xl border border-border/50 p-6",
        "shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]",
        "dark:bg-card dark:backdrop-blur-none dark:border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function StatCardIcon({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 mb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

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

interface StatCardChangeProps extends React.ComponentProps<"div"> {
  type?: "increase" | "decrease" | "neutral";
}

function StatCardChange({
  className,
  type = "neutral",
  children,
  ...props
}: StatCardChangeProps) {
  const Icon = type === "increase" ? TrendingUp : type === "decrease" ? TrendingDown : null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-xs mt-3 font-medium",
        type === "increase" && "text-green-600 dark:text-green-500",
        type === "decrease" && "text-red-600 dark:text-red-500",
        type === "neutral" && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </div>
  );
}

StatCard.Icon = StatCardIcon;
StatCard.Value = StatCardValue;
StatCard.Label = StatCardLabel;
StatCard.Change = StatCardChange;

export { StatCard };
