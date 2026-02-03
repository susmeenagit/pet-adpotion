import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const VaccinationSchedule = () => {
  const [activeTab, setActiveTab] = useState('Dog')
  const [petAge, setPetAge] = useState(8)
  const [ageUnit, setAgeUnit] = useState('weeks')

  const convertToWeeks = (age, unit) => {
    if (unit === 'weeks') return age
    if (unit === 'months') return age * 4.3
    if (unit === 'years') return age * 52
    return age
  }

  const dogVaccinations = [
    {
      week: 6,
      vaccine: 'DHPP',
      purpose: 'Distemper, Hepatitis, Parvovirus, Parainfluenza',
      booster: '3-4 weeks',
    },
    {
      week: 10,
      vaccine: 'DHPP + Rabies',
      purpose: 'Full protection + Rabies',
      booster: '3-4 weeks',
    },
    {
      week: 14,
      vaccine: 'DHPP',
      purpose: 'Final puppy booster',
      booster: '1 year later',
    },
    {
      week: 52,
      vaccine: 'DHPP + Rabies',
      purpose: 'Annual booster',
      booster: 'Every 1-3 years',
    },
  ]

  const catVaccinations = [
    {
      week: 6,
      vaccine: 'FVRCP',
      purpose: 'Rhinotracheitis, Calicivirus, Panleukopenia',
      booster: '3-4 weeks',
    },
    {
      week: 10,
      vaccine: 'FVRCP + Rabies',
      purpose: 'Full protection + Rabies',
      booster: '3-4 weeks',
    },
    {
      week: 14,
      vaccine: 'FVRCP',
      purpose: 'Final kitten booster',
      booster: '1 year later',
    },
    {
      week: 52,
      vaccine: 'FVRCP + Rabies',
      purpose: 'Annual booster',
      booster: 'Every 1-3 years',
    },
  ]

  const rabbitVaccinations = [
    {
      week: 5,
      vaccine: 'Myxomatosis',
      purpose: 'Myxomatosis protection',
      booster: '4-5 weeks',
    },
    {
      week: 10,
      vaccine: 'RHD',
      purpose: 'Rabbit Hemorrhagic Disease',
      booster: '24 weeks',
    },
    {
      week: 26,
      vaccine: 'Combined Myxo + RHD',
      purpose: 'Combined booster',
      booster: 'Annually',
    },
  ]

  const getVaccinations = () => {
    switch (activeTab) {
      case 'Cat':
        return catVaccinations
      case 'Rabbit':
        return rabbitVaccinations
      default:
        return dogVaccinations
    }
  }

  const currentWeeks = convertToWeeks(petAge, ageUnit)
  const vaccinations = getVaccinations()
  const upcomingVaccines = vaccinations.filter(
    (v) => currentWeeks >= v.week - 2 && currentWeeks <= v.week + 2
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          💉 Vaccination Schedule
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

        {/* Pet Age Calculator */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
             Calculate Your Pet's Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Age
              </label>
              <input
                type="number"
                value={petAge}
                onChange={(e) => setPetAge(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                value={ageUnit}
                onChange={(e) => setAgeUnit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="w-full p-3 bg-purple-100 rounded-lg">
                <p className="text-sm text-gray-600">Current Age</p>
                <p className="text-lg font-bold text-purple-800">
                  {currentWeeks.toFixed(1)} weeks
                </p>
              </div>
            </div>
          </div>

          {upcomingVaccines.length > 0 && (
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
              <p className="text-green-900 font-semibold">
                ✓ Upcoming Vaccinations:
              </p>
              {upcomingVaccines.map((vaccine, idx) => (
                <p key={idx} className="text-sm text-green-800 mt-1">
                  • {vaccine.vaccine} - {vaccine.purpose}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Vaccination Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Vaccine
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Purpose
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Next Booster
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vaccinations.map((vaccination, index) => {
                  const isUpcoming =
                    currentWeeks >= vaccination.week - 2 &&
                    currentWeeks <= vaccination.week + 2
                  return (
                    <tr
                      key={index}
                      className={
                        isUpcoming ? 'bg-yellow-50' : 'hover:bg-gray-50'
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vaccination.week} weeks
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {vaccination.vaccine}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {vaccination.purpose}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-purple-600">
                        {vaccination.booster}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
               Important Notes
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✓ Always consult with a veterinarian</li>
              <li>✓ Vaccination schedules may vary by location</li>
              <li>✓ Some vaccines require multiple doses</li>
              <li>✓ Record-keeping is essential</li>
              <li>✓ New pets may need catch-up vaccinations</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-900 mb-3">
               After Vaccination
            </h3>
            <ul className="space-y-2 text-sm text-orange-800">
              <li>• Some mild soreness is normal</li>
              <li>• Keep your pet calm for 24 hours</li>
              <li>• Monitor for allergic reactions</li>
              <li>• Contact vet if severe reactions occur</li>
              <li>• Keep vaccination records handy</li>
            </ul>
          </div>
        </div>

        {/* Print Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-lg"
          >
             Print Schedule
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default VaccinationSchedule
