const HealthCard = ({ pet }) => {
  const vaccinations = [
    { name: 'DHPP', date: '2023-01-15', nextDue: '2024-01-15', status: 'up-to-date' },
    { name: 'Rabies', date: '2023-01-15', nextDue: '2024-01-15', status: 'up-to-date' },
  ]

  const medications = [
    { name: 'Flea Prevention', frequency: 'Monthly', lastGiven: '2023-06-01', nextDue: '2023-07-01' },
    { name: 'Heartworm Prevention', frequency: 'Monthly', lastGiven: '2023-06-01', nextDue: '2023-07-01' },
  ]

  const vetVisits = [
    { date: '2023-05-15', reason: 'Annual Checkup', vet: 'Dr. Smith' },
    { date: '2023-03-10', reason: 'Vaccination', vet: 'Dr. Smith' },
  ]

  return (
    <div className="space-y-6">
      {/* Vaccination Records */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Vaccination Records</h3>
        <div className="space-y-3">
          {vaccinations.map((vaccine, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">{vaccine.name}</p>
                <p className="text-sm text-gray-600">Last: {new Date(vaccine.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Next due: {new Date(vaccine.nextDue).toLocaleDateString()}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                {vaccine.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Medications</h3>
        <div className="space-y-3">
          {medications.map((med, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-800">{med.name}</p>
              <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
              <p className="text-sm text-gray-600">Last given: {new Date(med.lastGiven).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Next due: {new Date(med.nextDue).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vet Visits */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Vet Visit History</h3>
        <div className="space-y-3">
          {vetVisits.map((visit, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-800">{visit.reason}</p>
              <p className="text-sm text-gray-600">Date: {new Date(visit.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Vet: {visit.vet}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Health Notes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Health Notes</h3>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          rows="4"
          placeholder="Add health notes or observations..."
        />
        <button className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          Save Notes
        </button>
      </div>
    </div>
  )
}

export default HealthCard

