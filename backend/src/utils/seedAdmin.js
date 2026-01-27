import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@petadoption.com' },
    });

    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@petadoption.com',
        password: hashedPassword,
        name: 'Admin User',
        isAdmin: true,
      },
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@petadoption.com');
    console.log('Password: Admin@123');
    return admin;
  } catch (error) {
    console.error('Error seeding admin:', error);
    throw error;
  }
};
