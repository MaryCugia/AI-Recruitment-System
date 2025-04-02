import { useState } from 'react'
import './Candidates.css'

function Candidates() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Sarah Johnson", role: "Software Engineer", status: "Shortlisted", experience: "5 years" },
    { id: 2, name: "Mike Chen", role: "Data Analyst", status: "In Review", experience: "3 years" },
    { id: 3, name: "Emma Davis", role: "UX Designer", status: "New", experience: "4 years" },
  ])

  return (
    <div className="candidates-page">
      <header className="page-header">
        <h1>Candidates</h1>
        <div className="header-actions">
          <input type="search" placeholder="Search candidates..." className="search-input" />
          <select className="filter-select">
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="reviewing">In Review</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </header>

      <div className="candidates-grid">
        {candidates.map(candidate => (
          <div key={candidate.id} className="candidate-card">
            <div className="candidate-avatar">
              {candidate.name.charAt(0)}
            </div>
            <div className="candidate-info">
              <h3>{candidate.name}</h3>
              <p className="role">{candidate.role}</p>
              <p className="experience">{candidate.experience}</p>
              <span className={`status-badge ${candidate.status.toLowerCase()}`}>
                {candidate.status}
              </span>
            </div>
            <div className="candidate-actions">
              <button className="action-btn">View Profile</button>
              <button className="action-btn">Schedule Interview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Candidates
