// LocalStorage utility functions

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key, defaultValue = null) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : defaultValue
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
}

// Auth helpers
export const setAuth = (token, user) => {
  try {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error('Error saving auth to localStorage:', error)
  }
}

export const getAuth = () => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    return {
      token,
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!token && !!user,
    }
  } catch (error) {
    console.error('Error reading auth from localStorage:', error)
    return {
      token: null,
      user: null,
      isAuthenticated: false,
    }
  }
}

export const clearAuth = () => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Error clearing auth from localStorage:', error)
  }
}





