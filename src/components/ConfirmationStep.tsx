"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { downloadCSV } from '@/lib/csvExport';
import { ArrowLeft, CheckCircle2, Download } from 'lucide-react';
import { toast } from 'sonner';

export function ConfirmationStep() {
    const identity = useOnboardingStore((state) => state.identity);
    const professional = useOnboardingStore((state) => state.professional);
    const previousStep = useOnboardingStore((state) => state.previousStep);
    const reset = useOnboardingStore((state) => state.reset);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        const formData = {
            name: identity.name,
            surname: identity.surname,
            zodiac: identity.zodiac,
            department: professional.department,
            role: professional.role
        };

        downloadCSV(formData);

        setIsSubmitted(true);

        toast.success('Form submitted successfully! CSV file has been downloaded.', {
            icon: <Download className="h-4 w-4" />
        });

        setTimeout(() => {
            reset();
            setIsSubmitted(false);
        }, 3000);
    };

    if (isSubmitted) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardContent className="pt-16 pb-16 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <CheckCircle2 className="h-16 w-16 text-green-500 animate-scale-in" />

                        <h2 className="text-2xl font-bold">Submission Successful!</h2>
                        <p className="text-muted-foreground">
                            Your onboarding form has been submitted and the CSV file has been downloaded.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

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

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                            Identity Information
                        </h3>
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

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                            Professional Information
                        </h3>
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

                    <div className="flex justify-between pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={previousStep}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>

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
