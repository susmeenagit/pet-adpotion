import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import BrowsePets from './pages/BrowsePets'
import PetDetails from './pages/PetDetails'
import AdoptionApplication from './pages/AdoptionApplication'
import LoginRegister from './pages/LoginRegister'
import VaccinationSchedule from './pages/Vaccinationschedule'
import PetCareTips from './pages/PetcareTips'
import BreedInformation from './pages/Breedinformation'
import AdoptionProcess from './pages/Adoptionprocess'
import AdminDashboard from './pages/AdminDashboard'
import Quiz from './pages/Quiz'
import QuizResults from './pages/QuizResults'

// User Pages
import UserLogin from './pages/user/UserLogin'
import UserDashboard from './pages/user/UserDashboard'
import BrowsePetsUser from './pages/user/BrowsePets'
import MyRequests from './pages/user/MyRequests'
import QuizUser from './pages/user/Quiz'
import UserProfile from './pages/user/UserProfile'
import PetProfile from './pages/user/PetProfile'
import Analytics from './pages/user/Analytics'
import Help from './pages/user/Help'
import Settings from './pages/user/Settings'


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/browse-pets" element={<BrowsePets />} />
        <Route path="/pet-details/:id" element={<PetDetails />} />
        <Route path="/adoption-application/:id" element={<AdoptionApplication />} />
        <Route path="/adoption-process" element={<AdoptionProcess />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/vaccination" element={<VaccinationSchedule />} />
        <Route path="/care-tips" element={<PetCareTips />} />
        <Route path="/breed-info" element={<BreedInformation />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-results" element={<QuizResults />} />

        {/* User Routes */}
        <Route path="/user/login" element={<LoginRegister />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/browse-pets"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <BrowsePets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/my-requests"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <MyRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/quiz"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/pet-profile/:id"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <PetProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/analytics"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/help"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/settings"
          element={
            <ProtectedRoute allowedRoles={['user', 'USER']}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
