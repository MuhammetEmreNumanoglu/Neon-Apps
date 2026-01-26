import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

const initialState = {
    currentStep: 1,
    identity: {
        name: '',
        surname: '',
        zodiac: ''
    },
    professional: {
        department: '',
        role: ''
    }
};

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            ...initialState,

            nextStep: () => set((state) => ({
                currentStep: Math.min(state.currentStep + 1, 3)
            })),

            previousStep: () => set((state) => ({
                currentStep: Math.max(state.currentStep - 1, 1)
            })),

            goToStep: (step: number) => set(() => ({
                currentStep: Math.min(Math.max(step, 1), 3)
            })),

            setIdentity: (data) => set((state) => ({
                identity: { ...state.identity, ...data }
            })),

            setProfessional: (data) => set((state) => ({
                professional: { ...state.professional, ...data }
            })),

            hasUnsavedChanges: () => {
                const state = get();
                return Boolean(
                    state.identity.name ||
                    state.identity.surname ||
                    state.identity.zodiac ||
                    state.professional.department ||
                    state.professional.role
                );
            },

            reset: () => set(initialState)
        }),
        {
            name: 'onboarding-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
