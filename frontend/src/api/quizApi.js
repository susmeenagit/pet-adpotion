import axios from '../config/axios';

// Admin - Quiz Management
export const createQuiz = async (title, description) => {
  const response = await axios.post('/quiz/admin/quiz', { title, description });
  return response.data;
};

export const getAllQuizzes = async () => {
  const response = await axios.get('/quiz/admin/quizzes');
  return response.data;
};

export const getQuizById = async (quizId) => {
  const response = await axios.get(`/quiz/admin/quiz/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quizId, { title, description, isActive }) => {
  const response = await axios.put(`/quiz/admin/quiz/${quizId}`, {
    title,
    description,
    isActive,
  });
  return response.data;
};

export const deleteQuiz = async (quizId) => {
  const response = await axios.delete(`/quiz/admin/quiz/${quizId}`);
  return response.data;
};

// Questions
export const addQuestion = async (quizId, { question, order }) => {
  const response = await axios.post(`/quiz/admin/quiz/${quizId}/question`, {
    question,
    order,
  });
  return response.data;
};

export const updateQuestion = async (questionId, { question, order }) => {
  const response = await axios.put(`/quiz/admin/question/${questionId}`, {
    question,
    order,
  });
  return response.data;
};

export const deleteQuestion = async (questionId) => {
  const response = await axios.delete(`/quiz/admin/question/${questionId}`);
  return response.data;
};

// Options
export const addOption = async (questionId, { optionText, isCorrect, order }) => {
  const response = await axios.post(`/quiz/admin/question/${questionId}/option`, {
    optionText,
    isCorrect,
    order,
  });
  return response.data;
};

export const updateOption = async (optionId, { optionText, isCorrect, order }) => {
  const response = await axios.put(`/quiz/admin/option/${optionId}`, {
    optionText,
    isCorrect,
    order,
  });
  return response.data;
};

export const deleteOption = async (optionId) => {
  const response = await axios.delete(`/quiz/admin/option/${optionId}`);
  return response.data;
};

// Admin - Verification
export const getQuizResponsesForVerification = async () => {
  const response = await axios.get('/quiz/admin/responses');
  return response.data;
};

export const verifyQuizResponse = async (responseId, { status, adminNotes }) => {
  const response = await axios.put(`/quiz/admin/response/${responseId}/verify`, {
    status,
    adminNotes,
  });
  return response.data;
};

// User - Quiz Taking
export const getActiveQuizzes = async () => {
  const response = await axios.get('/quiz/quizzes');
  return response.data;
};

export const getQuizForUser = async (quizId) => {
  const response = await axios.get(`/quiz/quiz/${quizId}`);
  return response.data;
};

export const checkUserAttempt = async (quizId) => {
  const response = await axios.get(`/quiz/quiz/${quizId}/check-attempt`);
  return response.data;
};

export const submitQuizResponse = async (quizId, answers) => {
  const response = await axios.post('/quiz/submit', {
    quizId,
    answers,
  });
  return response.data;
};

export const getUserQuizResponse = async (responseId) => {
  const response = await axios.get(`/quiz/response/${responseId}`);
  return response.data;
};

export const getUserAllResponses = async () => {
  const response = await axios.get('/quiz/my-responses');
  return response.data;
};
