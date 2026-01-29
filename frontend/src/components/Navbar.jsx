import { Link } from 'react-router-dom'
import { getAuth, clearAuth } from '../utils/localStorage'

const Navbar = () => {
  const { isAuthenticated, user } = getAuth()

  const handleLogout = () => {
    clearAuth()
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🐾</span>
            <span className="text-2xl font-bold text-purple-600">PetAdopt</span>
          </Link>

          {/* Menu Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/browse-pets"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Browse Pets
            </Link>
            <Link
              to="/quiz"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              🎯 Find Match
            </Link>
            <Link
              to="/adoption-process"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link
              to="/breed-info"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Breed Info
            </Link>
            <Link
              to="/vaccination"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Vaccination
            </Link>
            <Link
              to="/care-tips"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Care Tips
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 text-sm">Hi, {user?.name}</span>
                {user?.isAdmin && (
                  <Link
                    to="/admin-dashboard"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
