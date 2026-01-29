import { prisma } from '../lib/prisma.js';
import { response } from '../utils/response.js';
import { logger } from '../utils/logger.js';

// ============= ADMIN QUIZ MANAGEMENT =============

/**
 * Create a new quiz
 */
export const createQuiz = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return response.badRequest(res, 'Quiz title is required');
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description: description || '',
        isActive: true,
      },
    });

    logger.info(`Quiz created: ${title} (ID: ${quiz.id})`);
    return response.created(res, { quiz }, 'Quiz created successfully');
  } catch (error) {
    logger.error('Create quiz error:', error.message);
    return response.error(res, 'Failed to create quiz', 500);
  }
};

/**
 * Get all quizzes (for admin)
 */
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { responses: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    logger.info(`Admin fetched ${quizzes.length} quizzes`);
    return response.success(res, { quizzes }, 'Quizzes retrieved');
  } catch (error) {
    logger.error('Get all quizzes error:', error.message);
    return response.error(res, 'Failed to fetch quizzes', 500);
  }
};

/**
 * Get single quiz by ID
 */
export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: {
          include: {
            options: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        responses: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    if (!quiz) {
      return response.notFound(res, 'Quiz not found');
    }

    logger.info(`Quiz fetched: ${quiz.title} (ID: ${id})`);
    return response.success(res, { quiz }, 'Quiz retrieved');
  } catch (error) {
    logger.error('Get quiz by ID error:', error.message);
    return response.error(res, 'Failed to fetch quiz', 500);
  }
};

/**
 * Update quiz
 */
export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isActive } = req.body;

    const quiz = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    logger.info(`Quiz updated: ${quiz.title} (ID: ${id})`);
    return response.success(res, { quiz }, 'Quiz updated successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Quiz not found');
    }
    logger.error('Update quiz error:', error.message);
    return response.error(res, 'Failed to update quiz', 500);
  }
};

/**
 * Delete quiz
 */
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({ where: { id: parseInt(id) } });
    if (!quiz) {
      return response.notFound(res, 'Quiz not found');
    }

    await prisma.quiz.delete({
      where: { id: parseInt(id) },
    });

    logger.info(`Quiz deleted: ${quiz.title} (ID: ${id})`);
    return response.success(res, null, 'Quiz deleted successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Quiz not found');
    }
    logger.error('Delete quiz error:', error.message);
    return response.error(res, 'Failed to delete quiz', 500);
  }
};

/**
 * Add question to quiz
 */
export const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { question, order } = req.body;

    if (!question) {
      return response.badRequest(res, 'Question text is required');
    }

    const quizQuestion = await prisma.quizQuestion.create({
      data: {
        quizId: parseInt(quizId),
        question,
        order: order || 0,
      },
    });

    logger.info(`Question added to quiz ${quizId}`);
    return response.created(res, { quizQuestion }, 'Question added successfully');
  } catch (error) {
    logger.error('Add question error:', error.message);
    return response.error(res, 'Failed to add question', 500);
  }
};

/**
 * Update question
 */
export const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { question, order } = req.body;

    const updatedQuestion = await prisma.quizQuestion.update({
      where: { id: parseInt(questionId) },
      data: {
        ...(question && { question }),
        ...(order !== undefined && { order }),
      },
      include: {
        options: {
          orderBy: { order: 'asc' },
        },
      },
    });

    logger.info(`Question updated: ID ${questionId}`);
    return response.success(res, { question: updatedQuestion }, 'Question updated successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Question not found');
    }
    logger.error('Update question error:', error.message);
    return response.error(res, 'Failed to update question', 500);
  }
};

/**
 * Delete question
 */
export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    await prisma.quizQuestion.delete({
      where: { id: parseInt(questionId) },
    });

    logger.info(`Question deleted: ID ${questionId}`);
    return response.success(res, null, 'Question deleted successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Question not found');
    }
    logger.error('Delete question error:', error.message);
    return response.error(res, 'Failed to delete question', 500);
  }
};

/**
 * Add option to question
 */
