/**
 * Onboarding Page
 * 
 * Yeni personel giris sayfasi.
 */
"use client";

import { Suspense } from "react";
import { OnboardingForm } from "../../components/OnboardingForm";

export default function OnboardingPage() {
    return (
        <div className="bg-background min-h-screen">
            <Suspense fallback={<div className="flex items-center justify-center h-screen text-muted-foreground">Loading onboarding...</div>}>
                <OnboardingForm />
            </Suspense>
        </div>
    );
}
