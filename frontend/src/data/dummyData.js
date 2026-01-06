// Dummy data for pets
export const petsData = [
  {
    id: 1,
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 2,
    ageUnit: 'years',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    description: 'Friendly and energetic Golden Retriever who loves playing fetch and going for long walks.',
    healthStatus: 'Healthy',
    vaccinationStatus: 'Completed',
    adoptionStatus: 'Available',
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: 1,
    ageUnit: 'year',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
    description: 'Gentle and affectionate Persian cat. Perfect for a quiet home environment.',
    healthStatus: 'Healthy',
    vaccinationStatus: 'Completed',
    adoptionStatus: 'Available',
  },
  {
    id: 3,
    name: 'Bunny',
    species: 'Rabbit',
    breed: 'Holland Lop',
    age: 6,
    ageUnit: 'months',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
    description: 'Playful and curious Holland Lop rabbit. Great for families.',
    healthStatus: 'Healthy',
    vaccinationStatus: 'Upcoming',
    adoptionStatus: 'Available',
  },
  {
    id: 4,
    name: 'Buddy',
    species: 'Dog',
    breed: 'Labrador',
    age: 3,
    ageUnit: 'years',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1534361960057-19889dbdf1bb?w=400&h=300&fit=crop',
    description: 'Loyal and playful Labrador. Excellent with families.',
    healthStatus: 'Healthy',
    vaccinationStatus: 'Completed',
    adoptionStatus: 'Available',
  },
  {
    id: 5,
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Siamese',
    age: 6,
    ageUnit: 'months',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    description: 'Curious and playful Siamese kitten. Very social and loves attention.',
    healthStatus: 'Healthy',
    vaccinationStatus: 'Upcoming',
    adoptionStatus: 'Available',
  },
  {
    id: 6,
    name: 'Thumper',
    species: 'Rabbit',
    breed: 'Angora',
    age: 8,
    ageUnit: 'months',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1459262838948-3e416b11c5b6?w=400&h=300&fit=crop',
    description: 'Fluffy Angora rabbit. Gentle and calm temperament.',
    healthStatus: 'Healthy',
    vaccinationStatus: 'Completed',
    adoptionStatus: 'Available',
  },
]

// Initialize localStorage if empty
export const initializeData = () => {
  if (!localStorage.getItem('pets')) {
    localStorage.setItem('pets', JSON.stringify(petsData))
  }
  if (!localStorage.getItem('adoptionRequests')) {
    localStorage.setItem('adoptionRequests', JSON.stringify([]))
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]))
  }
}

// Get pets from localStorage
export const getPets = () => {
  return JSON.parse(localStorage.getItem('pets') || '[]')
}

// Get pet by ID
export const getPetById = (id) => {
  const pets = getPets()
  return pets.find((pet) => pet.id === parseInt(id))
}

// Save adoption request
export const saveAdoptionRequest = (request) => {
  const requests = JSON.parse(localStorage.getItem('adoptionRequests') || '[]')
  const newRequest = {
    ...request,
    id: Date.now(),
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }
  requests.push(newRequest)
  localStorage.setItem('adoptionRequests', JSON.stringify(requests))
  return newRequest
}

// Get adoption requests
export const getAdoptionRequests = () => {
  return JSON.parse(localStorage.getItem('adoptionRequests') || '[]')
}

// Get user adoption requests
export const getUserAdoptionRequests = (userEmail) => {
  const requests = getAdoptionRequests()
  return requests.filter((req) => req.email === userEmail)
}

// Save user
export const saveUser = (user) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const newUser = {
    ...user,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  return newUser
}

// Get user by email
export const getUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  return users.find((user) => user.email === email)
}

// Auth helpers
export const setAuth = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user))
  localStorage.setItem('isAuthenticated', 'true')
}

export const getAuth = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  return { user, isAuthenticated }
}

export const clearAuth = () => {
  localStorage.removeItem('currentUser')
  localStorage.removeItem('isAuthenticated')
}
