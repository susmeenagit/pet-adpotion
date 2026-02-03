import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import UserHeader from '../../components/user/UserHeader'
import StatsCard from '../../components/user/StatsCard'
import MyPetsManagement from '../../components/user/MyPetsManagement'
import BrowsePetsManagement from '../../components/user/BrowsePetsManagement'
import MyRequestsManagement from '../../components/user/MyRequestsManagement'
import QuizManagement from '../../components/user/QuizManagement'
import { petAPI, adoptionAPI, quizAPI } from '../../services/api'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')
  
  // Check for tab query parameter on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['overview', 'my-pets', 'browse-pets', 'my-requests', 'quiz'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])
  const [stats, setStats] = useState(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [error, setError] = useState('')
  const [statsFetched, setStatsFetched] = useState(false)

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true)
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      
      // Fetch all data in parallel
      const [petsRes, adoptionsRes, quizRes] = await Promise.all([
        petAPI.getAll(),
        adoptionAPI.getMyAdoptions().catch(() => ({ data: { adoptions: [] } })),
        quizAPI.getUserAllResponses().catch(() => ({ data: { responses: [] } })),
      ])
      
      const allPets = petsRes.data?.pets || petsRes.data || []
      // Handle response structure: response.data.data.adoptions or response.data.adoptions
      let myAdoptions = Array.isArray(adoptionsRes.data?.data?.adoptions)
        ? adoptionsRes.data.data.adoptions
        : Array.isArray(adoptionsRes.data?.adoptions)
        ? adoptionsRes.data.adoptions
        : Array.isArray(adoptionsRes.data)
        ? adoptionsRes.data
        : []
      
      const quizResponses = quizRes.data?.responses || quizRes.data || []
      const approvedAdoptions = myAdoptions.filter(
        req => req.status?.toLowerCase() === 'approved'
      )
      
      setStats({
        totalPets: allPets.length,
        myPets: approvedAdoptions.length,
        myRequests: myAdoptions.length,
        approvedRequests: approvedAdoptions.length,
        pendingRequests: myAdoptions.filter(
          req => req.status?.toLowerCase() === 'pending'
        ).length,
        quizCompleted: quizResponses.some(
          res => res.status === 'Completed' || res.status === 'Verified'
        ),
      })
      setStatsFetched(true)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
      setError('Failed to load statistics')
    } finally {
      setStatsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Fetch stats only once
    if (!statsFetched) {
      fetchStats()
    }
  }, [fetchStats, statsFetched])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <UserHeader activeTab={activeTab} onTabChange={setActiveTab} />

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
                icon="🐾"
                label="My Pets"
                value={stats?.myPets || 0}
                color="green"
                loading={statsLoading}
              />
              <StatsCard
                icon="📋"
                label="Pending Requests"
                value={stats?.pendingRequests || 0}
                color="orange"
                loading={statsLoading}
              />
              <StatsCard
                icon="✅"
                label="Approved"
                value={stats?.approvedRequests || 0}
                color="blue"
                loading={statsLoading}
              />
              <StatsCard
                icon="🐕"
                label="Available Pets"
                value={stats?.totalPets || 0}
                color="purple"
                loading={statsLoading}
              />
            </div>

            {/* Dashboard Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to User Dashboard</h2>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  Manage your pet adoption journey. Browse available pets, track your adoption requests, and take quizzes to verify your readiness.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                    <h3 className="font-semibold text-green-900 mb-2">🐾 My Pets</h3>
                    <p className="text-sm text-green-800">
                      View and manage your adopted pets
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                    <h3 className="font-semibold text-blue-900 mb-2">📋 My Requests</h3>
                    <p className="text-sm text-blue-800">
                      Track the status of your adoption applications
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
                    <h3 className="font-semibold text-purple-900 mb-2">❓ Quiz</h3>
                    <p className="text-sm text-purple-800">
                      Take quizzes to verify your pet care knowledge
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Pets Tab */}
        {activeTab === 'my-pets' && <MyPetsManagement />}

        {/* Browse Pets Tab */}
        {activeTab === 'browse-pets' && <BrowsePetsManagement />}

        {/* My Requests Tab */}
        {activeTab === 'my-requests' && <MyRequestsManagement />}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && <QuizManagement />}
      </div>
    </div>
  )
}

export default UserDashboard
