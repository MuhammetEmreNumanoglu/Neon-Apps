'use client';

import { Post } from '@/types/api';
import { FileText, User } from 'lucide-react';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                        {post.title}
                    </h3>
                </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {post.body}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t">
                <User className="h-3.5 w-3.5" />
                <span>User #{post.userId}</span>
                <span className="ml-auto">Post #{post.id}</span>
            </div>
        </div>
    );
}
