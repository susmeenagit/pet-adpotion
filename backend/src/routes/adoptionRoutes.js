import express from 'express';
import { createAdoption, getAdoptions, getAdoptionById, updateAdoptionStatus, deleteAdoption } from '../controllers/adoptionController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============= PUBLIC/USER ROUTES =============
router.post('/', createAdoption);

// ============= ADMIN ROUTES =============
router.get('/admin/all', isAdmin, getAdoptions);
router.get('/admin/:id', isAdmin, getAdoptionById);
router.put('/admin/:id/status', isAdmin, updateAdoptionStatus);
router.delete('/admin/:id', isAdmin, deleteAdoption);

export default router;





