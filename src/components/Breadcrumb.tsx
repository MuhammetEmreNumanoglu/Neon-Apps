"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../lib/utils";

interface BreadcrumbProps {
    className?: string;
    separator?: React.ReactNode;
    homeLabel?: string;
}

export function Breadcrumb({
    className,
    separator,
    homeLabel = "Home"
}: BreadcrumbProps) {
    const pathname = usePathname();

    const breadcrumbs = React.useMemo(() => {
        const paths = pathname.split("/").filter(Boolean);

        const items = [
            { label: homeLabel, href: "/", isHome: true },
            ...paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`;
                const label = path
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                return { label, href, isHome: false };
            }),
        ];

        return items;
    }, [pathname, homeLabel]);

    const defaultSeparator = <ChevronRight className="size-4 text-muted-foreground" />;

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2", className)}>
            <ol className="flex items-center gap-2">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const isFirst = index === 0;

                    return (
                        <li key={item.href} className="flex items-center gap-2">
                            {!isFirst && (
                                <span className="select-none" aria-hidden="true">
                                    {separator || defaultSeparator}
                                </span>
                            )}
                            {isLast ? (
                                <span
                                    className="text-sm font-medium text-foreground flex items-center gap-1.5"
                                    aria-current="page"
                                >
                                    {item.isHome && <Home className="size-4" />}
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                                >
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
