import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adoptionAPI } from '../../services/api'

const MyPetsManagement = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchMyPets()
  }, [])

  const fetchMyPets = async () => {
    try {
      setLoading(true)
      const response = await adoptionAPI.getMyAdoptions()
      // Handle response structure: response.data.data.adoptions or response.data.adoptions
      const allAdoptions = Array.isArray(response.data?.data?.adoptions) 
        ? response.data.data.adoptions 
        : Array.isArray(response.data?.adoptions)
        ? response.data.adoptions
        : Array.isArray(response.data)
        ? response.data
        : []
      
      const approvedPets = allAdoptions
        .filter(req => req?.status?.toLowerCase() === 'approved')
        .map(req => req?.pet)
        .filter(pet => pet)
      setPets(Array.isArray(approvedPets) ? approvedPets : [])
      setError('')
    } catch (err) {
      console.error('Failed to fetch pets:', err)
      setError('Failed to load your pets')
      setPets([]) // Ensure pets is always an array
    } finally {
      setLoading(false)
    }
  }

  const handlePetClick = (pet) => {
    localStorage.setItem('selectedPet', JSON.stringify(pet))
    navigate(`/user/pet-profile/${pet.id}`)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your pets...</p>
      </div>
    )
  }

  if (error && pets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchMyPets}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (pets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="text-6xl mb-4">🐕</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Pets Yet</h3>
        <p className="text-gray-600 mb-6">You haven't adopted any pets yet.</p>
        <button
          onClick={() => navigate('/user/browse-pets')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
        >
          Browse Available Pets
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Adopted Pets</h2>
        <button
          onClick={() => navigate('/user/browse-pets')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
        >
          + Browse More Pets
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            onClick={() => handlePetClick(pet)}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            {pet.image ? (
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-6xl">🐾</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{pet.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {pet.species} • {pet.breed}
              </p>
              <p className="text-sm text-gray-500">
                Age: {pet.age} {pet.ageUnit || 'months'}
              </p>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
                View Profile →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPetsManagement

