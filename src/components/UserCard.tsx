/**
 * UserCard Component
 * 
 * Kullanıcı bilgilerini kart formatında gösteren bileşen.
 * API'den gelen user verisini görsel bir şekilde sunar.
 * 
 * Özellikler:
 * - Kullanıcı adından otomatik initial (baş harf) oluşturma
 * - User ID'ye göre renk atama (tutarlı renkler)
 * - Email, telefon, şirket ve şehir bilgileri
 * - Zodiac sign badge (burç rozeti)
 * - Responsive tasarım
 * - Hover shadow efekti
 */
'use client';

import { UserWithZodiac } from '@/interface/api';
import { Mail, Phone, Briefcase, MapPin, Sparkles } from 'lucide-react';

//Component prop tanımları
interface UserCardProps {
    user: UserWithZodiac; // API'den gelen kullanıcı verisi (zodiac sign eklenmiş)
}

/**
 * UserCard component'i - Kullanıcı bilgilerini gösterir
 * @param user - Gösterilecek kullanıcı verisi
 * @returns Kullanıcı kartı JSX elementi
 */
export function UserCard({ user }: UserCardProps) {
    /**
     * Kullanıcı adından baş harfleri (initials) çıkarır
     * Örnek: "John Doe" -> "JD"
     */
    const initials = user.name
        .split(' ')           // Boşluklardan ayır
        .map((n) => n[0])     // Her kelimenin ilk harfini al
        .join('')             // Birleştir
        .toUpperCase()        // Büyük harfe çevir
        .slice(0, 2);         // Maksimum 2 harf

    /**
     * Avatar için renk paleti - 8 farklı renk seçeneği
     * Her kullanıcı ID'si için tutarlı bir renk atanır (user.id % 8)
     */
    const colors = [
        'bg-blue-500',    // Mavi
        'bg-purple-500',  // Mor
        'bg-pink-500',    // Pembe
        'bg-green-500',   // Yeşil
        'bg-yellow-500',  // Sarı
        'bg-indigo-500',  // İndigo
        'bg-red-500',     // Kırmızı
        'bg-teal-500',    // Turkuaz
    ];

    /**
     * User ID'sine göre renk seç
     * Modulo operatörü ile 0-7 arası index elde edilir
     * Aynı ID her zaman aynı rengi alır
     */
    const avatarColor = colors[user.id % colors.length];

    return (
        // Ana kart container - Hover'da shadow büyür
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300">

            {/* Üst bölüm - Avatar ve kullanıcı adı */}
            <div className="flex items-start gap-4">
                {/* Avatar - Dairesel, renkli, initial içerir */}
                <div className={`h-12 w-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold shrink-0`}>
                    {initials}
                </div>

                {/* Kullanıcı bilgileri - Ad ve username */}
                <div className="flex-1 min-w-0">
                    {/* Tam ad - Taşarsa kesik gösterir (truncate) */}
                    <h3 className="font-semibold text-lg truncate">{user.name}</h3>

                    {/* Username - @ ile başlar, taşarsa kesik gösterir */}
                    <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
                </div>
            </div>

            {/* İletişim ve iş bilgileri bölümü */}
            <div className="mt-4 space-y-2">

                {/* Email bilgisi - Mail ikonu + email adresi */}
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{user.email}</span>
                </div>

                {/* Telefon bilgisi - Telefon ikonu + numara */}
                <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{user.phone}</span>
                </div>

                {/* Şirket bilgisi - Çanta ikonu + şirket adı */}
                <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{user.company.name}</span>
                </div>

                {/* Şehir bilgisi - Konum ikonu + şehir */}
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{user.address.city}</span>
                </div>
            </div>

            {/* Burç (Zodiac) badge - Alt bölüm */}
            <div className="mt-4 flex items-center gap-2">
                {/* Pill şeklinde badge - Yıldız ikonu + burç adı */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Sparkles className="h-3.5 w-3.5" />
                    {user.zodiacSign}
                </div>
            </div>
        </div>
    );
}
