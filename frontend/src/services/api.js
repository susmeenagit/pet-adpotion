import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear storage and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      const currentPath = window.location.pathname
      if (currentPath.startsWith('/user')) {
        window.location.href = '/user/login'
      } else {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ============= AUTH API =============
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
}

// ============= PET API =============
export const petAPI = {
  getAll: (params) => api.get('/pets', { params }),
  getFeatured: () => api.get('/pets/featured'),
  getById: (id) => api.get(`/pets/${id}`),
  // Admin only
  create: (formData) => api.post('/pets/admin/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/pets/admin/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/pets/admin/delete/${id}`),
}

// ============= ADOPTION API =============
export const adoptionAPI = {
  // User can create adoption
  create: (data) => api.post('/adoption', data),
  // User's own adoptions (authenticated)
  getMyAdoptions: () => api.get('/adoption/my-adoptions'),
  // Admin only
  getAll: (params) => api.get('/adoption/admin/all', { params }),
  getById: (id) => api.get(`/adoption/admin/${id}`),
  updateStatus: (id, status) => api.put(`/adoption/admin/${id}/status`, { status }),
  delete: (id) => api.delete(`/adoption/admin/${id}`),
}

// ============= QUIZ API =============
export const quizAPI = {
  // User routes
  getActiveQuizzes: () => api.get('/quiz/quizzes'),
  getQuizForUser: (quizId) => api.get(`/quiz/quiz/${quizId}`),
  checkAttempt: (quizId) => api.get(`/quiz/quiz/${quizId}/check-attempt`),
  submitResponse: (data) => api.post('/quiz/submit', data),
  getUserResponse: (responseId) => api.get(`/quiz/response/${responseId}`),
  getUserAllResponses: () => api.get('/quiz/my-responses'),
  // Admin routes
  createQuiz: (data) => api.post('/quiz/admin/quiz', data),
  getAllQuizzes: () => api.get('/quiz/admin/quizzes'),
  getQuizById: (id) => api.get(`/quiz/admin/quiz/${id}`),
  updateQuiz: (id, data) => api.put(`/quiz/admin/quiz/${id}`, data),
  deleteQuiz: (id) => api.delete(`/quiz/admin/quiz/${id}`),
  addQuestion: (quizId, data) => api.post(`/quiz/admin/quiz/${quizId}/question`, data),
  updateQuestion: (questionId, data) => api.put(`/quiz/admin/question/${questionId}`, data),
  deleteQuestion: (questionId) => api.delete(`/quiz/admin/question/${questionId}`),
  addOption: (questionId, data) => api.post(`/quiz/admin/question/${questionId}/option`, data),
  updateOption: (optionId, data) => api.put(`/quiz/admin/option/${optionId}`, data),
  deleteOption: (optionId) => api.delete(`/quiz/admin/option/${optionId}`),
  getResponsesForVerification: () => api.get('/quiz/admin/responses'),
  verifyResponse: (responseId, data) => api.put(`/quiz/admin/response/${responseId}/verify`, data),
}

export default api
