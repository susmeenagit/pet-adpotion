import { prisma } from '../lib/prisma.js';
import { response } from '../utils/response.js';
import { validators } from '../utils/validators.js';
import { logger } from '../utils/logger.js';
import { getImageUrl, deleteImageFile } from '../middleware/uploadMiddleware.js';

/**
 * Get all pets with filters
 */
export const getAllPets = async (req, res) => {
  try {
    const { species, breed, search, page = 1, limit = 10 } = req.query;
    
    const where = {};
    
    if (species) where.species = species;
    if (breed) where.breed = { contains: breed, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { breed: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const pets = await prisma.pet.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.pet.count({ where });

    // Add complete image URLs
    const petsWithUrls = pets.map(pet => ({
      ...pet,
      image: pet.image ? getImageUrl(pet.image) : null,
    }));

    return response.success(res, {
      pets: petsWithUrls,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    }, 'Pets retrieved');
  } catch (error) {
    logger.error('Get all pets error:', error.message);
    return response.error(res, 'Failed to retrieve pets', 500);
  }
};

/**
 * Get pet by ID
 */
export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await prisma.pet.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pet) {
      return response.notFound(res, 'Pet not found');
    }

    // Add complete image URL
    if (pet.image) {
      pet.image = getImageUrl(pet.image);
    }

    return response.success(res, { pet }, 'Pet retrieved');
  } catch (error) {
    logger.error('Get pet by ID error:', error.message);
    return response.error(res, 'Failed to retrieve pet', 500);
  }
};

/**
 * Get featured pets (homepage)
 */
export const getFeaturedPets = async (req, res) => {
  try {
    const pets = await prisma.pet.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    });

    // Add complete image URLs
    const petsWithUrls = pets.map(pet => ({
      ...pet,
      image: pet.image ? getImageUrl(pet.image) : null,
    }));

    return response.success(res, { pets: petsWithUrls }, 'Featured pets retrieved');
  } catch (error) {
    logger.error('Get featured pets error:', error.message);
    return response.error(res, 'Failed to retrieve featured pets', 500);
  }
};

// ============= ADMIN ENDPOINTS =============

/**
 * Create new pet (admin only)
 */
export const createPet = async (req, res) => {
  try {
    const { name, species, breed, age, ageUnit, gender, height, heightUnit, color, description, vaccinationStatus, vaccinations } = req.body;

    // Validate pet data
    const validation = validators.validatePetData({ name, species, breed, age });
    if (!validation.valid) {
      if (req.file) deleteImageFile(req.file.filename);
      return response.badRequest(res, 'Validation error: ' + Object.values(validation.errors).join(', '));
    }

    // Handle image
    let imageFilename = '';
    if (req.file) {
      imageFilename = req.file.filename;
    }

    const pet = await prisma.pet.create({
      data: {
        name,
        species,
        breed,
        age: age ? parseInt(age) : 0,
        ageUnit: ageUnit || 'months',
        gender: gender || 'Unknown',
        height: height ? parseFloat(height) : 0,
        heightUnit: heightUnit || 'cm',
        color: color || '',
        description: description || '',
        image: imageFilename,
        vaccinationStatus: vaccinationStatus || 'Upcoming',
        vaccinations: vaccinations ? JSON.parse(vaccinations) : [],
      },
    });

    // Return pet with complete image URL
    const petWithUrl = {
      ...pet,
      image: pet.image ? getImageUrl(pet.image) : null,
    };

    logger.info(`Pet created: ${pet.name} (${species})`);

    return response.created(res, { pet: petWithUrl }, 'Pet created successfully');
  } catch (error) {
    if (req.file) deleteImageFile(req.file.filename);
    logger.error('Create pet error:', error.message);
    return response.error(res, 'Failed to create pet', 500);
  }
};

/**
 * Update pet (admin only)
 */
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, species, breed, age, ageUnit, gender, height, heightUnit, color, description, vaccinationStatus, vaccinations } = req.body;

    // Validate species if provided
    if (species && !validators.isValidSpecies(species)) {
      if (req.file) deleteImageFile(req.file.filename);
      return response.badRequest(res, 'Species must be Dog, Cat, or Rabbit');
    }

    // Fetch existing pet
    const existingPet = await prisma.pet.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPet) {
      if (req.file) deleteImageFile(req.file.filename);
      return response.notFound(res, 'Pet not found');
    }

    // Handle image replacement
    let imageFilename = existingPet.image;
    if (req.file) {
      imageFilename = req.file.filename;
      // Delete old image
      if (existingPet.image && !existingPet.image.startsWith('http')) {
        deleteImageFile(existingPet.image);
      }
    }

    const updateData = {
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
      ...(imageFilename && { image: imageFilename }),
      ...(vaccinationStatus && { vaccinationStatus }),
      ...(vaccinations && { vaccinations: JSON.parse(vaccinations) }),
    };

    const pet = await prisma.pet.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    // Return pet with complete image URL
    const petWithUrl = {
      ...pet,
      image: pet.image ? getImageUrl(pet.image) : null,
    };

    logger.info(`Pet updated: ${pet.name} (ID: ${id})`);

    return response.success(res, { pet: petWithUrl }, 'Pet updated successfully');
  } catch (error) {
    if (req.file) deleteImageFile(req.file.filename);
    if (error.code === 'P2025') {
      return response.notFound(res, 'Pet not found');
    }
    logger.error('Update pet error:', error.message);
    return response.error(res, 'Failed to update pet', 500);
  }
};

/**
 * Delete pet (admin only)
 */
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await prisma.pet.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pet) {
      return response.notFound(res, 'Pet not found');
    }

    // Delete image file if exists
    if (pet.image && !pet.image.startsWith('http')) {
      deleteImageFile(pet.image);
    }

    await prisma.pet.delete({
      where: { id: parseInt(id) },
    });

    logger.info(`Pet deleted: ${pet.name} (ID: ${id})`);

    return response.success(res, null, 'Pet deleted successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Pet not found');
    }
    logger.error('Delete pet error:', error.message);
    return response.error(res, 'Failed to delete pet', 500);
  }
};






