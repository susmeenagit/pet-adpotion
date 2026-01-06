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




