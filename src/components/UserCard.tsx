'use client';

import { UserWithZodiac } from '@/types/api';
import { Mail, Phone, Briefcase, MapPin, Sparkles } from 'lucide-react';

interface UserCardProps {
    user: UserWithZodiac;
}

export function UserCard({ user }: UserCardProps) {
    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const colors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-indigo-500',
        'bg-red-500',
        'bg-teal-500',
    ];
    const avatarColor = colors[user.id % colors.length];

    return (
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold shrink-0`}>
                    {initials}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{user.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{user.company.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{user.address.city}</span>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Sparkles className="h-3.5 w-3.5" />
                    {user.zodiacSign}
                </div>
            </div>
        </div>
    );
}
