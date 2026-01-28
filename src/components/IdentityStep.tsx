/**
 * IdentityStep Component
 * 
 * Onboarding formunun 1. adımı - Kimlik Bilgileri
 * Kullanıcıdan ad, soyad ve burç bilgilerini toplar.
 * 
 * Özellikler:
 * - React Hook Form ile form yönetimi
 * - Zod ile şema validasyonu
 * - Zustand store ile state yönetimi
 * - 12 burç seçeneği
 * - Otomatik form validation ve hata mesajları
 */
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useOnboardingStore } from '@/stores/onboardingStore';

// 12 burç (zodiac) sabitlemesi - Değiştirilemez (as const)
const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

/**
 * Zod validasyon şeması - Form alanlarının kurallarını tanımlar
 */
const identitySchema = z.object({
    // Ad: En az 2 karakter olmalı
    name: z.string().min(2, 'Name must be at least 2 characters'),

    // Soyad: En az 2 karakter olmalı
    surname: z.string().min(2, 'Surname must be at least 2 characters'),

    // Burç: Boş olmamalı (seçim yapılmalı)
    zodiac: z.string().min(1, 'Please select your zodiac sign')
});

// TypeScript tip tanımı - Zod şemasından otomatik türetilir
type IdentityFormData = z.infer<typeof identitySchema>;

/**
 * IdentityStep component'i - Kimlik bilgileri adımı
 * @returns Kimlik bilgileri form kartı
 */
export function IdentityStep() {
    // Zustand store'dan identity state'ini al
    const identity = useOnboardingStore((state) => state.identity);

    // Zustand store'dan identity setter fonksiyonunu al
    const setIdentity = useOnboardingStore((state) => state.setIdentity);

    // Zustand store'dan bir sonraki adıma geçiş fonksiyonunu al
    const nextStep = useOnboardingStore((state) => state.nextStep);

    /**
     * React Hook Form setup
     * - resolver: Zod ile validation
     * - defaultValues: Store'dan gelen mevcut değerler (varsa)
     */
    const {
        register,      // Input'ları register etmek için
        handleSubmit,  // Form submit handler
        setValue,      // Programatik değer set etme (Select için gerekli)
        formState: { errors } // Validation hataları
    } = useForm<IdentityFormData>({
        resolver: zodResolver(identitySchema),
        defaultValues: identity // Store'daki mevcut değerleri kullan
    });

    /**
     * Form submit handler
     * @param data - Validate edilmiş form verileri
     */
    const onSubmit = (data: IdentityFormData) => {
        // Form verilerini store'a kaydet
        setIdentity(data);

        // Bir sonraki adıma geç (Professional Step)
        nextStep();
    };

    return (
        // Ana form kartı - Ortalanmış, maksimum genişlik sınırlı
        <Card className="w-full max-w-2xl mx-auto">

            {/* Kart başlığı - Adım numarası ve açıklama */}
            <CardHeader>
                <CardTitle>Step 1: Identity Information</CardTitle>
                <CardDescription>
                    Please provide your basic identity information
                </CardDescription>
            </CardHeader>

            <CardContent>
                {/* Form - Submit olduğunda onSubmit çağrılır */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Ad input alanı */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            {...register('name')} // React Hook Form ile bağla
                            // Hata varsa kırmızı border göster
                            className={errors.name ? 'border-destructive' : ''}
                        />
                        {/* Hata mesajı - Varsa göster */}
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Soyad input alanı */}
                    <div className="space-y-2">
                        <Label htmlFor="surname">Surname *</Label>
                        <Input
                            id="surname"
                            placeholder="Enter your surname"
                            {...register('surname')} // React Hook Form ile bağla
                            // Hata varsa kırmızı border göster
                            className={errors.surname ? 'border-destructive' : ''}
                        />
                        {/* Hata mesajı - Varsa göster */}
                        {errors.surname && (
                            <p className="text-sm text-destructive">{errors.surname.message}</p>
                        )}
                    </div>

                    {/* Burç seçim alanı */}
                    <div className="space-y-2">
                        <Label htmlFor="zodiac">Zodiac Sign *</Label>
                        <Select
                            // Store'daki mevcut değeri default olarak seç
                            defaultValue={identity.zodiac}
                            // Değer değiştiğinde setValue ile form'a kaydet
                            // (Select component register ile çalışmaz, setValue gerekli)
                            onValueChange={(value) => setValue('zodiac', value)}
                        >
                            {/* Select trigger - Hata varsa kırmızı border */}
                            <SelectTrigger className={errors.zodiac ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select your zodiac sign" />
                            </SelectTrigger>

                            {/* Dropdown içeriği - 12 burç */}
                            <SelectContent>
                                {zodiacSigns.map((sign) => (
                                    <SelectItem key={sign} value={sign}>
                                        {sign}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Hata mesajı - Varsa göster */}
                        {errors.zodiac && (
                            <p className="text-sm text-destructive">{errors.zodiac.message}</p>
                        )}
                    </div>

                    {/* İleri butonu - Sağa yaslanmış */}
                    <div className="flex justify-end">
                        <Button type="submit" size="lg">
                            Next Step
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
