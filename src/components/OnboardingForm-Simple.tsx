/**
 * OnboardingForm Simple Version Component
 * 
 * 3 adımlı basit onboarding formu bileşeni.
 * URL senkronizasyonu ve sayfa yenileme uyarısı olmayan basitleştirilmiş versiyon.
 * 
 * Adımlar:
 * 1. Identity (Kimlik Bilgileri) - Ad, Soyad, Burç
 * 2. Professional (Profesyonel Bilgiler) - Departman, Rol
 * 3. Confirmation (Onay) - Bilgilerin gözden geçirilmesi ve CSV indirme
 * 
 * Özellikler:
 * - İlerleme çubuğu (progress bar)
 * - Adım göstergeleri
 * - Zustand state yönetimi
 * - Gradient başlık
 */
"use client";

import { useOnboardingStore } from '@/stores/onboardingStore';
import { IdentityStep } from './IdentityStep';
import { ProfessionalStep } from './ProfessionalStep';
import { ConfirmationStep } from './ConfirmationStep';
import { Progress } from '@/components/ui/progress';

/**
 * OnboardingFormSimple component'i - Basit onboarding formu
 * @returns Onboarding form wrapper
 */
export function OnboardingFormSimple() {
    // Zustand store'dan mevcut adım numarasını al (1, 2 veya 3)
    const currentStep = useOnboardingStore((state) => state.currentStep);

    /**
     * İlerleme yüzdesi hesapla
     * Adım 1: 33%, Adım 2: 66%, Adım 3: 100%
     */
    const progressPercentage = (currentStep / 3) * 100;

    return (
        // Ana container - Full ekran yükseklik, padding
        <div className="min-h-screen py-12 px-4">
            {/* İçerik container - Ortalanmış, maksimum genişlik */}
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Başlık bölümü */}
                <div className="text-center space-y-2">
                    {/* Gradient başlık */}
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Onboarding Form
                    </h1>
                    {/* Adım göstergesi - "Step 1 of 3" */}
                    <p className="text-muted-foreground">
                        Step {currentStep} of 3
                    </p>
                </div>

                {/* İlerleme çubuğu bölümü */}
                <div className="space-y-2">
                    {/* Progress bar - Yüzdeye göre doluluk */}
                    <Progress value={progressPercentage} className="h-2" />

                    {/* Adım etiketleri - Aktif olanlar vurgulanır */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                        {/* Identity adımı - 1. adımda ve sonrasında vurgulu */}
                        <span className={currentStep >= 1 ? 'text-primary font-semibold' : ''}>
                            Identity
                        </span>
                        {/* Professional adımı - 2. adımda ve sonrasında vurgulu */}
                        <span className={currentStep >= 2 ? 'text-primary font-semibold' : ''}>
                            Professional
                        </span>
                        {/* Confirmation adımı - 3. adımda vurgulu */}
                        <span className={currentStep >= 3 ? 'text-primary font-semibold' : ''}>
                            Confirmation
                        </span>
                    </div>
                </div>

                {/* Form adımları - Fade-in animasyonu ile */}
                <div className="animate-fade-in">
                    {/* Adım 1: Kimlik Bilgileri */}
                    {currentStep === 1 && <IdentityStep />}

                    {/* Adım 2: Profesyonel Bilgiler */}
                    {currentStep === 2 && <ProfessionalStep />}

                    {/* Adım 3: Onay ve Gönderim */}
                    {currentStep === 3 && <ConfirmationStep />}
                </div>
            </div>
        </div>
    );
}
