/**
 * ==========================================
 * ConfirmationStep - Yeni Başlayanlar İçin
 * ==========================================
 * 
 * ADIM 3: Onay ve CSV İndirme
 * 
 * Gösterdiği Bilgiler:
 * - Adım 1'den gelen kimlik bilgileri
 * - Adım 2'den gelen profesyonel bilgiler
 * 
 * Butonlar:
 * - "Previous": Adım 2'ye geri dön
 * - "Submit & Download CSV": CSV indir ve formu gönder
 * 
 * İşlem Akışı:
 * 1. Kullanıcı "Submit" butonuna basar
 * 2. CSV dosyası indirilir
 * 3. Başarı ekranı gösterilir
 * 4. 3 saniye sonra form sıfırlanır
 */

"use client";

// React hook'u
import { useState } from 'react';

// UI bileşenleri
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Zustand store
import { useOnboardingStore } from '@/stores/onboardingStore';

// CSV indirme fonksiyonu
import { downloadCSV } from '@/lib/csvExport';

// İkonlar
import { ArrowLeft, CheckCircle2, Download } from 'lucide-react';

// Bildirim sistemi
import { toast } from 'sonner';

export function ConfirmationStep() {
    // Store'dan tüm verileri al
    const identity = useOnboardingStore((state) => state.identity);
    const professional = useOnboardingStore((state) => state.professional);
    const previousStep = useOnboardingStore((state) => state.previousStep);
    const reset = useOnboardingStore((state) => state.reset);

    // Form gönderildi mi? (başlangıçta hayır)
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Submit butonuna basıldığında çalışacak fonksiyon
    const handleSubmit = () => {
        // 1. Tüm verileri bir objeye topla
        const formData = {
            name: identity.name,
            surname: identity.surname,
            zodiac: identity.zodiac,
            department: professional.department,
            role: professional.role
        };

        // 2. CSV dosyasını indir
        downloadCSV(formData);

        // 3. Gönderildi durumunu true yap (başarı ekranı gösterilecek)
        setIsSubmitted(true);

        // 4. Başarı bildirimi göster
        toast.success('Form submitted successfully! CSV file has been downloaded.', {
            icon: <Download className="h-4 w-4" />
        });

        // 5. 3 saniye sonra formu sıfırla
        setTimeout(() => {
            reset();              // Store'u sıfırla
            setIsSubmitted(false); // Başarı ekranını kapat
        }, 3000);
    };

    // EĞER FORM GÖNDERİLDİYSE: Başarı ekranını göster
    if (isSubmitted) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardContent className="pt-16 pb-16 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        {/* Yeşil onay işareti */}
                        <CheckCircle2 className="h-16 w-16 text-green-500 animate-scale-in" />

                        {/* Başarı mesajı */}
                        <h2 className="text-2xl font-bold">Submission Successful!</h2>
                        <p className="text-muted-foreground">
                            Your onboarding form has been submitted and the CSV file has been downloaded.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // NORMAL DURUM: Özet ekranını göster
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Step 3: Confirmation</CardTitle>
                <CardDescription>
                    Please review your information before submitting
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">

                    {/* KİMLİK BİLGİLERİ BÖLÜMÜ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                            Identity Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {/* İsim */}
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{identity.name}</p>
                            </div>

                            {/* Soyisim */}
                            <div>
                                <p className="text-sm text-muted-foreground">Surname</p>
                                <p className="font-medium">{identity.surname}</p>
                            </div>

                            {/* Burç */}
                            <div>
                                <p className="text-sm text-muted-foreground">Zodiac Sign</p>
                                <p className="font-medium">{identity.zodiac}</p>
                            </div>
                        </div>
                    </div>

                    {/* PROFESYONEL BİLGİLER BÖLÜMÜ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                            Professional Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Departman */}
                            <div>
                                <p className="text-sm text-muted-foreground">Department</p>
                                <p className="font-medium">{professional.department}</p>
                            </div>

                            {/* Rol */}
                            <div>
                                <p className="text-sm text-muted-foreground">Role Title</p>
                                <p className="font-medium">{professional.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* BUTONLAR */}
                    <div className="flex justify-between pt-4">
                        {/* Geri Butonu - Adım 2'ye dön */}
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={previousStep}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>

                        {/* Gönder Butonu - CSV indir ve gönder */}
                        <Button
                            type="button"
                            size="lg"
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-700"
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
