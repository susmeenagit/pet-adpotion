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
        description: 'Friendly and energetic Golden Retriever who loves playing fetch. Perfect family dog.',
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
        description: 'Loyal and playful Labrador. Excellent with families and children.',
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
        description: 'Curious and playful Siamese kitten. Very social and vocal.',
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
      {
        name: 'Charlie',
        species: 'Dog',
        breed: 'Beagle',
        age: 18,
        ageUnit: 'months',
        gender: 'Male',
        height: 35,
        heightUnit: 'cm',
        color: 'Brown & White',
        description: 'Energetic Beagle with a great nose for adventure. Needs active family.',
        image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
      {
        name: 'Mittens',
        species: 'Cat',
        breed: 'Tabby',
        age: 24,
        ageUnit: 'months',
        gender: 'Female',
        height: 24,
        heightUnit: 'cm',
        color: 'Orange Tabby',
        description: 'Sweet tabby cat with white paws. Loves cuddles and sunny spots.',
        image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
      {
        name: 'Pepper',
        species: 'Rabbit',
        breed: 'Dwarf Hotot',
        age: 4,
        ageUnit: 'months',
        gender: 'Female',
        height: 18,
        heightUnit: 'cm',
        color: 'Black',
        description: 'Tiny Dwarf Hotot with distinctive eye markings. Perfect apartment pet.',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
        vaccinationStatus: 'Upcoming',
      },
      {
        name: 'Rocky',
        species: 'Dog',
        breed: 'German Shepherd',
        age: 42,
        ageUnit: 'months',
        gender: 'Male',
        height: 65,
        heightUnit: 'cm',
        color: 'Black & Tan',
        description: 'Strong and intelligent German Shepherd. Trained for obedience.',
        image: 'https://images.unsplash.com/photo-1568393691622-d4f6d6f7f8e8?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
      {
        name: 'Smokey',
        species: 'Cat',
        breed: 'Russian Blue',
        age: 18,
        ageUnit: 'months',
        gender: 'Male',
        height: 26,
        heightUnit: 'cm',
        color: 'Blue-Gray',
        description: 'Elegant Russian Blue with striking green eyes. Calm and affectionate.',
        image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
      {
        name: 'Hop',
        species: 'Rabbit',
        breed: 'Lop-Eared',
        age: 10,
        ageUnit: 'months',
        gender: 'Male',
        height: 24,
        heightUnit: 'cm',
        color: 'Gray',
        description: 'Adorable lop-eared rabbit with soft fur. Loves timothy hay.',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
        vaccinationStatus: 'Completed',
      },
    ];

    // Add vaccinations to each pet
    for (const pet of pets) {
      const ageInMonths = pet.ageUnit === 'years' ? pet.age * 12 : pet.age;
      pet.vaccinations = JSON.stringify(getVaccinations(pet.species, ageInMonths));
    }

    await prisma.pet.createMany({ data: pets });
    console.log(`Seeded ${pets.length} pets successfully`);
  } catch (error) {
    console.error('Error seeding pets:', error);
  }
};

