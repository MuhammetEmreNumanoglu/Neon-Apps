export function SkeletonCard() {
    return (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-3">
                    <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                </div>
            </div>

            <div className="mt-4 space-y-3">
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            </div>

            <div className="mt-4">
                <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            </div>
        </div>
    );
}
