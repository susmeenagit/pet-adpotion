import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export const seedUsersAndAdoptions = async () => {
  try {
    // Check if users already exist
    const userCount = await prisma.user.count();
    if (userCount > 1) {
      console.log('✅ Users and adoptions already seeded');
      return;
    }

    // Create multiple regular users
    const users = [
      {
        email: 'john.smith@email.com',
        name: 'John Smith',
        password: await bcrypt.hash('Password@123', 10),
        isAdmin: false,
      },
      {
        email: 'sarah.johnson@email.com',
        name: 'Sarah Johnson',
        password: await bcrypt.hash('Password@123', 10),
        isAdmin: false,
      },
      {
        email: 'michael.brown@email.com',
        name: 'Michael Brown',
        password: await bcrypt.hash('Password@123', 10),
        isAdmin: false,
      },
      {
        email: 'emily.davis@email.com',
        name: 'Emily Davis',
        password: await bcrypt.hash('Password@123', 10),
        isAdmin: false,
      },
      {
        email: 'david.wilson@email.com',
        name: 'David Wilson',
        password: await bcrypt.hash('Password@123', 10),
        isAdmin: false,
      },
      {
        email: 'jessica.martinez@email.com',
        name: 'Jessica Martinez',
        password: await bcrypt.hash('Password@123', 10),
        isAdmin: false,
      },
      {
        email: 'robert.garcia@email.com',
        name: 'Robert Garcia',
        password: await bcrypt.hash('Password@123', 10),
        isAdmin: false,
      },
      {
        email: 'lisa.anderson@email.com',
        name: 'Lisa Anderson',
        password: await bcrypt.hash('Password@123', 10),
        isAdmin: false,
      },
    ];

    const createdUsers = await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });

    console.log(`✅ Created ${createdUsers.count} users`);

    // Fetch pets and create adoptions
    const pets = await prisma.pet.findMany();
    
    const adoptions = [
      {
        petId: pets[0]?.id,
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        phone: '555-0101',
        address: '123 Oak Street, Springfield, IL 62701',
        reason: 'We have a large backyard and love dogs.',
        status: 'approved',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
      {
        petId: pets[1]?.id,
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '555-0102',
        address: '456 Maple Avenue, Chicago, IL 60601',
        reason: 'I work from home and would love a companion cat. I have experience with cats.',
        status: 'approved',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      },
      {
        petId: pets[2]?.id,
        fullName: 'Michael Brown',
        email: 'michael.brown@email.com',
        phone: '555-0103',
        address: '789 Birch Road, Evanston, IL 60201',
        reason: 'My children want a pet rabbit to teach them responsibility.',
        status: 'approved',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        petId: pets[3]?.id,
        fullName: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '555-0104',
        address: '321 Cedar Lane, Oakville, IL 62701',
        reason: 'Looking for a friendly dog for our family.',
        status: 'rejected',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        petId: pets[4]?.id,
        fullName: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '555-0105',
        address: '654 Pine Street, Aurora, IL 60505',
        reason: 'Want a kitten but live in an apartment.',
        status: 'rejected',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        petId: pets[5]?.id,
        fullName: 'Jessica Martinez',
        email: 'jessica.martinez@email.com',
        phone: '555-0106',
        address: '987 Elm Boulevard, Naperville, IL 60540',
        reason: 'We have a rabbit hutch ready and have done extensive research.',
        status: 'pending',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        petId: pets[0]?.id,
        fullName: 'Robert Garcia',
        email: 'robert.garcia@email.com',
        phone: '555-0107',
        address: '147 Poplar Court, Joliet, IL 60432',
        reason: 'Experienced dog owner looking for another companion.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        petId: pets[1]?.id,
        fullName: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        phone: '555-0108',
        address: '258 Ash Street, Rockford, IL 61101',
        reason: 'Retired and looking for a quiet companion to keep me company.',
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ];

    await prisma.adoption.createMany({
      data: adoptions.filter(a => a.petId),
      skipDuplicates: true,
    });

    console.log(`✅ Created ${adoptions.length} adoption records`);
  } catch (error) {
    console.error('Error seeding users and adoptions:', error);
  }
};
