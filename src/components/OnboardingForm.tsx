/**
 * OnboardingForm Component
 * 
 * Kullanici onboarding formu - 3 adimli (Identity, Professional, Confirmation)
 * Tum step'ler bu dosyada birlestirilmis
 * 
 * Ozellikler:
 * - React Hook Form ile validation
 * - Zustand ile state yonetimi
 * - CSV export fonksiyonu
 * - URL senkronizasyonu
 */
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { downloadCSV } from '@/lib/csvExport';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { ArrowLeft, CheckCircle2, Download } from 'lucide-react';

// Sabit degerler - Burç ve departman secenekleri
const ZODIAC_SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] as const;
const DEPARTMENTS = ['Engineering', 'Marketing', 'HR', 'Sales', 'Finance', 'Operations', 'Customer Support', 'Product'] as const;

// Validation semaları - Her adim icin ayri
const identitySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    surname: z.string().min(2, 'Surname must be at least 2 characters'),
    zodiac: z.string().min(1, 'Please select your zodiac sign')
});

const professionalSchema = z.object({
    department: z.string().min(1, 'Please select your department'),
    role: z.string().min(2, 'Role must be at least 2 characters')
});

// TypeScript tipleri
type IdentityData = z.infer<typeof identitySchema>;
type ProfessionalData = z.infer<typeof professionalSchema>;

/**
 * OnboardingForm ana component
 */
export function OnboardingForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Zustand store'dan gerekli state ve fonksiyonlar
    const { currentStep, identity, professional, setIdentity, setProfessional, nextStep, previousStep, goToStep, reset } = useOnboardingStore();

    // Basari ekrani kontrolu
    const [isSubmitted, setIsSubmitted] = useState(false);

    // URL ile step senkronizasyonu
    useEffect(() => {
        try {
            const urlStep = searchParams.get('step');
            const stepNumber = urlStep ? parseInt(urlStep, 10) : 1;

            // Gecerli step araligi: 1-3
            if (stepNumber >= 1 && stepNumber <= 3 && stepNumber !== currentStep) {
                goToStep(stepNumber);
            }
        } catch (error) {
            // URL parse hatasi durumunda log'la
            console.error('Step parameter parse error:', error);
        }
    }, [searchParams, goToStep, currentStep]);

    // Step degistiginde URL'i guncelle
    useEffect(() => {
        try {
            router.push(`/onboarding?step=${currentStep}`, { scroll: false });
        } catch (error) {
            // Router hatasi durumunda log'la
            console.error('Router push error:', error);
        }
    }, [currentStep, router]);

    // Sayfa yenileme uyarisi - Kullanici veri kaybetmesin
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'Your progress will be lost. Are you sure?';
            return 'Your progress will be lost. Are you sure?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    // Progress yuzde hesapla
    const progressPercentage = (currentStep / 3) * 100;

    // Basari ekrani - Form gonderildikten sonra
    if (isSubmitted) {
        return (
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="w-full max-w-2xl mx-auto">
                        <CardContent className="pt-16 pb-16 text-center">
                            <div className="flex flex-col items-center space-y-4">
                                <CheckCircle2 className="h-16 w-16 text-green-500" />
                                <h2 className="text-2xl font-bold">Submission Successful!</h2>
                                <p className="text-muted-foreground">
                                    Your form has been submitted and CSV file downloaded.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Ana sayfaya don butonu */}
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

                {/* Baslik */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Onboarding Form
                    </h1>
                    <p className="text-muted-foreground">Step {currentStep} of 3</p>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span className={currentStep >= 1 ? 'text-primary font-semibold' : ''}>Identity</span>
                        <span className={currentStep >= 2 ? 'text-primary font-semibold' : ''}>Professional</span>
                        <span className={currentStep >= 3 ? 'text-primary font-semibold' : ''}>Confirmation</span>
                    </div>
                </div>

                {/* Step icerikleri */}
                <div>
                    {currentStep === 1 && <IdentityStep />}
                    {currentStep === 2 && <ProfessionalStep />}
                    {currentStep === 3 && <ConfirmationStep onSubmit={() => setIsSubmitted(true)} />}
                </div>
            </div>
        </div>
    );
}

/**
 * Step 1: Identity (Kimlik Bilgileri)
 */
