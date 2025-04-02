import { useState } from 'react'
import './RecruiterDashboard.css'

function RecruiterDashboard() {
  const [applications, setApplications] = useState([
    // Dummy data for now
    { id: 1, candidate: "John Doe", role: "Software Engineer", status: "Pending" },
    { id: 2, candidate: "Jane Smith", role: "Data Analyst", status: "Reviewing" },
  ])

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Recruiter Dashboard</h1>
        <div className="header-actions">
          <button className="new-job-btn">Post New Job</button>
          <input type="search" placeholder="Search applications..." className="search-bar" />
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>24</p>
        </div>
        <div className="stat-card">
          <h3>Pending Review</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Shortlisted</h3>
          <p>8</p>
        </div>
      </div>

      <div className="applications-list">
        <h2>Recent Applications</h2>
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.candidate}</td>
                <td>{app.role}</td>
                <td>{app.status}</td>
                <td>
                  <button className="action-btn">View</button>
                  <button className="action-btn">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecruiterDashboard
