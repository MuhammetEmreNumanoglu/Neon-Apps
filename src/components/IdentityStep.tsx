/**
 * ==========================================
 * IdentityStep - Yeni Başlayanlar İçin
 * ==========================================
 * 
 * ADIM 1: Kimlik Bilgileri Formu
 * 
 * Topladığı Bilgiler:
 * - İsim (en az 2 karakter)
 * - Soyisim (en az 2 karakter)
 * - Burç (12 seçenek)
 * 
 * Kullanıcı "Next Step" butonuna bastığında:
 * 1. Form doğrulama yapılır
 * 2. Başarılıysa veriler store'a kaydedilir
 * 3. Adım 2'ye geçilir
 */

"use client";

// Form yönetimi için gerekli kütüphaneler
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// UI bileşenleri
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

// Zustand store
import { useOnboardingStore } from '@/stores/onboardingStore';

// 12 burç listesi
const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

// Form doğrulama kuralları
const identitySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    surname: z.string().min(2, 'Surname must be at least 2 characters'),
    zodiac: z.string().min(1, 'Please select your zodiac sign')
});

// TypeScript tipi
type IdentityFormData = z.infer<typeof identitySchema>;

export function IdentityStep() {
    // Store'dan ihtiyacımız olanları al
    const identity = useOnboardingStore((state) => state.identity);
    const setIdentity = useOnboardingStore((state) => state.setIdentity);
    const nextStep = useOnboardingStore((state) => state.nextStep);

    // React Hook Form kurulumu
    const {
        register,        // Input alanlarını kaydetmek için
        handleSubmit,    // Form gönderildiğinde çalışır
        setValue,        // Değer manuel ayarlamak için (select için gerekli)
        formState: { errors }  // Doğrulama hataları
    } = useForm<IdentityFormData>({
        resolver: zodResolver(identitySchema),  // Zod şemasını kullan
        defaultValues: identity  // Mevcut değerlerle başla
    });

    // Form gönderildiğinde çalışacak fonksiyon
    const onSubmit = (data: IdentityFormData) => {
        setIdentity(data);  // Verileri store'a kaydet
        nextStep();         // Adım 2'ye geç
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Step 1: Identity Information</CardTitle>
                <CardDescription>
                    Please provide your basic identity information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* İsim Alanı */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            {...register('name')}
                            className={errors.name ? 'border-destructive' : ''}
                        />
                        {/* Hata varsa göster */}
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Soyisim Alanı */}
                    <div className="space-y-2">
                        <Label htmlFor="surname">Surname *</Label>
                        <Input
                            id="surname"
                            placeholder="Enter your surname"
                            {...register('surname')}
                            className={errors.surname ? 'border-destructive' : ''}
                        />
                        {/* Hata varsa göster */}
                        {errors.surname && (
                            <p className="text-sm text-destructive">{errors.surname.message}</p>
                        )}
                    </div>

                    {/* Burç Seçimi */}
                    <div className="space-y-2">
                        <Label htmlFor="zodiac">Zodiac Sign *</Label>
                        <Select
                            defaultValue={identity.zodiac}
                            onValueChange={(value) => setValue('zodiac', value)}
                        >
                            <SelectTrigger className={errors.zodiac ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select your zodiac sign" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Her burç için bir seçenek */}
                                {zodiacSigns.map((sign) => (
                                    <SelectItem key={sign} value={sign}>
                                        {sign}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Hata varsa göster */}
                        {errors.zodiac && (
                            <p className="text-sm text-destructive">{errors.zodiac.message}</p>
                        )}
                    </div>

                    {/* Next Step Butonu */}
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
