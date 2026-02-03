import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PetCareTips = () => {
  const [selectedSpecies, setSelectedSpecies] = useState('Dog')

  const dogTips = {
    nutrition: [
      'Feed high-quality dog food appropriate for age and size',
      'Provide fresh water at all times',
      'Adult dogs: 1-2 meals per day',
      'Puppies: 3-4 meals per day',
      'Avoid chocolate, grapes, onions, and xylitol',
      'Consult vet for special dietary needs',
    ],
    grooming: [
      'Brush coat 2-3 times per week (daily for long-haired)',
      'Bathe every 4-6 weeks or as needed',
      'Trim nails every 4-8 weeks',
      'Clean ears weekly to prevent infections',
      'Brush teeth daily for dental health',
      'Professional grooming every 6-8 weeks',
    ],
    exercise: [
      'Most dogs need 30-60 minutes of exercise daily',
      'Puppies: shorter, frequent play sessions',
      'Senior dogs: gentle, low-impact activities',
      'Mental stimulation through games and toys',
      'Swimming is excellent for joints',
      'Avoid intense exercise after eating',
    ],
    health: [
      'Annual vet check-ups for adult dogs',
      'Semi-annual visits for puppies and seniors',
      'Keep vaccinations current',
      'Monthly flea and tick prevention',
      'Watch for signs of illness or injury',
      'Emergency vet contact info readily available',
    ],
    training: [
      'Start training early with positive reinforcement',
      'Use treats and praise for motivation',
      'Keep training sessions short (5-10 minutes)',
      'Socialize puppies with people and animals',
      'Be consistent with commands',
      'Professional training for behavioral issues',
    ],
  }

  const catTips = {
    nutrition: [
      'Feed high-quality commercial cat food',
      'Cats are carnivores - need meat proteins',
      'Adult cats: 1-2 meals per day',
      'Kittens: 3-4 meals per day',
      'Provide fresh, clean water always',
      'Some cats prefer wet food or mixed diet',
    ],
    grooming: [
      'Brush long-haired cats daily',
      'Short-haired cats: 2-3 times weekly',
      'Trim nails every 2-3 weeks',
      'Clean ears weekly',
      'Dental care is important',
      'Bathe only when necessary (most cats self-groom)',
    ],
    exercise: [
      'Interactive play sessions 10-15 minutes, 2-3 times daily',
      'Provide climbing structures and cat trees',
      'Use toys like feather wands and balls',
      'Window perches for bird watching',
      'Hide treats for hunting simulation',
      'Laser pointers (with caution)',
    ],
    health: [
      'Annual vet visits for healthy adult cats',
      'Semi-annual visits for seniors (7+ years)',
      'Litter box maintenance crucial for early illness detection',
      'Keep vaccinations current',
      'Monthly flea and tick prevention',
      'Weight management to prevent obesity',
    ],
    training: [
      'Cats can be trained with patience and treats',
      'Use clicker training for effectiveness',
      'Provide scratching posts to save furniture',
      'Use positive reinforcement only',
      'Litter box training usually natural',
      'Respect their independence',
    ],
  }

  const rabbitTips = {
    nutrition: [
      'Unlimited timothy hay (main diet)',
      'Fresh vegetables daily (leafy greens)',
      'High-quality pellets in limited amounts',
      'Fresh water always available',
      'Avoid iceberg lettuce and high-sugar treats',
      'Gradual diet changes to prevent digestive issues',
    ],
    grooming: [
      'Brush long-haired rabbits daily',
      'Short-haired rabbits: 2-3 times weekly',
      'Check nails every 4-6 weeks',
      'Clean ears regularly',
      'Bathe only in emergencies (spot clean instead)',
      'Professional grooming for mats',
    ],
    exercise: [
      'At least 3+ hours of free-roaming time daily',
      'Large enclosure or bunny-proofed room',
      'Tunnels and hiding spots for enrichment',
      'Chew toys for dental health',
      'Socialize for bonding',
      'Prevent stress with quiet environment',
    ],
    health: [
      'Annual vet check-ups with rabbit specialist',
      'Watch for signs of GI stasis',
      'Maintain proper temperature (60-75°F)',
      'Dental checks important (teeth grow continuously)',
      'Keep enclosure clean to prevent infections',
      'Emergency vet for urgent issues',
    ],
    training: [
      'Rabbits can use litter boxes naturally',
      'Train with treats and positive reinforcement',
      'Establish routine for comfort',
      'Gentle handling from young age',
      'Learn to read body language',
      'Spay/neuter for better behavior',
    ],
  }

  const getTips = () => {
    switch (selectedSpecies) {
      case 'Cat':
        return catTips
      case 'Rabbit':
        return rabbitTips
      default:
        return dogTips
    }
  }

  const tips = getTips()

  const TipCard = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start text-gray-600">
            <span className="text-purple-600 mr-3 mt-1 font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Pet Care Tips & Guides
        </h1>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex space-x-2">
            {['Dog', 'Cat', 'Rabbit'].map((species) => (
              <button
                key={species}
                onClick={() => setSelectedSpecies(species)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedSpecies === species
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {species}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <TipCard title="Nutrition" icon="" items={tips.nutrition} />
          <TipCard title="Grooming" icon="" items={tips.grooming} />
          <TipCard title="Exercise" icon="" items={tips.exercise} />
          <TipCard title="Health" icon="" items={tips.health} />
          <TipCard title="Training" icon="" items={tips.training} />

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">Pro Tips</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start text-gray-600">
                <span className="text-purple-600 mr-3 mt-1 font-bold">★</span>
                <span>Establish consistent routines for your pet</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="text-purple-600 mr-3 mt-1 font-bold">★</span>
                <span>Regular vet visits prevent major health issues</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="text-purple-600 mr-3 mt-1 font-bold">★</span>
                <span>Quality food and exercise extend lifespan</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="text-purple-600 mr-3 mt-1 font-bold">★</span>
                <span>Mental stimulation prevents behavioral issues</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="text-purple-600 mr-3 mt-1 font-bold">★</span>
                <span>Build strong bond through quality time</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">Emergency Signs</h3>
              <p className="text-sm text-blue-800">
                Contact a vet immediately if your pet shows: difficulty breathing, seizures, severe bleeding, loss of consciousness, or sudden behavioral changes.
              </p>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
              <h3 className="font-semibold text-green-900 mb-2">Preventive Care</h3>
              <p className="text-sm text-green-800">
                Regular check-ups, vaccinations, parasite prevention, and dental care can prevent 80% of health problems.
              </p>
            </div>
            <div className="p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
              <h3 className="font-semibold text-purple-900 mb-2">Nutrition Balance</h3>
              <p className="text-sm text-purple-800">
                Consult your vet about the right balance of proteins, fats, and carbohydrates for your pet's age and lifestyle.
              </p>
            </div>
            <div className="p-4 bg-orange-50 border-l-4 border-orange-600 rounded">
              <h3 className="font-semibold text-orange-900 mb-2">Behavioral Training</h3>
              <p className="text-sm text-orange-800">
                Early socialization and consistent training create well-behaved pets and reduce stress for both pet and owner.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PetCareTips
