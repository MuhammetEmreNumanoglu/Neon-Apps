import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';

export default function AnnouncementLoading() {
    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back Link Skeleton */}
                <Skeleton className="h-5 w-32" />

                {/* Announcement Card Skeleton */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Meta Information Skeleton */}
                        <div className="flex flex-wrap gap-4">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-5 w-28" />
                        </div>

                        {/* Content Skeleton */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
