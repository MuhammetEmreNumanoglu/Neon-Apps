"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { IdentityStep } from './IdentityStep';
import { ProfessionalStep } from './ProfessionalStep';
import { ConfirmationStep } from './ConfirmationStep';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function OnboardingForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { currentStep, goToStep, hasUnsavedChanges } = useOnboardingStore();

    useEffect(() => {
        const urlStep = searchParams.get('step');
        const stepNumber = urlStep ? parseInt(urlStep, 10) : 1;

        if (stepNumber >= 1 && stepNumber <= 3 && stepNumber !== currentStep) {
            goToStep(stepNumber);
        }
    }, [searchParams, goToStep]);

    useEffect(() => {
        const urlStep = searchParams.get('step');
        const urlStepNumber = urlStep ? parseInt(urlStep, 10) : 1;

        if (urlStepNumber !== currentStep) {
            router.push(`/onboarding?step=${currentStep}`, { scroll: false });
        }
    }, [currentStep, router]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            const message = 'Sayfayı yenilerseniz kaydettiğiniz bilgiler kaybolabilir. Emin misiniz?';
            e.preventDefault();
            e.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const progressPercentage = (currentStep / 3) * 100;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="flex justify-start">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-muted-foreground hover:text-black"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Button>
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Onboarding Form
                    </h1>
                    <p className="text-muted-foreground">
                        Step {currentStep} of 3
                    </p>
                </div>

                <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />

                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span className={currentStep >= 1 ? 'text-primary font-semibold' : ''}>
                            Identity
                        </span>

                        <span className={currentStep >= 2 ? 'text-primary font-semibold' : ''}>
                            Professional
                        </span>

                        <span className={currentStep >= 3 ? 'text-primary font-semibold' : ''}>
                            Confirmation
                        </span>
                    </div>
                </div>

                <div className="animate-fade-in">
                    {currentStep === 1 && <IdentityStep />}

                    {currentStep === 2 && <ProfessionalStep />}

                    {currentStep === 3 && <ConfirmationStep />}
                </div>
            </div>
        </div>
    );
}
