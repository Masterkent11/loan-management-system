import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Prisma migrations.");
}

if (process.env.VERCEL && databaseUrl.includes("localhost")) {
  throw new Error(
    "Vercel DATABASE_URL must point to hosted PostgreSQL, such as Neon. Do not use localhost in production.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
