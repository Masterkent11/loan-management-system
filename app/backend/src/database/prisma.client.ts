import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "../config/env.js";
import { normalizeDatabaseUrl } from "../utils/database-url.util.js";

const adapter = new PrismaPg({
  connectionString: normalizeDatabaseUrl(env.DATABASE_URL),
});

export const prisma = new PrismaClient({ adapter });
