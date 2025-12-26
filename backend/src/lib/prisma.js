import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// Create a single shared Prisma Client instance for the app
const prisma = new PrismaClient();

export { PrismaClient, prisma };
