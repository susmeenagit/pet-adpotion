import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adoptionAPI } from '../../services/api'

const MyRequestsManagement = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    fetchRequests()
  }, [filterStatus])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const response = await adoptionAPI.getMyAdoptions()
      // Handle response structure: response.data.data.adoptions or response.data.adoptions
      let allRequests = Array.isArray(response.data?.data?.adoptions) 
        ? response.data.data.adoptions 
        : Array.isArray(response.data?.adoptions)
        ? response.data.adoptions
        : Array.isArray(response.data)
        ? response.data
        : []
      
      // Filter by status if not 'All'
      if (filterStatus !== 'All') {
        allRequests = allRequests.filter(
          req => req?.status?.toLowerCase() === filterStatus.toLowerCase()
        )
      }
      
      setRequests(Array.isArray(allRequests) ? allRequests : [])
      setError('')
    } catch (err) {
      console.error('Failed to fetch requests:', err)
      setError('Failed to load adoption requests')
      setRequests([]) // Ensure requests is always an array
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || ''
    switch (statusLower) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading requests...</p>
      </div>
    )
  }

  if (error && requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchRequests}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Adoption Requests</h2>
        <div className="flex gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-600 mb-4">
            {filterStatus === 'All'
              ? "You haven't made any adoption requests yet."
              : `No ${filterStatus.toLowerCase()} requests found.`}
          </p>
          {filterStatus === 'All' && (
            <button
              onClick={() => navigate('/user/browse-pets')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Browse Pets
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {request.pet?.image && (
                    <img
                      src={request.pet.image}
                      alt={request.pet.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {request.pet?.name || 'Pet'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {request.pet?.species} • {request.pet?.breed}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      Requested on {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                    {request.reason && (
                      <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-3 rounded">
                        <span className="font-semibold">Reason:</span> {request.reason}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm ${getStatusColor(
                    request.status
                  )}`}
                >
                  {request.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyRequestsManagement

