import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  // Veritabanı URL'sini alıyoruz
  const connectionString = process.env.DATABASE_URL;
  
  // PostgreSQL havuzunu oluşturuyoruz
  const pool = new Pool({ connectionString });
  
  // Prisma'nın istediği yeni adaptörü tanımlıyoruz
  const adapter = new PrismaPg(pool);
  
  // PrismaClient'ı bu adaptör ile başlatıyoruz
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;