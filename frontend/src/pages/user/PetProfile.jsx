import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserSidebar from '../../components/UserSidebar'
import PetDetails from '../../components/user/PetDetails'
import NutritionSection from '../../components/user/NutritionSection'
import ActivitiesSection from '../../components/user/ActivitiesSection'
import HealthCard from '../../components/user/HealthCard'
import { petAPI } from '../../services/api'

const PetProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pet, setPet] = useState(null)
  const [activeTab, setActiveTab] = useState('nutrition')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPetData()
  }, [id])

  const fetchPetData = async () => {
    try {
      const response = await petAPI.getById(id)
      const petData = response.data?.pet || response.data
      setPet(petData)
      if (petData) {
        localStorage.setItem('selectedPet', JSON.stringify(petData))
      }
    } catch (error) {
      console.error('Error fetching pet data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <UserSidebar />
        <div className="flex-1 ml-72 p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <UserSidebar />
        <div className="flex-1 ml-72 p-8">
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">Pet not found.</p>
            <button
              onClick={() => navigate('/user/dashboard')}
              className="mt-4 bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <UserSidebar />
      
      <div className="flex-1 ml-72 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Pet Profile</h1>
          
          {/* Pet Info Header */}
          <div className="flex items-center space-x-6 mb-6">
            {pet.image ? (
              <img
                src={pet.image}
                alt={pet.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-4xl">🐾</span>
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600">{pet.species} | {pet.breed}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-gray-200">
            {[
              { id: 'health', label: 'Health Card' },
              { id: 'nutrition', label: 'Nutrition' },
              { id: 'activities', label: 'Activities' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-yellow-600 border-b-2 border-yellow-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Pet Details */}
          <div className="col-span-12 lg:col-span-3">
            <PetDetails pet={pet} />
          </div>

          {/* Middle Column - Tab Content */}
          <div className="col-span-12 lg:col-span-6">
            {activeTab === 'health' && <HealthCard pet={pet} />}
            {activeTab === 'nutrition' && <NutritionSection pet={pet} />}
            {activeTab === 'activities' && <ActivitiesSection pet={pet} />}
          </div>

          {/* Right Column - Activities & Events */}
          <div className="col-span-12 lg:col-span-3">
            <ActivitiesSection pet={pet} isSidebar={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetProfile

