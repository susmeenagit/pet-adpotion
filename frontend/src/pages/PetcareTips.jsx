import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PetCareTips = () => {
  const careSections = [
    {
      title: 'Nutrition',
      icon: '🍽️',
      tips: [
        'Feed high-quality pet food appropriate for your pet\'s age and species',
        'Provide fresh water at all times',
        'Avoid feeding human food, especially chocolate, onions, and grapes',
        'Follow feeding guidelines based on your pet\'s size and activity level',
      ],
    },
    {
      title: 'Grooming',
      icon: '✨',
      tips: [
        'Regular brushing helps maintain healthy coat and reduces shedding',
        'Bathe your pet as needed (frequency depends on species and coat type)',
        'Trim nails regularly to prevent overgrowth',
        'Clean ears and teeth regularly to prevent infections',
      ],
    },
    {
      title: 'Training',
      icon: '🎓',
      tips: [
        'Start training early with positive reinforcement techniques',
        'Be patient and consistent with commands',
        'Socialize your pet with other animals and people',
        'Provide mental stimulation through toys and activities',
      ],
    },
    {
      title: 'Health Care',
      icon: '🏥',
      tips: [
        'Schedule regular veterinary check-ups (at least once a year)',
        'Keep vaccinations up to date',
        'Watch for signs of illness and consult a vet if concerned',
        'Maintain a healthy weight through proper diet and exercise',
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Pet Care Tips
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careSections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-4xl">{section.icon}</span>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start text-gray-600">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            General Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-start">
              <span className="text-purple-600 mr-2 mt-1">💡</span>
              <span>Provide a safe and comfortable living environment</span>
            </div>
            <div className="flex items-start">
              <span className="text-purple-600 mr-2 mt-1">💡</span>
              <span>Spend quality time with your pet daily</span>
            </div>
            <div className="flex items-start">
              <span className="text-purple-600 mr-2 mt-1">💡</span>
              <span>Keep identification tags and microchips updated</span>
            </div>
            <div className="flex items-start">
              <span className="text-purple-600 mr-2 mt-1">💡</span>
              <span>Create a routine for feeding, exercise, and rest</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PetCareTips
