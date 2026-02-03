import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';
import { response } from '../utils/response.js';
import { validators } from '../utils/validators.js';
import { logger } from '../utils/logger.js';

// Generate JWT token
const generateToken = (user) => {
  console.log("Generating token for user:", user);
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || 'your_secret_key_here',
    { expiresIn: '7d' }
  )
}

/**
 * Register a new user
 */
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    const validation = validators.validateRegistration({ email, password, name })
    if (!validation.valid) {
      return response.badRequest(
        res,
        'Validation error: ' + Object.values(validation.errors).join(', ')
      )
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return response.conflict(res, 'Email already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER',        // default role
        isAdmin: false,      // optional legacy field
      },
    })

    const token = generateToken(user)

    logger.info(`User registered: ${email}`)

    return response.created(
      res,
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
      'User registered successfully'
    )
  } catch (error) {
    logger.error('Registration error:', error.message)
    return response.error(res, 'Registration failed', 500)
  }
}

/**
 * Login user
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!validators.isRequired(email) || !validators.isRequired(password)) {
      return response.badRequest(res, 'Email and password are required')
    }

    if (!validators.isValidEmail(email)) {
      return response.badRequest(res, 'Invalid email format')
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return response.unauthorized(res, 'Invalid email or password')
    }

    console.log("User", user);

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return response.unauthorized(res, 'Invalid email or password')
    }

    const token = generateToken(user)

    logger.info(`User logged in: ${email}`)

    return response.success(
      res,
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
      'Login successful'
    )
  } catch (error) {
    logger.error('Login error:', error.message)
    return response.error(res, 'Login failed', 500)
  }
}

/**
 * Get current user info
 */
export const me = async (req, res) => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      return response.unauthorized(res, 'Not authenticated')
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return response.notFound(res, 'User not found')
    }

    return response.success(res, { user }, 'User retrieved')
  } catch (error) {
    logger.error('Get user error:', error.message)
    return response.error(res, 'Failed to retrieve user', 500)
  }
}

/**
 * Logout user (frontend clears token)
 */
export const logout = async (req, res) => {
  try {
    const userId = req.user?.userId;
    logger.info(`User logged out: ${userId}`);
    return response.success(res, null, 'Logged out successfully');
  } catch (error) {
    logger.error('Logout error:', error.message);
    return response.error(res, 'Logout failed', 500);
  }
};

// ============= ADMIN ENDPOINTS =============

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return response.success(res, { users }, 'Users retrieved');
  } catch (error) {
    logger.error('Get users error:', error.message);
    return response.error(res, 'Failed to retrieve users', 500);
  }
};

/**
 * Get user by ID (admin only)
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!user) {
      return response.notFound(res, 'User not found');
    }

    return response.success(res, { user }, 'User retrieved');
  } catch (error) {
    logger.error('Get user by ID error:', error.message);
    return response.error(res, 'Failed to retrieve user', 500);
  }
};

/**
 * Update user role (admin only)
 */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    // Prevent self-demotion
    if (req.user?.userId === parseInt(id) && !isAdmin) {
      return response.badRequest(res, 'Cannot remove your own admin status');
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isAdmin },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
      },
    });

    logger.info(`User role updated: ${user.email}, isAdmin: ${isAdmin}`);

    return response.success(res, { user }, 'User role updated');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'User not found');
    }
    logger.error('Update user role error:', error.message);
    return response.error(res, 'Failed to update user', 500);
  }
};

/**
 * Delete user (admin only)
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent self-deletion
    if (req.user?.userId === parseInt(id)) {
      return response.badRequest(res, 'Cannot delete your own account');
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    logger.info(`User deleted: ${id}`);

    return response.success(res, null, 'User deleted successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'User not found');
    }
    logger.error('Delete user error:', error.message);
    return response.error(res, 'Failed to delete user', 500);
  }
};

/**
 * Get system statistics (admin only)
 */
export const getSystemStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalAdmins = await prisma.user.count({ where: { isAdmin: true } });
    const totalPets = await prisma.pet.count();
    const totalAdoptions = await prisma.adoption.count();
    const adoptionsPending = await prisma.adoption.count({ where: { status: 'Pending' } });
    const adoptionsApproved = await prisma.adoption.count({ where: { status: 'Approved' } });

    return response.success(res, {
      stats: {
        totalUsers,
        totalAdmins,
        totalPets,
        totalAdoptions,
        adoptionsPending,
        adoptionsApproved,
        timestamp: new Date(),
      },
    }, 'Statistics retrieved');
  } catch (error) {
    logger.error('Get stats error:', error.message);
    return response.error(res, 'Failed to retrieve statistics', 500);
  }
};
