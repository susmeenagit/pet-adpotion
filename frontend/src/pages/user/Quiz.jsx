import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import UserSidebar from '../../components/UserSidebar'
import { quizAPI } from '../../services/api'

const Quiz = () => {
  const [searchParams] = useSearchParams()
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchQuiz()
  }, [])

  const fetchQuiz = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Check if quizId is provided in URL params
      const quizIdFromUrl = searchParams.get('quizId')
      
      if (quizIdFromUrl) {
        // Fetch specific quiz
        const quizRes = await quizAPI.getQuizForUser(quizIdFromUrl)
        const quizData = quizRes.data?.data?.quiz || quizRes.data?.quiz || quizRes.data
        if (quizData) {
          setQuiz(quizData)
        } else {
          setError('Quiz not found')
        }
      } else {
        // Get active quizzes and use the first one
        const quizzesRes = await quizAPI.getActiveQuizzes()
        const activeQuizzes = Array.isArray(quizzesRes.data?.data?.quizzes)
          ? quizzesRes.data.data.quizzes
          : Array.isArray(quizzesRes.data?.quizzes)
          ? quizzesRes.data.quizzes
          : Array.isArray(quizzesRes.data)
          ? quizzesRes.data
          : []
        
        if (activeQuizzes.length > 0) {
          // Get the first active quiz for user
          const quizId = activeQuizzes[0].id
          const quizRes = await quizAPI.getQuizForUser(quizId)
          const quizData = quizRes.data?.data?.quiz || quizRes.data?.quiz || quizRes.data
          if (quizData) {
            setQuiz(quizData)
          } else {
            setError('Failed to load quiz')
          }
        } else {
          setError('No active quizzes available')
        }
      }
    } catch (error) {
      console.error('Error fetching quiz:', error)
      setError(error.response?.data?.message || 'Failed to load quiz')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      // Format answers for backend
      const formattedAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId: parseInt(questionId),
        selectedOptionId: parseInt(optionId),
      }))

      const response = await quizAPI.submitResponse({
        quizId: quiz.id,
        answers: formattedAnswers,
      })
      
      // Show success message
      alert('Quiz submitted successfully!')
      navigate('/user/dashboard?tab=quiz')
    } catch (error) {
      console.error('Error submitting quiz:', error)
      const errorMessage = error.response?.data?.message || 'Error submitting quiz. Please try again.'
      alert(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        <UserSidebar />
        <div className="flex-1 ml-72 p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!quiz && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        <UserSidebar />
        <div className="flex-1 ml-72 p-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">❓</div>
            <p className="text-gray-600 text-lg mb-4">
              {error || 'No quiz available at the moment.'}
            </p>
            <button
              onClick={() => navigate('/user/dashboard')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg font-semibold"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        <UserSidebar />
        <div className="flex-1 ml-72 p-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">❓</div>
            <p className="text-gray-600 text-lg mb-4">Quiz has no questions available.</p>
            <button
              onClick={() => navigate('/user/dashboard')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg font-semibold"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.questions.length - 1
  const allAnswered = quiz.questions.every((q) => answers[q.id])
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <UserSidebar />
      
      <div className="flex-1 ml-72 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
          <p className="text-gray-600">{quiz.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span className="font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span className="font-semibold">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {question.question}
            </h2>
            {question.description && (
              <p className="text-gray-600">{question.description}</p>
            )}
          </div>

          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  answers[question.id] === option.id
                    ? 'border-green-500 bg-green-50 shadow-md transform scale-105'
                    : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={answers[question.id] === option.id}
                  onChange={() => handleAnswer(question.id, option.id)}
                  className="mr-4 h-5 w-5 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700 text-lg">{option.optionText}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-gray-600 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-all shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
          >
            ← Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647A7.962 7.962 0 0112 20c2.042 0 3.935-.824 5-2.122l3 2.647A7.962 7.962 0 0020 12h-4a7.962 7.962 0 01-3 5.291z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Quiz ✓'
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz

