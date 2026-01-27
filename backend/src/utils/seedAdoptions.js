import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export const seedUsersAndAdoptions = async () => {
  try {
    // Check if users already exist
    const userCount = await prisma.user.count();
    if (userCount > 1) {
      console.log('Users and adoptions already seeded');
      return;
    }

    // Create multiple regular users with realistic data
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

    console.log(`Created ${createdUsers.count} users`);

    // Fetch all pets to create adoptions
    const pets = await prisma.pet.findMany();
    const allUsers = await prisma.user.findMany();
    const regularUsers = allUsers.filter(u => !u.isAdmin);

    // Create adoption records with various statuses
    const adoptions = [
      // Approved adoptions
      {
        petId: pets[0]?.id || 1,
        applicantName: 'John Smith',
        applicantEmail: 'john.smith@email.com',
        phone: '555-0101',
        address: '123 Oak Street, Springfield, IL 62701',
        reason: 'We have a large backyard and love playing fetch with dogs. This is our first pet.',
        status: 'approved',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      },
      {
        petId: pets[1]?.id || 2,
        applicantName: 'Sarah Johnson',
        applicantEmail: 'sarah.johnson@email.com',
        phone: '555-0102',
        address: '456 Maple Avenue, Chicago, IL 60601',
        reason: 'I work from home and would love a companion cat. I have experience with cats.',
        status: 'approved',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      },
      {
        petId: pets[2]?.id || 3,
        applicantName: 'Michael Brown',
        applicantEmail: 'michael.brown@email.com',
        phone: '555-0103',
        address: '789 Birch Road, Evanston, IL 60201',
        reason: 'My children want a pet rabbit to teach them responsibility.',
        status: 'approved',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      },

      // Rejected adoptions
      {
        petId: pets[3]?.id || 4,
        applicantName: 'Emily Davis',
        applicantEmail: 'emily.davis@email.com',
        phone: '555-0104',
        address: '321 Cedar Lane, Oakville, IL 62701',
        reason: 'Looking for a friendly dog for our family.',
        status: 'rejected',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      },
      {
        petId: pets[4]?.id || 5,
        applicantName: 'David Wilson',
        applicantEmail: 'david.wilson@email.com',
        phone: '555-0105',
        address: '654 Pine Street, Aurora, IL 60505',
        reason: 'Want a kitten but live in an apartment.',
        status: 'rejected',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      },

      // Pending adoptions
      {
        petId: pets[5]?.id || 6,
        applicantName: 'Jessica Martinez',
        applicantEmail: 'jessica.martinez@email.com',
        phone: '555-0106',
        address: '987 Elm Boulevard, Naperville, IL 60540',
        reason: 'We have a rabbit hutch ready and have done extensive research.',
        status: 'pending',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      {
        petId: pets[0]?.id || 1,
        applicantName: 'Robert Garcia',
        applicantEmail: 'robert.garcia@email.com',
        phone: '555-0107',
        address: '147 Poplar Court, Joliet, IL 60432',
        reason: 'Experienced dog owner looking for another companion.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        petId: pets[1]?.id || 2,
        applicantName: 'Lisa Anderson',
        applicantEmail: 'lisa.anderson@email.com',
        phone: '555-0108',
        address: '258 Ash Street, Rockford, IL 61101',
        reason: 'Retired and looking for a quiet companion to keep me company.',
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
    ];

    // Create adoptions with proper timestamps
    const adoptionData = adoptions.map(adoption => ({
      ...adoption,
      createdAt: adoption.createdAt,
      updatedAt: adoption.createdAt,
    }));

    await prisma.adoption.createMany({
      data: adoptionData,
      skipDuplicates: true,
    });

    console.log(`Created ${adoptionData.length} adoption records`);

    // Create quiz responses with various statuses
    const quizzes = await prisma.quiz.findMany();

    if (quizzes.length === 0) {
      // Create a default quiz if none exists
      const quiz = await prisma.quiz.create({
        data: {
          title: 'Pet Adoption Suitability Quiz',
          description: 'Test your knowledge and suitability for pet adoption',
          isActive: true,
          questions: {
            create: [
              {
                question: 'How many hours per day can you spend with your pet?',
                order: 1,
                options: {
                  create: [
                    { optionText: '0-2 hours', order: 1, isCorrect: false },
                    { optionText: '2-4 hours', order: 2, isCorrect: true },
                    { optionText: '4+ hours', order: 3, isCorrect: true },
                  ],
                },
              },
              {
                question: 'Do you have experience caring for pets?',
                order: 2,
                options: {
                  create: [
                    { optionText: 'No experience', order: 1, isCorrect: false },
                    { optionText: 'Some experience', order: 2, isCorrect: true },
                    { optionText: 'Extensive experience', order: 3, isCorrect: true },
                  ],
                },
              },
            ],
          },
        },
      });

      console.log('Created default quiz');

      // Create quiz responses for this quiz
      const quizResponses = [
        {
          userId: regularUsers[0]?.id || 2,
          quizId: quiz.id,
          status: 'completed',
          score: 100,
          totalQuestions: 2,
          createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
        },
        {
          userId: regularUsers[1]?.id || 3,
          quizId: quiz.id,
          status: 'verified',
          score: 85,
          totalQuestions: 2,
          createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
        },
        {
          userId: regularUsers[2]?.id || 4,
          quizId: quiz.id,
          status: 'rejected',
          score: 40,
          totalQuestions: 2,
          createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        },
        {
          userId: regularUsers[3]?.id || 5,
          quizId: quiz.id,
          status: 'pending',
          score: null,
          totalQuestions: 2,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      ];

      await prisma.quizResponse.createMany({
        data: quizResponses.map(qr => ({
          ...qr,
          createdAt: qr.createdAt,
          updatedAt: qr.createdAt,
        })),
        skipDuplicates: true,
      });

      console.log(`Created ${quizResponses.length} quiz responses`);
    }

    console.log('Users and adoptions seeded successfully');
  } catch (error) {
    console.error('Error seeding users and adoptions:', error);
  }
};
