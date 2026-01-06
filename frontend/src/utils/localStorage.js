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
export const setAuth = (user) => {
  setItem('currentUser', user)
  setItem('isAuthenticated', true)
}

export const getAuth = () => {
  return {
    user: getItem('currentUser'),
    isAuthenticated: getItem('isAuthenticated', false),
  }
}

export const clearAuth = () => {
  removeItem('currentUser')
  removeItem('isAuthenticated')
}



