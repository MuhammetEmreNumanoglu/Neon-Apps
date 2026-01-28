/**
 * StaffCard Component
 * 
 * Personel bilgilerini kart formatında gösteren bileşen.
 * Türk kullanıcılar için özelleştirilmiş (burç bilgisi Türkçe).
 * 
 * Özellikler:
 * - İsim, departman ve burç bilgileri
 * - Departmana göre özel renkli badge'ler
 * - Neon renk paleti (company branding)
 * - Hover shadow efekti
 */
import { StaffMember } from '../interface/staff';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

// Component prop tanımları
interface StaffCardProps {
  member: StaffMember; // Personel verisi (isim, departman, burç)
}

/**
 * StaffCard component'i - Personel kartları
 * @param member - Gösterilecek personel bilgisi
 * @returns Personel kartı JSX elementi
 */
export const StaffCard: React.FC<StaffCardProps> = ({ member }) => {
  // Destructuring ile verileri çıkar
  const { name, dept, zodiac } = member;

  /**
   * Departmana göre badge renk seçici fonksiyonu
   * Her departman için özel neon renk ataması
   * @param dept - Departman adı
   * @returns Tailwind CSS class string (renk ve text)
   */
  const getDeptColor = (dept: string) => {
    switch (dept) {
      // Full Stack grupları - Neon yeşil
      case 'Full Stack':
      case 'Full Stack Team Leader':
        return 'bg-neon-green text-white';

      // Flutter - Neon mavi
      case 'Flutter':
        return 'bg-neon-blue text-white';

      // Tasarım/UI grupları - Neon pembe
      case 'Tasarım':
      case 'UI Design':
        return 'bg-neon-pink text-white';

      // Özel kategori - Neon sarı (siyah text ile)
      case 'Neon Appsin Medarı İftiharı':
        return 'bg-neon-yellow text-black';

      // Diğer departmanlar - Gri (default)
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    // Ana kart - Ortalanmış, maksimum genişlik, hover efekti
    <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">

      {/* Kart başlığı - İsim ve departman badge */}
      <CardHeader className="pb-3">
        {/* İsim - Ortalanmış */}
        <CardTitle className="text-lg font-semibold text-center">{name}</CardTitle>

        {/* Departman badge - Ortalanmış */}
        <div className="flex justify-center">
          {/* Departmana göre renkli badge */}
          <Badge className={`${getDeptColor(dept)} font-medium`}>
            {dept}
          </Badge>
        </div>
      </CardHeader>

      {/* Kart içeriği - Burç bilgisi */}
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Burç bölümü - Ortalanmış */}
          <div className="text-center">
            {/* Burç etiketi (Türkçe) */}
            <p className="text-sm text-muted-foreground">Burç</p>

            {/* Burç değeri - Neon mor renk */}
            <p className="font-medium text-neon-purple">{zodiac}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};