export const addOption = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { optionText, isCorrect, order } = req.body;

    if (!optionText) {
      return response.badRequest(res, 'Option text is required');
    }

    const option = await prisma.quizOption.create({
      data: {
        questionId: parseInt(questionId),
        optionText,
        isCorrect: isCorrect || false,
        order: order || 0,
      },
    });

    logger.info(`Option added to question ${questionId}`);
    return response.created(res, { option }, 'Option added successfully');
  } catch (error) {
    logger.error('Add option error:', error.message);
    return response.error(res, 'Failed to add option', 500);
  }
};

/**
 * Update option
 */
export const updateOption = async (req, res) => {
  try {
    const { optionId } = req.params;
    const { optionText, isCorrect, order } = req.body;

    const option = await prisma.quizOption.update({
      where: { id: parseInt(optionId) },
      data: {
        ...(optionText && { optionText }),
        ...(isCorrect !== undefined && { isCorrect }),
        ...(order !== undefined && { order }),
      },
    });

    logger.info(`Option updated: ID ${optionId}`);
    return response.success(res, { option }, 'Option updated successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Option not found');
    }
    logger.error('Update option error:', error.message);
    return response.error(res, 'Failed to update option', 500);
  }
};

/**
 * Delete option
 */
export const deleteOption = async (req, res) => {
  try {
    const { optionId } = req.params;

    await prisma.quizOption.delete({
      where: { id: parseInt(optionId) },
    });

    logger.info(`Option deleted: ID ${optionId}`);
    return response.success(res, null, 'Option deleted successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Option not found');
    }
    logger.error('Delete option error:', error.message);
    return response.error(res, 'Failed to delete option', 500);
  }
};

// ============= USER QUIZ SUBMISSION =============

/**
 * Get active quizzes for users
 */
export const getActiveQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: { isActive: true },
      include: {
        questions: {
          include: {
            options: {
              select: {
                id: true,
                optionText: true,
                order: true,
              },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    logger.info(`Fetched ${quizzes.length} active quizzes`);
    return response.success(res, { quizzes }, 'Active quizzes retrieved');
  } catch (error) {
    logger.error('Get active quizzes error:', error.message);
    return response.error(res, 'Failed to fetch quizzes', 500);
  }
};

/**
 * Get quiz for user (without correct answer indicators)
 */
export const getQuizForUser = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(quizId), isActive: true },
      include: {
        questions: {
          include: {
            options: {
              select: {
                id: true,
                optionText: true,
                order: true,
              },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!quiz) {
      return response.notFound(res, 'Quiz not found');
    }

    logger.info(`User fetched quiz: ${quiz.title} (ID: ${quizId})`);
    return response.success(res, { quiz }, 'Quiz retrieved');
  } catch (error) {
    logger.error('Get quiz for user error:', error.message);
    return response.error(res, 'Failed to fetch quiz', 500);
  }
};

/**
 * Check if user already attempted quiz
 */
export const checkUserAttempt = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { quizId } = req.params;

    const attempt = await prisma.quizResponse.findFirst({
      where: {
        userId: parseInt(userId),
        quizId: parseInt(quizId),
      },
    });

    logger.info(`Checked quiz attempt - User ${userId}, Quiz ${quizId}, Has Attempted: ${!!attempt}`);
    
    return response.success(res, {
      hasAttempted: !!attempt,
      attempt: attempt || null,
    }, 'Attempt check completed');
  } catch (error) {
    logger.error('Check user attempt error:', error.message);
    return response.error(res, 'Failed to check attempt', 500);
  }
};

/**
 * Submit quiz response
 */
