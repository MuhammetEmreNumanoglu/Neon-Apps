/**
 * Onboarding Type Definitions
 */

export interface OnboardingData {
    name: string;
    surname: string;
    zodiac: string;
    department: string;
    role: string;
}

export interface OnboardingState {
    currentStep: number;
    identity: {
        name: string;
        surname: string;
        zodiac: string;
    };
    professional: {
        department: string;
        role: string;
    };
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (step: number) => void;
    setIdentity: (data: Partial<OnboardingState['identity']>) => void;
    setProfessional: (data: Partial<OnboardingState['professional']>) => void;
    hasUnsavedChanges: () => boolean;
    reset: () => void;
}
