import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/authApi'
import { clearAuth, getAuth } from '../../utils/localStorage'

const AdminHeader = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate()
  const { user } = getAuth()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await authApi.logout()
      clearAuth()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      clearAuth()
      navigate('/login')
    }
  }

  return (
    <header className="bg-white shadow-md border-b-4 border-purple-600 sticky top-0 z-40">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🐾</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-xs text-gray-500">Pet Adoption Platform</p>
          </div>
        </div>

        {/* Right: User Info & Menu */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-semibold text-gray-800">{user?.name}</p>
          </div>

          {/* User Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold flex items-center justify-center hover:shadow-lg transition-shadow text-lg"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={() => navigate('/')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium text-sm"
                >
                  👁️ View Website
                </button>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium text-sm"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-t border-gray-200 px-6 flex gap-1 overflow-x-auto">
        {[
          { id: 'overview', label: '📊 Overview', icon: '📊' },
          { id: 'users', label: '👥 Users', icon: '👥' },
          { id: 'pets', label: '🐕 Pets', icon: '🐕' },
          { id: 'adoptions', label: '📋 Adoptions', icon: '📋' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 font-semibold text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-purple-600 border-purple-600'
                : 'text-gray-600 border-transparent hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  )
}

export default AdminHeader
