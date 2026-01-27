import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiAuth } from '../api/authApi'
import { apiAdminStats, apiAdminUsers, apiAdminPets, apiAdminAdoptions } from '../api/adminApi'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])
  const [pets, setPets] = useState([])
  const [adoptions, setAdoptions] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [petsLoading, setPetsLoading] = useState(false)
  const [adoptionsLoading, setAdoptionsLoading] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const fetchUserAndStats = async () => {
      try {
        const { user: currentUser } = await apiAuth.me()
        
        if (!currentUser.isAdmin) {
          navigate('/')
          return
        }
        
        setUser(currentUser)
        
        const statsData = await apiAdminStats.getStats()
        setStats(statsData.stats)
      } catch (err) {
        setError('Failed to load user information')
        setTimeout(() => navigate('/login'), 2000)
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndStats()
  }, [navigate])

  const fetchUsers = async () => {
    setUsersLoading(true)
    try {
      const data = await apiAdminUsers.getAll()
      setUsers(data.users || [])
    } catch (err) {
      setError('Failed to load users')
    } finally {
      setUsersLoading(false)
    }
  }

  const fetchPets = async () => {
    setPetsLoading(true)
    try {
      const data = await apiAdminPets.getAll?.() || { pets: [] }
      setPets(data.pets || [])
    } catch (err) {
      console.log('Pet fetch not available yet')
      setPets([])
    } finally {
      setPetsLoading(false)
    }
  }

  const fetchAdoptions = async () => {
    setAdoptionsLoading(true)
    try {
      const data = await apiAdminAdoptions.getAll()
      setAdoptions(data.adoptions || [])
    } catch (err) {
      setError('Failed to load adoptions')
    } finally {
      setAdoptionsLoading(false)
    }
  }

  const handleDeleteUser = async (id) => {
    if (id === user.id) {
      setError('Cannot delete your own account')
      return
    }
    try {
      await apiAdminUsers.delete(id)
      setUsers(users.filter(u => u.id !== id))
      setError('')
    } catch (err) {
      setError('Failed to delete user')
    }
  }

  const handleUpdateUserRole = async (id, isAdmin) => {
    try {
      await apiAdminUsers.updateRole(id, isAdmin)
      setUsers(users.map(u => u.id === id ? { ...u, isAdmin } : u))
      setError('')
    } catch (err) {
      setError('Failed to update user role')
    }
  }

  const handleDeletePet = async (id) => {
    try {
      await apiAdminPets.delete(id)
      setPets(pets.filter(p => p.id !== id))
      setError('')
    } catch (err) {
      setError('Failed to delete pet')
    }
  }

  const handleUpdateAdoptionStatus = async (id, status) => {
    try {
      await apiAdminAdoptions.updateStatus(id, status)
      setAdoptions(adoptions.map(a => a.id === id ? { ...a, status } : a))
      setError('')
    } catch (err) {
      setError('Failed to update adoption status')
    }
  }

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-4">🐾</div>
          <div className="text-2xl text-gray-600">Loading Dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Admin Header */}
      <header className="bg-white shadow-lg border-b-4 border-purple-600">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🐾</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Pet Adoption Admin</h1>
              <p className="text-sm text-gray-600">Management Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="font-semibold text-gray-800">{user?.name}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold flex items-center justify-center hover:shadow-lg transition"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      setActiveTab('profile')
                      setShowUserMenu(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-purple-50 text-gray-700 font-semibold"
                  >
                    👤 My Profile
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-semibold"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
            <div className="flex flex-wrap border-b border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-semibold transition ${
                  activeTab === 'overview'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => { setActiveTab('users'); fetchUsers(); }}
                className={`px-6 py-4 font-semibold transition ${
                  activeTab === 'users'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                👥 Users
              </button>
              <button
                onClick={() => { setActiveTab('pets'); fetchPets(); }}
                className={`px-6 py-4 font-semibold transition ${
                  activeTab === 'pets'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                🐕 Pets
              </button>
              <button
                onClick={() => { setActiveTab('adoptions'); fetchAdoptions(); }}
                className={`px-6 py-4 font-semibold transition ${
                  activeTab === 'adoptions'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                📋 Adoptions
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-semibold transition ${
                  activeTab === 'profile'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                ⚙️ Profile
              </button>
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-gray-500 text-sm font-semibold mb-2">Total Users</div>
                  <div className="text-3xl font-bold text-purple-600">{stats?.totalUsers || 0}</div>
                  <p className="text-gray-400 text-xs mt-2">Registered users</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-gray-500 text-sm font-semibold mb-2">Total Pets</div>
                  <div className="text-3xl font-bold text-blue-600">{stats?.totalPets || 0}</div>
                  <p className="text-gray-400 text-xs mt-2">Available pets</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-gray-500 text-sm font-semibold mb-2">Adoptions</div>
                  <div className="text-3xl font-bold text-green-600">{stats?.totalAdoptions || 0}</div>
                  <p className="text-gray-400 text-xs mt-2">Completed adoptions</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-gray-500 text-sm font-semibold mb-2">Quiz Responses</div>
                  <div className="text-3xl font-bold text-orange-600">{stats?.totalQuizResponses || 0}</div>
                  <p className="text-gray-400 text-xs mt-2">Total responses</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
                
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">
                    Welcome to the Pet Adoption Admin Dashboard! This is your central hub for managing the platform.
                  </p>

                  <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                    <h3 className="font-semibold text-blue-900 mb-2">Current Features:</h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                      <li>Real-time dashboard with system statistics</li>
                      <li>Admin authentication and role-based access</li>
                      <li>Secure login with session management</li>
                      <li>Admin-only dashboard access</li>
                    </ul>
                  </div>

                  <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
                    <h3 className="font-semibold text-purple-900 mb-2">Available Management Tools:</h3>
                    <ul className="list-disc list-inside text-purple-800 space-y-2">
                      <li>User management (view, edit, delete users)</li>
                      <li>Pet management (view, delete pets)</li>
                      <li>Adoption application review and status updates</li>
                      <li>Admin profile management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
              
              {usersLoading ? (
                <p className="text-center text-gray-600">Loading users...</p>
              ) : users.length === 0 ? (
                <p className="text-center text-gray-600">No users found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Joined</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-4 px-4">{u.name}</td>
                          <td className="py-4 px-4">{u.email}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${u.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                              {u.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="py-4 px-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-4 space-x-2">
                            {!u.isAdmin && (
                              <button
                                onClick={() => handleUpdateUserRole(u.id, true)}
                                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
                              >
                                Make Admin
                              </button>
                            )}
                            {u.isAdmin && u.id !== user.id && (
                              <button
                                onClick={() => handleUpdateUserRole(u.id, false)}
                                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 text-sm"
                              >
                                Remove Admin
                              </button>
                            )}
                            {u.id !== user.id && (
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PETS TAB */}
          {activeTab === 'pets' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pet Management</h2>
              
              {petsLoading ? (
                <p className="text-center text-gray-600">Loading pets...</p>
              ) : pets.length === 0 ? (
                <p className="text-center text-gray-600">No pets found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pets.map(pet => (
                    <div key={pet.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                      {pet.image && <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover rounded mb-4" />}
                      <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                      <p className="text-gray-600">{pet.breed}</p>
                      <p className="text-sm text-gray-500 mt-2">{pet.description}</p>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleDeletePet(pet.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADOPTIONS TAB */}
          {activeTab === 'adoptions' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Adoption Applications</h2>
              
              {adoptionsLoading ? (
                <p className="text-center text-gray-600">Loading adoptions...</p>
              ) : adoptions.length === 0 ? (
                <p className="text-center text-gray-600">No adoption applications found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Applicant Name</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Pet ID</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Applied Date</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adoptions.map(adoption => (
                        <tr key={adoption.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-4 px-4">{adoption.applicantName}</td>
                          <td className="py-4 px-4">{adoption.applicantEmail}</td>
                          <td className="py-4 px-4">#{adoption.petId}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              adoption.status === 'approved' ? 'bg-green-100 text-green-800' :
                              adoption.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {adoption.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">{new Date(adoption.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-4 space-x-2">
                            {adoption.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleUpdateAdoptionStatus(adoption.id, 'approved')}
                                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleUpdateAdoptionStatus(adoption.id, 'rejected')}
                                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Information</h3>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
                    </div>
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
                    </div>
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold mt-2">Administrator</p>
                    </div>
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Settings</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                      <h4 className="font-semibold text-blue-900 mb-2">Administrator Access</h4>
                      <p className="text-sm text-blue-800">You have full administrative privileges on this platform. You can manage users, pets, and adoption applications.</p>
                    </div>
                    <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                      <h4 className="font-semibold text-green-900 mb-2">Dashboard Permissions</h4>
                      <p className="text-sm text-green-800">Full access to all admin features including user management, pet listings, and adoption status updates.</p>
                    </div>
                    <div className="p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
                      <h4 className="font-semibold text-purple-900 mb-2">System Statistics</h4>
                      <p className="text-sm text-purple-800">View real-time statistics and analytics of the platform including total users, pets, adoptions, and quiz responses.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
