import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';
import { seedAdmin } from '../src/utils/seedAdmin.js';
import { seedPets } from '../src/utils/seedData.js';
import { seedUsersAndAdoptions } from '../src/utils/seedAdoptions.js';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    console.log('Clearing existing data...');
    
    // Clear in correct order (foreign key constraints)
    // Only clear models that actually exist in your schema
    try {
      await prisma.adoption.deleteMany();
    } catch (e) {
      console.log('⚠️  Adoption table not found or already empty');
    }

    try {
      await prisma.pet.deleteMany();
    } catch (e) {
      console.log('⚠️  Pet table not found or already empty');
    }

    try {
      await prisma.user.deleteMany();
    } catch (e) {
      console.log('⚠️  User table not found or already empty');
    }

    console.log('✅ Data cleared successfully');
    console.log('🌱 Creating seed data...');

    // Run seed functions
    await seedAdmin();
    await seedPets();
    await seedUsersAndAdoptions();

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Admin: admin@petadoption.com / Admin@123');
    console.log('   Users: Various accounts created with password Password@123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
