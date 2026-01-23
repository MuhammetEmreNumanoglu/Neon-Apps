/**
 * ==========================================
 * OnboardingForm - Basitleştirilmiş Versiyon
 * ==========================================
 * 
 * Bu dosya yeni başlayanlar için sadeleştirilmiş versiyondur.
 * Karmaşık URL senkronizasyonu kaldırılmıştır.
 * 
 * YAPTIĞI İŞ:
 * - 3 adımlı formu yönetir
 * - İlerleme çubuğu gösterir
 * - Doğru adım bileşenini render eder
 */

"use client";

import { useOnboardingStore } from '@/stores/onboardingStore';
import { IdentityStep } from './IdentityStep';
import { ProfessionalStep } from './ProfessionalStep';
import { ConfirmationStep } from './ConfirmationStep';
import { Progress } from '@/components/ui/progress';

export function OnboardingFormSimple() {
    // Store'dan sadece ihtiyacımız olanları alıyoruz
    const currentStep = useOnboardingStore((state) => state.currentStep);

    // İlerleme yüzdesini hesapla
    // Adım 1: %33, Adım 2: %66, Adım 3: %100
    const progressPercentage = (currentStep / 3) * 100;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Başlık Bölümü */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Onboarding Form
                    </h1>
                    <p className="text-muted-foreground">
                        Step {currentStep} of 3
                    </p>
                </div>

                {/* İlerleme Çubuğu */}
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

                {/* Adım İçeriği - Koşullu Render */}
                <div className="animate-fade-in">
                    {/* Eğer currentStep 1 ise, IdentityStep göster */}
                    {currentStep === 1 && <IdentityStep />}

                    {/* Eğer currentStep 2 ise, ProfessionalStep göster */}
                    {currentStep === 2 && <ProfessionalStep />}

                    {/* Eğer currentStep 3 ise, ConfirmationStep göster */}
                    {currentStep === 3 && <ConfirmationStep />}
                </div>
            </div>
        </div>
    );
}