export const submitQuizResponse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { quizId, answers } = req.body;

    if (!quizId || !answers || !Array.isArray(answers)) {
      return response.badRequest(res, 'Invalid request data - quizId and answers array required');
    }

    // Check if user already submitted
    const existingResponse = await prisma.quizResponse.findFirst({
      where: {
        userId: parseInt(userId),
        quizId: parseInt(quizId),
      },
    });

    if (existingResponse) {
      logger.warn(`User ${userId} attempted to submit quiz ${quizId} twice`);
      return response.conflict(res, 'You have already submitted this quiz');
    }

    // Get quiz data for scoring
    const quizData = await prisma.quiz.findUnique({
      where: { id: parseInt(quizId) },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quizData) {
      return response.notFound(res, 'Quiz not found');
    }

    // Calculate score
    let correctCount = 0;
    const questionResponses = [];

    for (const answer of answers) {
      const question = quizData.questions.find((q) => q.id === answer.questionId);
      if (!question) continue;

      const selectedOption = question.options.find((o) => o.id === answer.selectedOptionId);
      const isCorrect = selectedOption ? selectedOption.isCorrect : false;

      if (isCorrect) correctCount++;

      questionResponses.push({
        questionId: answer.questionId,
        selectedOptionId: answer.selectedOptionId || null,
        isCorrect,
      });
    }

    // Create response
    const quizResponse = await prisma.quizResponse.create({
      data: {
        userId: parseInt(userId),
        quizId: parseInt(quizId),
        status: 'Completed',
        score: correctCount,
        totalQuestions: quizData.questions.length,
        answers: {
          create: questionResponses,
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    const percentage = Math.round((correctCount / quizData.questions.length) * 100);
    logger.info(`Quiz submitted - User ${userId}, Quiz ${quizId}, Score: ${correctCount}/${quizData.questions.length} (${percentage}%)`);

    return response.created(res, {
      response: quizResponse,
      score: correctCount,
      totalQuestions: quizData.questions.length,
      percentage,
    }, 'Quiz submitted successfully');
  } catch (error) {
    logger.error('Submit quiz response error:', error.message);
    return response.error(res, 'Failed to submit quiz', 500);
  }
};

/**
 * Get user's quiz response
 */
export const getUserQuizResponse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { responseId } = req.params;

    const userResponse = await prisma.quizResponse.findFirst({
      where: {
        id: parseInt(responseId),
        userId: parseInt(userId),
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                options: true,
              },
              orderBy: { order: 'asc' },
            },
          },
        },
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!userResponse) {
      return response.notFound(res, 'Response not found');
    }

    logger.info(`User ${userId} fetched quiz response ${responseId}`);
    return response.success(res, { response: userResponse }, 'Quiz response retrieved');
  } catch (error) {
    logger.error('Get user quiz response error:', error.message);
    return response.error(res, 'Failed to fetch response', 500);
  }
};

/**
 * Get user's all quiz responses
 */
export const getUserAllResponses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const responses = await prisma.quizResponse.findMany({
      where: { userId: parseInt(userId) },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    logger.info(`User ${userId} fetched all quiz responses (${responses.length} responses)`);
    return response.success(res, { responses }, 'Quiz responses retrieved');
  } catch (error) {
    logger.error('Get user all responses error:', error.message);
    return response.error(res, 'Failed to fetch responses', 500);
  }
};

// ============= ADMIN VERIFICATION =============

/**
 * Get all quiz responses for admin verification
 */
export const getQuizResponsesForVerification = async (req, res) => {
  try {
    const responses = await prisma.quizResponse.findMany({
      where: { status: 'Completed' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        quiz: {
          select: { id: true, title: true },
        },
        answers: {
          include: {
            question: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    logger.info(`Admin fetched ${responses.length} quiz responses for verification`);
    return response.success(res, { responses }, 'Quiz responses retrieved');
  } catch (error) {
    logger.error('Get quiz responses for verification error:', error.message);
    return response.error(res, 'Failed to fetch responses', 500);
  }
};

/**
 * Verify quiz response (admin)
 */
export const verifyQuizResponse = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { status, adminNotes } = req.body;
    const adminId = req.user.userId;

    if (!['Verified', 'Rejected'].includes(status)) {
      return response.badRequest(res, 'Status must be "Verified" or "Rejected"');
    }

    const quizResponse = await prisma.quizResponse.update({
      where: { id: parseInt(responseId) },
      data: {
        status,
        adminNotes: adminNotes || '',
      },
    });

    logger.info(`Admin ${adminId} verified quiz response ${responseId} - Status: ${status}`);
    return response.success(res, { response: quizResponse }, 'Quiz response verified successfully');
  } catch (error) {
    if (error.code === 'P2025') {
      return response.notFound(res, 'Response not found');
    }
    logger.error('Verify quiz response error:', error.message);
    return response.error(res, 'Failed to verify response', 500);
  }
};
