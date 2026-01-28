import axiosInstance from './axios';
import { getZodiacSignBySeed } from './zodiacSigns';
import { User, UserWithZodiac, Post } from '@/interface/api';

export async function fetchUsers(): Promise<UserWithZodiac[]> {
    const response = await axiosInstance.get<User[]>('/users');

    const usersWithZodiac: UserWithZodiac[] = response.data.map((user) => ({
        ...user,
        zodiacSign: getZodiacSignBySeed(user.id),
    }));

    return expandData(usersWithZodiac, 100);
}

export async function fetchPosts(): Promise<Post[]> {
    const response = await axiosInstance.get<Post[]>('/posts');

    return expandData(response.data, 11);
}

function expandData<T extends { id: number }>(data: T[], multiplier: number): T[] {
    const expanded: T[] = [];

    for (let i = 0; i < multiplier; i++) {
        const duplicated = data.map((item) => ({
            ...item,
            id: item.id + (i * data.length),
        }));
        expanded.push(...duplicated);
    }

    return expanded;
}
