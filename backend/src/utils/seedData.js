import { prisma } from '../lib/prisma.js';

// Vaccination schedules for different species
const getVaccinations = (species, ageInMonths) => {
  const vaccinations = [];

  if (species === 'Dog') {
    if (ageInMonths >= 0) {
      vaccinations.push({
        age: '6-8 weeks',
        vaccineType: 'DHPP',
        diseasesCovered: 'Distemper, Hepatitis, Parvovirus, Parainfluenza',
        status: ageInMonths >= 2 ? 'Completed' : ageInMonths >= 1.5 ? 'Upcoming' : 'Overdue',
      });
    }
    if (ageInMonths >= 2) {
      vaccinations.push({
        age: '10-12 weeks',
        vaccineType: 'DHPP + Rabies',
        diseasesCovered: 'Distemper, Hepatitis, Parvovirus, Parainfluenza, Rabies',
        status: ageInMonths >= 3 ? 'Completed' : ageInMonths >= 2.5 ? 'Upcoming' : 'Overdue',
      });
    }
    if (ageInMonths >= 3) {
      vaccinations.push({
        age: '14-16 weeks',
        vaccineType: 'DHPP',
        diseasesCovered: 'Distemper, Hepatitis, Parvovirus, Parainfluenza',
        status: ageInMonths >= 4 ? 'Completed' : ageInMonths >= 3.5 ? 'Upcoming' : 'Overdue',
      });
    }
    if (ageInMonths >= 12) {
      vaccinations.push({
        age: '1 year',
        vaccineType: 'DHPP + Rabies Booster',
        diseasesCovered: 'Distemper, Hepatitis, Parvovirus, Parainfluenza, Rabies',
        status: ageInMonths >= 13 ? 'Completed' : 'Upcoming',
      });
    }
  } else if (species === 'Cat') {
    if (ageInMonths >= 0) {
      vaccinations.push({
        age: '6-8 weeks',
        vaccineType: 'FVRCP',
        diseasesCovered: 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia',
        status: ageInMonths >= 2 ? 'Completed' : ageInMonths >= 1.5 ? 'Upcoming' : 'Overdue',
      });
    }
    if (ageInMonths >= 2) {
      vaccinations.push({
        age: '10-12 weeks',
        vaccineType: 'FVRCP + Rabies',
        diseasesCovered: 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia, Rabies',
        status: ageInMonths >= 3 ? 'Completed' : ageInMonths >= 2.5 ? 'Upcoming' : 'Overdue',
      });
    }
    if (ageInMonths >= 3) {
      vaccinations.push({
        age: '14-16 weeks',
        vaccineType: 'FVRCP',
        diseasesCovered: 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia',
        status: ageInMonths >= 4 ? 'Completed' : ageInMonths >= 3.5 ? 'Upcoming' : 'Overdue',
      });
    }
    if (ageInMonths >= 12) {
      vaccinations.push({
        age: '1 year',
        vaccineType: 'FVRCP + Rabies Booster',
        diseasesCovered: 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia, Rabies',
        status: ageInMonths >= 13 ? 'Completed' : 'Upcoming',
      });
    }
  } else if (species === 'Rabbit') {
    if (ageInMonths >= 0) {
      vaccinations.push({
        age: '5-7 weeks',
        vaccineType: 'Myxomatosis',
        diseasesCovered: 'Myxomatosis',
        status: ageInMonths >= 2 ? 'Completed' : ageInMonths >= 1.5 ? 'Upcoming' : 'Overdue',
      });
    }
    if (ageInMonths >= 2) {
      vaccinations.push({
        age: '10-12 weeks',
        vaccineType: 'RHD (Rabbit Hemorrhagic Disease)',
        diseasesCovered: 'Rabbit Hemorrhagic Disease',
        status: ageInMonths >= 3 ? 'Completed' : ageInMonths >= 2.5 ? 'Upcoming' : 'Overdue',
      });
    }
    if (ageInMonths >= 6) {
      vaccinations.push({
        age: '6 months',
        vaccineType: 'Combined Myxomatosis + RHD',
        diseasesCovered: 'Myxomatosis, Rabbit Hemorrhagic Disease',
        status: ageInMonths >= 7 ? 'Completed' : 'Upcoming',
      });
    }
  }

  return vaccinations;
};

export const seedPets = async () => {
  try {
    const count = await prisma.pet.count();
    if (count > 0) {
      console.log('Pets already seeded');
      return;
    }

    const pets = [
      {
        name: 'Max',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 24,
        ageUnit: 'months',
        gender: 'Male',
        height: 60,
        heightUnit: 'cm',
        color: 'Golden',
        description: 'Friendly and energetic Golden Retriever who loves playing fetch.',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
      {
        name: 'Luna',
        species: 'Cat',
        breed: 'Persian',
        age: 12,
        ageUnit: 'months',
        gender: 'Female',
        height: 25,
        heightUnit: 'cm',
        color: 'White',
        description: 'Gentle and affectionate Persian cat. Perfect for a quiet home.',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
      {
        name: 'Bunny',
        species: 'Rabbit',
        breed: 'Holland Lop',
        age: 6,
        ageUnit: 'months',
        gender: 'Female',
        height: 20,
        heightUnit: 'cm',
        color: 'Brown',
        description: 'Playful and curious Holland Lop rabbit. Great for families.',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
        vaccinationStatus: 'Upcoming',
      },
      {
        name: 'Buddy',
        species: 'Dog',
        breed: 'Labrador',
        age: 36,
        ageUnit: 'months',
        gender: 'Male',
        height: 55,
        heightUnit: 'cm',
        color: 'Black',
        description: 'Loyal and playful Labrador. Excellent with families.',
        image: 'https://images.unsplash.com/photo-1534361960057-19889dbdf1bb?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
      {
        name: 'Whiskers',
        species: 'Cat',
        breed: 'Siamese',
        age: 6,
        ageUnit: 'months',
        gender: 'Male',
        height: 23,
        heightUnit: 'cm',
        color: 'Cream',
        description: 'Curious and playful Siamese kitten. Very social.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
        vaccinationStatus: 'Upcoming',
      },
      {
        name: 'Thumper',
        species: 'Rabbit',
        breed: 'Angora',
        age: 8,
        ageUnit: 'months',
        gender: 'Male',
        height: 22,
        heightUnit: 'cm',
        color: 'White',
        description: 'Fluffy Angora rabbit. Gentle and calm temperament.',
        image: 'https://images.unsplash.com/photo-1459262838948-3e416b11c5b6?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
    ];

    // Add vaccinations to each pet
    for (const pet of pets) {
      const ageInMonths = pet.ageUnit === 'years' ? pet.age * 12 : pet.age;
      pet.vaccinations = JSON.stringify(getVaccinations(pet.species, ageInMonths));
    }

    await prisma.pet.createMany({ data: pets });
    console.log('Pets seeded successfully');
  } catch (error) {
    console.error('Error seeding pets:', error);
  }
};

