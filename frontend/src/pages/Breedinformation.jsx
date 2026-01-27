import { useState } from 'react'
import Navbar from '../components/Navbar'

const BreedInformation = () => {
  const [selectedBreed, setSelectedBreed] = useState(null)

  const breeds = {
    Dog: [
      {
        name: 'Golden Retriever',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
        characteristics: 'Friendly, intelligent, and devoted. Great with families and children.',
        lifespan: '10-12 years',
        environment: 'Needs regular exercise, large yard preferred, good for families',
      },
      {
        name: 'Labrador',
        image: 'https://images.unsplash.com/photo-1534361960057-19889dbdf1bb?w=400&h=300&fit=crop',
        characteristics: 'Outgoing, even-tempered, and gentle. Very active and friendly.',
        lifespan: '10-14 years',
        environment: 'Active family, needs daily exercise, adaptable to various living spaces',
      },
      {
        name: 'German Shepherd',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
        characteristics: 'Confident, courageous, and smart. Excellent working and family dog.',
        lifespan: '9-13 years',
        environment: 'Needs space and exercise, best with experienced owners, active lifestyle',
      },
    ],
    Cat: [
      {
        name: 'Persian',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
        characteristics: 'Gentle, quiet, and sweet. Calm and affectionate companion.',
        lifespan: '12-17 years',
        environment: 'Indoor only, quiet home, minimal exercise needs',
      },
      {
        name: 'Siamese',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
        characteristics: 'Social, vocal, and active. Very intelligent and playful.',
        lifespan: '15-20 years',
        environment: 'Indoor with play areas, social environment, interactive toys',
      },
      {
        name: 'Maine Coon',
        image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=300&fit=crop',
        characteristics: 'Gentle, friendly, and intelligent. Large and friendly.',
        lifespan: '12-15 years',
        environment: 'Spacious home, climbing opportunities, regular grooming needed',
      },
    ],
    Rabbit: [
      {
        name: 'Holland Lop',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
        characteristics: 'Friendly, gentle, and playful. Great for families with children.',
        lifespan: '7-12 years',
        environment: 'Indoor housing, space to hop, safe from predators',
      },
      {
        name: 'Angora',
        image: 'https://images.unsplash.com/photo-1459262838948-3e416b11c5b6?w=400&h=300&fit=crop',
        characteristics: 'Calm, gentle, and docile. Requires regular grooming.',
        lifespan: '7-12 years',
        environment: 'Indoor housing, regular grooming area, calm environment',
      },
      {
        name: 'Rex',
        image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop',
        characteristics: 'Active, playful, and curious. Soft velvety fur.',
        lifespan: '5-8 years',
        environment: 'Spacious enclosure, exercise area, mental stimulation',
      },
    ],
  }

  const allBreeds = [...breeds.Dog, ...breeds.Cat, ...breeds.Rabbit]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Breed Information
        </h1>

        {/* Breed Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {allBreeds.map((breed, index) => (
            <div
              key={index}
              onClick={() => setSelectedBreed(breed)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{breed.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Breed Detail Section */}
        {selectedBreed && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={selectedBreed.image}
                  alt={selectedBreed.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {selectedBreed.name}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Characteristics
                    </h3>
                    <p className="text-gray-600">{selectedBreed.characteristics}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Average Lifespan
                    </h3>
                    <p className="text-gray-600">{selectedBreed.lifespan}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Suitable Environment
                    </h3>
                    <p className="text-gray-600">{selectedBreed.environment}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBreed(null)}
                  className="mt-6 text-purple-600 hover:text-purple-700 font-medium"
                >
                  ← Back to Breeds
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BreedInformation





