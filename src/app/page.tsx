/**
 * Root Page Redirect
 * 
 * Auto-redirects users to /home if logged in,
 * otherwise sends to /login.
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth";

export default function RootPage() {
    const { isAuthenticated, hydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (hydrated) {
            if (isAuthenticated) {
                router.push("/home");
            } else {
                router.push("/login");
            }
        }
    }, [hydrated, isAuthenticated, router]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
}
