import express from 'express';
import { getPets, getPetById, getFeaturedPets } from '../controllers/petController.js';

const router = express.Router();

router.get('/featured', getFeaturedPets);
router.get('/:id', getPetById);
router.get('/', getPets);

export default router;



