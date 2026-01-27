import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { apiAuth } from '../api/authApi'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user: currentUser } = await apiAuth.me()
        
        // Check if user is admin
        if (!currentUser.isAdmin) {
          navigate('/')
          return
        }
        
        setUser(currentUser)
      } catch (err) {
        setError('Failed to load user information')
        // Redirect to login if not authenticated
        setTimeout(() => navigate('/login'), 2000)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await apiAuth.logout()
      navigate('/login')
    } catch (err) {
      setError('Logout failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-2xl text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Admin Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Logout
            </button>
          </div>

          {/* Admin Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-gray-500 text-sm font-semibold mb-2">Total Users</div>
              <div className="text-3xl font-bold text-purple-600">--</div>
              <p className="text-gray-400 text-xs mt-2">Coming in next iteration</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-gray-500 text-sm font-semibold mb-2">Total Pets</div>
              <div className="text-3xl font-bold text-blue-600">--</div>
              <p className="text-gray-400 text-xs mt-2">Coming in next iteration</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-gray-500 text-sm font-semibold mb-2">Adoptions</div>
              <div className="text-3xl font-bold text-green-600">--</div>
              <p className="text-gray-400 text-xs mt-2">Coming in next iteration</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-gray-500 text-sm font-semibold mb-2">Pending Applications</div>
              <div className="text-3xl font-bold text-orange-600">--</div>
              <p className="text-gray-400 text-xs mt-2">Coming in next iteration</p>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Welcome to the Pet Adoption Admin Dashboard! This is your central hub for managing the platform.
              </p>

              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Current Features:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-2">
                  <li>Admin authentication and role-based access</li>
                  <li>Secure login with session management</li>
                  <li>Admin-only dashboard access</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
                <h3 className="font-semibold text-purple-900 mb-2">Coming in Next Iteration:</h3>
                <ul className="list-disc list-inside text-purple-800 space-y-2">
                  <li>User management (view, edit, delete users)</li>
                  <li>Pet management (add, edit, delete pets)</li>
                  <li>Adoption application review and approval</li>
                  <li>Quiz response verification and scoring</li>
                  <li>Analytics and reporting dashboard</li>
                  <li>Admin profile settings</li>
                </ul>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Admin Profile</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Name:</span> {user?.name}</p>
                <p><span className="font-semibold">Email:</span> {user?.email}</p>
                <p><span className="font-semibold">Role:</span> <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">Administrator</span></p>
                <p><span className="font-semibold">Member Since:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
