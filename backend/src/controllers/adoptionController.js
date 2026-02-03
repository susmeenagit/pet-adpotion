import { prisma } from '../lib/prisma.js';
import { response } from '../utils/response.js';
import { validators } from '../utils/validators.js';
import { logger } from '../utils/logger.js';
import { getImageUrl } from '../middleware/uploadMiddleware.js';

/**
 * Create adoption application
 */
export const createAdoptionApplication = async (req, res) => {
  try {
    const { petId, fullName, email, phone, address, reason } = req.body;
    const userId = req.user?.userId;

    // Validate input
    const validation = validators.validateAdoptionApplication({ fullName, email, phone, address, reason });
    if (!validation.valid) {
      return response.badRequest(res, 'Validation error: ' + Object.values(validation.errors).join(', '));
    }

    // Verify pet exists
    const pet = await prisma.pet.findUnique({
      where: { id: parseInt(petId) },
    });

    if (!pet) {
      return response.notFound(res, 'Pet not found');
    }

    // Create adoption record
    const adoption = await prisma.adoption.create({
      data: {
        petId: Number(petId),
        fullName,
        email,
        phone,
        address,
        reason,
        status: 'Pending',
      },
    });

    logger.info(`Adoption application created: ${fullName} for pet ${pet.name}`);

    return response.created(res, {
      adoption: {
        id: adoption.id,
        petId: adoption.petId,
        petName: pet.name,
        status: adoption.status,
        createdAt: adoption.createdAt,
      },
    }, 'Adoption application submitted successfully');
  } catch (error) {
    console.error('Create adoption error:', error);
    return response.error(res, error.message, 500);
  }
};

/**
 * Get all adoption applications (admin only)
 */
export const getAllAdoptions = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const where = {};
    if (status) where.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const adoptions = await prisma.adoption.findMany({
      where,
      include: {
        pet: {
          select: { name: true, species: true, breed: true },
        },
      },
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.adoption.count({ where });

    return response.success(res, {
      adoptions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    }, 'Adoptions retrieved');
  } catch (error) {
    logger.error('Get adoptions error:', error.message);
    return response.error(res, 'Failed to retrieve adoptions', 500);
  }
};

/**
 * Get adoption by ID (admin only)
 */
export const getAdoptionById = async (req, res) => {
  try {
    const { id } = req.params;

    const adoption = await prisma.adoption.findUnique({
      where: { id: parseInt(id) },
      include: {
        pet: true,
      },
    });

    if (!adoption) {
      return response.notFound(res, 'Adoption not found');
    }

    return response.success(res, { adoption }, 'Adoption retrieved');
  } catch (error) {
    logger.error('Get adoption by ID error:', error.message);
    return response.error(res, 'Failed to retrieve adoption', 500);
  }
};

/**
 * Update adoption status (admin only)
 */
export const updateAdoptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!validators.isValidAdoptionStatus(status)) {
      return response.badRequest(res, 'Status must be Pending, Approved, or Rejected');
    }

    const adoption = await prisma.adoption.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        pet: {
          select: { name: true },
        },
      },
    });

    logger.info(`Adoption status updated: ID ${id}, status: ${status}`);

    return response.success(res, { adoption }, 'Adoption status updated');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Adoption not found');
    }
    logger.error('Update adoption status error:', error.message);
    return response.error(res, 'Failed to update adoption', 500);
  }
};

/**
 * Delete adoption (admin only)
 */
export const deleteAdoption = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.adoption.delete({
      where: { id: parseInt(id) },
    });

    logger.info(`Adoption deleted: ID ${id}`);

    return response.success(res, null, 'Adoption deleted successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Adoption not found');
    }
    logger.error('Delete adoption error:', error.message);
    return response.error(res, 'Failed to delete adoption', 500);
  }
};

/**
 * Get user's own adoption applications
 */
export const getMyAdoptions = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user || !user.email) {
      return response.unauthorized(res, 'User email not found');
    }

    const adoptions = await prisma.adoption.findMany({
      where: {
        email: user.email,
      },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            species: true,
            breed: true,
            age: true,
            ageUnit: true,
            image: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format image URLs for pets
    const adoptionsWithFormattedImages = adoptions.map(adoption => ({
      ...adoption,
      pet: adoption.pet ? {
        ...adoption.pet,
        image: adoption.pet.image ? getImageUrl(adoption.pet.image) : null,
      } : null,
    }));

    return response.success(res, { adoptions: adoptionsWithFormattedImages }, 'User adoptions retrieved');
  } catch (error) {
    logger.error('Get my adoptions error:', error.message);
    return response.error(res, 'Failed to retrieve adoptions', 500);
  }
};






