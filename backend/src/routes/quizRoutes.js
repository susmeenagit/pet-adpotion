import express from 'express';
import * as quizController from '../controllers/quizController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ============= ADMIN ROUTES =============

// Create quiz (admin only)
router.post('/admin/quiz', authMiddleware.isAdmin, quizController.createQuiz);

// Get all quizzes (admin only)
router.get('/admin/quizzes', authMiddleware.isAdmin, quizController.getAllQuizzes);

// Get single quiz by ID (admin only)
router.get('/admin/quiz/:id', authMiddleware.isAdmin, quizController.getQuizById);

// Update quiz (admin only)
router.put('/admin/quiz/:id', authMiddleware.isAdmin, quizController.updateQuiz);

// Delete quiz (admin only)
router.delete('/admin/quiz/:id', authMiddleware.isAdmin, quizController.deleteQuiz);

// Add question to quiz (admin only)
router.post('/admin/quiz/:quizId/question', authMiddleware.isAdmin, quizController.addQuestion);

// Update question (admin only)
router.put('/admin/question/:questionId', authMiddleware.isAdmin, quizController.updateQuestion);

// Delete question (admin only)
router.delete('/admin/question/:questionId', authMiddleware.isAdmin, quizController.deleteQuestion);

// Add option to question (admin only)
router.post('/admin/question/:questionId/option', authMiddleware.isAdmin, quizController.addOption);

// Update option (admin only)
router.put('/admin/option/:optionId', authMiddleware.isAdmin, quizController.updateOption);

// Delete option (admin only)
router.delete('/admin/option/:optionId', authMiddleware.isAdmin, quizController.deleteOption);

// Get all quiz responses for verification (admin only)
router.get('/admin/responses', authMiddleware.isAdmin, quizController.getQuizResponsesForVerification);

// Verify quiz response (admin only)
router.put('/admin/response/:responseId/verify', authMiddleware.isAdmin, quizController.verifyQuizResponse);

// ============= USER ROUTES =============

// Get active quizzes for users
router.get('/quizzes', quizController.getActiveQuizzes);

// Get specific quiz for user (without correct answers)
router.get('/quiz/:quizId', quizController.getQuizForUser);

// Check if user already attempted quiz
router.get('/quiz/:quizId/check-attempt', authMiddleware.authenticate, quizController.checkUserAttempt);

// Submit quiz response (user)
router.post('/submit', authMiddleware.authenticate, quizController.submitQuizResponse);

// Get user's specific quiz response
router.get('/response/:responseId', authMiddleware.authenticate, quizController.getUserQuizResponse);

// Get user's all quiz responses
router.get('/my-responses', authMiddleware.authenticate, quizController.getUserAllResponses);

export default router;
