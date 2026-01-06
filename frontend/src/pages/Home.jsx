import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PetCard from '../components/PetCard'
import { initializeData, getPets } from '../data/dummyData'

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([])

  useEffect(() => {
    initializeData()
    const pets = getPets()
    setFeaturedPets(pets.slice(0, 3))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Find Your New Best Friend
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Give a loving home to pets in need. Browse our collection of adorable
              dogs, cats, and rabbits waiting for their forever families.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/browse-pets"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg shadow-lg"
              >
                Browse Pets
              </Link>
              <Link
                to="/adoption-process"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg border-2 border-purple-600"
              >
                How Adoption Works
              </Link>
            </div>
          </div>

          {/* Right: Pet Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop"
                alt="Happy pets"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                <div className="text-3xl mb-2">❤️</div>
                <p className="text-sm font-semibold text-gray-800">100+ Pets</p>
                <p className="text-xs text-gray-600">Looking for homes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Pets Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Featured Pets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/browse-pets"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              View All Pets
            </Link>
          </div>
        </div>
      </div>

      {/* Why Adopt Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Adopt?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Save a Life
              </h3>
              <p className="text-gray-600">
                Give a second chance to pets in need of a loving home
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Perfect Match
              </h3>
              <p className="text-gray-600">
                Find the perfect companion that matches your lifestyle
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Unconditional Love
              </h3>
              <p className="text-gray-600">
                Experience the joy and companionship of a pet
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
