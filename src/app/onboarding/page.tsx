// OnboardingForm component'ini import ediyoruz
// '@/' prefix'i src/ klasörüne işaret eder (tsconfig.json'da tanımlı)
import { OnboardingForm } from '@/components/OnboardingForm';

// Onboarding sayfası component'i
// Bu sayfa, yeni kullanıcıların bilgilerini toplamak için multi-step form gösterir
// Gerçek form mantığı OnboardingForm component'inde bulunur
export default function OnboardingPage() {
    // Bu sayfa sadece bir wrapper görevi görür
    // Tüm onboarding mantığı OnboardingForm component'inde yönetilir
    // Bu approach, component'i başka yerlerde de kullanabilmemizi sağlar
    return <OnboardingForm />;
}
