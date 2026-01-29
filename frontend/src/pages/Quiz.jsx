import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { adoptionApi } from '../api/adoptionApi'

const Quiz = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState({
    homeType: '',
    timeAvailable: '',
    experience: '',
    kidsElderly: '',
    activityLevel: '',
  })

  const questions = [
    {
      id: 'homeType',
      question: 'What type of home do you have?',
      options: [
        { value: 'apartment', label: '🏢 Apartment' },
        { value: 'house', label: '🏠 House' },
        { value: 'farm', label: '🚜 Farm' },
      ],
    },
    {
      id: 'timeAvailable',
      question: 'How much time do you have for a pet daily?',
      options: [
        { value: 'low', label: '⏰ Less than 1 hour' },
        { value: 'medium', label: '⏱️ 1-3 hours' },
        { value: 'high', label: '⏲️ More than 3 hours' },
      ],
    },
    {
      id: 'experience',
      question: 'What is your pet ownership experience?',
      options: [
        { value: 'beginner', label: '🌱 Beginner (first pet)' },
        { value: 'intermediate', label: '🌿 Intermediate (owned pets)' },
        { value: 'expert', label: '🌳 Expert (multiple pets)' },
      ],
    },
    {
      id: 'kidsElderly',
      question: 'Do you have kids or elderly at home?',
      options: [
        { value: 'yes', label: '✅ Yes' },
        { value: 'no', label: '❌ No' },
      ],
    },
    {
      id: 'activityLevel',
      question: 'What is your activity level?',
      options: [
        { value: 'low', label: '🛋️ Low (indoor person)' },
        { value: 'medium', label: '🚴 Medium (mix of indoor/outdoor)' },
        { value: 'high', label: '🏃 High (very active)' },
      ],
    },
  ]

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    })
    setError('')
  }

  const handleNext = () => {
    const currentQuestion = questions[currentStep]
    if (!answers[currentQuestion.id]) {
      setError('Please select an answer to continue')
      return
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setError('')
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      // Store answers in session storage for results page
      sessionStorage.setItem('quizAnswers', JSON.stringify(answers))
      
      // Navigate to results page
      navigate('/quiz-results', { replace: true })
    } catch (err) {
      setError('Failed to process quiz. Please try again.')
      console.error('Quiz error:', err)
    } finally {
      setLoading(false)
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            🐾 Find Your Perfect Pet
          </h1>
          <p className="text-gray-600 text-lg">
            Answer a few questions to get personalized pet recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Question {currentStep + 1} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-purple-600 bg-purple-50 text-purple-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-8">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0 || loading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : currentStep === questions.length - 1 ? 'Get Recommendations' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-800">
            💡 Your answers help us find pets that match your lifestyle and home environment.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Quiz
