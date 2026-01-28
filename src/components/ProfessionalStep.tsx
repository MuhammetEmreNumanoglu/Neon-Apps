/**
 * ProfessionalStep Component
 * 
 * Onboarding formunun 2. adımı - Profesyonel Bilgiler
 * Kullanıcıdan departman ve rol bilgilerini toplar.
 * 
 * Özellikler:
 * - React Hook Form ile form yönetimi
 * - Zod ile şema validasyonu
 * - Zustand store ile state yönetimi
 * - 8 departman seçeneği
 * - İleri ve geri navigasyon butonları
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

import { ArrowLeft } from 'lucide-react';

// Departman seçenekleri - Sabit liste (as const)
const departments = [
    'Engineering',
    'Marketing',
    'HR',
    'Sales',
    'Finance',
    'Operations',
    'Customer Support',
    'Product'
] as const;

/**
 * Zod validasyon şeması - Professional form alanlarının kuralları
 */
const professionalSchema = z.object({
    // Departman: Boş olmamalı (seçim yapılmalı)
    department: z.string().min(1, 'Please select your department'),

    // Rol: En az 2 karakter olmalı
    role: z.string().min(2, 'Role title must be at least 2 characters')
});

// TypeScript tip tanımı - Zod şemasından türetilir
type ProfessionalFormData = z.infer<typeof professionalSchema>;

/**
 * ProfessionalStep component'i - Profesyonel bilgiler adımı
 * @returns Profesyonel bilgiler form kartı
 */
export function ProfessionalStep() {
    // Zustand store'dan professional state'ini al
    const professional = useOnboardingStore((state) => state.professional);

    // Zustand store'dan professional setter fonksiyonunu al
    const setProfessional = useOnboardingStore((state) => state.setProfessional);

    // Zustand store'dan bir sonraki adıma geçiş fonksiyonunu al
    const nextStep = useOnboardingStore((state) => state.nextStep);

    // Zustand store'dan bir önceki adıma dönüş fonksiyonunu al
    const previousStep = useOnboardingStore((state) => state.previousStep);

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
    } = useForm<ProfessionalFormData>({
        resolver: zodResolver(professionalSchema),
        defaultValues: professional // Store'daki mevcut değerleri kullan
    });

    /**
     * Form submit handler
     * @param data - Validate edilmiş form verileri
     */
    const onSubmit = (data: ProfessionalFormData) => {
        // Form verilerini store'a kaydet
        setProfessional(data);

        // Bir sonraki adıma geç (Confirmation Step)
        nextStep();
    };

    return (
        // Ana form kartı - Ortalanmış, maksimum genişlik sınırlı
        <Card className="w-full max-w-2xl mx-auto">

            {/* Kart başlığı - Adım numarası ve açıklama */}
            <CardHeader>
                <CardTitle>Step 2: Professional Information</CardTitle>
                <CardDescription>
                    Tell us about your professional background
                </CardDescription>
            </CardHeader>

            <CardContent>
                {/* Form - Submit olduğunda onSubmit çağrılır */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Departman seçim alanı */}
                    <div className="space-y-2">
                        <Label htmlFor="department">Department *</Label>
                        <Select
                            // Store'daki mevcut değeri default olarak seç
                            defaultValue={professional.department}
                            // Değer değiştiğinde setValue ile form'a kaydet
                            onValueChange={(value) => setValue('department', value)}
                        >
                            {/* Select trigger - Hata varsa kırmızı border */}
                            <SelectTrigger className={errors.department ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select your department" />
                            </SelectTrigger>

                            {/* Dropdown içeriği - 8 departman */}
                            <SelectContent>
                                {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Hata mesajı - Varsa göster */}
                        {errors.department && (
                            <p className="text-sm text-destructive">{errors.department.message}</p>
                        )}
                    </div>

                    {/* Rol input alanı */}
                    <div className="space-y-2">
                        <Label htmlFor="role">Role Title *</Label>
                        <Input
                            id="role"
                            placeholder="e.g., Senior Software Engineer"
                            {...register('role')} // React Hook Form ile bağla
                            // Hata varsa kırmızı border göster
                            className={errors.role ? 'border-destructive' : ''}
                        />
                        {/* Hata mesajı - Varsa göster */}
                        {errors.role && (
                            <p className="text-sm text-destructive">{errors.role.message}</p>
                        )}
                    </div>

                    {/* Navigasyon butonları - Geri ve İleri */}
                    <div className="flex justify-between">
                        {/* Geri butonu - Önceki adıma dön (Identity Step) */}
                        <Button
                            type="button"    // Submit değil, normal button
                            variant="outline"
                            size="lg"
                            onClick={previousStep} // Store'daki previousStep fonksiyonunu çağır
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>

                        {/* İleri butonu - Sonraki adıma geç (form submit) */}
                        <Button type="submit" size="lg">
                            Next Step
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
