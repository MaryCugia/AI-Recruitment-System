import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import RecruiterDashboard from './components/RecruiterDashboard'
import CandidateDashboard from './Components/Candidate/CandidateDashboard'
import Candidates from './components/Candidates'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import ResumeAnalysis from './Components/Resume/ResumeAnalysis'
import Jobs from './Components/Jobs/Jobs'
import './styles/global.css'
import JobSearch from './Components/Candidate/JobSearch'
import Applications from './Components/Candidate/Applications'
import Profile from './Components/Candidate/Profile'
import JobApplication from './Components/Candidate/JobApplication'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Recruiter Routes */}
            <Route path="/" element={<RecruiterDashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/resume-analysis" element={<ResumeAnalysis />} />

            {/* Candidate Routes */}
            <Route path="/candidate" element={<CandidateDashboard />} />
            <Route path="/jobs/search" element={<JobSearch />} />
            <Route path="/jobs/search/:jobId/apply" element={<JobApplication />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

