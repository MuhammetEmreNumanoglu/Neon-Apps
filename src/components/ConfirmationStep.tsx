/**
 * ConfirmationStep Component
 * 
 * Onboarding formunun 3. ve son adımı - Onay ve Gönderim
 * Kullanıcının girdiği tüm bilgileri özetler ve CSV olarak indirir.
 * 
 * Özellikler:
 * - Tüm form verilerinin özeti
 * - CSV export fonksiyonu
 * - Başarı animasyonu (CheckCircle)
 * - Toast bildirimleri
 * - Auto-reset (3 saniye sonra)
 * - Geri ve gönder butonları
 */
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { downloadCSV } from '@/lib/csvExport';
import { ArrowLeft, CheckCircle2, Download } from 'lucide-react';
import { toast } from 'sonner';

/**
 * ConfirmationStep component'i - Onay ve gönderim adımı
 * @returns Onay kartı veya başarı ekranı
 */
export function ConfirmationStep() {
    // Zustand store'dan identity (kimlik) verilerini al
    const identity = useOnboardingStore((state) => state.identity);

    // Zustand store'dan professional (profesyonel) verilerini al
    const professional = useOnboardingStore((state) => state.professional);

    // Zustand store'dan bir önceki adıma dönüş fonksiyonunu al
    const previousStep = useOnboardingStore((state) => state.previousStep);

    // Zustand store'dan reset fonksiyonunu al (formu sıfırlamak için)
    const reset = useOnboardingStore((state) => state.reset);

    // Form gönderildi mi? (başarı ekranı gösterimi için)
    const [isSubmitted, setIsSubmitted] = useState(false);

    /**
     * Form gönderim handler - CSV indirir ve başarı ekranı gösterir
     */
    const handleSubmit = () => {
        // Tüm form verilerini birleştir
        const formData = {
            name: identity.name,
            surname: identity.surname,
            zodiac: identity.zodiac,
            department: professional.department,
            role: professional.role
        };

        // CSV dosyasını indir (lib/csvExport.ts fonksiyonu)
        downloadCSV(formData);

        // Başarı ekranına geç
        setIsSubmitted(true);

        // Başarı toast bildirimi göster
        toast.success('Form submitted successfully! CSV file has been downloaded.', {
            icon: <Download className="h-4 w-4" />
        });

        // 3 saniye sonra formu sıfırla ve başa dön
        setTimeout(() => {
            reset();              // Store'u sıfırla (tüm form verileri temizlenir)
            setIsSubmitted(false); // Başarı ekranını gizle
        }, 3000);
    };

    /**
     * Başarı ekranı - Form gönderildikten sonra gösterilir
     * 3 saniye boyunca gösterilir, sonra form sıfırlanır
     */
    if (isSubmitted) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardContent className="pt-16 pb-16 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        {/* Yeşil onay ikonu - Animasyonlu */}
                        <CheckCircle2 className="h-16 w-16 text-green-500 animate-scale-in" />

                        {/* Başarı başlığı */}
                        <h2 className="text-2xl font-bold">Submission Successful!</h2>

                        {/* Bilgi mesajı */}
                        <p className="text-muted-foreground">
                            Your onboarding form has been submitted and the CSV file has been downloaded.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    /**
     * Ana onay ekranı - Tüm girilen bilgilerin özeti
     */
    return (
        <Card className="w-full max-w-2xl mx-auto">

            {/* Kart başlığı */}
            <CardHeader>
                <CardTitle>Step 3: Confirmation</CardTitle>
                <CardDescription>
                    Please review your information before submitting
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-6">

                    {/* Kimlik Bilgileri Özeti */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                            Identity Information
                        </h3>

                        {/* 2 kolonlu grid - Bilgileri yan yana göster */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Ad bilgisi */}
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{identity.name}</p>
                            </div>

                            {/* Soyad bilgisi */}
                            <div>
                                <p className="text-sm text-muted-foreground">Surname</p>
                                <p className="font-medium">{identity.surname}</p>
                            </div>

                            {/* Burç bilgisi */}
                            <div>
                                <p className="text-sm text-muted-foreground">Zodiac Sign</p>
                                <p className="font-medium">{identity.zodiac}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profesyonel Bilgiler Özeti */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                            Professional Information
                        </h3>

                        {/* 2 kolonlu grid - Bilgileri yan yana göster */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Departman bilgisi */}
                            <div>
                                <p className="text-sm text-muted-foreground">Department</p>
                                <p className="font-medium">{professional.department}</p>
                            </div>

                            {/* Rol bilgisi */}
                            <div>
                                <p className="text-sm text-muted-foreground">Role Title</p>
                                <p className="font-medium">{professional.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigasyon butonları - Geri ve Gönder */}
                    <div className="flex justify-between pt-4">
                        {/* Geri butonu - Önceki adıma dön (Professional Step) */}
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={previousStep} // Store'daki previousStep fonksiyonu
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>

                        {/* Gönder butonu - CSV indir ve formu tamamla */}
                        <Button
                            type="button"
                            size="lg"
                            onClick={handleSubmit} // CSV indir ve başarı ekranı göster
                            className="bg-green-600 hover:bg-green-700" // Yeşil submit butonu
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Submit & Download CSV
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
