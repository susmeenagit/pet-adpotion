import express from 'express';
import {
  register,
  login,
  me,
  logout,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getSystemStats,
} from '../controllers/authController.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authMiddleware, me);
router.post('/logout', authMiddleware, logout);

// Admin routes
router.get('/admin/users', authMiddleware, isAdmin, getAllUsers);
router.get('/admin/user/:id', authMiddleware, isAdmin, getUserById);
router.put('/admin/user/:id/role', authMiddleware, isAdmin, updateUserRole);
router.delete('/admin/user/:id', authMiddleware, isAdmin, deleteUser);
router.get('/admin/stats', authMiddleware, isAdmin, getSystemStats);

export default router;
