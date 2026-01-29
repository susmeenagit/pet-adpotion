import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import petRoutes from './src/routes/petRoutes.js';
import adoptionRoutes from './src/routes/adoptionRoutes.js';
import quizRoutes from './src/routes/quizRoutes.js';
import { logger } from './src/utils/logger.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

logger.info('CORS enabled for:', process.env.FRONTEND_URL || 'http://localhost:5173');

// Serve uploaded files
app.use('/uploads', express.static('uploads'));
logger.info('Static file serving enabled for /uploads');

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    logger.info(`${req.method} ${req.originalUrl} - ${statusColor}${res.statusCode}\x1b[0m (${duration}ms)`);
  });
  
  next();
});

// Routes
logger.info('Registering routes...');
app.use('/api/auth', authRoutes);
logger.info('✓ Auth routes registered');

app.use('/api/pets', petRoutes);
logger.info('✓ Pet routes registered');

app.use('/api/adoption', adoptionRoutes);
logger.info('✓ Adoption routes registered');

app.use('/api/quiz', quizRoutes);
logger.info('✓ Quiz routes registered');

// Health check
app.get('/', (req, res) => {
  logger.debug('Health check endpoint called');
  res.json({ ok: true, message: 'Pet Adoption API v1.0' });
});

// 404 handler
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    code: 'NOT_FOUND',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, {
    message: err.message,
    stack: err.stack,
  });
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'SERVER_ERROR',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  logger.info('═══════════════════════════════════════════════════════');
  logger.info('🐾 Pet Adoption API Server Started');
  logger.info('═══════════════════════════════════════════════════════');
  logger.info(`📡 Server running on: http://localhost:${port}`);
  logger.info(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  logger.info(`🗄️ Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
  logger.info(`🔐 JWT Secret: ${process.env.JWT_SECRET ? '***configured***' : 'Not configured'}`);
  logger.info(`📁 Upload Directory: ./uploads/pets`);
  logger.info('═══════════════════════════════════════════════════════');
  logger.info('Press Ctrl+C to stop the server');
  logger.info('═══════════════════════════════════════════════════════\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.warn('\n⚠️  Server shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.warn('\n⚠️  Server terminated');
  process.exit(0);
});
