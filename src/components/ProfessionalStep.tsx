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

const professionalSchema = z.object({
    department: z.string().min(1, 'Please select your department'),
    role: z.string().min(2, 'Role title must be at least 2 characters')
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

export function ProfessionalStep() {
    const professional = useOnboardingStore((state) => state.professional);
    const setProfessional = useOnboardingStore((state) => state.setProfessional);
    const nextStep = useOnboardingStore((state) => state.nextStep);
    const previousStep = useOnboardingStore((state) => state.previousStep);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<ProfessionalFormData>({
        resolver: zodResolver(professionalSchema),
        defaultValues: professional
    });

    const onSubmit = (data: ProfessionalFormData) => {
        setProfessional(data);
        nextStep();
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
                                {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.department && (
                            <p className="text-sm text-destructive">{errors.department.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role Title *</Label>
                        <Input
                            id="role"
                            placeholder="e.g., Senior Software Engineer"
                            {...register('role')}
                            className={errors.role ? 'border-destructive' : ''}
                        />
                        {errors.role && (
                            <p className="text-sm text-destructive">{errors.role.message}</p>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={previousStep}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>

                        <Button type="submit" size="lg">
                            Next Step
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