function IdentityStep() {
    const { identity, setIdentity, nextStep } = useOnboardingStore();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IdentityData>({
        resolver: zodResolver(identitySchema),
        defaultValues: identity
    });

    const onSubmit = (data: IdentityData) => {
        try {
            // Store'a kaydet
            setIdentity(data);
            // Sonraki adima gec
            nextStep();
        } catch (error) {
            // Hata durumunda kullaniciya bildir
            console.error('Identity step submit error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Step 1: Identity Information</CardTitle>
                <CardDescription>Please provide your basic identity information</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Ad */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            {...register('name')}
                            className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    {/* Soyad */}
                    <div className="space-y-2">
                        <Label htmlFor="surname">Surname *</Label>
                        <Input
                            id="surname"
                            placeholder="Enter your surname"
                            {...register('surname')}
                            className={errors.surname ? 'border-destructive' : ''}
                        />
                        {errors.surname && <p className="text-sm text-destructive">{errors.surname.message}</p>}
                    </div>

                    {/* Burç */}
                    <div className="space-y-2">
                        <Label htmlFor="zodiac">Zodiac Sign *</Label>
                        <Select defaultValue={identity.zodiac} onValueChange={(value) => setValue('zodiac', value)}>
                            <SelectTrigger className={errors.zodiac ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select your zodiac sign" />
                            </SelectTrigger>
                            <SelectContent>
                                {ZODIAC_SIGNS.map((sign) => (
                                    <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.zodiac && <p className="text-sm text-destructive">{errors.zodiac.message}</p>}
                    </div>

                    {/* Ileri butonu */}
                    <div className="flex justify-end">
                        <Button type="submit" size="lg">Next Step</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

/**
 * Step 2: Professional (Profesyonel Bilgiler)
 */
function ProfessionalStep() {
    const { professional, setProfessional, nextStep, previousStep } = useOnboardingStore();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfessionalData>({
        resolver: zodResolver(professionalSchema),
        defaultValues: professional
    });

    const onSubmit = (data: ProfessionalData) => {
        try {
            // Store'a kaydet
            setProfessional(data);
            // Sonraki adima gec
            nextStep();
        } catch (error) {
            // Hata durumunda kullaniciya bildir
            console.error('Professional step submit error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Step 2: Professional Information</CardTitle>
                <CardDescription>Tell us about your professional background</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Departman */}
                    <div className="space-y-2">
                        <Label htmlFor="department">Department *</Label>
                        <Select defaultValue={professional.department} onValueChange={(value) => setValue('department', value)}>
                            <SelectTrigger className={errors.department ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select your department" />
                            </SelectTrigger>
                            <SelectContent>
                                {DEPARTMENTS.map((dept) => (
                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.department && <p className="text-sm text-destructive">{errors.department.message}</p>}
                    </div>

                    {/* Rol */}
                    <div className="space-y-2">
                        <Label htmlFor="role">Role Title *</Label>
                        <Input
                            id="role"
                            placeholder="e.g., Senior Software Engineer"
                            {...register('role')}
                            className={errors.role ? 'border-destructive' : ''}
                        />
                        {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
                    </div>

                    {/* Geri ve Ileri butonlari */}
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" size="lg" onClick={previousStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>
                        <Button type="submit" size="lg">Next Step</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

/**
 * Step 3: Confirmation (Onay ve Gonderim)
 */
function ConfirmationStep({ onSubmit }: { onSubmit: () => void }) {
    const { identity, professional, previousStep, reset } = useOnboardingStore();

    const handleSubmit = () => {
        try {
            // Tum form verilerini birlestir
            const formData = {
                name: identity.name,
                surname: identity.surname,
                zodiac: identity.zodiac,
                department: professional.department,
                role: professional.role
            };

            // CSV dosyasini indir
            downloadCSV(formData);

            // Basari ekranini goster
            onSubmit();

            // Basari bildirim
            toast.success('Form submitted successfully!', {
                icon: <Download className="h-4 w-4" />
            });

            // 3 saniye sonra formu sifirla
            setTimeout(() => {
                reset();
            }, 3000);
        } catch (error) {
            // Hata durumunda kullaniciya bildir
            console.error('Form submission error:', error);
            toast.error('Failed to submit form. Please try again.');
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Step 3: Confirmation</CardTitle>
                <CardDescription>Please review your information before submitting</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">

                    {/* Kimlik bilgileri ozeti */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Identity Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{identity.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Surname</p>
                                <p className="font-medium">{identity.surname}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Zodiac Sign</p>
                                <p className="font-medium">{identity.zodiac}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profesyonel bilgiler ozeti */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Professional Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Department</p>
                                <p className="font-medium">{professional.department}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Role Title</p>
                                <p className="font-medium">{professional.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Geri ve Gonder butonlari */}
                    <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" size="lg" onClick={previousStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>
                        <Button type="button" size="lg" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                            <Download className="mr-2 h-4 w-4" />
                            Submit & Download CSV
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
