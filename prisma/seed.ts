import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const adminExists = await prisma.admin.findFirst();
  if (adminExists) {
    console.log('Admin user already exists!');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log(`Admin user created: ${admin.username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
