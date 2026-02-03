import React, { useState, useEffect } from 'react'
import { adoptionApi } from '../../api/adoptionApi'
import DataTable from './DataTable'
import ConfirmDialog from './ConfirmDialog'

// Error boundary to prevent blank page crashes
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-600 text-center mt-6">Something went wrong.</div>
    }
    return this.props.children
  }
}

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
  const [selectedAdoption, setSelectedAdoption] = useState(null)

  // Fetch adoptions whenever filter changes
  useEffect(() => {
    fetchAdoptions()
  }, [filterStatus])

  const fetchAdoptions = async () => {
    try {
      setLoading(true)
      const { adoptions } = await adoptionApi.getAll(1, 100, {
        status: filterStatus === 'All' ? '' : filterStatus,
      })
      setAdoptions(adoptions || [])
      setError('')
    } catch (err) {
      console.error(err)
      setError('Failed to load adoption applications')
    } finally {
      setLoading(false)
    }
  }

  // Open confirm dialog for status change
  const handleStatusClick = (adoptionId, newStatus) => {
    setConfirmDialog({
      isOpen: true,
      adoptionId,
      newStatus,
    })
  }

  // Confirm approve/reject
  const handleConfirmStatus = async () => {
    setProcessingId(confirmDialog.adoptionId)
    try {
      await adoptionApi.updateStatus(
        confirmDialog.adoptionId,
        confirmDialog.newStatus
      )

      setAdoptions((prev) =>
        prev.map((a) =>
          a.id === confirmDialog.adoptionId
            ? { ...a, status: confirmDialog.newStatus }
            : a
        )
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status')
    } finally {
      setProcessingId(null)
      setConfirmDialog({ isOpen: false })
    }
  }

  const columns = [
    {
      key: 'fullName',
      label: 'Applicant Name',
    },
    {
      key: 'email',
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
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : status === 'Approved'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Applied On',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ]

  return (
    <div>
      {/* Error message */}
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
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === status
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Adoption Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Adoption Applications
        </h2>

        <DataTable
          columns={columns}
          data={adoptions}
          loading={loading}
          onAction={(adoption) => (
            <div className="flex gap-2">
              {/* View button */}
              <button
                onClick={() => setSelectedAdoption(adoption)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                View
              </button>

              {/* Approve/Reject only when Pending */}
              {adoption.status === 'Pending' && (
                <>
                  <button
                    onClick={() =>
                      handleStatusClick(adoption.id, 'Approved')
                    }
                    disabled={processingId === adoption.id}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleStatusClick(adoption.id, 'Rejected')
                    }
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

      {/* Confirm Dialog for Approve/Reject */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={`${confirmDialog.newStatus} Adoption`}
        message={`Are you sure you want to mark this adoption as ${confirmDialog.newStatus.toLowerCase()}?`}
        confirmText="Confirm"
        isLoading={processingId === confirmDialog.adoptionId}
        onConfirm={handleConfirmStatus}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />

      {/* View Details Modal */}
      {selectedAdoption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Adoption Details</h2>
            <div className="space-y-2 text-left">
              <p><strong>Name:</strong> {selectedAdoption.fullName}</p>
              <p><strong>Email:</strong> {selectedAdoption.email}</p>
              <p><strong>Phone:</strong> {selectedAdoption.phone}</p>
              <p><strong>Address:</strong> {selectedAdoption.address}</p>
              <p><strong>Reason:</strong> {selectedAdoption.reason}</p>
              <p><strong>Status:</strong> {selectedAdoption.status}</p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() => setSelectedAdoption(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdoptionManagement
