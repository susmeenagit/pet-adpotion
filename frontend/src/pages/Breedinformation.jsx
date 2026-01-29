import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const BreedInformation = () => {
  const [selectedBreed, setSelectedBreed] = useState(null)
  const [selectedSpecies, setSelectedSpecies] = useState('Dog')

  const breeds = {
    Dog: [
      {
        name: 'Golden Retriever',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
        characteristics: 'Friendly, intelligent, devoted, excellent swimmers',
        lifespan: '10-12 years',
        temperament: 'Outgoing, even-tempered, trusting',
        sizeWeight: '55-75 lbs',
        energy: '⭐⭐⭐⭐ High',
        grooming: 'High - Daily brushing needed',
        trainingLevel: 'Easy - Very intelligent',
        suitability: 'Families, first-time owners, active households',
      },
      {
        name: 'Labrador Retriever',
        image: 'https://images.unsplash.com/photo-1534361960057-19889dbdf1bb?w=400&h=300&fit=crop',
        characteristics: 'Outgoing, even-tempered, gentle, athletic',
        lifespan: '10-14 years',
        temperament: 'Friendly, obedient, eager to please',
        sizeWeight: '55-80 lbs',
        energy: '⭐⭐⭐⭐ High',
        grooming: 'Moderate - Weekly brushing',
        trainingLevel: 'Easy - Quick learners',
        suitability: 'Service dogs, families, active people',
      },
    ],
    Cat: [
      {
        name: 'Persian',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
        characteristics: 'Gentle, quiet, affectionate, calm',
        lifespan: '12-17 years',
        temperament: 'Sweet, docile, loves routine',
        sizeWeight: '7-13 lbs',
        energy: '⭐⭐ Low',
        grooming: 'Very High - Daily grooming required',
        trainingLevel: 'Moderate - Independent',
        suitability: 'Quiet homes, single owners, apartments',
      },
      {
        name: 'Siamese',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
        characteristics: 'Social, vocal, active, intelligent',
        lifespan: '15-20 years',
        temperament: 'Playful, demanding attention, vocal',
        sizeWeight: '6-10 lbs',
        energy: '⭐⭐⭐⭐ High',
        grooming: 'Low - Minimal grooming',
        trainingLevel: 'Moderate - Can be trained',
        suitability: 'Active households, interactive owners',
      },
    ],
    Rabbit: [
      {
        name: 'Holland Lop',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
        characteristics: 'Friendly, gentle, playful, compact',
        lifespan: '7-12 years',
        temperament: 'Docile, curious, sociable',
        sizeWeight: '2-4 lbs',
        energy: '⭐⭐⭐ Moderate',
        grooming: 'Moderate - Weekly brushing',
        trainingLevel: 'Easy - Can use litter box naturally',
        suitability: 'Families, children, apartments',
      },
      {
        name: 'Angora',
        image: 'https://images.unsplash.com/photo-1459262838948-3e416b11c5b6?w=400&h=300&fit=crop',
        characteristics: 'Calm, gentle, fluffy, docile',
        lifespan: '7-12 years',
        temperament: 'Quiet, gentle, requires patience',
        sizeWeight: '5-7 lbs',
        energy: '⭐⭐ Low',
        grooming: 'Very High - Daily brushing required',
        trainingLevel: 'Moderate - Peaceful nature',
        suitability: 'Quiet homes, patient owners',
      },
    ],
  }

  const allBreeds = breeds[selectedSpecies] || []

  const StatBar = ({ label, level }) => (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-purple-600">{level}</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          🐾 Breed Information
        </h1>

        {/* Species Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex space-x-2">
            {Object.keys(breeds).map((species) => (
              <button
                key={species}
                onClick={() => {
                  setSelectedSpecies(species)
                  setSelectedBreed(null)
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedSpecies === species
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {species === 'Dog' ? '🐕' : species === 'Cat' ? '🐱' : '🐰'} {species}
              </button>
            ))}
          </div>
        </div>

        {/* Breed Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allBreeds.map((breed, index) => (
            <div
              key={index}
              onClick={() => setSelectedBreed(breed)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{breed.name}</h3>
                <p className="text-sm text-gray-600">{breed.characteristics}</p>
                <p className="text-xs text-purple-600 mt-2 font-semibold">Lifespan: {breed.lifespan}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Breed Detail Section */}
        {selectedBreed && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <button
              onClick={() => setSelectedBreed(null)}
              className="text-purple-600 hover:text-purple-700 font-semibold mb-4"
            >
              ← Back to Breeds
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={selectedBreed.image}
                  alt={selectedBreed.name}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">{selectedBreed.name}</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Temperament</p>
                    <p className="text-gray-800">{selectedBreed.temperament}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Characteristics</p>
                    <p className="text-gray-800">{selectedBreed.characteristics}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Lifespan</p>
                      <p className="text-gray-800">{selectedBreed.lifespan}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Size/Weight</p>
                      <p className="text-gray-800">{selectedBreed.sizeWeight}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <StatBar label="Energy Level" level={selectedBreed.energy} />
                  <StatBar label="Grooming Needs" level={selectedBreed.grooming} />
                  <StatBar label="Training Difficulty" level={selectedBreed.trainingLevel} />
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Best For</p>
                    <p className="text-sm text-gray-600">{selectedBreed.suitability}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default BreedInformation





