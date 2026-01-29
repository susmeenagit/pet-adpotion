import { useState, useEffect } from 'react'
import { adoptionApi } from '../../api/adoptionApi'
import DataTable from './DataTable'
import ConfirmDialog from './ConfirmDialog'

const AdoptionManagement = () => {
  const [adoptions, setAdoptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterStatus, setFilterStatus] = useState('Pending')
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    adoptionId: null,
    newStatus: '',
  })
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    fetchAdoptions()
  }, [filterStatus])

  const fetchAdoptions = async () => {
    try {
      setLoading(true)
      const { adoptions: adoptionData } = await adoptionApi.getAll(1, 100, {
        status: filterStatus === 'All' ? '' : filterStatus,
      })
      setAdoptions(adoptionData || [])
      setError('')
    } catch (err) {
      console.error('Failed to fetch adoptions:', err)
      setError('Failed to load adoptions')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusClick = (adoptionId, newStatus) => {
    setConfirmDialog({
      isOpen: true,
      adoptionId,
      newStatus,
    })
  }

  const handleConfirm = async () => {
    setProcessingId(confirmDialog.adoptionId)
    try {
      await adoptionApi.updateStatus(confirmDialog.adoptionId, confirmDialog.newStatus)
      setAdoptions(adoptions.map((a) =>
        a.id === confirmDialog.adoptionId
          ? { ...a, status: confirmDialog.newStatus }
          : a
      ))
      setConfirmDialog({ isOpen: false })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update adoption')
    } finally {
      setProcessingId(null)
    }
  }

  const columns = [
    {
      key: 'applicantName',
      label: 'Applicant Name',
    },
    {
      key: 'applicantEmail',
      label: 'Email',
    },
    {
      key: 'petId',
      label: 'Pet ID',
      render: (petId) => `#${petId}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : status === 'Approved'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Applied',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ]

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === status
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {status}
            {status !== 'All' && ` (${adoptions.filter((a) => a.status === status).length})`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Adoption Applications</h2>

        <DataTable
          columns={columns}
          data={adoptions}
          loading={loading}
          onAction={(adoption) => (
            <div className="flex gap-2">
              {adoption.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleStatusClick(adoption.id, 'Approved')}
                    disabled={processingId === adoption.id}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusClick(adoption.id, 'Rejected')}
                    disabled={processingId === adoption.id}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          )}
        />
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={`${confirmDialog.newStatus} Adoption`}
        message={`Are you sure you want to mark this adoption as ${confirmDialog.newStatus.toLowerCase()}?`}
        confirmText="Confirm"
        isLoading={processingId === confirmDialog.adoptionId}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />
    </div>
  )
}

export default AdoptionManagement
