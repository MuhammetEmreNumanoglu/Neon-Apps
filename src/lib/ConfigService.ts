/**
 * Configuration Service
 * 
 * Centralized service for reading environment variables safely.
 * Provides type-safe access to configuration values with defaults.
 */

export class ConfigService {
    /**
     * Get API base URL from environment or use default
     */
    static getApiBaseUrl(): string {
        return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
    }

    /**
     * Get OpenAI API key (example for future use)
     */
    static getOpenAIKey(): string | undefined {
        return process.env.OPENAI_API_KEY;
    }

    /**
     * Check if running in development mode
     */
    static isDevelopment(): boolean {
        return process.env.NODE_ENV === 'development';
    }

    /**
     * Check if running in production mode
     */
    static isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }
}
