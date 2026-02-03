import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { petAPI, adoptionAPI } from '../../services/api'

const BrowsePetsManagement = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecies, setFilterSpecies] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      setLoading(true)
      const response = await petAPI.getAll()
      
      // Handle different response structures
      let allPets = []
      if (Array.isArray(response.data)) {
        allPets = response.data
      } else if (response.data?.pets && Array.isArray(response.data.pets)) {
        allPets = response.data.pets
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        allPets = response.data.data
      } else if (Array.isArray(response.data?.data?.pets)) {
        allPets = response.data.data.pets
      }
      
      // Ensure it's always an array
      setPets(Array.isArray(allPets) ? allPets : [])
      setError('')
    } catch (err) {
      console.error('Failed to fetch pets:', err)
      setError('Failed to load pets')
      setPets([]) // Ensure pets is always an array even on error
    } finally {
      setLoading(false)
    }
  }

  const handleAdopt = async (petId) => {
    navigate(`/adoption-application/${petId}`)
  }

  // Ensure pets is always an array before filtering
  const petsArray = Array.isArray(pets) ? pets : []
  
  const filteredPets = petsArray.filter((pet) => {
    if (!pet) return false
    const matchesSearch =
      pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecies = filterSpecies === 'all' || pet.species === filterSpecies
    return matchesSearch && matchesSpecies
  })

  const speciesList = [...new Set(petsArray.map((pet) => pet?.species).filter(Boolean))]

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading pets...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPets}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse Available Pets</h2>
        
        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search pets by name, breed, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <select
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Species</option>
            {speciesList.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-gray-600">
          Showing {filteredPets.length} of {petsArray.length} pets
        </p>
      </div>

      {filteredPets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">No pets match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
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
                <p className="text-sm text-gray-500 mb-4">
                  Age: {pet.age} {pet.ageUnit || 'months'}
                </p>
                <button
                  onClick={() => handleAdopt(pet.id)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  Adopt Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BrowsePetsManagement

