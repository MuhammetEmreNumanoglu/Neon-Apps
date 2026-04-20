export const ZODIAC_SIGNS = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
] as const;

export type ZodiacSign = typeof ZODIAC_SIGNS[number];

export function getRandomZodiacSign(): ZodiacSign {
    const randomIndex = Math.floor(Math.random() * ZODIAC_SIGNS.length);
    return ZODIAC_SIGNS[randomIndex];
}

export function getZodiacSignBySeed(seed: number): ZodiacSign {
    const index = seed % ZODIAC_SIGNS.length;
    return ZODIAC_SIGNS[index];
}
