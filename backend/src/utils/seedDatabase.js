import { prisma } from '../lib/prisma.js';
import { seedPets } from './seedData.js';

// Run seed function
const runSeed = async () => {
  try {
    await seedPets();
    await prisma.$disconnect();
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();



