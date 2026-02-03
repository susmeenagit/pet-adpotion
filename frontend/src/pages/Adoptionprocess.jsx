import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AdoptionProcess = () => {
  const steps = [
    {
      number: 1,
      title: 'Choose a Pet',
      description: 'Browse through our collection of pets and find the one that matches your lifestyle and preferences.',
      icon: '',
    },
    {
      number: 2,
      title: 'Submit Adoption Request',
      description: 'Fill out the adoption application form with your details and reason for adoption.',
      icon: '',
    },
    {
      number: 3,
      title: 'Verification Process',
      description: 'Our team will review your application and may contact you for additional information.',
      icon: '',
    },
    {
      number: 4,
      title: 'Meet the Pet',
      description: 'Schedule a visit to meet your potential new family member in person.',
      icon: '',
    },
    {
      number: 5,
      title: 'Adoption Completed',
      description: 'Complete the final paperwork and welcome your new pet home!',
      icon: '',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Adoption Process
        </h1>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-full bg-purple-200"></div>
              )}

              <div className="flex items-start space-x-6">
                {/* Step Number Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl">{step.icon}</span>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Start?
          </h3>
          <p className="text-gray-600 mb-6">
            Begin your adoption journey by browsing our available pets.
          </p>
          <a
            href="/browse-pets"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Browse Pets
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdoptionProcess
