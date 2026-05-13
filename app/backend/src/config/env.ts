import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("1d"),
  CLIENT_ORIGIN: z.string().url().default("https://loan-management-system-backend-beta.vercel.app"),
});

export const env = envSchema.parse(process.env);
