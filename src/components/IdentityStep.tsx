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

const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

const identitySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    surname: z.string().min(2, 'Surname must be at least 2 characters'),
    zodiac: z.string().min(1, 'Please select your zodiac sign')
});

type IdentityFormData = z.infer<typeof identitySchema>;

export function IdentityStep() {
    const identity = useOnboardingStore((state) => state.identity);
    const setIdentity = useOnboardingStore((state) => state.setIdentity);
    const nextStep = useOnboardingStore((state) => state.nextStep);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IdentityFormData>({
        resolver: zodResolver(identitySchema),
        defaultValues: identity
    });

    const onSubmit = (data: IdentityFormData) => {
        setIdentity(data);
        nextStep();
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

                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            {...register('name')}
                            className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="surname">Surname *</Label>
                        <Input
                            id="surname"
                            placeholder="Enter your surname"
                            {...register('surname')}
                            className={errors.surname ? 'border-destructive' : ''}
                        />
                        {errors.surname && (
                            <p className="text-sm text-destructive">{errors.surname.message}</p>
                        )}
                    </div>

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
                                {zodiacSigns.map((sign) => (
                                    <SelectItem key={sign} value={sign}>
                                        {sign}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.zodiac && (
                            <p className="text-sm text-destructive">{errors.zodiac.message}</p>
                        )}
                    </div>

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
