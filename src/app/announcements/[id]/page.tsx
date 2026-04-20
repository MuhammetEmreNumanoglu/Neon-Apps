import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchAnnouncementById } from '../../../lib/api';
import { Badge } from '../../../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { ArrowLeft, Calendar, User, AlertCircle } from 'lucide-react';

interface AnnouncementPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AnnouncementPageProps): Promise<Metadata> {
    const { id } = await params;
    const announcement = await fetchAnnouncementById(id);

    if (!announcement) {
        return {
            title: 'Announcement Not Found',
        };
    }

    return {
        title: `${announcement.title} - Announcements`,
        description: announcement.content,
        openGraph: {
            title: announcement.title,
            description: announcement.content,
            type: 'article',
            authors: [announcement.author],
            publishedTime: announcement.date.toISOString(),
        },
    };
}

export default async function AnnouncementDetailPage({ params }: AnnouncementPageProps) {
    const { id } = await params;
    const announcement = await fetchAnnouncementById(id);

    if (!announcement) {
        notFound();
    }

    const priorityColors = {
        low: 'secondary',
        medium: 'default',
        high: 'destructive',
    } as const;

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back to Feed Link */}
                <Link
                    href="/home"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Back to Feed
                </Link>

                {/* Announcement Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <CardTitle className="text-3xl">{announcement.title}</CardTitle>
                            <Badge variant={priorityColors[announcement.priority]}>
                                {announcement.priority}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="size-4" />
                                <span>{announcement.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="size-4" />
                                <span>{new Date(announcement.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertCircle className="size-4" />
                                <span>Priority: {announcement.priority}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">{announcement.content}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
