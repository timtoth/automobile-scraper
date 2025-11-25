import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

const DEFAULT_USER = {
  email: "admin@example.com",
  name: "Admin User",
  password: "ChangeMe123!",
  role: "ADMIN"
};

async function main() {
  console.log("Seeding default user…");

  const role = await prisma.role.upsert({
    where: { name: DEFAULT_USER.role },
    update: {},
    create: { name: DEFAULT_USER.role }
  });

  const passwordHash = await bcrypt.hash(DEFAULT_USER.password, 12);

  const user = await prisma.user.upsert({
    where: { email: DEFAULT_USER.email },
    update: {
      name: DEFAULT_USER.name,
      password: passwordHash,
      roleId: role.id
    },
    create: {
      email: DEFAULT_USER.email,
      name: DEFAULT_USER.name,
      password: passwordHash,
      roleId: role.id
    }
  });

  console.log("Seeded user:", {
    id: user.id,
    email: user.email,
    role: role.name
  });
  console.log("Temporary password:", DEFAULT_USER.password);
  console.log("Update it immediately in production!");
}

main()
  .catch(err => {
    console.error("Seeding failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

