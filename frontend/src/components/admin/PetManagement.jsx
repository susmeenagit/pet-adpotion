import { useState, useEffect } from 'react'
import { petApi } from '../../api/petApi'
import PetForm from './PetForm'
import ConfirmDialog from './ConfirmDialog'

const PetManagement = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    petId: null,
    petName: '',
  })
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      setLoading(true)
      const { pets: petData } = await petApi.getAll(1, 100)
      setPets(petData || [])
      setError('')
    } catch (err) {
      console.error('Failed to fetch pets:', err)
      setError('Failed to load pets')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClick = () => {
    setSelectedPet(null)
    setShowForm(true)
  }

  const handleEditClick = (pet) => {
    setSelectedPet(pet)
    setShowForm(true)
  }

  const handleDeleteClick = (pet) => {
    setConfirmDialog({
      isOpen: true,
      petId: pet.id,
      petName: pet.name,
    })
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setSelectedPet(null)
    fetchPets()
  }

  const handleConfirm = async () => {
    setProcessingId(confirmDialog.petId)
    try {
      await petApi.delete(confirmDialog.petId)
      setPets(pets.filter((p) => p.id !== confirmDialog.petId))
      setConfirmDialog({ isOpen: false })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete pet')
    } finally {
      setProcessingId(null)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading pets...</p>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Pet Management</h2>
          <button
            onClick={handleCreateClick}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
          >
            + Add New Pet
          </button>
        </div>

        {/* Pet Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedPet ? 'Edit Pet' : 'Create New Pet'}
                </h3>
              </div>
              <div className="p-6">
                <PetForm
                  pet={selectedPet}
                  onSuccess={handleFormSuccess}
                  onClose={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Pets Grid */}
        {pets.length === 0 ? (
          <p className="text-center text-gray-600 py-12">No pets found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={
                      pet.image || 'https://via.placeholder.com/300x200?text=No+Image'
                    }
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {pet.name}
                  </h3>
                  <div className="space-y-1 mb-4 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Species:</span> {pet.species}
                    </p>
                    <p>
                      <span className="font-semibold">Breed:</span> {pet.breed}
                    </p>
                    <p>
                      <span className="font-semibold">Age:</span> {pet.age}{' '}
                      {pet.ageUnit}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(pet)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                      disabled={processingId === pet.id}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(pet)}
                      disabled={processingId === pet.id}
                      className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      {processingId === pet.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Pet"
        message={`Are you sure you want to delete ${confirmDialog.petName}? This action cannot be undone.`}
        confirmText="Delete"
        isDanger
        isLoading={processingId === confirmDialog.petId}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />
    </div>
  )
}

export default PetManagement
