import { Link } from 'react-router-dom'

const PetCard = ({ pet }) => {
  const getVaccinationBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Pet Image */}
      <div className="h-64 bg-gray-200 overflow-hidden">
        <img
          src={pet.image || 'https://via.placeholder.com/400x300?text=Pet+Image'}
          alt={pet.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Pet Info */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{pet.name}</h3>
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p>
            <span className="font-medium">Age:</span> {pet.age} {pet.ageUnit}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {pet.gender}
          </p>
          <p>
            <span className="font-medium">Breed:</span> {pet.breed}
          </p>
          <p>
            <span className="font-medium">Species:</span> {pet.species}
          </p>
        </div>

        {/* Vaccination Badge */}
        <div className="mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getVaccinationBadge(
              pet.vaccinationStatus
            )}`}
          >
            {pet.vaccinationStatus === 'Completed' ? '✅' : '🟡'} {pet.vaccinationStatus}
          </span>
        </div>

        <Link
          to={`/pet-details/${pet.id}`}
          className="block w-full bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default PetCard
