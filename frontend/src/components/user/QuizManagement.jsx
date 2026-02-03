import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { quizAPI } from '../../services/api'

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([])
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchQuizData()
  }, [])

  const fetchQuizData = async () => {
    try {
      setLoading(true)
      const [quizzesRes, responsesRes] = await Promise.all([
        quizAPI.getActiveQuizzes(),
        quizAPI.getUserAllResponses(),
      ])
      
      // Handle different response structures for quizzes
      let activeQuizzes = []
      if (Array.isArray(quizzesRes.data?.data?.quizzes)) {
        activeQuizzes = quizzesRes.data.data.quizzes
      } else if (Array.isArray(quizzesRes.data?.quizzes)) {
        activeQuizzes = quizzesRes.data.quizzes
      } else if (Array.isArray(quizzesRes.data)) {
        activeQuizzes = quizzesRes.data
      }
      
      // Handle different response structures for responses
      let userResponses = []
      if (Array.isArray(responsesRes.data?.data?.responses)) {
        userResponses = responsesRes.data.data.responses
      } else if (Array.isArray(responsesRes.data?.responses)) {
        userResponses = responsesRes.data.responses
      } else if (Array.isArray(responsesRes.data)) {
        userResponses = responsesRes.data
      }
      
      setQuizzes(Array.isArray(activeQuizzes) ? activeQuizzes : [])
      setResponses(Array.isArray(userResponses) ? userResponses : [])
      setError('')
    } catch (err) {
      console.error('Failed to fetch quiz data:', err)
      setError('Failed to load quiz information')
      setQuizzes([])
      setResponses([])
    } finally {
      setLoading(false)
    }
  }

  const handleTakeQuiz = (quizId) => {
    navigate(`/user/quiz?quizId=${quizId}`)
  }

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || ''
    switch (statusLower) {
      case 'completed':
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading quiz information...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchQuizData}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Available Quizzes */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Quizzes</h2>
        
        {quizzes.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">❓</div>
            <p className="text-gray-600">No active quizzes available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz) => {
              const userResponse = responses.find(r => r?.quizId === quiz?.id)
              const hasAttempted = !!userResponse
              const isVerified = userResponse?.status === 'Verified' || userResponse?.status === 'verified'
              
              return (
                <div
                  key={quiz.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{quiz.title}</h3>
                      {quiz.description && (
                        <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        {quiz.questions && (
                          <span className="text-xs text-gray-500">
                            {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}
                          </span>
                        )}
                      </div>
                      {hasAttempted && (
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(userResponse.status)}`}>
                            {userResponse.status}
                          </span>
                          {userResponse.score !== null && userResponse.totalQuestions !== null && (
                            <span className="text-sm text-gray-600">
                              Score: {userResponse.score}/{userResponse.totalQuestions}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleTakeQuiz(quiz.id)}
                      disabled={isVerified}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        isVerified
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {hasAttempted ? (isVerified ? 'Verified' : 'Retake Quiz') : 'Take Quiz'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quiz History */}
      {responses.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz History</h2>
          <div className="space-y-4">
            {responses.map((response) => {
              // Try to find quiz title from quizzes array
              const quiz = quizzes.find(q => q.id === response.quizId)
              const quizTitle = quiz?.title || `Quiz #${response.quizId}`
              
              return (
                <div
                  key={response.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => response.quizId && handleTakeQuiz(response.quizId)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{quizTitle}</p>
                      <p className="text-sm text-gray-600">
                        Completed on {new Date(response.createdAt).toLocaleDateString()}
                      </p>
                      {response.adminNotes && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          Note: {response.adminNotes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {response.score !== null && response.totalQuestions !== null && (
                        <span className="text-sm text-gray-600">
                          Score: {response.score}/{response.totalQuestions}
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(response.status)}`}>
                        {response.status}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizManagement

