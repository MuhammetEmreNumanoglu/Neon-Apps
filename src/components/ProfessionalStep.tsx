/**
 * ==========================================
 * ProfessionalStep - Yeni Başlayanlar İçin
 * ==========================================
 * 
 * ADIM 2: Profesyonel Bilgiler Formu
 * 
 * Topladığı Bilgiler:
 * - Departman (8 seçenek)
 * - Rol/Pozisyon (en az 2 karakter)
 * 
 * Butonlar:
 * - "Previous": Adım 1'e geri dön
 * - "Next Step": Adım 3'e geç
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

// İkonlar
import { ArrowLeft } from 'lucide-react';

// 8 departman listesi
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

// Form doğrulama kuralları
const professionalSchema = z.object({
    department: z.string().min(1, 'Please select your department'),
    role: z.string().min(2, 'Role title must be at least 2 characters')
});

// TypeScript tipi
type ProfessionalFormData = z.infer<typeof professionalSchema>;

export function ProfessionalStep() {
    // Store'dan ihtiyacımız olanları al
    const professional = useOnboardingStore((state) => state.professional);
    const setProfessional = useOnboardingStore((state) => state.setProfessional);
    const nextStep = useOnboardingStore((state) => state.nextStep);
    const previousStep = useOnboardingStore((state) => state.previousStep);

    // React Hook Form kurulumu
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<ProfessionalFormData>({
        resolver: zodResolver(professionalSchema),
        defaultValues: professional
    });

    // Form gönderildiğinde çalışacak fonksiyon
    const onSubmit = (data: ProfessionalFormData) => {
        setProfessional(data);  // Verileri store'a kaydet
        nextStep();             // Adım 3'e geç
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Step 2: Professional Information</CardTitle>
                <CardDescription>
                    Tell us about your professional background
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Departman Seçimi */}
                    <div className="space-y-2">
                        <Label htmlFor="department">Department *</Label>
                        <Select
                            defaultValue={professional.department}
                            onValueChange={(value) => setValue('department', value)}
                        >
                            <SelectTrigger className={errors.department ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select your department" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Her departman için bir seçenek */}
                                {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Hata varsa göster */}
                        {errors.department && (
                            <p className="text-sm text-destructive">{errors.department.message}</p>
                        )}
                    </div>

                    {/* Rol Alanı */}
                    <div className="space-y-2">
                        <Label htmlFor="role">Role Title *</Label>
                        <Input
                            id="role"
                            placeholder="e.g., Senior Software Engineer"
                            {...register('role')}
                            className={errors.role ? 'border-destructive' : ''}
                        />
                        {/* Hata varsa göster */}
                        {errors.role && (
                            <p className="text-sm text-destructive">{errors.role.message}</p>
                        )}
                    </div>

                    {/* Butonlar: Geri ve İleri */}
                    <div className="flex justify-between">
                        {/* Geri Butonu - Adım 1'e dön */}
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={previousStep}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>

                        {/* İleri Butonu - Adım 3'e geç */}
                        <Button type="submit" size="lg">
                            Next Step
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
