import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserSidebar from '../../components/UserSidebar'
import { adoptionAPI } from '../../services/api'

const MyRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    fetchMyRequests()
  }, [])

  const fetchMyRequests = async () => {
    try {
      const response = await adoptionAPI.getMyAdoptions()
      // Handle response structure: response.data.data.adoptions or response.data.adoptions
      const allRequests = Array.isArray(response.data?.data?.adoptions)
        ? response.data.data.adoptions
        : Array.isArray(response.data?.adoptions)
        ? response.data.adoptions
        : Array.isArray(response.data)
        ? response.data
        : []
      setRequests(allRequests)
    } catch (error) {
      console.error('Error fetching requests:', error)
      setRequests([]) // Ensure it's always an array
    } finally {
      setLoading(false)
    }
  }

  const filteredRequests =
    filter === 'all'
      ? requests
      : requests.filter((req) => req.status?.toLowerCase() === filter.toLowerCase())

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

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase() || ''
    switch (statusLower) {
      case 'approved':
        return '✅'
      case 'rejected':
        return '❌'
      case 'pending':
        return '⏳'
      default:
        return '📋'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <UserSidebar />
      
      <div className="flex-1 ml-72 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Adoption Requests 📋
          </h1>
          <p className="text-gray-600">
            Track the status of your pet adoption applications
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-xl font-medium transition-all capitalize ${
                  filter === status
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All Requests' : status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-600 text-lg mb-4">
              {filter === 'all'
                ? "You haven't made any adoption requests yet."
                : `No ${filter} requests found.`}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => navigate('/user/browse-pets')}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg font-semibold"
              >
                Browse Pets
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      {request.pet?.image && (
                        <img
                          src={request.pet.image}
                          alt={request.pet.name}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {request.pet?.name || 'Pet'}
                        </h3>
                        <p className="text-gray-600">
                          {request.pet?.species} • {request.pet?.breed}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Requested on {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {request.reason && (
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <p className="text-gray-700 text-sm">
                          <span className="font-semibold">Your reason:</span> {request.reason}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-semibold ${getStatusColor(
                        request.status
                      )}`}
                    >
                      <span>{getStatusIcon(request.status)}</span>
                      <span className="capitalize">{request.status}</span>
                    </div>
                  </div>
                </div>
                
                {(request.status?.toLowerCase() === 'approved') && (
                  <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                    <p className="text-green-800 font-medium">
                      🎉 Congratulations! Your adoption request has been approved. Please contact the pet owner to proceed.
                    </p>
                  </div>
                )}
                
                {(request.status?.toLowerCase() === 'rejected') && (
                  <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                    <p className="text-red-800">
                      Unfortunately, your adoption request was not approved. You can browse other available pets.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyRequests

