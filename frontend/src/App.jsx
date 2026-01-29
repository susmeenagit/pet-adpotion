import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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


function App() {
  return (
    <Router>
      <Routes>
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
