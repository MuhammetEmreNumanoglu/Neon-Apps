/**
 * PostCard Component
 * 
 * Bir blog yazısı veya post'u kart formatında gösteren bileşen.
 * 
 * Özellikler:
 * - Post başlığı ve içeriği gösterimi
 * - Dosya ikonu ile görsel vurgu
 * - Kullanıcı ID ve Post ID bilgileri
 * - Line clamp ile uzun metinleri sınırlama (başlık: 2 satır, içerik: 3 satır)
 * - Hover efekti ile shadow geçişi
 * - Responsive tasarım
 */
'use client';

import { Post } from '@/interface/api';
import { FileText, User } from 'lucide-react';

// Component prop tanımları
interface PostCardProps {
    post: Post; // API'den gelen post verisi
}

/**
 * PostCard component'i - Her bir blog yazısını kart formatında gösterir
 * @param post - Gösterilecek post verisi (başlık, içerik, userId, id içerir)
 * @returns Post kartı JSX elementi
 */
export function PostCard({ post }: PostCardProps) {
    return (
        // Ana kart container - hover'da shadow büyür
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300">

            {/* Başlık bölümü - İkon ve post başlığı */}
            <div className="flex items-start gap-3 mb-4">
                {/* Dosya ikonu - Dairesel arka plan içinde */}
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                </div>

                {/* Post başlığı - Maksimum 2 satır gösterir (line-clamp-2) */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                        {post.title}
                    </h3>
                </div>
            </div>

            {/* Post içeriği - Maksimum 3 satır gösterir (line-clamp-3) */}
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {post.body}
            </p>

            {/* Alt bilgi çubuğu - Kullanıcı ve post ID bilgileri */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t">
                <User className="h-3.5 w-3.5" />
                <span>User #{post.userId}</span>
                {/* Post ID sağ tarafa yaslanır */}
                <span className="ml-auto">Post #{post.id}</span>
            </div>
        </div>
    );
}
