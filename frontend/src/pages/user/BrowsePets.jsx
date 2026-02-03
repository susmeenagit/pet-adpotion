import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserSidebar from '../../components/UserSidebar'
import { petAPI } from '../../services/api'

const BrowsePets = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecies, setFilterSpecies] = useState('all')
  const [filterAge, setFilterAge] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      const response = await petAPI.getAll()
      const allPets = response.data?.pets || response.data || []
      // Note: Backend doesn't have status field, so we show all pets
      setPets(allPets)
    } catch (error) {
      console.error('Error fetching pets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdopt = (petId) => {
    navigate(`/adoption-application/${petId}`)
  }

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecies = filterSpecies === 'all' || pet.species === filterSpecies
    const ageInYears = pet.ageUnit === 'years' ? pet.age : pet.age / 12
    const matchesAge = filterAge === 'all' || 
      (filterAge === 'young' && ageInYears < 2) ||
      (filterAge === 'adult' && ageInYears >= 2 && ageInYears < 7) ||
      (filterAge === 'senior' && ageInYears >= 7)
    return matchesSearch && matchesSpecies && matchesAge
  })

  const speciesList = [...new Set(pets.map((pet) => pet.species))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <UserSidebar />
      
      <div className="flex-1 ml-72 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Browse Available Pets 🐾
          </h1>
          <p className="text-gray-600">
            Find your perfect companion from our loving pets
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, breed, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Species</label>
              <select
                value={filterSpecies}
                onChange={(e) => setFilterSpecies(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Species</option>
                {speciesList.map((species) => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Age</label>
              <select
                value={filterAge}
                onChange={(e) => setFilterAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Ages</option>
                <option value="young">Young (&lt; 2 years)</option>
                <option value="adult">Adult (2-7 years)</option>
                <option value="senior">Senior (7+ years)</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🐕</div>
            <p className="text-gray-600 text-lg">No pets match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterSpecies('all')
                setFilterAge('all')
              }}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Showing <span className="font-semibold text-gray-800">{filteredPets.length}</span> pets
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  {pet.image ? (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Available
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <span className="text-6xl">🐾</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {pet.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600">
                        <span className="font-semibold">Species:</span> {pet.species}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Breed:</span> {pet.breed}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Age:</span> {pet.age} years
                      </p>
                      {pet.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {pet.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleAdopt(pet.id)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                      Adopt Now 🐾
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BrowsePets

