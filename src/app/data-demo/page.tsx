'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUsers, usePosts } from '@/hooks/useDataQueries';
import { OfflineAlert } from '@/components/OfflineAlert';
import { RefetchButton } from '@/components/RefetchButton';
import { UserCard } from '@/components/UserCard';
import { PostCard } from '@/components/PostCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Users, FileText, Database, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DataDemoPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');

    const {
        data: users,
        isLoading: usersLoading,
        error: usersError,
        refetch: refetchUsers,
        isFetching: usersFetching,
        dataUpdatedAt: usersUpdatedAt,
    } = useUsers();

    const {
        data: posts,
        isLoading: postsLoading,
        error: postsError,
        refetch: refetchPosts,
        isFetching: postsFetching,
        dataUpdatedAt: postsUpdatedAt,
    } = usePosts();

    const handleRefetch = () => {
        if (activeTab === 'users') {
            refetchUsers();
        } else {
            refetchPosts();
        }
    };

    const isLoading = activeTab === 'users' ? usersLoading : postsLoading;
    const isFetching = activeTab === 'users' ? usersFetching : postsFetching;
    const error = activeTab === 'users' ? usersError : postsError;
    const dataUpdatedAt = activeTab === 'users' ? usersUpdatedAt : postsUpdatedAt;

    const lastUpdated = dataUpdatedAt
        ? new Date(dataUpdatedAt).toLocaleTimeString()
        : 'Never';

    return (
        <div className="min-h-screen bg-background">
            <OfflineAlert />

            <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-6">
                    <div className="mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Data Fetching Demo</h1>
                            <p className="text-muted-foreground mt-1">
                                React Query with JSONPlaceholder API
                            </p>
                        </div>
                        <RefetchButton
                            onRefetch={handleRefetch}
                            isRefetching={isFetching && !isLoading}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>

            <div className="border-b bg-muted/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                                <p className="text-xl font-bold">{users?.length.toLocaleString() || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Posts</p>
                                <p className="text-xl font-bold">{posts?.length.toLocaleString() || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Database className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Cache Status</p>
                                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                    Active (5min)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Last Updated</p>
                                <p className="text-sm font-semibold">{lastUpdated}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b">
                <div className="container mx-auto px-4">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'users'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Users ({users?.length.toLocaleString() || 0})
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'posts'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Posts ({posts?.length.toLocaleString() || 0})
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {error && !isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 mb-4">
                            <svg
                                className="h-8 w-8 text-destructive"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Failed to load data</h3>
                        <p className="text-muted-foreground mb-4">
                            {error instanceof Error ? error.message : 'An error occurred'}
                        </p>
                        <RefetchButton
                            onRefetch={handleRefetch}
                            isRefetching={isFetching}
                            disabled={false}
                        />
                    </div>
                )}

                {activeTab === 'users' && users && !isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                )}

                {activeTab === 'posts' && posts && !isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t bg-muted/30 mt-12">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p>
                            Powered by{' '}
                            <a
                                href="https://tanstack.com/query"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                TanStack Query (React Query)
                            </a>
                            {' & '}
                            <a
                                href="https://jsonplaceholder.typicode.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                JSONPlaceholder
                            </a>
                        </p>
                        <div className="flex items-center gap-4">
                            <span>🚀 staleTime: 5min</span>
                            <span>💾 gcTime: 10min</span>
                            <span>✨ Zodiac Mapping Enabled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
