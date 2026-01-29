import express from 'express';
import { getAllPets, getPetById, getFeaturedPets, createPet, updatePet, deletePet } from '../controllers/petController.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// ============= PUBLIC ROUTES =============
router.get('/featured', getFeaturedPets);
router.get('/:id', getPetById);
router.get('/', getAllPets);

// ============= ADMIN ROUTES =============
router.post('/admin/create', authMiddleware, isAdmin, upload.single('image'), createPet);
router.put('/admin/update/:id', authMiddleware, isAdmin, upload.single('image'), updatePet);
router.delete('/admin/delete/:id', authMiddleware, isAdmin, deletePet);

export default router;





