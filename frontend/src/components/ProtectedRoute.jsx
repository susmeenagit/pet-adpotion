import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  
  if (!token) {
    return <Navigate to="/user/login" replace />
  }

  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      console.log("UserStr", userStr);
      console.log('ProtectedRoute - user role:', user)
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        if (user.role === 'admin') {
          return <Navigate to="/admin-dashboard" replace />
        } else if (user.role === 'owner') {
          return <Navigate to="/owner/dashboard" replace />
        } else if (user.role === 'user') {
          return <Navigate to="/user/dashboard" replace />
        }
        return <Navigate to="/" replace />
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      return <Navigate to="/user/login" replace />
    }
  }

  return children
}

export default ProtectedRoute

