import express from 'express';
import { register, login, logout, me, getAllUsers, getUserById, updateUserRole, deleteUser, getSystemStats } from '../controllers/authController.js';
import { requireAuth, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============= PUBLIC ROUTES =============
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);

// ============= ADMIN ROUTES =============
router.get('/admin/users', isAdmin, getAllUsers);
router.get('/admin/user/:id', isAdmin, getUserById);
router.put('/admin/user/:id/role', isAdmin, updateUserRole);
router.delete('/admin/user/:id', isAdmin, deleteUser);
router.get('/admin/stats', isAdmin, getSystemStats);

export default router;
