const PetDetails = ({ pet }) => {
  const adoptionDate = pet.adoptionDate || new Date().toISOString()
  const birthDate = pet.birthDate || new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000).toISOString()
  const age = Math.floor((new Date() - new Date(birthDate)) / (365.25 * 24 * 60 * 60 * 1000))

  const caretakers = [
    { name: 'Esther Howard', email: 'esther.howard@gmail.com', avatar: '👩' },
    { name: 'Guy Hawkins', email: 'guyhawkins@gmail.com', avatar: '👨' },
  ]

  return (
    <div className="space-y-6">
      {/* Appearance */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Appearance and distinctive signs</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {pet.description || `${pet.species} with ${pet.breed} characteristics. Beautiful coat and friendly demeanor.`}
        </p>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Gender</span>
            <span className="font-semibold text-gray-800">{pet.gender || 'Male'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Size</span>
            <span className="font-semibold text-gray-800">{pet.size || 'Medium'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Weight</span>
            <span className="font-semibold text-gray-800">{pet.weight || '22.2 kg'}</span>
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Important Dates</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-semibold text-gray-800">
                {new Date(birthDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-600">{age} years old</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏠</span>
            <div>
              <p className="font-semibold text-gray-800">Adoption Day</p>
              <p className="text-sm text-gray-600">
                {new Date(adoptionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Caretakers */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Caretakers</h3>
        <div className="space-y-4">
          {caretakers.map((caretaker, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                {caretaker.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{caretaker.name}</p>
                <p className="text-xs text-gray-600">{caretaker.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetDetails

