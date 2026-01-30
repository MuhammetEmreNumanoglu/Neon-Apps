import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME is required"),
    NEXT_PUBLIC_API_URL: z.string().url().optional(),
    DATABASE_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);