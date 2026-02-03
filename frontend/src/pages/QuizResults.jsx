import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PetCard from '../components/PetCard'
import { petApi } from '../api/petApi'

const QuizResults = () => {
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState(null)

  // Matching algorithm
  const calculateScore = (pet, userAnswers) => {
    let score = 0
    let reasons = []

    // Energy level matching
    if (userAnswers.activityLevel === 'low' && ['Dog', 'Rabbit'].includes(pet.species)) {
      if (pet.species === 'Cat') score += 30
      if (pet.species === 'Rabbit') score += 20
    } else if (userAnswers.activityLevel === 'high' && pet.species === 'Dog') {
      score += 30
      reasons.push('Great for active lifestyles')
    }

    // Space requirements
    if (userAnswers.homeType === 'apartment') {
      if (pet.species === 'Cat') score += 20
      if (pet.species === 'Rabbit') score += 15
      if (pet.species === 'Dog' && pet.age < 24) score += 10
    } else if (userAnswers.homeType === 'house') {
      if (pet.species === 'Dog') score += 20
    }

    // Experience level
    if (userAnswers.experience === 'beginner') {
      if (pet.species === 'Cat') score += 15
      if (pet.species === 'Rabbit') score += 10
      reasons.push('Good for first-time owners')
    } else if (userAnswers.experience === 'expert') {
      score += 10
    }

    // Kids/Elderly at home
    if (userAnswers.kidsElderly === 'yes') {
      if (pet.species === 'Dog' || pet.species === 'Cat') score += 15
      reasons.push('Great with families')
    }

    // Time available
    if (userAnswers.timeAvailable === 'low' && pet.species === 'Cat') {
      score += 20
      reasons.push('Requires minimal daily care')
    } else if (userAnswers.timeAvailable === 'high' && pet.species === 'Dog') {
      score += 25
      reasons.push('Needs active engagement')
    }

    // Boost for feature completeness
    if (pet.description) score += 5
    if (pet.image) score += 5

    return { score, reasons }
  }

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)

        const storedAnswers = sessionStorage.getItem('quizAnswers')
        if (!storedAnswers) {
          navigate('/quiz')
          return
        }

        const userAnswers = JSON.parse(storedAnswers)
        setAnswers(userAnswers)

        const { pets } = await petApi.getAll(1, 100)

        const scored = pets.map((pet) => {
          const { score, reasons } = calculateScore(pet, userAnswers)
          return { ...pet, matchScore: score, matchReasons: reasons }
        })

        const topMatches = scored
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 6)

        setRecommendations(topMatches)
        setError('')
      } catch (err) {
        console.error('Failed to fetch recommendations:', err)
        setError('Failed to load recommendations')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [navigate])

  const getAnswerLabel = (key, value) => {
    const labels = {
      homeType: { apartment: 'Apartment', house: 'House', farm: 'Farm' },
      timeAvailable: { low: 'Less than 1 hour', medium: '1-3 hours', high: 'More than 3 hours' },
      experience: { beginner: 'Beginner', intermediate: 'Intermediate', expert: 'Expert' },
      kidsElderly: { yes: 'Yes', no: 'No' },
      activityLevel: { low: 'Low', medium: 'Medium', high: 'High' },
    }
    return labels[key]?.[value] || value
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-600">
              Finding your perfect matches...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Your Perfect Pet Matches
          </h1>
          <p className="text-gray-600 text-lg">
            Based on your preferences, here are our top recommendations
          </p>
        </div>

        {answers && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Your Profile
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Home</p>
                <p className="font-semibold text-gray-800">
                  {getAnswerLabel('homeType', answers.homeType)}
                </p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold text-gray-800">
                  {getAnswerLabel('timeAvailable', answers.timeAvailable)}
                </p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-semibold text-gray-800">
                  {getAnswerLabel('experience', answers.experience)}
                </p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Family</p>
                <p className="font-semibold text-gray-800">
                  {getAnswerLabel('kidsElderly', answers.kidsElderly)}
                </p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Activity</p>
                <p className="font-semibold text-gray-800">
                  {getAnswerLabel('activityLevel', answers.activityLevel)}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {recommendations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {recommendations.map((pet) => (
                <div key={pet.id} className="relative">
                  <PetCard pet={pet} />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    {pet.matchScore}% Match
                  </div>
                  {pet.matchReasons?.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-semibold text-green-800 mb-1">
                        Why we recommend:
                      </p>
                      <ul className="text-xs text-green-700 space-y-1">
                        {pet.matchReasons.map((reason, idx) => (
                          <li key={idx}>✓ {reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/browse-pets')}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold text-lg shadow-md"
              >
                Browse All Pets
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-semibold text-lg"
              >
                Take Quiz Again
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600 mb-6">
              No matches found with current preferences
            </p>
            <button
              onClick={() => navigate('/quiz')}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default QuizResults
