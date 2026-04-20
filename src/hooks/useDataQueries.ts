import { useQuery } from '@tanstack/react-query';
import { fetchUsers, fetchPosts } from '@/lib/api';

const QUERY_CONFIG = {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
};

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        ...QUERY_CONFIG,
    });
}

export function usePosts() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        ...QUERY_CONFIG,
    });
}
