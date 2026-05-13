import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Role, PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password.util.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@loan.test" },
    update: {},
    create: {
      name: "System Admin",
      email: "admin@loan.test",
      password: await hashPassword("Admin123!"),
      role: Role.ADMIN,
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
