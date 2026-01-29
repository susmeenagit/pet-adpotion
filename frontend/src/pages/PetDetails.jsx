import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPetById } from '../data/dummyData'

const PetDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const petData = getPetById(id)
    if (petData) {
      setPet(petData)
    }
    setLoading(false)
  }, [id])

  const getVaccinationBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border border-green-300'
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300'
    }
  }

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 text-green-800 border border-green-300'
      case 'Under Treatment':
        return 'bg-orange-100 text-orange-800 border border-orange-300'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300'
    }
  }

  const getAdoptionStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-blue-100 text-blue-800 border border-blue-300'
      case 'Pending':
        return 'bg-purple-100 text-purple-800 border border-purple-300'
      case 'Adopted':
        return 'bg-red-100 text-red-800 border border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-2xl font-semibold text-gray-600">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pet Not Found</h2>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the pet you're looking for.
            </p>
            <button
              onClick={() => navigate('/browse-pets')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Back to Browse Pets
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate('/browse-pets')}
          className="text-purple-600 hover:text-purple-700 font-semibold mb-6 flex items-center gap-2"
        >
          ← Back to Browse Pets
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Pet Image Section */}
          <div className="h-96 bg-gray-200 overflow-hidden">
            <img
              src={pet.image || 'https://via.placeholder.com/800x400?text=Pet+Image'}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Pet Details Section */}
          <div className="p-8">
            {/* Header with Name and Status Badges */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{pet.name}</h1>
              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getAdoptionStatusColor(pet.adoptionStatus)}`}>
                  📋 {pet.adoptionStatus}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getHealthStatusColor(pet.healthStatus)}`}>
                  ❤️ {pet.healthStatus}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getVaccinationBadgeColor(pet.vaccinationStatus)}`}>
                  💉 {pet.vaccinationStatus}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {pet.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{pet.description}</p>
            </div>

            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">
                  Species
                </h3>
                <p className="text-2xl font-bold text-gray-800">{pet.species}</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-pink-600 uppercase tracking-wide mb-2">
                  Breed
                </h3>
                <p className="text-2xl font-bold text-gray-800">{pet.breed}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                  Age
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {pet.age} {pet.ageUnit}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
                  Gender
                </h3>
                <p className="text-2xl font-bold text-gray-800">{pet.gender}</p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Health & Vaccination */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Health Status</p>
                    <p className="text-lg font-semibold text-gray-800">{pet.healthStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vaccination Status</p>
                    <p className="text-lg font-semibold text-gray-800">{pet.vaccinationStatus}</p>
                  </div>
                </div>
              </div>

              {/* Adoption Information */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Adoption Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Adoption Status</p>
                    <p className="text-lg font-semibold text-gray-800">{pet.adoptionStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pet ID</p>
                    <p className="text-lg font-semibold text-gray-800">#{pet.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {pet.adoptionStatus === 'Available' ? (
                <button
                  onClick={() => navigate(`/adoption-application/${pet.id}`)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg shadow-md hover:shadow-lg"
                >
                  🐾 Apply to Adopt {pet.name}
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-lg cursor-not-allowed opacity-60"
                >
                  ❌ Not Available for Adoption
                </button>
              )}

              <button
                onClick={() => navigate('/browse-pets')}
                className="flex-1 border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-lg"
              >
                🔍 Browse More Pets
              </button>
            </div>

            {/* Additional Care Tips */}
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Care Tips</h3>
              <p className="text-gray-700">
                Before adopting, please make sure you're ready for the responsibilities. Consider visiting our{' '}
                <a
                  href="/petcare-tips"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Pet Care Tips
                </a>{' '}
                and{' '}
                <a
                  href="/vaccination-schedule"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Vaccination Schedule
                </a>{' '}
                pages for more information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PetDetails