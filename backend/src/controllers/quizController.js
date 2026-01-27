import { prisma } from '../lib/prisma.js';

// ============= ADMIN QUIZ MANAGEMENT =============

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Quiz title is required' });
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description: description || '',
      },
    });

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Get all quizzes (for admin)
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

    res.json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

// Get single quiz by ID
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
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// Update quiz
export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isActive } = req.body;

    const quiz = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
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

    res.json({ message: 'Quiz updated successfully', quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

// Delete quiz
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.quiz.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

// Add question to quiz
export const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { question, order } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question text is required' });
    }

    const quizQuestion = await prisma.quizQuestion.create({
      data: {
        quizId: parseInt(quizId),
        question,
        order: order || 0,
      },
    });

    res.status(201).json({ message: 'Question added successfully', quizQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add question' });
  }
};

// Update question
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

    res.json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update question' });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    await prisma.quizQuestion.delete({
      where: { id: parseInt(questionId) },
    });

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

// Add option to question
export const addOption = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { optionText, isCorrect, order } = req.body;

    if (!optionText) {
      return res.status(400).json({ error: 'Option text is required' });
    }

    const option = await prisma.quizOption.create({
      data: {
        questionId: parseInt(questionId),
        optionText,
        isCorrect: isCorrect || false,
        order: order || 0,
      },
    });

    res.status(201).json({ message: 'Option added successfully', option });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add option' });
  }
};

// Update option
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

    res.json({ message: 'Option updated successfully', option });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update option' });
  }
};

// Delete option
export const deleteOption = async (req, res) => {
  try {
    const { optionId } = req.params;

    await prisma.quizOption.delete({
      where: { id: parseInt(optionId) },
    });

    res.json({ message: 'Option deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete option' });
  }
};

// ============= USER QUIZ SUBMISSION =============

// Get active quizzes for users
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

    res.json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

// Get quiz for user (without correct answer indicators)
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
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// Check if user already attempted quiz
export const checkUserAttempt = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quizId } = req.params;

    const attempt = await prisma.quizResponse.findFirst({
      where: {
        userId: parseInt(userId),
        quizId: parseInt(quizId),
      },
    });

    res.json({
      hasAttempted: !!attempt,
      attempt: attempt || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to check attempt' });
  }
};

// Submit quiz response
export const submitQuizResponse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quizId, answers } = req.body; // answers: [{ questionId, selectedOptionId }, ...]

    if (!quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Check if user already submitted
    const existingResponse = await prisma.quizResponse.findFirst({
      where: {
        userId: parseInt(userId),
        quizId: parseInt(quizId),
      },
    });

    if (existingResponse) {
      return res.status(400).json({ error: 'You have already submitted this quiz' });
    }

    // Get all correct answers for scoring
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
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Create response and calculate score
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

    // Create QuizResponse with QuestionResponses
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

    res.status(201).json({
      message: 'Quiz submitted successfully',
      response: quizResponse,
      score: correctCount,
      totalQuestions: quizData.questions.length,
      percentage: Math.round((correctCount / quizData.questions.length) * 100),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

// Get user's quiz response
export const getUserQuizResponse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { responseId } = req.params;

    const response = await prisma.quizResponse.findFirst({
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

    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch response' });
  }
};

// Get user's all quiz responses
export const getUserAllResponses = async (req, res) => {
  try {
    const userId = req.user.id;

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

    res.json({ responses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

// ============= ADMIN VERIFICATION =============

// Get all quiz responses for admin verification
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

    res.json({ responses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

// Verify quiz response (admin)
export const verifyQuizResponse = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { status, adminNotes } = req.body; // status: 'Verified' or 'Rejected'
    const adminId = req.user.id;

    if (!['Verified', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const quizResponse = await prisma.quizResponse.update({
      where: { id: parseInt(responseId) },
      data: {
        status,
        adminNotes: adminNotes || '',
      },
    });

    res.json({ message: 'Quiz response verified successfully', response: quizResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify response' });
  }
};
