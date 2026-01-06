import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initializeData } from './data/dummyData'
import Home from './pages/Home'
import BrowsePets from './pages/BrowsePets'
// import PetDetails from './pages/PetDetails'
import AdoptionApplication from './pages/AdoptionApplication'
import AdoptionProcess from './pages/AdoptionProcess'
import VaccinationSchedule from './pages/VaccinationSchedule'
import PetCareTips from './pages/PetCareTips'
import LoginRegister from './pages/LoginRegister'

function App() {
  useEffect(() => {
    initializeData()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-pets" element={<BrowsePets />} />
        {/* <Route path="/pet-details/:id" element={<PetDetails />} /> */}
        <Route path="/adoption-application/:id" element={<AdoptionApplication />} />
        <Route path="/adoption-process" element={<AdoptionProcess />} />
        <Route path="/vaccination" element={<VaccinationSchedule />} />
        <Route path="/care-tips" element={<PetCareTips />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </Router>
  )
}

export default App
