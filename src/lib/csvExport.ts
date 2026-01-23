/**
 * ==========================================
 * CSV Export - Yeni Başlayanlar İçin
 * ==========================================
 * 
 * Bu dosya form verilerini CSV formatına çevirir ve indirir.
 * 
 * CSV Nedir?
 * - "Comma-Separated Values" (Virgülle Ayrılmış Değerler)
 * - Excel'de açılabilen basit bir dosya formatı
 * - Her satır bir veri, sütunlar virgülle ayrılır
 * 
 * 2 Ana Fonksiyon:
 * 1. convertToCSV() - Veriyi CSV formatına çevirir
 * 2. downloadCSV() - Tarayıcıda dosyayı indirir
 */

// CSV'ye dönüştürülecek veri formatı
export interface OnboardingData {
    name: string;
    surname: string;
    zodiac: string;
    department: string;
    role: string;
}

/**
 * convertToCSV - Veriyi CSV formatına çevir
 * @param data - Form verileri
 * @returns CSV formatında string
 * 
 * Örnek Girdi:
 * {
 *   name: 'John',
 *   surname: 'Doe',
 *   zodiac: 'Aries',
 *   department: 'Engineering',
 *   role: 'Software Engineer'
 * }
 * 
 * Örnek Çıktı:
 * "Field","Value"
 * "Name","John"
 * "Surname","Doe"
 * "Zodiac","Aries"
 * "Department","Engineering"
 * "Role","Software Engineer"
 * "Timestamp","2026-01-23T10:19:35.000Z"
 */
export function convertToCSV(data: OnboardingData): string {
    // Şu anki zamanı al (ISO formatında)
    const timestamp = new Date().toISOString();

    // CSV satırlarını oluştur
    // Her satır bir dizi: [alan adı, değer]
    const rows = [
        ['Field', 'Value'],              // Başlık satırı
        ['Name', data.name],              // İsim
        ['Surname', data.surname],        // Soyisim
        ['Zodiac', data.zodiac],          // Burç
        ['Department', data.department],  // Departman
        ['Role', data.role],              // Rol
        ['Timestamp', timestamp]          // Zaman damgası
    ];

    // Satırları CSV formatına çevir
    // 1. Her hücreyi tırnak içine al: "John"
    // 2. Hücreleri virgülle birleştir: "Name","John"
    // 3. Satırları yeni satırla birleştir
    return rows
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
}

/**
 * downloadCSV - CSV dosyasını tarayıcıda indir
 * @param data - Form verileri
 * @param filename - (Opsiyonel) Dosya adı. Verilmezse otomatik oluşturulur
 * 
 * Nasıl Çalışır:
 * 1. Veriyi CSV formatına çevir
 * 2. Blob (dosya objesi) oluştur
 * 3. Geçici URL oluştur
 * 4. Görünmez link oluştur
 * 5. Link'e otomatik tıkla → İndirme başlar!
 * 6. Temizlik yap
 */
export function downloadCSV(data: OnboardingData, filename?: string): void {
    // 1. Veriyi CSV formatına çevir
    const csv = convertToCSV(data);

    // 2. Blob (dosya objesi) oluştur
    // - Blob: Tarayıcıda dosya verisi tutan özel obje
    // - type: Dosya tipi (CSV)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // 3. Blob için geçici bir URL oluştur
    // Örnek: "blob:http://localhost:3000/abc-123"
    const url = URL.createObjectURL(blob);

    // 4. Görünmez bir <a> (link) elemanı oluştur
    const link = document.createElement('a');
    link.href = url;

    // 5. Dosya adını belirle
    // Eğer filename verilmişse onu kullan
    // Yoksa: "onboarding-1706004575000.csv" gibi bir isim oluştur
    link.download = filename || `onboarding-${Date.now()}.csv`;

    // 6. Link'i sayfaya ekle (görünmez)
    document.body.appendChild(link);

    // 7. Link'e otomatik tıkla → İndirme başlar!
    link.click();

    // 8. Temizlik: Link'i sayfadan kaldır
    document.body.removeChild(link);

    // 9. Temizlik: Blob URL'sini serbest bırak (bellek yönetimi)
    URL.revokeObjectURL(url);
}
