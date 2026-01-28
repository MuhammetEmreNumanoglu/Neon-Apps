/**
 * API Logic
 * 
 * Axios instance ve API çağrı fonksiyonları.
 * Server-state mapping (Zodiac ekleme) burada yapılır.
 */
import axios from 'axios';

// Base URL ve varsayılan header'lar
const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Zodiac hesaplama veya rastgele atama
const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const getRandomZodiac = () => zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];

// User Interface
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: {
        name: string;
        bs: string;
    };
    // Eklenen alanlar
    zodiacSign?: string;
    department?: string; // İstatistik için mock departman
}

// Post Interface
export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

// Fetch Users with enhancement
export const fetchUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');

    // Veriyi zenginleştir (Server-State Mapping benzeri)
    const enriched = data.map(user => ({
        ...user,
        zodiacSign: getRandomZodiac(),
        // Mock departman verisi (Statistics sayfası için)
        department: ['Mobile', 'Frontend', 'Backend', 'Design', 'QA'][Math.floor(Math.random() * 5)]
    }));

    // JsonPlaceholder sadece 10 user döndürüyor.
    // Örnek için bu veriyi 1000+ kayda scale ediyoruz (ID'leri benzersiz olacak şekilde).
    const targetCount = 1000;
    const result: User[] = [];
    let idCounter = 1;

    while (result.length < targetCount) {
        for (const base of enriched) {
            if (result.length >= targetCount) break;
            result.push({
                ...base,
                id: idCounter++,
            });
        }
    }

    return result;
};

// Fetch Posts
export const fetchPosts = async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>('/posts'); // jsonplaceholder max 100 posts

    // Aynı şekilde posts verisini de 1000+ kayda scale ediyoruz.
    const targetCount = 1000;
    const result: Post[] = [];
    let idCounter = 1;

    while (result.length < targetCount) {
        for (const base of data) {
            if (result.length >= targetCount) break;
            result.push({
                ...base,
                id: idCounter++,
            });
        }
    }

    return result;
};

// Fetch Todos (Daha fazla veri için, 200 adet var)
export const fetchTodos = async () => {
    const { data } = await api.get('/todos');
    return data;
};

export default api;
