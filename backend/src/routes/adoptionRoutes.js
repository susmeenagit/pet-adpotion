import express from 'express';
import {
  createAdoptionApplication,
  getAllAdoptions,
  getAdoptionById,
  updateAdoptionStatus,
  deleteAdoption,
  getMyAdoptions,
} from '../controllers/adoptionController.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============= PUBLIC/USER ROUTES =============
router.post('/', createAdoptionApplication);

// ============= USER ROUTES (AUTHENTICATED) =============
router.get('/my-adoptions', authMiddleware, getMyAdoptions);

// ============= ADMIN ROUTES =============
router.get('/admin/all', authMiddleware, isAdmin, getAllAdoptions);
router.get('/admin/:id', authMiddleware, isAdmin, getAdoptionById);
router.put('/admin/:id/status', authMiddleware, isAdmin, updateAdoptionStatus);
router.delete('/admin/:id', authMiddleware, isAdmin, deleteAdoption);

export default router;






