import { prisma } from '../lib/prisma.js';

// Get all pets with optional filters
export const getPets = async (req, res) => {
  try {
    const { species, breed, age, height, color, search } = req.query;
    const where = {};

    if (species) where.species = species;
    if (breed) where.breed = { contains: breed, mode: 'insensitive' };
    if (color) where.color = { contains: color, mode: 'insensitive' };
    if (age) where.age = { lte: parseInt(age) };
    if (height) where.height = { lte: parseFloat(height) };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { breed: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const pets = await prisma.pet.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ pets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single pet by ID
export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await prisma.pet.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json({ pet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get featured pets (for homepage)
export const getFeaturedPets = async (req, res) => {
  try {
    const pets = await prisma.pet.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ pets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ============= ADMIN ROUTES =============

// Create new pet (admin only)
export const createPet = async (req, res) => {
  try {
    const { name, species, breed, age, ageUnit, gender, height, heightUnit, color, description, image, vaccinationStatus, vaccinations } = req.body;

    if (!name || !species || !breed) {
      return res.status(400).json({ error: 'Name, species, and breed are required' });
    }

    if (!['Dog', 'Cat', 'Rabbit'].includes(species)) {
      return res.status(400).json({ error: 'Species must be Dog, Cat, or Rabbit' });
    }

    const pet = await prisma.pet.create({
      data: {
        name,
        species,
        breed,
        age: age || 0,
        ageUnit: ageUnit || 'months',
        gender: gender || 'Unknown',
        height: height || 0,
        heightUnit: heightUnit || 'cm',
        color,
        description,
        image,
        vaccinationStatus: vaccinationStatus || 'Upcoming',
        vaccinations: vaccinations || [],
      },
    });

    res.status(201).json({ message: 'Pet created successfully', pet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update pet (admin only)
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, species, breed, age, ageUnit, gender, height, heightUnit, color, description, image, vaccinationStatus, vaccinations } = req.body;

    if (species && !['Dog', 'Cat', 'Rabbit'].includes(species)) {
      return res.status(400).json({ error: 'Species must be Dog, Cat, or Rabbit' });
    }

    const pet = await prisma.pet.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(species && { species }),
        ...(breed && { breed }),
        ...(age !== undefined && { age: parseInt(age) }),
        ...(ageUnit && { ageUnit }),
        ...(gender && { gender }),
        ...(height !== undefined && { height: parseFloat(height) }),
        ...(heightUnit && { heightUnit }),
        ...(color && { color }),
        ...(description && { description }),
        ...(image && { image }),
        ...(vaccinationStatus && { vaccinationStatus }),
        ...(vaccinations && { vaccinations }),
      },
    });

    res.json({ message: 'Pet updated successfully', pet });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete pet (admin only)
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.pet.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};





