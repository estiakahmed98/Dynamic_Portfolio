import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const password = "admin123"; // change later
  const name = "Admin";

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  console.log("🚀 Admin seeded successfully");
  console.log("📧 Email:", email);
  console.log("🔑 Password:", password);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
