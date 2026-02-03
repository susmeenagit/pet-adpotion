import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'
import StatsCard from '../components/admin/StatsCard'
import UserManagement from '../components/admin/UserManagement'
import PetManagement from '../components/admin/PetManagement'
import AdoptionManagement from '../components/admin/AdoptionManagement'
import { authApi, adminApi } from '../api/authApi'
import { getAuth } from '../utils/localStorage'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { user } = getAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [error, setError] = useState('')
  const [statsFetched, setStatsFetched] = useState(false)

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true)
      const { stats: statsData } = await adminApi.stats.getStats()
      setStats(statsData)
      setStatsFetched(true)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
      setError('Failed to load statistics')
    } finally {
      setStatsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Check if user is admin
    if (!user?.isAdmin) {
      navigate('/')
      return
    }

    // Fetch stats only once
    if (!statsFetched) {
      fetchStats()
    }
  }, [user, navigate, fetchStats, statsFetched])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <AdminHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                icon=""
                label="Total Users"
                value={stats?.totalUsers || 0}
                color="purple"
                loading={statsLoading}
              />
              <StatsCard
                icon=""
                label="Total Pets"
                value={stats?.totalPets || 0}
                color="blue"
                loading={statsLoading}
              />
              <StatsCard
                icon=""
                label="Total Adoptions"
                value={stats?.totalAdoptions || 0}
                color="green"
                loading={statsLoading}
              />
              <StatsCard
                icon=""
                label="Pending"
                value={stats?.adoptionsPending || 0}
                color="orange"
                loading={statsLoading}
              />
            </div>

            {/* Dashboard Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Admin Dashboard</h2>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  You have full administrative privileges. Use the navigation tabs above to manage the platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                    <h3 className="font-semibold text-blue-900 mb-2">👥 User Management</h3>
                    <p className="text-sm text-blue-800">
                      View all users, promote to admin, or delete accounts
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                    <h3 className="font-semibold text-green-900 mb-2">🐕 Pet Management</h3>
                    <p className="text-sm text-green-800">
                      View all pets and manage their profiles
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 border-l-4 border-orange-600 rounded">
                    <h3 className="font-semibold text-orange-900 mb-2">📋 Adoption Management</h3>
                    <p className="text-sm text-orange-800">
                      Review and approve adoption applications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && <UserManagement />}

        {/* Pets Tab */}
        {activeTab === 'pets' && <PetManagement />}

        {/* Adoptions Tab */}
        {activeTab === 'adoptions' && <AdoptionManagement />}
      </div>
    </div>
  )
}

export default AdminDashboard
