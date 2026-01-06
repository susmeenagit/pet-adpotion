import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const VaccinationSchedule = () => {
  const [activeTab, setActiveTab] = useState('Dog')

  const dogVaccinations = [
    {
      age: '6-8 weeks',
      vaccine: 'DHPP',
      purpose: 'Distemper, Hepatitis, Parvovirus, Parainfluenza',
    },
    {
      age: '10-12 weeks',
      vaccine: 'DHPP + Rabies',
      purpose: 'Distemper, Hepatitis, Parvovirus, Parainfluenza, Rabies',
    },
    {
      age: '14-16 weeks',
      vaccine: 'DHPP',
      purpose: 'Distemper, Hepatitis, Parvovirus, Parainfluenza',
    },
    {
      age: '1 year',
      vaccine: 'DHPP + Rabies Booster',
      purpose: 'Annual booster for all core vaccines',
    },
  ]

  const catVaccinations = [
    {
      age: '6-8 weeks',
      vaccine: 'FVRCP',
      purpose: 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia',
    },
    {
      age: '10-12 weeks',
      vaccine: 'FVRCP + Rabies',
      purpose: 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia, Rabies',
    },
    {
      age: '14-16 weeks',
      vaccine: 'FVRCP',
      purpose: 'Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia',
    },
    {
      age: '1 year',
      vaccine: 'FVRCP + Rabies Booster',
      purpose: 'Annual booster for all core vaccines',
    },
  ]

  const rabbitVaccinations = [
    {
      age: '5-7 weeks',
      vaccine: 'Myxomatosis',
      purpose: 'Protection against Myxomatosis',
    },
    {
      age: '10-12 weeks',
      vaccine: 'RHD (Rabbit Hemorrhagic Disease)',
      purpose: 'Protection against Rabbit Hemorrhagic Disease',
    },
    {
      age: '6 months',
      vaccine: 'Combined Myxomatosis + RHD',
      purpose: 'Combined protection booster',
    },
    {
      age: '1 year',
      vaccine: 'Annual Booster',
      purpose: 'Annual booster for Myxomatosis and RHD',
    },
  ]

  const getVaccinations = () => {
    switch (activeTab) {
      case 'Dog':
        return dogVaccinations
      case 'Cat':
        return catVaccinations
      case 'Rabbit':
        return rabbitVaccinations
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Vaccination Schedule
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex space-x-2">
            {['Dog', 'Cat', 'Rabbit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab === 'Dog' ? '🐶' : tab === 'Cat' ? '🐱' : '🐰'} {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Vaccination Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Vaccine Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getVaccinations().map((vaccination, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {vaccination.age}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {vaccination.vaccine}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {vaccination.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This is general information only. Always consult
            with a licensed veterinarian for personalized vaccination schedules based on
            your pet's health and local regulations.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default VaccinationSchedule
