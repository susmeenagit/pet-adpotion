import { useState, useEffect } from 'react'
import UserSidebar from '../../components/UserSidebar'
import api from '../../services/api'

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalWalks: 0,
    totalDistance: 0,
    avgWalkDuration: 0,
    mealsFed: 0,
    vetVisits: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      // Mock data for now - replace with actual API call
      setAnalytics({
        totalWalks: 45,
        totalDistance: 120,
        avgWalkDuration: 35,
        mealsFed: 180,
        vetVisits: 3,
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <UserSidebar />
      
      <div className="flex-1 ml-72 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your pet's activities and health metrics</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Total Walks</span>
                <span className="text-2xl">🚶</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{analytics.totalWalks}</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Total Distance</span>
                <span className="text-2xl">📏</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{analytics.totalDistance} km</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Avg Walk Duration</span>
                <span className="text-2xl">⏱️</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{analytics.avgWalkDuration} min</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Meals Fed</span>
                <span className="text-2xl">🍽️</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{analytics.mealsFed}</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Vet Visits</span>
                <span className="text-2xl">🏥</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{analytics.vetVisits}</p>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Activity Trends</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart visualization will appear here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics

