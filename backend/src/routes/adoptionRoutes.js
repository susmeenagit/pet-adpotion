import express from 'express';
import { createAdoption, getAdoptions } from '../controllers/adoptionController.js';

const router = express.Router();

router.post('/', createAdoption);
router.get('/', getAdoptions);

export default router;




