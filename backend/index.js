import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import petRoutes from './src/routes/petRoutes.js';
import adoptionRoutes from './src/routes/adoptionRoutes.js';
import quizRoutes from './src/routes/quizRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoption', adoptionRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'Pet Adoption API' }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
