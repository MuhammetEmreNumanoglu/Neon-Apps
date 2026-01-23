"use client";

// React hook'ları
import { useEffect } from 'react';

// Next.js navigasyon hook'ları
import { useRouter, useSearchParams } from 'next/navigation';

// Zustand store
import { useOnboardingStore } from '@/stores/onboardingStore';

// Adım bileşenleri
import { IdentityStep } from './IdentityStep';
import { ProfessionalStep } from './ProfessionalStep';
import { ConfirmationStep } from './ConfirmationStep';

// UI bileşenleri
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function OnboardingForm() {
    // Next.js router - sayfa yönlendirmeleri için
    const router = useRouter();

    // URL parametrelerini okuma (örn: ?step=2)
    const searchParams = useSearchParams();

    // Store'dan ihtiyacımız olanları al
    const { currentStep, goToStep, hasUnsavedChanges } = useOnboardingStore();

    /**
     * useEffect #1: URL → State Senkronizasyonu
     * 
     * Ne Zaman Çalışır:
     * - Sayfa ilk yüklendiğinde
     * - URL parametreleri değiştiğinde
     * 
     * Ne Yapar:
     * - URL'den step parametresini okur
     * - Eğer geçerliyse (1-3 arası) ve mevcut adımdan farklıysa
     * - goToStep() ile adımı günceller
     * 
     * Örnek:
     * - Kullanıcı /onboarding?step=2 linkini açar
     * - Bu kod URL'den 2'yi okur
     * - goToStep(2) çağırır
     * - Adım 2 gösterilir
     */
    useEffect(() => {
        const urlStep = searchParams.get('step');
        const stepNumber = urlStep ? parseInt(urlStep, 10) : 1;

        if (stepNumber >= 1 && stepNumber <= 3 && stepNumber !== currentStep) {
            goToStep(stepNumber);
        }
    }, [searchParams, goToStep]);

    /**
     * useEffect #2: State → URL Senkronizasyonu
     * 
     * Ne Zaman Çalışır:
     * - currentStep değeri değiştiğinde
     * 
     * Ne Yapar:
     * - Eğer URL'deki step ile currentStep farklıysa
     * - URL'i günceller
     * 
     * Örnek:
     * - Kullanıcı "Next Step" butonuna basar
     * - currentStep 1'den 2'ye değişir
     * - Bu kod URL'yi /onboarding?step=2 yapar
     * 
     * Faydası:
     * - Tarayıcı geri/ileri butonları çalışır
     * - URL kopyalanıp paylaşılabilir
     */
    useEffect(() => {
        const urlStep = searchParams.get('step');
        const urlStepNumber = urlStep ? parseInt(urlStep, 10) : 1;

        if (urlStepNumber !== currentStep) {
            router.push(`/onboarding?step=${currentStep}`, { scroll: false });
        }
    }, [currentStep, router]);

    /**
     * useEffect #3: Sayfa Yenilenme Uyarısı
     * 
     * Ne Zaman Çalışır:
     * - Bileşen yüklendiğinde event listener ekler
     * - Bileşen kaldırıldığında event listener'ı siler
     * 
     * Ne Yapar:
     * - Kullanıcı sayfayı yenilemeye çalışırsa (F5)
     * - Her zaman uyarı mesajı gösterir
     * 
     * Faydası:
     * - Kazara F5 ile veri kaybını önler
     */
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // Her zaman uyarı göster
            const message = 'Sayfayı yenilerseniz kaydettiğiniz bilgiler kaybolabilir. Emin misiniz?';
            e.preventDefault();
            e.returnValue = message;
            return message;
        };

        // Event listener ekle
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Temizlik fonksiyonu: Bileşen kaldırıldığında çalışır
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Dependency array boş - sadece bir kere çalışır

    // İlerleme yüzdesini hesapla
    // Adım 1: 33%, Adım 2: 66%, Adım 3: 100%
    const progressPercentage = (currentStep / 3) * 100;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Geri Butonu */}
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

                {/* BAŞLIK BÖLÜMÜ */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Onboarding Form
                    </h1>
                    <p className="text-muted-foreground">
                        Step {currentStep} of 3
                    </p>
                </div>

                {/* İLERLEME ÇUBUĞU */}
                <div className="space-y-2">
                    {/* Progress bar */}
                    <Progress value={progressPercentage} className="h-2" />

                    {/* Adım etiketleri */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                        {/* Identity etiketi - Adım 1 ve sonrasında vurgulanır */}
                        <span className={currentStep >= 1 ? 'text-primary font-semibold' : ''}>
                            Identity
                        </span>

                        {/* Professional etiketi - Adım 2 ve sonrasında vurgulanır */}
                        <span className={currentStep >= 2 ? 'text-primary font-semibold' : ''}>
                            Professional
                        </span>

                        {/* Confirmation etiketi - Adım 3'te vurgulanır */}
                        <span className={currentStep >= 3 ? 'text-primary font-semibold' : ''}>
                            Confirmation
                        </span>
                    </div>
                </div>

                {/* ADIM İÇERİĞİ - Koşullu Render */}
                <div className="animate-fade-in">
                    {/* Adım 1: Kimlik bilgileri */}
                    {currentStep === 1 && <IdentityStep />}

                    {/* Adım 2: Profesyonel bilgiler */}
                    {currentStep === 2 && <ProfessionalStep />}

                    {/* Adım 3: Onay ve CSV indirme */}
                    {currentStep === 3 && <ConfirmationStep />}
                </div>
            </div>
        </div>
    );
}
