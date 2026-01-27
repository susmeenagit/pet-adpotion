import express from 'express';
import { getPets, getPetById, getFeaturedPets, createPet, updatePet, deletePet } from '../controllers/petController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============= PUBLIC ROUTES =============
router.get('/featured', getFeaturedPets);
router.get('/:id', getPetById);
router.get('/', getPets);

// ============= ADMIN ROUTES =============
router.post('/admin/create', isAdmin, createPet);
router.put('/admin/update/:id', isAdmin, updatePet);
router.delete('/admin/delete/:id', isAdmin, deletePet);

export default router;





