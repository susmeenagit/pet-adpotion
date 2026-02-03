import { useState, useEffect } from 'react'
import UserSidebar from '../../components/UserSidebar'
import api from '../../services/api'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/me')
      const userData = response.data
      setUser(userData)
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setSaving(true)

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match')
      setSaving(false)
      return
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      }
      
      if (formData.password) {
        updateData.password = formData.password
      }

      await api.put('/auth/profile', updateData)
      setMessage('Profile updated successfully!')
      fetchProfile()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        <UserSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <UserSidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Profile 👤</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="max-w-3xl">
          {/* Profile Header Card */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-8 mb-6 text-white">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-600 text-4xl font-bold shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">{user?.name || 'User'}</h2>
                <p className="text-green-100">{user?.email}</p>
                <span className="inline-block mt-2 px-4 py-1 bg-white text-green-600 rounded-full text-sm font-semibold">
                  {user?.role || 'User'}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {message && (
              <div
                className={`mb-6 px-4 py-3 rounded-xl border-l-4 ${
                  message.includes('success')
                    ? 'bg-green-50 text-green-700 border-green-500'
                    : 'bg-red-50 text-red-700 border-red-500'
                }`}
              >
                <p className="font-medium">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647A7.962 7.962 0 0112 20c2.042 0 3.935-.824 5-2.122l3 2.647A7.962 7.962 0 0020 12h-4a7.962 7.962 0 01-3 5.291z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Update Profile'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

