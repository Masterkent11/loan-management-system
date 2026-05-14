import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("1d"),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
});

const fallbackEnv = {
  DATABASE_URL: "postgresql://invalid:invalid@localhost:5432/invalid",
  PORT: 4000,
  JWT_SECRET: "invalid-runtime-secret-change-me",
  JWT_EXPIRES_IN: "1d",
  CLIENT_ORIGIN: "http://localhost:5173",
};

const parsedEnv = envSchema.safeParse(process.env);

export const envValidationErrors = parsedEnv.success
  ? []
  : parsedEnv.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

if (!parsedEnv.success) {
  console.error("Invalid server environment configuration", envValidationErrors);
}

export const env = parsedEnv.success ? parsedEnv.data : fallbackEnv;
