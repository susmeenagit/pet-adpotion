import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { adoptionAPI } from '../services/api'

const UserSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [userPets, setUserPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)

  useEffect(() => {
    fetchUserPets()
    const storedPet = localStorage.getItem('selectedPet')
    if (storedPet) {
      setSelectedPet(JSON.parse(storedPet))
    }
  }, [])

  const fetchUserPets = async () => {
    try {
      const response = await adoptionAPI.getMyAdoptions()
      // Handle response structure: response.data.data.adoptions or response.data.adoptions
      const allAdoptions = Array.isArray(response.data?.data?.adoptions)
        ? response.data.data.adoptions
        : Array.isArray(response.data?.adoptions)
        ? response.data.adoptions
        : Array.isArray(response.data)
        ? response.data
        : []
      
      const approvedPets = allAdoptions
        .filter(req => req?.status?.toLowerCase() === 'approved')
        .map(req => req?.pet)
        .filter(pet => pet)
      setUserPets(Array.isArray(approvedPets) ? approvedPets : [])
      if (approvedPets.length > 0 && !selectedPet) {
        setSelectedPet(approvedPets[0])
        localStorage.setItem('selectedPet', JSON.stringify(approvedPets[0]))
      }
    } catch (error) {
      console.error('Error fetching user pets:', error)
      setUserPets([]) // Ensure it's always an array
    }
  }

  const handlePetSelect = (pet) => {
    setSelectedPet(pet)
    localStorage.setItem('selectedPet', JSON.stringify(pet))
    navigate(`/user/pet-profile/${pet.id}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('selectedPet')
    navigate('/user/login')
  }

  const menuItems = [
    { path: '/user/dashboard', label: 'Overview', icon: '📊' },
    { path: '/user/analytics', label: 'Analytics', icon: '📈' },
    { path: '/user/help', label: 'Help', icon: 'ℹ️' },
    { path: '/user/settings', label: 'Setting', icon: '⚙️' },
  ]

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl">
      <div className="p-6 h-full flex flex-col">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">🐾</span>
          </div>
          <span className="text-xl font-bold">Logo</span>
        </div>

        {/* Your Pets Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Your Pets</h3>
          <div className="space-y-4">
            {userPets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => handlePetSelect(pet)}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all ${
                  selectedPet?.id === pet.id
                    ? 'bg-gray-700'
                    : 'hover:bg-gray-700'
                }`}
              >
                {pet.image ? (
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-xl">🐾</span>
                  </div>
                )}
                <span className="font-medium">{pet.name}</span>
              </div>
            ))}
            
            {/* Add New Pet */}
            <div
              onClick={() => navigate('/user/browse-pets')}
              className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-all border-2 border-dashed border-gray-600"
            >
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-2xl">+</span>
              </div>
              <span className="text-sm text-gray-400">add new</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-gray-700 border-l-4 border-yellow-400'
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition-all"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSidebar
