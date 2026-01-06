import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PetCard from '../components/PetCard'
import { initializeData, getPets } from '../data/dummyData'

const BrowsePets = () => {
  const [pets, setPets] = useState([])
  const [filteredPets, setFilteredPets] = useState([])
  const [filters, setFilters] = useState({
    species: '',
    gender: '',
    age: '',
  })

  useEffect(() => {
    initializeData()
    const allPets = getPets()
    setPets(allPets)
    setFilteredPets(allPets)
  }, [])

  useEffect(() => {
    let filtered = [...pets]

    if (filters.species) {
      filtered = filtered.filter((pet) => pet.species === filters.species)
    }
    if (filters.gender) {
      filtered = filtered.filter((pet) => pet.gender === filters.gender)
    }
    if (filters.age) {
      const maxAge = parseInt(filters.age)
      filtered = filtered.filter((pet) => {
        const ageInMonths =
          pet.ageUnit === 'years' ? pet.age * 12 : pet.age
        return ageInMonths <= maxAge
      })
    }

    setFilteredPets(filtered)
  }, [filters, pets])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Browse Pets
        </h1>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Species Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Species
              </label>
              <select
                value={filters.species}
                onChange={(e) => handleFilterChange('species', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
              >
                <option value="">All Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Age Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Age (months)
              </label>
              <input
                type="number"
                value={filters.age}
                onChange={(e) => handleFilterChange('age', e.target.value)}
                placeholder="Enter max age"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found <span className="font-semibold text-purple-600">{filteredPets.length}</span>{' '}
            {filteredPets.length === 1 ? 'pet' : 'pets'}
          </p>
        </div>

        {/* Pets Grid */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-gray-600">
              No pets found matching your criteria.
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default BrowsePets
